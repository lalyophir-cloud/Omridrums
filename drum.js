/* =========================================================
   תוף שגוללים איתו + תיפוף במקלדת (A S D F)
   הצלילים נוצרים בדפדפן (Web Audio), בלי קבצי סאונד.
   ========================================================= */
(function () {
  "use strict";

  var wrap = document.querySelector(".drum-wrap");
  if (!wrap) return;
  var drum = wrap.querySelector(".drum");
  var muteBtn = wrap.querySelector(".drum-mute");
  var hint = wrap.querySelector(".drum-hint");
  var main = document.querySelector("main");
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sound ---------- */
  var ctx = null, noiseBuf = null, muted = false;
  try { muted = localStorage.getItem("drum-muted") === "1"; } catch (e) {}

  function audio() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    var d = noiseBuf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }

  function env(g, t, peak, decay) {
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + decay);
  }

  function tone(type, from, to, decay, peak) {
    var t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(from, t);
    o.frequency.exponentialRampToValueAtTime(to, t + decay * 0.8);
    env(g, t, peak, decay);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + decay + 0.05);
  }

  function noise(hp, decay, peak) {
    var t = ctx.currentTime, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf;
    f.type = "highpass"; f.frequency.value = hp;
    env(g, t, peak, decay);
    s.connect(f).connect(g).connect(ctx.destination);
    s.start(t); s.stop(t + decay + 0.05);
  }

  var SOUNDS = {
    kick:  function () { tone("sine", 160, 42, 0.45, 1); },
    snare: function () { noise(1200, 0.2, 0.7); tone("triangle", 220, 160, 0.12, 0.35); },
    hat:   function () { noise(7000, 0.06, 0.35); },
    tom:   function () { tone("sine", 210, 95, 0.35, 0.8); }
  };
  var WORDS = { kick: ["BOOM!", "בום!"], snare: ["BAP!", "TAK!"], hat: ["TSS", "TSK"], tom: ["DUM!", "TOM!"] };

  function play(type) {
    if (muted || !audio()) return;
    if (ctx.state === "suspended") ctx.resume();
    SOUNDS[type]();
  }

  /* ---------- visuals ---------- */
  var side = 0;
  function restart(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function hit(type) {
    play(type);
    side = 1 - side;
    restart(drum, side ? "hit-l" : "hit-r");
    drum.classList.remove(side ? "hit-r" : "hit-l");
    restart(drum, "hit");

    var ring = document.createElement("span");
    ring.className = "drum-ring";
    wrap.appendChild(ring);
    ring.addEventListener("animationend", function () { ring.remove(); });

    var list = WORDS[type], pop = document.createElement("span");
    pop.className = "drum-pop";
    pop.textContent = list[Math.floor(Math.random() * list.length)];
    pop.style.setProperty("--r", (Math.random() * 30 - 15).toFixed(1) + "deg");
    pop.style.setProperty("--x", (Math.random() * 60 - 30).toFixed(0) + "px");
    wrap.appendChild(pop);
    pop.addEventListener("animationend", function () { pop.remove(); });

    document.body.classList.add("beat");
    clearTimeout(hit.t);
    hit.t = setTimeout(function () { document.body.classList.remove("beat"); }, 140);
    if (!reduced && type !== "hat") restart(main, "shake");

    wrap.classList.add("played");
  }

  /* ---------- hit to scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main > section"));
  var PATTERN = ["kick", "snare", "tom", "snare"], step = 0;

  function atEnd() { return innerHeight + scrollY >= document.documentElement.scrollHeight - 8; }

  function next() {
    if (atEnd()) { scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); return; }
    var head = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--head-h")) || 68;
    for (var i = 0; i < sections.length; i++) {
      var top = sections[i].getBoundingClientRect().top;
      if (top > head + 8) { sections[i].scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); return; }
    }
    scrollTo({ top: document.documentElement.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }

  drum.addEventListener("click", function () {
    hit(PATTERN[step++ % PATTERN.length]);
    next();
  });

  function updateEnd() {
    var end = atEnd();
    wrap.classList.toggle("is-end", end);
    drum.setAttribute("aria-label", end ? "לחיצה על התוף: חזרה למעלה" : "לחיצה על התוף: מעבר לחלק הבא");
  }
  addEventListener("scroll", updateEnd, { passive: true });
  updateEnd();

  /* ---------- keyboard drum kit ---------- */
  var KEYS = { KeyA: "kick", KeyS: "snare", KeyD: "hat", KeyF: "tom" };
  document.addEventListener("keydown", function (e) {
    var type = KEYS[e.code];
    if (!type || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    var el = document.activeElement;
    if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
    hit(type);
  });

  /* ---------- mute ---------- */
  function renderMute() {
    muteBtn.textContent = muted ? "SOUND OFF" : "SOUND ON";
    muteBtn.setAttribute("aria-pressed", String(muted));
  }
  muteBtn.addEventListener("click", function () {
    muted = !muted;
    try { localStorage.setItem("drum-muted", muted ? "1" : "0"); } catch (e) {}
    renderMute();
  });
  renderMute();
})();
