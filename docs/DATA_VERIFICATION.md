# Scheme Data Verification Protocol & Audit Log

**Scope:** Gujarat, India  
**Last Research Check Date:** 2026-10-31  
**Verification Protocol:** As mandated by **Section 17 of AGENT.md** and **Phase 4H of BUILD_GUIDE.md**, AI models are permitted to structure official research data, but **only a human reviewer may verify official criteria against government notifications and upgrade a scheme to `verified`**.

All records in this dataset are currently marked as `verification.status: "needs_review"` with `reviewer: null` and `lastVerifiedAt: null`. They reflect official-source review pending human sign-off.

---

## 1. Scheme Intake & Verification Audit Table (8 Records)

| Scheme ID | Scheme Name & Department | Official Source URLs | Status | Check Date | Reviewer | What a Human Must Verify | Not Expressible / Open Questions |
|---|---|---|---|---|---|---|---|
| `mysy` | **Mukhyamantri Yuva Swavalamban Yojana (MYSY)**<br>*Education Department, Govt. of Gujarat* | [mysy.guj.nic.in](https://mysy.guj.nic.in/)<br>[MYSY FAQs](https://mysy.guj.nic.in/Noticeboard/FAQs.pdf)<br>[Technical Guidelines](https://mysy.guj.nic.in/Noticeboard/GUIDELINES_FOR_STUDENTS_OF_TECHNICAL_DEPARTMENT.pdf) | `needs_review` | 2026-10-31 | `null` | Verify latest Government Resolution (GR) for current academic year tuition reimbursement caps (medical ₹2L, professional ₹50K, etc.) and delayed application route terms. Confirm whether technical-department-only document rules apply across all courses. | • Class 12 Science/General percentile (≥80 percentile required)<br>• Diploma/Degree route cutoffs<br>• Current course year & prior application status<br>• Hosteller vs day-scholar allowance terms |
| `pm-usp-csss` | **PM-USP Central Sector Scheme of Scholarship (CSSS)**<br>*Department of Higher Education, Ministry of Education, GoI* | [scholarships.gov.in](https://scholarships.gov.in/)<br>[CSSS AY 2025-26 FAQs](https://www.education.gov.in/sites/upload_files/mhrd/files/upload_document/FAQs_PM_USP_CSSS_scheme_AY_2025_26.pdf) | `needs_review` | 2026-10-31 | `null` | Recheck National Scholarship Portal (NSP) scheme-specific opening window for AY 2026–27. Confirm state quota allocations and renewal mark (≥50%) and attendance (≥75%) criteria. | • Top 20th percentile board cutoff<br>• Regular vs distance education mode<br>• Drop year after Class 12 disqualification<br>• Disqualification if receiving any other scholarship/fee reimbursement |
| `pm-vidyalaxmi` | **Pradhan Mantri Vidyalaxmi**<br>*Department of Higher Education, Ministry of Education, GoI* | [pmvidyalaxmi.co.in](https://pmvidyalaxmi.co.in/)<br>[PM Vidyalaxmi Guidelines](https://www.education.gov.in/sites/upload_files/mhrd/files/document-reports/PM_Vidyalaxmi_Scheme_Guidelines.pdf)<br>[Public FAQs](https://pmvidyalaxmi.co.in/PublicFaq.aspx) | `needs_review` | 2026-10-31 | `null` | Verify current eligible Quality Higher Education Institutions (QHEI) list. Confirm 3% interest subvention claim window and annual national beneficiary cap. Confirm interaction with PM-USP CSIS full subvention route. | • Exact QHEI status of admitted college<br>• Merit admission vs management quota (management excluded)<br>• Active education loan requirement up to ₹10L<br>• Disqualification from interest subvention if receiving other scholarship/subvention |
| `pm-kisan` | **PM-KISAN Samman Nidhi**<br>*Ministry of Agriculture & Farmers Welfare, GoI* | [pmkisan.gov.in](https://pmkisan.gov.in/)<br>[Operational Guidelines PDF](https://pmkisan.gov.in/Documents/RevisedPM-KISANOperationalGuidelines%28English%29.pdf)<br>[Registration Portal](https://www.pmkisan.gov.in/RegistrationFormupdated.aspx) | `needs_review` | 2026-10-31 | `null` | Check updated operational circulars post-2020. Confirm Gujarat state RoR 7/12 & 8-A mutation procedures and DBT Aadhaar-seeding guidelines. Verify that no income ceiling is enforced. | • Landownership cut-off date (1 Feb 2019) & inheritance exception<br>• Statutory exclusion flags (taxpayers, institutional landholders, pensioners ≥₹10K, professionals)<br>• Multiple benefits in single family restriction<br>• Mandatory eKYC status |
| `ikhedut-wire-fencing` | **i-Khedut Wire Fencing Assistance (Tar ni Vad)**<br>*Agriculture, Farmers Welfare & Co-operation Dept, Govt. of Gujarat* | [ikhedut.gujarat.gov.in](https://ikhedut.gujarat.gov.in/site/home)<br>[Public Scheme Portal](https://ikhedut.gujarat.gov.in/iKhedutPublicScheme/) | `needs_review` | 2026-10-31 | `null` | Inspect active component circular on i-Khedut portal. Confirm running-meter subsidy rate, group vs individual farmer application rules, and 10-day document submission window to District Agriculture Officer. | • Active application window (portal is seasonal)<br>• Demarcated survey map & physical geo-tagging<br>• Minimum land cluster / area conditions<br>• Human sign-off required before displaying subsidy figures |
| `ignoa-vayvandana` | **Indira Gandhi National Old Age Pension (Vay Vandana)**<br>*Directorate of Social Defense, Govt. of Gujarat* | [sje.gujarat.gov.in](https://sje.gujarat.gov.in/dsd/Schemes/2208?lang=English) | `needs_review` | 2026-10-31 | `null` | Verify Mamlatdar offline submission procedure and rural vs urban BPL list score (0–20) certification. Confirm monthly slab: ₹750/month (age 60–79) and ₹1,000/month (age 80+). | • Exact BPL census score 0–20 proof (ration card alone does not prove score)<br>• Concurrency with state pensions (alternative, not stackable) |
| `niradhar-vriddha` | **Niradhar Vriddha Pension Yojana**<br>*Directorate of Social Defense, Govt. of Gujarat* | [sje.gujarat.gov.in/dsd](https://sje.gujarat.gov.in/dsd/schemes/2212?lang=english)<br>[Digital Gujarat Portal](https://www.digitalgujarat.gov.in/)<br>[Digital Seva Setu](https://digitalsevasetu.gujarat.gov.in/SchemPortal/ServiceGroup.aspx) | `needs_review` | 2026-10-31 | `null` | Verify latest portal update (checked 30 Oct 2026). Verify 10-year Gujarat domicile rule and income ceilings (₹1,20,000 rural / ₹1,50,000 urban). Confirm ₹1,000/month (60–79) and ₹1,250/month (80+) slabs. | • Income route vs BPL route logical OR (not flat AND)<br>• "No adult son/grandson aged 21+" condition & exceptions<br>• 10-year continuous Gujarat residence proof<br>• Rural vs urban residency classification |
| `ganga-swarupa` | **Ganga Swarupa Pension Scheme (Widow Pension)**<br>*Women & Child Development Dept, Govt. of Gujarat* | [wcd.gujarat.gov.in](https://wcd.gujarat.gov.in/initiativedetails?id=231)<br>[WCD Posts Overview](https://wcd.gujarat.gov.in/posts?id=452) | `needs_review` | 2026-10-31 | `null` | Verify Taluka Mamlatdar application procedure and post office DBT deposit terms. Confirm removal of the previous rule terminating pension when son turns 21. | • Evaluation subject must be widowed female (e.g. Meenaben), not household head<br>• Exact annual family income ≤₹1,20,000 (rural) / ≤₹1,50,000 (urban)<br>• Husband death certificate & non-remarriage verification |

---

## 2. Cross-Scheme Warnings & Non-Stacking Rules

1. **Student Scheme Restrictions (Pooja):**
   - **CSSS (`pm-usp-csss`)** strictly requires that the beneficiary must **not** be receiving any other scholarship or fee reimbursement.
   - **PM-Vidyalaxmi (`pm-vidyalaxmi`)** guidelines exclude students receiving another Central/State scholarship or other interest-subvention from the 3% subvention / credit-guarantee benefits.
   - **MYSY (`mysy`)** and **CSSS** cannot be stacked simultaneously for tuition assistance.
   - *Engine rule:* Show these as alternatives or warn the user that choosing one may disqualify the other.

2. **Senior Pension Concurrency (Kantilal):**
   - **IGNOAPS (`ignoa-vayvandana`)** and **Niradhar Vriddha (`niradhar-vriddha`)** overlap significantly.
   - Do **not** sum these benefits or imply concurrent monthly payouts. Treat them as alternative application routes (national BPL route vs state income/BPL route) until the Mamlatdar confirms concurrency rules.

3. **Beneficiary Subject Targeting (Meenaben):**
   - **Ganga Swarupa Pension (`ganga-swarupa`)** must be evaluated against the individual widowed female family member (**Meenaben**), *not* against the household head (**Kantilal**).
   - In accordance with AGENT.md Section 7, the engine builds an `EvaluationSubject` for `member-daughter-in-law` combining her individual `PersonFacts` with the shared `HouseholdFacts`.

4. **Farmer Scheme Realities (Rameshbhai):**
   - **PM-KISAN (`pm-kisan`)** has **no** general household income ceiling. Eligibility is determined strictly by cultivable landownership cut-off (1 Feb 2019) and statutory exclusions (income tax payers, constitutional officeholders).
   - **i-Khedut Wire Fencing (`ikhedut-wire-fencing`)** is window-dependent and component-specific. Never show an active "Apply Now" link or firm subsidy quote without verified window status.

---

## 3. Persona Gaps & Unexpressible Fields

The following fields are not currently captured in the core `PROFILE_FIELDS` registry and must be collected conditionally or verified manually:

```typescript
interface AdditionalSchemeFacts {
  class12Board?: string | null
  class12Stream?: 'science' | 'general' | 'commerce' | 'arts' | 'other' | 'unknown'
  class12Percentile?: number | null
  currentCourseYear?: number | null
  studyMode?: 'regular' | 'distance' | 'correspondence' | 'unknown'
  tookDropAfterClass12?: 'yes' | 'no' | 'unknown'
  receivesOtherScholarship?: 'yes' | 'no' | 'unknown'
  hasEducationLoan?: 'yes' | 'no' | 'unknown'
  admissionMode?: 'merit' | 'management' | 'other' | 'unknown'
  qheiStatus?: 'yes' | 'no' | 'unknown'
  nameOnCultivableLandRecord?: 'yes' | 'no' | 'unknown'
  landAcquisitionDate?: string | null
  landOwnershipByCutoff?: 'yes' | 'no' | 'inheritance_exception' | 'unknown'
  pmKisanExclusionFlag?: 'yes' | 'no' | 'unknown'
  anotherFamilyMemberReceivesPmKisan?: 'yes' | 'no' | 'unknown'
  eKycStatus?: 'complete' | 'pending' | 'unknown'
  residenceType?: 'rural' | 'urban' | 'unknown'
  bplOfficialProof?: 'yes' | 'no' | 'unknown'
  ruralBplScore?: number | null
  urbanBplListProof?: 'yes' | 'no' | 'unknown'
  annualFamilyIncomeExact?: number | null
  gujaratResidenceYears?: number | null
  hasSonOrGrandsonAge21Plus?: 'yes' | 'no' | 'unknown'
  widowStatusProof?: 'yes' | 'no' | 'unknown'
  husbandDeathCertificateAvailable?: 'yes' | 'no' | 'unknown'
  alreadyReceivesOldAgePension?: 'yes' | 'no' | 'unknown'
  ikhedutComponentWindowOpen?: 'yes' | 'no' | 'unknown'
  surveyNumberAvailable?: 'yes' | 'no' | 'unknown'
  landDemarcationMapAvailable?: 'yes' | 'no' | 'unknown'
}
```

---

## 4. Human Sign-Off Checklist

Before upgrading any record from `verification.status: "needs_review"` to `"verified"`:

- [ ] A human team member independently accessed the official government portal URL.
- [ ] Confirmed the latest Government Resolution (GR), Gazette notification, or Academic Year guidelines.
- [ ] Verified that the application URL and portal submission steps are active and accurate.
- [ ] Confirmed route-specific document checklists and benefit calculation formulas.
- [ ] Recorded reviewer full name/initials and exact verification timestamp (`lastVerifiedAt`).
- [ ] Saved an offline copy (PDF / screenshot) of the official source in repository records.

**Recommended Sign-Off Priority Order:**
1. `mysy` (Mukhyamantri Yuva Swavalamban Yojana)
2. `ganga-swarupa` (Ganga Swarupa Pension Scheme)
3. `niradhar-vriddha` (Niradhar Vriddha Pension Yojana)
4. `pm-kisan` (PM-KISAN Samman Nidhi)
5. `pm-usp-csss`
6. `pm-vidyalaxmi`
7. `ignoa-vayvandana`
8. `ikhedut-wire-fencing` (Requires seasonal window confirmation on i-Khedut portal)

---

## 5. UI Presentation & Guidance Disclaimer

Every screen displaying matching benefits must clearly show:

> **Official Decision Notice:** *"This application provides guidance based on official scheme rules. The respective government department makes the final decision on scheme approval and disbursement."*

Under no circumstances should the application collect Aadhaar numbers, OTPs, net banking passwords, or payment PINs.
