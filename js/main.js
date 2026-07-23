/* =========================================================
   Interactions du site
   1. En-tete au defilement
   2. Menu mobile
   3. FAQ en accordeon
   4. Revelations au defilement
   5. Compteurs animes
   6. Methode : ligne qui se trace + etapes qui s'allument
   ========================================================= */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- 1. En-tete au defilement ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Menu mobile ---------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = () => {
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
    mobileMenu.hidden = true;
  };
  const openMenu = () => {
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Fermer le menu");
    mobileMenu.hidden = false;
  };
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      burger.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  /* ---------- 3. FAQ en accordeon ---------- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- 4. Revelations au defilement ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- 5. Compteurs animes ---------- */
  const counters = document.querySelectorAll(".stat-num");
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.target || "0");
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- 6. Methode : ligne + etapes ---------- */
  const timeline = document.getElementById("timeline");
  if (timeline && !prefersReduced) {
    const steps = Array.from(timeline.querySelectorAll(".tl-step"));
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      // progression : 0 quand le haut passe sous 65% du viewport, 1 en fin de parcours
      const progress = Math.max(
        0,
        Math.min(1, (vh * 0.62 - rect.top) / (rect.height * 0.85))
      );
      timeline.style.setProperty("--fill", (progress * 100).toFixed(1) + "%");

      const n = steps.length;
      steps.forEach((step, i) => {
        const threshold = n > 1 ? (i / (n - 1)) * 0.92 : 0;
        step.classList.toggle("on", progress >= threshold);
      });
    };

    const onScrollTL = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScrollTL, { passive: true });
    window.addEventListener("resize", onScrollTL, { passive: true });
    update();
  } else if (timeline) {
    timeline.style.setProperty("--fill", "100%");
    timeline.querySelectorAll(".tl-step").forEach((s) => s.classList.add("on"));
  }
})();
