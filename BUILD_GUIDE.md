# BUILD_GUIDE.md — SchemeSahayak Phase-by-Phase Build Playbook

Give your AI coding agent **one phase prompt at a time**. Do not ask it to build the entire product in one prompt. Keep `AGENT.md`, `DESIGN.md` and this file in the repository root.

## 0. How to use this guide

For each phase:
1. Paste the initial instruction once.
2. Paste only the current phase prompt.
3. Review the plan before broad edits.
4. Run the commands yourself if the agent cannot.
5. Check the browser at required widths.
6. Fix issues before moving on.
7. Commit the working phase.

Do not accept “done” as proof. A screen that looks clickable but has no state transition is a mock, not a working prototype.

### Initial instruction to paste to the agent

```text
You are the lead frontend engineer for Gujarat SchemeSahayak.

Read AGENT.md, DESIGN.md and BUILD_GUIDE.md fully before writing code.

This is a frontend-only React + Vite + TypeScript prototype using local synthetic data. Do not create a backend, database, authentication, real uploads, real OCR, LLM integration, DigiLocker integration or application submission.

Source of truth:
- AGENT.md = product boundary, architecture, data model and engineering rules.
- DESIGN.md = visual system and interaction specification.
- PPT guide = story, differentiator, privacy stance and pitch language.

For each requested phase:
1. Inspect current code.
2. State the objective and files you expect to change.
3. Implement only that phase.
4. Run lint, typecheck, tests and build where configured.
5. Report exact files changed and actual command results.
6. List remaining limitations honestly.
7. Do not proceed to the next phase unless I ask.

Never invent scheme rules, thresholds, benefits, documents, dates, source links or impact statistics. Unverified records must be labelled demo data. Never collect real personal documents or identifiers.

Follow DESIGN.md precisely: Rann and Ajrakh palette, Anek type, Phosphor icons, ledger rows, Dot-row, no gradients, no glassmorphism, no emoji, no unnecessary shadows, mobile-first and accessible Gujarati/Hindi. No generic AI dashboard design.
```

## 1. Final product journey

Citizen journey:
```text
Welcome → Language → Consent → Profile → Results → Scheme detail
        → Synthetic sample document → Confirm fields
        → Readiness checklist → Official source/application link
```

Helper journey:
```text
Welcome → Help someone else → Three sample families
        → Open family → Results/readiness
```

Product positioning:
“Discovering a scheme is only step one. SchemeSahayak helps a person go from ‘I may qualify’ to ‘I know why, I know what evidence I need, and I am prepared to apply’, across fragmented Gujarat portals.”

Do not pitch a new chatbot/voice finder. Focus on evidence-to-criteria mapping, missing-document readiness and assisted workflows.

## 2. Scope: real vs simulated

| Feature | Prototype behaviour | Honest label |
|---|---|---|
| Profile | Functional local state | Sample persona when prefilled |
| Matching | Real deterministic TypeScript engine | Prototype rules over curated records |
| Scheme records | Local curated data | Official source/date or Demo data |
| Upload | Disabled | Real uploads disabled in prototype |
| OCR | Predefined sample fields | Simulated document reading |
| Scan | One animation | Sample scan animation |
| Voice | Browser API only if supported | Voice demo unless tested |
| DigiLocker | Not connected | Future partnership |
| Application | Official hand-off only | No auto-submission |
| Helper | Functional local synthetic records | Sample data |

No real Aadhaar, caste, bank, income or disability documents. Do not ask judges to enter personal identifiers.

## 3. Phase overview

| Phase | Deliverable | Priority |
|---|---|---|
| 0 | Repository audit | Required |
| 1 | React/Vite/TS scaffold and tooling | Required |
| 2 | Design tokens, fonts and app shell | Required |
| 3 | Routes and journey state | Required |
| 4 | Typed domain models and synthetic data | Required |
| 5 | Deterministic eligibility engine + tests | Critical |
| 6 | Welcome and consent | Required |
| 7 | Guided profile flow | Required |
| 8 | Results and scheme detail | Critical |
| 9 | Synthetic document demonstration | Required |
| 10 | Readiness checklist and official hand-off | Critical |
| 11 | Helper mode | Should have |
| 12 | i18n and accessibility audit | Required |
| 13 | Voice enhancement | Optional |
| 14 | Polish, tests, README and deployment | Required |
| 15 | Demo rehearsal | Required |

If time is short, complete 1–10 and 14 first. Helper mode next. Voice last. Never sacrifice the rules engine to add voice effects.

