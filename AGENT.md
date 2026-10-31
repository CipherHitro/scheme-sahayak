# AGENT.md — SchemeSahayak Frontend Prototype

> Read this file and `DESIGN.md` fully before editing. `DESIGN.md` governs visual design; this file governs product scope, architecture, data contracts and engineering quality. The PPT guide governs the story and pitch claims.

## 1. Product definition

**Gujarat SchemeSahayak** — “From ‘I may qualify’ to ‘I’m ready to apply’.”

A mobile-first, frontend-only prototype that helps a person understand which government benefits may fit, why, what evidence is needed, what is missing, and where to continue on the official portal.

The product complements government platforms; it is not an official government service, does not make official eligibility decisions, and does not submit applications.

### Product pillars
1. **Understand:** short, accessible questions in Gujarati, Hindi or English.
2. **Match:** structured, deterministic scheme rules evaluate a profile.
3. **Prepare:** evidence-to-criteria explanation and personalised document checklist.
4. **Hand off:** official source/application link and preparation plan.

### Actual differentiation
Do not pitch this as the first AI scheme finder, first voice assistant, or a replacement for myScheme. Your PPT correctly recognises that myScheme already offers discovery, eligibility and voice/multilingual capabilities, while Gujarat AI Stack advertises a Scheme Checker and Gujarati speech/OCR. Focus on the readiness layer:
- family/member context;
- criteria-level matched / unknown / not-matching explanation;
- personalised missing-document plan and where-to-get guidance;
- assisted workflow for CSC/e-Gram/NGO/family helpers;
- source freshness and verification metadata.

Claim "family/member context" in the pitch **only if** the Family lens (BUILD_GUIDE Phase 8C) is implemented and works. Otherwise say "household context" or drop the claim.

Use “not evident in our review” for competitor gaps unless you have personally verified the absence.

## 2. Prototype scope: frontend only

Do not create a backend, database server, authentication, API service, LLM call, cloud storage, real OCR, real upload, DigiLocker integration, or application submission.

### Functional in this prototype
- React navigation and complete user journey.
- Synthetic personas and local sample data.
- A real deterministic TypeScript eligibility engine running in the browser.
- Results derived from the engine, not hard-coded cards.
- Criteria explanation and source metadata.
- Local document-readiness updates after user confirmation.
- Printable checklist using browser print.
- Helper mode using synthetic beneficiary records.
- EN/GU/HI language switching to the extent translated and reviewed.

### Simulated — label honestly
- All beneficiaries and family data.
- Sample certificates and extracted fields.
- Scan animation and OCR-like field extraction.
- Voice, if scripted or not supported on the demo device.
- Scheme records marked `demo_placeholder` or `needs_review`.

Always display: **“Prototype: sample data and simulated document reading.”**
Always display the disclaimer: **“This is guidance. The department makes the final decision.”**

### Never implement or claim
- Real Aadhaar, caste, income, bank, disability or other personal document collection.
- OTP, password, PIN or DigiLocker credential collection.
- AI deciding eligibility.
- Certificate authenticity verification.
- Automatic application submission or status retrieval.
- DigiLocker integration.
- Guaranteed eligibility, approval, benefit receipt or improved approval rates.
- Fake statistics, testimonials, partners, government emblems or official-looking branding.

Real uploads must be disabled in v1. Use only bundled synthetic sample documents with a clear SAMPLE label.

## 3. Source-of-truth order

1. `DESIGN.md`: palette, typography, layout, components, motion, accessibility and screen wireframes.
2. `AGENT.md`: scope, architecture, engineering and data rules.
3. PPT guide: product story, differentiator, journey, privacy stance, demo and pitch language.
4. Existing code only if it complies.

Do not silently change these decisions. If a requirement conflicts or is impossible, explain the conflict and propose the smallest compliant adjustment.

## 4. Required stack

