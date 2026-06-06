/* =============================================================
   CAKESTRIES — interactions
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Nav: scroll state + over-hero detection ---------- */
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".hero");

  function onScroll() {
    if (!nav) return;
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);

    if (hero) {
      const overHero = y < hero.offsetHeight - 120 && !nav.classList.contains("is-scrolled");
      nav.classList.toggle("is-over-hero", overHero);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      document.body.style.overflow = nav.classList.contains("is-open") ? "hidden" : "";
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Hero load animation ---------- */
  if (hero) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add("is-loaded"); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      const open = item.classList.contains("is-open");
      // close siblings for a clean single-open accordion
      item.closest(".faq").querySelectorAll(".faq__item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq__a").style.maxHeight = null;
          other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !open);
      q.setAttribute("aria-expanded", String(!open));
      a.style.maxHeight = open ? null : a.scrollHeight + "px";
    });
  });

  /* ---------- Portfolio filter ---------- */
  const filters = document.querySelectorAll(".filter");
  const items = document.querySelectorAll(".gallery-item");
  if (filters.length && items.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        const cat = btn.dataset.filter;
        items.forEach(function (it) {
          const show = cat === "all" || it.dataset.cat === cat;
          it.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---------- Forms (front-end demo handling) ---------- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const success = form.querySelector(".form-success");
      const fields = form.querySelector(".form-fields");
      if (success && fields) {
        fields.classList.add("is-hidden");
        success.classList.remove("is-hidden");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  /* ---------- Footer year ---------- */
  const yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
