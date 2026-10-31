# DESIGN.md: SchemeSahayak Design System

> **Audience:** AI coding agents and human developers. Read this file fully before writing or changing any UI.
> **Authority:** If this file conflicts with your habits, defaults or a library's default theme, **this file wins.** If it is silent, choose the option that is calmer, more legible and more specific to this product, and note the decision in your summary.

---

## 1. Brief and design thesis

**Product:** Gujarat SchemeSahayak, an assistant that helps people in Gujarat find government benefits they may qualify for, understand why, see which documents they have or lack, and reach the official application.

**Who uses it:** Rural and urban Gujarati families, elderly and low-literacy users, students and parents, and helpers (CSC/e-Gram operators, NGO workers). Many use a mid-range Android phone, outdoors or in a busy centre, with limited reading confidence. Gujarati is the primary language; Hindi and English are secondary.

**The job of the interface:** reduce fear and effort. It must feel *trustworthy like a good public institution* and *warm like a helpful neighbour*, never like a startup landing page and never like a government form.

### Design thesis: "Rann and Ajrakh"

The visual language comes from Gujarat itself, used with restraint:

- **Rann:** the pale salt flats. A cool, quiet, slightly green-grey off-white ground gives enormous calm and lets colour mean something.
- **Neel:** natural indigo, as in Ajrakh block printing. A deep blue-black ink colour for text and primary actions. Authority without coldness.
- **Madder and haldi:** the red and turmeric yellow of Ajrakh and bandhani. Used sparingly as meaning (attention, highlight), never as decoration.
- **Bandhani dots:** tie-dye dot patterns. Our one signature device: **dots are information** (each dot is one condition or one document), and a small band of dot pattern is the only ornament.

**Spend boldness in one place:** the **Dot-row** (Section 7) and the single "dots fill in" moment when results arrive. Everything else stays quiet, plain and disciplined.

---

## 2. Forbidden list (these make an app look machine-generated)

Do **not** do any of the following, even if a library, template or snippet does it by default:

| Never | Instead |
|---|---|
| Purple, violet, indigo-to-pink, blue-to-purple or any multi-colour gradient, anywhere | Flat colour planes from the palette |
| Gradient text, gradient buttons, gradient card backgrounds, "aurora" blurs, glowing blobs | Solid colour, borders, whitespace |
| Glassmorphism (frosted blur panels), neon glows, heavy drop shadows | 1px borders; the one defined sheet shadow |
| Warm cream background with a terracotta accent and a big serif headline | Our Rann ground and Neel ink (Section 3) |
| Inter, Roboto, Poppins, Space Grotesk, system-default-only stacks | The Anek family (Section 4) |
| Emoji as icons or decoration; sparkle icons for "AI" | Phosphor icons (Section 8) |
| A hero of centred headline plus three identical icon cards | A task-first welcome screen (Section 11) |
| Identical rounded cards with identical radius and shadow repeated everywhere | Ledger-style rows and varied shape roles (Section 6) |
| Tracked-out ALL-CAPS eyebrow labels above headings | Plain sentence-case headings; no eyebrows |
| Numbered markers (01, 02, 03) on content that is not a real sequence | Numbers only for true steps |
| Meta strings joined by middle dots (A · B · C), spaced-em-dash labels, "→" appended to button text | Separate elements, plain verbs |
| Monospace font for small labels | Anek tabular figures for numbers |
| Fade-and-slide-up on every section, hover lift on every card, bouncing springs | One orchestrated moment; motion only in response to an action |
| Fake testimonials, fake statistics, lorem ipsum, stock photos, AI-generated faces | Honest copy; real sample data labelled as sample |
| Colour alone to convey state | Colour **plus** shape/icon **plus** text |
| Tiny text (under 14px) or low-contrast grey on white | Scale in Section 4; contrast rules in Section 13 |
| The shadcn/ui default grey-zinc theme left as-is | Restyle every component with our tokens |

---

## 3. Colour

All colour comes from the tokens below. **No hard-coded hex values in components.** Use the Tailwind token classes (e.g. `bg-salt`, `text-neel`).

### 3.1 Core palette

