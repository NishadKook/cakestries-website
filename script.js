/* =============================================================
   CAKESTRIES — interactions
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Nav: scroll state + over-hero detection ---------- */
  var nav = document.querySelector(".nav");
  var hero = document.querySelector(".hero");

  function onScroll() {
    if (!nav) return;
    var y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);

    if (hero) {
      var overHero = y < hero.offsetHeight - 120 && !nav.classList.contains("is-scrolled");
      nav.classList.toggle("is-over-hero", overHero);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav__toggle");
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
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
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
    var q = item.querySelector(".faq__q");
    var a = item.querySelector(".faq__a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.contains("is-open");
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
  var filters = document.querySelectorAll(".filter");
  var items = document.querySelectorAll(".gallery-item");
  if (filters.length && items.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var cat = btn.dataset.filter;
        items.forEach(function (it) {
          var show = cat === "all" || it.dataset.cat === cat;
          it.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---------- Testimonial carousel (with touch swipe) ---------- */
  var track = document.querySelector(".testimonial-track");
  var dots = document.querySelectorAll(".testimonial-dot");
  if (track && dots.length) {
    var current = 0;
    var total = dots.length;
    var autoTimer = null;

    function goTo(i) {
      current = ((i % total) + total) % total;
      track.style.transform = "translateX(-" + (current * 100) + "%)";
      dots.forEach(function (d, idx) {
        d.classList.toggle("is-active", idx === current);
      });
    }

    dots.forEach(function (dot, idx) {
      dot.addEventListener("click", function () {
        goTo(idx);
        resetAuto();
      });
    });

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
    }

    var carousel = track.closest(".testimonials");
    if (carousel) {
      carousel.addEventListener("mouseenter", function () { clearInterval(autoTimer); });
      carousel.addEventListener("mouseleave", resetAuto);

      /* Touch swipe */
      var touchStartX = 0;
      var touchEndX = 0;
      var swiping = false;
      carousel.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
        swiping = true;
        clearInterval(autoTimer);
      }, { passive: true });
      carousel.addEventListener("touchend", function (e) {
        if (!swiping) return;
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) goTo(current + 1);
          else goTo(current - 1);
        }
        swiping = false;
        resetAuto();
      }, { passive: true });
    }

    resetAuto();
  }

  /* ---------- Forms (demo handling) ---------- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = form.closest("div").querySelector(".form-success") ||
                    form.parentElement.querySelector(".form-success");
      var fields = form.classList.contains("form-fields") ? form : form.querySelector(".form-fields");
      if (success && fields) {
        fields.classList.add("is-hidden");
        success.classList.remove("is-hidden");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  /* ---------- Polaroid stack auto-cycling ---------- */
  document.querySelectorAll(".polaroid-stack").forEach(function (stack) {
    var polaroids = stack.querySelectorAll(".polaroid");
    if (!polaroids.length) return;

    var pCurrent = polaroids.length - 1;
    var pTimer = null;

    polaroids[pCurrent].classList.add("is-top");

    function cycle() {
      polaroids[pCurrent].classList.remove("is-top");
      polaroids[pCurrent].classList.add("is-behind");
      var prev = pCurrent;
      setTimeout(function () { polaroids[prev].classList.remove("is-behind"); }, 850);
      pCurrent = (pCurrent - 1 + polaroids.length) % polaroids.length;
      polaroids[pCurrent].classList.add("is-top");
    }

    function start() { clearInterval(pTimer); pTimer = setInterval(cycle, 3000); }

    stack.addEventListener("mouseenter", function () { clearInterval(pTimer); });
    stack.addEventListener("mouseleave", start);

    /* Touch: tap to cycle */
    stack.addEventListener("touchend", function (e) {
      if (e.cancelable) e.preventDefault();
      cycle();
      clearInterval(pTimer);
      pTimer = setInterval(cycle, 3000);
    });

    start();
  });

  /* ---------- Auto-play video on scroll ---------- */
  var autoVideos = document.querySelectorAll("[data-autoplay-scroll]");
  if (autoVideos.length && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.play().catch(function () {});
        } else {
          e.target.pause();
        }
      });
    }, { threshold: 0.4 });
    autoVideos.forEach(function (v) { vio.observe(v); });
  }

  /* ---------- Parallax-lite (subtle drift on scroll — disabled on mobile) ---------- */
  var parallaxEls = document.querySelectorAll("[data-parallax]");
  var isMobile = window.matchMedia("(max-width: 760px)");
  if (parallaxEls.length) {
    function updateParallax() {
      if (isMobile.matches) {
        parallaxEls.forEach(function (el) { el.style.transform = ""; });
        return;
      }
      var scrollY = window.scrollY;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.dataset.parallax) || 0.08;
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var offset = (center - window.innerHeight / 2) * speed;
        el.style.transform = "translateY(" + offset + "px)";
      });
    }
    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();
  }

  /* ---------- Counter count-up animation ---------- */
  var counters = document.querySelectorAll(".counter[data-target]");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.dataset.target, 10) || 0;
        var suffix = el.dataset.suffix || "";
        var duration = 1800;
        var start = performance.now();

        function tick(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- Footer year ---------- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
