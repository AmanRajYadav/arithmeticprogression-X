# Sidhi — Arithmetic Progression

A practice game for **Chapter 5, class 10**, built for **Fluence** from the 30–31 August class recordings and the NCERT chapter.

**Scope: everything up to and including Exercise 5.2** — Section 5.1 and 5.2 with their worked examples, Exercise 5.1 in full, and Exercise 5.2 in full. The sum of *n* terms is not in the game; it sits on the menu as a locked card until it has been taught.

Three parts, one idea: an AP is a staircase where every riser is the same height.

| Part | Book | What students practise |
| --- | --- | --- |
| **Pattern** | Exercise 5.1 | Is this an AP? What are `a` and `d`? Build the AP from `a` and `d`; write three more terms; decide whether a real situation forms an AP. |
| **a + (n − 1)d** | Exercise 5.2 | Any term, any position, number of terms, "is this number even in the AP?", the *n*th term from the end, the `a`/`d`/`n`/`aₙ` table, missing terms in the boxes, and middle terms for odd and even `n`. |
| **Exam sawaal** | Exercise 5.2 | Two terms given → find a third, find `d`, find which term is zero, determine the AP. "Exceeds by" questions, counting multiples, two APs meeting at the same term, two APs with the same `d`, and the full word problems. |

Plus a **mixed test**, a **badla (revenge) mode** that replays your own mistakes, and **is hafte ka paper** — the same 12 questions for the whole batch, changing every Monday.

Every question is generated fresh. There is no question bank, so the drills never run out and nothing can be memorised instead of learned.

### Where each NCERT question lives

| NCERT | In the game |
| --- | --- |
| Ex 5.1 Q1 — taxi, vacuum pump, well, compound interest | `situation` (plus simple interest, seats, bacteria, area — same shapes, fresh numbers) |
| Ex 5.1 Q2 — first four terms from `a` and `d` | `build`, including the `d = 0` row |
| Ex 5.1 Q3 — write `a` and `d` | `findd` |
| Ex 5.1 Q4 — which are APs, find `d`, three more terms | `isap` + `next`, including √2/√8/√18, `a, 2a, 3a`, `a, a², a³`, 0.2/0.22/0.222 |
| Ex 5.2 Q1 — fill in the table | `table` |
| Ex 5.2 Q2 — 30th term MCQ | `nth` |
| Ex 5.2 Q3 — missing terms in the boxes | `missing` |
| Ex 5.2 Q4, Q5, Q6 — which term, how many terms, is −150 a term | `findn` |
| Ex 5.2 Q7, Q8, Q9, Q16 + Example 5 | `twoterm` |
| Ex 5.2 Q10, Q11 — "exceeds by" | `exceeds` |
| Ex 5.2 Q12 — two APs, same `d` | `twoap` |
| Ex 5.2 Q13, Q14 + Example 7 — counting multiples | `countap` |
| Ex 5.2 Q15 — equal *n*th terms | `equalterm` |
| Ex 5.2 Q17 + Example 8 — *n*th term from the end | `fromend` |
| Ex 5.2 Q18 — sum of 4th and 8th | `twoeq` |
| Ex 5.2 Q19, Q20 + Example 10 — Subba Rao, Ramkali, flower bed | `apply` |
| Middle terms (board question, not in 5.2) | `mid` |
| **Ex 5.3 — sum of `n` terms** | **not in the game** — locked card on the menu |

## Playing it

**https://amanrajyadav.github.io/arithmeticprogression-X/**

Students open the link and play — nothing to install.

To run it locally instead, open `ap.html` in any browser. No build step, no server, no internet after the first load.

To keep it on the home screen like a normal app: **Android** (Chrome) → menu → *Add to Home screen*. **iPhone** (Safari) → share → *Add to Home Screen*. It then opens fullscreen and works with no signal.

On a phone the game uses its own number pad rather than the system keyboard, so the layout never jumps and the minus sign is always one tap away.

## How it works