| Token | Hex | Role |
|---|---|---|
| `salt` | `#F2F3EF` | App background (the Rann). Cool, slightly green-grey off-white |
| `paper` | `#FFFFFF` | Raised surfaces: inputs, sheets, selected rows |
| `salt-2` | `#E7E9E3` | Sunken or secondary planes, table stripes, disabled fill |
| `line` | `#D3D7CF` | 1px borders and dividers |
| `neel` | `#12263F` | Primary text, primary buttons, headers (natural indigo, blue-black). Hue stays blue (about 210 degrees). Never drift toward violet |
| `neel-700` | `#1D3857` | Hover and pressed state of neel surfaces |
| `neel-soft` | `#DCE4EE` | Tinted plane for info and selected states |
| `ink-2` | `#44566B` | Secondary text (contrast about 6:1 on salt) |
| `haldi` | `#E0A526` | Highlight: progress fill, mic button, focus accent, "possibly" dots. Fill colour only; for text use `haldi-ink` |
| `haldi-ink` | `#774F00` | Text and icons on haldi-soft |
| `haldi-soft` | `#FAEBC4` | Tinted plane for "possibly eligible" and the prototype banner |
| `madder` | `#A6392B` | Attention: missing document, "not matching right now", destructive |
| `madder-soft` | `#F5DFDA` | Tinted plane for madder states |
| `mor` | `#1B6B5A` | Success: "likely eligible", have/confirmed (named for the peacock) |
| `mor-soft` | `#DBEDE6` | Tinted plane for mor states |

### 3.2 Status mapping (single source of truth)

| State | Plane | Text and icon | Icon (Phosphor, fill) | Label shown |
|---|---|---|---|---|
| Likely eligible | `mor-soft` | `mor` | `CheckCircle` | "Likely eligible" |
| Possibly eligible | `haldi-soft` | `haldi-ink` | `CircleHalf` | "Possibly eligible" |
| Not currently eligible | `madder-soft` | `madder` | `MinusCircle` | "Not matching right now" |
| Needs verification | `salt-2` | `ink-2` | `Hourglass` | "Needs checking" |

Every status always shows **icon + label + colour**. Wording for the negative state is deliberately gentle ("Not matching right now"), never "Rejected" or "Ineligible".

### 3.3 Colour rules

1. Backgrounds are `salt` (page) and `paper` (raised). Large areas never use `haldi`, `madder` or `mor`.
2. Primary action = `neel` fill with white text. Only **one** primary button per view.
3. `haldi` is for emphasis and progress, not for buttons with text on them (use `neel` text on `haldi` if a haldi button is unavoidable, e.g. the mic).
4. No opacity tricks to invent new colours. If a tint is needed, use a `-soft` token.
5. No dark mode in v1. Provide high legibility through text size controls instead (Section 13).
6. **Gradients: none.** The only allowed use of a gradient function is generating the bandhani dot pattern in Section 7.2 (never as a colour transition).

### 3.4 Token implementation (Tailwind CSS v4, in `src/styles/index.css`)

```css
@import "tailwindcss";

@theme {
  --color-salt: #F2F3EF;
  --color-paper: #FFFFFF;
  --color-salt-2: #E7E9E3;
  --color-line: #D3D7CF;
  --color-neel: #12263F;
  --color-neel-700: #1D3857;
  --color-neel-soft: #DCE4EE;
  --color-ink-2: #44566B;
  --color-haldi: #E0A526;
  --color-haldi-ink: #774F00;
  --color-haldi-soft: #FAEBC4;
  --color-madder: #A6392B;
  --color-madder-soft: #F5DFDA;
  --color-mor: #1B6B5A;
  --color-mor-soft: #DBEDE6;

  --font-sans: "Anek Latin Variable", "Anek Gujarati Variable", "Anek Devanagari Variable",
               "Noto Sans Gujarati", "Noto Sans Devanagari", system-ui, sans-serif;

  --radius-control: 10px;
  --radius-panel: 14px;
  --radius-sheet: 22px;

  --shadow-sheet: 0 -14px 34px -14px rgb(18 38 63 / 0.22);

  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
}

:root {
  --text-scale: 1;               /* 1, 1.125, 1.25 via the text-size control */
  --focus: var(--color-neel);
}

html { font-size: calc(100% * var(--text-scale)); }
body { background: var(--color-salt); color: var(--color-neel); font-family: var(--font-sans); }
```

