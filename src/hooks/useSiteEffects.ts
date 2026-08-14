"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function useSiteEffects(options?: { home?: boolean }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    /* Preloader — skip on repeat visits in the same session */
    const preloader = document.getElementById("preloader");
    const preloaderFill = document.querySelector<HTMLElement>(".preloader__fill");
    const skipPreloader = sessionStorage.getItem("dblshot-visited") === "1";
    let loadTimeout: ReturnType<typeof setTimeout> | undefined;
    let finishLoad: (() => void) | undefined;

    if (skipPreloader) {
      preloader?.classList.add("is-done");
    } else {
      let loadProgress = 0;

      const tickLoader = () => {
        loadProgress = Math.min(loadProgress + Math.random() * 18 + 8, 100);
        if (preloaderFill) preloaderFill.style.width = `${loadProgress}%`;
        if (loadProgress < 100) requestAnimationFrame(tickLoader);
      };
      tickLoader();

      finishLoad = () => {
        if (preloaderFill) preloaderFill.style.width = "100%";
        setTimeout(() => preloader?.classList.add("is-done"), 400);
        sessionStorage.setItem("dblshot-visited", "1");
      };

      window.addEventListener("load", finishLoad);
      loadTimeout = setTimeout(finishLoad, 3500);
    }

    /* Nav */
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Scroll progress */
    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    const onScrollProgress = () => {
      if (!bar) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScrollProgress, { passive: true });

    /* Mobile menu */
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("mobile-menu");
    const closeMenu = () => {
      toggle?.classList.remove("is-open");
      menu?.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    const onToggle = () => {
      const open = menu?.classList.toggle("is-open");
      toggle?.classList.toggle("is-open", !!open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle?.addEventListener("click", onToggle);
    menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

    /* Cursor follower — gold dot (instant) + ring (trailing, expands on hover) */
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const animateCursor = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animateCursor);
    };

    if (!isTouch && !prefersReduced && (dot || ring)) {
      window.addEventListener("mousemove", onMouseMove);
      rafId = requestAnimationFrame(animateCursor);
      const hoverables = "a, button, .service-card, .team-card, .blog-card, .job-card, .feature-card, .mr-card, .cs-step";
      const enter = () => {
        ring?.classList.add("is-hover");
        dot?.classList.add("is-hover");
      };
      const leave = () => {
        ring?.classList.remove("is-hover");
        dot?.classList.remove("is-hover");
      };
      document.querySelectorAll(hoverables).forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    } else {
      dot?.remove();
      ring?.remove();
    }

    /* Magnetic buttons */
    const magneticBtns = document.querySelectorAll<HTMLElement>(".btn--magnetic");
    const magneticHandlers: { el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void; down: () => void }[] = [];
    if (!isTouch) {
      magneticBtns.forEach((btn) => {
        const move = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.2}px, ${(e.clientY - rect.top - rect.height / 2) * 0.2}px)`;
        };
        const leave = () => {
          btn.style.transform = "";
        };
        // Snap back to the true position on press so mousedown/mouseup land on the
        // same element — otherwise the displaced button never fires a click.
        const down = () => {
          btn.style.transform = "";
        };
        btn.addEventListener("mousemove", move);
        btn.addEventListener("mouseleave", leave);
        btn.addEventListener("mousedown", down);
        magneticHandlers.push({ el: btn, move, leave, down });
      });
    }

    /* Counters */
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseFloat(el.dataset.count || "0");
          const suffix = el.dataset.suffix || "";
          const prefix = el.dataset.prefix || "";
          const duration = 2000;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = prefix + Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          counterObs.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => counterObs.observe(c));

    /* Service tilt */
    const tiltCards = document.querySelectorAll<HTMLElement>(".service-card");
    const tiltHandlers: { card: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }[] = [];
    if (!isTouch) {
      tiltCards.forEach((card) => {
        const move = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.setProperty("--ry", `${x * 12}deg`);
          card.style.setProperty("--rx", `${-y * 12}deg`);
        };
        const leave = () => {
          card.style.setProperty("--ry", "0deg");
          card.style.setProperty("--rx", "0deg");
        };
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        tiltHandlers.push({ card, move, leave });
      });
    }

    /* CTA words */
    const words = document.querySelectorAll<HTMLElement>(".cta-word");
    let wordInterval: ReturnType<typeof setInterval> | undefined;
    if (words.length > 1) {
      let i = 0;
      words[0]?.classList.add("is-active");
      wordInterval = setInterval(() => {
        words.forEach((w) => w.classList.remove("is-active"));
        i = (i + 1) % words.length;
        words[i]?.classList.add("is-active");
      }, 2200);
    }

    /* GSAP */
    let lenis: Lenis | null = null;
    let gsapTicker: ((time: number) => void) | null = null;
    let heroTl: gsap.core.Timeline | null = null;

    if (!prefersReduced) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal-stagger").forEach((container) => {
        gsap.fromTo(
          container.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: container, start: "top 85%" },
          }
        );
      });

      /* Masked line reveal (Catchers-style) — inner slides up from behind the clip */
      gsap.utils.toArray<HTMLElement>(".reveal-mask").forEach((el) => {
        const inner = el.querySelector<HTMLElement>(".reveal-mask__inner");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { y: "115%" },
          {
            y: 0,
            duration: 1.1,
            ease: "power4.out",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });

      /* Scroll parallax (Catchers-style drift) */
      gsap.utils.toArray<HTMLElement>(".parallax").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "-10");
        gsap.to(el, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });

      /* Page hero */
      gsap.utils.toArray<HTMLElement>(".page-hero .reveal-line > span").forEach((line, i) => {
        gsap.to(line, { y: 0, duration: 1, delay: i * 0.06, ease: "power4.out" });
      });

      lenis = new Lenis({ duration: 1.2, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsapTicker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(gsapTicker);
      gsap.ticker.lagSmoothing(0);

      /* About timeline — rocket rides the rail, lighting each milestone on scroll */
      const journey = document.querySelector<HTMLElement>(".timeline");
      if (journey) {
        const progressEl = journey.querySelector<HTMLElement>(".timeline__progress");
        const rocketEl = journey.querySelector<HTMLElement>(".timeline__rocket");
        const journeyItems = Array.from(journey.querySelectorAll<HTMLElement>(".timeline__item"));
        const railTop = 6;
        const setJourney = (p: number) => {
          const track = journey.offsetHeight - railTop * 2;
          const y = railTop + p * track;
          if (progressEl) progressEl.style.height = `${p * track}px`;
          if (rocketEl) rocketEl.style.transform = `translate(-50%, ${y}px) rotate(135deg)`;
          journeyItems.forEach((it) => it.classList.toggle("is-reached", y >= it.offsetTop + 8));
        };
        setJourney(0);
        ScrollTrigger.create({
          trigger: journey,
          start: "top 60%",
          end: "bottom 75%",
          scrub: 0.4,
          onUpdate: (self) => setJourney(self.progress),
          onRefresh: (self) => setJourney(self.progress),
        });
      }

      if (options?.home) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        heroTl = tl;
        gsap.utils.toArray<HTMLElement>(".hero .reveal-line > span").forEach((line, i) => {
          tl.to(line, { y: 0, duration: 1.1, ease: "power4.out" }, i * 0.08);
        });
        // fromTo (not from): explicit values survive StrictMode's double-mount,
        // where .from would re-record the mid-animation state and freeze at opacity 0.
        tl.fromTo(
          [".hero__badge", ".hero__sub", ".hero__actions", ".hero__scroll"],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, immediateRender: true },
          0.5
        );

        /* Portrait parallax — drifts down slower than the page scroll (Catchers-style).
           Desktop only: the tween's inline transform would override the mobile CSS reset. */
        if (document.querySelector(".hero__portrait--stage") && window.innerWidth >= 900) {
          gsap.to(".hero__portrait--stage", {
            y: 110,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
          });
        }

      }
    } else {
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-line > span").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }

    return () => {
      if (loadTimeout) clearTimeout(loadTimeout);
      if (finishLoad) window.removeEventListener("load", finishLoad);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollProgress);
      toggle?.removeEventListener("click", onToggle);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      if (wordInterval) clearInterval(wordInterval);
      counterObs.disconnect();
      magneticHandlers.forEach(({ el, move, leave, down }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("mousedown", down);
      });
      tiltHandlers.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
      if (gsapTicker) gsap.ticker.remove(gsapTicker);
      heroTl?.kill();
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [options?.home]);
}