---

# PHASE 0 — Repository audit

**Goal:** inspect before changing anything.

```text
PHASE 0 — AUDIT ONLY.

Read AGENT.md, DESIGN.md and BUILD_GUIDE.md. Inspect the repository, package.json, source tree, installed dependencies, routes and current build status.

Do not edit or delete files.

Return:
1. Current repository state.
2. Existing stack and versions.
3. Code worth keeping.
4. Missing setup required by AGENT.md.
5. Conflicts with the required design/architecture.
6. A precise Phase 1 plan and files to create/change.
7. Commands to verify the current state.

Do not implement future phases.
```

**Exit:** know what exists; no destructive rewrite has happened.

# PHASE 1 — Project scaffold

**Goal:** Vite + React + TypeScript, Tailwind v4, strict mode, lint, typecheck, Vitest and build scripts. No product screens.

Possible commands (adapt if repo already exists):
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install tailwindcss @tailwindcss/vite
npm install -D eslint vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

**Prompt:**
```text
PHASE 1 — FRONTEND SCAFFOLD.

Implement only the scaffold required by AGENT.md:
- React + Vite + TypeScript, strict mode.
- Tailwind CSS v4 using its Vite integration (not old v3 setup).
- ESLint.
- Vitest and a working example test.
- Scripts: dev, build, preview, lint, typecheck, test.
- Minimal entry points and temporary placeholder page.
- Create only folders needed now; do not create a backend or feature screens.
- Inspect before overwriting any existing project.

Run all configured quality commands. Report exact versions and pass/fail. Do not proceed to Phase 2.
```

**Manual check:** `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.

# PHASE 2 — Design system and app shell

**Goal:** implement tokens and shared shell before feature screens.

Build:
- Tailwind v4 theme tokens exactly from DESIGN.md.
- Anek Latin/Gujarati/Devanagari fonts; verify Fontsource package names and glyphs; document fallback.
- global type scale and `--text-scale`;
- AppHeader, language switcher, text-size control;
- persistent prototype banner;
- AppShell, Button, IconButton, StatusBadge, EmptyState;
- Phosphor icons.

**Prompt:**
```text
PHASE 2 — DESIGN TOKENS AND APP SHELL.

Implement only the global visual foundation from DESIGN.md:
1. Tailwind v4 theme tokens exactly as specified.
2. Anek Latin, Gujarati and Devanagari fonts. Verify package names and glyph coverage; use documented fallback if needed.
3. Global typography and generous Indic-script line-height.
4. Three-step text-size control using --text-scale.
5. AppHeader with SchemeSahayak wordmark, language switcher and text-size control.
6. Always-visible PrototypeBanner with exact honesty copy.
7. AppShell and responsive page container.
8. Button variants, accessible IconButton, StatusBadge foundation and EmptyState.
Use Phosphor icons. Do not build feature pages. No gradients, purple, emoji, people illustrations, random shadows or raw hex values in components. Exactly follow DESIGN.md. Test 360, 390, 768, 1024 and 1280px; run quality commands and report Gujarati font issues.
```

**Manual check:** 390px side padding; desktop not stretched; no clipped Gujarati; no gradient/purple/emoji.

# PHASE 3 — Routing and journey state

**Goal:** routes and typed local state.

**Prompt:**
```text
PHASE 3 — ROUTING AND JOURNEY STATE.

Implement routes from AGENT.md:
/, /consent, /profile, /results, /schemes/:schemeId, /documents/:schemeId, /checklist/:schemeId, /helper, /helper/families/:id.

Create typed journey state for language, text scale, consent, mode, current profile, selected scheme and document confirmations. Use a small React Context/provider only if needed. No Redux/Zustand.

Persist only language, text size and synthetic demo journey state if useful. Put storage behind src/lib/storage.ts and add Start over / clear demo data. No real personal data.

Deep-link refresh must not crash. Missing journey state must show a recovery action to Welcome. Use route placeholders only; do not implement feature logic. Test state/storage helpers and run quality commands.
```

# PHASE 4 — Domain types and synthetic data

**Goal:** typed contracts and sample personas/families/schemes.

**Prompt:**
```text
PHASE 4 — DOMAIN TYPES AND SYNTHETIC DATA.

Implement the domain contracts in AGENT.md for profiles, family members, scheme records/rules, verification status, eligibility results and document readiness.

Create:
- 3 fictional personas: student, farmer, senior/widow;
- 3 fictional helper-family records;
- a small local scheme dataset with en/gu/hi display strings.