---

## 4. Typography

### 4.1 Typeface

**One family, three scripts: Anek.** Anek Latin, Anek Gujarati and Anek Devanagari are designed to match each other, so a screen that mixes Gujarati text, Hindi text and English numerals looks like one voice. It is a variable family with **weight and width axes**, which gives us hierarchy without a second typeface.

| Role | Setting |
|---|---|
| Display and headings | Anek, weight 700, width 110 (slightly extended) for presence |
| Body and UI | Anek, weight 400 (body) and 500 to 600 (labels), width 100 |
| Rupee amounts and counts | Anek, weight 600, `font-variant-numeric: tabular-nums` |

Install via Fontsource (self-hosted, no runtime request to Google): `@fontsource-variable/anek-latin`, `@fontsource-variable/anek-gujarati`, `@fontsource-variable/anek-devanagari`. **Verify the package names exist at install time.** If one is missing or lacks the width axis, fall back to the Google Fonts static files or to Noto Sans Gujarati/Devanagari for that script and note it. Import the width-axis CSS file if the package provides one.

Set `<html lang="gu">` (or `hi` / `en`) and update it on language change; set `lang` on any inline text in a different language.

### 4.2 Type scale

Gujarati and Devanagari carry marks above and below the line, so **line-height is more generous than a Latin-only design.** Base size is 17px on mobile. Sizes are in rem and scale with `--text-scale`.

| Token | Size / line-height (mobile) | Size / line-height (desktop 1024+) | Weight, width | Use |
|---|---|---|---|---|
| `display` | 2.25rem / 1.2 | 3rem / 1.15 | 700, 110 | Welcome headline only |
| `h1` | 1.75rem / 1.3 | 2.25rem / 1.25 | 700, 108 | Screen titles |
| `h2` | 1.375rem / 1.4 | 1.625rem / 1.35 | 650, 105 | Section titles, scheme names |
| `h3` | 1.125rem / 1.5 | 1.25rem / 1.45 | 600, 100 | Row titles, criteria group titles |
| `body` | 1.0625rem / 1.7 | 1.125rem / 1.7 | 400, 100 | Paragraphs, explanations |
| `label` | 0.9375rem / 1.5 | 1rem / 1.5 | 600, 100 | Buttons, form labels, badges |
| `small` | 0.875rem / 1.55 | 0.9375rem / 1.55 | 400, 100 | Source lines, helper text. **Minimum size in the app** |

Rules:
- **Sentence case everywhere.** No ALL CAPS, no letter-spacing tricks.
- Line length: 60 characters maximum for English, about 45 for Gujarati. Use `max-w-prose` or `max-w-[34rem]`.
- Left-aligned text only. No centred paragraphs. Centre only a single short title on a full-screen moment.
- Never bold whole paragraphs. Use weight to separate labels from values.
- Never colour one word in a headline.
- Text size control: three steps (Normal 1, Large 1.125, Extra large 1.25) in the header. Persist the choice.

---

## 5. Layout and spacing

### 5.1 Spacing

4px base unit. Use Tailwind spacing (`1` = 4px). Preferred steps: 4, 8, 12, 16, 20, 24, 32, 40, 56, 80.

| Context | Value |
|---|---|
| Screen horizontal padding | 20px mobile, 32px tablet, 48px desktop |
| Gap between related elements | 8 to 12px |
| Gap between groups | 24px |
| Gap between sections | 40px |
| Minimum touch target | **48 x 48px** (56px for primary actions) |

### 5.2 Breakpoints and structure

Mobile first. Design at **390px** first, then check 360px, 768px, 1024px, 1280px.

| Width | Layout |
|---|---|
| under 640 | Single column. Sticky bottom action bar for the primary action. Sheets slide up from the bottom |
| 640 to 1023 | Single column, content max width 640px, centred, generous side margins |
| 1024 and up | **Two-pane master and detail** on Results and Scheme detail (list 400px on the left, detail on the right). Other screens stay a single centred column max 640px. Header spans full width |

Do not simply stretch the phone layout to a wide window and do not wrap it in a fake phone frame.

### 5.3 App chrome

