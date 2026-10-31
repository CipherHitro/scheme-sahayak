# Phase 12 — Gujarati and Hindi Native-Speaker Review Notes

> **Status:** `official_source_checked_human_signoff_pending`  
> **Source Locale:** English (`en.json`)  
> **Target Locales:** Gujarati (`gu.json`) and Hindi (`hi.json`)  
> **Date:** 2026-10-31  
> **Notice Display:** Displayed in the prototype banner on all screens when Gujarati or Hindi is active.

All translations in this repository are functional prototype translations created for the demonstration of Gujarat SchemeSahayak. While legal and programmatic terms were cross-referenced with Gujarat government portals (Digital Gujarat, MYSY, SJE DSD, and PM-KISAN), formal administrative sign-off by a native Gujarati and Hindi speaker is required before production deployment.

---

## 1. Key Terminology Flagged for Native-Speaker Validation

| English Term | Gujarati Staged Copy | Hindi Staged Copy | Administrative Notes for Native Reviewer |
| :--- | :--- | :--- | :--- |
| **SchemeSahayak** | યોજના સહાયક | योजना सहायक | Core brand name meaning "Scheme Assistant / Guide". |
| **Likely eligible** | પાત્રતાની શક્યતા વધુ | पात्र होने की उच्च संभावना | Indicates all known criteria pass without implying final official sanction. |
| **Possibly eligible** | સંભવિત પાત્ર | संभवतः पात्र | Indicates some criteria require documentation verification. |
| **Needs checking** | ચકાસણી જરૂરી | सत्यापन आवश्यक | Used when self-reported income straddles eligibility thresholds. |
| **Not matching right now** | હાલમાં મેળ ખાતું નથી | वर्तमान में मेल नहीं खाता | Respectful wording indicating non-qualification without discouraging the citizen. |
| **Where to get it** | ક્યાંથી મેળવવું | कहाँ से प्राप्त करें | Step-by-step guidance for obtaining required government certificates. |
| **Read from sample certificate** | નમૂના પ્રમાણપત્રમાંથી વાંચેલ | नमूना प्रमाण पत्र से पढ़ा गया | Honest disclosure that document reading is simulated from synthetic demo data. |
| **Informed Beneficiary Consent** | લાભાર્થીની સંમતિ અનિવાર્ય | लाभार्थी की सूचित सहमति अनिवार्य | Used in CSC/helper mode to mandate verbal/written citizen permission. |
| **Local temporary record** | સ્થાનિક કામચલાઉ નોંધણી | स्थानीय अस्थायी रिकॉर्ड | Confirms data is stored only in browser memory/localStorage; no cloud sync. |

---

## 2. Scheme-Specific Names & Department Formulations

| Scheme ID | English Formulation | Gujarati Staged Name | Verification Source Checked |
| :--- | :--- | :--- | :--- |
| `mysy` | Mukhyamantri Yuva Swavalamban Yojana | મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના (MYSY) | [mysy.guj.nic.in](https://mysy.guj.nic.in/) |
| `pm-kisan` | PM-KISAN Samman Nidhi | પીએમ-કિસાન સન્માન નિધિ યોજના | [pmkisan.gov.in](https://pmkisan.gov.in/) |
| `ignoa-vayvandana` | Indira Gandhi National Old Age Pension (Vay Vandana) | ઇન્દિરા ગાંધી રાષ્ટ્રીય વૃદ્ધ પેન્શન યોજના (વય વંદના) | [sje.gujarat.gov.in](https://sje.gujarat.gov.in/dsd/) |
| `niradhar-vriddha` | Niradhar Vriddha Pension Yojana | નિરાધાર વૃદ્ધ પેન્શન યોજના | [sje.gujarat.gov.in](https://sje.gujarat.gov.in/dsd/) |
| `gangaswarupa-vidhva` | Ganga Swarupa Vidhva Sahay | ગંગા સ્વરૂપા વિધવા સહાય યોજના | [sje.gujarat.gov.in](https://sje.gujarat.gov.in/dsd/) |
| `digital-gujarat-scholarship` | Digital Gujarat Post Matric Scholarship | ડિજિટલ ગુજરાત પોસ્ટ મેટ્રિક સ્કોલરશિપ | [digitalgujarat.gov.in](https://www.digitalgujarat.gov.in/) |

---

## 3. UI Strings Requiring Contextual Checking on Device

1. **Pluralisation in Gujarati:**
   - `"missingDocsBadge": "{count} દસ્તાવેજો બાકી છે"`: In Gujarati, count-based pluralisation remains consistent with "દસ્તાવેજો".
   - `"resultsCount": "{count} / {total} યોજનાઓ દર્શાવેલ છે"`: Verified readable on 360px and 390px viewports without wrapping clumsily.

2. **Income Threshold Warning (Straddle):**
   - English: `"Your income band falls across the ₹{limit} threshold. Please confirm with your income certificate."`
   - Gujarati: `"આપનું આવક જૂથ ₹{limit} ની મર્યાદા વચ્ચે આવે છે. કૃપા કરીને આવકના પ્રમાણપત્ર સાથે ખાતરી કરો."`
   - Hindi: `"आपका आय वर्ग ₹{limit} की सीमा के आर-पार आता है। कृपया अपने आय प्रमाण पत्र से पुष्टि करें।"`

3. **Helper Mode Consent Disclaimer:**
   - Helpers (CSC operators, e-Gram Mitra, NGO workers) see an upfront banner:
     *"Informed Beneficiary Consent Required: Helpers must obtain informed consent from the head of household before entering family information. All records displayed here are fictional sample households for demonstration."*
   - Localized consistently across all 3 locales in `helper.consentNoticeTitle` and `helper.consentNoticeDesc`.
