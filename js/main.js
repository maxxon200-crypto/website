/* =====================================================================
   PALESTRA DISNEL ASD — main.js
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Config contatti ---------- */
  // Email a cui arrivano le richieste del form (MODIFICA con la tua email).
  var CONTACT_EMAIL = "info@palestradisnel.it";
  // (Opzionale) Endpoint Formspree per ricevere i messaggi via web senza email client.
  // Crea un form gratuito su https://formspree.io e incolla qui l'URL (es. "https://formspree.io/f/abcdwxyz").
  // Se lasciato vuoto, il form aprirà il programma di posta dell'utente.
  var FORMSPREE_ENDPOINT = "";

  var doc = document;
  var on = function (el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt || false); };
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };

  /* ---------- Anno footer ---------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state + back to top ---------- */
  var header = $("#header");
  var toTop = $("#to-top");
  var onScroll = function () {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
  };
  on(window, "scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var nav = $("#nav");
  var toggle = $("#nav-toggle");
  var backdrop = doc.createElement("div");
  backdrop.className = "nav-backdrop";
  doc.body.appendChild(backdrop);

  var openMenu = function () {
    nav.classList.add("is-open");
    backdrop.classList.add("is-open");
    doc.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Chiudi il menu");
  };
  var closeMenu = function () {
    nav.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    doc.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Apri il menu");
  };
  on(toggle, "click", function () {
    nav.classList.contains("is-open") ? closeMenu() : openMenu();
  });
  on(backdrop, "click", closeMenu);
  $$(".nav__link, .nav__cta", nav).forEach(function (a) { on(a, "click", closeMenu); });
  on(doc, "keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          // piccolo stagger per gli elementi nella stessa griglia
          var siblings = en.target.parentElement ? $$(".reveal", en.target.parentElement) : [];
          var idx = siblings.indexOf(en.target);
          en.target.style.transitionDelay = (idx > 0 ? Math.min(idx, 5) * 70 : 0) + "ms";
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Scrollspy nav ---------- */
  var sections = $$("main section[id]");
  var navLinks = $$(".nav__link");
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.getAttribute("id");
          navLinks.forEach(function (l) {
            l.classList.toggle("is-active", l.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Contatore statistiche ---------- */
  var counters = $$("[data-count]");
  var animateCount = function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var isYear = target > 1900; // l'anno non si anima da 0
    if (isYear) { el.textContent = target + suffix; return; }
    var start = 0, dur = 1400, t0 = null;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Orari: evidenzia oggi + stato aperto/chiuso ---------- */
  (function hoursStatus() {
    var now = new Date();
    var day = now.getDay(); // 0 = domenica
    var minutes = now.getHours() * 60 + now.getMinutes();

    var row = $('.hours tr[data-day="' + day + '"]');
    if (row) row.classList.add("is-today");

    // orari: lun-ven 9-22 (540-1320), sab 9-13 (540-780), dom chiuso
    var open = false;
    if (day >= 1 && day <= 5) open = minutes >= 540 && minutes < 1320;
    else if (day === 6) open = minutes >= 540 && minutes < 780;

    var statusEl = $("#open-status");
    if (statusEl) {
      var dot = open ? "🟢 Aperto ora" : "🔴 Chiuso ora";
      statusEl.textContent = dot + " · " + statusEl.textContent;
    }
  })();

  /* ---------- Form contatti ---------- */
  var form = $("#contact-form");
  if (form) {
    var statusEl = $("#form-status");

    var setError = function (id, msg) {
      var input = $("#" + id);
      var box = $('.form__error[data-for="' + id + '"]');
      if (input) input.classList.toggle("is-invalid", !!msg);
      if (box) box.textContent = msg || "";
      return !msg;
    };

    var validEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };

    on(form, "submit", function (e) {
      e.preventDefault();
      statusEl.textContent = "";
      statusEl.className = "form__status";

      var name = $("#cf-name").value.trim();
      var email = $("#cf-email").value.trim();
      var phone = $("#cf-phone").value.trim();
      var subject = $("#cf-subject").value;
      var message = $("#cf-message").value.trim();
      var privacy = $("#cf-privacy").checked;

      var ok = true;
      ok &= setError("cf-name", name ? "" : "Inserisci il tuo nome.");
      ok &= setError("cf-email", !email ? "Inserisci la tua email." : (validEmail(email) ? "" : "Email non valida."));
      ok &= setError("cf-message", message ? "" : "Scrivi un messaggio.");
      if (!privacy) { ok = false; statusEl.textContent = "Devi accettare l'informativa privacy."; statusEl.className = "form__status err"; }

      if (!ok) {
        if (!statusEl.textContent) { statusEl.textContent = "Controlla i campi evidenziati."; statusEl.className = "form__status err"; }
        return;
      }

      var btn = $('button[type="submit"]', form);
      var fullSubject = "Richiesta dal sito — " + subject;
      var body =
        "Nome: " + name + "\n" +
        "Email: " + email + "\n" +
        "Telefono: " + (phone || "—") + "\n" +
        "Interesse: " + subject + "\n\n" +
        "Messaggio:\n" + message;

      // Opzione A: invio via Formspree (se configurato)
      if (FORMSPREE_ENDPOINT) {
        btn.disabled = true;
        statusEl.textContent = "Invio in corso…";
        statusEl.className = "form__status";
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        }).then(function (r) {
          if (r.ok) {
            form.reset();
            statusEl.textContent = "✅ Messaggio inviato! Ti ricontatteremo presto.";
            statusEl.className = "form__status ok";
          } else {
            throw new Error("bad response");
          }
        }).catch(function () {
          statusEl.textContent = "Si è verificato un errore. Chiamaci allo 0184 506325.";
          statusEl.className = "form__status err";
        }).finally(function () { btn.disabled = false; });
        return;
      }

      // Opzione B (default): apre il client di posta dell'utente
      var mailto = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(fullSubject) +
        "&body=" + encodeURIComponent(body);
      window.location.href = mailto;
      statusEl.textContent = "✅ Si aprirà il tuo programma di posta per inviare il messaggio. In alternativa chiama lo 0184 506325.";
      statusEl.className = "form__status ok";
    });

    // pulizia errori mentre si digita
    $$("#cf-name, #cf-email, #cf-message", form).forEach(function (input) {
      on(input, "input", function () { setError(input.id, ""); });
    });
  }
})();