- **Header (64px):** brand wordmark at left; language switcher, text-size control and menu at right. Background `salt`, bottom border `line`. Not sticky on scroll for long pages; sticky only on Results and Checklist.
- **Prototype banner (36px, `haldi-soft`, `haldi-ink` text):** "Prototype. Sample data and simulated document reading." Always visible under the header, not dismissible.
- **Bottom action bar (mobile):** `paper`, top border `line`, holds the single primary action, respects `env(safe-area-inset-bottom)`.

---

## 6. Shape, borders and elevation

Different roles have different shapes, so the UI does not read as one repeated card.

| Role | Radius | Surface |
|---|---|---|
| Inputs, buttons | 10px (`--radius-control`) | Buttons: filled or 1.5px border. Inputs: `paper`, 1.5px `line` border |
| Result and detail panels | 14px (`--radius-panel`) | `paper`, 1px `line` border, **no shadow** |
| List rows (scheme list, criteria, checklist) | 0 (rows divided by 1px `line` inside one panel) | Ledger style, not separate cards |
| Bottom sheet and dialogs | 22px top corners (`--radius-sheet`) | `paper`, `--shadow-sheet` (the only shadow in the app) |
| Chips, dots, language segments | full | See components |

- Borders are 1px `line` by default; selected or focused uses 2px `neel`.
- No shadows other than the sheet shadow. Separate with border and tone instead.
- Do not nest panels inside panels.

---

## 7. Signature elements

### 7.1 The Dot-row (the memorable element)

A row of small marks, **one per condition or one per document**. It appears on every scheme row and detail header so a person can see "how close am I" without reading.

- Dot diameter 10px, gap 6px, row height 24px. Rows with more than 10 marks wrap to a second line.
- **Shapes plus colour (never colour alone):**

| Meaning | Shape | Colour |
|---|---|---|
| Condition met / document have | Filled circle | `mor` |
| Unknown / need to confirm | Ring with a half fill (left half filled) | `haldi` ring, `haldi` half |
| Does not match / document missing | Hollow ring with a short dash through it for conditions; plain hollow ring for documents | `madder` |

- Each Dot-row has an accessible name, e.g. `aria-label="4 of 6 conditions met, 1 to confirm, 1 not matching"`, and the dots are `aria-hidden`.
- Beside the row, show the count in text: "4 of 6 conditions met". The dots support the text; the text is never omitted.

### 7.2 Bandhani band (the only ornament)

A thin decorative band (height 20px) used **at most once per screen**: under the header on the Welcome screen, and as the top edge of the Checklist summary panel. It is a repeating dot lattice in `neel` at 14% opacity on `salt`, or `haldi` on `neel` for the single dark panel. It must never sit behind text.

```html
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true">
  <defs>
    <pattern id="bandhani" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="2.2" fill="currentColor"/>
      <circle cx="0"  cy="0"  r="1.1" fill="currentColor"/>
      <circle cx="24" cy="0"  r="1.1" fill="currentColor"/>
      <circle cx="0"  cy="24" r="1.1" fill="currentColor"/>
      <circle cx="24" cy="24" r="1.1" fill="currentColor"/>
    </pattern>
  </defs>
</svg>
```
Use it as `<rect width="100%" height="20" fill="url(#bandhani)" class="text-neel/15"/>`.

### 7.3 Dark panel (use once)

The "readiness summary" at the top of the Checklist is the single place with a `neel` background: white text, `haldi` dots, bandhani top band. Nowhere else uses a dark panel.

---

## 8. Iconography

- Library: **Phosphor Icons** (`@phosphor-icons/react`). Weight `regular` for UI actions, `fill` for status icons.
- Sizes: 20px inline with text, 24px for buttons and rows, 40px only on empty states.
- Icons are never the only label on a control. Icon-only buttons need `aria-label` and a visible tooltip on hover/focus.
- No emoji. No illustrations of people. For empty states and the Welcome screen use the Dot-row and the bandhani band, not clip art.
- Suggested icons: language `Translate`, text size `TextAa`, mic `Microphone`, speaker/read-aloud `SpeakerHigh`, documents `FileText`, upload sample `Scan`, delete `Trash`, official link `ArrowSquareOut`, help someone `UsersThree`, privacy `LockKey`, back `ArrowLeft`.

