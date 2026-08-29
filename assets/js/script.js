(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var topbar = document.querySelector(".topbar");
  if (toggle && topbar) {
    toggle.addEventListener("click", function () {
      var isOpen = topbar.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    topbar.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        topbar.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll("[data-reveal]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