Do not invent eligibility thresholds, benefits, deadlines, required documents or links. Every verified scheme needs an official source URL, department, actual last-verified date and version. If not verified, mark it demo_placeholder / needs_review and show Demo data. Do not pretend a placeholder is official.

Prefer 6–10 accurate records over 25 fabricated ones. The PPT's 15–25 is a target for hand-verified records, not permission to invent. Add data validation/tests and a note listing what needs human verification. No screens yet.
```

**Human task:** open every official source and verify it yourself. Record the actual date. If uncertain, leave it marked demo.

# PHASE 5 — Deterministic eligibility engine

**Goal:** build the one genuinely working core before UI.

**Prompt:**
```text
PHASE 5 — DETERMINISTIC ELIGIBILITY ENGINE. CORE FEATURE.

Implement a pure TypeScript evaluator independent of React and network calls. Support eq, lte, gte, in and exists.

Rules:
- null, undefined, empty and explicit unknown => unknown, never fail;
- invalid numeric input => unknown; do not coerce arbitrary strings;
- mandatory fail => not_matching;
- no mandatory fail but mandatory unknown => possible;
- unverified/stale/ambiguous scheme => needs_verification, while still showing rule checks;
- all mandatory pass on verified data => likely;
- optional failures remain visible but do not disqualify;
- no eligibility probability and no LLM call.

Add a pure explanation helper. Write Vitest cases for every operator, all pass, mandatory fail, mandatory unknown, optional fail, null/undefined, wrong types, mixed outcomes and unverified schemes. Do not build UI yet. Run tests and show actual output.
```

**Acceptance:** change a mandatory answer and the evaluator result changes. If not, core is not done.

# PHASE 6 — Welcome and consent

**Goal:** working entry flow.

**Prompt:**
```text
PHASE 6 — WELCOME AND CONSENT.

Build only Welcome and Consent following DESIGN.md.

Welcome:
- task-first, not marketing hero;
- SchemeSahayak wordmark, language and text-size controls;
- persistent prototype banner;
- primary “Find benefits for me” and secondary “Help someone else”;
- privacy reassurance;
- sample student/farmer/senior shortcuts below fold under “For judges and testers”;
- no people illustration, stock photo, emoji or government emblem.

Consent:
- what we ask, what we do, what we never do, how to clear demo data;
- one acknowledgement checkbox;
- continue disabled until checked;
- read-aloud only if actual support exists.

Actions must update app state and navigate. Use locale keys, not scattered inline translations. Add tests for navigation and consent gating. Do not implement other screens.
```

# PHASE 7 — Guided profile

**Goal:** one-question-at-a-time profile.

Questions: district, Gujarat residence, age, occupation, student course/institution if relevant, category where relevant, annual income band including “I don't know”, disability where relevant.

**Prompt:**
```text
PHASE 7 — GUIDED PROFILE FLOW.

Build one-question-at-a-time profile screens using the typed journey state and DESIGN.md QuestionStep.

- Questions map directly to fields referenced by scheme rules.
- Ask district, residence, age, occupation, income and relevant conditional course/institution/category/disability questions.
- Do not ask irrelevant questions.
- Include I don't know wherever honest.
- Large answer rows, progress and question count, back/next.
- Back preserves answers; next validates current question.
- Add profile review/edit before matching.
- Sample persona shortcut must work.
- Voice must not pretend to listen; omit/disable it until implemented, with explanation.
- On completion save profile locally and navigate to Results, which will use the actual evaluator.

Add tests for conditional questions, answer persistence and navigation. No hard-coded result cards.
```

# PHASE 8 — Results and scheme detail

**Goal:** explainable results, not static scheme cards.

**Prompt:**
```text
PHASE 8 — RESULTS AND SCHEME DETAIL. CONNECT THE REAL ENGINE.

Results:
- evaluate every scheme against the active profile using Phase 5 evaluator;
- derive counts, never hard-code;
- All / Likely / Possibly filters; All also includes not_matching and needs_verification;
- SchemeRow shows name, department, status icon + text + colour, Dot-row, textual count, one-line reason and source/freshness or Demo data;
- selecting a row opens its detail;
- 1024px+ master-detail; mobile list then detail route.

Detail:
- matched, unknown and failed criteria grouped separately;
- actual profile value or Not provided;
- documents and where-to-get guidance;
- application steps, official source, last checked;
- local-only Report outdated info sheet must say it is not sent;
- exact department-final-decision disclaimer;
- profile edit returns to the same profile and recalculates.