| Concern | Choice |
|---|---|
| Frontend | React + Vite + TypeScript |
| CSS | Tailwind CSS v4 |
| Routing | `react-router-dom` (or `react-router` v7; pick one and use it consistently) |
| Icons | `@phosphor-icons/react` |
| Motion | `motion` imported from `motion/react` |
| Class helpers | `clsx`, `tailwind-merge`, `class-variance-authority` |
| Accessible primitives | Radix UI packages only where useful |
| Validation | `zod` for data boundaries |
| Tests | Vitest, React Testing Library, user-event |
| Optional browser tests | Playwright |
| Print checklist | `window.print()` + print CSS |
| Fonts | Anek Latin/Gujarati/Devanagari via Fontsource; verify package names and glyph coverage |
| i18n | Typed in-house dictionary: `t(key, params?)` over `en.json`, `gu.json`, `hi.json`. No i18n library unless pluralisation is genuinely needed. A test must fail when `gu`/`hi` miss a key present in `en` |
| Runtime network | None. Fonts and sample documents are bundled. No CDN, analytics, tracking or third-party scripts |

Use React state/context; no Redux/Zustand. Do not install a large component framework. No Material UI, Bootstrap, Chakra, Ant Design, default shadcn theme, `lucide-react`, emoji icons or generic dashboard template. Explain any dependency before adding it. Prefer the platform when it is sufficient.

## 5. Required project structure

```text
scheme-sahayak/
├── AGENT.md
├── DESIGN.md
├── BUILD_GUIDE.md
├── README.md
├── package.json
├── index.html
├── public/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── samples/
│       ├── sample-income-certificate.svg
│       └── sample-marksheet.svg
├── src/
│   ├── app/                 # App, router, providers
│   ├── assets/
│   ├── components/
│   │   ├── ui/              # Button, Sheet, ProgressBar, controls
│   │   ├── domain/          # StatusBadge, DotRow, SchemeRow, DocumentRow
│   │   └── layout/          # AppShell, AppHeader, BottomActionBar
│   ├── data/                # schemes, personas, helperFamilies, sampleDocuments, documentCatalog
│   ├── domain/
│   │   ├── scheme.types.ts
│   │   ├── profile.types.ts
│   │   ├── profile.fields.ts   # field registry: ONE source for questions, rule validation and the engine
│   │   ├── document.types.ts
│   │   ├── eligibility/     # pure evaluator, explanation, tests
│   │   └── readiness/       # checklist builder and tests
│   ├── features/
│   │   ├── welcome/
│   │   ├── consent/
│   │   ├── profile/
│   │   ├── results/
│   │   ├── scheme-detail/
│   │   ├── documents/
│   │   ├── checklist/
│   │   └── helper/
│   ├── i18n/                # index.ts, en.json, gu.json, hi.json
│   ├── hooks/               # optional speech hooks
│   ├── lib/                 # formatters, storage, utils
│   ├── styles/               # index.css, print.css
│   ├── test/
│   └── main.tsx
└── e2e/
```

Create folders incrementally; do not create dozens of empty files. Feature-specific components stay inside their feature folder unless reused elsewhere.

## 6. Architecture and routes

```text
React Router
  └── AppShell (header, language, text size, prototype banner)
       └── Feature pages
            └── Pure domain functions
                 ├── eligibility evaluator
                 ├── checklist builder
                 └── formatters
                      └── Local typed scheme/persona/sample data
```

No API server. Data is local.

Routes:
```text
/                         Welcome
/consent                  Consent
/profile                  Guided profile
/results                  Scheme results
/schemes/:schemeId        Scheme detail
/documents/:schemeId      Synthetic document demo
/checklist/:schemeId      Readiness checklist
/helper                   Helper mode
/helper/families/:id      Sample family detail
```

Global state: language, text scale, consent, mode. Journey state: active profile, active subject (the person being evaluated, default the primary applicant), selected scheme, document confirmations keyed by canonical `documentTypeId`. Local state: filter, open accordion, scan state. Derived results and counts must be computed from source state, never duplicated.

