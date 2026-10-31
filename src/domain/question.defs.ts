import type { RuleField, LocalisedText, BeneficiaryProfile, Language } from './profile.types'
import type { SchemeRecord } from './scheme.types'

export interface QuestionOption {
  value: unknown
  label: LocalisedText
}

export interface QuestionDef {
  field: RuleField
  title: LocalisedText
  helperText?: LocalisedText
  options: QuestionOption[]
  askWhen?: (profile: Partial<BeneficiaryProfile>) => boolean
  inputType?: 'radio' | 'number'
}

export const QUESTION_DEFS: QuestionDef[] = [
  {
    field: 'residenceState',
    title: {
      en: 'What is your state of permanent residence?',
      gu: 'આપ કયા રાજ્યના કાયમી રહેવાસી છો?',
      hi: 'आप किस राज्य के स्थायी निवासी हैं?',
    },
    helperText: {
      en: 'State schemes in Gujarat require permanent Gujarat domicile.',
      gu: 'ગુજરાત સરકારની યોજનાઓ માટે ગુજરાતના કાયમી રહેવાસી હોવું જરૂરી છે.',
      hi: 'गुजरात सरकार की योजनाओं हेतु गुजरात का स्थायी निवासी होना आवश्यक है।',
    },
    options: [
      {
        value: 'Gujarat',
        label: {
          en: 'Gujarat',
          gu: 'ગુજરાત',
          hi: 'गुजरात',
        },
      },
      {
        value: 'Other',
        label: {
          en: 'Other State in India',
          gu: 'ભારતનું અન્ય રાજ્ય',
          hi: 'भारत का अन्य राज्य',
        },
      },
      {
        value: 'unknown',
        label: {
          en: "I don't know",
          gu: 'મને ખાતરી નથી',
          hi: 'मुझे जानकारी नहीं है',
        },
      },
    ],
  },
  {
    field: 'district',
    title: {
      en: 'Which district of Gujarat do you live in?',
      gu: 'આપ ગુજરાતના કયા જિલ્લામાં રહો છો?',
      hi: 'आप गुजरात के किस जिले में रहते हैं?',
    },
    helperText: {
      en: 'Helps determine district-level offices and agricultural assistance.',
      gu: 'જિલ્લા કચેરીઓ અને સ્થાનિક સહાય નક્કી કરવામાં મદદરૂપ થાય છે.',
      hi: 'जिला कार्यालयों एवं स्थानीय सहायता के निर्धारण में सहायक।',
    },
    askWhen: (p) => p.residenceState === 'Gujarat' || p.residenceState === undefined,
    options: [
      {
        value: 'Ahmedabad',
        label: { en: 'Ahmedabad', gu: 'અમદાવાદ', hi: 'अहमदाबाद' },
      },
      {
        value: 'Mehsana',
        label: { en: 'Mehsana', gu: 'મહેસાણા', hi: 'मेहसाणा' },
      },
      {
        value: 'Vadodara',
        label: { en: 'Vadodara', gu: 'વડોદરા', hi: 'वडोदरा' },
      },
      {
        value: 'Surat',
        label: { en: 'Surat', gu: 'સુરત', hi: 'सूरत' },
      },
      {
        value: 'Rajkot',
        label: { en: 'Rajkot', gu: 'રાજકોટ', hi: 'राजकोट' },
      },
      {
        value: 'Sabarkantha',
        label: { en: 'Sabarkantha', gu: 'સાબરકાંઠા', hi: 'साबरकांठा' },
      },
      {
        value: 'Banaskantha',
        label: { en: 'Banaskantha', gu: 'બનાસકાંઠા', hi: 'बनासकांठा' },
      },
      {
        value: 'Bhavnagar',
        label: { en: 'Bhavnagar', gu: 'ભાવનગર', hi: 'भावनगर' },
      },
      {
        value: 'Gandhinagar',
        label: { en: 'Gandhinagar', gu: 'ગાંધીનગર', hi: 'गांधीनगर' },
      },
      {
        value: 'Other District',
        label: { en: 'Other District in Gujarat', gu: 'ગુજરાતનો અન્ય જિલ્લો', hi: 'गुजरात का अन्य जिला' },
      },
      {
        value: null,
        label: { en: "I don't know", gu: 'મને ખાતરી નથી', hi: 'मुझे जानकारी नहीं है' },
      },
    ],
  },
  {
    field: 'occupation',
    title: {
      en: 'What is your primary occupation or current status?',
      gu: 'આપનો મુખ્ય વ્યવસાય કે હાલની સ્થિતિ શું છે?',
      hi: 'आपका मुख्य व्यवसाय या वर्तमान स्थिति क्या है?',
    },
    helperText: {
      en: 'Schemes are tailored for students, farmers, senior citizens, and workers.',
      gu: 'યોજનાઓ વિદ્યાર્થીઓ, ખેડૂતો, વડીલો અને શ્રમિકો માટે અલગ અલગ હોય છે.',
      hi: 'योजनाएं विद्यार्थियों, किसानों, वरिष्ठ नागरिकों एवं श्रमिकों हेतु विशिष्ट होती हैं।',
    },
    options: [
      {
        value: 'student',
        label: {
          en: 'Student (enrolled in school, college, or diploma)',
          gu: 'વિદ્યાર્થી (શાળા, કોલેજ કે ડિપ્લોમા અભ્યાસ)',
          hi: 'विद्यार्थी (स्कूल, कॉलेज या डिप्लोमा में अध्ययनरत)',
        },
      },
      {
        value: 'farmer',
        label: {
          en: 'Farmer / Agricultural worker',
          gu: 'ખેડૂત / કૃષિ કાર્ય',
          hi: 'किसान / कृषि कार्य',
        },
      },
      {
        value: 'retired_or_senior',
        label: {
          en: 'Senior Citizen / Retired',
          gu: 'વરિષ્ઠ નાગરિક / નિવૃત્ત વડીલ',
          hi: 'वरिष्ठ नागरिक / सेवानिवृत्त',
        },
      },
      {
        value: 'homemaker',
        label: {
          en: 'Homemaker',
          gu: 'ગૃહિણી',
          hi: 'गृहिणी',
        },
      },
      {
        value: 'salaried',
        label: {
          en: 'Salaried Employee (Private or Public)',
          gu: 'નોકરીયાત (ખાનગી કે સરકારી)',
          hi: 'वेतनभोगी कर्मचारी (निजी या सरकारी)',
        },
      },
      {
        value: 'self_employed',
        label: {
          en: 'Self-employed / Artisan / Small Business',
          gu: 'સ્વરોજગાર / કારીગર / નાનો વ્યવસાય',
          hi: 'स्वरोजगार / कारीगर / लघु व्यवसाय',
        },
      },
      {
        value: 'unemployed',
        label: {
          en: 'Unemployed / Looking for work',
          gu: 'બેરોજગાર / રોજગારની શોધમાં',
          hi: 'बेरोजगार / कार्य की तलाश में',
        },
      },
      {
        value: 'other',
        label: {
          en: 'Other occupation',
          gu: 'અન્ય વ્યવસાય',
          hi: 'अन्य व्यवसाय',
        },
      },
      {
        value: 'unknown',
        label: {
          en: "I don't know",
          gu: 'મને ખાતરી નથી',
          hi: 'मुझे जानकारी नहीं है',
        },
      },
    ],
  },
  {
    field: 'educationLevel',
    title: {
      en: 'What is your current education level?',
      gu: 'આપનો હાલનો અભ્યાસ કયા સ્તરે છે?',
      hi: 'आपका वर्तमान शिक्षा स्तर क्या है?',
    },
    helperText: {
      en: 'Higher education scholarships depend on course type and enrollment.',
      gu: 'ઉચ્ચ શિક્ષણ શિષ્યવૃત્તિઓ અભ્યાસક્રમના પ્રકાર પર આધાર રાખે છે.',
      hi: 'उच्च शिक्षा छात्रवृत्तियां पाठ्यक्रम प्रकार पर निर्भर करती हैं।',
    },
    askWhen: (p) => p.occupation === 'student',
    options: [
      {
        value: 'undergraduate',
        label: {
          en: 'Undergraduate Degree (BA, BCom, BSc, BTech, MBBS, etc.)',
          gu: 'સ્નાતક ડિગ્રી (બી.એ., બી.કોમ., બી.એસસી., બી.ટેક., વગેરે)',
          hi: 'स्नातक डिग्री (बी.ए., बी.कॉम, बी.एससी, बी.टेक, आदि)',
        },
      },
      {
        value: 'diploma_or_iti',
        label: {
          en: 'Diploma / ITI course',
          gu: 'ડિપ્લોમા / આઈ.ટી.આઈ. અભ્યાસક્રમ',
          hi: 'डिप्लोमा / आईटीआई पाठ्यक्रम',
        },
      },
      {
        value: 'postgraduate',
        label: {
          en: 'Postgraduate Degree (MA, MCom, MSc, MTech, etc.)',
          gu: 'અનુસ્નાતક ડિગ્રી (એમ.એ., એમ.કોમ., એમ.એસસી., વગેરે)',
          hi: 'स्नातकोत्तर डिग्री (एम.ए., एम.कॉम, एम.एससी, आदि)',
        },
      },
      {
        value: 'class_11_12',
        label: {
          en: 'Higher Secondary (Class 11 or 12)',
          gu: 'ઉચ્ચતર માધ્યમિક (ધોરણ ૧૧ અથવા ૧૨)',
          hi: 'उच्चतर माध्यमिक (कक्षा 11 या 12)',
        },
      },
      {
        value: 'class_8_to_10',
        label: {
          en: 'Secondary (Class 8 to 10)',
          gu: 'માધ્યમિક (ધોરણ ૮ થી ૧૦)',
          hi: 'माध्यमिक (कक्षा 8 से 10)',
        },
      },
      {
        value: 'below_class_8',
        label: {
          en: 'Primary (Below Class 8)',
          gu: 'પ્રાથમિક (ધોરણ ૮ થી નીચે)',
          hi: 'प्राथमिक (कक्षा 8 से नीचे)',
        },
      },
      {
        value: 'unknown',
        label: {
          en: "I don't know",
          gu: 'મને ખાતરી નથી',
          hi: 'मुझे जानकारी नहीं है',
        },
      },
    ],
  },
  {
    field: 'ownsAgriculturalLand',
    title: {
      en: 'Does your family own cultivable agricultural land in Gujarat?',
      gu: 'શું આપના પરિવાર પાસે ગુજરાતમાં ખેતીલાયક જમીન છે?',
      hi: 'क्या आपके परिवार के पास गुजरात में कृषि योग्य भूमि है?',
    },
    helperText: {
      en: 'PM-KISAN and i-Khedut assistance require cultivable land in State records (7/12 & 8-A).',
      gu: 'પીએમ-કિસાન અને આઇ-ખેડૂત યોજનાઓ માટે જમીન રેકોર્ડ (૭/૧૨ અને ૮-અ) માં નામ હોવું જરૂરી છે.',
      hi: 'पीएम-किसान एवं आई-खेड़ूत योजनाओं हेतु भूमि अभिलेखों (7/12 और 8-A) में नाम आवश्यक है।',
    },
    askWhen: (p) => p.occupation === 'farmer',
    options: [
      {
        value: 'yes',
        label: {
          en: 'Yes, family owns cultivable agricultural land',
          gu: 'હા, પરિવાર પાસે ખેતીલાયક જમીન છે',
          hi: 'हाँ, परिवार के पास कृषि योग्य भूमि है',
        },
      },
      {
        value: 'no',
        label: {
          en: 'No, we do not own agricultural land',
          gu: 'ના, અમારી પાસે ખેતીની જમીન નથી',
          hi: 'नहीं, हमारे पास कृषि भूमि नहीं है',
        },
      },
      {
        value: 'unknown',
        label: {
          en: "I don't know / Land title pending",
          gu: 'મને ખાતરી નથી / જમીન નોંધણી પેન્ડિંગ છે',
          hi: 'मुझे जानकारी नहीं है / भूमि नामान्तरण लंबित है',
        },
      },
    ],
  },
  {
    field: 'age',
    title: {
      en: 'What is your age in completed years?',
      gu: 'આપની ઉંમર પૂરા થયેલ વર્ષોમાં કેટલી છે?',
      hi: 'आपकी आयु पूर्ण वर्षों में कितनी है?',
    },
    helperText: {
      en: 'Old age pensions require 60+; widow pension requires 18+.',
      gu: 'વૃદ્ધ પેન્શન માટે ૬૦+ વર્ષ અને વિધવા સહાય માટે ૧૮+ વર્ષ જરૂરી છે.',
      hi: 'वृद्धावस्था पेंशन हेतु 60+ वर्ष एवं विधवा सहायता हेतु 18+ वर्ष आवश्यक है।',
    },
    options: [
      {
        value: 19,
        label: { en: '18 to 25 years (Youth / Student)', gu: '૧૮ થી ૨૫ વર્ષ (યુવા / વિદ્યાર્થી)', hi: '18 से 25 वर्ष (युवा / विद्यार्थी)' },
      },
      {
        value: 40,
        label: { en: '26 to 59 years (Adult)', gu: '૨૬ થી ૫૯ વર્ષ (પુખ્ત)', hi: '26 से 59 वर्ष (वयस्क)' },
      },
      {
        value: 65,
        label: { en: '60 to 79 years (Senior Citizen)', gu: '૬૦ થી ૭૯ વર્ષ (વરિષ્ઠ નાગરિક)', hi: '60 से 79 वर्ष (वरिष्ठ नागरिक)' },
      },
      {
        value: 82,
        label: { en: '80 years or above (Super Senior)', gu: '૮૦ વર્ષ કે તેથી વધુ (અતિ વરિષ્ઠ નાગરિક)', hi: '80 वर्ष या अधिक (अति वरिष्ठ नागरिक)' },
      },
      {
        value: null,
        label: { en: "I don't know", gu: 'મને ખાતરી નથી', hi: 'मुझे जानकारी नहीं है' },
      },
    ],
  },
  {
    field: 'gender',
    title: {
      en: 'What is your gender?',
      gu: 'આપનું લિંગ શું છે?',
      hi: 'आपका लिंग क्या है?',
    },
    helperText: {
      en: 'Certain schemes like Ganga Swarupa pension are reserved exclusively for women.',
      gu: 'ગંગા સ્વરૂપા પેન્શન જેવી યોજનાઓ ખાસ મહિલાઓ માટે અનામત છે.',
      hi: 'गंगा स्वरूपा पेंशन जैसी योजनाएं विशेष रूप से महिलाओं हेतु आरक्षित हैं।',
    },
    options: [
      {
        value: 'female',
        label: { en: 'Female', gu: 'મહિલા / સ્ત્રી', hi: 'महिला' },
      },
      {
        value: 'male',
        label: { en: 'Male', gu: 'પુરુષ', hi: 'पुरुष' },
      },
      {
        value: 'other',
        label: { en: 'Other gender', gu: 'અન્ય', hi: 'अन्य' },
      },
      {
        value: 'unknown',
        label: { en: 'Prefer not to say / I don\'t know', gu: 'કહેવા માંગતા નથી / ખાતરી નથી', hi: 'बताना नहीं चाहते / जानकारी नहीं है' },
      },
    ],
  },
  {
    field: 'maritalStatus',
    title: {
      en: 'What is your marital status?',
      gu: 'આપની વૈવાહિક સ્થિતિ શું છે?',
      hi: 'आपकी वैवाहिक स्थिति क्या है?',
    },
    helperText: {
      en: 'Widow pension schemes require widowed status with death certificate.',
      gu: 'વિધવા પેન્શન માટે વિધવા સ્થિતિ અને પતિના અવસાનનું પ્રમાણપત્ર જરૂરી છે.',
      hi: 'विधवा पेंशन हेतु विधवा स्थिति एवं मृत्यु प्रमाण पत्र आवश्यक है।',
    },
    options: [
      {
        value: 'single',
        label: { en: 'Single / Unmarried', gu: 'અપરિણીત', hi: 'अविवाहित' },
      },
      {
        value: 'married',
        label: { en: 'Married', gu: 'પરિણીત', hi: 'विवाहित' },
      },
      {
        value: 'widowed',
        label: { en: 'Widowed (Ganga Swarupa)', gu: 'વિધવા (ગંગા સ્વરૂપા)', hi: 'विधवा (गंगा स्वरूपा)' },
      },
      {
        value: 'divorced_or_separated',
        label: { en: 'Divorced or Separated', gu: 'છૂટાછેડા લીધેલ / અલગ રહેતા', hi: 'तलाकशुदा या अलग रहने वाले' },
      },
      {
        value: 'unknown',
        label: { en: "I don't know", gu: 'મને ખાતરી નથી', hi: 'मुझे जानकारी नहीं है' },
      },
    ],
  },
  {
    field: 'annualHouseholdIncome',
    title: {
      en: 'What is your approximate yearly household income?',
      gu: 'આપના કુટુંબની અંદાજિત વાર્ષિક આવક કેટલી છે?',
      hi: 'आपके परिवार की अनुमानित वार्षिक आय कितनी है?',
    },
    helperText: {
      en: 'A rough range is fine. Exact income will be confirmed via income certificate.',
      gu: 'અંદાજિત ગાળો પૂરતો છે. ચોક્કસ આવક પ્રમાણપત્ર દ્વારા ચકાસવામાં આવશે.',
      hi: 'अनुमानित सीमा पर्याप्त है। सटीक आय प्रमाण पत्र द्वारा जाँची जाएगी।',
    },
    options: [
      {
        value: 'under_1l',
        label: {
          en: 'Under ₹1,00,000 (Low income / BPL band)',
          gu: '₹૧,૦૦,૦૦૦ થી ઓછી (ઓછી આવક / બીપીએલ ગાળો)',
          hi: '₹1,00,000 से कम (निम्न आय / बीपीएल स्तर)',
        },
      },
      {
        value: '1l_2_5l',
        label: {
          en: '₹1,00,000 to ₹2,50,000',
          gu: '₹૧,૦૦,૦૦૦ થી ₹૨,૫૦,૦૦૦',
          hi: '₹1,00,000 से ₹2,50,000',
        },
      },
      {
        value: '2_5l_5l',
        label: {
          en: '₹2,50,000 to ₹5,00,000',
          gu: '₹૨,૫૦,૦૦૦ થી ₹૫,૦૦,૦૦૦',
          hi: '₹2,50,000 से ₹5,00,000',
        },
      },
      {
        value: 'above_5l',
        label: {
          en: 'Above ₹5,00,000',
          gu: '₹૫,૦૦,૦૦૦ થી વધુ',
          hi: '₹5,00,000 से अधिक',
        },
      },
      {
        value: 'unknown',
        label: {
          en: "I don't know",
          gu: 'મને ખાતરી નથી',
          hi: 'मुझे जानकारी नहीं है',
        },
      },
    ],
  },
  {
    field: 'rationCardType',
    title: {
      en: 'What type of ration card does your household hold?',
      gu: 'આપનું કુટુંબ કયા પ્રકારનું રેશન કાર્ડ ધરાવે છે?',
      hi: 'आपके परिवार के पास किस प्रकार का राशन कार्ड है?',
    },
    helperText: {
      en: 'Antyodaya and BPL cards qualify for old age assistance and food support.',
      gu: 'અંત્યોદય અને બીપીએલ કાર્ડ વૃદ્ધ પેન્શન અને અનાજ સહાય માટે માન્ય છે.',
      hi: 'अंत्योदय एवं बीपीएल कार्ड वृद्धावस्था सहायता हेतु मान्य हैं।',
    },
    options: [
      {
        value: 'bpl',
        label: { en: 'BPL (Below Poverty Line)', gu: 'બીપીએલ (ગરીબી રેખા હેઠળ)', hi: 'बीपीएल (गरीबी रेखा से नीचे)' },
      },
      {
        value: 'aay',
        label: { en: 'AAY (Antyodaya Anna Yojana)', gu: 'અંત્યોદય અન્ન યોજના (AAY)', hi: 'अंत्योदय अन्न योजना (AAY)' },
      },
      {
        value: 'apl',
        label: { en: 'APL (Above Poverty Line)', gu: 'એપીએલ (ગરીબી રેખા ઉપર)', hi: 'एपीएल (गरीबी रेखा से ऊपर)' },
      },
      {
        value: 'none',
        label: { en: 'No Ration Card', gu: 'રેશન કાર્ડ નથી', hi: 'कोई राशन कार्ड नहीं है' },
      },
      {
        value: 'unknown',
        label: { en: "I don't know", gu: 'મને ખાતરી નથી', hi: 'मुझे जानकारी नहीं है' },
      },
    ],
  },
]

