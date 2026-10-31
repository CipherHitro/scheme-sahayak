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

Never invent scheme rules, thresholds, benefits, documents, dates, source links or impact statistics. All user-facing strings must use typed locale keys from the start; never hard-code visible text in components. The field registry in src/domain/profile.fields.ts is the single source for profile questions, rule validation and the evaluator. Unverified records must be labelled demo data. Never collect real personal documents or identifiers.

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
| **4R** | **Domain retrofit** (only if Phase 4 was built from the older types) | Required if applicable |
| **4H** | **Human task: choose and verify 6–10 schemes** (runs in parallel, blocks Phase 8) | Critical |
| 5 | Deterministic eligibility engine + tests | Critical |
| 6 | Welcome and consent | Required |
| 7 | Guided profile flow | Required |
| 8A | Results list, Dot-row and master-detail | Critical |
| 8B | Scheme detail | Critical |
| 8C | Family lens (per-member results) | Should have |
| 9 | Synthetic document demonstration | Required |
| 10 | Readiness checklist and official hand-off | Critical |
| 11 | Helper mode | Should have |
| 12 | i18n and accessibility audit | Required |
| 13 | Voice enhancement | Optional |
| 14 | Polish, tests, README and deployment | Required |
| 15 | Demo rehearsal | Required |

If time is short, complete 1–10 and 14 first. Then 8C and 11. Voice last. Never sacrifice the rules engine or the verified data to add effects.

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

**Goal:** typed contracts, field registry and sample personas, families and schemes (AGENT.md sections 7 and 17).

**Prompt (fresh build):**
```text
PHASE 4 — DOMAIN TYPES, FIELD REGISTRY AND SYNTHETIC DATA.

Implement AGENT.md section 7 exactly: PersonFacts, HouseholdFacts, FamilyMember, BeneficiaryProfile, EvaluationSubject, RuleField, SchemeRule, DocumentTypeId, DocumentCatalogEntry, SchemeDocumentRequirement, SampleDocument, SchemeRecord, evaluation result types.

Create:
- src/domain/profile.fields.ts: the PROFILE_FIELDS registry, plus income band ranges as one constant.
- src/data/documentCatalog.ts: canonical document types with en/gu/hi names.
- 3 fictional personas (student, farmer, senior/widow), each with 0-2 fictional family members.
- 3 fictional helper families.
- A small scheme dataset (6-10 records). Records not yet human-verified must be demo_placeholder or needs_review.
- Zod validation at the data boundary: every rule's field/operator/value must be compatible with the registry; every scheme must have at least one mandatory rule; every language key present; applicationUrl is null or a real https URL; lastVerifiedAt is null unless status is verified.
- docs/DATA_VERIFICATION.md listing every record and what a human must verify.

Do not invent eligibility thresholds, benefits, deadlines, documents, where-to-get steps or links. Placeholder values must be obviously generic and flagged Demo data. No screens, no engine. Add tests for validation. Run all quality commands.
```

## PHASE 4R — Domain retrofit (one-shot)

Use this if you already built Phase 4 from the earlier types. Paste it once, review the audit and the diff, run the checks, commit.