---

## 9. Motion

Motion is rare and always explains something. Library: `motion` (import from `motion/react`).

| Moment | Spec |
|---|---|
| **Results arrival (the one orchestrated moment)** | Dots in each Dot-row fill in sequence left to right, 40ms stagger per dot, 180ms each, `--ease-out`. Total under 900ms. Plays **once** per results load |
| Screen change | 150ms cross-fade only. No slide-ups |
| Sheet open/close | Slide from bottom, 220ms, `--ease-out` |
| Button press | Background darkens to `neel-700`, no scale or bounce |
| Fake document scan | A single `haldi` line sweeps the document image once, 1.2s, then extracted fields appear one by one at 120ms intervals |
| Mic listening | Soft 1.4s pulsing ring around the button |
| Progress bars | Width transition 200ms |

Rules: respect `prefers-reduced-motion` (replace all of the above with instant state changes, keep the dot states). No parallax, no scroll-triggered reveals, no hover-lift on cards, no springs, no looping decoration.

---

## 10. Components

Implement each in `src/components/ui` (generic) or `src/components/domain` (product-specific). Build with Radix primitives for behaviour and our tokens for looks. Variants with `class-variance-authority`.

**Button**
- Heights: 52px default, 60px large (primary on mobile bottom bar), 44px compact (only in desktop toolbars).
- `primary`: `neel` fill, white text, label weight. `secondary`: `paper` fill, 1.5px `neel` border, `neel` text. `ghost`: no border, `neel` text, underline on hover. `danger`: `madder` text and 1.5px `madder` border (never a filled red).
- Radius 10px. Horizontal padding 20px. Icon 24px to the left of the label if present. Never append arrows to labels.
- Focus: 3px `neel` outline, 3px offset. Disabled: `salt-2` fill, `ink-2` text, still readable.

**Language switcher:** a 3-segment control, labels "ગુજ", "हिं", "EN", each at least 48px wide. Selected segment `neel` fill, white text. Radix ToggleGroup. Each segment has `lang` set to its own language.

**Text-size control:** three steps shown as "A", "A", "A" at increasing sizes in a segmented control, labelled "Text size".

**QuestionStep (profile flow):** large question (h1), one-line helper below (small, `ink-2`), then answers as big option rows (min height 60px, `paper`, 1.5px `line` border, 10px radius, radio indicator at the left; selected = 2px `neel` border plus `neel-soft` fill and a filled radio). Always include "I don't know" as the last option where honest. A top progress bar (4px, `haldi` fill on `salt-2`) with text "Question 3 of 8". Back button always visible. Mic button beside the question.

**MicButton:** 64px circle, `haldi` fill, `neel` icon, 3px `neel` ring on focus. Has a text label under it ("Speak your answer"). Shows the listening pulse. Hidden or disabled with an explanatory line if speech is unsupported.

**ReadAloudButton:** secondary compact button with `SpeakerHigh` and the text "Listen". Present on Results rows' detail, criteria and checklist.

**SchemeRow (Results list):** a row inside one list panel. Left: scheme name (h3), department (small). Right on desktop or below on mobile: StatusBadge. Under: Dot-row with count text, then a one-line reason ("You match 4 of 6 conditions. Income certificate needed."). Estimated benefit (if known) shown in `body` weight 600 with ₹ and tabular numerals. Entire row is one tap target (48px minimum, in practice 96px+). Selected row on desktop: 2px `neel` left bar and `neel-soft` fill.

**StatusBadge:** pill with icon (20px) + label, per the status table. 36px high, radius full.

**CriteriaList (Scheme detail):** grouped under three plain headings: "What matches", "We need to confirm", "What does not match". Each row: shape icon, criterion text, and the user's value or "Not provided". Source line (small) under the list: department name and "Last checked on 12 Nov 2026" (use `Intl.DateTimeFormat` in the active language).

**DocumentRow (Checklist):** row with `FileText` icon, document name, status text ("Ready" in `mor`, "Missing" in `madder`), and for missing: "Where to get it" text and an expand control revealing steps. Confirmed-from-sample documents show "Read from sample certificate" in small text.

