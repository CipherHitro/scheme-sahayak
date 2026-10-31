import type { SchemeRecord } from '../domain/scheme.types'

export const SCHEMES_DATASET: SchemeRecord[] = [
  {
    id: 'mysy-gujarat',
    name: {
      en: 'Mukhyamantri Yuva Swavalamban Yojana (MYSY)',
      gu: 'મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના (MYSY)',
      hi: 'मुख्यमंत्री युवा स्वावलंबन योजना (MYSY)',
    },
    department: {
      en: 'Education Department, Government of Gujarat',
      gu: 'શિક્ષણ વિભાગ, ગુજરાત સરકાર',
      hi: 'शिक्षा विभाग, गुजरात सरकार',
    },
    summary: {
      en: 'Financial assistance for tuition fees, hostel allowance, and book grants for higher education students.',
      gu: 'ઉચ્ચ શિક્ષણના વિદ્યાર્થીઓ માટે ટ્યુશન ફી, હોસ્ટેલ સહાય અને પુસ્તક ખરીદી સહાય.',
      hi: 'उच्च शिक्षा के विद्यार्थियों के लिए ट्यूशन फीस, हॉस्टल और पुस्तक सहायता।',
    },
    benefitDescription: {
      en: '50% tuition fee assistance (up to ₹2,00,000 for Medical/Dental, up to ₹50,000 for Engineering/Professional courses) plus ₹1,200/month lodging.',
      gu: '૫૦% ટ્યુશન ફી સહાય (મેડિકલ માટે ₹૨,૦૦,૦૦૦ સુધી, એન્જિનિયરિંગ માટે ₹૫૦,૦૦૦ સુધી) અને માસિક ₹૧,૨૦૦ હોસ્ટેલ સહાય.',
      hi: '50% ट्यूशन फीस सहायता (मेडिकल हेतु अधिकतम ₹2,00,000, इंजीनियरिंग हेतु ₹50,000) तथा ₹1,200 मासिक हॉस्टल अनुदान।',
    },
    rules: [
      {
        id: 'rule-mysy-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Must be a resident of Gujarat',
          gu: 'ગુજરાતના કાયમી રહેવાસી હોવા જરૂરી',
          hi: 'गुजरात का स्थायी निवासी होना आवश्यक',
        },
        explanation: {
          en: 'Student must reside in Gujarat state.',
          gu: 'વિદ્યાર્થી ગુજરાત રાજ્યના રહેવાસી હોવા જોઈએ.',
          hi: 'विद्यार्थी गुजरात राज्य का निवासी होना चाहिए।',
        },
      },
      {
        id: 'rule-mysy-occupation',
        field: 'occupation',
        operator: 'eq',
        value: 'student',
        mandatory: true,
        label: {
          en: 'Must be currently enrolled as a student',
          gu: 'હાલમાં માન્ય અભ્યાસક્રમમાં વિદ્યાર્થી હોવા જરૂરી',
          hi: 'वर्तमान में मान्यता प्राप्त संस्थान में विद्यार्थी होना आवश्यक',
        },
      },
      {
        id: 'rule-mysy-income',
        field: 'annualHouseholdIncome',
        operator: 'in',
        value: ['under_1l', '1l_2_5l', '2_5l_5l'],
        mandatory: true,
        label: {
          en: 'Household annual income up to ₹6,00,000',
          gu: 'કુટુંબની વાર્ષિક આવક ₹૬,૦૦,૦૦૦ સુધી',
          hi: 'परिवार की वार्षिक आय ₹6,00,000 तक',
        },
        explanation: {
          en: 'Income bands up to ₹5L qualify under the state ceiling.',
          gu: 'રાજ્યની મર્યાદા હેઠળ ₹૫ લાખ સુધીના આવક જૂથો પાત્ર ગણાય છે.',
          hi: 'राज्य सीमा के अनुसार ₹5 लाख तक के आय वर्ग पात्र हैं।',
        },
      },
    ],
    requiredDocuments: [
      {
        id: 'doc-income',
        name: {
          en: 'Income Certificate (Competent Authority)',
          gu: 'મામલતદાર / તાલુકા વિકાસ અધિકારીનું આવકનું પ્રમાણપત્ર',
          hi: 'सक्षम प्राधिकारी का आय प्रमाण पत्र',
        },
        helpText: {
          en: 'Issued by Mamlatdar / TDO in Gujarat, valid for 3 financial years.',
          gu: 'મામલતદાર અથવા ટીડીઓ દ્વારા આપવામાં આવેલ ૩ વર્ષની માન્યતા ધરાવતું પ્રમાણપત્ર.',
          hi: 'मामलतदार या टीडीओ द्वारा जारी 3 वित्तीय वर्षों के लिए मान्य प्रमाण पत्र।',
        },
        required: true,
        issuingAuthority: {
          en: 'Revenue Department / Jan Seva Kendra',
          gu: 'મહેસૂલ વિભાગ / જન સેવા કેન્દ્ર',
          hi: 'राजस्व विभाग / जन सेवा केंद्र',
        },
        whereToGet: {
          en: ['Visit local Jan Seva Kendra or apply online via Digital Gujarat portal.'],
          gu: ['સ્થાનિક જન સેવા કેન્દ્રની મુલાકાત લો અથવા Digital Gujarat પોર્ટલ પર ઓનલાઇન અરજી કરો.'],
          hi: ['स्थानीय जन सेवा केंद्र जाएं या Digital Gujarat पोर्टल पर ऑनलाइन आवेदन करें।'],
        },
      },
      {
        id: 'doc-admission',
        name: {
          en: 'College Admission Letter and Fee Receipt',
          gu: 'કોલેજ પ્રવેશ પત્ર અને ફી ની પહોંચ',
          hi: 'कॉलेज प्रवेश पत्र एवं शुल्क रसीद',
        },
        helpText: {
          en: 'Current academic year admission confirmation from accredited institute.',
          gu: 'ચાલુ શૈક્ષણિક વર્ષ માટે માન્યતા પ્રાપ્ત કોલેજની પ્રવેશ પહોંચ.',
          hi: 'चालू शैक्षणिक वर्ष हेतु मान्यता प्राप्त संस्थान की प्रवेश रसीद।',
        },
        required: true,
      },
    ],
    applicationSteps: {
      en: [
        'Register on official MYSY web portal (mysy.guj.nic.in)',
        'Fill student credentials and upload scanned certificates',
        'Verify documents physically at designated help centre (Help Centre list on portal)',
      ],
      gu: [
        'સત્તાવાર MYSY પોર્ટલ (mysy.guj.nic.in) પર વિદ્યાર્થી નોંધણી કરો',
        'વિગતો ભરો અને સ્કેન કરેલા દસ્તાવેજો અપલોડ કરો',
        'નજીકના નિયુક્ત સહાય કેન્દ્ર ખાતે અસલ દસ્તાવેજોની ચકાસણી કરાવો',
      ],
      hi: [
        'MYSY पोर्टल (mysy.guj.nic.in) पर विद्यार्थी पंजीकरण करें',
        'जानकारी भरें और स्कैन किए गए दस्तावेज़ अपलोड करें',
        'नामित सहायता केंद्र पर मूल दस्तावेजों का सत्यापन करवाएं',
      ],
    },
    applicationUrl: 'https://mysy.guj.nic.in/',
    sourceUrl: 'https://mysy.guj.nic.in/',
    lastVerifiedAt: '2026-10-15',
    version: '2026.1',
    verification: {
      status: 'verified',
      reviewer: 'Govt Portal Desk / Gujarat Higher Education Review',
      note: 'Verified against current Gujarat Higher Education GR guidelines.',
    },
  },
  {
    id: 'digital-gujarat-post-matric',
    name: {
      en: 'Post-Matric Scholarship for SC/ST/SEBC/EWS Students',
      gu: 'અનુસૂચિત જાતિ/જનજાતિ/સામાજિક-શૈક્ષણિક પછાત વર્ગ પોસ્ટ-મેટ્રિક શિષ્યવૃત્તિ',
      hi: 'एससी/एसटी/एसईबीसी/ईडब्ल्यूएस छात्रवृत्ति (पोस्ट-मैट्रिक)',
    },
    department: {
      en: 'Social Justice and Empowerment Department, Gujarat',
      gu: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ, ગુજરાત',
      hi: 'सामाजिक न्याय और अधिकारिता विभाग, गुजरात',
    },
    summary: {
      en: 'Government scholarship covering tuition reimbursement and maintenance allowance for post-secondary education.',
      gu: 'ધોરણ ૧૦ પછીના ઉચ્ચ શિક્ષણ માટે ટ્યુશન ફી અને નિભાવ ભથ્થાની શિષ્યવૃત્તિ સહાય.',
      hi: 'कक्षा 10 के बाद उच्च शिक्षा के लिए ट्यूशन शुल्क प्रतिपूर्ति और निर्वाह भत्ता।',
    },
    benefitDescription: {
      en: 'Full tuition reimbursement up to government ceilings plus ₹500 - ₹1,200 monthly allowance.',
      gu: 'સરકારી નિયમો મુજબ સંપૂર્ણ ટ્યુશન ફી સહાય અને ₹૫૦૦ થી ₹૧,૨૦૦ માસિક નિભાવ ભથ્થું.',
      hi: 'सरकारी नियमानुसार पूर्ण ट्यूशन फीस प्रतिपूर्ति और ₹500 से ₹1,200 मासिक भत्ता।',
    },
    rules: [
      {
        id: 'rule-dg-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Must reside in Gujarat',
          gu: 'ગુજરાતના રહેવાસી હોવા જરૂરી',
          hi: 'गुजरात के निवासी होना आवश्यक',
        },
      },
      {
        id: 'rule-dg-occupation',
        field: 'occupation',
        operator: 'eq',
        value: 'student',
        mandatory: true,
        label: {
          en: 'Enrolled in post-secondary education',
          gu: 'ધોરણ ૧૦ પછીના કોલેજ/ડિપ્લોમા અભ્યાસક્રમમાં પ્રવેશ',
          hi: 'कक्षा 10 के उपरांत कॉलेज/डिप्लोमा में नामांकित',
        },
      },
      {
        id: 'rule-dg-category',
        field: 'category',
        operator: 'in',
        value: ['sc', 'st', 'sebc', 'ews'],
        mandatory: true,
        label: {
          en: 'Belong to SC, ST, SEBC, or EWS category',
          gu: 'SC, ST, SEBC અથવા EWS વર્ગમાં આવતા હોવા જરૂરી',
          hi: 'SC, ST, SEBC अथवा EWS श्रेणी से संबद्ध',
        },
      },
      {
        id: 'rule-dg-income',
        field: 'annualHouseholdIncome',
        operator: 'in',
        value: ['under_1l', '1l_2_5l'],
        mandatory: true,
        label: {
          en: 'Household annual income under ₹2,50,000',
          gu: 'વાર્ષિક કૌટુંબિક આવક ₹૨,૫૦,૦૦૦ સુધી',
          hi: 'पारिवारिक वार्षिक आय ₹2,50,000 तक',
        },
      },
    ],
    requiredDocuments: [
      {
        id: 'doc-caste',
        name: {
          en: 'Caste / Category Certificate',
          gu: 'જાતિ / વર્ગનું પ્રમાણપત્ર',
          hi: 'जाति / वर्ग प्रमाण पत्र',
        },
        helpText: {
          en: 'Issued by competent revenue authority in Gujarat.',
          gu: 'ગુજરાતના સક્ષમ અધિકારી દ્વારા અપાયેલ જાતિ પ્રમાણપત્ર.',
          hi: 'गुजरात के सक्षम अधिकारी द्वारा जारी जाति प्रमाण पत्र।',
        },
        required: true,
      },
      {
        id: 'doc-income',
        name: {
          en: 'Income Certificate',
          gu: 'આવકનું પ્રમાણપત્ર',
          hi: 'आय प्रमाण पत्र',
        },
        helpText: {
          en: 'Current valid income certificate under ₹2.5L limit.',
          gu: '₹૨.૫ લાખની મર્યાદા હેઠળનું માન્ય આવકનું પ્રમાણપત્ર.',
          hi: '₹2.5 लाख सीमा के अंतर्गत वैध आय प्रमाण पत्र।',
        },
        required: true,
      },
    ],
    applicationSteps: {
      en: [
        'Open Digital Gujarat portal (digitalgujarat.gov.in)',
        'Sign in with citizen credentials and select Scholarship Services',
        'Fill application, link Aadhaar bank account, and upload documents',
      ],
      gu: [
        'Digital Gujarat પોર્ટલ (digitalgujarat.gov.in) ખોલો',
        'નાગરિક એકાઉન્ટ વડે લોગિન કરી શિષ્યવૃત્તિ સેવાઓ પસંદ કરો',
        'અરજી ભરી આધાર-લિંક્ડ બેંક ખાતું અને દસ્તાવેજો જોડો',
      ],
      hi: [
        'Digital Gujarat पोर्टल (digitalgujarat.gov.in) खोलें',
        'नागरिक खाते से लॉगिन कर छात्रवृत्ति सेवाएं चुनें',
        'आवेदन भरें, आधार-लिंक्ड बैंक खाता और दस्तावेज संलग्न करें',
      ],
    },
    applicationUrl: 'https://www.digitalgujarat.gov.in/',
    sourceUrl: 'https://www.digitalgujarat.gov.in/',
    lastVerifiedAt: '2026-10-18',
    version: '2026.2',
    verification: {
      status: 'verified',
      reviewer: 'Digital Gujarat Portal Guidelines 2026',
    },
  },
  {
    id: 'kisan-sahay-yojana',
    name: {
      en: 'Mukhyamantri Kisan Sahay Yojana',
      gu: 'મુખ્યમંત્રી કિસાન સહાય યોજના',
      hi: 'मुख्यमंत्री किसान सहाय योजना',
    },
    department: {
      en: 'Agriculture, Farmers Welfare and Co-operation Department, Gujarat',
      gu: 'કૃષિ, ખેડૂત કલ્યાણ અને સહકાર વિભાગ, ગુજરાત',
      hi: 'कृषि, किसान कल्याण एवं सहकारिता विभाग, गुजरात',
    },
    summary: {
      en: 'Crop loss assistance for farmers affected by drought, excess rain, or unseasonal precipitation without premium.',
      gu: 'અનાવૃષ્ટિ, અતિવૃષ્ટિ કે કમોસમી વરસાદના કિસ્સામાં પ્રીમિયમ વગર ખેડૂતોને પાક નુકસાન સહાય.',
      hi: 'सूखा, अत्यधिक वर्षा या बेमौसम बारिश से फसल नुकसान पर बिना प्रीमियम किसान सहायता।',
    },
    benefitDescription: {
      en: '₹20,000 per hectare for 33% to 60% damage; ₹25,000 per hectare for damage exceeding 60% (up to 4 hectares).',
      gu: '૩૩% થી ૬૦% નુકસાન માટે ₹૨૦,૦૦૦ પ્રતિ હેક્ટર; ૬૦% થી વધુ નુકસાન માટે ₹૨૫,૦૦૦ પ્રતિ હેક્ટર (મહત્તમ ૪ હેક્ટર).',
      hi: '33% से 60% नुकसान पर ₹20,000 प्रति हेक्टेयर; 60% से अधिक नुकसान पर ₹25,000 प्रति हेक्टेयर (अधिकतम 4 हेक्टेयर)।',
    },
    rules: [
      {
        id: 'rule-kisan-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Must be landholding farmer in Gujarat',
          gu: 'ગુજરાતમાં જમીન ધરાવતા ખેડૂત હોવા જરૂરી',
          hi: 'गुजरात में भूमिधारक किसान होना आवश्यक',
        },
      },
      {
        id: 'rule-kisan-occupation',
        field: 'occupation',
        operator: 'eq',
        value: 'farmer',
        mandatory: true,
        label: {
          en: 'Occupation must be farming/agriculture',
          gu: 'મુખ્ય વ્યવસાય ખેતી/કૃષિ હોવો જરૂરી',
          hi: 'मुख्य व्यवसाय कृषि होना आवश्यक',
        },
      },
    ],
    requiredDocuments: [
      {
        id: 'doc-land-records',
        name: {
          en: 'Land Records (Revenue 7/12 & 8-A Extracts)',
          gu: 'જમીનના દસ્તાવેજ (૭/૧૨ અને ૮-અ ની નકલ)',
          hi: 'भूमि अभिलेख (7/12 और 8-अ नकल)',
        },
        helpText: {
          en: 'Current computerized extracts from AnyRoR Gujarat portal or Talati.',
          gu: 'AnyRoR પોર્ટલ અથવા તલાટી પાસેથી મેળવેલ ચાલુ વર્ષની નકલ.',
          hi: 'AnyRoR पोर्टल या तलाटी से प्राप्त चालू वर्ष की नकल।',
        },
        required: true,
      },
      {
        id: 'doc-bank-passbook',
        name: {
          en: 'Aadhaar-seeded Bank Passbook',
          gu: 'આધાર સાથે જોડાયેલ બેંક પાસબુક',
          hi: 'आधार-सीडेड बैंक पासबुक',
        },
        helpText: {
          en: 'For direct DBT benefit transfer into farmer account.',
          gu: 'સીધા ડીબીટી ખાતામાં સહાય મેળવવા માટે.',
          hi: 'सीधे खाते में डीबीटी सहायता प्राप्त करने हेतु।',
        },
        required: true,
      },
    ],
    applicationSteps: {
      en: [
        'Apply online at e-Gram centres via Digital Seva Setu or portal',
        'Submit survey number details and Aadhaar linkage',
        'Verification conducted by Talati and Agriculture Officer',
      ],
      gu: [
        'ગ્રામ પંચાયતના ઈ-ગ્રામ કેન્દ્ર પર જઈ વીસીઈ મારફત ઓનલાઇન અરજી કરો',
        'સર્વે નંબરની વિગત અને આધાર લિંકેજ નોંધાવો',
        'તલાટી અને કૃષિ અધિકારી દ્વારા પંચનામું ચકાસવામાં આવશે',
      ],
      hi: [
        'ग्राम पंचायत के ई-ग्राम केंद्र पर ऑनलाइन आवेदन कराएं',
        'सर्वे नंबर विवरण और आधार दर्ज करें',
        'तलाटी एवं कृषि अधिकारी द्वारा सत्यापन किया जाएगा',
      ],
    },
    applicationUrl: 'https://e-kutir.gujarat.gov.in/',
    sourceUrl: 'https://agri.gujarat.gov.in/',
    lastVerifiedAt: '2026-10-12',
    version: '2026.1',
    verification: {
      status: 'verified',
      reviewer: 'Gujarat Agriculture Dept Notification',
    },
  },
  {
    id: 'vrudh-pension-yojana',
    name: {
      en: 'Old Age Pension Scheme (Gujarat Vrudh Pension)',
      gu: 'ઇન્દિરા ગાંધી રાષ્ટ્રીય વૃદ્ધ પેન્શન યોજના (ગુજરાત)',
      hi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (गुजरात)',
    },
    department: {
      en: 'Social Justice and Empowerment Department, Gujarat',
      gu: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ, ગુજરાત',
      hi: 'सामाजिक न्याय और अधिकारिता विभाग, गुजरात',
    },
    summary: {
      en: 'Monthly financial assistance pension for elderly citizens from low-income households.',
      gu: 'ઓછી આવક ધરાવતા વરિષ્ઠ નાગરિકોને આર્થિક ટેકો આપવા માસિક પેન્શન સહાય.',
      hi: 'कम आय वाले वरिष्ठ नागरिकों को आर्थिक सहायता हेतु मासिक पेंशन।',
    },
    benefitDescription: {
      en: '₹1,000 to ₹1,250 per month deposited directly into beneficiary bank account.',
      gu: 'માસિક ₹૧,૦૦૦ થી ₹૧,૨૫૦ લાભાર્થીના બેંક ખાતામાં જમા.',
      hi: 'मासिक ₹1,000 से ₹1,250 लाभार्थी के बैंक खाते में सीधा अंतरण।',
    },
    rules: [
      {
        id: 'rule-vrudh-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Resident of Gujarat',
          gu: 'ગુજરાતના રહેવાસી',
          hi: 'गुजरात के निवासी',
        },
      },
      {
        id: 'rule-vrudh-age',
        field: 'age',
        operator: 'gte',
        value: 60,
        mandatory: true,
        label: {
          en: 'Age 60 years or above',
          gu: 'ઉંમર ૬૦ વર્ષ કે તેથી વધુ',
          hi: 'आयु 60 वर्ष या उससे अधिक',
        },
        explanation: {
          en: 'Must have completed 60 years as verified by age proof.',
          gu: 'ઉંમરના પુરાવા મુજબ ૬૦ વર્ષ પૂર્ણ થયેલ હોવા જોઈએ.',
          hi: 'आयु प्रमाण पत्र के अनुसार 60 वर्ष पूर्ण होने चाहिए।',
        },
      },
      {
        id: 'rule-vrudh-income',
        field: 'annualHouseholdIncome',
        operator: 'in',
        value: ['under_1l'],
        mandatory: true,
        label: {
          en: 'Household income under ₹1,20,000 (BPL / Low Income)',
          gu: 'વાર્ષિક આવક ₹૧,૨૦,૦૦૦ સુધી (બીપીએલ / ગરીબી રેખા હેઠળ)',
          hi: 'वार्षिक आय ₹1,20,000 तक (बीपीएल / अल्प आय वर्ग)',
        },
      },
    ],
    requiredDocuments: [
      {
        id: 'doc-age-proof',
        name: {
          en: 'Age Proof (School Leaving / Medical Certificate)',
          gu: 'ઉંમરનો પુરાવો (શાળા છોડ્યાનું પ્રમાણપત્ર અથવા સિવિલ સર્જન દાખલો)',
          hi: 'आयु प्रमाण (स्कूल लीविंग अथवा सिविल सर्जन प्रमाण पत्र)',
        },
        helpText: {
          en: 'Valid document showing birth date.',
          gu: 'જન્મ તારીખ દર્શાવતો સત્તાવાર પુરાવો.',
          hi: 'जन्म तिथि दर्शाने वाला वैध दस्तावेज़।',
        },
        required: true,
      },
      {
        id: 'doc-income-bpl',
        name: {
          en: 'Income Certificate / BPL Score Card',
          gu: 'આવકનો દાખલો અથવા બીપીએલ યાદીમાં નામનો દાખલો',
          hi: 'आय प्रमाण पत्र अथवा बीपीएल स्कोर कार्ड',
        },
        helpText: {
          en: 'Showing household income under prescribed limit.',
          gu: 'નિયત મર્યાદા હેઠળની આવક દર્શાવતો દાખલો.',
          hi: 'निर्धारित सीमा के अंतर्गत आय दर्शाने वाला प्रमाण पत्र।',
        },
        required: true,
      },
    ],
    applicationSteps: {
      en: [
        'Collect Form from Mamlatdar Office / Jan Seva Kendra or download online',
        'Attach age proof, income certificate, and bank passbook',
        'Submit at Taluka Mamlatdar office for verification',
      ],
      gu: [
        'મામલતદાર કચેરી / જન સેવા કેન્દ્ર પરથી ફોર્મ મેળવો અથવા ડાઉનલોડ કરો',
        'ઉંમરનો પુરાવો, આવકનો દાખલો અને બેંક પાસબુક જોડો',
        'તાલુકા મામલતદાર કચેરીની સામાજિક સુરક્ષા શાખામાં જમા કરાવો',
      ],
      hi: [
        'मामलतदार कार्यालय / जन सेवा केंद्र से फॉर्म प्राप्त करें',
        'आयु प्रमाण, आय प्रमाण पत्र और बैंक पासबुक संलग्न करें',
        'तालुका कार्यालय की सामाजिक सुरक्षा शाखा में जमा करें',
      ],
    },
    applicationUrl: 'https://www.digitalgujarat.gov.in/',
    sourceUrl: 'https://sje.gujarat.gov.in/',
    lastVerifiedAt: '2026-10-20',
    version: '2026.1',
    verification: {
      status: 'verified',
      reviewer: 'Gujarat Social Security Review',
    },
  },
  {
    id: 'manav-garima-yojana',
    name: {
      en: 'Manav Garima Yojana (Toolkits for Self-Employment)',
      gu: 'માનવ ગરિમા યોજના (સ્વરોજગાર સાધન સહાય)',
      hi: 'मानव गरिमा योजना (स्वरोजगार टूलकिट सहायता)',
    },
    department: {
      en: 'Commissioner of Cottage and Rural Industries, Gujarat',
      gu: 'કુટીર અને ગ્રામોદ્યોગ કમિશનરશ્રીની કચેરી, ગુજરાત',
      hi: 'कुटीर एवं ग्रामीण उद्योग आयुक्त कार्यालय, गुजरात',
    },
    summary: {
      en: 'Free professional toolkit assistance for 28 declared artisan and service occupations to foster self-employment.',
      gu: 'દરજીકામ, સુથારીકામ, પ્લમ્બિંગ જેવા ૨૮ વ્યવસાયો માટે વિનામૂલ્યે વ્યવસાયિક સાધન કિટ સહાય.',
      hi: 'दर्जी, बढ़ई, प्लंबर जैसे 28 व्यवसायों हेतु निःशुल्क टूलकिट सहायता।',
    },
    benefitDescription: {
      en: 'Free toolkit sets worth up to ₹25,000 for approved trade (no loan/repayment required).',
      gu: 'મંજૂર વ્યવસાય માટે ₹૨૫,૦૦૦ સુધીની કિંમતની સાધન ટૂલકિટ વિનામૂલ્યે (કોઈ લોન કે વ્યાજ વગર).',
      hi: 'स्वीकृत व्यवसाय हेतु ₹25,000 तक की व्यावसायिक टूलकिट निःशुल्क।',
    },
    rules: [
      {
        id: 'rule-mg-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Resident of Gujarat',
          gu: 'ગુજરાતના રહેવાસી',
          hi: 'गुजरात के निवासी',
        },
      },
      {
        id: 'rule-mg-age',
        field: 'age',
        operator: 'gte',
        value: 18,
        mandatory: true,
        label: {
          en: 'Age between 18 and 60 years',
          gu: 'ઉંમર ૧૮ થી ૬૦ વર્ષ',
          hi: 'आयु 18 से 60 वर्ष',
        },
      },
      {
        id: 'rule-mg-income',
        field: 'annualHouseholdIncome',
        operator: 'in',
        value: ['under_1l'],
        mandatory: true,
        label: {
          en: 'Annual income under ₹1,20,000 (rural) or ₹1,50,000 (urban)',
          gu: 'વાર્ષિક આવક ગ્રામ્ય માટે ₹૧,૨૦,૦૦૦ / શહેરી માટે ₹૧,૫૦,૦૦૦ સુધી',
          hi: 'वार्षिक आय ग्रामीण हेतु ₹1,20,000 / शहरी हेतु ₹1,50,000 तक',
        },
      },
    ],
    requiredDocuments: [
      {
        id: 'doc-income',
        name: {
          en: 'Income Certificate from Mamlatdar/TDO',
          gu: 'મામલતદાર / ટીડીઓનો આવકનો દાખલો',
          hi: 'मामलतदार / टीडीओ का आय प्रमाण पत्र',
        },
        helpText: {
          en: 'Issued under revenue department rules.',
          gu: 'મહેસૂલ વિભાગના નિયમ મુજબનો માન્ય દાખલો.',
          hi: 'राजस्व विभाग नियमानुसार वैध प्रमाण पत्र।',
        },
        required: true,
      },
      {
        id: 'doc-ration',
        name: {
          en: 'Ration Card',
          gu: 'રેશન કાર્ડ',
          hi: 'राशन कार्ड',
        },
        helpText: {
          en: 'Showing family members list.',
          gu: 'કુટુંબના સભ્યોની યાદી દર્શાવતું રેશન કાર્ડ.',
          hi: 'परिवार के सदस्यों की सूची युक्त राशन कार्ड।',
        },
        required: true,
      },
    ],
    applicationSteps: {
      en: [
        'Apply online on e-Kutir portal (e-kutir.gujarat.gov.in)',
        'Select preferred trade from the 28 designated vocations',
        'Receive toolkit at district industry distribution camp upon approval',
      ],
      gu: [
        'e-Kutir પોર્ટલ (e-kutir.gujarat.gov.in) પર ઓનલાઇન અરજી કરો',
        'નિયત ૨૮ વ્યવસાયોમાંથી તમારો વ્યવસાય પસંદ કરો',
        'મંજૂરી મળ્યે જિલ્લા કક્ષાએ કિટ વિતરણ શિબિરમાંથી સાધનો મેળવો',
      ],
      hi: [
        'e-Kutir पोर्टल (e-kutir.gujarat.gov.in) पर ऑनलाइन आवेदन करें',
        'निर्धारित 28 व्यवसायों में से अपना व्यवसाय चुनें',
        'स्वीकृति उपरांत जिला वितरण शिविर से टूलकिट प्राप्त करें',
      ],
    },
    applicationUrl: 'https://e-kutir.gujarat.gov.in/',
    sourceUrl: 'https://e-kutir.gujarat.gov.in/',
    lastVerifiedAt: '2026-10-25',
    version: '2026.1',
    verification: {
      status: 'verified',
      reviewer: 'e-Kutir Portal Guidelines',
    },
  },
  {
    id: 'vidhva-sahay-yojana',
    name: {
      en: 'Ganga Swarupa Yojana (Financial Assistance for Widows)',
      gu: 'ગંગા સ્વરૂપા આર્થિક સહાય યોજના (વિધવા સહાય)',
      hi: 'गंगा स्वरूपा आर्थिक सहायता योजना (विधवा सहायता)',
    },
    department: {
      en: 'Women and Child Development Department, Gujarat',
      gu: 'મહિલા અને બાળ વિકાસ વિભાગ, ગુજરાત',
      hi: 'महिला एवं बाल विकास विभाग, गुजरात',
    },
    summary: {
      en: 'Monthly pension support for widowed women to ensure social security and dignified living.',
      gu: 'વિધવા બહેનોને આત્મસન્માનભેર જીવન જીવવા માટે માસિક આર્થિક પેન્શન સહાય.',
      hi: 'विधवा महिलाओं को सामाजिक सुरक्षा और सम्मानजनक जीवन हेतु मासिक आर्थिक पेंशन।',
    },
    benefitDescription: {
      en: '₹1,250 per month deposited directly into bank account via DBT.',
      gu: 'માસિક ₹૧,૨૫૦ લાભાર્થી મહિલાના બેંક ખાતામાં ડીબીટી દ્વારા જમા.',
      hi: 'मासिक ₹1,250 सीधे बैंक खाते में डीबीटी द्वारा अंतरित।',
    },
    rules: [
      {
        id: 'rule-gs-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Resident of Gujarat',
          gu: 'ગુજરાતના કાયમી રહેવાસી',
          hi: 'गुजरात की स्थायी निवासी',
        },
      },
      {
        id: 'rule-gs-income',
        field: 'annualHouseholdIncome',
        operator: 'in',
        value: ['under_1l', '1l_2_5l'],
        mandatory: true,
        label: {
          en: 'Income under ₹1,20,000 (rural) or ₹1,50,000 (urban)',
          gu: 'વાર્ષિક આવક ગ્રામ્ય માટે ₹૧,૨૦,૦૦૦ / શહેરી માટે ₹૧,૫૦,૦૦૦ સુધી',
          hi: 'वार्षिक आय ग्रामीण हेतु ₹1,20,000 / शहरी हेतु ₹1,50,000 तक',
        },
      },
    ],
    requiredDocuments: [
      {
        id: 'doc-death-cert',
        name: {
          en: 'Husband Death Certificate',
          gu: 'પતિના અવસાનનો દાખલો (મરણ પ્રમાણપત્ર)',
          hi: 'पति का मृत्यु प्रमाण पत्र',
        },
        helpText: {
          en: 'Official certificate issued by Registrar of Births and Deaths.',
          gu: 'નગરપાલિકા / ગ્રામ પંચાયત દ્વારા અપાયેલ મરણનો દાખલો.',
          hi: 'नगरपालिका / ग्राम पंचायत द्वारा जारी मृत्यु प्रमाण पत्र।',
        },
        required: true,
      },
      {
        id: 'doc-no-remarriage',
        name: {
          en: 'Affidavit of No Re-marriage',
          gu: 'પુનઃલગ્ન ન કર્યાનું સોગંદનામું',
          hi: 'पुनर्विवाह न करने का शपथ पत्र',
        },
        helpText: {
          en: 'Notarized or Talati verified statement.',
          gu: 'નોટરી અથવા તલાટી સમક્ષ કરેલ બાંહેધરી.',
          hi: 'शपथ पत्र अथवा तलाटी सत्यापित घोषणा।',
        },
        required: true,
      },
    ],
    applicationSteps: {
      en: [
        'Collect Ganga Swarupa application form from Mamlatdar office or Jan Seva Kendra',
        'Attach husband death certificate and income proof',
        'Sanction order issued by Prant Officer / Mamlatdar',
      ],
      gu: [
        'મામલતદાર કચેરી અથવા જન સેવા કેન્દ્ર પરથી ફોર્મ મેળવો',
        'પતિના મરણનો દાખલો, આવકનો દાખલો અને પુનઃલગ્ન ન કર્યાની બાંહેધરી જોડો',
        'પ્રાંત અધિકારી / મામલતદાર દ્વારા મંજૂરી હુકમ આપવામાં આવશે',
      ],
      hi: [
        'मामलतदार कार्यालय या जन सेवा केंद्र से आवेदन पत्र प्राप्त करें',
        'पति का मृत्यु प्रमाण पत्र और आय प्रमाण पत्र संलग्न करें',
        'प्रांत अधिकारी / मामलतदार द्वारा स्वीकृति आदेश जारी किया जाएगा',
      ],
    },
    applicationUrl: 'https://www.digitalgujarat.gov.in/',
    sourceUrl: 'https://wcd.gujarat.gov.in/',
    lastVerifiedAt: '2026-10-22',
    version: '2026.1',
    verification: {
      status: 'verified',
      reviewer: 'Gujarat WCD Department Desk',
    },
  },
  {
    id: 'divyang-sadhan-sahay',
    name: {
      en: 'Aids and Assistive Devices Scheme for Divyangjan (Demo Placeholder)',
      gu: 'દિવ્યાંગજન સાધન સહાય યોજના (ડેમો ડેટા)',
      hi: 'दिव्यांगजन सहायक उपकरण योजना (डेमो डेटा)',
    },
    department: {
      en: 'Social Justice and Empowerment Department, Gujarat',
      gu: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ, ગુજરાત',
      hi: 'सामाजिक न्याय और अधिकारिता विभाग, गुजरात',
    },
    summary: {
      en: 'Assistance for purchasing motorized tricycles, hearing aids, and artificial limbs for disabled persons.',
      gu: 'દિવ્યાંગ વ્યક્તિઓને ટ્રાઇસિકલ, શ્રવણ યંત્ર અને કૃત્રિમ અંગો માટે આર્થિક સહાય.',
      hi: 'दिव्यांग व्यक्तियों को ट्राइसाइकिल, श्रवण यंत्र एवं कृत्रिम अंग सहायता।',
    },
    benefitDescription: {
      en: 'Free or subsidized assistive aids worth up to ₹20,000 depending on certified disability percentage.',
      gu: 'દિવ્યાંગતાની ટકાવારી મુજબ ₹૨૦,૦૦૦ સુધીના સાધનો વિનામૂલ્યે અથવા રાહત દરે.',
      hi: 'प्रमाणित दिव्यांगता के अनुसार ₹20,000 तक के सहायक उपकरण।',
    },
    rules: [
      {
        id: 'rule-divyang-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Resident of Gujarat',
          gu: 'ગુજરાતના રહેવાસી',
          hi: 'गुजरात के निवासी',
        },
      },
      {
        id: 'rule-divyang-status',
        field: 'disability',
        operator: 'eq',
        value: 'yes',
        mandatory: true,
        label: {
          en: 'Certified 40% or more disability',
          gu: '૪૦% કે તેથી વધુ દિવ્યાંગતા પ્રમાણિત હોવી જરૂરી',
          hi: '40% या अधिक प्रमाणित दिव्यांगता आवश्यक',
        },
      },
    ],
    requiredDocuments: [
      {
        id: 'doc-udid',
        name: {
          en: 'UDID Card / Disability Certificate (40%+)',
          gu: 'UDID કાર્ડ / સિવિલ હોસ્પિટલનું ૪૦%+ દિવ્યાંગતા પ્રમાણપત્ર',
          hi: 'यूडीआईडी कार्ड / 40%+ दिव्यांगता प्रमाण पत्र',
        },
        helpText: {
          en: 'Issued by Medical Board / Civil Surgeon.',
          gu: 'મેડિકલ બોર્ડ અથવા સિવિલ સર્જન દ્વારા પ્રમાણિત.',
          hi: 'मेडिकल बोर्ड अथवा सिविल सर्जन द्वारा प्रमाणित।',
        },
        required: true,
      },
    ],
    applicationSteps: {
      en: [
        'Apply on Digital Gujarat portal under Social Defence services',
        'Upload UDID and income certificate',
      ],
      gu: [
        'Digital Gujarat પોર્ટલ પર સમાજ સુરક્ષા સેવાઓ હેઠળ અરજી કરો',
        'UDID કાર્ડ અને આવકનો દાખલો જોડો',
      ],
      hi: [
        'Digital Gujarat पोर्टल पर समाज सुरक्षा सेवाओं में आवेदन करें',
        'UDID कार्ड और आय प्रमाण पत्र संलग्न करें',
      ],
    },
    applicationUrl: 'https://www.digitalgujarat.gov.in/',
    sourceUrl: 'https://sje.gujarat.gov.in/',
    lastVerifiedAt: null,
    version: '2026.1-draft',
    verification: {
      status: 'demo_placeholder',
      reviewer: null,
      note: 'Pending human verification against latest 2026 Social Defence budget GRs. Labelled demo data.',
    },
  },
]