Persist only language/text size and synthetic demo journey state if needed. Put storage behind `src/lib/storage.ts`. Persisted state carries a schema version; incompatible or corrupt persisted state is discarded silently and never crashes the app. Add “Start over / clear demo data.” Do not store real personal data. Deep links and refreshes must recover gracefully if journey state is absent.

## 7. Typed data contracts

Use strict TypeScript; avoid `any`.

```ts
export type Language = "en" | "gu" | "hi";
export type LocalisedText = Record<Language, string>;

// ---- Profile facts (candidate vocabulary: REMOVE any field no verified scheme uses, ADD what verified schemes need) ----
export type IncomeBand = "under_1l" | "1l_2_5l" | "2_5l_5l" | "above_5l" | "unknown";
export type YesNoUnknown = "yes" | "no" | "unknown";
export type Gender = "female" | "male" | "other" | "unknown";
export type MaritalStatus = "single" | "married" | "widowed" | "divorced_or_separated" | "unknown";
export type Occupation =
  | "student" | "farmer" | "self_employed" | "salaried" | "unemployed"
  | "homemaker" | "retired_or_senior" | "other" | "unknown";
export type EducationLevel =
  | "below_class_8" | "class_8_to_10" | "class_11_12" | "diploma_or_iti"
  | "undergraduate" | "postgraduate" | "other" | "unknown";
export type InstitutionType = "government" | "government_aided" | "private" | "not_applicable" | "unknown";
export type SocialCategory = "general" | "sc" | "st" | "sebc" | "ews" | "other" | "unknown";
export type RationCardType = "aay" | "bpl" | "apl" | "none" | "unknown"; // verify against official Gujarat categories

export interface PersonFacts {
  age: number | null;
  gender: Gender;
  maritalStatus: MaritalStatus;
  occupation: Occupation;
  educationLevel: EducationLevel;
  institutionType: InstitutionType;
  disability: YesNoUnknown;
}
export interface HouseholdFacts {
  district: string | null; // optional; only used if a verified scheme needs it
  residenceState: "Gujarat" | "Other" | "unknown";
  category: SocialCategory;
  annualHouseholdIncome: IncomeBand;
  ownsAgriculturalLand: YesNoUnknown;
  rationCardType: RationCardType;
}
export interface FamilyMember extends PersonFacts {
  id: string;
  displayName: string; // fictional demo name only
  relationship: "self" | "spouse" | "child" | "parent" | "sibling" | "other";
}
export interface BeneficiaryProfile extends PersonFacts, HouseholdFacts {
  id: string;
  displayName: string; // fictional demo name only
  isSynthetic: true;
  familyMembers: FamilyMember[]; // may be empty
}
/** What the engine evaluates: one person's facts merged with household facts. */
export type EvaluationSubject = PersonFacts & HouseholdFacts & { subjectId: string; displayName: string };

// ---- Rules ----
export type RuleField = keyof PersonFacts | keyof HouseholdFacts;  // never "id", "displayName" or "familyMembers"
export type RuleOperator = "eq" | "lte" | "gte" | "in" | "exists";
export interface SchemeRule {
  id: string;
  field: RuleField;
  operator: RuleOperator;
  value?: string | number | string[];
  mandatory: boolean;
  label: LocalisedText;
  explanation?: LocalisedText;
}

// ---- Documents ----
export type DocumentTypeId =
  | "income_certificate" | "marksheet" | "caste_certificate" | "bonafide_certificate"
  | "domicile_certificate" | "disability_certificate" | "ration_card"
  | "land_record_7_12" | "bank_passbook" | "identity_proof"; // candidate list; trim to what verified schemes need
// "identity_proof" is only ever listed as "bring it". It is never extracted, simulated or stored.
export interface DocumentCatalogEntry { id: DocumentTypeId; name: LocalisedText; }
export interface SchemeDocumentRequirement {
  documentTypeId: DocumentTypeId;   // canonical id: confirming it once updates every scheme that needs it
  required: boolean;
  helpText: LocalisedText;
  whereToGet?: Record<Language, string[]>; // ordered steps; ONLY from official sources, else omit
  issuingAuthority?: LocalisedText;
}
export type DocumentStatus = "ready" | "missing" | "unknown";
export interface DocumentReadiness {
  documentTypeId: DocumentTypeId;
  status: DocumentStatus;
  source: "profile" | "synthetic_sample" | "user_confirmed" | "not_provided";
}
export interface SampleDocument {
  id: string;
  documentTypeId: DocumentTypeId;
  assetPath: string; // bundled synthetic SVG with SAMPLE watermark
  fields: { key: string; label: LocalisedText; value: string }[]; // predefined, not OCR output
}

// ---- Schemes ----
export type VerificationStatus = "verified" | "needs_review" | "demo_placeholder";
export interface SchemeRecord {
  id: string;
  name: LocalisedText;
  department: LocalisedText;
  summary: LocalisedText;
  benefitDescription: LocalisedText;
  beneficiaryScope: "individual" | "household"; // individual = evaluated per family member; household = evaluated once
  rules: SchemeRule[];                          // must contain at least one mandatory rule
  requiredDocuments: SchemeDocumentRequirement[];
  applicationSteps: Record<Language, string[]>;
  applicationUrl: string | null;                // null if no verified application URL exists; never invent one
  sourceUrl: string;                            // official information page
  lastVerifiedAt: string | null;                // ISO date, set only by a human who actually opened the source
  version: string;
  verification: { status: VerificationStatus; reviewer: string | null; note?: string };
}

// ---- Results ----
export type EligibilityState = "likely" | "possible" | "not_matching" | "needs_verification";
export type CheckResult = "pass" | "fail" | "unknown";
export interface RuleEvaluation {
  ruleId: string; field: RuleField; result: CheckResult;
  actualValue: unknown; expectedValue: unknown; mandatory: boolean;
  reasonCode?: "straddles_band" | "missing_value" | "invalid_value";
}
export interface SchemeEvaluation {
  schemeId: string; subjectId: string; state: EligibilityState; checks: RuleEvaluation[];
  passedCount: number; unknownCount: number; failedCount: number; totalCount: number;
  dataStatus: VerificationStatus; // UI shows "Demo data" when demo_placeholder
  explanation: string;
}
```

