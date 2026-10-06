const KEY = "pip-english-v01";
const LEVELS = [
  { id: "starter", name: "启蒙", note: "图画和短句" },
  { id: "kid", name: "小学", note: "学校和生活" },
  { id: "grow", name: "进阶", note: "句子和语法" }
];

let state = fresh();
let ui = blankUi();
let speakToken = 0;
let audioCtx = null;

function fresh() {
  return { v: 1, mute: false, lang: "", profiles: [], activeId: null, stars: {}, learned: {}, streak: {}, daily: {}, path: {}, review: {} };
}
function blankUi() {
  return {
    screen: "onboard",
    step: "who",
    draft: { role: "kid", level: "starter", name: "" },
    adding: false,
    session: null,
    result: null,
    overlay: null,
    leaveTo: "home",
    mood: "idle",
    resetArmed: false,
    listening: false,
    rec: null,
    showZh: true
  };
}
function rid() {
  return Math.random().toString(36).slice(2, 10);
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}
function fill(s) {
  const name = (active() && active().name) || "friend";
  return String(s).split("{name}").join(name);
}
function efill(s) { return esc(fill(s)); }
function pad(n) { return String(n).padStart(2, "0"); }
function dateStr(d) {
  const x = d || new Date();
  return x.getFullYear() + "-" + pad(x.getMonth() + 1) + "-" + pad(x.getDate());
}
function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}
function levelName(id) {
  if (uiLang() === "en") return { starter: "Starter", kid: "Elementary", grow: "Upper" }[id] || "Starter";
  const hit = LEVELS.find((x) => x.id === id);
  return hit ? hit.name : "启蒙";
}
function uiLang() {
  if (state.lang === "en" || state.lang === "zh") return state.lang;
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("zh") ? "zh" : "en";
}
function lessonTitle(lesson) {
  if (!lesson) return "";
  if (uiLang() !== "en" || !globalThis.PIP_LOCALE) return lesson.title;
  return PIP_LOCALE.titles[lesson.id] || lesson.title;
}
function localTip(lesson, index) {
  const phrase = lesson.phrases[index];
  if (uiLang() !== "en" || !globalThis.PIP_LOCALE) return phrase.tip;
  const tips = PIP_LOCALE.tips[lesson.id];
  return (tips && tips[index]) || phrase.tip;
}
function localWhy(lesson, stepIndex, choiceIndex, zh) {
  if (uiLang() !== "en" || !globalThis.PIP_LOCALE) return fill(zh);
  const rows = PIP_LOCALE.whys[lesson.id];
  const line = rows && rows[stepIndex] && rows[stepIndex][choiceIndex];
  return fill(line || zh);
}
function active() {
  return state.profiles.find((p) => p.id === state.activeId) || null;
}
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && data.v === 1 ? data : null;
  } catch (e) {
    return null;
  }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore quota */ }
}
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 2400);
}
function burst() {
  const fx = document.getElementById("fx");
  const colors = ["#ff6b4a", "#ffc857", "#14967c", "#7ec8e3", "#c9b6ff"];
  for (let i = 0; i < 14; i++) {
    const el = document.createElement("span");
    el.className = "bit";
    el.style.background = colors[i % colors.length];
    el.style.setProperty("--x", (Math.random() * 260 - 130) + "px");
    el.style.setProperty("--y", (Math.random() * -200 - 20) + "px");
    fx.appendChild(el);
    setTimeout(() => el.remove(), 850);
  }
}
function beep(kind) {
  if (state.mute) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.resume();
    const notes = kind === "bad" ? [220, 180] : kind === "combo" ? [523, 659, 784, 1046] : [523, 659, 784];
    notes.forEach((freq, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = kind === "bad" ? "triangle" : "sine";
      o.frequency.value = freq;
      o.connect(g);
      g.connect(audioCtx.destination);
      const t = audioCtx.currentTime + i * 0.08;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.start(t);
      o.stop(t + 0.17);
    });
  } catch (e) { /* audio optional */ }
}
function stopSpeak() {
  speakToken += 1;
  if (window.speechSynthesis) speechSynthesis.cancel();
}
function speak(text, lang) {
  if (!window.speechSynthesis || !text) return;
  const synth = speechSynthesis;
  const my = ++speakToken;
  const run = () => {
    if (my !== speakToken) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang || "en-US";
    const voices = synth.getVoices();
    const want = (u.lang || "").toLowerCase();
    const voice = voices.find((v) => (v.lang || "").toLowerCase() === want)
      || voices.find((v) => (v.lang || "").toLowerCase().startsWith(want.slice(0, 2)));
    if (voice) u.voice = voice;
    const starter = active() && active().level === "starter";
    u.rate = want.startsWith("zh") ? 1 : (starter ? 0.84 : 0.95);
    synth.speak(u);
  };
  if (synth.speaking) {
    synth.cancel();
    setTimeout(run, 70);
  } else {
    run();
  }
}
function stopListen() {
  ui.listening = false;
  if (ui.rec) {
    try {
      ui.rec.onresult = null;
      ui.rec.onerror = null;
      ui.rec.onend = null;
      ui.rec.stop();
    } catch (e) { /* already stopped */ }
    ui.rec = null;
  }
}
function norm(s) {
  return String(s).toLowerCase().replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ").trim();
}
function similar(target, heard) {
  let a = norm(target);
  let b = norm(heard);
  const name = active() && norm(active().name);
  if (name) {
    a = a.split(" ").filter((w) => w !== name).join(" ");
    b = b.split(" ").filter((w) => w !== name).join(" ");
  }
  if (!a || !b) return false;
  if (b.includes(a) || a.includes(b)) return true;
  const aw = a.split(" ").filter((w) => w.length > 1);
  const bw = new Set(b.split(" "));
  if (!aw.length) return false;
  return aw.filter((w) => bw.has(w)).length / aw.length >= 0.6;
}
function listenFor(target, done) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!window.isSecureContext || !SR) {
    toast(uiLang() === "en"
      ? "Speaking needs Chrome or Edge on this site. You can still listen to Pip."
      : "跟读需要用「打开皮皮英语.bat」启动。听皮皮读，一样算练习。");
    return;
  }
  stopSpeak();
  stopListen();
  const rec = new SR();
  ui.rec = rec;
  ui.listening = true;
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  let settled = false;
  const finish = (text) => {
    if (settled) return;
    settled = true;
    ui.listening = false;
    ui.rec = null;
    try { rec.stop(); } catch (e) { /* ignore */ }
    done(text || "");
  };
  rec.onresult = (ev) => {
    const alts = ev.results[0];
    let heard = "";
    let matched = "";
    for (let i = 0; i < alts.length; i++) {
      const text = alts[i].transcript || "";
      if (text.length > heard.length) heard = text;
      if (similar(target, text)) matched = text;
    }
    finish(matched || heard);
  };
  rec.onerror = () => finish("");
  rec.onend = () => { if (!settled) finish(""); };
  render();
  try { rec.start(); } catch (e) { finish(""); }
}
function todayBucket(pid) {
  const today = dateStr();
  if (!state.daily[pid] || state.daily[pid].date !== today) {
    state.daily[pid] = { date: today, hunt: false, scene: false, oops: false, lesson: false, celebrated: false };
  }
  if (state.daily[pid].lesson === undefined) state.daily[pid].lesson = false;
  return state.daily[pid];
}
function touchStreak(pid) {
  const today = dateStr();
  const s = state.streak[pid] || { last: "", count: 0 };
  if (s.last === today) {
    state.streak[pid] = s;
    return;
  }
  const y = new Date();
  y.setDate(y.getDate() - 1);
  s.count = s.last === dateStr(y) ? s.count + 1 : 1;
  s.last = today;
  state.streak[pid] = s;
}
function giveStars(pid, n) {
  if (!pid || !n) return;
  state.stars[pid] = (state.stars[pid] || 0) + n;
}
function remember(pid, en) {
  if (!pid || !en) return;
  if (!state.learned[pid]) state.learned[pid] = {};
  state.learned[pid][en] = (state.learned[pid][en] || 0) + 1;
}
function maybeDailyBonus(pid) {
  const d = todayBucket(pid);
  if (d.hunt && d.scene && d.oops && !d.celebrated) {
    d.celebrated = true;
    giveStars(pid, 5);
    return true;
  }
  return false;
}
function streakLabel(pid) {
  const s = state.streak[pid];
  const en = uiLang() === "en";
  if (!s || !s.count) return en ? "Start today and the streak begins" : "今天开始，连续天数就记上";
  const today = dateStr();
  const y = new Date();
  y.setDate(y.getDate() - 1);
  if (s.last === today) return en ? "Streak: " + s.count + " days" : "已连续 " + s.count + " 天";
  if (s.last === dateStr(y)) return en ? "You practiced yesterday. Today makes " + (s.count + 1) : "昨天练过，今天再玩就是 " + (s.count + 1) + " 天";
  return en ? "Start today and the streak begins again" : "今天开始，连续天数重新记";
}
function learnedCount(pid) {
  return Object.keys(state.learned[pid] || {}).length;
}
function findWord(en) {
  const levels = ["starter", "kid", "grow"];
  for (let i = 0; i < levels.length; i++) {
    const hit = PIP_DATA.words[levels[i]].find((w) => w.en === en);
    if (hit) return hit;
  }
  return { en: en, zh: "", emoji: "✨", hint: "" };
}
function quoteOfDay() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const day = Math.floor((Date.now() - start) / 86400000);
  return PIP_DATA.quotes[day % PIP_DATA.quotes.length];
}
function greet() {
  const p = active();
  const h = new Date().getHours();
  const name = p ? p.name : "";
  if (uiLang() === "en") {
    const hello = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    return hello + ", " + name;
  }
  const hello = h < 11 ? "早上好" : h < 14 ? "中午好" : h < 18 ? "下午好" : "晚上好";
  return hello + "，" + name;
}
function parrot(mood, small) {
  const m = mood || "idle";
  return `<svg class="parrot ${small ? "sm" : ""} mood-${esc(m)}" viewBox="0 0 160 160" aria-hidden="true">
    <ellipse cx="78" cy="148" rx="34" ry="7" fill="#000" opacity=".08"/>
    <path d="M46 104 C28 126 30 150 50 150 C42 128 54 116 66 110" fill="#14967c"/>
    <path d="M58 108 C42 130 48 152 66 150 C58 130 70 118 78 112" fill="#3ddc97"/>
    <ellipse cx="88" cy="98" rx="38" ry="34" fill="#3ddc97"/>
    <ellipse cx="94" cy="106" rx="22" ry="20" fill="#fff4c2"/>
    <ellipse cx="62" cy="102" rx="14" ry="20" fill="#0f7d68"/>
    <circle cx="112" cy="64" r="28" fill="#3ddc97"/>
    <path d="M100 42 C102 24 112 26 108 44" fill="#ff6b4a"/>
    <path d="M110 40 C116 18 126 26 118 46" fill="#ffc857"/>
    <path d="M120 48 C132 30 138 40 126 54" fill="#ff6b4a"/>
    <ellipse cx="120" cy="62" rx="10" ry="12" fill="#fff"/>
    <circle class="pupil" cx="122" cy="64" r="5" fill="#2a2118"/>
    <circle cx="124" cy="62" r="1.6" fill="#fff"/>
    <path d="M132 72 L158 78 L134 88 Z" fill="#ff8a3d"/>
    <ellipse cx="106" cy="76" rx="5" ry="3" fill="#ffb4a8"/>
    <path d="M74 128 L64 144 M82 130 L82 146 M90 128 L102 144" stroke="#ff8a3d" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;
}

function buildHunt(level) {
  const words = PIP_DATA.words[level];
  const picked = shuffle(words).slice(0, 6);
  const listenFirst = Math.random() < 0.5;
  return picked.map((word, i) => {
    const type = ((i % 2 === 0) === listenFirst) ? "listen" : "picture";
    const opts = shuffle([word].concat(shuffle(words.filter((w) => w.en !== word.en)).slice(0, 3)));
    return {
      type,
      word,
      peeked: false,
      options: opts.map((o) => ({
        en: o.en,
        zh: o.zh,
        ok: o.en === word.en
      }))
    };
  });
}
function makePlayer(profile, guestName) {
  if (profile) {
    return { profileId: profile.id, name: profile.name, stars: 0, combo: 0, score: 0, words: [] };
  }
  return { profileId: null, name: guestName || "家人", stars: 0, combo: 0, score: 0, words: [] };
}
function startHunt(players) {
  const p = active();
  ui.session = {
    type: "hunt",
    token: rid(),
    duo: players.length > 1,
    players,
    turn: 0,
    index: 0,
    phase: "ask",
    firstTry: true,
    questions: buildHunt(p.level)
  };
  ui.screen = "hunt";
  ui.overlay = null;
  ui.mood = "idle";
  render();
  const q = ui.session.questions[0];
  if (q.type === "listen") speak(q.word.en);
}
function startScene(id) {
  const scene = PIP_DATA.scenes.find((s) => s.id === id);
  ui.session = {
    type: "scene",
    token: rid(),
    scene,
    step: 0,
    bubbles: [],
    phase: "choose",
    firstTry: true,
    perfect: true,
    starsEarned: 0,
    why: "",
    followRewarded: false,
    heard: ""
  };
  ui.showZh = active().level !== "grow";
  pushPipLine();
  ui.screen = "scene";
  ui.mood = "idle";
  render();
  speak(fill(scene.steps[0].pip.en));
}
function currentStep() {
  return ui.session.scene.steps[ui.session.step];
}
function pushPipLine() {
  const step = currentStep();
  ui.session.bubbles.push({ who: "pip", en: fill(step.pip.en), zh: fill(step.pip.zh) });
  ui.session.phase = "choose";
  ui.session.firstTry = true;
  ui.session.why = "";
  ui.session.heard = "";
  ui.session.followRewarded = false;
}
function startOops() {
  const level = active().level;
  ui.session = {
    type: "oops",
    token: rid(),
    items: shuffle(PIP_DATA.oops.filter((o) => o.level === level)).slice(0, 4),
    index: 0,
    phase: "find",
    misses: 0,
    findFirst: true,
    fixFirst: true,
    starsEarned: 0,
    why: "",
    log: []
  };
  ui.screen = "oops";
  ui.mood = "think";
  ui.overlay = null;
  render();
}
function finishHunt() {
  const s = ui.session;
  let bonus = false;
  s.players.forEach((p) => {
    if (!p.profileId) return;
    giveStars(p.profileId, p.stars);
    p.words.forEach((en) => remember(p.profileId, en));
    touchStreak(p.profileId);
    todayBucket(p.profileId).hunt = true;
    if (maybeDailyBonus(p.profileId)) bonus = true;
  });
  save();
  ui.result = {
    mode: "hunt",
    title: "寻宝结束",
    players: s.players,
    duo: s.duo,
    bonus,
    words: s.questions.map((q) => q.word)
  };
  ui.session = null;
  ui.screen = "result";
  ui.mood = "happy";
  burst();
  beep("combo");
  render();
}
function finishScene() {
  const s = ui.session;
  const pid = active().id;
  let stars = s.starsEarned + (s.perfect ? 2 : 0);
  giveStars(pid, stars);
  touchStreak(pid);
  todayBucket(pid).scene = true;
  const bonus = maybeDailyBonus(pid);
  if (bonus) stars += 5;
  save();
  ui.result = {
    mode: "scene",
    title: s.scene.title,
    stars,
    bonus,
    lines: s.bubbles.filter((b) => b.who === "me").map((b) => b.en),
    sceneId: s.scene.id
  };
  ui.session = null;
  ui.screen = "result";
  ui.mood = "happy";
  burst();
  render();
}
function finishOops() {
  const s = ui.session;
  const pid = active().id;
  let stars = s.starsEarned;
  giveStars(pid, stars);
  touchStreak(pid);
  todayBucket(pid).oops = true;
  const bonus = maybeDailyBonus(pid);
  if (bonus) stars += 5;
  save();
  ui.result = {
    mode: "oops",
    title: "小课堂结束",
    stars,
    bonus,
    lines: s.log.map((x) => x.good),
    rules: s.log.map((x) => x.rule)
  };
  ui.session = null;
  ui.screen = "result";
  ui.mood = "happy";
  burst();
  render();
}

function lessonList(level) {
  return (PIP_DATA.lessons || []).filter((lesson) => lesson.level === level);
}
function lessonCursor(pid, level) {
  if (!state.path[pid]) state.path[pid] = {};
  return state.path[pid][level] || 0;
}
function currentLesson() {
  const person = active();
  const list = lessonList(person.level);
  const cursor = lessonCursor(person.id, person.level);
  return { lesson: list[cursor % list.length], cursor, total: list.length };
}
function lessonHomeCard() {
  const info = currentLesson();
  if (!info.lesson) return "";
  const daily = todayBucket(active().id);
  const reviewN = (state.review[active().id] || []).length;
  const done = !!daily.lesson;
  const title = lessonTitle(info.lesson);
  const en = uiLang() === "en";
  return `<button class="lesson-card ${done ? "done" : ""}" data-act="start-lesson">
    <div class="kicker">${done ? (en ? "Today's lesson is done" : "今天的一课完成了") : (en ? "Today's lesson · about 4 minutes" : "今日一课 · 大约 4 分钟")}</div>
    <b>${info.lesson.emoji} ${esc(title)}</b>
    <span>${done
      ? (en ? "The next lesson is ready if you want to keep going." : "还可以接着学下一课。学过的句子会按顺序往后排。")
      : (en ? "Listen to three sentences, practice them, say them, then use them." : "先听三句，再练会，再说出来，最后用在对话里。")}</span>
    <div class="mini-steps">${en ? "Learn · Practice · Speak · Use" : "学 · 练 · 说 · 用"}${reviewN ? (en ? " · review " + reviewN : " · 先复习 " + reviewN + " 句") : ""}</div>
  </button>`;
}
function cloneLesson(lesson) {
  const copy = JSON.parse(JSON.stringify(lesson));
  copy.drills.forEach((drill) => { drill.options = shuffle(drill.options); });
  return copy;
}
function queueReview(pid, drill) {
  if (!state.review[pid]) state.review[pid] = [];
  const list = state.review[pid].filter((item) => item.en !== drill.en);
  list.unshift({
    en: drill.en,
    zh: drill.zh,
    prompt: drill.prompt,
    answer: drill.answer,
    options: drill.options.slice()
  });
  state.review[pid] = list.slice(0, 12);
}
function dropReview(pid, en) {
  if (!state.review[pid]) return;
  state.review[pid] = state.review[pid].filter((item) => item.en !== en);
}
function startLesson() {
  const info = currentLesson();
  const pid = active().id;
  const review = (state.review[pid] || []).slice(0, 2).map((item) => {
    const copy = JSON.parse(JSON.stringify(item));
    copy.options = shuffle(copy.options);
    return copy;
  });
  ui.session = {
    type: "lesson",
    token: rid(),
    lesson: cloneLesson(info.lesson),
    phase: review.length ? "review" : "learn",
    index: 0,
    review: review,
    speakIndex: 0,
    applyIndex: 0,
    speakHit: false,
    hold: false,
    firstTry: true,
    clean: true,
    starsEarned: 0,
    why: "",
    heard: ""
  };
  ui.screen = "lesson";
  ui.overlay = null;
  ui.mood = "idle";
  render();
  const line = ui.session.phase === "review" ? ui.session.review[0].en : ui.session.lesson.phrases[0].en;
  speak(fill(line));
}
function stepBar(phase) {
  const steps = uiLang() === "en"
    ? [["learn", "Learn"], ["drill", "Try"], ["speak", "Say"], ["apply", "Use"]]
    : [["learn", "学"], ["drill", "练"], ["speak", "说"], ["apply", "用"]];
  const rank = { review: 0, learn: 0, drill: 1, speak: 2, apply: 3 };
  const at = rank[phase] || 0;
  return `<div class="stepbar">${steps.map((pair, i) => `<span class="${i < at ? "done" : i === at ? "now" : ""}">${pair[1]}</span>`).join("")}</div>`;
}
function currentBlank(session) {
  return session.phase === "review" ? session.review[session.index] : session.lesson.drills[session.index];
}
function finishLesson() {
  const session = ui.session;
  const pid = active().id;
  const level = active().level;
  if (!state.path[pid]) state.path[pid] = {};
  state.path[pid][level] = (state.path[pid][level] || 0) + 1;
  const stars = session.starsEarned + (session.clean ? 2 : 0);
  giveStars(pid, stars);
  session.lesson.phrases.forEach((phrase) => remember(pid, fill(phrase.en)));
  touchStreak(pid);
  const bucket = todayBucket(pid);
  const firstToday = !bucket.lesson;
  bucket.lesson = true;
  save();
  ui.result = {
    mode: "lesson",
    title: lessonTitle(session.lesson),
    stars: stars,
    lines: session.lesson.phrases.map((phrase) => fill(phrase.en)),
    note: firstToday
      ? (uiLang() === "en" ? "Today's lesson is done. The next one is ready." : "今天的一课完成了。下一课已经排好，想继续就接着学。")
      : (uiLang() === "en" ? "Another lesson done." : "又多学了一课。")
  };
  ui.session = null;
  ui.screen = "result";
  ui.mood = "happy";
  burst();
  beep("ok");
  render();
}

function render() {
  const playScreens = ["hunt", "scene", "oops", "lesson"];
  const playing = ui.session && playScreens.indexOf(ui.screen) >= 0;
  if (!playing && playScreens.indexOf(ui.screen) >= 0) ui.screen = "home";
  const bare = ui.screen === "onboard";
  const app = document.getElementById("app");
  app.className = bare ? "bare" : "";
  const body = (screens[ui.screen] || screens.home)();
  const lang = uiLang();
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = lang === "zh" ? "皮皮英语" : "Pip English";
  app.innerHTML = bare ? body : layout(body);
  const chat = document.querySelector(".chat");
  if (chat) chat.scrollTop = chat.scrollHeight;
}

function layout(body) {
  const p = active();
  const stars = p ? (state.stars[p.id] || 0) : 0;
  const navOn = ui.screen === "hunt" || ui.screen === "hunt-setup" ? "hunt"
    : ui.screen === "scene" || ui.screen === "scenes" ? "scenes"
    : ui.screen === "oops" ? "oops" : "home";
  const en = uiLang() === "en";
  return `
    <header class="top">
      <button class="brand" data-act="nav" data-to="home">${parrot(ui.mood, true)}
        <span class="brand-name">${en ? "Pip" : "皮皮英语"}<small>${p ? esc(p.name) + " · " + levelName(p.level) : (en ? "English buddy" : "学习伴侣")}</small></span>
      </button>
      <div class="top-actions">
        <button class="icon-btn" data-act="lang" aria-label="${en ? "Language" : "语言"}">${en ? "中" : "EN"}</button>
        <button class="icon-btn" data-act="mute" aria-label="${en ? "Sound" : "声音"}">${state.mute ? "🔇" : "🔊"}</button>
        <button class="icon-btn" data-act="nav" data-to="about" aria-label="${en ? "About" : "说明"}">?</button>
        <div class="star-pill">★ ${stars}</div>
      </div>
    </header>
    <main class="main">${body}</main>
    <nav class="nav">
      ${navBtn("home", en ? "Home" : "首页", "🏠", navOn)}
      ${navBtn("hunt", en ? "Words" : "寻宝", "💎", navOn)}
      ${navBtn("scenes", en ? "Scenes" : "剧场", "🎭", navOn)}
      ${navBtn("oops", en ? "Fix" : "纠错", "🔍", navOn)}
    </nav>
    ${ui.overlay === "leave" ? leaveSheet() : ""}
  `;
}
function navBtn(id, label, icon, on) {
  return `<button data-act="nav" data-to="${id}" class="${on === id ? "on" : ""}"><small>${icon}</small>${label}</button>`;
}
function leaveSheet() {
  const en = uiLang() === "en";
  return `<div class="overlay"><div class="sheet">
    <h2>${en ? "Leave this round?" : "先离开吗？"}</h2>
    <p>${en ? "This round is not finished, so these stars are not saved yet." : "这一局还没结束，星星先不记。可以留下来把这一小局玩完。"}</p>
    <div class="actions">
      <button class="ghost" data-act="leave-go">${en ? "Leave" : "离开"}</button>
      <button class="primary" data-act="leave-stay">${en ? "Keep going" : "继续玩"}</button>
    </div>
  </div></div>`;
}

const screens = {
  onboard() {
    const d = ui.draft;
    const en = uiLang() === "en";
    if (ui.step === "who") {
      return `<section class="onboard">
        ${parrot("happy")}
        <p class="kicker">${en ? "English buddy · 0.2" : "英语学习伴侣 · 0.2"}</p>
        <h1 class="greet">${ui.adding ? (en ? "Add someone" : "再加一位家人") : (en ? "Hi, I'm Pip" : "嗨，我是皮皮")}</h1>
        <p class="sub">${en
          ? "One lesson a day: listen to three sentences, practice them, say them, then use them in a short chat."
          : "每天一课：先听三句，再练会，再说出来，最后用在对话里。说错了，我会用中文告诉你为什么。"}</p>
        <div style="height:12px"></div>
        <button class="pick" data-act="draft-who" data-role="kid" data-level="starter"><b>${en ? "Child · Starter" : "小朋友 · 启蒙"}</b><span>${en ? "Animals, colors, hello" : "认动物、颜色、打招呼"}</span></button>
        <button class="pick" data-act="draft-who" data-role="kid" data-level="kid"><b>${en ? "Child · Elementary" : "小朋友 · 小学"}</b><span>${en ? "School, lunch, asking for help" : "学校、天气、午饭、借东西"}</span></button>
        <button class="pick" data-act="draft-who" data-role="adult" data-level="grow"><b>${en ? "Me · Upper" : "我自己来 · 进阶"}</b><span>${en ? "Sorry, advice, asking the way" : "道歉、建议、问路和语法"}</span></button>
        ${ui.adding ? `<button class="ghost full" data-act="cancel-add">${en ? "Not now" : "先不加了"}</button>` : ""}
      </section>`;
    }
    return `<section class="onboard">
      ${parrot("think")}
      <p class="kicker">${levelName(d.level)}</p>
      <h1 class="greet">${en ? "What should Pip call you?" : "怎么称呼你？"}</h1>
      <p class="sub">${en ? "A first name is enough. Up to 8 characters." : "孩子可以用小名，家长也可以用“爸爸”“妈妈”。"}</p>
      <input id="name-input" class="name-input" maxlength="8" placeholder="${en ? "For example: Mia" : "例如：豆豆"}" value="${esc(d.name)}" />
      <button class="primary full" data-act="save-profile">${en ? "Start" : "开始一起玩"}</button>
      <div style="height:8px"></div>
      <button class="ghost full" data-act="draft-back">${en ? "Back" : "返回"}</button>
    </section>`;
  },
  home() {
    const p = active();
    const q = quoteOfDay();
    const daily = todayBucket(p.id);
    const learned = state.learned[p.id] || {};
    const words = Object.keys(learned).sort((a, b) => learned[b] - learned[a]).slice(0, 8);
    const en = uiLang() === "en";
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    return `
      <section class="hero">
        ${parrot(ui.mood)}
        <div>
          <p class="kicker">${en ? "A few minutes today" : "今天玩一小会儿"}</p>
          <h1 class="greet">${esc(greet())}</h1>
          <p class="sub">${esc(streakLabel(p.id))} · ${en ? learnedCount(p.id) + " words" : "认识了 " + learnedCount(p.id) + " 个词"}</p>
        </div>
      </section>
      ${lessonHomeCard()}
      ${!standalone ? `<p class="hint">${en ? "On a phone: open the browser menu and choose Add to Home Screen. Pip then opens like an app." : "手机浏览器菜单里选「添加到主屏幕」，就能像 App 一样打开。"}</p>` : ""}
      <div class="quote">
        <div class="quote-en">${esc(q.en)}</div>
        ${en ? "" : `<div class="quote-zh">${esc(q.zh)}</div>`}
        <div class="actions">
          <button class="sun" data-act="say" data-text="${esc(q.en)}">${en ? "Listen" : "听皮皮读"}</button>
          ${en ? "" : `<button class="ghost" data-act="say-zh" data-text="${esc(q.zh)}">听中文</button>`}
        </div>
      </div>
      <div class="goals">
        <div class="goal ${daily.hunt ? "done" : ""}">${en ? "Words" : "寻宝"}<span>${daily.hunt ? (en ? "Done" : "完成") : (en ? "6 cards" : "一轮 6 题")}</span></div>
        <div class="goal ${daily.scene ? "done" : ""}">${en ? "Scenes" : "剧场"}<span>${daily.scene ? (en ? "Done" : "完成") : (en ? "One chat" : "一段对话")}</span></div>
        <div class="goal ${daily.oops ? "done" : ""}">${en ? "Fix" : "纠错"}<span>${daily.oops ? (en ? "Done" : "完成") : (en ? "4 items" : "四道小题")}</span></div>
      </div>
      <div class="level-switch">
        ${LEVELS.map((lv) => `<button data-act="set-level" data-level="${lv.id}" class="${p.level === lv.id ? "on" : ""}">${levelName(lv.id)}</button>`).join("")}
      </div>
      <div class="row-title"><h2>${en ? "More practice" : "想多玩一会儿"}</h2><p>${en ? "Beside today's lesson" : "今日一课之外"}</p></div>
      <button class="play-card" data-act="nav" data-to="hunt"><span class="emoji-badge">💎</span><span><b>${en ? "Word hunt" : "单词寻宝"}</b><span>${en ? "Picture to word. Extra practice. Some hints are still in Chinese." : "看图选词，听音选意思。可以和家人轮流。"}</span></span><span class="chev">›</span></button>
      <button class="play-card" data-act="nav" data-to="scenes"><span class="emoji-badge">🎭</span><span><b>${en ? "Scene theater" : "情景剧场"}</b><span>${en ? "Short chats. After a correct line, you can say it." : "短对话。选对之后，可以跟着读出来。"}</span></span><span class="chev">›</span></button>
      <button class="play-card" data-act="nav" data-to="oops"><span class="emoji-badge">🔍</span><span><b>${en ? "Spot the mistake" : "找错小课堂"}</b><span>${en ? "Find the odd word. Explanations are in Chinese." : "点出奇怪的词，皮皮用中文讲原因。"}</span></span><span class="chev">›</span></button>
      <div class="row-title"><h2>${en ? "Who is learning" : "谁在学"}</h2><p>${state.profiles.length < 4 ? (en ? "Up to 4" : "最多 4 位") : ""}</p></div>
      <div class="chips">
        ${state.profiles.map((one) => `<button class="chip ${one.id === p.id ? "on" : ""}" data-act="switch" data-id="${one.id}">${esc(one.name)}</button>`).join("")}
        ${state.profiles.length < 4 ? `<button class="chip" data-act="add-profile">${en ? "+ Person" : "＋ 家人"}</button>` : ""}
      </div>
      ${words.length ? `<div class="row-title"><h2>${en ? "Word book" : "单词本"}</h2><p>${en ? "Tap to hear" : "点一下就能听"}</p></div><div class="pills">${words.map((word) => {
        const w = findWord(word);
        return `<button class="pill" data-act="say" data-text="${esc(word)}">${w.emoji} ${esc(word)}</button>`;
      }).join("")}</div>` : `<p class="hint" style="margin-top:14px">${en ? "The word book is empty. Try word hunt for the first word." : "单词本还是空的。去寻宝，认识第一个词。"}</p>`}
    `;
  },
  "hunt-setup"() {
    const others = state.profiles.filter((p) => p.id !== state.activeId);
    return `<section>
      <div class="panel"><h2>单词寻宝</h2><p>一轮 6 题，大约两分钟。看图的时候选英语，听声音的时候选中文。第一次答对得一颗星，连对 3 题再加一颗。</p></div>
      <button class="setup-card" data-act="hunt-solo"><span class="emoji-badge">🦜</span><span><b>自己练</b><span>按当前难度出题</span></span></button>
      <div class="row-title"><h2>亲子轮流</h2><p>一人一题</p></div>
      ${others.map((p) => `<button class="setup-card" data-act="hunt-duo" data-id="${p.id}"><span class="emoji-badge">🤝</span><span><b>和${esc(p.name)}轮流</b><span>星星记到各自名下</span></span></button>`).join("")}
      <div class="panel">
        <b>临时拉一位家人</b>
        <p class="hint">这一局有效，不写入家人列表。</p>
        <input id="guest-name" class="name-input" maxlength="8" placeholder="例如：妈妈" />
        <button class="primary full" data-act="hunt-guest">和这位一起玩</button>
      </div>
    </section>`;
  },
  hunt() {
    const s = ui.session;
    const q = s.questions[s.index];
    const player = s.players[s.turn];
    const dots = s.questions.map((_, i) => `<i class="${i < s.index || (i === s.index && s.phase === "correct") ? "done" : ""} ${i === s.index ? "now" : ""}"></i>`).join("");
    let card = "";
    if (s.phase === "ask" && q.type === "picture") {
      card = `<div class="emoji-xl">${q.word.emoji}</div><h2>${esc(q.word.zh)}</h2><p class="hint">选出英语</p>`;
    } else if (s.phase === "ask") {
      card = `<button class="listen-btn" data-act="hunt-listen" aria-label="听单词">🔊</button>
        <p class="hint" style="margin-top:10px">听皮皮说，选出意思${q.peeked ? " · 单词是 " + esc(q.word.en) : ""}</p>
        ${q.peeked ? "" : `<div style="height:8px"></div><button class="ghost" data-act="hunt-peek">看一眼单词</button>`}`;
    } else {
      card = `<div class="reveal-en">${esc(q.word.en)}</div>
        <div class="reveal-zh">${q.word.emoji} ${esc(q.word.zh)}</div>
        <div class="reveal-hint">记音帮手：${esc(q.word.hint)}。谐音只帮记忆，以喇叭里的声音为准。</div>
        <div class="actions"><button class="sun" data-act="hunt-listen">再听一次</button></div>`;
    }
    const options = s.phase === "ask" ? `<div class="options grid">${q.options.map((o, i) => {
      const label = q.type === "picture" ? o.en : o.zh;
      return `<button class="opt" data-act="hunt-pick" data-i="${i}">${esc(label)}</button>`;
    }).join("")}</div>` : `<button class="primary full" data-act="hunt-next">${s.index === s.questions.length - 1 ? "看结果" : "下一题"}</button>`;
    return `<section>
      <div class="play-top"><button class="ghost" data-act="nav" data-to="home">退出</button><div class="dots">${dots}</div><b>${s.index + 1}/6</b></div>
      ${s.duo ? `<div class="turn">轮到 ${esc(player.name)}${s.phase === "ask" ? " · 请把屏幕交给这一位" : ""} · 本局 ${player.stars} 星${player.combo > 1 ? " · 连对 " + player.combo : ""}</div>` : `<div class="turn">${esc(player.name)} · 本局 ${player.stars} 星${player.combo > 1 ? " · 连对 " + player.combo : ""}</div>`}
      <div class="prompt">${card}</div>
      ${options}
    </section>`;
  },
  scenes() {
    const level = active().level;
    const list = PIP_DATA.scenes.filter((s) => s.level === level);
    return `<section>
      <div class="panel"><h2>情景剧场</h2><p>选一个小故事。英语下面有中文，${level === "grow" ? "进阶默认先看英语，需要时再打开中文。" : "方便家长在旁边一起看。"}答对后可以跟读。</p></div>
      ${list.map((s) => `<button class="scene-card" data-act="scene-open" data-id="${s.id}"><span class="emoji-badge">${s.emoji}</span><span><b>${esc(s.title)}</b><span>${esc(s.blurb)}</span></span></button>`).join("")}
    </section>`;
  },
  scene() {
    const s = ui.session;
    const step = currentStep();
    const bubbles = s.bubbles.map((b) => `<div class="bubble ${b.who}"><div class="en">${esc(b.en)}</div>${ui.showZh ? `<div class="zh">${esc(b.zh)}</div>` : ""}</div>`).join("");
    let foot = "";
    if (s.phase === "choose") {
      foot = `<div class="choices">${step.choices.map((c, i) => `<button class="choice" data-act="scene-pick" data-i="${i}"><b>${efill(c.en)}</b>${ui.showZh ? `<small>${efill(c.zh)}</small>` : ""}</button>`).join("")}</div>
        ${s.why ? `<div class="why">${esc(s.why)}</div>` : ""}
        <div class="actions"><button class="ghost" data-act="toggle-zh">${ui.showZh ? "隐藏中文" : "看中文"}</button><button class="sun" data-act="scene-pip">再听皮皮</button></div>`;
    } else {
      foot = `<div class="follow">
        <div class="hint">跟着说这句</div>
        <b>${esc(s.followLine)}</b>
        ${s.heard ? `<p class="hint">皮皮听成了：${esc(s.heard)}</p>` : ""}
        ${s.why ? `<div class="why">${esc(s.why)}</div>` : ""}
        <div class="actions">
          <button class="sun" data-act="scene-follow-hear">听一遍</button>
          <button class="primary" data-act="scene-follow">${ui.listening ? "在听…" : "我来跟读"}</button>
        </div>
        <div style="height:8px"></div>
        <button class="ghost full" data-act="scene-next">${s.step === s.scene.steps.length - 1 ? "完成这段" : "下一句"}</button>
      </div>`;
    }
    return `<section class="stage">
      <div class="play-top"><button class="ghost" data-act="nav" data-to="scenes">退出</button><b>${s.scene.emoji} ${esc(s.scene.title)}</b></div>
      <div class="chat">${bubbles}</div>
      ${foot}
    </section>`;
  },
  lesson() {
    const s = ui.session;
    const lesson = s.lesson;
    const en = uiLang() === "en";
    let body = "";
    if (s.phase === "learn") {
      const phrase = lesson.phrases[s.index];
      body = `<div class="prompt">
        <p class="hint">${en ? "Listen first" : "先听熟"} ${s.index + 1}/3</p>
        <div class="reveal-en">${efill(phrase.en)}</div>
        ${en ? "" : `<div class="reveal-zh">${efill(phrase.zh)}</div>`}
        <div class="reveal-hint">${esc(localTip(lesson, s.index))}</div>
        <div class="actions"><button class="sun" data-act="lesson-hear">${en ? "Listen" : "听一遍"}</button></div>
      </div>
      <button class="primary full" data-act="lesson-next">${s.index === lesson.phrases.length - 1 ? (en ? "Practice" : "去练一练") : (en ? "Next" : "下一句")}</button>`;
    } else if (s.phase === "review" || s.phase === "drill") {
      const item = currentBlank(s);
      const total = s.phase === "review" ? s.review.length : lesson.drills.length;
      body = `<div class="prompt">
        <p class="hint">${s.phase === "review" ? (en ? "This one was not smooth last time" : "这句上次还没顺") : (en ? "Complete the sentence" : "把句子补完整")} ${s.index + 1}/${total}</p>
        <h2>${efill(item.prompt)}</h2>
        ${en ? "" : `<p class="hint">${esc(item.zh || "")}</p>`}
      </div>
      <div class="options">${item.options.map((option, i) => `<button class="opt" data-act="lesson-pick" data-i="${i}">${esc(option)}</button>`).join("")}</div>
      ${s.why ? `<div class="why">${esc(s.why)}</div>` : ""}`;
    } else if (s.phase === "speak") {
      const phrase = lesson.phrases[s.speakIndex];
      body = `<div class="prompt">
        <p class="hint">${en ? "Say the whole sentence" : "整句跟着说"} ${s.speakIndex + 1}/3. ${en ? "Pip checks the whole sentence, not each sound." : "皮皮只听整句像不像。"}</p>
        <div class="reveal-en">${efill(phrase.en)}</div>
        ${en ? "" : `<div class="reveal-zh">${efill(phrase.zh)}</div>`}
        ${s.heard ? `<p class="hint">${en ? "Pip heard: " : "皮皮听成了："}${esc(s.heard)}</p>` : ""}
        ${s.speakHit ? `<div class="why">${en ? "That sounded like the sentence." : "整句听起来很像。"}</div>` : ""}
        <div class="actions">
          <button class="sun" data-act="lesson-hear">${en ? "Listen" : "听一遍"}</button>
          <button class="primary" data-act="lesson-speak">${ui.listening ? (en ? "Listening…" : "在听…") : (en ? "Say it" : "我来跟读")}</button>
        </div>
      </div>
      <button class="ghost full" data-act="lesson-skip">${s.speakHit ? (s.speakIndex === lesson.phrases.length - 1 ? (en ? "Use it" : "去用一用") : (en ? "Next" : "下一句")) : (en ? "Skip this one" : "这句先跳过")}</button>`;
    } else {
      const step = lesson.apply[s.applyIndex];
      const right = step.choices.filter((choice) => choice.ok)[0];
      body = `<div class="bubble pip"><div class="en">${efill(step.pip.en)}</div>${en ? "" : `<div class="zh">${efill(step.pip.zh)}</div>`}</div>
        ${s.hold
          ? `<div class="bubble me"><div class="en">${efill(right.en)}</div></div><div class="why">${esc(s.why)}</div><button class="primary full" data-act="lesson-apply-next">${s.applyIndex === lesson.apply.length - 1 ? (en ? "Finish" : "完成本课") : (en ? "Continue" : "继续")}</button>`
          : `<div class="choices">${step.choices.map((choice, i) => `<button class="choice" data-act="lesson-apply" data-i="${i}"><b>${efill(choice.en)}</b>${en ? "" : `<small>${efill(choice.zh)}</small>`}</button>`).join("")}</div>${s.why ? `<div class="why">${esc(s.why)}</div>` : ""}`}`;
    }
    return `<section class="stage">
      <div class="play-top"><button class="ghost" data-act="nav" data-to="home">${en ? "Exit" : "退出"}</button><b>${lesson.emoji} ${esc(lessonTitle(lesson))}</b></div>
      ${stepBar(s.phase)}
      ${s.phase === "review" ? `<div class="turn">${en ? "Review one line, then the new lesson" : "先复习一句，再学新的"}</div>` : ""}
      ${body}
    </section>`;
  },
  oops() {
    const s = ui.session;
    const item = s.items[s.index];
    const dots = s.items.map((_, i) => `<i class="${i < s.index ? "done" : ""} ${i === s.index ? "now" : ""}"></i>`).join("");
    const words = item.words.map((w, i) => {
      const cls = s.phase === "find" && s.misses >= 2 && i === item.wrong ? "hinted" : "";
      return `<button class="word ${cls}" data-act="oops-word" data-i="${i}">${esc(w)}</button>`;
    }).join("");
    let body = "";
    if (s.phase === "find") {
      body = `<p class="hint">哪个词让句子变奇怪了？点它。</p><div class="sentence">${words}</div>${s.why ? `<div class="why">${esc(s.why)}</div>` : ""}`;
    } else if (s.phase === "fix") {
      body = `<p class="hint">这个词换成什么？</p><div class="sentence">${item.words.map((w, i) => `<span class="word ${i === item.wrong ? "hinted" : ""}">${esc(w)}</span>`).join("")}</div>
        <div class="choices">${item.fixes.map((f, i) => `<button class="choice" data-act="oops-fix" data-i="${i}">${esc(f.label)}</button>`).join("")}</div>
        ${s.why ? `<div class="why">${esc(s.why)}</div>` : ""}`;
    } else {
      body = `<div class="prompt"><div class="reveal-en">${esc(item.good)}</div><div class="reveal-hint">${esc(item.rule)}</div>
        <div class="actions"><button class="sun" data-act="oops-listen">听正确的句子</button></div></div>
        <button class="primary full" data-act="oops-next">${s.index === s.items.length - 1 ? "看结果" : "下一题"}</button>`;
    }
    return `<section>
      <div class="play-top"><button class="ghost" data-act="nav" data-to="home">退出</button><div class="dots">${dots}</div><b>${s.index + 1}/4</b></div>
      <div class="panel"><h2>找错小课堂</h2>${body}</div>
    </section>`;
  },
  result() {
    const r = ui.result;
    let extra = "";
    if (r.mode === "hunt") {
      extra = r.duo ? `<div class="score-grid">${r.players.map((p) => `<div><b>${esc(p.name)}</b><div>${p.score} 题 · ${p.stars} 星</div>${p.profileId ? "" : "<small>临时家人，星星只在这一局</small>"}</div>`).join("")}</div>`
        : `<div class="big-star">+${r.players[0].stars}</div>`;
      extra += `<div class="pills" style="justify-content:center">${r.words.map((w) => `<button class="pill" data-act="say" data-text="${esc(w.en)}">${w.emoji} ${esc(w.en)}</button>`).join("")}</div>`;
    } else {
      extra = `<div class="big-star">+${r.stars}</div><ol class="lines">${(r.lines || []).map((line) => `<li>${esc(line)}</li>`).join("")}</ol>`;
      if (r.rules) extra += r.rules.map((rule) => `<p class="hint">${esc(rule)}</p>`).join("");
    }
    return `<section class="result-card">
      ${parrot("happy")}
      <p class="kicker">${uiLang() === "en" ? "Pip kept this" : "皮皮记住了"}</p>
      <h2>${esc(r.title)}</h2>
      ${r.note ? `<p>${esc(r.note)}</p>` : ""}
      ${r.bonus ? `<p>${uiLang() === "en" ? "All three extra practices are done. +5 stars." : "今日三件事齐了，额外 +5 星。"}</p>` : ""}
      ${extra}
      <div class="actions">
        <button class="ghost" data-act="nav" data-to="home">${uiLang() === "en" ? "Home" : "回首页"}</button>
        <button class="primary" data-act="again">${r.mode === "lesson" ? (uiLang() === "en" ? "Next lesson" : "下一课") : (uiLang() === "en" ? "Play again" : "再来一局")}</button>
      </div>
    </section>`;
  },
  about() {
    const en = uiLang() === "en";
    if (en) {
      return `<section class="panel about">
        <h2>Pip English 0.2</h2>
        <p>A short daily English lesson. Progress stays in this browser and is not uploaded.</p>
        <h3>Today's lesson</h3>
        <p>Learn, practice, speak, use. Listen to three everyday sentences, fill the blanks, say the whole sentence, then use it in a tiny chat. Speaking checks the whole sentence. It does not score individual sounds.</p>
        <h3>Install</h3>
        <p>In Chrome, Edge, or Safari, use the browser menu and choose Add to Home Screen or Install. Pip then opens like an app.</p>
        <h3>More practice</h3>
        <p>Word hunt, scenes, and mistake practice are still here. Some explanations in those games are in Chinese. The daily lesson is in English when this page is in English.</p>
        <h3>Clear</h3>
        <p>This deletes the people and stars saved in this browser.</p>
        <button class="ghost full" data-act="reset">${ui.resetArmed ? "Tap again to confirm" : "Clear progress on this device"}</button>
      </section>`;
    }
    return `<section class="panel about">
      <h2>皮皮英语 0.2</h2>
      <p>给自己和孩子的英语小伙伴。进度只存在这台浏览器里，不上传。</p>
      <h3>今日一课</h3>
      <p>学、练、说、用。先听生活里会说的三句，补全句子，再整句跟读，最后放进一段小对话。跟读只判断整句像不像，不假装做音标打分。</p>
      <h3>安装</h3>
      <p>用 Chrome 或 Edge 打开这个网页，在浏览器菜单里选「添加到主屏幕」或「安装」。跟读需要 https 或本机启动。</p>
      <h3>自由练习</h3>
      <p>单词寻宝、情景剧场、找错小课堂还在。剧场可以跟读。寻宝可以两人轮流。说错会看到中文原因。</p>
      <h3>清空</h3>
      <p>会删掉这台浏览器里的家人和星星。</p>
      <button class="ghost full" data-act="reset">${ui.resetArmed ? "再点一次，确认清空" : "清空本机进度"}</button>
    </section>`;
  }
};

const actions = {
  "draft-who"(el) {
    ui.draft.role = el.dataset.role;
    ui.draft.level = el.dataset.level;
    ui.step = "name";
    render();
  },
  "draft-back"() {
    ui.step = "who";
    render();
  },
  "cancel-add"() {
    ui.adding = false;
    ui.step = "who";
    ui.screen = "home";
    render();
  },
  "save-profile"() {
    const input = document.getElementById("name-input");
    const name = (input ? input.value : ui.draft.name).trim().slice(0, 8);
    if (!name) { toast(uiLang() === "en" ? "Pick a name first" : "先起一个称呼"); return; }
    const profile = { id: rid(), name, role: ui.draft.role, level: ui.draft.level };
    state.profiles.push(profile);
    state.activeId = profile.id;
    state.stars[profile.id] = state.stars[profile.id] || 0;
    save();
    ui.adding = false;
    ui.step = "who";
    ui.screen = "home";
    ui.mood = "happy";
    toast(uiLang() === "en" ? "Hi, " + name + ". Let's do a short lesson." : "你好，" + name + "。今天我们玩一小会儿。");
    render();
  },
  nav(el) { navTo(el.dataset.to); },
  mute() {
    state.mute = !state.mute;
    if (state.mute) stopSpeak();
    save();
    render();
  },
  lang() {
    state.lang = uiLang() === "en" ? "zh" : "en";
    save();
    render();
  },
  "set-level"(el) {
    active().level = el.dataset.level;
    save();
    render();
  },
  switch(el) {
    state.activeId = el.dataset.id;
    save();
    ui.mood = "idle";
    render();
  },
  "add-profile"() {
    ui.adding = true;
    ui.step = "who";
    ui.draft = { role: "kid", level: "starter", name: "" };
    ui.screen = "onboard";
    render();
  },
  "hunt-solo"() { startHunt([makePlayer(active())]); },
  "hunt-duo"(el) {
    const other = state.profiles.find((p) => p.id === el.dataset.id);
    startHunt([makePlayer(active()), makePlayer(other)]);
  },
  "hunt-guest"() {
    const input = document.getElementById("guest-name");
    const name = (input ? input.value : "").trim().slice(0, 8);
    if (!name) { toast("先写家人的称呼"); return; }
    startHunt([makePlayer(active()), makePlayer(null, name)]);
  },
  "hunt-listen"() {
    const q = ui.session.questions[ui.session.index];
    speak(q.word.en);
  },
  "hunt-peek"() {
    const s = ui.session;
    s.questions[s.index].peeked = true;
    s.firstTry = false;
    render();
  },
  "hunt-pick"(el) {
    const s = ui.session;
    if (!s || s.phase !== "ask") return;
    const q = s.questions[s.index];
    const opt = q.options[Number(el.dataset.i)];
    const player = s.players[s.turn];
    if (!opt.ok) {
      s.firstTry = false;
      player.combo = 0;
      ui.mood = "oops";
      beep("bad");
      el.classList.add("bad");
      toast("再试一次，没关系");
      return;
    }
    if (s.firstTry) {
      player.score += 1;
      player.stars += 1;
      player.combo += 1;
      player.words.push(q.word.en);
      if (player.combo % 3 === 0) {
        player.stars += 1;
        beep("combo");
        toast("连对 " + player.combo + " 题");
      } else {
        beep("ok");
      }
    } else {
      player.words.push(q.word.en);
      beep("ok");
    }
    s.phase = "correct";
    ui.mood = "happy";
    burst();
    render();
    speak(q.word.en);
  },
  "hunt-next"() {
    const s = ui.session;
    if (s.index >= s.questions.length - 1) {
      finishHunt();
      return;
    }
    s.index += 1;
    s.phase = "ask";
    s.firstTry = true;
    if (s.duo) s.turn = (s.turn + 1) % s.players.length;
    ui.mood = "idle";
    render();
    const q = s.questions[s.index];
    if (q.type === "listen") speak(q.word.en);
  },
  "scene-open"(el) { startScene(el.dataset.id); },
  "scene-pip"() { speak(fill(currentStep().pip.en)); },
  "toggle-zh"() {
    ui.showZh = !ui.showZh;
    render();
  },
  "scene-pick"(el) {
    const s = ui.session;
    if (s.phase !== "choose") return;
    const choice = currentStep().choices[Number(el.dataset.i)];
    if (!choice.ok) {
      s.firstTry = false;
      s.perfect = false;
      s.why = fill(choice.why);
      ui.mood = "oops";
      beep("bad");
      render();
      return;
    }
    if (s.firstTry) s.starsEarned += 1;
    s.why = fill(choice.why);
    s.bubbles.push({ who: "me", en: fill(choice.en), zh: fill(choice.zh) });
    const reply = currentStep().reply;
    if (reply) s.bubbles.push({ who: "pip", en: fill(reply.en), zh: fill(reply.zh) });
    s.followLine = fill(choice.en);
    s.phase = "follow";
    s.heard = "";
    ui.mood = "happy";
    beep("ok");
    burst();
    render();
    speak(fill(choice.en));
  },
  "scene-follow-hear"() {
    speak(ui.session.followLine);
  },
  "scene-follow"() {
    if (ui.listening) return;
    const line = ui.session.followLine;
    listenFor(line, (heard) => {
      const s = ui.session;
      if (!s || s.type !== "scene") return;
      if (heard && similar(line, heard)) {
        s.heard = "";
        if (!s.followRewarded) {
          s.followRewarded = true;
          s.starsEarned += 1;
          toast("读得很像，加一颗星");
          beep("ok");
          burst();
        } else {
          toast("又读了一遍，漂亮");
        }
        ui.mood = "happy";
      } else if (!heard) {
        toast("没有听清。靠近一点，或先听皮皮读。");
        ui.mood = "oops";
      } else {
        s.heard = heard;
        toast("可以再试一次，也可以直接下一句");
        ui.mood = "oops";
      }
      render();
    });
  },
  "scene-next"() {
    const s = ui.session;
    stopListen();
    if (s.step >= s.scene.steps.length - 1) {
      finishScene();
      return;
    }
    s.step += 1;
    pushPipLine();
    ui.mood = "idle";
    render();
    speak(fill(currentStep().pip.en));
  },
  "oops-word"(el) {
    const s = ui.session;
    if (s.phase !== "find") return;
    const item = s.items[s.index];
    const index = Number(el.dataset.i);
    if (index !== item.wrong) {
      s.misses += 1;
      s.findFirst = false;
      s.why = s.misses >= 2 ? item.hint : "不是这个词，再找找。";
      ui.mood = "oops";
      beep("bad");
      render();
      return;
    }
    if (s.findFirst) s.starsEarned += 1;
    s.phase = "fix";
    s.why = "";
    s.fixFirst = true;
    ui.mood = "think";
    beep("ok");
    render();
  },
  "oops-fix"(el) {
    const s = ui.session;
    if (s.phase !== "fix") return;
    const item = s.items[s.index];
    const fix = item.fixes[Number(el.dataset.i)];
    if (!fix.ok) {
      s.fixFirst = false;
      s.why = fix.why || "再看看另外两个。";
      ui.mood = "oops";
      beep("bad");
      render();
      return;
    }
    if (s.fixFirst) s.starsEarned += 1;
    s.phase = "teach";
    s.why = "";
    s.log.push({ good: item.good, rule: item.rule });
    ui.mood = "happy";
    beep("ok");
    burst();
    render();
    speak(item.good);
  },
  "oops-listen"() {
    speak(ui.session.items[ui.session.index].good);
  },
  "oops-next"() {
    const s = ui.session;
    if (s.index >= s.items.length - 1) {
      finishOops();
      return;
    }
    s.index += 1;
    s.phase = "find";
    s.misses = 0;
    s.findFirst = true;
    s.fixFirst = true;
    s.why = "";
    ui.mood = "think";
    render();
  },
  "start-lesson"() { startLesson(); },
  "lesson-hear"() {
    const s = ui.session;
    let line = "";
    if (s.phase === "learn") line = s.lesson.phrases[s.index].en;
    else if (s.phase === "speak") line = s.lesson.phrases[s.speakIndex].en;
    else if (s.phase === "review") line = s.review[s.index].en;
    else if (s.phase === "apply") line = s.lesson.apply[s.applyIndex].pip.en;
    if (line) speak(fill(line));
  },
  "lesson-next"() {
    const s = ui.session;
    if (!s || s.phase !== "learn") return;
    if (s.index < s.lesson.phrases.length - 1) {
      s.index += 1;
      render();
      speak(fill(s.lesson.phrases[s.index].en));
      return;
    }
    s.phase = "drill";
    s.index = 0;
    s.firstTry = true;
    s.why = "";
    ui.mood = "think";
    render();
  },
  "lesson-pick"(el) {
    const s = ui.session;
    if (!s || (s.phase !== "drill" && s.phase !== "review")) return;
    const item = currentBlank(s);
    const picked = item.options[Number(el.dataset.i)];
    if (picked !== item.answer) {
      s.firstTry = false;
      s.clean = false;
      s.why = uiLang() === "en" ? "Use " + item.answer + ". Try again." : "这里用 " + item.answer + "。再选一次。";
      if (s.phase === "drill") queueReview(active().id, s.lesson.drills[s.index]);
      ui.mood = "oops";
      beep("bad");
      render();
      return;
    }
    if (s.firstTry) s.starsEarned += 1;
    dropReview(active().id, item.en);
    beep("ok");
    const total = s.phase === "review" ? s.review.length : s.lesson.drills.length;
    if (s.index < total - 1) {
      s.index += 1;
      s.firstTry = true;
      s.why = "";
      render();
      return;
    }
    if (s.phase === "review") {
      s.phase = "learn";
      s.index = 0;
      s.firstTry = true;
      s.why = "";
      ui.mood = "idle";
      render();
      speak(fill(s.lesson.phrases[0].en));
      return;
    }
    s.phase = "speak";
    s.speakIndex = 0;
    s.speakHit = false;
    s.heard = "";
    s.why = "";
    render();
    speak(fill(s.lesson.phrases[0].en));
  },
  "lesson-speak"() {
    const s = ui.session;
    if (!s || s.phase !== "speak") return;
    const line = fill(s.lesson.phrases[s.speakIndex].en);
    listenFor(line, (heard) => {
      const cur = ui.session;
      if (!cur || cur.type !== "lesson" || cur.phase !== "speak") return;
      if (heard && similar(line, heard)) {
        cur.heard = "";
        if (!cur.speakHit) {
          cur.speakHit = true;
          cur.starsEarned += 1;
          toast(uiLang() === "en" ? "That sounded like the sentence" : "整句听起来很像");
          beep("ok");
          burst();
        }
        ui.mood = "happy";
      } else if (!heard) {
        toast(uiLang() === "en" ? "Didn't catch that. Listen again, or skip for now." : "没有听清。可以再听一遍，或先跳过。");
        ui.mood = "oops";
      } else {
        cur.heard = heard;
        toast(uiLang() === "en" ? "Not quite. Listen to Pip once more." : "还不太像。再听皮皮读一遍。");
        ui.mood = "oops";
      }
      render();
    });
  },
  "lesson-skip"() {
    const s = ui.session;
    if (!s || s.phase !== "speak") return;
    const phrase = s.lesson.phrases[s.speakIndex];
    const drill = s.lesson.drills[s.speakIndex];
    if (!s.speakHit) {
      s.clean = false;
      queueReview(active().id, drill);
    } else {
      dropReview(active().id, phrase.en);
    }
    if (s.speakIndex < s.lesson.phrases.length - 1) {
      s.speakIndex += 1;
      s.speakHit = false;
      s.heard = "";
      render();
      speak(fill(s.lesson.phrases[s.speakIndex].en));
      return;
    }
    s.phase = "apply";
    s.applyIndex = 0;
    s.firstTry = true;
    s.hold = false;
    s.why = "";
    render();
    speak(fill(s.lesson.apply[0].pip.en));
  },
  "lesson-apply"(el) {
    const s = ui.session;
    if (!s || s.phase !== "apply" || s.hold) return;
    const step = s.lesson.apply[s.applyIndex];
    const choice = step.choices[Number(el.dataset.i)];
    if (!choice.ok) {
      s.firstTry = false;
      s.clean = false;
      s.why = localWhy(s.lesson, s.applyIndex, Number(el.dataset.i), choice.why);
      ui.mood = "oops";
      beep("bad");
      render();
      return;
    }
    if (s.firstTry) s.starsEarned += 1;
    s.why = localWhy(s.lesson, s.applyIndex, Number(el.dataset.i), choice.why);
    s.hold = true;
    ui.mood = "happy";
    beep("ok");
    burst();
    render();
    speak(fill(choice.en));
  },
  "lesson-apply-next"() {
    const s = ui.session;
    if (!s || !s.hold) return;
    if (s.applyIndex >= s.lesson.apply.length - 1) {
      finishLesson();
      return;
    }
    s.applyIndex += 1;
    s.firstTry = true;
    s.hold = false;
    s.why = "";
    render();
    speak(fill(s.lesson.apply[s.applyIndex].pip.en));
  },
  say(el) { speak(el.dataset.text, "en-US"); },
  "say-zh"(el) { speak(el.dataset.text, "zh-CN"); },
  again() {
    const mode = ui.result && ui.result.mode;
    if (mode === "lesson") startLesson();
    else if (mode === "hunt") navTo("hunt");
    else if (mode === "scene" && ui.result.sceneId) startScene(ui.result.sceneId);
    else startOops();
  },
  reset() {
    if (!ui.resetArmed) {
      ui.resetArmed = true;
      render();
      return;
    }
    state = fresh();
    save();
    ui = blankUi();
    render();
    toast("已经清空，可以重新开始");
  },
  "leave-stay"() {
    ui.overlay = null;
    render();
  },
  "leave-go"() {
    stopSpeak();
    stopListen();
    ui.session = null;
    ui.overlay = null;
    const to = ui.leaveTo;
    ui.leaveTo = "home";
    if (to === "oops") startOops();
    else {
      ui.screen = to === "hunt" ? "hunt-setup" : to;
      render();
    }
  }
};

function navTo(to) {
  const playing = ui.session && (ui.screen === "hunt" || ui.screen === "scene" || ui.screen === "oops" || ui.screen === "lesson");
  if (playing) {
    ui.leaveTo = to;
    ui.overlay = "leave";
    render();
    return;
  }
  stopSpeak();
  stopListen();
  ui.resetArmed = false;
  if (to === "hunt") {
    ui.screen = "hunt-setup";
    render();
    return;
  }
  if (to === "oops") {
    startOops();
    return;
  }
  if (to === "scenes") {
    ui.screen = "scenes";
    render();
    return;
  }
  ui.screen = to;
  ui.mood = "idle";
  render();
}

function onClick(e) {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const fn = actions[el.dataset.act];
  if (!fn) return;
  if (el.dataset.act !== "scene-follow" && el.dataset.act !== "lesson-speak") stopListen();
  fn(el, e);
}
function onKey(e) {
  if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
  const n = Number(e.key);
  if (!n) return;
  if (ui.screen === "hunt" && ui.session && ui.session.phase === "ask" && n >= 1 && n <= 4) {
    const btn = document.querySelector('.opt[data-i="' + (n - 1) + '"]');
    if (btn) actions["hunt-pick"](btn);
  }
  if (ui.screen === "scene" && ui.session && ui.session.phase === "choose" && n >= 1 && n <= 3) {
    const btn = document.querySelector('.choice[data-i="' + (n - 1) + '"]');
    if (btn) actions["scene-pick"](btn);
  }
  if (ui.screen === "lesson" && ui.session && (ui.session.phase === "drill" || ui.session.phase === "review") && n >= 1 && n <= 3) {
    const btn = document.querySelector('.opt[data-i="' + (n - 1) + '"]');
    if (btn) actions["lesson-pick"](btn);
  }
  if (ui.screen === "lesson" && ui.session && ui.session.phase === "apply" && !ui.session.hold && n >= 1 && n <= 3) {
    const btn = document.querySelector('.choice[data-i="' + (n - 1) + '"]');
    if (btn) actions["lesson-apply"](btn);
  }
}

function init() {
  const saved = load();
  if (saved) state = Object.assign(fresh(), saved);
  if (!state.path) state.path = {};
  if (!state.review) state.review = {};
  if (!state.profiles.some((p) => p.id === state.activeId)) {
    state.activeId = state.profiles[0] ? state.profiles[0].id : null;
  }
  ui.screen = state.profiles.length ? "home" : "onboard";
  if (window.speechSynthesis) speechSynthesis.onvoiceschanged = () => {};
  const app = document.getElementById("app");
  app.addEventListener("click", onClick);
  document.addEventListener("keydown", onKey);
  render();
  if (location.protocol.indexOf("http") === 0 && "serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}
init();
