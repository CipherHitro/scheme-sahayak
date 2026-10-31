# SchemeSahayak

> **“From ‘I may qualify’ to ‘I’m ready to apply’.”**  
> A mobile-first, high-trust, multilingual public service platform designed to help families across India discover government welfare schemes, understand eligibility criteria transparently, prepare required documents, and navigate directly to official government portals.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.3-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38b2ac.svg)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Vitest-147%20passed-success.svg)](https://vitest.dev/)
[![A11y](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-orange.svg)]()

---

## 📌 Overview

Navigating social welfare schemes across India is often complex, fragmented, and daunting—especially for rural, low-literacy, or elderly citizens. While national aggregators provide high-level catalogs, citizens frequently get stuck at the **readiness gap**:
- *Why exactly do I qualify or not qualify?*
- *Which specific documents must I obtain first, and where do I get them?*
- *How does my daughter's education scholarship interact with our family's ration card and income certificate?*

**SchemeSahayak** bridges this readiness gap. It acts as a calm, helpful digital companion that evaluates family context through a transparent, deterministic client-side engine and produces an actionable, print-ready document checklist before directing the citizen to the official government department portal.

---

## ✨ Key Features & Capabilities

### 1. 🧠 Deterministic Eligibility Engine
- **Zero Hallucination Guarantee:** Uses a deterministic, rule-based TypeScript evaluation engine running client-side in the browser—not fuzzy or opaque LLM predictions.
- **Criteria-by-Criteria Transparency:** Clearly decomposes decisions into met conditions, unmet conditions, and unknowns (e.g., Class 12 percentile ≥ 80%, annual family income ≤ ₹6,00,000).
- **Three-Tier Readiness Classification:**
  - 🟢 **Likely Eligible:** All core criteria met with existing facts.
  - 🟡 **Possibly Eligible:** Criteria plausible but missing critical verification facts (e.g. land ownership or certificate category).
  - ⚪ **Need More Info / Check Other:** Criteria not met or requires official department inspection.

### 2. 👨‍👩‍👧‍👦 Family & Multi-Member Household Lens
- Evaluates schemes under individual subject contexts (e.g. college student daughter, smallholder farmer father, senior citizen grandmother) while sharing household-level facts (e.g. ration card category, district, total household income).
- Quick subject switcher enables village operators or heads of family to switch between family members seamlessly.

### 3. 🎯 Persona-Specific Scheme Filtering
- Automatically matches relevant scheme categories based on occupation and demographic context:
  - **Students:** Mukhyamantri Yuva Swavalamban Yojana (MYSY), Post-Matric Scholarships, Tablet Schemes.
  - **Farmers:** Farm Mechanization / Tractor Subsidies, Micro-Irrigation, PM-Kisan Samman Nidhi.
  - **Seniors & General:** Old Age Pension (Vrudh Pension), Ayushman Bharat PM-JAY.

### 4. 🪪 Document Readiness & Synthetic Scanner Demo
- **Where-to-Get Action Plan:** Personalized guidance detailing the issuing authority (e.g., Tehsildar / Mamlatdar Office, Panchayat / Jan Seva Kendra) and application route for every required document.
- **Simulated OCR Flow:** Demonstrates a camera scan sweep animation with simulated OCR field extraction and local readiness checklist updates.
- **Ethical Safeguards:** Explicitly labeled with prominent **"SAMPLE DATA"** watermarks. Real personal document collection and DigiLocker credential storage are intentionally omitted.

### 5. 🤝 Assisted "Helper Mode" (CSC / Village Center / NGO Operators)
- Designed for village digital operators (Common Service Centre / CSC operators, Village Computer Entrepreneurs, Anganwadi workers, and NGO volunteers).
- Manages multiple household profiles locally, tracks document readiness, prints physical checklists for citizens, and enables quick profile switching.

### 6. 🌐 Multilingual & Voice Accessible (EN / HI / GU)
- **Pan-India Vision & Trilingual Support:** Built for citizens across India, with complete active language support in **English**, **Hindi**, and **Gujarati**.
- **Default English Load:** Fresh visits default to English (`en`), with immediate one-tap switching to Hindi and Gujarati.
- **Native Review Badge:** Transparently indicates when translations are undergoing verified review.
- **Voice Input Modal:** Speech recognition helper for hands-free query entry with speech-to-text transcript matching.

### 7. 🎨 Calming, High-Legibility Design System
- Rooted in a disciplined, earthy palette designed to reduce anxiety:
  - **Salt Ground (`#F2F3EF`):** Cool, quiet off-white ground that provides immense calm and clarity.
  - **Neel Ink (`#12263F`):** Deep indigo ink tone for high-contrast typography and primary actions.
  - **Haldi & Madder (`#9E3A2B`, `#D97706`):** Turmeric and brick-red accents used exclusively for status and attention.
  - **Bandhani Information Dots (`DotRow`):** Condition indicators where each dot represents an evaluated rule or document.
- **Typography:** Uses Google Fonts variable typefaces:
  - *Anek Latin* (English)
  - *Anek Devanagari* (Hindi)
  - *Anek Gujarati* (Gujarati)
- **Accessibility:** Text-size scaler (100%, 112.5%, 125%), minimum 44px touch targets, full keyboard navigability, and screen-reader `aria-*` support.

---

## 🏛️ Schemes Dataset & Pilot Validation

The prototype includes detailed eligibility rule trees and document specifications for flagship social welfare schemes:

| Scheme Code | Scheme Name | Department / Ministry | Primary Target |
|:---|:---|:---|:---|
| `mysy` | Higher Education Merit-cum-Means Scholarship | Higher Education Department | Undergrad & Diploma Students |
| `post-matric-scholarship` | Post-Matric Scholarship for Reserved Categories | Social Justice & Empowerment | SC / ST / SEBC Students |
| `tractor-subsidy` | Farm Mechanization & Tractor Subsidy Scheme | Agriculture, Farmers Welfare & Co-operation | Landholding Farmers |
| `pm-kisan` | PM-Kisan Samman Nidhi (Income Support) | Ministry of Agriculture & Farmers Welfare | Small & Marginal Farmers |
| `ayushman-pmjay` | Ayushman Bharat PM-JAY (Health Cover up to ₹5 Lakh) | Health & Family Welfare | BPL / Low-Income Families |
| `old-age-pension` | National Old Age Pension Scheme (NSAP / Vrudh Pension) | Social Justice & Empowerment | Senior Citizens (60+) |

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Language:** [TypeScript 5.9](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/) with custom design tokens
- **Icons:** [Phosphor Icons React](https://phosphoricons.com/)
- **Animation:** [Motion](https://motion.dev/)
- **Schema Validation:** [Zod 4](https://zod.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **State & Storage:** Client-side React Context with versioned `localStorage` persistence
- **Testing:** [Vitest 5](https://vitest.dev/) + [Testing Library](https://testing-library.com/) (15 test suites, 147 tests)

---

## 📂 Project Structure

```
scheme-sahayak/
├── src/
│   ├── app/                    # Application shell, routing & JourneyContext
│   │   ├── JourneyContext.tsx  # Global journey state & persistent storage sync
│   │   ├── journey-context.ts  # Context contracts and initial values
│   │   └── App.tsx             # Route declarations and root layout
│   ├── components/             # Reusable UI design system
│   │   ├── domain/             # Scheme-specific widgets (DotRow, DocumentRow, SubjectSwitcher)
│   │   ├── layout/             # AppHeader, PrototypeBanner, Container, MobileShell
│   │   └── ui/                 # Accessible primitives (Button, Card, Badge, Modal)
│   ├── data/                   # Verified scheme datasets & sample persona definitions
│   │   ├── schemes.ts          # Scheme rule definitions & criteria metadata
│   │   ├── personas.ts         # Synthetic persona profiles (Student, Farmer, Senior)
│   │   └── helper-samples.ts   # Multi-family sample records for Helper Mode
│   ├── domain/                 # Core business models & engines
│   │   ├── eligibility/        # Deterministic criteria evaluation engine
│   │   ├── readiness/          # Document readiness & checklist generators
│   │   ├── journey.types.ts    # Journey state models
│   │   └── document.types.ts   # Document registry and extraction schema
│   ├── features/               # Application user journey views
│   │   ├── welcome/            # Task-first welcome screen
│   │   ├── consent/            # Plain-language privacy & consent dialog
│   │   ├── profile/            # Guided 8-question demographic stepper
│   │   ├── review/             # Answer review & quick-edit drawer
│   │   ├── results/            # Scheme match catalog with filters
│   │   ├── scheme-detail/      # Master-detail criteria breakdown & guidance
│   │   ├── checklist/          # Personalized evidence plan with print mode
│   │   ├── documents/          # Simulated document scan & extraction flow
│   │   ├── helper/             # Assisted CSC/operator dashboard
│   │   └── voice/              # Web Speech API voice input modal
│   ├── i18n/                   # Multilingual locale dictionaries (en, hi, gu)
│   ├── lib/                    # Storage, speech, formatters, and utility functions
│   └── test/                   # 15 test suites covering all user journey phases
├── public/                     # Static assets and sample documents
├── DESIGN.md                   # Formal design tokens & UI specification
├── AGENT.md                    # Product philosophy, data contracts & guidelines
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/CipherHitro/scheme-sahayak.git
cd scheme-sahayak
npm install
```

### Development Server
Start the local Vite development server with HMR:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🧪 Testing & Quality Assurance

SchemeSahayak enforces strict type safety, zero lint warnings, and comprehensive test coverage across all features:

```bash
# Run all 15 automated test suites (147 unit & integration tests)
npm test

# Run TypeScript compilation check
npm run typecheck

# Run ESLint validation
npm run lint

# Create production build bundle
npm run build
```

---

## 🔒 Privacy, Security & Ethical Boundaries

SchemeSahayak strictly adheres to public trust and privacy-by-design standards:

1. **Frontend-Only Execution:** All rule evaluations, persona profiling, and checklist computations occur exclusively in the citizen's browser. No personal data is transmitted to remote cloud databases.
2. **No Real PII Collection:** The application never requests or stores Aadhaar numbers, biometric fingerprints, banking credentials, DigiLocker PINs, or sensitive identity proofs.
3. **Honest Prototype Disclaimers:** Every screen prominently displays:
   - *"This is guidance. The department makes the final decision."*
   - *"Prototype: sample data and simulated document reading."*
4. **Official Portal Handoff:** Once a citizen is prepared with their document checklist, SchemeSahayak directs them directly to official government portals to complete their submission.

---

## 📄 License

This project was built for social impact and public digital goods hackathons. Distributed under the **MIT License**. See `LICENSE` for more information.