Do not claim official eligibility. Do not present unverified facts as verified. Add tests proving a changed mandatory answer changes the visible result and criteria. Test mobile and desktop.
```

**Manual check:** load student persona, change income, see actual status/criteria update.

# PHASE 9 — Synthetic document demo

**Goal:** optional sample-only scan and confirmation.

**Prompt:**
```text
PHASE 9 — SYNTHETIC DOCUMENT FLOW ONLY.

Do not implement real uploads, OCR APIs, storage or document services.

- Real uploads disabled with explanation.
- “Use sample income certificate” loads bundled synthetic asset with a prominent SAMPLE watermark.
- Asset must not use government emblems, real certificate IDs, seals or real personal data.
- One scan sweep animation using DESIGN.md timing.
- Reveal predefined local sample fields (not OCR output).
- Ask “Is this correct?” with Yes, use these and Fix a value.
- Fix opens editable local fields.
- Confirmation updates document readiness.
- Show “File deleted from this session” only as sample-session messaging; no real file was uploaded.
- Never claim authenticity verification.

Respect reduced motion. Test confirmation, correction and readiness update.
```

# PHASE 10 — Readiness checklist and official hand-off

**Goal:** turn results into a preparation plan.

**Prompt:**
```text
PHASE 10 — READINESS CHECKLIST AND OFFICIAL HAND-OFF.

Build checklist from a pure buildChecklist function, selected scheme, profile and confirmed sample readiness.

- One dark readiness summary panel only.
- Ready and missing groups; status icon + text + colour; Dot-row and count.
- Missing document expands “Where to get it” steps.
- Confirmed sample is labelled “Read from sample certificate”.
- Open official portal using the URL stored in scheme data, safely in a new tab. If no verified application URL exists, link to official scheme information and label it honestly. Never invent URLs.
- Download checklist via window.print() and print stylesheet. Hide app navigation/buttons in print.
- Printed page includes product, scheme, sample profile label, ready/missing list, source, last checked and disclaimer.
- Never say application submitted or completed.

Add tests for checklist derivation and manually inspect print preview. Run quality commands.
```

# PHASE 11 — Helper mode

**Goal:** show the organisational use case without building a full admin dashboard.

**Prompt:**
```text
PHASE 11 — HELPER MODE.

Build a restrained helper workflow using three fictional sample families.

- Summary metrics computed from sample records and labelled Sample data.
- Each family row shows name, readiness Dot-row and missing-document count.
- Tap opens family results/readiness.
- Explain that helpers need beneficiary consent; all current records are fictional.
- Add family must either be a working local-only form or explicitly Planned/disabled. Never fake a save.
- No login, staff permissions, cloud sync or real export.
- Reuse ledger rows and design system. No generic analytics dashboard.
- Add tests for counts and navigation.
```

# PHASE 12 — i18n and accessibility

**Goal:** three locale coverage and accessibility audit.

**Prompt:**
```text
PHASE 12 — I18N AND ACCESSIBILITY AUDIT.

Audit and fix all implemented screens.

i18n:
- all user-facing strings in en/gu/hi locale files;
- automated missing-key check;
- update html lang on language change;
- flag Gujarati/Hindi for native-speaker review;
- Intl currency/date formatting;
- check mixed-script font fallback.

Accessibility:
- semantic header/main/nav and one h1 per screen;
- labelled controls and keyboard operation;
- visible focus outline and logical tab order;
- 48px touch targets and 56px primary actions where specified;
- accessible Dot-row and icon-only controls;
- status uses icon + text + colour;
- aria-live for result counts/transcript;
- reduced motion;
- text-size control works at Extra large.

Test 360, 390, 768, 1024, 1280px, Gujarati long strings and extra-large text. Fix issues, don't just report them. List anything needing native review.
```

# PHASE 13 — Optional voice

Do this only after the complete main journey works.

**Prompt:**
```text
PHASE 13 — OPTIONAL VOICE ENHANCEMENT.

Use browser Web Speech APIs only; no paid API or backend.
- Feature-detect SpeechRecognition / webkitSpeechRecognition.
- Map language to gu-IN, hi-IN, en-IN.
- Start only after explicit user action.
- Show transcript and require confirmation before saving.
- Tap answer remains available.
- Handle unsupported browser, denied permission and empty transcript.
- speechSynthesis read-aloud has visible stop control.
- Respect reduced motion.
- Never claim Gujarati voice works until tested on the exact demo device/browser.

