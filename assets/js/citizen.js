(function () {
  "use strict";

  var C = window.CS_CONFIG || {};
  var LANG = (document.documentElement.lang || "es").slice(0, 2);
  if (["es", "en", "fr"].indexOf(LANG) < 0) { LANG = "es"; }
  var LIVE = !!(C.url && C.key);
  var PREVIEW = /[?&]preview=1/.test(location.search);
  var QUEUE_KEY = "cwl-cs-queue";
  var HAVANA = [23.14, -82.345];

  // ───────────── Textos ─────────────
  var TX = {
    es: {
      soon: "Esta sección estará disponible muy pronto.",
      step: "Paso", of: "de", back: "Atrás", next: "Siguiente", send: "Enviar reporte", skip: "Saltar",
      t_loc: "¿Dónde estás?", t_color: "¿De qué color está el agua?", t_surf: "¿Qué ves en la superficie?",
      t_odor: "¿Cómo huele el agua?", t_anom: "¿Observaste algo fuera de lo normal?", t_end: "Cuéntanos más",
      h_loc: "La fecha y la hora se registran solas.", h_color: "Elige el más parecido.", h_multi: "Marca todo lo que observes.",
      loc_btn: "Usar mi ubicación", loc_wait: "Buscando señal GPS…", loc_ok: "Ubicación lista", loc_acc: "precisión aprox.",
      loc_tap: "O toca el mapa para marcar el punto.", loc_err: "No pude obtener el GPS. Toca el mapa para marcar el punto.",
      loc_need: "Marca la ubicación para continuar.",
      comment: "¿Algo te pareció fuera de lo normal? ¿En qué se diferencia el agua de hoy de lo habitual?",
      photo: "Añadir foto (opcional)", photo_ok: "Foto lista", photo_rm: "Quitar foto",
      more: "Más detalles (opcional)", fishing: "¿Estás pescando ahora?", yes: "Sí", no: "No",
      catch_: "Captura respecto a lo normal", depth: "Profundidad de trabajo",
      name: "Tu nombre o apodo (opcional)", contact: "Teléfono o correo (opcional, privado)",
      privacy: "El reporte se revisa antes de aparecer en el mapa. Tu nombre y contacto nunca se publican.",
      empty: "Responde al menos una pregunta, o añade un comentario o una foto.",
      sent: "¡Gracias! Reporte enviado.", sent2: "Lo revisaremos antes de publicarlo en el mapa.",
      saved: "Reporte guardado en tu teléfono.", saved2: "Se enviará solo cuando haya conexión a internet.",
      bad: "El servidor no aceptó el reporte. Revisa los datos e inténtalo de nuevo.",
      again: "Enviar otro reporte", pending: "reporte(s) guardado(s) sin enviar", retry: "Enviar ahora",
      test: "Modo de prueba: el envío aún no está conectado.",
      map_empty: "Todavía no hay reportes publicados.", map_err: "No se pudo cargar el mapa de reportes.",
      p_photo: "Foto", p_comment: "Comentario", p_odor: "Olor", p_surf: "Superficie", p_anom: "Anomalías", p_color: "Color",
      colors: { transparente: "Transparente", verde_claro: "Verde claro", verde_oscuro: "Verde oscuro", amarillo_marron: "Amarillo-marrón", rojo_marron: "Rojo-marrón", blanco_lechoso: "Blanco lechoso", otro: "Otro" },
      surface: { ninguna: "Sin anomalías", algas: "Algas flotantes (gran extensión)", espuma: "Espuma", aceite: "Película o brillo de aceite", basura: "Basura flotante / plástico", objetos: "Otros objetos extraños" },
      odor: { normal: "Normal", ligero: "Ligero olor extraño", mal_olor: "Mal olor evidente", quimico: "Olor químico" },
      anom: { ninguna: "Ninguna", peces_muertos: "Peces muertos flotando", peces_raros: "Peces con comportamiento extraño (boqueando, agrupados)", cambio_color: "Cambio repentino de color del mar", otra: "Otra (cuéntalo en el comentario)" },
      catches: { mas: "Más", normal: "Normal", menos: "Menos" },
      depths: { somera: "Somera", media: "Media", profunda: "Profunda" }
    },
    en: {
      soon: "This section will be available very soon.",
      step: "Step", of: "of", back: "Back", next: "Next", send: "Send report", skip: "Skip",
      t_loc: "Where are you?", t_color: "What colour is the water?", t_surf: "What do you see on the surface?",
      t_odor: "How does the water smell?", t_anom: "Did you notice anything unusual?", t_end: "Tell us more",
      h_loc: "Date and time are recorded automatically.", h_color: "Pick the closest one.", h_multi: "Tick everything you observe.",
      loc_btn: "Use my location", loc_wait: "Looking for a GPS signal…", loc_ok: "Location ready", loc_acc: "approx. accuracy",
      loc_tap: "Or tap the map to mark the spot.", loc_err: "Couldn't get the GPS. Tap the map to mark the spot.",
      loc_need: "Mark the location to continue.",
      comment: "Did anything look unusual? How is today's water different from usual?",
      photo: "Add a photo (optional)", photo_ok: "Photo ready", photo_rm: "Remove photo",
      more: "More details (optional)", fishing: "Are you fishing now?", yes: "Yes", no: "No",
      catch_: "Catch compared with normal", depth: "Working depth",
      name: "Your name or nickname (optional)", contact: "Phone or email (optional, private)",
      privacy: "Reports are reviewed before they appear on the map. Your name and contact are never published.",
      empty: "Answer at least one question, or add a comment or a photo.",
      sent: "Thank you! Report sent.", sent2: "We'll review it before publishing it on the map.",
      saved: "Report saved on your phone.", saved2: "It will be sent automatically once you have an internet connection.",
      bad: "The server rejected the report. Check the data and try again.",
      again: "Send another report", pending: "report(s) saved and not yet sent", retry: "Send now",
      test: "Test mode: sending is not connected yet.",
      map_empty: "No reports have been published yet.", map_err: "The reports map could not be loaded.",
      p_photo: "Photo", p_comment: "Comment", p_odor: "Smell", p_surf: "Surface", p_anom: "Anomalies", p_color: "Colour",
      colors: { transparente: "Clear", verde_claro: "Light green", verde_oscuro: "Dark green", amarillo_marron: "Yellow-brown", rojo_marron: "Red-brown", blanco_lechoso: "Milky white", otro: "Other" },
      surface: { ninguna: "Nothing unusual", algas: "Floating algae (large area)", espuma: "Foam", aceite: "Oil film or sheen", basura: "Floating litter / plastic", objetos: "Other strange objects" },
      odor: { normal: "Normal", ligero: "Slightly odd smell", mal_olor: "Clearly bad smell", quimico: "Chemical smell" },
      anom: { ninguna: "None", peces_muertos: "Dead fish floating", peces_raros: "Fish behaving strangely (gasping, clustered)", cambio_color: "Sudden change in sea colour", otra: "Other (tell us in the comment)" },
      catches: { mas: "More", normal: "Normal", menos: "Less" },
      depths: { somera: "Shallow", media: "Medium", profunda: "Deep" }
    },
    fr: {
      soon: "Cette section sera disponible très bientôt.",
      step: "Étape", of: "sur", back: "Retour", next: "Suivant", send: "Envoyer le signalement", skip: "Passer",
      t_loc: "Où êtes-vous ?", t_color: "De quelle couleur est l'eau ?", t_surf: "Que voyez-vous à la surface ?",
      t_odor: "Quelle odeur a l'eau ?", t_anom: "Avez-vous remarqué quelque chose d'inhabituel ?", t_end: "Dites-nous-en plus",
      h_loc: "La date et l'heure sont enregistrées automatiquement.", h_color: "Choisissez la plus proche.", h_multi: "Cochez tout ce que vous observez.",
      loc_btn: "Utiliser ma position", loc_wait: "Recherche du signal GPS…", loc_ok: "Position prête", loc_acc: "précision approx.",
      loc_tap: "Ou touchez la carte pour marquer l'endroit.", loc_err: "Impossible d'obtenir le GPS. Touchez la carte pour marquer l'endroit.",
      loc_need: "Indiquez la position pour continuer.",
      comment: "Quelque chose vous a semblé inhabituel ? En quoi l'eau d'aujourd'hui diffère-t-elle de l'habitude ?",
      photo: "Ajouter une photo (facultatif)", photo_ok: "Photo prête", photo_rm: "Retirer la photo",
      more: "Plus de détails (facultatif)", fishing: "Pêchez-vous en ce moment ?", yes: "Oui", no: "Non",
      catch_: "Prises par rapport à la normale", depth: "Profondeur de travail",
      name: "Votre nom ou pseudo (facultatif)", contact: "Téléphone ou e-mail (facultatif, privé)",
      privacy: "Les signalements sont vérifiés avant d'apparaître sur la carte. Votre nom et vos coordonnées ne sont jamais publiés.",
      empty: "Répondez à au moins une question, ou ajoutez un commentaire ou une photo.",
      sent: "Merci ! Signalement envoyé.", sent2: "Nous le vérifierons avant de le publier sur la carte.",
      saved: "Signalement enregistré sur votre téléphone.", saved2: "Il sera envoyé automatiquement dès que vous aurez une connexion internet.",
      bad: "Le serveur a refusé le signalement. Vérifiez les données et réessayez.",
      again: "Envoyer un autre signalement", pending: "signalement(s) enregistré(s) non envoyé(s)", retry: "Envoyer maintenant",
      test: "Mode test : l'envoi n'est pas encore connecté.",
      map_empty: "Aucun signalement n'a encore été publié.", map_err: "La carte des signalements n'a pas pu être chargée.",
      p_photo: "Photo", p_comment: "Commentaire", p_odor: "Odeur", p_surf: "Surface", p_anom: "Anomalies", p_color: "Couleur",
      colors: { transparente: "Transparente", verde_claro: "Vert clair", verde_oscuro: "Vert foncé", amarillo_marron: "Jaune-brun", rojo_marron: "Rouge-brun", blanco_lechoso: "Blanc laiteux", otro: "Autre" },
      surface: { ninguna: "Rien d'anormal", algas: "Algues flottantes (grande étendue)", espuma: "Mousse", aceite: "Film ou irisation d'huile", basura: "Déchets flottants / plastique", objetos: "Autres objets étranges" },
      odor: { normal: "Normale", ligero: "Légère odeur étrange", mal_olor: "Mauvaise odeur évidente", quimico: "Odeur chimique" },
      anom: { ninguna: "Aucune", peces_muertos: "Poissons morts à la surface", peces_raros: "Poissons au comportement étrange (haletants, regroupés)", cambio_color: "Changement soudain de la couleur de la mer", otra: "Autre (dites-le dans le commentaire)" },
      catches: { mas: "Plus", normal: "Normale", menos: "Moins" },
      depths: { somera: "Faible", media: "Moyenne", profunda: "Grande" }
    }
  };
  var t = TX[LANG];

  var SWATCH = { transparente: "#d6ecee", verde_claro: "#9ccf86", verde_oscuro: "#2f6b3a", amarillo_marron: "#b99a4a", rojo_marron: "#8c4a35", blanco_lechoso: "#ecebe4", otro: "" };
  var STEPS = ["loc", "color", "surf", "odor", "anom", "end"];

  // ───────────── Utilidades ─────────────
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
  function uuid() {
    if (window.crypto && crypto.randomUUID) { return crypto.randomUUID(); }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16);
    });
  }
  function loadQueue() { try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"); } catch (e) { return []; } }
  function saveQueue(q) { try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); return true; } catch (e) { return false; } }
  function api(path, opts) {
    opts.headers = Object.assign({ apikey: C.key, Authorization: "Bearer " + C.key }, opts.headers || {});
    return fetch(C.url + path, opts);
  }

  // ───────────── Envío (con cola sin conexión) ─────────────
  var flushing = false;
  // Devuelve "ok" | "offline" | "rejected"
  function sendOne(item) {
    var photoStep = Promise.resolve(true);
    if (item.photo) {
      photoStep = fetch(item.photo).then(function (r) { return r.blob(); }).then(function (blob) {
        return api("/storage/v1/object/report-photos/" + item.rec.photo_path, { method: "POST", headers: { "Content-Type": "image/jpeg" }, body: blob });
      }).then(function (r) {
        if (r.ok) { return true; }
        return r.text().then(function (txt) { return /duplicate|already exists/i.test(txt); });
      });
    }
    return photoStep.then(function (photoOk) {
      if (!photoOk) { return "offline"; }
      return api("/rest/v1/reports", { method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(item.rec) })
        .then(function (r) {
          if (r.ok || r.status === 409) { return "ok"; }
          return (r.status === 400 || r.status === 422) ? "rejected" : "offline";
        });
    }).catch(function () { return "offline"; });
  }
  function flush() {
    if (!LIVE || flushing) { return Promise.resolve(); }
    flushing = true;
    var results = { ok: 0, offline: 0, rejected: 0 };
    function next() {
      var q = loadQueue();
      if (!q.length) { return Promise.resolve(); }
      return sendOne(q[0]).then(function (res) {
        results[res]++;
        if (res === "offline") { return; }
        saveQueue(loadQueue().filter(function (i) { return i.rec.id !== q[0].rec.id; }));
        return next();
      });
    }
    return next().then(function () { flushing = false; return results; }, function () { flushing = false; return results; });
  }

  // ───────────── Foto ─────────────
  function compress(file) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      var url = URL.createObjectURL(file);
      img.onload = function () {
        var max = 1024, s = Math.min(1, max / Math.max(img.width, img.height));
        var cv = document.createElement("canvas");
        cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        resolve(cv.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(); };
      img.src = url;
    });
  }

  // ───────────── Formulario por pasos ─────────────
  function initForm(root) {
    var state = { lat: null, lon: null, acc: null, color: "", surface: [], odor: "", anomalies: [], photo: null, fishing: null, catch_: "", depth: "" };
    var cur = 0;
    var map, marker;
    var panes = {};

    var progress = el("div", { class: "cs-progress" });
    var bar = el("div", { class: "cs-bar" }, [el("span")]);
    var title = el("h3", { class: "cs-title" });
    var hint = el("p", { class: "cs-hint" });
    var body = el("div", { class: "cs-body" });
    var msg = el("p", { class: "cs-msg", role: "alert" });
    var backBtn = el("button", { type: "button", class: "cs-btn cs-btn-ghost", text: t.back, onclick: function () { go(cur - 1); } });
    var nextBtn = el("button", { type: "button", class: "cs-btn cs-btn-primary" });  // onclick lo fija go()
    var nav = el("div", { class: "cs-nav" }, [backBtn, nextBtn]);
    var card = el("div", { class: "cs-card" }, [progress, bar, title, hint, body, msg, nav]);
    root.appendChild(card);

    function tile(label, pressed, onclick, swatch) {
      var b = el("button", { type: "button", class: "cs-tile", "aria-pressed": pressed ? "true" : "false", onclick: onclick });
      if (swatch !== undefined) {
        b.appendChild(el("span", { class: "cs-swatch" + (swatch ? "" : " cs-swatch-other"), style: swatch ? "background:" + swatch : null }));
      }
      b.appendChild(el("span", { text: label }));
      return b;
    }
    function single(keys, labels, prop, withSwatch, auto) {
      var wrap = el("div", { class: "cs-grid" + (withSwatch ? " cs-grid-colors" : "") });
      function draw() {
        wrap.textContent = "";
        keys.forEach(function (k) {
          wrap.appendChild(tile(labels[k], state[prop] === k, function () {
            state[prop] = state[prop] === k ? "" : k;
            draw();
            if (auto && state[prop]) { setTimeout(function () { go(cur + 1); }, 250); }
          }, withSwatch ? SWATCH[k] : undefined));
        });
      }
      draw();
      return wrap;
    }
    function multi(keys, labels, prop) {
      var wrap = el("div", { class: "cs-grid" });
      function draw() {
        wrap.textContent = "";
        keys.forEach(function (k) {
          wrap.appendChild(tile(labels[k], state[prop].indexOf(k) >= 0, function () {
            var a = state[prop], i = a.indexOf(k);
            if (i >= 0) { a.splice(i, 1); }
            else if (k === "ninguna") { a.length = 0; a.push(k); }
            else { a.push(k); var z = a.indexOf("ninguna"); if (z >= 0) { a.splice(z, 1); } }
            draw();
          }));
        });
      }
      draw();
      return wrap;
    }

    // Paso 1 — ubicación
    var locStatus = el("p", { class: "cs-loc-status" });
    var mapBox = el("div", { class: "cs-map-pick", id: "cs-pick-map" });
    function setPoint(lat, lon, acc, pan) {
      state.lat = lat; state.lon = lon; state.acc = acc || null;
      locStatus.textContent = t.loc_ok + ": " + lat.toFixed(5) + ", " + lon.toFixed(5) + (acc ? " (±" + Math.round(acc) + " m, " + t.loc_acc + ")" : "");
      locStatus.className = "cs-loc-status is-ok";
      msg.textContent = "";
      if (map) {
        if (!marker) {
          marker = L.marker([lat, lon], { draggable: true }).addTo(map);
          marker.on("dragend", function () { var p = marker.getLatLng(); setPoint(p.lat, p.lng, null, false); });
        } else { marker.setLatLng([lat, lon]); }
        if (pan) { map.setView([lat, lon], 16); }
      }
    }
    function locate() {
      if (!navigator.geolocation) { locStatus.textContent = t.loc_err; return; }
      locStatus.textContent = t.loc_wait; locStatus.className = "cs-loc-status";
      navigator.geolocation.getCurrentPosition(function (p) {
        setPoint(p.coords.latitude, p.coords.longitude, p.coords.accuracy, true);
      }, function () { locStatus.textContent = t.loc_err; locStatus.className = "cs-loc-status is-err"; },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 30000 });
    }
    var locBtn = el("button", { type: "button", class: "cs-btn cs-btn-primary cs-btn-big", text: t.loc_btn, onclick: locate });
    panes.loc = el("div", {}, [locBtn, locStatus, el("p", { class: "cs-hint", text: t.loc_tap }), mapBox]);

    panes.color = single(["transparente", "verde_claro", "verde_oscuro", "amarillo_marron", "rojo_marron", "blanco_lechoso", "otro"], t.colors, "color", true, true);
    panes.surf = multi(["ninguna", "algas", "espuma", "aceite", "basura", "objetos"], t.surface, "surface");
    panes.odor = single(["normal", "ligero", "mal_olor", "quimico"], t.odor, "odor", false, true);
    panes.anom = multi(["ninguna", "peces_muertos", "peces_raros", "cambio_color", "otra"], t.anom, "anomalies");

    // Paso final
    var comment = el("textarea", { class: "cs-input", rows: "4", maxlength: "1000", placeholder: t.comment, "aria-label": t.comment });
    var photoIn = el("input", { type: "file", accept: "image/*", class: "cs-file", id: "cs-photo" });
    var photoLbl = el("label", { class: "cs-btn cs-btn-ghost", for: "cs-photo", text: t.photo });
    var photoNote = el("span", { class: "cs-photo-note" });
    photoIn.addEventListener("change", function () {
      if (!photoIn.files[0]) { return; }
      compress(photoIn.files[0]).then(function (d) {
        state.photo = d;
        photoNote.textContent = "";
        photoNote.appendChild(el("img", { src: d, alt: "", class: "cs-thumb" }));
        photoNote.appendChild(el("span", { text: t.photo_ok + " " }));
        photoNote.appendChild(el("button", { type: "button", class: "cs-link", text: t.photo_rm, onclick: function () { state.photo = null; photoIn.value = ""; photoNote.textContent = ""; } }));
      }, function () { photoIn.value = ""; });
    });
    function yn(prop) {
      var w = el("div", { class: "cs-grid cs-grid-3" });
      function draw() {
        w.textContent = "";
        [[true, t.yes], [false, t.no]].forEach(function (o) {
          w.appendChild(tile(o[1], state[prop] === o[0], function () { state[prop] = state[prop] === o[0] ? null : o[0]; draw(); }));
        });
      }
      draw(); return w;
    }
    var details = el("details", { class: "cs-details" }, [
      el("summary", { text: t.more }),
      el("p", { class: "cs-label", text: t.fishing }), yn("fishing"),
      el("p", { class: "cs-label", text: t.catch_ }), single(["mas", "normal", "menos"], t.catches, "catch_", false, false),
      el("p", { class: "cs-label", text: t.depth }), single(["somera", "media", "profunda"], t.depths, "depth", false, false)
    ]);
    var nameIn = el("input", { type: "text", class: "cs-input", maxlength: "80", placeholder: t.name, "aria-label": t.name, autocomplete: "nickname" });
    var contactIn = el("input", { type: "text", class: "cs-input", maxlength: "120", placeholder: t.contact, "aria-label": t.contact });
    var honey = el("input", { type: "text", class: "cs-hp", tabindex: "-1", autocomplete: "off", "aria-hidden": "true", name: "website" });
    panes.end = el("div", {}, [comment, el("div", { class: "cs-photo-row" }, [photoLbl, photoIn, photoNote]), details, nameIn, contactIn, honey, el("p", { class: "cs-hint", text: t.privacy })]);

    var heads = { loc: [t.t_loc, t.h_loc], color: [t.t_color, t.h_color], surf: [t.t_surf, t.h_multi], odor: [t.t_odor, ""], anom: [t.t_anom, t.h_multi], end: [t.t_end, ""] };

    function go(i) {
      if (i > cur && cur === 0 && state.lat == null) { msg.textContent = t.loc_need; return; }
      if (i < 0 || i >= STEPS.length) { return; }
      cur = i; msg.textContent = "";
      var k = STEPS[i];
      body.textContent = ""; body.appendChild(panes[k]);
      title.textContent = heads[k][0]; hint.textContent = heads[k][1]; hint.hidden = !heads[k][1];
      progress.textContent = t.step + " " + (i + 1) + " " + t.of + " " + STEPS.length;
      bar.firstChild.style.width = ((i + 1) / STEPS.length * 100) + "%";
      backBtn.style.visibility = i === 0 ? "hidden" : "visible";
      nextBtn.textContent = i === STEPS.length - 1 ? t.send : t.next;
      nextBtn.onclick = i === STEPS.length - 1 ? submit : function () { go(cur + 1); };
      if (k === "loc") { initPick(); }
      if (card.scrollIntoView && i > 0) { card.scrollIntoView({ block: "start", behavior: "smooth" }); }
    }
    function initPick() {
      if (map || !window.L) { return; }
      map = L.map("cs-pick-map", { zoomControl: true }).setView(state.lat != null ? [state.lat, state.lon] : HAVANA, state.lat != null ? 16 : 12);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(map);
      map.on("click", function (e) { setPoint(e.latlng.lat, e.latlng.lng, null, false); });
      if (state.lat != null) { setPoint(state.lat, state.lon, state.acc, false); }
    }

    function submit() {
      if (honey.value) { done("sent"); return; }
      var any = state.color || state.surface.length || state.odor || state.anomalies.length || comment.value.trim() || state.photo;
      if (!any) { msg.textContent = t.empty; return; }
      var id = uuid();
      var rec = {
        id: id, observed_at: new Date().toISOString(),
        lat: +state.lat.toFixed(6), lon: +state.lon.toFixed(6),
        color: state.color || null, surface: state.surface, odor: state.odor || null, anomalies: state.anomalies,
        comment: comment.value.trim() || null,
        fishing_now: state.fishing, catch_vs_normal: state.catch_ || null, depth: state.depth || null,
        photo_path: state.photo ? id + ".jpg" : null,
        name: nameIn.value.trim() || null, contact: contactIn.value.trim() || null, lang: LANG
      };
      var q = loadQueue(); q.push({ rec: rec, photo: state.photo });
      if (!saveQueue(q) && state.photo) { // sin espacio local: guardar sin foto antes que perder el reporte
        q[q.length - 1].photo = null; q[q.length - 1].rec.photo_path = null; saveQueue(q);
      }
      nextBtn.disabled = true;
      if (!LIVE) { done("saved", true); return; }
      flush().then(function () {
        var left = loadQueue().some(function (i) { return i.rec.id === id; });
        done(left ? "saved" : "sent");
      });
    }
    function done(kind, testMode) {
      root.textContent = "";
      var l1 = kind === "sent" ? t.sent : t.saved, l2 = kind === "sent" ? t.sent2 : t.saved2;
      root.appendChild(el("div", { class: "cs-card cs-done" }, [
        el("h3", { class: "cs-title", text: l1 }), el("p", { text: testMode ? t.test : l2 }),
        el("button", { type: "button", class: "cs-btn cs-btn-primary", text: t.again, onclick: function () { root.textContent = ""; initForm(root); } })
      ]));
      refreshPending();
      if (kind === "sent") { loadPublicMap(); }
    }

    go(0);
    // Si el permiso de ubicación ya fue concedido, se localiza sin pedir un toque más
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then(function (p) { if (p.state === "granted") { locate(); } }, function () {});
    }
  }

  // ───────────── Aviso de reportes pendientes ─────────────
  var pendingBox;
  function refreshPending() {
    if (!pendingBox) { return; }
    var n = loadQueue().length;
    pendingBox.textContent = "";
    pendingBox.hidden = !n || !LIVE;
    if (n && LIVE) {
      pendingBox.appendChild(el("span", { text: n + " " + t.pending + " " }));
      pendingBox.appendChild(el("button", { type: "button", class: "cs-link", text: t.retry, onclick: function () { flush().then(refreshPending); } }));
    }
  }

  // ───────────── Mapa público ─────────────
  var pubMap, pubLayer;
  function popup(r) {
    var d = el("div", { class: "cs-pop" });
    d.appendChild(el("strong", { text: new Date(r.observed_at).toLocaleString(LANG) }));
    function row(label, val) { if (val) { d.appendChild(el("div", {}, [el("em", { text: label + ": " }), el("span", { text: val })])); } }
    row(t.p_color, t.colors[r.color]);
    row(t.p_surf, (r.surface || []).map(function (k) { return t.surface[k]; }).filter(Boolean).join(", "));
    row(t.p_odor, t.odor[r.odor]);
    row(t.p_anom, (r.anomalies || []).map(function (k) { return t.anom[k]; }).filter(Boolean).join(", "));
    row(t.p_comment, r.comment);
    if (r.photo_path) {
      var u = C.url + "/storage/v1/object/public/report-photos/" + encodeURIComponent(r.photo_path);
      d.appendChild(el("a", { href: u, target: "_blank", rel: "noopener" }, [el("img", { src: u, alt: t.p_photo, class: "cs-pop-img", loading: "lazy" })]));
    }
    return d;
  }
  function loadPublicMap() {
    var box = document.getElementById("cs-public-map");
    if (!box || !LIVE || !window.L) { return; }
    var note = document.getElementById("cs-map-note");
    if (!pubMap) {
      pubMap = L.map(box).setView(HAVANA, 12);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(pubMap);
      pubLayer = L.layerGroup().addTo(pubMap);
    }
    api("/rest/v1/reports_public?select=*&order=observed_at.desc&limit=300", { method: "GET" })
      .then(function (r) { if (!r.ok) { throw 0; } return r.json(); })
      .then(function (rows) {
        pubLayer.clearLayers();
        if (note) { note.textContent = rows.length ? "" : t.map_empty; }
        rows.forEach(function (r) {
          var c = SWATCH[r.color] || "#f5a300";
          L.circleMarker([r.lat, r.lon], { radius: 9, color: "#16233d", weight: 2, fillColor: c, fillOpacity: 0.95 }).bindPopup(popup(r)).addTo(pubLayer);
        });
        if (rows.length) { pubMap.fitBounds(L.latLngBounds(rows.map(function (r) { return [r.lat, r.lon]; })).pad(0.3), { maxZoom: 15 }); }
      })
      .catch(function () { if (note) { note.textContent = t.map_err; } });
  }

  // ───────────── Arranque ─────────────
  var root = document.getElementById("cs-app");
  if (!root) { return; }
  if (!LIVE && !PREVIEW) {
    root.appendChild(el("div", { class: "cs-card cs-done" }, [el("h3", { class: "cs-title", text: t.soon })]));
    var mapSec = document.getElementById("cs-map-section"); if (mapSec) { mapSec.hidden = true; }
    return;
  }
  pendingBox = el("p", { class: "cs-pending", hidden: "" });
  root.parentNode.insertBefore(pendingBox, root);
  if (!LIVE) { root.parentNode.insertBefore(el("p", { class: "cs-pending", text: t.test }), root); }
  initForm(root);
  refreshPending();
  loadPublicMap();
  window.addEventListener("online", function () { flush().then(refreshPending); });
  flush().then(refreshPending);
})();
