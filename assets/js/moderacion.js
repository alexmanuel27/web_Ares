(function () {
  "use strict";

  var C = window.CS_CONFIG || {};
  var T = (window.CS_TX || {}).es;          // etiquetas en español, compartidas con citizen.js
  var SWATCH = window.CS_SWATCH || {};
  var KEY = "cwl-mod-session";
  var HAVANA = [23.14, -82.345];
  var root = document.getElementById("mod-app");
  if (!root || !T || !C.url) { return; }

  var session = null, tab = "pending", rows = [], counts = {}, map, layer, markers = {}, selected = null;
  var TABS = [["pending", "Pendientes"], ["approved", "Publicados"], ["rejected", "Rechazados"]];

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "class") { n.className = attrs[k]; }
      else if (k === "text") { n.textContent = attrs[k]; }
      else if (k.indexOf("on") === 0) { n.addEventListener(k.slice(2), attrs[k]); }
      else if (attrs[k] !== false && attrs[k] != null) { n.setAttribute(k, attrs[k]); }
    });
    (kids || []).forEach(function (c) { if (c) { n.appendChild(c); } });
    return n;
  }
  function load() { try { session = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { session = null; } }
  function save() { try { if (session) { localStorage.setItem(KEY, JSON.stringify(session)); } else { localStorage.removeItem(KEY); } } catch (e) {} }

  // ───────────── Sesión (Supabase Auth, correo + contraseña) ─────────────
  function authPost(path, body) {
    return fetch(C.url + "/auth/v1/" + path, { method: "POST", headers: { apikey: C.key, "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); });
  }
  function setSession(j) { session = { access: j.access_token, refresh: j.refresh_token, email: (j.user && j.user.email) || (session && session.email) || "" }; save(); }
  function refresh() {
    if (!session) { return Promise.resolve(false); }
    return authPost("token?grant_type=refresh_token", { refresh_token: session.refresh }).then(function (r) {
      if (r.ok) { setSession(r.j); return true; }
      return false;
    }, function () { return false; });
  }
  // fetch autenticado; si el token caducó (401) lo renueva una vez
  function db(path, opts, retried) {
    opts = opts || {};
    opts.headers = Object.assign({ apikey: C.key, Authorization: "Bearer " + session.access }, opts.headers || {});
    return fetch(C.url + path, opts).then(function (r) {
      if (r.status === 401 && !retried) {
        return refresh().then(function (ok) {
          if (!ok) { logout("Tu sesión caducó. Entra de nuevo."); throw new Error("auth"); }
          return db(path, opts, true);
        });
      }
      return r;
    });
  }
  function logout(message) { session = null; save(); renderLogin(message); }

  // ───────────── Pantalla de acceso ─────────────
  function renderLogin(message) {
    root.textContent = "";
    var email = el("input", { type: "email", class: "cs-input", placeholder: "Correo", autocomplete: "username", required: "" });
    var pass = el("input", { type: "password", class: "cs-input", placeholder: "Contraseña", autocomplete: "current-password", required: "" });
    var msg = el("p", { class: "cs-msg", role: "alert", text: message || "" });
    var btn = el("button", { type: "submit", class: "cs-btn cs-btn-primary cs-btn-big", text: "Entrar" });
    var form = el("form", { class: "cs-card mod-login" }, [el("h3", { class: "cs-title", text: "Moderación de reportes" }), el("p", { class: "cs-hint", text: "Solo para el equipo de CubanWaterLab." }), email, pass, msg, btn]);
    form.addEventListener("submit", function (e) {
      e.preventDefault(); btn.disabled = true; msg.textContent = "";
      authPost("token?grant_type=password", { email: email.value.trim(), password: pass.value }).then(function (r) {
        btn.disabled = false;
        if (!r.ok) { msg.textContent = "Correo o contraseña incorrectos."; return; }
        setSession(r.j); start();
      }, function () { btn.disabled = false; msg.textContent = "Sin conexión. Inténtalo de nuevo."; });
    });
    root.appendChild(form);
  }

  // ───────────── Panel ─────────────
  function fetchCounts() {
    return Promise.all(TABS.map(function (tb) {
      return db("/rest/v1/reports?select=id&status=eq." + tb[0] + "&limit=1", { headers: { Prefer: "count=exact" } }).then(function (r) {
        var m = /\/(\d+)$/.exec(r.headers.get("content-range") || ""); counts[tb[0]] = m ? +m[1] : 0;
      });
    }));
  }
  function fetchRows() {
    var base = "/rest/v1/reports?status=eq." + tab + "&order=observed_at.desc&limit=200&select=";
    // con autor (requiere accounts.sql); si todavía no existe la relación, se pide sin autor
    return db(base + "*,profiles(nickname)").then(function (r) { return r.ok ? r : db(base + "*"); })
      .then(function (r) { return r.json(); }).then(function (j) { rows = Array.isArray(j) ? j : []; });
  }
  function refreshAll() { return Promise.all([fetchCounts(), fetchRows()]).then(render); }

  function start() {
    db("/rest/v1/rpc/is_moderator", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })
      .then(function (r) { return r.json(); })
      .then(function (ok) {
        if (ok !== true) { logout("Esta cuenta no tiene permisos de moderación."); return; }
        buildShell(); refreshAll();
      })
      .catch(function (e) { if (e.message !== "auth") { logout("No se pudo conectar. Inténtalo de nuevo."); } });
  }

  var tabsBox, listBox, mapBox, who;
  function buildShell() {
    root.textContent = "";
    who = el("span", { class: "mod-who", text: session.email });
    tabsBox = el("div", { class: "mod-tabs", role: "tablist" });
    mapBox = el("div", { id: "mod-map" });
    listBox = el("div", { class: "mod-list" });
    root.appendChild(el("div", { class: "mod-bar" }, [el("h3", { class: "cs-title", text: "Moderación de reportes" }), el("div", { class: "mod-user" }, [who, el("button", { type: "button", class: "cs-link", text: "Salir", onclick: function () { logout(""); } })])]));
    root.appendChild(tabsBox); root.appendChild(mapBox); root.appendChild(listBox);
    map = null;
  }
  function render() {
    tabsBox.textContent = "";
    TABS.forEach(function (tb) {
      tabsBox.appendChild(el("button", { type: "button", role: "tab", class: "mod-tab", "aria-selected": tab === tb[0] ? "true" : "false", text: tb[1] + " (" + (counts[tb[0]] || 0) + ")", onclick: function () { tab = tb[0]; selected = null; refreshAll(); } }));
    });
    renderMap(); renderList();
  }

  function renderMap() {
    if (!window.L) { mapBox.hidden = true; return; }
    if (!map) {
      map = L.map(mapBox).setView(HAVANA, 12);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(map);
      layer = L.layerGroup().addTo(map);
    }
    layer.clearLayers(); markers = {};
    rows.forEach(function (r) {
      var m = L.circleMarker([r.lat, r.lon], style(r, false)).addTo(layer);
      m.on("click", function () { select(r.id, true); });
      markers[r.id] = m;
    });
    if (!rows.length) { map.setView(HAVANA, 12); }
    if (rows.length) { map.fitBounds(L.latLngBounds(rows.map(function (r) { return [r.lat, r.lon]; })).pad(0.3), { maxZoom: 15 }); }
    setTimeout(function () { map.invalidateSize(); }, 50);
  }
  function style(r, on) { return { radius: on ? 14 : 9, color: on ? "#c0392b" : "#16233d", weight: on ? 4 : 2, fillColor: SWATCH[r.color] || "#f5a300", fillOpacity: 0.95 }; }
  function select(id, scroll) {
    if (selected && markers[selected]) { markers[selected].setStyle(style(rows.filter(function (r) { return r.id === selected; })[0], false)); }
    selected = id;
    var r = rows.filter(function (x) { return x.id === id; })[0];
    if (markers[id]) { markers[id].setStyle(style(r, true)).bringToFront(); }
    Array.prototype.forEach.call(listBox.children, function (c) { c.classList.toggle("is-selected", c.getAttribute("data-id") === id); });
    if (scroll) { var c = listBox.querySelector('[data-id="' + id + '"]'); if (c) { c.scrollIntoView({ block: "center", behavior: "smooth" }); } }
  }

  function chips(label, arr, dict) {
    var vals = (arr || []).map(function (k) { return dict[k]; }).filter(Boolean);
    return vals.length ? el("p", { class: "mod-row" }, [el("em", { text: label + ": " }), el("span", { text: vals.join(", ") })]) : null;
  }
  function renderList() {
    listBox.textContent = "";
    if (!rows.length) { listBox.appendChild(el("p", { class: "cs-note", text: "No hay reportes en esta lista." })); return; }
    rows.forEach(function (r) { listBox.appendChild(card(r)); });
  }
  function act(r, status, button) {
    button.disabled = true;
    var req = status === "delete" ? db("/rest/v1/reports?id=eq." + r.id, { method: "DELETE" })
      : db("/rest/v1/reports?id=eq." + r.id, { method: "PATCH", headers: { "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify({ status: status }) });
    req.then(function (res) {
      if (!res.ok) { throw new Error("http"); }
      return status === "delete" ? [1] : res.json();
    }).then(function (j) {
      if (!j.length) { throw new Error("denied"); }  // RLS bloqueó el cambio sin error HTTP
      refreshAll();
    }).catch(function (e) { if (e.message !== "auth") { button.disabled = false; alert("No se pudo guardar el cambio. Revisa tu conexión y tus permisos."); } });
  }
  function card(r) {
    var photo = r.photo_path ? C.url + "/storage/v1/object/public/report-photos/" + encodeURIComponent(r.photo_path) : null;
    var details = [];
    if (r.fishing_now != null) { details.push(r.fishing_now ? "Pescando ahora" : "No está pescando"); }
    if (r.catch_vs_normal) { details.push("Captura: " + T.catches[r.catch_vs_normal].toLowerCase()); }
    if (r.depth) { details.push("Profundidad: " + T.depths[r.depth].toLowerCase()); }
    // Confiabilidad por hora local (Cuba): de noche no se aprecian el color ni el comportamiento de los peces
    var when = new Date(r.observed_at), hh = when.toLocaleTimeString("es", { timeZone: "America/Havana", hour: "2-digit", minute: "2-digit", hour12: false });
    var hour = parseInt(hh, 10), night = hour >= 20 || hour < 6;
    var visual = r.color || (r.anomalies || []).some(function (k) { return k === "peces_raros" || k === "cambio_color" || k === "peces_muertos"; });
    var lateMin = r.created_at ? Math.round((new Date(r.created_at) - when) / 60000) : 0;
    var flags = [];
    if (night) { flags.push(el("span", { class: "mod-badge mod-night", text: "Nocturno · " + hh })); }
    if (night && visual) { flags.push(el("span", { class: "mod-badge mod-warn", text: "Observación visual de noche: revisar con cuidado" })); }
    if (lateMin > 15) { flags.push(el("span", { class: "mod-badge", text: "Enviado " + (lateMin >= 120 ? Math.round(lateMin / 60) + " h" : lateMin + " min") + " después (sin conexión)" })); }
    var btns = [];
    function b(label, cls, status) { var x = el("button", { type: "button", class: "cs-btn " + cls, text: label }); x.addEventListener("click", function (e) { e.stopPropagation(); if (status === "delete" && !confirm("¿Eliminar este reporte definitivamente?")) { return; } act(r, status, x); }); btns.push(x); }
    if (tab === "pending") { b("Aprobar", "cs-btn-primary", "approved"); b("Rechazar", "cs-btn-ghost", "rejected"); }
    if (tab === "approved") { b("Quitar del mapa", "cs-btn-ghost", "pending"); }
    if (tab === "rejected") { b("Aprobar", "cs-btn-primary", "approved"); b("Eliminar", "cs-btn-ghost", "delete"); }
    var c = el("article", { class: "mod-card", "data-id": r.id }, [
      el("div", { class: "mod-head" }, [
        el("span", { class: "cs-swatch" + (SWATCH[r.color] ? "" : " cs-swatch-other"), style: SWATCH[r.color] ? "background:" + SWATCH[r.color] : null }),
        el("strong", { text: when.toLocaleString("es", { timeZone: "America/Havana" }) }),
        el("button", { type: "button", class: "cs-link", text: "Ver en el mapa", onclick: function () { select(r.id, false); if (map) { map.setView([r.lat, r.lon], 16); } mapBox.scrollIntoView({ block: "center", behavior: "smooth" }); } })
      ]),
      flags.length ? el("div", { class: "mod-flags" }, flags) : null,
      r.color ? el("p", { class: "mod-row" }, [el("em", { text: "Color: " }), el("span", { text: T.colors[r.color] })]) : null,
      chips("Superficie", r.surface, T.surface), chips("Olor", r.odor ? [r.odor] : [], T.odor), chips("Anomalías", r.anomalies, T.anom),
      r.comment ? el("blockquote", { class: "mod-comment", text: r.comment }) : null,
      details.length ? el("p", { class: "mod-row", text: details.join(" · ") }) : null,
      photo ? el("a", { href: photo, target: "_blank", rel: "noopener" }, [el("img", { src: photo, alt: "Foto del reporte", class: "mod-photo", loading: "lazy" })]) : null,
      (r.name || r.contact) ? el("p", { class: "mod-row mod-private", text: "Privado — " + [r.name, r.contact].filter(Boolean).join(" · ") }) : null,
      el("p", { class: "mod-row", text: r.profiles && r.profiles.nickname ? "Autor: @" + r.profiles.nickname : (r.user_id ? "Autor: cuenta" : "Anónimo") }),
      el("p", { class: "mod-coords", text: r.lat.toFixed(5) + ", " + r.lon.toFixed(5) + " · " + (r.lang || "").toUpperCase() }),
      el("div", { class: "mod-actions" }, btns)
    ]);
    c.addEventListener("click", function () { select(r.id, false); });
    return c;
  }

  load();
  if (session) { start(); } else { renderLogin(""); }
})();
