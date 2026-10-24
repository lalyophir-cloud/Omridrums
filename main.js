(function () {
  "use strict";

  var S = window.SITE || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var slot = function (name) { return $('[data-slot="' + name + '"]'); };

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  // תמונה אמיתית או מקום שמור מעוצב
  function media(src, label, alt) {
    if (src) {
      return '<img src="' + esc(src) + '" alt="' + esc(alt || label || "") + '" loading="lazy">';
    }
    return '<div class="ph"><span class="ph__label mono">' + esc(label || "PHOTO") + '</span></div>';
  }

  // ברקוד דקורטיבי שנבנה ממחרוזת (תמיד אותו דבר לאותה מחרוזת)
  function barcode(el) {
    var seed = 0, str = el.getAttribute("data-barcode") || "OMRI";
    for (var i = 0; i < str.length; i++) seed = (seed * 31 + str.charCodeAt(i)) >>> 0;
    var bars = "", count = el.classList.contains("barcode--sm") ? 34 : 46;
    for (var j = 0; j < count; j++) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      var w = 1 + (seed % 4);
      var gap = 1 + ((seed >> 4) % 3);
      bars += '<i style="width:' + w + "px;margin-inline-end:" + gap + 'px"></i>';
    }
    el.innerHTML = bars;
  }

  var DRUM_KIT_SVG =
    '<svg class="kit" viewBox="0 0 420 380" role="img" aria-label="איור של מערכת תופים">' +
      '<defs><pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.6" fill="currentColor"/></pattern></defs>' +
      '<g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        // stands
        '<path d="M45 150 V360 M25 360 L45 330 L65 360"/>' +
        '<path d="M110 80 V360 M90 360 L110 330 L130 360"/>' +
        '<path d="M330 95 V360 M310 360 L330 330 L350 360"/>' +
        // cymbals
        '<ellipse cx="110" cy="76" rx="70" ry="9" transform="rotate(-10 110 76)" fill="var(--paper)"/>' +
        '<ellipse cx="330" cy="92" rx="74" ry="9" transform="rotate(8 330 92)" fill="var(--paper)"/>' +
        '<ellipse cx="45" cy="146" rx="44" ry="6" fill="var(--paper)"/>' +
        '<ellipse cx="45" cy="156" rx="44" ry="6" fill="var(--paper)"/>' +
        // toms
        '<path d="M130 140 V178 A40 10 0 0 0 210 178 V140" fill="var(--paper)"/><ellipse cx="170" cy="140" rx="40" ry="10" fill="var(--paper)"/>' +
        '<path d="M220 140 V178 A40 10 0 0 0 300 178 V140" fill="var(--paper)"/><ellipse cx="260" cy="140" rx="40" ry="10" fill="var(--paper)"/>' +
        // bass drum
        '<circle cx="215" cy="262" r="96" fill="var(--paper)"/>' +
        '<circle cx="215" cy="262" r="84" fill="url(#dots)" opacity=".28"/>' +
        '<circle cx="215" cy="262" r="84"/>' +
        '<path d="M150 352 L135 368 M280 352 L295 368"/>' +
        // floor tom
        '<path d="M300 205 V285 A52 13 0 0 0 404 285 V205" fill="var(--paper)"/><ellipse cx="352" cy="205" rx="52" ry="13" fill="var(--paper)"/>' +
        '<path d="M308 285 L300 365 M396 285 L404 365"/>' +
        // snare
        '<path d="M48 205 V240 A55 14 0 0 0 158 240 V205" fill="var(--paper)"/><ellipse cx="103" cy="205" rx="55" ry="14" fill="var(--paper)"/>' +
        '<path d="M103 254 V360 M83 360 L103 335 L123 360"/>' +
        // sticks
        '<path d="M70 120 L150 196 M150 112 L84 194" stroke-width="3.2"/>' +
      '</g>' +
      '<text x="215" y="276" text-anchor="middle" class="kit__logo">OMRI</text>' +
    "</svg>";

  // זרקורים מצוירים: יוצאים מעל השם ויורדים עד עמרי (מחושב לפי הגודל של המסך)
  var BEAMS = [
    { x: 0.16, to: 0.40, dur: 7, delay: 0 },
    { x: 0.50, to: 0.50, dur: 9, delay: -3 },
    { x: 0.84, to: 0.60, dur: 8, delay: -5 }
  ];
  function drawBeams() {
    var fig = slot("hero-figure"), svg = $(".beams", fig), title = $(".hero__title");
    if (!svg || !title) return;
    var fr = fig.getBoundingClientRect(), tr = title.getBoundingClientRect();
    var w = fr.width, ext = Math.max(0, fr.top - tr.top + (innerWidth <= 900 ? 8 : 34)), h = fr.height + ext;
    var bottom = ext + fr.height * 0.93, top = 10, half = w * 0.085, blur = (w * 0.009).toFixed(1);
    svg.style.top = -ext + "px";
    svg.style.height = h + "px";
    svg.setAttribute("viewBox", "0 0 " + w.toFixed(0) + " " + h.toFixed(0));
    svg.innerHTML =
      '<defs><linearGradient id="beam-g" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="var(--green-lt)" stop-opacity=".9"/>' +
        '<stop offset=".6" stop-color="var(--green-lt)" stop-opacity=".4"/>' +
        '<stop offset="1" stop-color="var(--green-lt)" stop-opacity="0"/>' +
      '</linearGradient>' +
      '<filter id="beam-blur" x="-40%" y="-10%" width="180%" height="120%"><feGaussianBlur stdDeviation="' + blur + '"/></filter></defs>' +
      BEAMS.map(function (b, i) {
        var fx = w * b.x, bx = w * b.to, r = Math.max(10, w * 0.035);
        return '<g class="beam" style="transform-origin:' + fx.toFixed(1) + "px " + top + "px;animation-duration:" + b.dur + "s;animation-delay:" + b.delay + 's">' +
          '<path filter="url(#beam-blur)" d="M' + (fx - r * 0.6) + " " + top + " L" + (fx + r * 0.6) + " " + top +
            " L" + (bx + half) + " " + bottom + " L" + (bx - half) + " " + bottom + 'Z"/>' +
          '<ellipse cx="' + fx + '" cy="' + top + '" rx="' + r + '" ry="' + (r * 0.36) + '"/>' +
        "</g>";
      }).join("");
  }


  /* ---------- HERO ---------- */
  slot("tagline").textContent = S.tagline || "";
  slot("subline").textContent = S.subline || "";

  slot("hero-stats").innerHTML = (S.stats || []).map(function (s) {
    return '<p><b>&lt;' + esc(s.num) + '&gt;</b> ' + esc(s.en) + "<br><span>" + esc(s.label) + "</span></p>";
  }).join("");

  slot("hero-figure").innerHTML = S.heroImage
    ? '<img src="' + esc(S.heroImage) + '" alt="' + esc(S.name || "") + ' מתופף">'
    : DRUM_KIT_SVG;

  var PC = S.photoCredit;
  function creditLink(cls) {
    return PC ? '<a class="credit ' + cls + ' mono" href="' + esc(PC.url) + '" target="_blank" rel="noopener">Photo: ' + esc(PC.name) + "</a>" : "";
  }
  if (S.heroCutout) {
    var fig = slot("hero-figure");
    fig.classList.add("is-cutout");
    fig.insertAdjacentHTML("afterbegin", '<svg class="beams" aria-hidden="true"></svg>');
    drawBeams();
    addEventListener("resize", drawBeams);
    addEventListener("load", drawBeams);
    if (document.fonts) document.fonts.ready.then(drawBeams);
  }
  if (S.heroImage && PC) slot("hero-figure").insertAdjacentHTML("beforeend", creditLink("credit--hero"));

  /* ---------- MARQUEE ---------- */
  var chunk = (S.genres || []).map(function (g) { return "<span>" + esc(g) + "</span><i>✶</i>"; }).join("");
  slot("marquee").innerHTML = '<div class="marquee__group">' + chunk + chunk + "</div>" +
    '<div class="marquee__group">' + chunk + chunk + "</div>";

  /* ---------- ABOUT ---------- */
  var A = S.about || {};
  slot("portrait").innerHTML = media(A.portrait, "PORTRAIT", S.name);
  slot("fullbody").innerHTML = media(A.fullBody, "FULL BODY", S.name);
  slot("card").innerHTML = (A.card || []).map(function (f) {
    return "<div><dt><span class=\"mono\">" + esc(f.en) + ":</span> " + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>";
  }).join("");
  slot("about").innerHTML = (A.paragraphs || []).map(function (p, i) {
    return "<p" + (i === 0 ? ' class="lead"' : "") + ">" + esc(p) + "</p>";
  }).join("");
  slot("about-stats").innerHTML = (S.stats || []).map(function (s) {
    return '<div><b>' + esc(s.num) + "</b><span>" + esc(s.label) + "</span></div>";
  }).join("");

  /* ---------- MUSIC ---------- */
  var M = S.music || {};

  function videoCard(v, i, featured) {
    var num = "VIDEO " + pad(i + 1);
    var thumb = v.youtubeId
      ? '<img src="https://i.ytimg.com/vi/' + esc(v.youtubeId) + '/hqdefault.jpg" alt="" loading="lazy">'
      : '<div class="ph"><span class="ph__label mono">' + num + "</span></div>";
    return '<article class="video' + (featured ? " video--featured" : "") + ' reveal">' +
      '<button class="video__frame" type="button" data-yt="' + esc(v.youtubeId || "") + '" aria-label="ניגון: ' + esc(v.title) + '">' +
        thumb +
        '<span class="video__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>' +
        '<span class="video__tag mono">' + esc(v.tag || "VIDEO") + "</span>" +
      "</button>" +
      '<div class="video__meta"><span class="mono">' + pad(i + 1) + "</span><h3>" + esc(v.title) + "</h3></div>" +
    "</article>";
  }

  if (M.cover) {
    slot("record").innerHTML =
      '<div class="record__vinyl" aria-hidden="true"><div class="record__label">' + media(A.portrait, "") +
        '<span class="record__hole"></span></div></div>' +
      '<div class="record__sleeve">' + media(M.cover, "COVER", "עטיפה") +
        '<span class="record__title">' + esc(S.nameEn || "") + "<br>DRUMS</span>" +
        '<span class="record__side mono">LIVE SESSIONS / SIDE A</span></div>';
  } else {
    slot("record").remove();
  }

  if (M.featured) slot("featured").innerHTML = videoCard(M.featured, 0, true);
  slot("videos").innerHTML = (M.videos || []).map(function (v, i) { return videoCard(v, i + 1); }).join("");

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".video__frame");
    if (!btn) return;
    var id = btn.getAttribute("data-yt");
    if (!id) {
      btn.classList.add("is-empty");
      setTimeout(function () { btn.classList.remove("is-empty"); }, 1400);
      return;
    }
    btn.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
      '?autoplay=1&rel=0" title="YouTube" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    btn.classList.add("is-playing");
  });

  slot("platforms").innerHTML = (M.platforms || []).filter(function (p) { return p.url; }).map(function (p) {
    return '<a class="chip" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.name) + ' <span>↗</span></a>';
  }).join("");

  /* ---------- SHOWS ---------- */
  var DAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var shows = (S.shows || []).map(function (s) {
    var p = String(s.date).split("-");
    return Object.assign({}, s, { d: new Date(+p[0], +p[1] - 1, +p[2]) });
  }).filter(function (s) { return !isNaN(s.d); });

  var upcoming = shows.filter(function (s) { return s.d >= today; }).sort(function (a, b) { return a.d - b.d; });

  slot("upcoming").innerHTML = upcoming.length ? upcoming.map(function (s, i) {
    var cta = s.ticketUrl
      ? '<a class="btn btn--green" href="' + esc(s.ticketUrl) + '" target="_blank" rel="noopener">כרטיסים ↗</a>'
      : '<span class="btn btn--ghost">כרטיסים בקרוב</span>';
    return '<article class="ticket reveal">' +
      '<div class="ticket__date"><b>' + pad(s.d.getDate()) + "." + pad(s.d.getMonth() + 1) + "</b>" +
        '<span class="mono">' + s.d.getFullYear() + "</span></div>" +
      '<div class="ticket__body">' +
        '<span class="mono ticket__no">NO. ' + pad(i + 1) + " / ADMIT ONE</span>" +
        "<h4>" + esc(s.venue) + "</h4>" +
        "<p>" + esc(s.city) + (s.project ? " · " + esc(s.project) : "") + "</p>" +
        '<p class="mono ticket__time">יום ' + DAYS[s.d.getDay()] + (s.time ? " / " + esc(s.time) : "") + "</p>" +
      "</div>" +
      '<div class="ticket__stub">' + cta + '<div class="barcode barcode--sm" data-barcode="' + esc(s.date + s.venue) + '"></div></div>' +
    "</article>";
  }).join("") : '<p class="tickets__empty">אין הופעות קרובות כרגע. שווה לקפוץ לפה שוב בקרוב.</p>';


  /* ---------- GALLERY ---------- */
  var TILT = [-3, 2.2, -1.4, 3, -2.4, 1.6, -2, 2.6, -1, 3.2, -2.8, 1.2];
  var notes = S.galleryNotes || [];
  var shots = (S.gallery || []).map(function (g, i) {
    var label = "FRAME " + pad(i + 1);
    var inner = media(g.src, label, g.caption);
    var tag = g.src ? "button" : "div";
    var cap = (g.caption || "") + (g.credit && PC ? "  /  Photo: " + PC.name : "");
    var extra = g.src ? ' type="button" data-full="' + esc(g.src) + '" data-cap="' + esc(cap) + '"' : "";
    return '<figure class="shot reveal' + (g.shape ? " shot--" + esc(g.shape) : "") + '" style="--r:' + TILT[i % TILT.length] + 'deg">' +
      "<" + tag + ' class="shot__frame"' + extra + ">" + inner + "</" + tag + ">" +
      '<figcaption class="hand"><span>' + pad(i + 1) + "</span> " + esc(g.caption || "") + "</figcaption>" +
      (g.credit ? creditLink("credit--print") : "") +
    "</figure>";
  });
  // פתק אחרי כל תמונה שלישית
  var out = [];
  shots.forEach(function (s, i) {
    out.push(s);
    var n = notes[Math.floor(i / 3)];
    if (i % 3 === 2 && n) out.push('<p class="note hand reveal" style="--r:' + TILT[(i + 3) % TILT.length] * 1.5 + 'deg">' + esc(n) + "</p>");
  });
  slot("gallery").innerHTML = out.join("");

  var box = $(".lightbox");
  document.addEventListener("click", function (e) {
    var f = e.target.closest("[data-full]");
    if (!f || !box.showModal) return;
    $("img", box).src = f.getAttribute("data-full");
    $("img", box).alt = f.getAttribute("data-cap");
    $(".lightbox__cap", box).textContent = f.getAttribute("data-cap");
    box.showModal();
  });
  box.addEventListener("click", function (e) {
    if (e.target === box || e.target.closest(".lightbox__close")) box.close();
  });

  /* ---------- CONTACT ---------- */
  var C = S.contact || {};
  var links = [];
  if (C.email) links.push({ k: "EMAIL", he: "מייל", v: C.email, href: "mailto:" + C.email });
  var ig = (C.instagram || "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/.*$/, "");
  links.push({ k: "INSTAGRAM", he: "אינסטגרם", v: ig ? "@" + ig : "בקרוב", href: C.instagram || "", ext: true });
  links.push({ k: "WHATSAPP", he: "וואטסאפ", v: C.whatsapp ? C.whatsapp.replace(/^972(\d{2})(\d+)$/, "0$1-$2") : "בקרוב", href: C.whatsapp ? "https://wa.me/" + C.whatsapp.replace(/\D/g, "") : "", ext: true });

  slot("contact").innerHTML = links.map(function (l, i) {
    var attrs = l.href ? 'href="' + esc(l.href) + '"' + (l.ext ? ' target="_blank" rel="noopener"' : "") : 'aria-disabled="true"';
    return '<a class="contact__row" ' + attrs + ">" +
      '<span class="mono">' + pad(i + 1) + " / " + l.k + "</span>" +
      "<b>" + esc(l.he) + "</b>" +
      '<span class="contact__val" dir="ltr">' + esc(l.v) + "</span>" +
      '<span class="contact__arrow">↗</span>' +
    "</a>";
  }).join("");

  slot("year").textContent = new Date().getFullYear();
  if (PC) slot("credit").innerHTML = creditLink("");

  /* ---------- BARCODES ---------- */
  $$("[data-barcode]").forEach(barcode);

  /* ---------- MOBILE MENU ---------- */
  var burger = $(".burger"), menu = $("#mobile-menu");
  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  }
  burger.addEventListener("click", function () { setMenu(menu.hidden); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });

  /* ---------- SCROLL PROGRESS + HEADER ---------- */
  var bar = $(".progress span"), top = $(".topbar");
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? scrollY / h : 0) + ")";
    top.classList.toggle("is-scrolled", scrollY > 20);
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- REVEAL ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }
})();