```text
PHASE 4R — DOMAIN RETROFIT. PHASES 0-4 ARE ALREADY BUILT. DO NOT BUILD THE ENGINE, ANY SCREEN OR ANY LATER PHASE.

Re-read the revised AGENT.md (sections 4, 5, 6, 7, 8, 17). Update the existing code to match it without changing any visual design.

STEP 0 - AUDIT (print a short summary first, then continue without waiting):
List the current domain types, data files, journey state shape, storage keys, i18n setup, scripts and tests, and every difference from the revised AGENT.md section 7.

STEP 1 - TYPES AND REGISTRY
- Replace the profile/scheme/document types with AGENT.md section 7: PersonFacts, HouseholdFacts, FamilyMember, BeneficiaryProfile, EvaluationSubject, RuleField (restricted union, never id/displayName/familyMembers), LocalisedText, DocumentTypeId, SchemeDocumentRequirement (documentTypeId, whereToGet, issuingAuthority), SampleDocument, SchemeRecord (beneficiaryScope, applicationUrl nullable), SchemeEvaluation (subjectId, dataStatus, reasonCode).
- Create src/domain/profile.fields.ts with the PROFILE_FIELDS registry (scope, kind, allowedValues, unknown value) and one INCOME_BAND_RANGES constant: under_1l [0,100000], 1l_2_5l (100000,250000], 2_5l_5l (250000,500000], above_5l (500000,infinity).
- Create src/domain/subject.ts with a pure buildSubject(profile, memberId?) that merges household facts with the chosen person's facts and returns an EvaluationSubject. Add tests.

STEP 2 - DATA MIGRATION
- Create src/data/documentCatalog.ts (canonical documents with en/gu/hi names). Only include document types the current schemes actually use plus income_certificate and marksheet (needed for the sample documents).
- Migrate existing personas, helper families and schemes to the new shapes. Replace free-text course/institution with the educationLevel/institutionType enums. Add gender, maritalStatus, ownsAgriculturalLand and rationCardType to personas (values must make sense for student, farmer and widow personas; use "unknown" where not needed).
- Change any numeric income rule to field annualHouseholdIncome with a numeric limit (band semantics are applied later by the engine).
- Do NOT invent or alter any threshold, benefit, document, date or URL. Keep existing values; mark records demo_placeholder or needs_review unless a human verification note already exists. Where a record used a field that is now not allowed, flag it in docs/DATA_VERIFICATION.md instead of guessing.
- Add Zod validation at the data boundary (field/operator/value compatible with the registry; at least one mandatory rule per scheme; all three languages present; applicationUrl null or https; lastVerifiedAt null unless verified). Make the app fail loudly in dev/test on invalid data.
- Create or update docs/DATA_VERIFICATION.md: one row per scheme with source URL, status, what a human must verify, and open questions.

STEP 3 - JOURNEY STATE AND STORAGE
- Add activeSubjectId (default primary applicant) and document readiness keyed by canonical documentTypeId to the typed journey state.
- Add a storage schema version. If persisted state is old, invalid or corrupt, discard it silently and start clean. Add tests for this.

STEP 4 - I18N CHECK
- If typed locale infrastructure exists, keep it. If not, create the in-house typed t(key, params?) over en.json/gu.json/hi.json described in AGENT.md section 4 and move any hard-coded visible strings from Phases 2-3 into locale keys. Gujarati and Hindi strings stay flagged needs_review.
- Add a test that fails when gu.json or hi.json lacks a key present in en.json.

STEP 5 - VERIFY
Run lint, typecheck, test and build. Fix everything. Report: files changed, exact command results, any records you could not migrate without guessing, and remaining limitations. Do not proceed to Phase 5.
```

## PHASE 4H — Human task: choose and verify the schemes

This phase cannot be delegated to an agent. Do it in parallel with the build, and finish it before Phase 8.

1. Pick 6–10 schemes that fit the three personas (student, farmer, senior/widow). Aim for at least **3 human-verified**.
2. For each, open the official page. Copy the eligibility criteria, documents, steps, URLs and the date you checked.
3. Paste the official text into the agent with this prompt:

```text
SCHEME INTAKE. Convert ONLY the official text below into one SchemeRecord following AGENT.md section 7.

Rules:
- Use only facts stated in the text. For anything not stated use null or omit the field and list it under "Open questions".
- Never fill gaps from memory. Never invent thresholds, amounts, documents, dates or URLs.
- Express criteria using only the fields and operators in the registry. If a criterion cannot be expressed, do not force it: list it under "Not expressible".
- Set verification.status to "needs_review" and reviewer to null. A human will upgrade it to "verified" after re-reading the record against the source.
- Provide Gujarati and Hindi names only if they appear in the source; otherwise copy the English text and flag it needs_review.

Official source URL: <paste>
Date I opened it: <YYYY-MM-DD>
Official text:
<paste>
```
4. Re-read each generated record against the source. Only then set `status: "verified"`, your name as `reviewer` and the real `lastVerifiedAt`.
5. Update `docs/DATA_VERIFICATION.md`.

# PHASE 5 — Deterministic eligibility engine

**Goal:** build the one genuinely working core before UI.

