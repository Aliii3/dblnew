/* DBLSHOT — Shared site interactions */
window.Dblshot = window.Dblshot || {};

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  let lenisInstance = null;
  let initialized = false;

  function tickLoader() {
    const preloaderFill = document.querySelector(".preloader__fill");
    if (!preloaderFill) return;
    let loadProgress = parseFloat(preloaderFill.dataset.progress || "0");
    loadProgress = Math.min(loadProgress + Math.random() * 18 + 8, 100);
    preloaderFill.dataset.progress = loadProgress;
    preloaderFill.style.width = loadProgress + "%";
    if (loadProgress < 100) requestAnimationFrame(tickLoader);
  }

  function finishLoad(callback) {
    const preloader = document.getElementById("preloader");
    const preloaderFill = document.querySelector(".preloader__fill");
    if (preloaderFill) preloaderFill.style.width = "100%";
    setTimeout(() => {
      preloader?.classList.add("is-done");
      callback();
    }, 400);
  }

  tickLoader();
  window.addEventListener("load", () => finishLoad(initCore));
  setTimeout(() => {
    if (!initialized) finishLoad(initCore);
  }, 3500);

  function initCore() {
    if (initialized) return;
    initialized = true;

    setupNav();
    setupMobileMenu();
    setupCursor();
    setupScrollProgress();
    setupMagneticButtons();
    setupCounters();
    setupServiceTilt();
    setupReviews();
    setupCtaWords();
    setupPageHero();

    if (!prefersReduced && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      setupReveals();
      if (typeof Lenis !== "undefined") setupSmoothScroll();
      else ScrollTrigger.refresh();
    } else {
      document.querySelectorAll(".reveal, .reveal-line > span").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }

    if (typeof window.Dblshot.onReady === "function") {
      window.Dblshot.onReady({ gsap, ScrollTrigger, lenis: lenisInstance });
    }
  }

  function setupSmoothScroll() {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || !href.includes("#")) return;
        const hash = href.split("#")[1];
        if (!hash) return;
        const onPage = !href.startsWith("#") && !window.location.pathname.endsWith(href.split("#")[0].split("/").pop() || "x");
        if (onPage) return;
        const target = document.getElementById(hash);
        if (target) {
          e.preventDefault();
          lenisInstance.scrollTo(target, { offset: -80 });
        }
      });
    });
  }

  function setupNav() {
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupMobileMenu() {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;
    const close = () => {
      toggle.classList.remove("is-open");
      menu.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  function setupCursor() {
    if (isTouch || prefersReduced) {
      document.querySelectorAll(".cursor, .cursor-ring").forEach((el) => el?.remove());
      return;
    }
    const dot = document.querySelector(".cursor");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });
    const lerpRing = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(lerpRing);
    };
    lerpRing();
    document.querySelectorAll("a, button, .service-card, .team-card, .blog-card, .job-card, .feature-card").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        dot.classList.add("is-hover");
        ring.classList.add("is-hover");
      });
      el.addEventListener("mouseleave", () => {
        dot.classList.remove("is-hover");
        ring.classList.remove("is-hover");
      });
    });
  }

  function setupScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    window.addEventListener(
      "scroll",
      () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = h > 0 ? (window.scrollY / h) * 100 + "%" : "0%";
      },
      { passive: true }
    );
  }

  function setupReveals() {
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
      });
    });
    gsap.utils.toArray(".reveal-stagger").forEach((container) => {
      gsap.from(container.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: container, start: "top 85%" },
      });
    });
  }

  function setupPageHero() {
    if (!document.querySelector(".page-hero")) return;
    gsap.utils.toArray(".page-hero .reveal-line > span").forEach((line, i) => {
      gsap.to(line, { y: 0, duration: 1, delay: i * 0.06, ease: "power4.out" });
    });
    gsap.from(".page-hero .reveal:not(.reveal-line)", {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.2,
      ease: "power3.out",
    });
  }

  function setupCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const duration = 2000;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => obs.observe(c));
  }

  function setupServiceTilt() {
    if (isTouch) return;
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--ry", x * 12 + "deg");
        card.style.setProperty("--rx", -y * 12 + "deg");
      });
      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--rx", "0deg");
      });
    });
  }

  function setupReviews() {
    const track = document.querySelector(".reviews-track");
    const prev = document.querySelector("[data-review-prev]");
    const next = document.querySelector("[data-review-next]");
    if (!track) return;
    let index = 0;
    const cards = track.querySelectorAll(".review-card");
    const go = (dir) => {
      const card = cards[0];
      if (!card) return;
      const step = card.offsetWidth + 24;
      index = Math.max(0, Math.min(index + dir, cards.length - 1));
      track.style.transform = `translateX(-${index * step}px)`;
    };
    prev?.addEventListener("click", () => go(-1));
    next?.addEventListener("click", () => go(1));
    if (!prefersReduced && cards.length > 1) {
      setInterval(() => {
        index = index >= cards.length - 1 ? 0 : index + 1;
        track.style.transform = `translateX(-${index * (cards[0].offsetWidth + 24)}px)`;
      }, 6000);
    }
  }

  function setupCtaWords() {
    const words = document.querySelectorAll(".cta-word");
    if (words.length < 2) return;
    let i = 0;
    words[0]?.classList.add("is-active");
    setInterval(() => {
      words.forEach((w) => w.classList.remove("is-active"));
      i = (i + 1) % words.length;
      words[i].classList.add("is-active");
    }, 2200);
  }

  function setupMagneticButtons() {
    if (isTouch) return;
    document.querySelectorAll(".btn--magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.2}px, ${(e.clientY - rect.top - rect.height / 2) * 0.2}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }
})();
