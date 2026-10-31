# Scheme Data Verification Protocol & Audit Log

As mandated by **Section 17 of AGENT.md**, AI models are permitted to structure data schemas, but **only a human reviewer may verify official criteria and mark a scheme as `verified`**.

Every scheme starts as `demo_placeholder` or `needs_review`. Only when a human reviewer accesses the official government portal, confirms the eligibility criteria, and records their name and date, can `verification.status` be upgraded to `verified`.

---

## Scheme Verification Table

| Scheme ID | Scheme Name | Official Source URL | Verification Status | Last Verified Date | Reviewer | What a Human Must Verify | Open Questions & Notes |
|---|---|---|---|---|---|---|---|
| `mysy-gujarat` | Mukhyamantri Yuva Swavalamban Yojana | [mysy.guj.nic.in](https://mysy.guj.nic.in/) | `demo_placeholder` | `null` | `null` | Confirm 80th percentile board exam cut-off vs book allowance eligibility; verify fee reimbursement caps across diploma, degree, medical courses in latest GR. | Does MYSY have separate criteria for government vs private college hostel allowance? |
| `digital-gujarat-post-matric` | Post-Matric Scholarship for SC/ST/SEBC | [digitalgujarat.gov.in](https://www.digitalgujarat.gov.in/) | `demo_placeholder` | `null` | `null` | Verify whether ₹2,50,000 annual income limit applies equally to SC/ST and SEBC, or if SEBC has ₹1,50,000 ceiling. Check hosteller vs day-scholar maintenance allowances. | Is institutional digital verification required before citizen DBT disbursement? |
| `kisan-sahay-yojana` | Mukhyamantri Kisan Sahay Yojana | [ikhedut.gujarat.gov.in](https://ikhedut.gujarat.gov.in/) | `demo_placeholder` | `null` | `null` | Verify 33%–60% vs >60% crop damage compensation slabs; verify whether Forest Rights Act (Sanad) holders require separate documentation from standard 7/12 RoR. | Is application portal open on a rolling basis or strictly within 15 days of state notification? |
| `vrudh-pension-yojana` | Indira Gandhi National Old Age Pension (Gujarat) | [nsap.nic.in](https://nsap.nic.in/) | `demo_placeholder` | `null` | `null` | Verify BPL census score ceiling (0-20) vs Mamlatdar income certificate; verify Gujarat state supplementary pension slab for 60-79 vs 80+ age groups. | Does Gujarat state top-up amount differ between municipal corporation and rural panchayat areas? |
| `manav-garima-yojana` | Manav Garima Yojana (Artisan Toolkits) | [esamajkalyan.gujarat.gov.in](https://esamajkalyan.gujarat.gov.in/) | `demo_placeholder` | `null` | `null` | Verify whether upper age limit is 60; verify list of 28 eligible vocational trades and annual application submission window. | Which sub-categories get priority in the automated computerized draw? |
| `vidhva-sahay-yojana` | Ganga Swarupa Sahay Yojana (Widow Pension) | [digitalgujarat.gov.in](https://www.digitalgujarat.gov.in/) | `demo_placeholder` | `null` | `null` | Verify income limits (₹1,20,000 rural / ₹1,50,000 urban); verify annual July re-verification procedure for non-remarriage certificate. | Does an adult earning son in the household disqualify the widowed mother? Flagged for human review. |
| `divyang-sadhan-sahay` | Divyang Sadhan Sahay Yojana | [esamajkalyan.gujarat.gov.in](https://esamajkalyan.gujarat.gov.in/) | `demo_placeholder` | `null` | `null` | Verify 40% minimum disability threshold vs 60% for motorized tricycles; verify device replacement cycle (3 vs 5 years). | Is the income ceiling waived for specialized high-cost assistive technologies? |

---

## Field Compatibility Notes & Deprecations

- **Income Rules:** All income criteria previously stored as string arrays (e.g. `['under_1l', '1l_2_5l']`) have been migrated to field `annualHouseholdIncome` with numeric limits and operator `lte` (e.g., `value: 600000`, `value: 250000`, `value: 100000`, `value: 150000`). Half-open band semantics (`under_1l`, `1l_2_5l`, `2_5l_5l`, `above_5l`) are evaluated strictly by the engine without guessing.
- **Course & Institution Details:** Free-text `course` and `institutionType` strings have been replaced by the canonical enums `educationLevel` and `institutionType`.
- **Restricted RuleField Union:** Rules are strictly validated against `PROFILE_FIELDS`. Metadata fields `id`, `displayName`, and `familyMembers` are disallowed as rule criteria.
- **Documents:** All document requirements now point to canonical `documentTypeId`s defined in `src/data/documentCatalog.ts`.