These are data shapes, not permission to invent scheme rules. Do not fabricate thresholds, benefits, deadlines, documents or links. Each genuinely verified record needs an official source, department, actual last-verified date and version. Unverified records must be marked `demo_placeholder` / `needs_review` in the UI. Better to show 6–10 accurate records than a large fake catalogue. The PPT's 15–25 verified schemes is a target, not a licence to invent data.

### 7.1 Field registry (single source of truth)

`src/domain/profile.fields.ts` exports `PROFILE_FIELDS: Record<RuleField, { scope: "person" | "household"; kind: "number" | "enum" | "incomeBand"; allowedValues?: readonly string[]; unknown: string | null }>`.
The same registry drives (a) Zod validation that every rule's `field`, `operator` and `value` are compatible, (b) the profile questions, and (c) the evaluator. Adding a profile fact means editing the registry, not three places.

**Profile fields are derived from verified schemes, not guessed.** Ask a question only if at least one loaded scheme rule references that field. If a verified scheme needs a fact the model lacks (for example gender or marital status for a widow pension), add it to the types and registry first.

### 7.2 Income bands

Bands are half-open ranges in rupees. Keep them in one constant used by the evaluator and the formatters:
`under_1l = [0, 100000]`, `1l_2_5l = (100000, 250000]`, `2_5l_5l = (250000, 500000]`, `above_5l = (500000, ∞)`.
A scheme income limit is stored as a **number** on a rule with field `annualHouseholdIncome` and operator `lte` or `gte`. The evaluator applies the band semantics in section 8, so a limit that falls inside a band yields `unknown`, not a guess.

## 8. Eligibility engine — must genuinely work

Implement a pure TypeScript evaluator, independent of React and network calls.

