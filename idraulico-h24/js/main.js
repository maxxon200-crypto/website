/* =====================================================================
   IDRAULICO H24 — main.js
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Config contatti ---------- */
  // Email a cui arrivano le richieste del form (MODIFICA con la tua email reale).
  var CONTACT_EMAIL = "info@idraulicoh24milano.it";
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

  /* ---------- FAQ accordion ---------- */
  $$(".faq__item").forEach(function (item) {
    var btn = $(".faq__q", item);
    var panel = $(".faq__a", item);
    if (!btn || !panel) return;
    on(btn, "click", function () {
      var isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : null;
    });
  });

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
    var validPhone = function (v) { return /[0-9]{6,}/.test(v.replace(/\s/g, "")); };

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
      ok &= setError("cf-phone", !phone ? "Inserisci un recapito telefonico." : (validPhone(phone) ? "" : "Numero non valido."));
      ok &= setError("cf-email", !email ? "" : (validEmail(email) ? "" : "Email non valida."));
      ok &= setError("cf-message", message ? "" : "Descrivi il problema.");
      if (!privacy) { ok = false; statusEl.textContent = "Devi accettare l'informativa privacy."; statusEl.className = "form__status err"; }

      if (!ok) {
        if (!statusEl.textContent) { statusEl.textContent = "Controlla i campi evidenziati."; statusEl.className = "form__status err"; }
        return;
      }

      var btn = $('button[type="submit"]', form);
      var fullSubject = "Richiesta dal sito — " + subject;
      var body =
        "Nome: " + name + "\n" +
        "Telefono: " + phone + "\n" +
        "Email: " + (email || "—") + "\n" +
        "Servizio: " + subject + "\n\n" +
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
            statusEl.textContent = "✅ Richiesta ricevuta! Ti richiamiamo noi al più presto.";
            statusEl.className = "form__status ok";
          } else {
            throw new Error("bad response");
          }
        }).catch(function () {
          statusEl.textContent = "L'invio non è andato a buon fine. Chiamaci allo 345 083 4365: rispondiamo subito.";
          statusEl.className = "form__status err";
        }).finally(function () { btn.disabled = false; });
        return;
      }

      // Opzione B (default): apre il client di posta dell'utente
      var mailto = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(fullSubject) +
        "&body=" + encodeURIComponent(body);
      window.location.href = mailto;
      statusEl.textContent = "✅ Si apre il tuo programma di posta per mandarci la richiesta. Se è un'emergenza, chiama lo 345 083 4365: rispondiamo noi.";
      statusEl.className = "form__status ok";
    });

    // pulizia errori mentre si digita
    $$("#cf-name, #cf-email, #cf-phone, #cf-message", form).forEach(function (input) {
      on(input, "input", function () { setError(input.id, ""); });
    });
  }
})();
