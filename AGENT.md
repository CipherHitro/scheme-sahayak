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
| Routing | `react-router-dom` |
| Icons | `@phosphor-icons/react` |
| Motion | `motion` imported from `motion/react` |
| Class helpers | `clsx`, `tailwind-merge`, `class-variance-authority` |
| Accessible primitives | Radix UI packages only where useful |
| Validation | `zod` for data boundaries |
| Tests | Vitest, React Testing Library, user-event |
| Optional browser tests | Playwright |
| Print checklist | `window.print()` + print CSS |
| Fonts | Anek Latin/Gujarati/Devanagari via Fontsource; verify package names and glyph coverage |

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
│   ├── data/                # schemes, personas, helperFamilies, sampleDocuments
│   ├── domain/
│   │   ├── scheme.types.ts
│   │   ├── profile.types.ts
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

Global state: language, text scale, consent, mode. Journey state: active profile, selected scheme, document confirmations. Local state: filter, open accordion, scan state. Derived results and counts must be computed from source state, never duplicated.

Persist only language/text size and synthetic demo journey state if needed. Put storage behind `src/lib/storage.ts`. Add “Start over / clear demo data.” Do not store real personal data. Deep links and refreshes must recover gracefully if journey state is absent.

## 7. Typed data contracts

Use strict TypeScript; avoid `any`.

```ts
export type Language = "en" | "gu" | "hi";
export type IncomeBand = "under_1l" | "1l_2_5l" | "2_5l_5l" | "above_5l" | "unknown";

export interface BeneficiaryProfile {
  id: string;
  displayName: string; // fictional demo name only
  district: string;
  residenceState: "Gujarat" | "Other" | "unknown";
  age: number | null;
  occupation: "student" | "farmer" | "self_employed" | "salaried" |
    "unemployed" | "homemaker" | "senior" | "other" | "unknown";
  course?: string | null;
  institutionType?: string | null;
  category?: "general" | "sc" | "st" | "sebc" | "ews" | "other" | "unknown";
  annualHouseholdIncome: IncomeBand;
  disability?: "yes" | "no" | "unknown";
  familyMembers?: FamilyMember[];
}
export interface FamilyMember {
  id: string; displayName: string; relationship: string;
  age: number | null; occupation: BeneficiaryProfile["occupation"];
}
export type RuleOperator = "eq" | "lte" | "gte" | "in" | "exists";
export interface SchemeRule {
  id: string;
  field: keyof BeneficiaryProfile;
  operator: RuleOperator;
  value?: string | number | string[];
  mandatory: boolean;
  label: Record<Language, string>;
  explanation?: Record<Language, string>;
}
export type VerificationStatus = "verified" | "needs_review" | "demo_placeholder";
export interface SchemeRecord {
  id: string;
  name: Record<Language, string>;
  department: Record<Language, string>;
  summary: Record<Language, string>;
  benefitDescription: Record<Language, string>;
  rules: SchemeRule[];
  requiredDocuments: SchemeDocumentRequirement[];
  applicationSteps: Record<Language, string[]>;
  applicationUrl: string;
  sourceUrl: string;
  lastVerifiedAt: string | null;
  version: string;
  verification: {
    status: VerificationStatus;
    reviewer: string | null;
    note?: string;
  };
}
export type EligibilityState = "likely" | "possible" | "not_matching" | "needs_verification";
export type CheckResult = "pass" | "fail" | "unknown";
export interface RuleEvaluation {
  ruleId: string; result: CheckResult; actualValue: unknown;
  expectedValue: unknown; mandatory: boolean;
}
export interface SchemeEvaluation {
  schemeId: string; state: EligibilityState; checks: RuleEvaluation[];
  passedCount: number; unknownCount: number; failedCount: number;
  totalCount: number; explanation: string;
}
export type DocumentStatus = "ready" | "missing" | "unknown";
export interface SchemeDocumentRequirement {
  id: string; name: Record<Language, string>;
  helpText: Record<Language, string>; required: boolean;
}
export interface DocumentReadiness {
  documentId: string; status: DocumentStatus;
  source: "profile" | "synthetic_sample" | "user_confirmed" | "not_provided";
}
```

These are data shapes, not permission to invent scheme rules. Do not fabricate thresholds, benefits, deadlines, documents or links. Each genuinely verified record needs an official source, department, actual last-verified date and version. Unverified records must be marked `demo_placeholder` / `needs_review` in the UI. Better to show 6–10 accurate records than a large fake catalogue. The PPT's 15–25 verified schemes is a target, not a licence to invent data.

## 8. Eligibility engine — must genuinely work

Implement a pure TypeScript evaluator, independent of React and network calls.

Required semantics:
- `eq`: strict comparison after safe enum normalisation.
- `lte` / `gte`: numeric comparison only; invalid input => unknown.
- `in`: actual value must be in allowed values.
- `exists`: present known value => pass; absent/unknown => unknown.
- null, undefined, empty or explicit unknown => `unknown`, never `fail`.
- Mandatory failed rule => `not_matching`.
- No mandatory failure but a mandatory unknown => `possible`.
- Unverified/stale/ambiguous scheme record => `needs_verification`, with rule checks still shown.
- All mandatory rules pass on verified record => `likely`.
- Optional failures remain visible but do not independently disqualify.
- Never calculate a “probability of eligibility.”
- Department is always final authority.

Suggested precedence:
```ts
if (scheme.verification.status !== "verified") state = "needs_verification";
else if (mandatory.some(c => c.result === "fail")) state = "not_matching";
else if (mandatory.some(c => c.result === "unknown")) state = "possible";
else state = "likely";
```
Do not hide failed criteria just because a record needs verification. Test every operator, null/undefined, wrong types, mandatory/optional rules, mixed outcomes and unverified data.

## 9. Screen requirements

### Welcome
Brand, language switcher, text-size control, persistent prototype banner, task-first message, primary “Find benefits for me”, secondary “Help someone else”, privacy line. Sample personas below the fold under “For judges and testers.” No startup hero or people illustration.

### Consent
“What we ask / what we do / what we never do / how to clear demo data”; one acknowledgement checkbox; continue disabled until checked; listen button only if real read-aloud support exists.

### Profile
One question per screen; progress and question count; back/next; large answer rows; “I don’t know” where appropriate. Ask only relevant questions: district, Gujarat residence, age, occupation, course/institution for students, category where relevant, income band, disability where relevant. Tap answers always work. Profile editable after results.

### Results
Summary and filters All/Likely/Possibly. All includes not-matching and needs-verification. Rows show status icon + text + colour, Dot-row + textual count, one-line reason and source/freshness or Demo data. At 1024px+ use master-detail; mobile uses a list/detail route.

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
