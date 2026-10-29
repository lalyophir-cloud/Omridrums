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

  /* ---------- HERO ---------- */
  // כל שורה בפתיחה נמתחת בדיוק לרוחב של הפוסטר
  var posterType = $(".poster__type");
  function fitPoster() {
    if (!posterType) return;
    var w = posterType.clientWidth;
    $$(".poster__line", posterType).forEach(function (l) {
      l.style.fontSize = "100px";
      l.style.fontSize = (100 * w / l.scrollWidth).toFixed(2) + "px";
    });
  }
  fitPoster();
  addEventListener("resize", fitPoster);
  if (document.fonts) document.fonts.ready.then(fitPoster);

  var PC = S.photoCredit;
  function creditLink(cls) {
    return PC ? '<a class="credit ' + cls + ' mono" href="' + esc(PC.url) + '" target="_blank" rel="noopener">Photo: ' + esc(PC.name) + "</a>" : "";
  }

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
    return '<div><b' + (/∞/.test(s.num) ? ' class="is-symbol"' : "") + ">" + esc(s.num) + "</b><span>" + esc(s.label) + "</span></div>";
  }).join("");

  /* ---------- MUSIC ---------- */
  var M = S.music || {};

  function videoCard(v, i, featured) {
    var thumb = v.youtubeId
      ? '<img src="https://i.ytimg.com/vi/' + esc(v.youtubeId) + '/hqdefault.jpg" alt="" loading="lazy">'
      : v.file
        ? '<video src="' + esc(v.file) + '#t=0.5" preload="metadata" muted playsinline></video>'
        : '<div class="ph"><span class="ph__label mono">VIDEO ' + pad(i + 1) + "</span></div>";
    var label = [v.title, v.from].filter(Boolean).join(" / ") || "סרטון " + (i + 1);
    var meta = v.title || v.from
      ? '<div class="video__meta">' + (v.title ? "<h3>" + esc(v.title) + "</h3>" : "") +
          (v.from ? '<span class="video__from">' + esc(v.from) + "</span>" : "") + "</div>"
      : "";
    return '<article class="video' + (featured ? " video--featured" : "") + ' reveal">' +
      '<button class="video__frame" type="button" data-yt="' + esc(v.youtubeId || "") + '" data-file="' + esc(v.file || "") + '" aria-label="ניגון: ' + esc(label) + '">' +
        thumb +
        '<span class="video__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>' +
      "</button>" + meta +
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
    var id = btn.getAttribute("data-yt"), file = btn.getAttribute("data-file");
    if (file && !id) {
      btn.innerHTML = '<video src="' + esc(file) + '" controls autoplay playsinline></video>';
      btn.classList.add("is-playing");
      return;
    }
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
        (s.project ? '<p class="ticket__project">' + esc(s.project) + "</p>" : "") +
        "<p>" + esc(s.city) + (s.address ? ", " + esc(s.address) : "") + "</p>" +
        '<p class="mono ticket__time">יום ' + DAYS[s.d.getDay()] + (s.time ? " / " + (s.timeLabel ? esc(s.timeLabel) + " " : "") + esc(s.time) : "") + "</p>" +
      "</div>" +
      '<div class="ticket__stub">' + cta + '<div class="barcode barcode--sm" data-barcode="' + esc(s.date + s.venue) + '"></div></div>' +
    "</article>";
  }).join("") : '<p class="tickets__empty">אין הופעות קרובות כרגע. שווה לקפוץ לפה שוב בקרוב.</p>';


  var SP = S.showsPhoto;
  if (SP && SP.src) {
    slot("shows-photo").innerHTML =
      '<button type="button" class="shows-photo__frame" data-full="' + esc(SP.src) + '" data-cap="' + esc(SP.caption || "") + '">' +
        '<img src="' + esc(SP.src) + '" alt="' + esc(SP.caption || "") + '" loading="lazy"></button>' +
      '<figcaption><span class="shows-photo__cap">' + esc(SP.caption || "") + "</span>" + (SP.credit ? creditLink("") : "") + "</figcaption>";
  } else {
    slot("shows-photo").remove();
  }

  /* ---------- GALLERY ---------- */
  // גלריה כקולאז': כל תמונה שלמה ביחס המקורי שלה, בלי חפיפה ובלי חיתוך.
  var G = (S.gallery || []).filter(function (g) { return g.src; });
  var TILT = [-2.2, 1.8, -1.2, 2.4, -1.8, 1.2, -2.6, 1.6];
  var collage = slot("gallery"), html = "";
  G.forEach(function (g, i) {
    var cap = (g.caption || "") + (g.credit && PC ? "  /  Photo: " + PC.name : "");
    html += '<button type="button" class="cl-shot" style="--r:' + TILT[i % TILT.length] + 'deg" data-full="' + esc(g.src) + '" data-cap="' + esc(cap) + '" aria-label="' + esc(g.caption || "") + '">' +
      '<img src="' + esc(g.src) + '" alt="' + esc(g.caption || "") + '" loading="lazy"></button>';
  });
  collage.insertAdjacentHTML("beforeend", html);

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

  var wa = C.whatsapp ? "https://wa.me/" + C.whatsapp.replace(/\D/g, "") : "";
  slot("services").innerHTML = (S.services || []).map(function (s, i) {
    var href = s.link === "whatsapp" ? wa : s.link;
    var ext = /^https?:/.test(href || "");
    return '<li class="reveal"><span class="wid__num mono">' + pad(i + 1) + " / " + esc(s.en) + "</span>" +
      "<h3>" + esc(s.he) + "</h3><p>" + esc(s.text) + "</p>" +
      (href ? '<a class="wid__cta" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(s.cta || "") + " ↗</a>" : "") +
    "</li>";
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
