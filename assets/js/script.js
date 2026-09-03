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

  // Bio soundtrack: play a track while its <details> bio is open
  var bioAudio = null;
  document.querySelectorAll(".person-bio-details[data-track]").forEach(function (det) {
    det.addEventListener("toggle", function () {
      if (bioAudio) { bioAudio.pause(); bioAudio = null; }
      if (det.open) {
        bioAudio = new Audio(det.getAttribute("data-track"));
        bioAudio.volume = 0.5;
        bioAudio.play().catch(function () {});
      }
    });
  });

  // Cookie consent + Google Analytics (GA4 only loads after explicit consent)
  var GA_ID = "G-44GPZ7HCP6";
  var CONSENT_KEY = "cwl-consent";

  function loadGA() {
    if (window.__cwlGALoaded) { return; }
    window.__cwlGALoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }

  var banner = document.getElementById("cookie-banner");
  var acceptBtn = document.getElementById("cookie-accept");
  var declineBtn = document.getElementById("cookie-decline");
  var consent = null;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  if (consent === "accepted") {
    loadGA();
  } else if (consent !== "declined" && banner) {
    banner.hidden = false;
  }

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, "accepted"); } catch (e) {}
    if (banner) { banner.hidden = true; }
    loadGA();
  }
  function decline() {
    try { localStorage.setItem(CONSENT_KEY, "declined"); } catch (e) {}
    if (banner) { banner.hidden = true; }
  }

  // Direct listeners on the buttons...
  if (acceptBtn) { acceptBtn.addEventListener("click", accept); }
  if (declineBtn) { declineBtn.addEventListener("click", decline); }

  // ...plus delegated listeners on document as a fallback, in case the
  // direct references above ever go stale (e.g. a cached script race).
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) { return; }
    if (t.closest("#cookie-accept")) { accept(); }
    else if (t.closest("#cookie-decline")) { decline(); }
  });
})();