**ExtractedFieldsPanel:** after the simulated scan: a 14px-radius `paper` panel listing each extracted field as label and value, an "Is this correct?" pair of buttons ("Yes, use these" primary, "Fix a value" secondary), and a final line with a `LockKey` icon: "We read these fields only. The file is deleted." Then, after confirmation, a calm confirmation line "File deleted from this session."

**ProfileSummary:** compact panel listing answers with an edit link per row.

**Banner (prototype):** as in 5.3. **DemoDataBadge:** a small `haldi-soft` tag "Demo data" on any scheme whose `verification.status` is `demo_placeholder`.

**Sheet (Radix Dialog):** used for "Where to get it", "Help someone else", privacy detail. Max width 560px, 22px top radius, drag handle 36x4px `line`, close button 48px.

**Empty/Error states:** a `salt-2` plane with one icon (40px), one sentence stating what happened, one sentence saying what to do, one button. No humour, no apology.

---

## 11. Screens (wireframes)

Wireframes show structure and hierarchy, not exact copy. Gujarati copy must be reviewed by a native speaker.

### 11.1 Welcome
Task first. The first thing seen is the person's own language and a clear start.

```
┌──────────────────────────────────────┐
│ SchemeSahayak          [ગુજ|हिं|EN] [Aa]│
│ ░ Prototype. Sample data. ░░░░░░░░░░ │  (haldi-soft banner)
│ ░░ bandhani band ░░░░░░░░░░░░░░░░░░░ │
│                                      │
│ તમારા પરિવાર માટે કઈ                 │  (display, selected language)
│ સરકારી યોજનાઓ છે, જાણો.              │
│                                      │
│ Answer a few simple questions.       │  (body)
│ We show what may fit, why, and what  │
│ you need to bring.                   │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ [Mic]  Speak in your language    │ │  secondary
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │ [Users] Help someone else        │ │  secondary
│ └──────────────────────────────────┘ │
│ We never ask for OTP or passwords.   │  (small, with LockKey)
├──────────────────────────────────────┤
│ [ Find benefits for me ]             │  primary, sticky bar
└──────────────────────────────────────┘
```
Sample persona shortcuts ("Try with a sample student / farmer / senior") live below the fold in a labelled "For judges and testers" section so real users are not confused.

### 11.2 Consent
Plain-language list with icons: "What we ask", "What we do with it", "What we never do", "How to delete". One checkbox "I understand" (48px target). Primary button disabled until checked. Includes a Listen button.

### 11.3 Profile question
```
┌──────────────────────────────────────┐
│ [←]  Question 3 of 8      [Mic]      │
│ ▓▓▓▓▓▓░░░░░░░░░░░░░░ (haldi bar)     │
│ What is your household's yearly      │
│ income?                              │
│ small: A rough range is fine.        │
│ ┌──────────────────────────────────┐ │
│ │ ( ) Under ₹1,00,000              │ │
│ │ (•) ₹1,00,000 to ₹2,50,000       │ │
│ │ ( ) ₹2,50,000 to ₹5,00,000       │ │
│ │ ( ) Above ₹5,00,000              │ │
│ │ ( ) I don't know                 │ │
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│ [ Next ]                             │
└──────────────────────────────────────┘
```
Currency uses Indian digit grouping. Voice answers are echoed back in a confirm line: "You said: 62 years. Is that right?" with Yes/No.

### 11.4 Results
Mobile: summary line, filter chips (All, Likely, Possibly), then one panel of ledger rows. Desktop 1024+: left list, right detail.
```
┌ You may be missing out ─────────────┐
│ 5 schemes may fit your family        │  (h1)
│ [All] [Likely 2] [Possibly 3]        │  chips (full radius, 44px)
├──────────────────────────────────────┤
│ Scholarship name               [✔ Likely eligible]
│ Department name                       │
│ ●●●●◐○  4 of 6 conditions met         │
│ Income certificate needed.            │
│──────────────────────────────────────│
│ Scheme 2 ...                          │
└──────────────────────────────────────┘
```

### 11.5 Scheme detail
Header: scheme name (h1), department, StatusBadge, Dot-row with count. Then "Why it may fit" criteria groups; "Documents you need" (DocumentRows with have/missing); "How to apply" (plain steps); "Official source" block with link, last-checked date, and "Report outdated information". Disclaimer at the bottom: "This is guidance. The department makes the final decision." Sticky bottom bar: "See my checklist" (primary).

