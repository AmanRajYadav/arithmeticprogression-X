/* ════════════════════════════════════════════════════════════════
   test-ap.js — run with:  node test-ap.js

   Pulls the <script> body out of ap.html, runs it in a vm with a
   thin DOM stub, then hammers the generators.

   The important rule: the oracle here re-derives every answer from
   the SEQUENCE THE STUDENT SEES, using its own fraction code. It
   never calls the game's own maths. Checking the game against
   itself would test nothing.
   ════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const HTML = fs.readFileSync(path.join(__dirname, 'ap.html'), 'utf8');
const m = HTML.match(/<script>\s*'use strict';([\s\S]*?)<\/script>/);
if (!m) { console.error('could not find the game script in ap.html'); process.exit(1); }
const SRC = m[1];

/* ── DOM stub ──────────────────────────────────────────────── */
function el() {
  const e = {
    textContent: '', innerHTML: '', value: '', hidden: false, disabled: false,
    dataset: {}, style: {}, offsetWidth: 0,
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {}, removeEventListener() {}, focus() {}, click() {},
    querySelectorAll() { return []; }, querySelector() { return el(); },
    appendChild() {}, remove() {}
  };
  return e;
}
const store = {};
const ctx = {
  console,
  document: {
    getElementById: () => el(),
    querySelectorAll: () => [],
    querySelector: () => el(),
    addEventListener() {},
    body: el(),
    createElement: () => el()
  },
  window: { addEventListener() {} },
  navigator: {},
  localStorage: {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; }
  },
  matchMedia: () => ({ matches: false }),
  requestAnimationFrame: () => 0,
  performance: { now: () => 0 },
  setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  Math, Date, JSON, parseFloat, parseInt, isNaN, String, Number, Object, Array, Error, RegExp,
  encodeURIComponent
};
ctx.globalThis = ctx;
ctx.window.document = ctx.document;
vm.createContext(ctx);
vm.runInContext("'use strict';" + SRC, ctx, { filename: 'ap.html' });

const AP = ctx.__ap;
if (!AP) { console.error('globalThis.__ap export missing'); process.exit(1); }