**Prompt:**
```text
PHASE 5 — DETERMINISTIC ELIGIBILITY ENGINE. CORE FEATURE.

Implement AGENT.md section 8 exactly, as pure TypeScript independent of React and network calls:
- evaluateScheme(scheme, subject, now), evaluateAll(schemes, subject, now), and a pure sortEvaluations (likely, possible, needs_verification, not_matching; then more passed rules first; then name).
- Operators eq, lte, gte, in, exists.
- Income band semantics from AGENT.md 7.2 / 8: a numeric limit inside a band yields unknown with reasonCode "straddles_band".
- null, undefined, empty and explicit "unknown" => unknown, never fail. Invalid numeric input => unknown; do not coerce arbitrary strings.
- Mandatory fail => not_matching; mandatory unknown => possible; all mandatory pass => likely.
- needs_verification only when verification.status is needs_review, or status is verified and lastVerifiedAt is missing, in the future or older than STALE_AFTER_DAYS (one config constant, 180). demo_placeholder records evaluate normally and carry dataStatus "demo_placeholder".
- Optional failures stay visible but never disqualify. Rule checks are always returned.
- `now` is injected. No Date.now() or new Date() inside the evaluator.
- No eligibility probability, no LLM call.

Add a pure explainEvaluation(evaluation, scheme, language) helper that returns plain-language text built from locale keys, including the "confirm with your income certificate" message for straddling bands.

Write Vitest tests for: every operator; income band boundaries (limit equal to a band edge, inside a band, above all bands, unknown band); all pass; mandatory fail; mandatory unknown; optional fail; null/undefined; wrong types; mixed outcomes; needs_review; stale and future lastVerifiedAt; demo_placeholder; buildSubject for primary and for a family member; determinism (same input, same output). Do not build UI. Run tests and show actual output.
```

**Acceptance:** change one mandatory answer and the evaluator result changes. If not, the core is not done.

# PHASE 6 — Welcome and consent

**Goal:** working entry flow.

**Prompt:**
```text
PHASE 6 — WELCOME AND CONSENT.

Build only Welcome and Consent following DESIGN.md and AGENT.md section 9.

Welcome:
- task-first, not a marketing hero;
- SchemeSahayak wordmark, language and text-size controls;
- persistent prototype banner;
- primary "Find benefits for me" and secondary "Help someone else";
- a visible ghost button "Try a sample" directly under the actions that opens the three sample personas (student, farmer, senior/widow) without scrolling; the same list may repeat below the fold under "For judges and testers";
- privacy reassurance line;
- no people illustration, stock photo, emoji or government emblem.

Consent:
- what we ask, what we do, what we never do, how to clear demo data;
- one acknowledgement checkbox; continue disabled until checked;
- read-aloud only if actual support exists.

Choosing a sample persona loads it into journey state and goes to consent, then straight to results (the profile review is still reachable).
Actions must update state and navigate. All strings via locale keys. Add tests for navigation, persona loading and consent gating. Do not implement other screens.
```

# PHASE 7 — Guided profile

**Goal:** one-question-at-a-time profile, generated from the field registry.

**Prompt:**
```text
PHASE 7 — GUIDED PROFILE FLOW.

Build one-question-at-a-time screens using the typed journey state and DESIGN.md QuestionStep.

- Questions come from PROFILE_FIELDS plus a QUESTION_DEFS table (field, answer options with locale keys, optional askWhen(profile) condition). Do not hand-code each screen.
- Ask a question ONLY if at least one loaded scheme rule references that field (derive the relevant field set from the scheme data) and its askWhen condition holds (for example education level only for students; agricultural land only for farmers; marital status only if a loaded scheme rule uses it).
- Include "I don't know" wherever honest; it stores the registry's unknown value.
- Large answer rows, progress bar and "Question n of N" (N recomputed when conditional questions appear), back/next. Back preserves answers; next validates the current question.
- Profile review/edit screen before matching, with an edit link per row.
- Sample persona shortcut works and uses the same evaluator path as manual entry.
- Optional "Add a family member" at the review step that reuses the person-facts questions (only if Phase 8C is planned; otherwise omit).
- Voice must not pretend to listen; disable it with a one-line explanation until implemented.
- On completion save the profile locally and navigate to Results. No hard-coded result cards.

Add tests for conditional questions, N recomputation, answer persistence and navigation.
```

# PHASE 8A — Results list, Dot-row and master-detail

**Goal:** explainable results from the real engine.

