import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { del, get, list, put } from "@vercel/blob";
import { cookies } from "next/headers";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type TestimonialStatus = "pending" | "approved" | "hidden";

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  quote: string;
  status: TestimonialStatus;
  createdAt: string;
};

export type TestimonialInput = {
  name: string;
  company: string;
  role: string;
  rating: number;
  quote: string;
};

export const QUOTE_MIN = 20;
export const QUOTE_MAX = 1200;

/* ------------------------------------------------------------------ *
 * Storage
 *
 * Two interchangeable backends, picked at call time:
 *   - Vercel Blob when BLOB_READ_WRITE_TOKEN is set (works on Vercel's
 *     read-only filesystem). One private JSON blob per testimonial,
 *     at testimonials/<id>.json — so concurrent submissions can never
 *     overwrite each other the way a single shared document would.
 *   - A JSON file under data/ otherwise, so local dev needs no services.
 * Both store one JSON document per testimonial, keyed by id.
 * ------------------------------------------------------------------ */

const BLOB_PREFIX = "testimonials/";
const FILE_PATH = path.join(process.cwd(), "data", "testimonials.json");

function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function blobPath(id: string) {
  return `${BLOB_PREFIX}${id}.json`;
}

/** Blobs are private, so reads go through the SDK rather than a plain fetch. */
async function readBlob(pathname: string): Promise<Testimonial | null> {
  // useCache: false — a moderator must never see a stale copy after approving.
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;

  try {
    return JSON.parse(await new Response(result.stream).text()) as Testimonial;
  } catch {
    return null;
  }
}

async function readFileStore(): Promise<Record<string, Testimonial>> {
  try {
    return JSON.parse(await readFile(FILE_PATH, "utf8")) as Record<string, Testimonial>;
  } catch {
    return {};
  }
}

async function writeFileStore(store: Record<string, Testimonial>) {
  await mkdir(path.dirname(FILE_PATH), { recursive: true });
  await writeFile(FILE_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function byNewest(a: Testimonial, b: Testimonial) {
  return b.createdAt.localeCompare(a.createdAt);
}

export async function listTestimonials(): Promise<Testimonial[]> {
  if (blobEnabled()) {
    const { blobs } = await list({ prefix: BLOB_PREFIX, mode: "expanded" });
    const items = await Promise.all(blobs.map((blob) => readBlob(blob.pathname)));
    // A blob that failed to parse is skipped rather than failing the dashboard.
    return items.filter((item): item is Testimonial => item !== null).sort(byNewest);
  }

  return Object.values(await readFileStore()).sort(byNewest);
}

export async function listApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    return (await listTestimonials()).filter((t) => t.status === "approved");
  } catch (err) {
    // The public wall must never take the page down.
    console.error("Failed to load approved testimonials:", err);
    return [];
  }
}

async function saveTestimonial(testimonial: Testimonial) {
  if (blobEnabled()) {
    await put(blobPath(testimonial.id), JSON.stringify(testimonial), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return;
  }

  const store = await readFileStore();
  store[testimonial.id] = testimonial;
  await writeFileStore(store);
}

export async function createTestimonial(input: TestimonialInput): Promise<Testimonial> {
  const testimonial: Testimonial = {
    id: randomUUID(),
    name: input.name,
    company: input.company,
    role: input.role,
    rating: Math.round(input.rating),
    quote: input.quote,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await saveTestimonial(testimonial);
  return testimonial;
}

export async function getTestimonial(id: string): Promise<Testimonial | null> {
  if (blobEnabled()) return readBlob(blobPath(id));

  return (await readFileStore())[id] ?? null;
}

export async function setTestimonialStatus(
  id: string,
  status: TestimonialStatus,
): Promise<Testimonial | null> {
  const existing = await getTestimonial(id);
  if (!existing) return null;

  const updated = { ...existing, status };
  await saveTestimonial(updated);
  return updated;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (blobEnabled()) {
    // del() is idempotent, so confirm the blob exists to report an honest 404.
    if (!(await readBlob(blobPath(id)))) return false;
    await del(blobPath(id));
    return true;
  }

  const store = await readFileStore();
  if (!store[id]) return false;
  delete store[id];
  await writeFileStore(store);
  return true;
}

/* ------------------------------------------------------------------ *
 * Validation
 * ------------------------------------------------------------------ */

export function validateTestimonial(raw: unknown): { data: TestimonialInput } | { error: string } {
  if (!raw || typeof raw !== "object") return { error: "Invalid request body." };

  const body = raw as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

  const name = text(body.name);
  const company = text(body.company);
  const role = text(body.role);
  const quote = text(body.quote);
  const rating = Number(body.rating);

  if (!name) return { error: "Please enter your name." };
  if (name.length > 120) return { error: "Name is too long." };
  if (!company) return { error: "Please enter your company." };
  if (company.length > 160) return { error: "Company name is too long." };
  if (!role) return { error: "Please enter your job title." };
  if (role.length > 120) return { error: "Job title is too long." };
  if (quote.length < QUOTE_MIN) {
    return { error: `Please write at least ${QUOTE_MIN} characters.` };
  }
  if (quote.length > QUOTE_MAX) {
    return { error: `Please keep your testimonial under ${QUOTE_MAX} characters.` };
  }
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return { error: "Rating must be between 1 and 5." };
  }

  return { data: { name, company, role, rating, quote } };
}

/* ------------------------------------------------------------------ *
 * Dashboard auth — a single shared password from the environment,
 * exchanged for a cookie holding its hash.
 * ------------------------------------------------------------------ */

export const ADMIN_COOKIE = "dblshot_testimonials_admin";

function hash(value: string) {
  return createHash("sha256").update(`dblshot:testimonials:${value}`).digest("hex");
}

export function adminPassword() {
  return process.env.TESTIMONIALS_ADMIN_PASSWORD ?? "";
}

export function adminToken() {
  return hash(adminPassword());
}

function matchesAdmin(candidate: string | undefined, expected: string) {
  if (!candidate || candidate.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
}

/** True when the caller holds a valid dashboard cookie. */
export async function isAdminAuthed() {
  if (!adminPassword()) return false;
  return matchesAdmin((await cookies()).get(ADMIN_COOKIE)?.value, adminToken());
}