```ts
evaluateScheme(scheme: SchemeRecord, subject: EvaluationSubject, now: Date): SchemeEvaluation
evaluateAll(schemes: SchemeRecord[], subject: EvaluationSubject, now: Date): SchemeEvaluation[]
buildSubject(profile: BeneficiaryProfile, memberId?: string): EvaluationSubject  // member facts + household facts
```
`now` is always injected so tests are deterministic. Never call `new Date()` inside the evaluator.

Required semantics:
- `eq`: strict comparison after safe enum normalisation.
- `lte` / `gte`: numeric comparison. Invalid input => unknown. Do not coerce arbitrary strings.
- `in`: actual value must be in allowed values.
- `exists`: present known value => pass; absent/unknown => unknown.
- null, undefined, empty or explicit `"unknown"` => `unknown`, never `fail`.
- **Income bands:** for field `annualHouseholdIncome` with `lte T`: pass if the band's upper bound is known and `<= T`; fail if the band's lower bound is `>= T`; otherwise unknown (the band straddles the limit; set `reasonCode: "straddles_band"` and explain "confirm with your income certificate"). `gte T` is the mirror image. `eq`/`in` compare band values directly. `unknown` band => unknown.
- Mandatory failed rule => `not_matching`.
- No mandatory failure but a mandatory unknown => `possible`.
- All mandatory rules pass => `likely`.
- Optional failures remain visible but do not independently disqualify.
- Never calculate a "probability of eligibility." No LLM. Department is always final authority.

**Data status is separate from the rule outcome.** Precedence:
```ts
const STALE_AFTER_DAYS = 180; // product decision: confirm with the team, keep in one config constant
const needsCheck =
  scheme.verification.status === "needs_review" ||
  (scheme.verification.status === "verified" && isMissingOrStale(scheme.lastVerifiedAt, now, STALE_AFTER_DAYS));

if (needsCheck) state = "needs_verification";
else if (mandatory.some(c => c.result === "fail")) state = "not_matching";
else if (mandatory.some(c => c.result === "unknown")) state = "possible";
else state = "likely";
```
`demo_placeholder` records are evaluated on their (demo) rules like any other record, so the demo is alive even before every scheme is human-verified. They are **never** shown as official: every row and detail view carries the **Demo data** tag, and the detail view says "These rules are for demonstration and are not official." Rule checks are always shown, even for `needs_verification`.
The presentation set for judging should contain **at least 3 human-verified schemes** so a genuinely verified path exists.

Test: every operator; income band boundaries (limit equal to a band edge, limit inside a band, limit above all bands, `unknown` band); all pass; mandatory fail; mandatory unknown; optional fail; null/undefined; wrong types; mixed outcomes; `needs_review`; stale and future `lastVerifiedAt`; `demo_placeholder`; a scheme with zero mandatory rules (rejected at data validation); `buildSubject` for primary and for a family member.

## 9. Screen requirements

### Welcome
Brand, language switcher, text-size control, persistent prototype banner, task-first message, primary "Find benefits for me", secondary "Help someone else", **a visible ghost button "Try a sample" directly under the actions that opens the three sample personas** (judges often do not scroll), privacy line. The persona list may also appear below the fold under "For judges and testers." No startup hero or people illustration.

### Consent
“What we ask / what we do / what we never do / how to clear demo data”; one acknowledgement checkbox; continue disabled until checked; listen button only if real read-aloud support exists.

### Profile
One question per screen; progress and question count; back/next; large answer rows; “I don’t know” where appropriate. Ask only relevant questions: district, Gujarat residence, age, occupation, course/institution for students, category where relevant, income band, disability where relevant. Tap answers always work. Profile editable after results.

### Results
Summary and filters All/Likely/Possibly. All includes not-matching and needs-verification. Rows show status icon + text + colour, Dot-row + textual count, one-line reason and source/freshness or Demo data. At 1024px+ use master-detail; mobile uses a list/detail route.