- **Three levels per part — Easy, Medium, Hard.** Easy keeps numbers small and positive; Medium brings in negatives and bigger `n`; Hard adds fractions and decimals, and asks you to *type* the answer instead of picking one.
- **Wrong answers are the lesson.** Every distractor is a mistake that was actually made in class — `a + nd` instead of `a + (n−1)d`, `a₁ − a₂` for the common difference, "it looks patterned so it's an AP", dividing by `n` instead of `n − 1`, forgetting the plus one. A wrong answer opens a blocking card that names the specific mistake and works the problem line by line.
- **Nobody is knocked out.** No lives. A miss costs points and combo, never the round. Every round ends in a report card.
- **Badla round.** Questions you missed come back at the end of the run for +150 each, options reshuffled, no penalty for missing twice. Misses also go into a persistent bank that feeds **Badla mode** from the menu — answering that topic correctly removes it from the bank.
- **Timer is off by default.** Accuracy first, speed later; the report card offers to turn the timer on once accuracy crosses 90%. The weekly paper is always timed.
- **Report card** sorts topics weakest-first and links straight into the lesson that teaches the weakest one.
- **Share** builds a WhatsApp message with the full record — name, mode, score, accuracy, time, streak, weakest topic — addressed to Aman Sir. No backend anywhere.
- **Records** are per player, stored in the browser via `localStorage` under `fluence.ap.v1`. Siblings sharing a phone get separate profiles. Clearing site data clears records.

## Language

Hinglish teaching voice, **English mathematical vocabulary**. The game says *add karo*, *subtract karo*, *multiply*, *equal*, *find karo*, *whole number*, *common difference* — never *jodo*, *ghatao*, *guna*, *barabar*. Those are the words on the exam paper, so those are the words the game uses.

## Design

The signature image is the **staircase** the teacher drew before writing a single formula: eight steps, seven gaps. That is the entire reason the *n*th term is `a + (n − 1)d`, and it is on the title screen, in the door art and behind every explanation.

`a` and `d` are the guide's branch pair — two things a learner has to tell apart — so they are colour-coded coral and teal and keep those colours everywhere they appear, including inside the worked solutions.

The full system — colour tokens with measured contrast ratios, the three-font structure, the glass
recipe, motion curves, mobile rules and the accessibility floor — lives in Fluence's internal design
guide, which is not part of this repo.

## What is not in this repo

The game was built from a recording of the 30–31 August classes. That transcript is **not published** —
it has real children's first names in it and a good deal of conversation that was never meant to leave the
room. The NCERT chapter PDF is not published either; it is not ours to redistribute. Fluence's internal
design guide and build playbook stay out as well.

Everything needed to build, test and run the game is here.

## Files

```
ap.html               the game — generated, do not edit by hand
index.html            redirect to ap.html
ap-sw.js              offline caching
ap.webmanifest        home-screen install

_p1.html              head + the whole design system
_p2.html              markup for every screen
_p3.js                numbers (exact rationals), storage, sound, screen plumbing
_p4.js                generators: pattern + the nth-term formula
_p5.js                generators: situations, translation, word problems
_p5b.js               generators: the NCERT 5.2 question shapes
_p5c.js               which generators sit behind which door
_p6.js                lesson content, in the teacher's voice
_p7.js                the round loop, feedback, report card, wiring
_fonts.css            the three fonts, base64
build.py              splices the parts into ap.html
test-ap.js            the generator suite
```

### Editing

Edit the `_p*` parts, then:

```bash
python build.py
```

`ap.html` is generated. Anything typed directly into it is lost on the next build.

### Testing

```bash
node test-ap.js          # ~42,000 questions
node test-ap.js 600      # a lighter pass; this is what CI runs
```

It pulls the script out of `ap.html`, runs it in a `vm` with a DOM stub, and generates about 42,000 questions. For every one it checks the shape (exactly four distinct options, exactly one correct, every wrong option carries a reason, no `NaN`, no float noise, no ASCII hyphen where a real minus belongs, nothing on the number pad that the pad cannot type) — and then **recomputes the answer from what the student sees, using its own fraction arithmetic**. It never asks the game to check itself.

For the NCERT shapes the oracle goes further: it re-derives the missing table cell from the other three, rebuilds the AP from the two visible boxes, solves the two-term questions from scratch, and *brute-force counts* the multiples for the counting questions rather than using a formula. It also asserts that every topic named on the report card is reachable, that every generated topic is named, that the weekly paper is identical within a week and different across weeks, and that normal play is not deterministic afterwards.

Run it after every change to a generator. It takes a few seconds.

## What comes next

**The sum of n terms**, `Sₙ = n/2 [2a + (n − 1)d]` — Exercise 5.3, with the Gauss hook the teacher opened with: adding 1 to 500 in one line. The card is already on the menu; wiring it up means one more generator file, one more lesson, and adding the topics to the pools in `_p5c.js`.

---

**FLUENCE — Question Everything**
Instagram [@fluence.school](https://instagram.com/fluence.school) · 7771000453
