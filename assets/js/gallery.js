(function () {
  "use strict";
  var grid = document.querySelector(".gallery-grid");
  if (!grid) { return; }
  var tiles = Array.prototype.slice.call(grid.querySelectorAll(".gallery-tile"));
  var cats = {};
  try { cats = JSON.parse(grid.getAttribute("data-cats") || "{}"); } catch (e) {}

  // ───────────── Filtros por categoría ─────────────
  var bar = document.createElement("div");
  bar.className = "mod-tabs gallery-filters";
  bar.setAttribute("role", "tablist");
  function chip(key, label) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "mod-tab"; b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", key === "" ? "true" : "false");
    b.textContent = label; b.setAttribute("data-k", key);
    b.addEventListener("click", function () { apply(key); });
    return b;
  }
  bar.appendChild(chip("", grid.getAttribute("data-all") || "All"));
  Object.keys(cats).forEach(function (k) { bar.appendChild(chip(k, cats[k])); });
  grid.parentNode.insertBefore(bar, grid);

  function visible() { return tiles.filter(function (t) { return !t.hidden; }); }
  function apply(key) {
    tiles.forEach(function (t) { t.hidden = !!key && t.getAttribute("data-cat") !== key; });
    Array.prototype.forEach.call(bar.children, function (b) { b.setAttribute("aria-selected", b.getAttribute("data-k") === key ? "true" : "false"); });
  }

  // ───────────── Visor ampliado ─────────────
  var dlg = document.createElement("dialog");
  dlg.className = "gl-dialog";
  dlg.innerHTML = '<button type="button" class="gl-btn gl-close"></button><button type="button" class="gl-btn gl-prev">‹</button><button type="button" class="gl-btn gl-next">›</button><figure class="gl-fig"><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(dlg);
  var img = dlg.querySelector("img"), cap = dlg.querySelector("figcaption"), idx = 0, list = [];
  dlg.querySelector(".gl-close").textContent = "×";
  dlg.querySelector(".gl-close").setAttribute("aria-label", grid.getAttribute("data-close") || "Close");
  dlg.querySelector(".gl-prev").setAttribute("aria-label", grid.getAttribute("data-prev") || "Previous");
  dlg.querySelector(".gl-next").setAttribute("aria-label", grid.getAttribute("data-next") || "Next");

  function show(i) {
    idx = (i + list.length) % list.length;
    var t = list[idx], im = t.querySelector("img");
    img.src = im.src; img.alt = im.alt; cap.textContent = t.querySelector("figcaption").textContent;
  }
  function open(tile) {
    list = visible(); show(list.indexOf(tile));
    if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute("open", ""); }
    document.documentElement.classList.add("cs-lock");
  }
  function close() { if (dlg.close) { dlg.close(); } else { dlg.removeAttribute("open"); } document.documentElement.classList.remove("cs-lock"); }
  dlg.addEventListener("close", function () { document.documentElement.classList.remove("cs-lock"); });
  dlg.querySelector(".gl-close").addEventListener("click", close);
  dlg.querySelector(".gl-prev").addEventListener("click", function () { show(idx - 1); });
  dlg.querySelector(".gl-next").addEventListener("click", function () { show(idx + 1); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) { close(); } });
  document.addEventListener("keydown", function (e) {
    if (!dlg.open) { return; }
    if (e.key === "ArrowLeft") { show(idx - 1); } else if (e.key === "ArrowRight") { show(idx + 1); }
  });
  var x0 = null;
  dlg.addEventListener("touchstart", function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
  dlg.addEventListener("touchend", function (e) {
    if (x0 === null) { return; }
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) { show(idx + (dx < 0 ? 1 : -1)); }
  });

  tiles.forEach(function (t) {
    t.tabIndex = 0; t.setAttribute("role", "button");
    t.addEventListener("click", function () { open(t); });
    t.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(t); } });
  });
})();
