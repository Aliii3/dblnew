/* DBLSHOT — Homepage-only interactions */
window.Dblshot = window.Dblshot || {};

window.Dblshot.onReady = function ({ gsap, ScrollTrigger, lenis }) {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !gsap || !ScrollTrigger) return;

  /* Hero */
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  gsap.utils.toArray(".hero .reveal-line > span").forEach((line, i) => {
    tl.to(line, { y: 0, duration: 1.1, ease: "power4.out" }, i * 0.08);
  });
  tl.from(
    [".hero__badge", ".hero__sub", ".hero__actions", ".hero__scroll"],
    { opacity: 0, y: 30, duration: 0.9, stagger: 0.15 },
    0.5
  );
  gsap.to(".hero__spin", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
  gsap.to(".orb--1", { x: 40, y: -30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });

  /* Process pin */
  const section = document.querySelector(".process-pin");
  const track = document.querySelector(".process-track");
  if (section && track && window.innerWidth >= 900) {
    const getScroll = () => track.scrollWidth - window.innerWidth + 120;
    gsap.to(track, {
      x: () => -getScroll(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + getScroll(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    const steps = track.querySelectorAll(".process-step");
    steps.forEach((step, i) => {
      step.addEventListener("mouseenter", () => {
        steps.forEach((s, j) => s.classList.toggle("is-active", j === i));
      });
    });
  }

  if (lenis) {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -80 });
        }
      });
    });
  }
};