### 11.6 Document step
Choose "Use a sample income certificate" (real uploads are disabled in the prototype and say why in one line). Show the sample document image, the scan sweep, then the ExtractedFieldsPanel, then confirmation and "File deleted" line.

### 11.7 Readiness checklist
Top: the one dark panel with "You are ready for 1 of 3 documents", a documents Dot-row in `haldi`/outline, and the bandhani band. Below: DocumentRows grouped "Ready" and "Still needed". Last: "Open the official portal" (primary) with `ArrowSquareOut`, plus "Download checklist" (secondary, prints a clean one-page view via `window.print()` with a print stylesheet).

### 11.8 Helper mode
List of beneficiary profiles (3 sample), each row with name (sample), a readiness Dot-row and "2 documents needed". Top: a summary "3 families screened today, 7 documents missing" (computed from sample data, labelled sample). Tap a row to open that family's results. A button "Add a family".

---

## 12. Voice and microcopy

- **Voice:** a calm, respectful helper. Short sentences. Everyday words. Use the respectful register in Gujarati and Hindi (આપ / आप). No slang, no jargon, no exclamation marks.
- **Buttons name the action:** "Find benefits for me", "See my results", "Use sample certificate", "Delete my data", "Open official portal". The same action keeps the same name everywhere.
- **Never:** "Submit", "Click here", "Oops", "Something went wrong" (say what happened and what to do).
- **Honesty lines (reuse these exactly, translated):**
  - "This is guidance. The department makes the final decision."
  - "We never ask for your OTP, password or Aadhaar number."
  - "Prototype: sample data and simulated document reading."
  - "Last checked on {date}." and "Demo data" on placeholders.
- **Errors:** say what failed, why if known, and the fix. Example: "We could not hear that. Try again, or choose an answer from the list."
- **Numbers:** ₹ with Indian digit grouping (`Intl.NumberFormat('en-IN')`), tabular figures.
- **Dates:** formatted with `Intl.DateTimeFormat` in the active language.
- **Translation workflow:** English is the source. Gujarati and Hindi strings are written, then flagged `needs_review` in the locale files until a native speaker approves.

---

## 13. Accessibility (WCAG 2.2 AA minimum; aim higher for text)

- **Contrast:** body text at least 7:1 on its ground (neel on salt is above 12:1); secondary text at least 4.5:1; UI components at least 3:1. Re-check every new colour pairing with a contrast tool.
- **Never colour alone:** status uses icon + label + colour; Dot-row uses shape + colour + text count.
- **Touch targets:** 48px minimum; 56px for primary actions; at least 8px between targets.
- **Focus:** always visible, 3px `neel` outline, 3px offset; on dark panels white. Logical tab order. No focus traps outside dialogs.
- **Keyboard:** everything operable by keyboard; Radix handles dialogs, radio groups and toggle groups.
- **Screen readers:** semantic landmarks (`header`, `main`, `nav`), one `h1` per screen, labelled form controls, `aria-live="polite"` for the voice transcript and for results count, accessible names on Dot-rows and icon buttons.
- **Language:** `lang` attribute on `html` and on mixed-language spans.
- **Text size:** three-step control; layouts must not break at 125% or at OS-level large text.
- **Motion:** honour `prefers-reduced-motion`.
- **Voice is an enhancement:** every voice flow has a tap equivalent.

---

## 14. Design QA checklist (run at the end of every phase)

1. Screenshots at 360, 390, 768, 1024 and 1280px for each changed screen; no horizontal scroll; no clipped Gujarati marks.
2. Test in Gujarati with long strings and at text size "Extra large".
3. Search the diff for hex values, `gradient`, `shadow-`, `rounded-3xl`, `uppercase`, `tracking-`, emoji, and `→`. Each must be justified or removed.
4. Check there is exactly one primary action per view.
5. Check every status shows icon + label + colour.
6. Tab through the screen with the keyboard and read the page with a screen reader or the accessibility tree.
7. Check reduced-motion behaviour.
8. Read the screen aloud: any sentence you would not say to a first-time user in a village centre needs rewriting.