### Family lens (optional; build after the core journey works)
If the active profile has family members, Results show a subject switcher ("For: Riya, Mother, Father"). `individual` schemes are evaluated per member with `buildSubject`; `household` schemes once. Each row says who it may fit. Never merge members into one profile. If there are no members, hide the switcher.

### Scheme detail
Three groups: “What matches”, “We need to confirm”, “What does not match”. Show actual value or “Not provided”, document requirements, where-to-get guidance, application steps, official source and last checked date. Local “Report outdated information” sheet must say it is not submitted. Show the final-decision disclaimer.

### Synthetic document flow
Real upload disabled with explanation. “Use sample income certificate” loads a bundled synthetic asset with SAMPLE watermark, performs one scan sweep, reveals predefined fields, asks “Is this correct?”, offers confirm/correct, updates local readiness and says “File deleted from this session” only for the sample flow. Never claim authenticity verification.

### Checklist
One dark readiness summary panel only. Ready/missing groups, Dot-row and text count, expandable “Where to get it”, official link, print checklist using `window.print()` and print CSS. No “application submitted” language.

### Helper
Three fictional families; summary computed from data and labelled Sample data; Dot-row and missing count; tap to open family; Add family must be functional local-only or explicitly labelled planned/disabled. Consent reminder. Not a generic analytics dashboard.

## 10. Internationalisation and voice

English is source locale. All visible strings use locale keys in `en.json`, `gu.json`, `hi.json`. Add a missing-key check. Update `<html lang>`. Gujarati/Hindi strings need native-speaker review; flag them as such. Use `Intl.NumberFormat` and `Intl.DateTimeFormat`.

Voice is optional:
- feature-detect SpeechRecognition / webkitSpeechRecognition;
- map `gu-IN`, `hi-IN`, `en-IN`;
- start only on direct user action;
- echo transcript and require confirmation before saving;
- tap fallback always exists;
- unsupported/denied states explain what happened;
- speechSynthesis read-aloud has a stop control;
- do not claim Gujarati voice works unless tested on the exact demo device.

## 11. Design system is binding

Follow `DESIGN.md` exactly. Essential reminders:
- “Rann and Ajrakh” palette: salt `#F2F3EF`, paper, neel `#12263F`, haldi, madder, mor and defined soft tokens.
- No purple/violet, gradients, glassmorphism, neon, blobs or dark mode.
- Anek Latin/Gujarati/Devanagari; verify glyph coverage.
- No emoji, stock photos, AI faces, fake testimonials.
- No repeated generic rounded cards; use ledger rows.
- One primary action per view.
- 48px minimum touch targets; 56px primary where specified.
- Mobile-first at 390px; test 360, 390, 768, 1024, 1280.
- Desktop master/detail at 1024px+ for Results/detail.
- Dot-row communicates conditions/documents; never decorative only.
- Bandhani band only where specified.
- One dark panel only: readiness summary.
- No shadows except specified sheet shadow.
- Sentence case; no uppercase eyebrow labels, tracking tricks, middle-dot metadata or appended arrows.
- Reduced motion, keyboard support and visible focus.
- Every status uses icon + text + colour.

Tailwind v4 tokens belong in `src/styles/index.css`; no raw hex values in component styles. Add tokens centrally only with justification.

## 12. Code quality

- TypeScript strict mode; no `any`, `@ts-ignore`, or unexplained assertions.
- Named exports unless a framework convention requires otherwise.
- Pure functions for domain logic; no business logic in JSX.
- No giant App component; split by responsibility.
- Stable IDs for keys; no array index for mutable lists.
- Scheme rules exist only in data records, not duplicated in components.
- Derived values computed from source state.
- External links use safe `target="_blank"` and `rel="noreferrer"`.
- Handle empty, error, loading and unsupported-browser states.
- No console errors/warnings; remove unused dependencies.
- No hard-coded URLs scattered through components.

## 13. Tests and definition of done

Required scripts:
```bash
npm run lint
npm run typecheck
npm run test
npm run build
```
Run them; never claim they pass without actually running them.