/**
 * Returns the set of RuleFields referenced in the active loaded schemes.
 */
export function getReferencedRuleFields(schemes: SchemeRecord[]): Set<RuleField> {
  const fields = new Set<RuleField>()
  for (const scheme of schemes) {
    for (const rule of scheme.rules) {
      fields.add(rule.field)
    }
  }
  // District is essential for geographic resolution
  fields.add('district')
  return fields
}

/**
 * Derives the active list of questions based on loaded schemes and the current answers profile.
 * Questions only appear if referenced by at least one scheme and their askWhen predicate holds.
 */
export function getActiveQuestions(
  schemes: SchemeRecord[],
  profile: Partial<BeneficiaryProfile>
): QuestionDef[] {
  const referenced = getReferencedRuleFields(schemes)

  return QUESTION_DEFS.filter((q) => {
    if (!referenced.has(q.field)) return false
    if (q.askWhen && !q.askWhen(profile)) return false
    return true
  })
}

/**
 * Helper to get human-readable formatted string for an answer value.
 */
export function formatAnswerValue(
  field: RuleField,
  val: unknown,
  language: Language
): string {
  if (val === null || val === undefined || val === 'unknown') {
    return language === 'gu' ? 'માહિતી આપેલ નથી' : language === 'hi' ? 'जानकारी नहीं दी गई' : 'Not provided'
  }

  const def = QUESTION_DEFS.find((q) => q.field === field)
  if (def) {
    const opt = def.options.find((o) => o.value === val)
    if (opt) return opt.label[language] ?? opt.label.en
  }

  if (typeof val === 'number') {
    return `${val} ${language === 'gu' ? 'વર્ષ' : language === 'hi' ? 'वर्ष' : 'years'}`
  }

  return String(val)
}