Add tests for locale mapping and manual browser test instructions. If unreliable, disable it for the judging demo.
```

# PHASE 14 — Polish and deployment

**Goal:** stable public demo and clean repository.

**Prompt:**
```text
PHASE 14 — RELEASE READINESS. NO NEW FEATURES.

1. Run and fix lint, typecheck, unit tests and production build.
2. Add/complete Playwright smoke flow:
   Welcome → consent → sample student → results → detail → sample document confirm → checklist → official source.
   Also Helper → open sample family.
3. Test refresh on /results, /schemes/:id and /checklist/:id.
4. Test 360, 390, 768, 1024 and 1280px.
5. Check Gujarati long strings and Extra large text.
6. Check console and missing locale keys.
7. Configure Vercel/Netlify static deployment and SPA fallback.
8. Write README: summary, live demo, video, screenshots, setup, architecture, real-vs-simulated table, eligibility engine, privacy, source verification, limitations, roadmap and team.
9. Check no secrets, real beneficiary records or real documents are committed.
10. Include “Guidance tool. Not an official government service.”

Do not claim deployment succeeded until the actual URL is opened and tested. Return pass/fail release checklist.
```

# PHASE 15 — Demo rehearsal

## 90-second demo

**0–10s — Problem:** “Finding a scheme is only the first step. People still need to understand criteria, gather evidence and find the correct application portal. SchemeSahayak focuses on that last mile.”

**10–25s — Profile:** choose language and sample student. “These are sample answers. Matching is performed by our local deterministic rules engine.”

**25–45s — Why it fits:** open a scheme; show matched, unknown and failed criteria, plus source/freshness. “We explain the result; we do not claim official eligibility.”

**45–65s — Document readiness:** use synthetic certificate, show sample label, scan animation, fields and confirmation. “Real uploads are disabled. This is simulated document reading using fictional data.”

**65–80s — Checklist:** show ready/missing and where-to-get guidance; open official source. “We prepare the user for the official portal; we do not replace it.”

**80–90s — Helper mode:** show sample families. “This demonstrates how a CSC/e-Gram/NGO worker could assist multiple families with consent.”

## 3-minute pitch
- 20s problem and differentiated readiness layer;
- 30s profile/family context;
- 40s results and rule explanations;
- 35s sample document;
- 25s checklist and official hand-off;
- 20s helper mode;
- 10s privacy and limits.

Record a 60–90 second backup video. Do not depend on microphone or external portal availability. If a portal is down, show its stored official URL and say it is temporarily unavailable.

## Final checklist

**Product**
- [ ] Complete citizen journey works.
- [ ] Helper mode works with fictional records.
- [ ] Rules engine is deterministic and tested.
- [ ] Matched/unknown/failed criteria visible.
- [ ] Sample confirmation updates checklist.
- [ ] Official source/application link opens.
- [ ] Simulations are labelled.

**Design**
- [ ] Follows DESIGN.md.
- [ ] No gradients, purple, emoji, glassmorphism or random shadows.
- [ ] Gujarati renders correctly.
- [ ] One primary action per view.
- [ ] 360/390/768/1024/1280 responsive checks pass.

**Trust**
- [ ] No real documents or identifiers.
- [ ] No AI eligibility decision.
- [ ] No authenticity verification claim.
- [ ] No auto-submission or DigiLocker claim.
- [ ] Department final-decision disclaimer visible.

**Engineering**
- [ ] lint, typecheck, test and build pass.
- [ ] Deep links refresh.
- [ ] No console errors or secrets.
- [ ] README, public repo and deployed URL work.

## Correction prompt if the agent drifts

```text
STOP. Your implementation has drifted from AGENT.md and DESIGN.md.

Re-read both files. List mismatches in visual tokens, typography, layout, forbidden styling, product scope, frontend-only boundary, scheme accuracy, simulated-vs-real labels, accessibility and responsive behaviour.

Do not add features. Give me a minimal correction plan, then fix only those mismatches. Run relevant checks and report actual results.
```

## Correction prompt if the agent builds a static mock

```text
This is a visual mock, not a working prototype. Audit every visible button, input, filter, row, toggle, checkbox, sample-document action and navigation link.

For each control, identify the state it reads/updates and implement the actual transition. Add tests for critical behaviour.

Changing a mandatory profile answer must change the deterministic evaluation. Confirming the sample document must update readiness. The official link must open the exact URL in scheme data. Do not fake success with a toast when state did not change. Do not add backend services.
```