**Prompt:**
```text
PHASE 8A — RESULTS. CONNECT THE REAL ENGINE.

- Evaluate every scheme for the active subject with evaluateAll and sortEvaluations. Derive counts; never hard-code.
- Build DotRow (src/components/domain) exactly as DESIGN.md 7.1: filled circle (met), half-filled ring (unknown), dashed ring (does not match); shapes plus colour; text count beside it; aria-label summarising counts; dots aria-hidden. Unit-test the label and counts.
- Build final StatusBadge (icon + text + colour for the four states) and SchemeRow (ledger row, one tap target).
- Each row shows: name, department, status badge, DotRow with count, one-line reason from explainEvaluation, and either "Checked on <date>" or the Demo data tag (or Needs checking).
- Filters All / Likely / Possibly (All includes not_matching and needs_verification). Counts computed from results; aria-live for the result count.
- The one orchestrated motion: dots fill in sequence the first time results appear (DESIGN.md section 9), once per load, disabled under reduced motion.
- 1024px+ master-detail (list left, detail pane right); on mobile a row opens the detail route.
- Empty and error states per DESIGN.md.

Add tests proving that changing a mandatory profile answer changes the visible status, counts and Dot-row label. Check 360, 390, 768, 1024, 1280px and Gujarati long strings.
```

**Manual check:** load the student persona, change income, watch status and counts change.

# PHASE 8B — Scheme detail

**Prompt:**
```text
PHASE 8B — SCHEME DETAIL.

- Header: name, department, StatusBadge, DotRow and count.
- Criteria in three groups: "What matches", "We need to confirm", "What does not match". Each row shows the criterion label, the actual profile value (formatted) or "Not provided", and the explanation (including the straddling-income message).
- Documents from the document catalog with have/missing state from journey readiness (DocumentRow), expandable "Where to get it" using whereToGet only; if absent show "Ask the issuing office".
- Application steps, official source link, "Checked on <date>" or Demo data with the note "These rules are for demonstration and are not official."
- Local-only "Report outdated information" sheet that states clearly it is not sent anywhere.
- Exact disclaimer: "This is guidance. The department makes the final decision."
- "Edit my answers" returns to the profile review and recalculates on return.
- Sticky primary action "See my checklist".
- Never present unverified facts as verified. External links open safely (target="_blank", rel="noreferrer").

Add tests for grouping, "Not provided", demo/needs-check labelling and recalculation after editing.
```

# PHASE 8C — Family lens (should have)

**Prompt:**
```text
PHASE 8C — FAMILY LENS.

If the active profile has family members, add a SubjectSwitcher above Results ("For: <names>").
- individual schemes are evaluated per member using buildSubject; household schemes are evaluated once for the primary applicant.
- Each row states who it may fit. Switching subject recomputes everything from source state; no duplicated result state.
- Document readiness stays keyed by canonical documentTypeId for the household.
- If there are no family members, hide the switcher.
- Reuse the same engine, rows and detail screens. Helper-family records plug into the same path in Phase 11.

Add tests: member-specific results differ from the primary's; household schemes appear once; switching subject updates counts.
```
If you skip 8C, change the pitch wording from "family context" to "household context".

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
- Confirmation updates readiness for the canonical documentTypeId, so every scheme that requires that document reflects it.
- Show “File deleted from this session” only as sample-session messaging; no real file was uploaded.
- Never claim authenticity verification.

Respect reduced motion. Test confirmation, correction and readiness update.
```

# PHASE 10 — Readiness checklist and official hand-off

**Goal:** turn results into a preparation plan.

**Prompt:**
```text
PHASE 10 — READINESS CHECKLIST AND OFFICIAL HAND-OFF.

Build checklist from a pure buildChecklist function, selected scheme, active subject and readiness keyed by canonical documentTypeId. Where-to-get steps come only from the scheme record; otherwise show "Ask the issuing office".

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
- [ ] At least 3 schemes are human-verified with real dates; every other record shows Demo data or Needs checking.
- [ ] docs/DATA_VERIFICATION.md is complete and honest.
- [ ] Missing-locale-key test passes; no hard-coded visible strings.
- [ ] Old or corrupt persisted state does not crash the app.

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

## Correction prompt if the agent invents scheme data

```text
STOP. Some scheme facts may have been invented.

List every scheme record field you populated (thresholds, benefits, documents, steps, URLs, dates, Gujarati and Hindi names) and, for each, the exact official source text it came from. For anything without a source: set it to null or remove it, change the record to demo_placeholder or needs_review, and add it to docs/DATA_VERIFICATION.md. Do not add new schemes. Do not fill gaps from memory. Run validation and tests and report actual results.
```