/* ── independent rational arithmetic (NOT the game's) ──────── */
function g(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
function r(n, d) { d = d === undefined ? 1 : d; if (d < 0) { n = -n; d = -d; } const k = g(n, d); return [n / k, d / k]; }
const add = (a, b) => r(a[0] * b[0 + 1] + b[0] * a[1], a[1] * b[1]);
const sub = (a, b) => r(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const mulk = (a, k) => r(a[0] * k, a[1]);
const eq = (a, b) => a[0] === b[0] && a[1] === b[1];
const val = a => a[0] / a[1];

/* parse one displayed term back to an exact rational; null if symbolic */
function parseTerm(s) {
  s = String(s).trim().replace(/−/g, '-').replace(/&minus;/g, '-').replace(/\s/g, '');
  if (!s || s === '…') return null;
  let mm = s.match(/^(-?\d+)\/(\d+)$/);
  if (mm) return r(+mm[1], +mm[2]);
  mm = s.match(/^(-?\d+)\.(\d+)$/);
  if (mm) {
    const dec = mm[2];
    const sign = mm[1].startsWith('-') ? -1 : 1;
    const whole = Math.abs(+mm[1]);
    return r(sign * (whole * Math.pow(10, dec.length) + +dec), Math.pow(10, dec.length));
  }
  mm = s.match(/^-?\d+$/);
  if (mm) return r(+s);
  return null;
}
/* split a displayed sequence into terms; returns null if anything is symbolic */
function parseSeq(seq) {
  if (!seq) return null;
  const parts = String(seq).split(',').map(x => x.trim()).filter(x => x && x !== '…');
  const out = [];
  for (const p of parts) {
    const t = parseTerm(p);
    if (!t) return null;
    out.push(t);
  }
  return out.length >= 2 ? out : null;
}

/* ── failure collection, grouped ───────────────────────────── */
const fails = new Map();
let checked = 0;
function bad(group, detail) {
  if (!fails.has(group)) fails.set(group, []);
  const list = fails.get(group);
  if (list.length < 4) list.push(detail);
  else list.count = (list.count || 0) + 1;
}
function ok(cond, group, detail) { if (!cond) bad(group, detail); return !!cond; }

/* ── per-question invariants ───────────────────────────────── */
const BAD_TEXT = /undefined|NaN|null|Infinity/;
const FLOAT_NOISE = /\.\d{7,}/;
/* a real minus must be U+2212; ASCII '-' between numbers is a bug */
const ASCII_MINUS = /(?:^|[\s(>])-\s*\d|\d\s+-\s+\d/;

function displayStrings(q) {
  const out = [];
  ['lead', 'seq', 'big', 'ask', 'ansLabel', 'kicker', 'say'].forEach(k => { if (q[k]) out.push(String(q[k])); });
  (q.opts || []).forEach(o => out.push(String(o.lb)));
  (q.work || []).forEach(w => { out.push(String(w.t)); if (w.why) out.push(String(w.why)); });
  return out;
}

function checkShape(q, tag) {
  checked++;
  if (!ok(q && typeof q === 'object', tag + ':object', 'generator returned ' + q)) return;
  ok(AP.TOPICS[q.topic], tag + ':topic', 'unknown topic ' + q.topic);
  ok(q.mode === 'mcq' || q.mode === 'type', tag + ':mode', 'mode=' + q.mode);
  ok(Array.isArray(q.work) && q.work.length >= 2, tag + ':work',
     'work lines=' + (q.work ? q.work.length : 0) + ' for ' + q.topic);
  ok(!!q.ansLabel, tag + ':ansLabel', 'empty ansLabel for ' + q.topic);

  if (q.mode === 'mcq') {
    const o = q.opts || [];
    ok(o.length === 4, tag + ':opt-count', q.topic + ' has ' + o.length + ' options');
    const right = o.filter(x => x.ok);
    ok(right.length === 1, tag + ':one-correct', q.topic + ' has ' + right.length + ' correct options');
    const labels = o.map(x => String(x.lb));
    ok(new Set(labels).size === labels.length, tag + ':distinct',
       q.topic + ' duplicate option: ' + labels.join(' | '));
    o.forEach(x => ok(!x.ok || true, tag + ':x', ''));
    /* every wrong option must explain itself — that explanation is the lesson */
    o.filter(x => !x.ok).forEach(x =>
      ok(!!x.why, tag + ':why', q.topic + ' wrong option with no reason: ' + x.lb));
  } else {
    ok(typeof q.ansTyped === 'string' && q.ansTyped.length > 0, tag + ':typed', q.topic + ' missing ansTyped');
    ok(/^-?\d+(\.\d+)?$/.test(q.ansTyped), tag + ':typed-num',
       q.topic + ' ansTyped=' + q.ansTyped + ' — the pad cannot produce this');
    ok(!/−/.test(q.ansTyped), tag + ':typed-minus',
       q.topic + ' ansTyped uses U+2212, the pad produces ASCII: ' + q.ansTyped);
  }

  displayStrings(q).forEach(s => {
    ok(!BAD_TEXT.test(s), tag + ':bad-text', q.topic + ' :: ' + s.slice(0, 90));
    ok(!FLOAT_NOISE.test(s), tag + ':float-noise', q.topic + ' :: ' + s.slice(0, 90));
    ok(!ASCII_MINUS.test(s.replace(/<[^>]*>/g, ' ').replace(/&\w+;/g, ' ')),
       tag + ':ascii-minus', q.topic + ' :: ' + s.slice(0, 90));
  });
}

/* ── the oracle: recompute from what the student sees ──────── */
function ordinal(s) { const mm = String(s).match(/(\d+)(?:st|nd|rd|th)\b/); return mm ? +mm[1] : null; }

function checkMath(q, tag) {
  const terms = parseSeq(q.seq);

  if (q.topic === 'findd' && terms && terms.length >= 3 && q.kicker === 'Common difference') {
    const d = sub(terms[1], terms[0]);
    ok(eq(sub(terms[2], terms[1]), d), tag + ':findd-notap', 'sequence is not an AP: ' + q.seq);
    const claim = parseTerm(q.ansLabel);
    ok(claim && eq(claim, d), tag + ':findd', q.seq + ' -> answer ' + q.ansLabel + ' (oracle ' + val(d) + ')');
  }

  if (q.topic === 'nth' && terms && terms.length >= 3) {
    const n = ordinal(q.lead);
    const a = terms[0], d = sub(terms[1], terms[0]);
    if (n) {
      const want = add(a, mulk(d, n - 1));
      const claim = parseTerm(q.ansLabel);
      ok(claim && eq(claim, want), tag + ':nth',
         q.seq + ' n=' + n + ' -> ' + q.ansLabel + ' (oracle ' + val(want) + ')');
    }
  }

  if (q.topic === 'findn' && terms && terms.length >= 3 && /kaunse number ka term|kitne terms|kaunsa term zero/.test(q.lead)) {
    const a = terms[0], d = sub(terms[1], terms[0]);
    const last = terms[terms.length - 1];
    if (val(d) !== 0) {
      const k = sub(last, a);
      const steps = (k[0] * d[1]) / (k[1] * d[0]);
      const n = Math.round(steps) + 1;
      ok(Math.abs(steps - Math.round(steps)) < 1e-9, tag + ':findn-int', 'non-integer position for ' + q.seq);
      ok(String(n) === String(q.ansLabel), tag + ':findn',
         q.seq + ' -> ' + q.ansLabel + ' (oracle ' + n + ')');
    }
  }

  if (q.topic === 'fromend' && terms && terms.length >= 3) {
    const k = ordinal(q.lead);
    const a = terms[0], d = sub(terms[1], terms[0]);
    const l = terms[terms.length - 1];
    if (k) {
      const want = sub(l, mulk(d, k - 1));
      const claim = parseTerm(q.ansLabel);
      ok(claim && eq(claim, want), tag + ':fromend',
         q.seq + ' k=' + k + ' -> ' + q.ansLabel + ' (oracle ' + val(want) + ')');
    }
  }

  if (q.topic === 'mid' && terms && terms.length >= 3 && q.seq) {
    const a = terms[0], d = sub(terms[1], terms[0]);
    const l = terms[terms.length - 1];
    if (val(d) !== 0) {
      const kk = sub(l, a);
      const steps = (kk[0] * d[1]) / (kk[1] * d[0]);
      const n = Math.round(steps) + 1;
      ok(Math.abs(steps - Math.round(steps)) < 1e-9, tag + ':mid-n', 'non-integer n for ' + q.seq);
      if (n % 2 === 1) {
        const want = add(a, mulk(d, (n + 1) / 2 - 1));
        const claim = parseTerm(q.ansLabel);
        ok(claim && eq(claim, want), tag + ':mid-odd',
           q.seq + ' n=' + n + ' -> ' + q.ansLabel + ' (oracle ' + val(want) + ')');
      } else {
        const w1 = add(a, mulk(d, n / 2 - 1)), w2 = add(a, mulk(d, n / 2));
        const parts = String(q.ansLabel).split(' aur ').map(parseTerm);
        ok(parts.length === 2 && parts[0] && parts[1] && eq(parts[0], w1) && eq(parts[1], w2),
           tag + ':mid-even', q.seq + ' n=' + n + ' -> ' + q.ansLabel +
           ' (oracle ' + val(w1) + ', ' + val(w2) + ')');
      }
    }
  }

  if (q.topic === 'build') {
    const mm = String(q.lead).replace(/<[^>]*>/g, '').match(/a\s*=\s*(\S+)\s*aur\s*d\s*=\s*(\S+)/);
    if (mm) {
      const a = parseTerm(mm[1]), d = parseTerm(mm[2]);
      if (a && d) {
        const want = [0, 1, 2, 3].map(i => add(a, mulk(d, i)));
        const got = parseSeq(q.ansLabel);
        ok(got && got.length === 4 && got.every((t, i) => eq(t, want[i])),
           tag + ':build', 'a=' + val(a) + ' d=' + val(d) + ' -> ' + q.ansLabel);
      }
    }
  }
}

/* ── plain text out of the display HTML ────────────────────── */
function plain(x) {
  return String(x)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&minus;/g, '−')
    .replace(/&nbsp;|&#8377;|&hellip;/g, ' ')
    .replace(/&rarr;/g, '->')
    .replace(/&#9633;/g, '#')
    .replace(/&divide;/g, '/')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ── the NCERT question shapes, checked independently ──────── */
function checkNcert(q, tag) {

  /* Ex 5.2 Q1 — a / d / n / aₙ table: recompute the missing cell */
  if (q.topic === 'table') {
    const t = plain(q.seq);
    const mm = t.match(/a\s*=\s*(\S+).*?d\s*=\s*(\S+).*?n\s*=\s*(\S+).*?a n\s*=\s*(\S+)/) ||
               t.match(/a\s*=\s*(\S+).*?d\s*=\s*(\S+).*?n\s*=\s*(\S+).*?an\s*=\s*(\S+)/);
    if (mm) {
      const cells = [mm[1], mm[2], mm[3], mm[4]];
      const q_ = cells.filter(c => c === '?').length;
      ok(q_ === 1, tag + ':table-holes', 'table shows ' + q_ + ' holes: ' + t);
      const A = parseTerm(cells[0]), D = parseTerm(cells[1]);
      const N = cells[2] === '?' ? null : parseInt(cells[2], 10);
      const AN = parseTerm(cells[3]);
      const claim = parseTerm(q.ansLabel);
      if (!claim) return;
      if (cells[3] === '?' && A && D && N) {
        const want = add(A, mulk(D, N - 1));
        ok(eq(claim, want), tag + ':table-an', t + ' -> ' + q.ansLabel + ' (oracle ' + val(want) + ')');
      } else if (cells[0] === '?' && D && N && AN) {
        const want = sub(AN, mulk(D, N - 1));
        ok(eq(claim, want), tag + ':table-a', t + ' -> ' + q.ansLabel + ' (oracle ' + val(want) + ')');
      } else if (cells[1] === '?' && A && N && AN) {
        const num = sub(AN, A);
        const want = r(num[0], num[1] * (N - 1));
        ok(eq(claim, want), tag + ':table-d', t + ' -> ' + q.ansLabel + ' (oracle ' + val(want) + ')');
      } else if (cells[2] === '?' && A && D && AN) {
        const k = sub(AN, A);
        const steps = (k[0] * D[1]) / (k[1] * D[0]);
        ok(Math.abs(steps - Math.round(steps)) < 1e-9, tag + ':table-n-int', 'non-integer n: ' + t);
        ok(String(Math.round(steps) + 1) === String(q.ansLabel),
           tag + ':table-n', t + ' -> ' + q.ansLabel + ' (oracle ' + (Math.round(steps) + 1) + ')');
      }
    }
  }

  /* Ex 5.2 Q3 — missing terms: rebuild the AP from the two visible cells */
  if (q.topic === 'missing') {
    const cells = plain(q.seq).split(',').map(x => x.trim());
    const ask = cells.indexOf('?');
    ok(ask >= 0, tag + ':missing-ask', 'no ? cell in ' + plain(q.seq));
    const known = [];
    cells.forEach((c, i) => { const v = parseTerm(c); if (v) known.push([i, v]); });
    ok(known.length === 2, tag + ':missing-known', known.length + ' visible cells, expected 2');
    if (ask >= 0 && known.length === 2) {
      const [i1, v1] = known[0], [i2, v2] = known[1];
      const span = i2 - i1;
      const diff = sub(v2, v1);
      const D = r(diff[0], diff[1] * span);
      const want = add(v1, mulk(D, ask - i1));
      const claim = parseTerm(q.ansLabel);
      ok(claim && eq(claim, want), tag + ':missing',
         plain(q.seq) + ' -> ' + q.ansLabel + ' (oracle ' + val(want) + ')');
    }
  }

  /* Ex 5.2 Q7/8/9/16 — two terms given */
  if (q.topic === 'twoterm') {
    const t = plain(q.lead);
    const mm = t.match(/(\d+)(?:st|nd|rd|th) term (−?[\d.\/]+) hai aur (\d+)(?:st|nd|rd|th) term (−?[\d.\/]+) hai/);
    if (mm) {
      const p1 = +mm[1], v1 = parseTerm(mm[2]), p2 = +mm[3], v2 = parseTerm(mm[4]);
      if (v1 && v2 && p2 !== p1) {
        const diff = sub(v2, v1);
        const D = r(diff[0], diff[1] * (p2 - p1));
        const A = sub(v1, mulk(D, p1 - 1));
        const want = t.match(/Iska (\d+)(?:st|nd|rd|th) term/);
        if (want) {
          const rr = +want[1];
          const exp = add(A, mulk(D, rr - 1));
          const claim = parseTerm(q.ansLabel);
          ok(claim && eq(claim, exp), tag + ':twoterm-term',
             t.slice(0, 70) + ' -> ' + q.ansLabel + ' (oracle ' + val(exp) + ')');
        } else if (/Common difference kya hai/.test(t)) {
          const claim = parseTerm(q.ansLabel);
          ok(claim && eq(claim, D), tag + ':twoterm-d',
             t.slice(0, 70) + ' -> ' + q.ansLabel + ' (oracle ' + val(D) + ')');
        } else if (/kaunsa term zero hai/.test(t)) {
          const k = sub([0, 1], A);
          const steps = (k[0] * D[1]) / (k[1] * D[0]);
          ok(Math.abs(steps - Math.round(steps)) < 1e-9, tag + ':twoterm-zero-int', t.slice(0, 70));
          const n = Math.round(steps) + 1;
          ok(q.ansLabel === n + 'th term', tag + ':twoterm-zero',
             t.slice(0, 70) + ' -> ' + q.ansLabel + ' (oracle ' + n + 'th term)');
        } else if (/Pehle teen terms/.test(t)) {
          const got = parseSeq(q.ansLabel);
          const wantSeq = [0, 1, 2].map(i => add(A, mulk(D, i)));
          ok(got && got.length === 3 && got.every((x, i) => eq(x, wantSeq[i])),
             tag + ':twoterm-ap', t.slice(0, 70) + ' -> ' + q.ansLabel);
        }
      }
    }
  }

  /* Ex 5.2 Q13/Q14 — counting multiples */
  if (q.topic === 'countap') {
    const t = plain(q.lead);
    let mm = t.match(/Kitne (two|three)-digit numbers (\d+) se divisible hain/);
    if (mm) {
      const lo = mm[1] === 'two' ? 10 : 100, hi = mm[1] === 'two' ? 99 : 999, k = +mm[2];
      let n = 0;
      for (let x = lo; x <= hi; x++) if (x % k === 0) n++;      /* brute force, deliberately */
      ok(String(n) === String(q.ansLabel), tag + ':countap-digits',
         t + ' -> ' + q.ansLabel + ' (oracle ' + n + ')');
    }
    mm = t.match(/(\d+) aur (\d+) ke beech (\d+) ke kitne multiples/);
    if (mm) {
      const lo = +mm[1], hi = +mm[2], k = +mm[3];
      let n = 0;
      for (let x = lo + 1; x < hi; x++) if (x % k === 0) n++;
      ok(String(n) === String(q.ansLabel), tag + ':countap-between',
         t + ' -> ' + q.ansLabel + ' (oracle ' + n + ')');
    }
  }

  /* Ex 5.2 Q15 — the n at which two APs agree */
  if (q.topic === 'equalterm') {
    const t = plain(q.lead);
    const mm = t.match(/Do APs hain: (.+?) aur (.+?) [-—]/);
    if (mm) {
      const s1 = parseSeq(mm[1]), s2 = parseSeq(mm[2]);
      if (s1 && s2 && s1.length >= 2 && s2.length >= 2) {
        const A1 = s1[0], D1 = sub(s1[1], s1[0]);
        const A2 = s2[0], D2 = sub(s2[1], s2[0]);
        const num = sub(A1, A2), den = sub(D2, D1);
        const steps = (num[0] * den[1]) / (num[1] * den[0]);
        ok(Math.abs(steps - Math.round(steps)) < 1e-9, tag + ':equalterm-int', t.slice(0, 80));
        const n = Math.round(steps) + 1;
        ok(String(n) === String(q.ansLabel), tag + ':equalterm',
           t.slice(0, 80) + ' -> ' + q.ansLabel + ' (oracle ' + n + ')');
        /* and the two nth terms really must be equal there */
        const x1 = add(A1, mulk(D1, n - 1)), x2 = add(A2, mulk(D2, n - 1));
        ok(eq(x1, x2), tag + ':equalterm-check', 'terms differ at n=' + n);
      }
    }
  }

  /* Ex 5.2 Q10 — "exceeds by" must reduce to a whole number of gaps */
  if (q.topic === 'exceeds') {
    const t = plain(q.lead);
    let mm = t.match(/(\d+)(?:st|nd|rd|th) term apne (\d+)(?:st|nd|rd|th) term se (−?\d+) zyada hai/);
    if (mm) {
      const p1 = +mm[1], p2 = +mm[2], by = +mm[3];
      const want = by / (p1 - p2);
      ok(Math.abs(want - Math.round(want)) < 1e-9, tag + ':exceeds-int', t);
      ok(String(Math.round(want)) === String(q.ansLabel).replace('−', '-'),
         tag + ':exceeds-d', t + ' -> ' + q.ansLabel + ' (oracle ' + want + ')');
    }
  }

  /* Ex 5.1 Q4 — the three more terms must continue the shown AP */
  if (q.topic === 'next') {
    const shown = parseSeq(q.seq);
    const got = parseSeq(q.ansLabel);
    if (shown && got && shown.length >= 2) {
      const D = sub(shown[1], shown[0]);
      const want = [1, 2, 3].map(i => add(shown[shown.length - 1], mulk(D, i)));
      ok(got.length === 3 && got.every((x, i) => eq(x, want[i])),
         tag + ':next', q.seq + ' -> ' + q.ansLabel);
    }
  }
}

/* ── run ───────────────────────────────────────────────────── */
const PARTS = ['pattern', 'formula', 'word', 'mixed'];
/* volume per part per level; CI passes a smaller number to keep the deploy quick */
const PER = Number(process.argv[2]) || 3000;
console.log('generating ' + (PARTS.length * 3 * PER).toLocaleString() + ' questions...\n');

for (const part of PARTS) {
  for (let lvl = 1; lvl <= 3; lvl++) {
    for (let i = 0; i < PER; i++) {
      let q;
      try { q = AP.genQuestion(part, lvl); }
      catch (e) { bad(part + ':throw', e.message); continue; }
      const tag = part + '/L' + lvl;
      checkShape(q, tag);
      checkMath(q, tag);
      checkNcert(q, tag);
    }
  }
}

/* every lesson's check questions must generate too */
Object.keys(AP.LESSONS).forEach(part => {
  AP.LESSONS[part].forEach(L => {
    ok(L.cards.length >= 2, 'lesson:cards', L.id + ' has ' + L.cards.length + ' cards');
    ok(L.checks.length === 3, 'lesson:checks', L.id + ' has ' + L.checks.length + ' checks');
    L.checks.forEach(t => {
      for (let i = 0; i < 150; i++) {
        let q;
        try { q = AP.genForTopic(t, L.lvl || 1); }
        catch (e) { bad('lesson:' + t + ':throw', e.message); break; }
        checkShape(q, 'lesson/' + L.id);
        checkMath(q, 'lesson/' + L.id);
        checkNcert(q, 'lesson/' + L.id);
      }
    });
    /* every lesson card must be closable HTML with no stray placeholder */
    L.cards.forEach((c, i) => {
      ok(!BAD_TEXT.test(c), 'lesson:card-text', L.id + ' card ' + (i + 1));
      ok(!/__[A-Z]+__/.test(c), 'lesson:placeholder', L.id + ' card ' + (i + 1));
    });
  });
});

/* every named topic must actually be reachable, and every reachable topic named */
(function topicCoverage() {
  const seen = new Set();
  ['pattern', 'formula', 'word'].forEach(part => {
    for (let lvl = 1; lvl <= 3; lvl++)
      for (let i = 0; i < 900; i++) seen.add(AP.genQuestion(part, lvl).topic);
  });
  Object.keys(AP.TOPICS).forEach(t =>
    ok(seen.has(t), 'topics:unreachable', t + ' is named in TOPICS but never generated'));
  seen.forEach(t =>
    ok(AP.TOPICS[t], 'topics:unnamed', t + ' is generated but missing from TOPICS'));
  seen.forEach(t =>
    ok(AP.TOPIC_PART[t], 'topics:unmapped', t + ' has no entry in TOPIC_PART'));
  /* the report card's weak-topic link must land on a lesson that teaches it,
     not on a fallback */
  Object.keys(AP.TOPIC_PART).forEach(t => {
    const part = AP.TOPIC_PART[t];
    ok(AP.LESSONS[part] && AP.LESSONS[part].length,
       'topics:nolesson', t + ' maps to part ' + part + ' which has no lessons');
    const hit = (AP.LESSONS[part] || []).some(
      L => L.checks.map(AP.topicOfCheck).indexOf(t) >= 0 || (L.also || []).indexOf(t) >= 0);
    ok(hit, 'topics:nodeeplink',
       t + ' has no lesson in part ' + part + ' listing it in checks or also');
  });
  /* every lesson's checks and also must name real topics */
  Object.keys(AP.LESSONS).forEach(part =>
    AP.LESSONS[part].forEach(L =>
      L.checks.map(AP.topicOfCheck).concat(L.also || []).forEach(t => {
        ok(AP.TOPICS[t], 'lesson:badtopic', L.id + ' references unknown topic ' + t);
        ok(AP.TOPIC_PART[t] === part, 'lesson:wrongpart',
           L.id + ' is in ' + part + ' but topic ' + t + ' belongs to ' + AP.TOPIC_PART[t]);
      })));
  /* every check key must name a generator that exists */
  Object.keys(AP.LESSONS).forEach(part =>
    AP.LESSONS[part].forEach(L =>
      L.checks.forEach(k => {
        let q = null;
        try { q = AP.genForTopic(k, L.lvl || 1); } catch (e) { }
        ok(q && q.topic === AP.topicOfCheck(k), 'lesson:checkgen',
           L.id + ' check "' + k + '" generated topic ' + (q && q.topic));
      })));
})();

/* the weekly paper must be identical for everyone, and must not leak the seed */
(function weekly() {
  const build = key => {
    AP.setRng(AP.mulberry32(AP.strHash(AP.CFG.appId + '|' + key)));
    const list = AP.buildRun('weekly', 2, AP.CFG.runLen.weekly);
    AP.setRng(Math.random);
    return list;
  };
  const sig = l => l.map(q => (q.lead || '') + '|' + (q.seq || '') + '|' + q.ansLabel +
                             '|' + (q.opts || []).map(o => o.lb).join('~')).join('#');
  const a = build('2026-W36'), b = build('2026-W36'), c = build('2026-W37');
  ok(sig(a) === sig(b), 'weekly:stable', 'same week key produced different papers');
  ok(sig(a) !== sig(c), 'weekly:distinct', 'different week keys produced the same paper');
  ok(a.length === AP.CFG.runLen.weekly, 'weekly:len', 'paper length ' + a.length);
  const x = AP.buildRun('mixed', 2, 8), y = AP.buildRun('mixed', 2, 8);
  ok(sig(x) !== sig(y), 'weekly:leak', 'normal play is deterministic — the seed leaked');
})();

/* a run must not repeat the same prompt twice */
(function noRepeats() {
  for (let i = 0; i < 200; i++) {
    const list = AP.buildRun('formula', 2, AP.CFG.runLen.formula);
    const sigs = list.map(q => (q.lead || '') + '|' + (q.seq || ''));
    ok(new Set(sigs).size === sigs.length, 'run:repeat', 'duplicate prompt inside one run');
  }
})();

/* string-built decimals, the thing floats get wrong */
(function decimals() {
  const F = AP.F;
  const cases = [[F(3, 100), '0.03'], [F(-3, 100), '−0.03'], [F(1, 8), '0.125'], [F(1, 3), null],
                 [F(27, 4), '6.75'], [F(17, 2), '8.5'], [F(2075, 100), '20.75']];
  cases.forEach(([f, want]) => {
    const got = AP.decStr(f);
    ok(got === want, 'dec', JSON.stringify(f) + ' -> ' + got + ' (want ' + want + ')');
  });
  ok(AP.moneyStr(F(17, 2)) === '8.50', 'money', 'moneyStr(17/2)=' + AP.moneyStr(F(17, 2)));
  ok(AP.moneyStr(F(5)) === '5', 'money', 'moneyStr(5)=' + AP.moneyStr(F(5)));
  ok(AP.fmt(F(-7, 9), 'frac') === '−7/9', 'frac', AP.fmt(F(-7, 9), 'frac'));
})();

/* ── report ────────────────────────────────────────────────── */
console.log('checked ' + checked.toLocaleString() + ' questions');
if (!fails.size) {
  console.log('\n✓ all clear');
  process.exit(0);
}
let total = 0;
for (const [group, list] of [...fails].sort()) {
  const n = list.length + (list.count || 0);
  total += n;
  console.log('\n✗ ' + group + '  (' + n + ')');
  list.forEach(d => console.log('    ' + d));
  if (list.count) console.log('    ... and ' + list.count + ' more');
}
console.log('\n' + total + ' failures in ' + fails.size + ' groups');
process.exit(1);
