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
      report: "Hacer un reporte", close: "Cerrar", step: "Paso", of: "de", back: "Atrás", next: "Siguiente", send: "Enviar reporte", skip: "Saltar",
      t_loc: "¿Dónde estás?", t_color: "¿De qué color está el agua?", t_surf: "¿Qué ves en la superficie?",
      t_odor: "¿Cómo huele el agua?", t_anom: "¿Observaste algo fuera de lo normal?", t_end: "Cuéntanos más",
      h_loc: "La fecha y la hora se registran solas.", h_skip: "Puedes dejarlo en blanco.", h_color: "Elige el más parecido. Si no se aprecia (por ejemplo, de noche), pasa a la siguiente.", h_multi: "Marca todo lo que observes. Puedes dejarlo en blanco.",
      loc_btn: "Usar mi ubicación", loc_wait: "Buscando señal GPS…", loc_ok: "Ubicación lista", loc_acc: "precisión aprox.",
      loc_mapbtn: "Marcar en el mapa", loc_pin: "Poner pin aquí", loc_tap: "Mueve el mapa hasta el lugar exacto y pulsa «Poner pin aquí».", loc_err: "No pude obtener el GPS. Mueve el mapa hasta el lugar y pulsa «Poner pin aquí».",
      loc_need: "Marca la ubicación para continuar.",
      comment: "¿Algo te pareció fuera de lo normal? ¿En qué se diferencia el agua de hoy de lo habitual?",
      photo: "Añadir foto (opcional)", photo_ok: "Foto lista", photo_rm: "Quitar foto",
      more: "Más detalles (opcional)", fishing: "¿Estás pescando ahora?", yes: "Sí", no: "No",
      catch_: "Captura respecto a lo normal", depth: "Profundidad de trabajo",
      name: "Tu nombre (opcional)", contact: "Teléfono o correo (opcional, privado)",
      privacy: "El reporte se revisa antes de aparecer en el mapa. Tu nombre y contacto nunca se publican.",
      empty: "Responde al menos una pregunta, o añade un comentario o una foto.",
      sent: "¡Gracias! Reporte enviado.", sent2: "Lo revisaremos antes de publicarlo en el mapa.",
      saved: "Reporte guardado en tu teléfono.", saved2: "Se enviará solo cuando haya conexión a internet.",
      bad: "El servidor no aceptó el reporte. Revisa los datos e inténtalo de nuevo.",
      again: "Enviar otro reporte", pending: "reporte(s) guardado(s) sin enviar", retry: "Enviar ahora",
      test: "Modo de prueba: el envío aún no está conectado.",
      map_empty: "Todavía no hay reportes publicados.", map_err: "No se pudo cargar el mapa de reportes.",
      p_photo: "Foto", p_comment: "Comentario", p_odor: "Olor", p_surf: "Superficie", p_anom: "Anomalías", p_color: "Color",
      acct_q: "¿Quieres aparecer en el ranking de colaboradores?", acct_enter: "Entrar o crear cuenta", acct_opt: "Es opcional: puedes reportar sin cuenta.", hello: "Hola", mine: "Mis reportes", logout: "Salir", tab_login: "Entrar", tab_signup: "Crear cuenta", nick: "Nombre de usuario", nick_hint: "3 a 20 letras, números, _ o -. Será público en el ranking.", pass_: "Contraseña", pass_hint: "Mínimo 6 caracteres. No se puede recuperar: anótala.", do_login: "Entrar", do_signup: "Crear cuenta", err_nick: "El nombre de usuario debe tener de 3 a 20 letras, números, _ o -.", err_pass: "La contraseña debe tener al menos 6 caracteres.", err_taken: "Ese nombre de usuario ya está en uso. Elige otro.", err_login: "Correo o contraseña incorrectos.", err_net: "Sin conexión. Inténtalo de nuevo.", err_conf: "No se pudo crear la cuenta ahora. Avisa al equipo.", mine_empty: "Aún no has enviado reportes con esta cuenta.", mine_ok: "publicados", st_pending: "En revisión", st_approved: "Publicado", st_rejected: "No publicado", as_: "Reportando como", rank_title: "Colaboradores", rank_lede: "Ranking por número de reportes publicados. El equipo revisa la calidad de cada reporte antes de aprobarlo.", rank_month: "Este mes", rank_all: "Histórico", rank_empty: "Todavía no hay reportes publicados con cuenta.", leader: "Líder del mes", rank_n: "reportes", p_by: "Por", 
      email: "Correo electrónico", email_hint: "Para confirmar tu cuenta y recuperar tu contraseña. No se publica.", err_email: "Escribe un correo válido.", check_mail: "Te enviamos un correo para confirmar tu cuenta. Ábrelo, toca el enlace y vuelve aquí. Si no llega, mira en spam.", err_confirm: "Aún no has confirmado tu correo. Revisa tu bandeja y la carpeta de spam.", resend: "Reenviar correo", resent: "Correo reenviado.", forgot: "¿Olvidaste tu contraseña?", recover_sent: "Si ese correo tiene una cuenta, te enviamos un enlace para crear una nueva contraseña.", new_pass: "Nueva contraseña", save_pass: "Guardar contraseña", welcome: "Cuenta confirmada. ¡Bienvenido!", err_link: "El enlace caducó o ya se usó. Pide uno nuevo.", err_mail_send: "No se pudo enviar el correo. Inténtalo más tarde.", pass_hint2: "Mínimo 6 caracteres.", err_taken2: "Ese nombre de usuario ya está en uso. Elige otro.", 
      card_t: "Crea tu cuenta", card_p: "Es opcional. Con una cuenta tu nombre de usuario aparece en el ranking de colaboradores y puedes ver el estado de tus reportes.", card_new: "Crear cuenta", card_have: "Ya tengo cuenta", 
      colors: { transparente: "Transparente", verde_claro: "Verde claro", verde_oscuro: "Verde oscuro", amarillo_marron: "Amarillo-marrón", rojo_marron: "Rojo-marrón", blanco_lechoso: "Blanco lechoso", otro: "Otro" },
      surface: { ninguna: "Sin anomalías", algas: "Algas flotantes (gran extensión)", espuma: "Espuma", aceite: "Película o brillo de aceite", basura: "Basura flotante / plástico", objetos: "Otros objetos extraños" },
      odor: { normal: "Normal", ligero: "Ligero olor extraño", mal_olor: "Mal olor evidente", quimico: "Olor químico" },
      anom: { ninguna: "Ninguna", peces_muertos: "Peces muertos flotando", peces_raros: "Peces con comportamiento extraño (boqueando, agrupados)", cambio_color: "Cambio repentino de color del mar", otra: "Otra (cuéntalo en el comentario)" },
      catches: { mas: "Más", normal: "Normal", menos: "Menos" },
      depths: { somera: "Somera", media: "Media", profunda: "Profunda" }
    },
    en: {
      soon: "This section will be available very soon.",
      report: "Make a report", close: "Close", step: "Step", of: "of", back: "Back", next: "Next", send: "Send report", skip: "Skip",
      t_loc: "Where are you?", t_color: "What colour is the water?", t_surf: "What do you see on the surface?",
      t_odor: "How does the water smell?", t_anom: "Did you notice anything unusual?", t_end: "Tell us more",
      h_loc: "Date and time are recorded automatically.", h_skip: "You can leave it blank.", h_color: "Pick the closest one. If you can't tell (at night, for example), just skip to the next.", h_multi: "Tick everything you observe. You can leave it blank.",
      loc_btn: "Use my location", loc_wait: "Looking for a GPS signal…", loc_ok: "Location ready", loc_acc: "approx. accuracy",
      loc_mapbtn: "Mark on the map", loc_pin: "Drop pin here", loc_tap: "Move the map to the exact spot and press “Drop pin here”.", loc_err: "Couldn't get the GPS. Move the map to the spot and press “Drop pin here”.",
      loc_need: "Mark the location to continue.",
      comment: "Did anything look unusual? How is today's water different from usual?",
      photo: "Add a photo (optional)", photo_ok: "Photo ready", photo_rm: "Remove photo",
      more: "More details (optional)", fishing: "Are you fishing now?", yes: "Yes", no: "No",
      catch_: "Catch compared with normal", depth: "Working depth",
      name: "Your name (optional)", contact: "Phone or email (optional, private)",
      privacy: "Reports are reviewed before they appear on the map. Your name and contact are never published.",
      empty: "Answer at least one question, or add a comment or a photo.",
      sent: "Thank you! Report sent.", sent2: "We'll review it before publishing it on the map.",
      saved: "Report saved on your phone.", saved2: "It will be sent automatically once you have an internet connection.",
      bad: "The server rejected the report. Check the data and try again.",
      again: "Send another report", pending: "report(s) saved and not yet sent", retry: "Send now",
      test: "Test mode: sending is not connected yet.",
      map_empty: "No reports have been published yet.", map_err: "The reports map could not be loaded.",
      p_photo: "Photo", p_comment: "Comment", p_odor: "Smell", p_surf: "Surface", p_anom: "Anomalies", p_color: "Colour",
      acct_q: "Want to appear in the contributors ranking?", acct_enter: "Sign in or create an account", acct_opt: "It's optional: you can report without an account.", hello: "Hi", mine: "My reports", logout: "Sign out", tab_login: "Sign in", tab_signup: "Create account", nick: "Username", nick_hint: "3 to 20 letters, numbers, _ or -. It will be public in the ranking.", pass_: "Password", pass_hint: "At least 6 characters. It can't be recovered: write it down.", do_login: "Sign in", do_signup: "Create account", err_nick: "The username must be 3 to 20 letters, numbers, _ or -.", err_pass: "The password must be at least 6 characters.", err_taken: "That username is already taken. Pick another.", err_login: "Wrong email or password.", err_net: "No connection. Please try again.", err_conf: "The account couldn't be created right now. Let the team know.", mine_empty: "You haven't sent any reports with this account yet.", mine_ok: "published", st_pending: "Under review", st_approved: "Published", st_rejected: "Not published", as_: "Reporting as", rank_title: "Contributors", rank_lede: "Ranking by number of published reports. The team checks the quality of every report before approving it.", rank_month: "This month", rank_all: "All time", rank_empty: "No published reports with an account yet.", leader: "Leader of the month", rank_n: "reports", p_by: "By", 
      email: "Email", email_hint: "To confirm your account and recover your password. Never published.", err_email: "Enter a valid email.", check_mail: "We sent you an email to confirm your account. Open it, tap the link and come back here. Check spam if it doesn't arrive.", err_confirm: "You haven't confirmed your email yet. Check your inbox and spam folder.", resend: "Resend email", resent: "Email sent again.", forgot: "Forgot your password?", recover_sent: "If that email has an account, we sent you a link to set a new password.", new_pass: "New password", save_pass: "Save password", welcome: "Account confirmed. Welcome!", err_link: "The link expired or was already used. Request a new one.", err_mail_send: "The email couldn't be sent. Try again later.", pass_hint2: "At least 6 characters.", err_taken2: "That username is already taken. Pick another.", 
      card_t: "Create your account", card_p: "It's optional. With an account your username appears in the contributors ranking and you can follow the status of your reports.", card_new: "Create account", card_have: "I already have an account", 
      colors: { transparente: "Clear", verde_claro: "Light green", verde_oscuro: "Dark green", amarillo_marron: "Yellow-brown", rojo_marron: "Red-brown", blanco_lechoso: "Milky white", otro: "Other" },
      surface: { ninguna: "Nothing unusual", algas: "Floating algae (large area)", espuma: "Foam", aceite: "Oil film or sheen", basura: "Floating litter / plastic", objetos: "Other strange objects" },
      odor: { normal: "Normal", ligero: "Slightly odd smell", mal_olor: "Clearly bad smell", quimico: "Chemical smell" },
      anom: { ninguna: "None", peces_muertos: "Dead fish floating", peces_raros: "Fish behaving strangely (gasping, clustered)", cambio_color: "Sudden change in sea colour", otra: "Other (tell us in the comment)" },
      catches: { mas: "More", normal: "Normal", menos: "Less" },
      depths: { somera: "Shallow", media: "Medium", profunda: "Deep" }
    },
    fr: {
      soon: "Cette section sera disponible très bientôt.",
      report: "Faire un signalement", close: "Fermer", step: "Étape", of: "sur", back: "Retour", next: "Suivant", send: "Envoyer le signalement", skip: "Passer",
      t_loc: "Où êtes-vous ?", t_color: "De quelle couleur est l'eau ?", t_surf: "Que voyez-vous à la surface ?",
      t_odor: "Quelle odeur a l'eau ?", t_anom: "Avez-vous remarqué quelque chose d'inhabituel ?", t_end: "Dites-nous-en plus",
      h_loc: "La date et l'heure sont enregistrées automatiquement.", h_skip: "Vous pouvez laisser vide.", h_color: "Choisissez la plus proche. Si on ne la distingue pas (la nuit, par exemple), passez à la suivante.", h_multi: "Cochez tout ce que vous observez. Vous pouvez laisser vide.",
      loc_btn: "Utiliser ma position", loc_wait: "Recherche du signal GPS…", loc_ok: "Position prête", loc_acc: "précision approx.",
      loc_mapbtn: "Marquer sur la carte", loc_pin: "Placer le repère ici", loc_tap: "Déplacez la carte jusqu'à l'endroit exact et appuyez sur « Placer le repère ici ».", loc_err: "Impossible d'obtenir le GPS. Déplacez la carte jusqu'à l'endroit et appuyez sur « Placer le repère ici ».",
      loc_need: "Indiquez la position pour continuer.",
      comment: "Quelque chose vous a semblé inhabituel ? En quoi l'eau d'aujourd'hui diffère-t-elle de l'habitude ?",
      photo: "Ajouter une photo (facultatif)", photo_ok: "Photo prête", photo_rm: "Retirer la photo",
      more: "Plus de détails (facultatif)", fishing: "Pêchez-vous en ce moment ?", yes: "Oui", no: "Non",
      catch_: "Prises par rapport à la normale", depth: "Profondeur de travail",
      name: "Votre nom (facultatif)", contact: "Téléphone ou e-mail (facultatif, privé)",
      privacy: "Les signalements sont vérifiés avant d'apparaître sur la carte. Votre nom et vos coordonnées ne sont jamais publiés.",
      empty: "Répondez à au moins une question, ou ajoutez un commentaire ou une photo.",
      sent: "Merci ! Signalement envoyé.", sent2: "Nous le vérifierons avant de le publier sur la carte.",
      saved: "Signalement enregistré sur votre téléphone.", saved2: "Il sera envoyé automatiquement dès que vous aurez une connexion internet.",
      bad: "Le serveur a refusé le signalement. Vérifiez les données et réessayez.",
      again: "Envoyer un autre signalement", pending: "signalement(s) enregistré(s) non envoyé(s)", retry: "Envoyer maintenant",
      test: "Mode test : l'envoi n'est pas encore connecté.",
      map_empty: "Aucun signalement n'a encore été publié.", map_err: "La carte des signalements n'a pas pu être chargée.",
      p_photo: "Photo", p_comment: "Commentaire", p_odor: "Odeur", p_surf: "Surface", p_anom: "Anomalies", p_color: "Couleur",
      acct_q: "Voulez-vous figurer au classement des contributeurs ?", acct_enter: "Se connecter ou créer un compte", acct_opt: "C'est facultatif : vous pouvez signaler sans compte.", hello: "Bonjour", mine: "Mes signalements", logout: "Déconnexion", tab_login: "Connexion", tab_signup: "Créer un compte", nick: "Nom d'utilisateur", nick_hint: "3 à 20 lettres, chiffres, _ ou -. Il sera public dans le classement.", pass_: "Mot de passe", pass_hint: "6 caractères minimum. Impossible à récupérer : notez-le.", do_login: "Se connecter", do_signup: "Créer un compte", err_nick: "Le nom d'utilisateur doit avoir 3 à 20 lettres, chiffres, _ ou -.", err_pass: "Le mot de passe doit avoir au moins 6 caractères.", err_taken: "Ce nom d'utilisateur est déjà pris. Choisissez-en un autre.", err_login: "E-mail ou mot de passe incorrect.", err_net: "Pas de connexion. Réessayez.", err_conf: "Le compte n'a pas pu être créé pour le moment. Prévenez l'équipe.", mine_empty: "Vous n'avez pas encore envoyé de signalement avec ce compte.", mine_ok: "publiés", st_pending: "En cours de vérification", st_approved: "Publié", st_rejected: "Non publié", as_: "Signalement en tant que", rank_title: "Contributeurs", rank_lede: "Classement par nombre de signalements publiés. L'équipe vérifie la qualité de chaque signalement avant de l'approuver.", rank_month: "Ce mois-ci", rank_all: "Depuis le début", rank_empty: "Aucun signalement publié avec un compte pour l'instant.", leader: "Leader du mois", rank_n: "signalements", p_by: "Par", 
      email: "E-mail", email_hint: "Pour confirmer votre compte et récupérer votre mot de passe. Jamais publié.", err_email: "Saisissez un e-mail valide.", check_mail: "Nous vous avons envoyé un e-mail pour confirmer votre compte. Ouvrez-le, touchez le lien et revenez ici. Vérifiez les spams s'il n'arrive pas.", err_confirm: "Vous n'avez pas encore confirmé votre e-mail. Vérifiez votre boîte de réception et vos spams.", resend: "Renvoyer l'e-mail", resent: "E-mail renvoyé.", forgot: "Mot de passe oublié ?", recover_sent: "Si cet e-mail a un compte, nous vous avons envoyé un lien pour définir un nouveau mot de passe.", new_pass: "Nouveau mot de passe", save_pass: "Enregistrer le mot de passe", welcome: "Compte confirmé. Bienvenue !", err_link: "Le lien a expiré ou a déjà été utilisé. Demandez-en un nouveau.", err_mail_send: "L'e-mail n'a pas pu être envoyé. Réessayez plus tard.", pass_hint2: "6 caractères minimum.", err_taken2: "Ce nom d'utilisateur est déjà pris. Choisissez-en un autre.", 
      card_t: "Créez votre compte", card_p: "C'est facultatif. Avec un compte, votre nom d'utilisateur apparaît dans le classement des contributeurs et vous suivez l'état de vos signalements.", card_new: "Créer un compte", card_have: "J'ai déjà un compte", 
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
  window.CS_TX = TX; window.CS_SWATCH = SWATCH;  // reutilizados por moderacion.js
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
  // Cuenta opcional (Supabase Auth, correo + nombre de usuario + contraseña). Sin sesión todo funciona como anónimo.
  var SKEY = "cwl-cs-session", session = null;
  try { session = JSON.parse(localStorage.getItem(SKEY) || "null"); } catch (e) { session = null; }
  function saveSession() { try { if (session) { localStorage.setItem(SKEY, JSON.stringify(session)); } else { localStorage.removeItem(SKEY); } } catch (e) {} }
  function authPost(path, body) {
    return fetch(C.url + "/auth/v1/" + path, { method: "POST", headers: { apikey: C.key, "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); });
  }
  function setSession(j) {
    var u = j.user || {};
    session = { access: j.access_token, refresh: j.refresh_token, uid: u.id, nick: (u.user_metadata || {}).nickname || (session && session.nick) || "" };
    saveSession();
  }
  function refreshSession() {
    if (!session) { return Promise.resolve(false); }
    return authPost("token?grant_type=refresh_token", { refresh_token: session.refresh }).then(function (r) {
      if (r.ok) { setSession(r.j); return true; }
      return false;
    }, function () { return false; });
  }
  // withUser: usar el token de la cuenta (si hay sesión); si caduca, se renueva una vez
  function api(path, opts, withUser) {
    var h = { apikey: C.key };
    if (withUser && session) { h.Authorization = "Bearer " + session.access; }
    else if (/^eyJ/.test(C.key)) { h.Authorization = "Bearer " + C.key; }  // las claves sb_publishable_ no son JWT
    var o = Object.assign({}, opts, { headers: Object.assign(h, opts.headers || {}) });
    return fetch(C.url + path, o).then(function (r) {
      if (r.status === 401 && withUser && session && !opts._retried) {
        return refreshSession().then(function (ok) {
          if (!ok) { session = null; saveSession(); renderAccount(); return r; }
          return api(path, Object.assign({}, opts, { _retried: true }), withUser);
        });
      }
      return r;
    });
  }

  // ───────────── Envío (con cola sin conexión) ─────────────
  var flushing = false;
  // Devuelve "ok" | "offline" | "rejected"
  function sendOne(item) {
    var asUser = !!(item.uid && session && session.uid === item.uid);
    var photoStep = Promise.resolve(true);
    if (item.photo) {
      photoStep = fetch(item.photo).then(function (r) { return r.blob(); }).then(function (blob) {
        return api("/storage/v1/object/report-photos/" + item.rec.photo_path, { method: "POST", headers: { "Content-Type": "image/jpeg" }, body: blob }, asUser);
      }).then(function (r) {
        if (r.ok) { return true; }
        return r.text().then(function (txt) { return /duplicate|already exists/i.test(txt); });
      });
    }
    return photoStep.then(function (photoOk) {
      if (!photoOk) { return "offline"; }
      return api("/rest/v1/reports", { method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(item.rec) }, asUser)
        .then(function (r) {
          if (r.ok) { return "ok"; }
          if (r.status === 409) { return r.json().then(function (j) { return j && j.code === "23505" ? "ok" : "rejected"; }, function () { return "ok"; }); }
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
    var form = {};
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
          marker = L.marker([lat, lon]).addTo(map);
        } else { marker.setLatLng([lat, lon]); }
        if (pan) { map.setView([lat, lon], 16); }
      }
    }
    function locate() {
      if (!navigator.geolocation) { locStatus.textContent = t.loc_err; showMap(); return; }
      locStatus.textContent = t.loc_wait; locStatus.className = "cs-loc-status";
      navigator.geolocation.getCurrentPosition(function (p) {
        setPoint(p.coords.latitude, p.coords.longitude, p.coords.accuracy, true);
      }, function () { locStatus.textContent = t.loc_err; locStatus.className = "cs-loc-status is-err"; showMap(); },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 30000 });
    }
    var mapShown = false;
    function showMap() {
      mapSection.hidden = false; mapShown = true; initPick();
      setTimeout(function () { if (map) { map.invalidateSize(); } if (mapSection.scrollIntoView) { mapSection.scrollIntoView({ block: "nearest", behavior: "smooth" }); } }, 60);
    }
    var locBtn = el("button", { type: "button", class: "cs-btn cs-btn-primary cs-btn-big", text: t.loc_btn, onclick: locate });
    var mapBtn = el("button", { type: "button", class: "cs-btn cs-btn-ghost cs-btn-big", text: t.loc_mapbtn, onclick: showMap });
    var pinBtn = el("button", { type: "button", class: "cs-btn cs-btn-ghost cs-btn-big", text: t.loc_pin, onclick: function () {
      if (!map) { return; }
      var c = map.getCenter(); setPoint(c.lat, c.lng, null, false);
    } });
    var mapWrap = el("div", { class: "cs-map-wrap" }, [mapBox, el("div", { class: "cs-reticle", "aria-hidden": "true" })]);
    var mapSection = el("div", { class: "cs-map-section", hidden: "" }, [el("p", { class: "cs-hint", text: t.loc_tap }), mapWrap, pinBtn]);
    panes.loc = el("div", {}, [locBtn, mapBtn, locStatus, mapSection]);

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
    var more = el("div", { class: "cs-fishing-more", hidden: "" });
    function buildMore() {  // captura y profundidad solo tienen sentido si está pescando; se reinician al cambiar la respuesta
      state.catch_ = ""; state.depth = ""; more.textContent = "";
      more.hidden = state.fishing !== true;
      more.appendChild(el("p", { class: "cs-label", text: t.catch_ }));
      more.appendChild(single(["mas", "normal", "menos"], t.catches, "catch_", false, false));
      more.appendChild(el("p", { class: "cs-label", text: t.depth }));
      more.appendChild(single(["somera", "media", "profunda"], t.depths, "depth", false, false));
    }
    function fishingYN() {
      var w = el("div", { class: "cs-grid cs-grid-3" });
      function draw() {
        w.textContent = "";
        [[true, t.yes], [false, t.no]].forEach(function (o) {
          w.appendChild(tile(o[1], state.fishing === o[0], function () { state.fishing = state.fishing === o[0] ? null : o[0]; draw(); buildMore(); }));
        });
      }
      draw(); return w;
    }
    buildMore();
    var details = el("details", { class: "cs-details" }, [
      el("summary", { text: t.more }),
      el("p", { class: "cs-label", text: t.fishing }), fishingYN(), more
    ]);
    var nameIn = el("input", { type: "text", class: "cs-input", maxlength: "80", placeholder: t.name, "aria-label": t.name, autocomplete: "nickname" });
    var contactIn = el("input", { type: "text", class: "cs-input", maxlength: "120", placeholder: t.contact, "aria-label": t.contact });
    var honey = el("input", { type: "text", class: "cs-hp", tabindex: "-1", autocomplete: "off", "aria-hidden": "true", name: "website" });
    var who = session ? el("p", { class: "cs-hint", text: t.as_ + " @" + session.nick }) : nameIn;
    panes.end = el("div", {}, [comment, el("div", { class: "cs-photo-row" }, [photoLbl, photoIn, photoNote]), details, who, contactIn, honey, el("p", { class: "cs-hint", text: t.privacy })]);

    var heads = { loc: [t.t_loc, t.h_loc], color: [t.t_color, t.h_color], surf: [t.t_surf, t.h_multi], odor: [t.t_odor, t.h_skip], anom: [t.t_anom, t.h_multi], end: [t.t_end, ""] };

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
      if (k === "loc" && mapShown) { initPick(); if (map) { map.invalidateSize(); } }
      if (i > 0 && dlg) { dlg.scrollTop = 0; }
    }
    function initPick() {
      if (map || !window.L) { return; }
      map = L.map("cs-pick-map", { zoomControl: true }).setView(state.lat != null ? [state.lat, state.lon] : HAVANA, state.lat != null ? 16 : 12);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(map);
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
        name: session ? null : (nameIn.value.trim() || null), contact: contactIn.value.trim() || null, lang: LANG
      };
      var q = loadQueue(); q.push({ rec: rec, photo: state.photo, uid: session ? session.uid : null });
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
      finished = true;
      root.textContent = "";
      var l1 = kind === "sent" ? t.sent : t.saved, l2 = kind === "sent" ? t.sent2 : t.saved2;
      root.appendChild(el("div", { class: "cs-card cs-done" }, [
        el("h3", { class: "cs-title", text: l1 }), el("p", { text: testMode ? t.test : l2 }),
        el("button", { type: "button", class: "cs-btn cs-btn-primary", text: t.again, onclick: function () { finished = false; root.textContent = ""; current = initForm(root); } }),
        el("button", { type: "button", class: "cs-btn cs-btn-ghost", text: t.close, onclick: closeDlg })
      ]));
      refreshPending();
      if (kind === "sent") { loadPublicMap(); }
    }

    go(0);
    form.refresh = function () { if (map) { map.invalidateSize(); } };
    // Si el permiso de ubicación ya fue concedido, se localiza sin pedir un toque más
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then(function (p) { if (p.state === "granted") { locate(); } }, function () {});
    }
    return form;
  }

  // ───────────── Aviso de reportes pendientes ─────────────
  var pendingBox, dlg, current, finished = false, root_;
  function closeDlg() { if (dlg.close) { dlg.close(); } else { dlg.removeAttribute("open"); } document.documentElement.classList.remove("cs-lock"); }
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
    row(t.p_by, r.nickname ? "@" + r.nickname : "");
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

  // ───────────── Cuenta (opcional) ─────────────
  var acctBox, authDlg, authBody, rankBox;
  function openDialog(d) { if (d.showModal) { d.showModal(); } else { d.setAttribute("open", ""); } document.documentElement.classList.add("cs-lock"); d.scrollTop = 0; }
  function closeDialog(d) { if (d.close) { d.close(); } else { d.removeAttribute("open"); } document.documentElement.classList.remove("cs-lock"); }
  function resetForm() { if (!dlg || dlg.open) { return; } root_.textContent = ""; current = null; finished = false; }
  function pageUrl() { return location.origin + location.pathname; }  // vuelta tras confirmar el correo / recuperar contraseña

  function renderAccount() {
    if (!acctBox) { return; }
    acctBox.textContent = "";
    if (session) {
      acctBox.className = "cs-acct";
      acctBox.appendChild(el("span", { class: "cs-acct-who", text: t.hello + ", @" + session.nick }));
      acctBox.appendChild(el("button", { type: "button", class: "cs-link", text: t.mine, onclick: function () { showAuth("mine"); } }));
      acctBox.appendChild(el("button", { type: "button", class: "cs-link", text: t.logout, onclick: function () { session = null; saveSession(); renderAccount(); resetForm(); } }));
    } else {
      acctBox.className = "cs-acct cs-acct-card";
      acctBox.appendChild(el("h3", { class: "cs-acct-title", text: t.card_t }));
      acctBox.appendChild(el("p", { text: t.card_p }));
      acctBox.appendChild(el("div", { class: "cs-acct-btns" }, [
        el("button", { type: "button", class: "cs-btn cs-btn-primary", text: t.card_new, onclick: function () { showAuth("signup"); } }),
        el("button", { type: "button", class: "cs-btn cs-btn-ghost", text: t.card_have, onclick: function () { showAuth("login"); } })
      ]));
    }
  }
  function showAuth(mode) {
    authBody.textContent = "";
    var card = el("div", { class: "cs-card" });
    authBody.appendChild(card);
    if (mode === "mine") { renderMine(card); openDialog(authDlg); return; }
    if (mode === "forgot") { renderForgot(card); openDialog(authDlg); return; }
    if (mode === "newpass") { renderNewPass(card); openDialog(authDlg); return; }
    var signup = mode === "signup";
    card.appendChild(el("div", { class: "mod-tabs", role: "tablist" }, [["login", t.tab_login], ["signup", t.tab_signup]].map(function (x) {
      return el("button", { type: "button", role: "tab", class: "mod-tab", "aria-selected": x[0] === mode ? "true" : "false", text: x[1], onclick: function () { showAuth(x[0]); } });
    })));
    var nick = signup ? el("input", { type: "text", class: "cs-input", maxlength: "20", placeholder: t.nick, "aria-label": t.nick, autocomplete: "nickname", autocapitalize: "none", spellcheck: "false" }) : null;
    var mail = el("input", { type: "email", class: "cs-input", placeholder: t.email, "aria-label": t.email, autocomplete: signup ? "email" : "username", autocapitalize: "none", spellcheck: "false" });
    var pass = el("input", { type: "password", class: "cs-input", placeholder: t.pass_, "aria-label": t.pass_, autocomplete: signup ? "new-password" : "current-password" });
    var msg = el("p", { class: "cs-msg", role: "alert" });
    var extra = el("div", { class: "cs-auth-extra" });
    var btn = el("button", { type: "submit", class: "cs-btn cs-btn-primary cs-btn-big", text: signup ? t.do_signup : t.do_login });
    var form = el("form", { class: "cs-auth-form" }, [nick, signup ? el("p", { class: "cs-hint", text: t.nick_hint }) : null, mail, signup ? el("p", { class: "cs-hint", text: t.email_hint }) : null, pass, signup ? el("p", { class: "cs-hint", text: t.pass_hint2 }) : null, msg, extra, btn,
      signup ? null : el("button", { type: "button", class: "cs-link", text: t.forgot, onclick: function () { showAuth("forgot"); } })]);
    function offerResend(email) {
      extra.textContent = "";
      extra.appendChild(el("button", { type: "button", class: "cs-link", text: t.resend, onclick: function () {
        authPost("resend", { type: "signup", email: email, options: { emailRedirectTo: pageUrl() } }).then(function (r) { msg.textContent = r.ok ? t.resent : t.err_mail_send; }, function () { msg.textContent = t.err_net; });
      } }));
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault(); msg.textContent = ""; extra.textContent = "";
      var n = signup ? nick.value.trim() : "", em = mail.value.trim().toLowerCase();
      if (signup && !/^[A-Za-z0-9_-]{3,20}$/.test(n)) { msg.textContent = t.err_nick; return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { msg.textContent = t.err_email; return; }
      if (pass.value.length < 6) { msg.textContent = t.err_pass; return; }
      btn.disabled = true;
      function fail(err) { btn.disabled = false; msg.textContent = err || t.err_net; }
      if (signup) {
        // el nombre de usuario es público y único: se comprueba antes (los perfiles son de lectura pública)
        api("/rest/v1/profiles?select=nickname&nickname=ilike." + encodeURIComponent(n.replace(/[\\_%]/g, "\\$&")) + "&limit=1", { method: "GET" })
          .then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; })
          .then(function (taken) {
            if (taken.length) { fail(t.err_taken2); return; }
            return authPost("signup?redirect_to=" + encodeURIComponent(pageUrl()), { email: em, password: pass.value, data: { nickname: n } }).then(function (r) {
              btn.disabled = false;
              var code = ((r.j && (r.j.error_code || r.j.code)) || "") + "";
              if (r.ok && r.j.access_token) { startSession(r.j, n); return; }  // por si el proyecto no exige confirmar
              if (r.ok) { form.textContent = ""; form.appendChild(el("p", { class: "cs-ok", text: t.check_mail })); offerResend(em); form.appendChild(extra); return; }
              if (/weak_password/.test(code)) { msg.textContent = t.err_pass; }
              else if (/email_address_invalid|validation/.test(code)) { msg.textContent = t.err_email; }
              else if (/over_email_send_rate_limit|rate/.test(code)) { msg.textContent = t.err_mail_send; }
              else if (/mail|smtp/i.test((r.j && r.j.msg) || "") || /smtp|email_send/.test(code)) { msg.textContent = t.err_mail_send; }
              else if (/unexpected_failure/.test(code) || r.status >= 500) { msg.textContent = t.err_taken2; }
              else { msg.textContent = t.err_conf; }
            });
          }).catch(function () { fail(); });
      } else {
        authPost("token?grant_type=password", { email: em, password: pass.value }).then(function (r) {
          btn.disabled = false;
          if (r.ok && r.j.access_token) { startSession(r.j); return; }
          if (/email_not_confirmed/.test((r.j && (r.j.error_code || r.j.code)) + "")) { msg.textContent = t.err_confirm; offerResend(em); return; }
          msg.textContent = t.err_login;
        }, function () { fail(); });
      }
    });
    card.appendChild(form);
    openDialog(authDlg);
  }
  function startSession(j, nick) {
    j.user = j.user || {}; j.user.user_metadata = Object.assign(nick ? { nickname: nick } : {}, j.user.user_metadata);
    setSession(j); closeDialog(authDlg); renderAccount(); resetForm(); loadRanking(); flush().then(refreshPending);
  }
  function renderForgot(card) {
    var mail = el("input", { type: "email", class: "cs-input", placeholder: t.email, "aria-label": t.email, autocomplete: "email" });
    var msg = el("p", { class: "cs-msg", role: "alert" });
    var btn = el("button", { type: "submit", class: "cs-btn cs-btn-primary cs-btn-big", text: t.forgot.replace(/[?¿]/g, "").trim() });
    var form = el("form", { class: "cs-auth-form" }, [el("h3", { class: "cs-title", text: t.forgot }), mail, msg, btn]);
    form.addEventListener("submit", function (e) {
      e.preventDefault(); btn.disabled = true;
      authPost("recover?redirect_to=" + encodeURIComponent(pageUrl()), { email: mail.value.trim().toLowerCase() }).then(function (r) {
        btn.disabled = false; msg.className = r.ok ? "cs-ok" : "cs-msg"; msg.textContent = r.ok ? t.recover_sent : t.err_mail_send;
      }, function () { btn.disabled = false; msg.textContent = t.err_net; });
    });
    card.appendChild(form);
  }
  function renderNewPass(card) {
    var pass = el("input", { type: "password", class: "cs-input", placeholder: t.new_pass, "aria-label": t.new_pass, autocomplete: "new-password" });
    var msg = el("p", { class: "cs-msg", role: "alert" });
    var btn = el("button", { type: "submit", class: "cs-btn cs-btn-primary cs-btn-big", text: t.save_pass });
    var form = el("form", { class: "cs-auth-form" }, [el("h3", { class: "cs-title", text: t.new_pass }), pass, el("p", { class: "cs-hint", text: t.pass_hint2 }), msg, btn]);
    form.addEventListener("submit", function (e) {
      e.preventDefault(); msg.textContent = "";
      if (pass.value.length < 6) { msg.textContent = t.err_pass; return; }
      btn.disabled = true;
      fetch(C.url + "/auth/v1/user", { method: "PUT", headers: { apikey: C.key, Authorization: "Bearer " + session.access, "Content-Type": "application/json" }, body: JSON.stringify({ password: pass.value }) })
        .then(function (r) { btn.disabled = false; if (!r.ok) { msg.textContent = t.err_link; return; } closeDialog(authDlg); renderAccount(); resetForm(); loadRanking(); }, function () { btn.disabled = false; msg.textContent = t.err_net; });
    });
    card.appendChild(form);
  }
  // Vuelta desde el enlace del correo (confirmar cuenta / recuperar contraseña): la sesión llega en el hash de la URL
  function handleAuthRedirect() {
    var h = location.hash.replace(/^#/, "");
    if (!h || !/access_token=|error=/.test(h)) { return; }
    var p = {}; h.split("&").forEach(function (kv) { var i = kv.indexOf("="); if (i > 0) { p[kv.slice(0, i)] = decodeURIComponent(kv.slice(i + 1).replace(/\+/g, " ")); } });
    history.replaceState(null, "", location.pathname + location.search);
    if (p.error) { authBody.textContent = ""; var c = el("div", { class: "cs-card" }, [el("p", { class: "cs-msg", text: t.err_link })]); authBody.appendChild(c); openDialog(authDlg); return; }
    fetch(C.url + "/auth/v1/user", { headers: { apikey: C.key, Authorization: "Bearer " + p.access_token } })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (u) {
        setSession({ access_token: p.access_token, refresh_token: p.refresh_token, user: u });
        renderAccount(); resetForm(); loadRanking(); flush().then(refreshPending);
        if (p.type === "recovery") { showAuth("newpass"); }
        else { authBody.textContent = ""; authBody.appendChild(el("div", { class: "cs-card cs-done" }, [el("h3", { class: "cs-title", text: t.welcome }), el("button", { type: "button", class: "cs-btn cs-btn-primary", text: t.close, onclick: function () { closeDialog(authDlg); } })])); openDialog(authDlg); }
      })
      .catch(function () { authBody.textContent = ""; authBody.appendChild(el("div", { class: "cs-card" }, [el("p", { class: "cs-msg", text: t.err_link })])); openDialog(authDlg); });
  }
  function renderMine(card) {
    card.appendChild(el("h3", { class: "cs-title", text: t.mine + " — @" + session.nick }));
    var list = el("div", { class: "cs-mine" });
    card.appendChild(list);
    // el filtro por user_id es necesario: si la cuenta también es moderadora, la política de moderación deja ver todos los reportes
    api("/rest/v1/reports?select=id,observed_at,status,comment&user_id=eq." + encodeURIComponent(session.uid) + "&order=observed_at.desc&limit=30", { method: "GET" }, true)
      .then(function (r) { if (!r.ok) { throw 0; } return r.json(); })
      .then(function (rows) {
        if (!rows.length) { list.appendChild(el("p", { class: "cs-note", text: t.mine_empty })); return; }
        var ok = rows.filter(function (x) { return x.status === "approved"; }).length;
        list.appendChild(el("p", { class: "cs-hint", text: ok + " " + t.mine_ok + " / " + rows.length }));
        rows.forEach(function (x) {
          list.appendChild(el("div", { class: "cs-mine-row" }, [
            el("span", { class: "cs-mine-date", text: new Date(x.observed_at).toLocaleString(LANG) }),
            el("span", { class: "mod-badge cs-st-" + x.status, text: t["st_" + x.status] }),
            x.comment ? el("span", { class: "cs-mine-comment", text: x.comment }) : null
          ]));
        });
      })
      .catch(function () { list.appendChild(el("p", { class: "cs-note", text: t.err_net })); });
  }

  // ───────────── Ranking ─────────────
  var rankPeriod = "month";
  function loadRanking() {
    if (!rankBox || !LIVE) { return; }
    api("/rest/v1/rpc/ranking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ period: rankPeriod }) })
      .then(function (r) { if (!r.ok) { throw 0; } return r.json(); })
      .then(function (rows) {
        rankBox.hidden = false;
        rankBox.textContent = "";
        rankBox.appendChild(el("h3", { class: "cs-rank-title", text: t.rank_title }));
        rankBox.appendChild(el("p", { class: "cs-caption", text: t.rank_lede }));
        rankBox.appendChild(el("div", { class: "mod-tabs", role: "tablist" }, [["month", t.rank_month], ["all", t.rank_all]].map(function (x) {
          return el("button", { type: "button", role: "tab", class: "mod-tab", "aria-selected": rankPeriod === x[0] ? "true" : "false", text: x[1], onclick: function () { rankPeriod = x[0]; loadRanking(); } });
        })));
        if (!rows.length) { rankBox.appendChild(el("p", { class: "cs-note", text: t.rank_empty })); return; }
        var ol = el("ol", { class: "cs-rank" });
        rows.forEach(function (x, i) {
          var li = el("li", { class: i === 0 ? "cs-rank-top" : "" }, [
            el("span", { class: "cs-rank-pos", text: String(i + 1) }),
            el("span", { class: "cs-rank-nick" }, [el("span", { text: "@" + x.nickname }), (i === 0 && rankPeriod === "month") ? el("small", { text: t.leader }) : null]),
            el("span", { class: "cs-rank-n", text: x.total + " " + t.rank_n })
          ]);
          ol.appendChild(li);
        });
        rankBox.appendChild(ol);
      })
      .catch(function () { rankBox.hidden = true; });
  }

  // ───────────── Arranque ─────────────
  var cta = document.getElementById("cs-cta");
  if (!cta) { return; }
  if (!LIVE && !PREVIEW) {
    cta.appendChild(el("div", { class: "cs-card cs-done" }, [el("h3", { class: "cs-title", text: t.soon })]));
    var mapSec = document.getElementById("cs-map-section"); if (mapSec) { mapSec.hidden = true; }
    var rk = document.getElementById("cs-ranking"); if (rk) { rk.hidden = true; }
    return;
  }
  pendingBox = el("p", { class: "cs-pending", hidden: "" });
  cta.appendChild(pendingBox);
  if (!LIVE) { cta.appendChild(el("p", { class: "cs-pending", text: t.test })); }

  var root = el("div", { id: "cs-app" });
  root_ = root;
  dlg = el("dialog", { class: "cs-dialog", "aria-label": t.report });
  dlg.appendChild(el("button", { type: "button", class: "cs-close", "aria-label": t.close, text: "×", onclick: closeDlg }));
  dlg.appendChild(root);
  dlg.addEventListener("close", function () { document.documentElement.classList.remove("cs-lock"); });
  document.body.appendChild(dlg);
  cta.appendChild(el("button", {
    type: "button", class: "cs-btn cs-btn-primary cs-btn-big cs-open", text: t.report,
    onclick: function () {
      if (finished) { finished = false; root.textContent = ""; current = null; }
      if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute("open", ""); }
      document.documentElement.classList.add("cs-lock");
      dlg.scrollTop = 0;
      if (!current) { current = initForm(root); }
      setTimeout(function () { current.refresh(); }, 60);
    }
  }));

  acctBox = el("p", { class: "cs-acct" });
  cta.appendChild(acctBox);
  authDlg = el("dialog", { class: "cs-dialog", "aria-label": t.acct_enter });
  authBody = el("div");
  authDlg.appendChild(el("button", { type: "button", class: "cs-close", "aria-label": t.close, text: "×", onclick: function () { closeDialog(authDlg); } }));
  authDlg.appendChild(authBody);
  authDlg.addEventListener("close", function () { document.documentElement.classList.remove("cs-lock"); });
  document.body.appendChild(authDlg);
  rankBox = document.getElementById("cs-ranking");
  if (rankBox) { rankBox.hidden = true; }
  renderAccount();
  handleAuthRedirect();
  if (/[?&]cuenta=1/.test(location.search)) { history.replaceState(null, "", location.pathname); showAuth(session ? "mine" : "signup"); }
  loadRanking();
  refreshPending();
  loadPublicMap();
  window.addEventListener("online", function () { flush().then(refreshPending); });
  flush().then(refreshPending);
})();