Acceptance:
1. Language switching updates visible UI.
2. Consent blocks progression until acknowledged.
3. Tap-only profile works.
4. Sample persona uses same evaluator as manual profile.
5. Changing a mandatory answer changes the result.
6. Unknown facts stay unknown and can produce Possibly eligible.
7. Mandatory failure appears under “What does not match”.
8. Unverified data shows Needs checking / Demo data.
9. Detail shows criteria, docs, official source and last-check.
10. Sample confirmation updates readiness.
11. Checklist explains missing docs and opens official link.
12. Print view is readable and hides navigation.
13. Helper counts derive from synthetic records.
14. Deep route refresh does not crash.
15. No real uploads or personal identifier collection.
16. No horizontal overflow, clipped Gujarati marks or inaccessible controls.
17. Income limit inside a band produces Possibly eligible with a "confirm with your income certificate" explanation, never a guessed pass/fail.
18. A `demo_placeholder` scheme shows its rule outcome plus the Demo data tag; a `needs_review` scheme shows Needs checking.
19. Confirming one sample document updates readiness on every scheme that requires that `documentTypeId`.
20. Corrupt or old persisted state is discarded without crashing.
21. Missing-locale-key test passes; no hard-coded user-facing strings.

After every UI phase, inspect 360, 390, 768, 1024 and 1280px; test Gujarati long strings and Extra large text; search for gradients, raw hex, emoji, accidental shadows, uppercase labels and arrows; keyboard-test; check reduced motion.

## 14. Collaboration and Git
Commit each completed phase in small units. Suggested commits: `chore: scaffold frontend`, `feat: add design tokens`, `feat: add profile flow`, `feat: add eligibility engine`. Never commit secrets, real documents or personal data. If two contributors work in parallel, assign feature ownership and use branches.

## 15. Deployment and README
Deploy static Vite build to Vercel or Netlify. Configure SPA fallback for direct routes. Test the deployed URL on phone and laptop. README must include: 3-line problem/solution, live demo/video, screenshots, real-vs-simulated table, setup, eligibility logic, privacy, data sources/verification, architecture, limitations, roadmap, team. Include “Guidance tool. Not an official government service.”

## 16. Mandatory agent workflow
For every phase:
1. Read AGENT.md and DESIGN.md; inspect existing files.
2. State objective and files expected to change.
3. Identify assumptions; ask only if blocked.
4. Implement only the requested phase.
5. Run relevant tests, lint, typecheck and build.
6. Inspect changed screens at required widths.
7. Report files changed, commands and actual results.
8. List limitations honestly.
9. Do not claim done if build fails or interactions are static.

**Successful prototype:** a judge can choose a language, load or complete a synthetic profile, see deterministic explainable results, inspect a scheme, use a synthetic document, see checklist readiness update, and open the official source/application link. Helper mode also works with sample records. The same flow works on phone and laptop.

## 17. Scheme data verification protocol (human task, blocks the demo)

The agent may structure data; only a human may verify it.
1. Choose 6 to 10 schemes for the demo (aim for at least 3 `verified`). Prefer schemes whose criteria map cleanly to the profile fields and that suit the sample student, farmer and senior/widow personas.
2. For each: open the official page yourself. Record name (en/gu/hi from the official site), department, every eligibility criterion exactly as stated, documents, application steps, official URLs and the date you checked.
3. Paste official text to the agent and ask it to **structure it into a `SchemeRecord` using only that text**, with `null` for anything not stated. The agent must never fill gaps from memory.
4. Set `verification.status` to `verified` only after a human re-reads the record against the source. Set `reviewer` and `lastVerifiedAt` honestly. Otherwise use `needs_review` or `demo_placeholder`.
5. Rules that cannot be expressed with the current operators and fields are not forced in; mark the scheme `needs_review` with a note, or extend the registry.
6. `whereToGet` steps come only from official sources. If not found, omit them and show "Ask the issuing office."
7. Keep `docs/DATA_VERIFICATION.md`: one row per scheme with source URLs, checked date, reviewer, status and open questions.
