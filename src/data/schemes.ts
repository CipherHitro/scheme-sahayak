import type { SchemeRecord } from '../domain/scheme.types'
import { validateSchemes } from './validation'

const RAW_SCHEMES_DATASET: SchemeRecord[] = [
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
    beneficiaryScope: 'individual',
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
        operator: 'lte',
        value: 600000,
        mandatory: true,
        label: {
          en: 'Household annual income up to ₹6,00,000',
          gu: 'કુટુંબની વાર્ષિક આવક ₹૬,૦૦,૦૦૦ સુધી',
          hi: 'परिवार की वार्षिक आय ₹6,00,000 तक',
        },
        explanation: {
          en: 'Annual household income must not exceed ₹6,00,000 per annum.',
          gu: 'કુટુંબની વાર્ષિક આવક ₹૬,૦૦,૦૦૦ થી વધુ ન હોવી જોઈએ.',
          hi: 'परिवार की वार्षिक आय ₹6,00,000 से अधिक नहीं होनी चाहिए।',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'income_certificate',
        required: true,
        helpText: {
          en: 'Issued by Mamlatdar / TDO in Gujarat, valid for 3 financial years.',
          gu: 'મામલતદાર અથવા ટીડીઓ દ્વારા આપવામાં આવેલ ૩ વર્ષની માન્યતા ધરાવતું પ્રમાણપત્ર.',
          hi: 'मामलतदार या टीडीओ द्वारा जारी 3 वित्तीय वर्षों के लिए मान्य प्रमाण पत्र।',
        },
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
        documentTypeId: 'bonafide_certificate',
        required: true,
        helpText: {
          en: 'Letter of admission or bonafide certificate from recognized college.',
          gu: 'માન્ય કોલેજ અથવા યુનિવર્સિટી દ્વારા આપવામાં આવેલ પ્રવેશ પ્રમાણપત્ર.',
          hi: 'मान्यता प्राप्त कॉलेज या संस्थान द्वारा जारी प्रवेश प्रमाण पत्र।',
        },
        issuingAuthority: {
          en: 'Institution Registrar / Principal',
          gu: 'સંસ્થાના રજીસ્ટ્રાર / આચાર્યશ્રી',
          hi: 'संस्थान के कुलसचिव / प्रधानाचार्य',
        },
        whereToGet: {
          en: ['Collect directly from college administrative office upon enrollment.'],
          gu: ['પ્રવેશ મળ્યા બાદ કોલેજના વહીવટી વિભાગમાંથી મેળવો.'],
          hi: ['प्रवेश के बाद कॉलेज प्रशासनिक कार्यालय से प्राप्त करें।'],
        },
      },
      {
        documentTypeId: 'marksheet',
        required: true,
        helpText: {
          en: 'Class 10 / 12 board examination marksheet showing eligible percentile.',
          gu: 'ધોરણ ૧૦ અથવા ૧૨ બોર્ડ પરીક્ષાનું ગુણપત્રક.',
          hi: 'कक्षा 10वीं या 12वीं बोर्ड परीक्षा की अंकतालिका।',
        },
        issuingAuthority: {
          en: 'Gujarat Secondary and Higher Secondary Education Board (GSHSEB)',
          gu: 'ગુજરાત માધ્યમિક અને ઉચ્ચતર માધ્યમિક શિક્ષણ બોર્ડ',
          hi: 'गुजरात माध्यमिक एवं उच्चतर माध्यमिक शिक्षा बोर्ड',
        },
        whereToGet: {
          en: ['School / Board office or DigiLocker.'],
          gu: ['શાળા / બોર્ડ કચેરી અથવા DigiLocker પરથી.'],
          hi: ['स्कूल / बोर्ड कार्यालय अथवा डिजीलॉकर से।'],
        },
      },
    ],
    applicationSteps: {
      en: [
        'Register online at mysy.guj.nic.in with your board roll number.',
        'Upload verified documents (income certificate, admission slip, marksheets).',
        'Verify original documents in person at the assigned Help Center.',
        'Sanction order and fee reimbursement transferred directly via DBT.',
      ],
      gu: [
        'mysy.guj.nic.in પોર્ટલ પર બોર્ડ સીટ નંબર સાથે ઓનલાઇન નોંધણી કરો.',
        'પ્રમાણિત દસ્તાવેજો (આવક દાખલો, પ્રવેશ રસીદ, માર્કશીટ) અપલોડ કરો.',
        'નજીકના નિયુક્ત હેલ્પ સેન્ટર પર રૂબરૂ અસલ દસ્તાવેજોની ચકાસણી કરાવો.',
        'મંજૂરી મળ્યા બાદ સહાય સીધી બેંક ખાતામાં DBT દ્વારા જમા થશે.',
      ],
      hi: [
        'mysy.guj.nic.in पर बोर्ड रोल नंबर के साथ ऑनलाइन पंजीकरण करें।',
        'प्रमाणित दस्तावेज (आय प्रमाण पत्र, प्रवेश रसीद, अंकतालिका) अपलोड करें।',
        'निकटतम सहायता केंद्र पर मूल दस्तावेजों का भौतिक सत्यापन कराएं।',
        'स्वीकृति उपरांत सहायता राशि सीधे बैंक खाते में डीबीटी द्वारा पहुंचेगी।',
      ],
    },
    applicationUrl: 'https://mysy.guj.nic.in/',
    sourceUrl: 'https://mysy.guj.nic.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'demo_placeholder',
      reviewer: null,
      note: 'Official guidelines sourced from mysy.guj.nic.in. Verification required by human reviewer.',
    },
  },
  {
    id: 'digital-gujarat-post-matric',
    name: {
      en: 'Post-Matric Scholarship for SC/ST/SEBC Students',
      gu: 'અનુસૂચિત જાતિ / જનજાતિ / સામાજિક-શૈક્ષણિક પછાત વર્ગ માટે પોસ્ટ-મેટ્રિક શિષ્યવૃત્તિ',
      hi: 'एससी/एसटी/एसईबीसी छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
    },
    department: {
      en: 'Social Justice and Empowerment Department, Gujarat',
      gu: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ, ગુજરાત સરકાર',
      hi: 'सामाजिक न्याय एवं अधिकारिता विभाग, गुजरात सरकार',
    },
    summary: {
      en: 'Government scholarship covering 100% compulsory non-refundable fees and monthly maintenance allowance.',
      gu: 'અનુસૂચિત જાતિ, જનજાતિ અને સામાજિક-શૈક્ષણિક રીતે પછાત વર્ગના વિદ્યાર્થીઓને શિક્ષણ ફી અને નિર્વાહ ભથ્થું.',
      hi: 'आरक्षित वर्ग के विद्यार्थियों के लिए संपूर्ण शिक्षण शुल्क और मासिक भरण-पोषण भत्ता।',
    },
    benefitDescription: {
      en: 'Full reimbursement of approved college tuition fees and annual maintenance allowance up to ₹13,500.',
      gu: 'સરકારી માન્ય કોલેજ ટ્યુશન ફીની સંપૂર્ણ ચુકવણી અને વાર્ષિક ₹૧૩,૫૦૦ સુધીનું નિર્વાહ ભથ્થું.',
      hi: 'कॉलेज शिक्षण शुल्क की पूर्ण प्रतिपूर्ति एवं ₹13,500 तक का वार्षिक अनुरक्षण भत्ता।',
    },
    beneficiaryScope: 'individual',
    rules: [
      {
        id: 'rule-dg-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Gujarat Domicile',
          gu: 'ગુજરાતના કાયમી રહેવાસી',
          hi: 'गुजरात के स्थायी निवासी',
        },
      },
      {
        id: 'rule-dg-occupation',
        field: 'occupation',
        operator: 'eq',
        value: 'student',
        mandatory: true,
        label: {
          en: 'Enrolled in Post-Matric Course',
          gu: 'ધોરણ ૧૦ પછીના માન્ય અભ્યાસક્રમમાં અભ્યાસ',
          hi: 'कक्षा 10वीं के बाद के मान्यता प्राप्त पाठ्यक्रम में अध्ययनरत',
        },
      },
      {
        id: 'rule-dg-category',
        field: 'category',
        operator: 'in',
        value: ['sc', 'st', 'sebc', 'ews'],
        mandatory: true,
        label: {
          en: 'Belonging to SC, ST, SEBC, or EWS Category',
          gu: 'SC, ST, SEBC અથવા EWS વર્ગના ઉમેદવાર',
          hi: 'एससी, एसटी, एसईबीसी अथवा ईडब्ल्यूएस वर्ग के अभ्यर्थी',
        },
      },
      {
        id: 'rule-dg-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 250000,
        mandatory: true,
        label: {
          en: 'Household annual income up to ₹2,50,000',
          gu: 'કુટુંબની વાર્ષિક આવક ₹૨,૫૦,૦૦૦ સુધી',
          hi: 'परिवार की वार्षिक आय ₹2,50,000 तक',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'caste_certificate',
        required: true,
        helpText: {
          en: 'Official caste/category certificate issued by Gujarat competent authority.',
          gu: 'સક્ષમ અધિકારી દ્વારા આપવામાં આવેલ જાતિનું સત્તાવાર પ્રમાણપત્ર.',
          hi: 'सक्षम अधिकारी द्वारा प्रदत्त आधिकारिक जाति प्रमाण पत्र।',
        },
        issuingAuthority: {
          en: 'Sub-Divisional Magistrate / Mamlatdar',
          gu: 'પ્રાંત અધિકારી / મામલતદાર',
          hi: 'उपमंडल मजिस्ट्रेट / मामलतदार',
        },
        whereToGet: {
          en: ['Jan Seva Kendra or Digital Gujarat portal.'],
          gu: ['જન સેવા કેન્દ્ર અથવા Digital Gujarat પોર્ટલ.'],
          hi: ['जन सेवा केंद्र अथवा Digital Gujarat पोर्टल।'],
        },
      },
      {
        documentTypeId: 'income_certificate',
        required: true,
        helpText: {
          en: 'Current financial year income certificate.',
          gu: 'ચાલુ નાણાકીય વર્ષનું આવકનું પ્રમાણપત્ર.',
          hi: 'चालू वित्तीय वर्ष का आय प्रमाण पत्र।',
        },
        issuingAuthority: {
          en: 'Taluka Development Officer (TDO) / Mamlatdar',
          gu: 'તાલુકા વિકાસ અધિકારી / મામલતદાર',
          hi: 'तालुका विकास अधिकारी / मामलतदार',
        },
        whereToGet: {
          en: ['Local Jan Seva Kendra.'],
          gu: ['સ્થાનિક જન સેવા કેન્દ્ર.'],
          hi: ['स्थानीय जन सेवा केंद्र।'],
        },
      },
      {
        documentTypeId: 'marksheet',
        required: true,
        helpText: {
          en: 'Last qualifying examination marksheet.',
          gu: 'છેલ્લી પાસ કરેલ પરીક્ષાનું ગુણપત્રક.',
          hi: 'अंतिम उत्तीर्ण परीक्षा की अंकतालिका।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Visit digitalgujarat.gov.in and create Citizen profile.',
        'Choose Post Matric Scholarship corresponding to your category.',
        'Fill academic details and attach verified scanned documents.',
        'Submit online and track verification status on portal.',
      ],
      gu: [
        'digitalgujarat.gov.in પોર્ટલ પર જઈ સિટીઝન પ્રોફાઇલ બનાવો.',
        'તમારી જાતિ/કેટેગરી મુજબ પોસ્ટ મેટ્રિક શિષ્યવૃત્તિ સ્કીમ પસંદ કરો.',
        'શૈક્ષણિક વિગતો ભરી પ્રમાણિત દસ્તાવેજો જોડો.',
        'ઓનલાઇન અરજી જમા કરી પોર્ટલ પર સ્ટેટસ ટ્રેક કરો.',
      ],
      hi: [
        'digitalgujarat.gov.in पर जाएं और नागरिक प्रोफाइल बनाएं।',
        'अपनी श्रेणी के अनुसार पोस्ट मैट्रिक स्कॉलरशिप का चयन करें।',
        'शैक्षणिक विवरण भरें और प्रमाणित दस्तावेज संलग्न करें।',
        'ऑनलाइन सबमिट करें और पोर्टल पर आवेदन की स्थिति देखें।',
      ],
    },
    applicationUrl: 'https://www.digitalgujarat.gov.in/',
    sourceUrl: 'https://www.digitalgujarat.gov.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'demo_placeholder',
      reviewer: null,
      note: 'Guidelines sourced from Digital Gujarat scholarship portal. Official review required.',
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
      en: 'Agriculture, Farmers Welfare & Co-operation Department, Gujarat',
      gu: 'કૃષિ, ખેડૂત કલ્યાણ અને સહકાર વિભાગ, ગુજરાત સરકાર',
      hi: 'कृषि, किसान कल्याण एवं सहकारिता विभाग, गुजरात सरकार',
    },
    summary: {
      en: 'Zero-premium crop compensation covering drought, excess rain, and unseasonal rainfall for all Gujarat farmers.',
      gu: 'દુષ્કાળ, અતિવૃષ્ટિ અને કમોસમી વરસાદ સામે રાજ્યના તમામ ખેડૂતો માટે પ્રીમિયમ-મુક્ત પાક નુકસાન સહાય.',
      hi: 'सूखा, अत्यधिक बारिश और बेमौसम बारिश से नुकसान पर सभी किसानों के लिए शून्य-प्रीमियम फसल सुरक्षा।',
    },
    benefitDescription: {
      en: 'Direct assistance of ₹20,000/hectare for 33% to 60% crop damage; ₹25,000/hectare for >60% damage (up to 4 hectares).',
      gu: '૩૩% થી ૬૦% નુકસાન માટે ₹૨૦,૦૦૦/હેક્ટર; ૬૦% થી વધુ નુકસાન માટે ₹૨૫,૦૦૦/હેક્ટર (મહત્તમ ૪ હેક્ટર સુધી).',
      hi: '33% से 60% नुकसान पर ₹20,000/हेक्टेयर; 60% से अधिक क्षति पर ₹25,000/हेक्टेयर (अधिकतम 4 हेक्टेयर)।',
    },
    beneficiaryScope: 'household',
    rules: [
      {
        id: 'rule-kisan-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Must reside in Gujarat',
          gu: 'ગુજરાતના રહેવાસી હોવા જરૂરી',
          hi: 'गुजरात का निवासी होना आवश्यक',
        },
      },
      {
        id: 'rule-kisan-occupation',
        field: 'occupation',
        operator: 'eq',
        value: 'farmer',
        mandatory: true,
        label: {
          en: 'Occupation must be Farmer (Landholder)',
          gu: 'મુખ્ય વ્યવસાય ખેતી/ખેડૂત હોવો જરૂરી',
          hi: 'मुख्य व्यवसाय किसान/खेती होना आवश्यक',
        },
      },
      {
        id: 'rule-kisan-land',
        field: 'ownsAgriculturalLand',
        operator: 'eq',
        value: 'yes',
        mandatory: true,
        label: {
          en: 'Must own agricultural land in Gujarat',
          gu: 'ગુજરાતમાં ખેતીની જમીન ધરાવતા હોવા જોઈએ',
          hi: 'गुजरात में कृषि भूमि का स्वामित्व होना चाहिए',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'land_record_7_12',
        required: true,
        helpText: {
          en: 'Updated RoR 7/12 & 8A land extract indicating active ownership.',
          gu: 'તાજેતરની ગામ નમૂના ૭/૧૨ અને ૮-અ ની નકલ.',
          hi: 'अद्यतन 7/12 और 8A खतौनी नकल।',
        },
        issuingAuthority: {
          en: 'Revenue Department / AnyRoR Portal',
          gu: 'મહેસૂલ વિભાગ / AnyRoR પોર્ટલ',
          hi: 'राजस्व विभाग / AnyRoR पोर्टल',
        },
        whereToGet: {
          en: ['Download instantly from anyror.gujarat.gov.in or visit Village Talati.'],
          gu: ['anyror.gujarat.gov.in પરથી ઓનલાઇન મેળવો અથવા તલાટી પાસેથી મેળવો.'],
          hi: ['anyror.gujarat.gov.in से डाउनलोड करें या ग्राम तलाटी से संपर्क करें।'],
        },
      },
      {
        documentTypeId: 'bank_passbook',
        required: true,
        helpText: {
          en: 'Aadhaar-linked active bank account passbook copy.',
          gu: 'આધાર લિંક્ડ બેંક ખાતાની પાસબુકની નકલ.',
          hi: 'आधार से जुड़े बैंक खाते की पासबुक प्रति।',
        },
        issuingAuthority: {
          en: 'Commercial / Regional Rural Bank Branch',
          gu: 'કોમર્શિયલ / સહકારી બેંક શાખા',
          hi: 'बैंक शाखा',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Apply online on the i-Khedut portal or via Village Computer Entrepreneur (VCE) at Gram Panchayat.',
        'Submit survey/block number and upload 7/12 land extract.',
        'Taluka agriculture officer conducts damage survey upon notification.',
        'Direct transfer credited to Aadhaar-enabled bank account.',
      ],
      gu: [
        'i-Khedut પોર્ટલ પર અથવા ગ્રામ પંચાયતના VCE મારફત ઓનલાઇન અરજી કરો.',
        'જમીનનો સર્વે નંબર/ખાતા નંબર દાખલ કરી ૭/૧૨ આધાર જોડો.',
        'સરકારી જાહેરનામા બાદ કૃષિ અધિકારી દ્વારા સર્વેક્ષણ કરવામાં આવશે.',
        'સહાય સીધી આધાર લિંક્ડ બેંક ખાતામાં જમા કરવામાં આવશે.',
      ],
      hi: [
        'i-Khedut पोर्टल पर या ग्राम पंचायत में वीसीई के माध्यम से आवेदन करें।',
        'सर्वे नंबर दर्ज करें और 7/12 खतौनी संलग्न करें।',
        'अधिसूचना के बाद तालुका कृषि अधिकारी द्वारा फसल नुकसान सर्वे।',
        'स्वीकृत सहायता सीधे आधार लिंक बैंक खाते में जमा।',
      ],
    },
    applicationUrl: 'https://ikhedut.gujarat.gov.in/',
    sourceUrl: 'https://ikhedut.gujarat.gov.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'demo_placeholder',
      reviewer: null,
      note: 'Guidelines from i-Khedut portal. Field verification needed for khatedar records.',
    },
  },
  {
    id: 'vrudh-pension-yojana',
    name: {
      en: 'Indira Gandhi National Old Age Pension Scheme (Gujarat)',
      gu: 'ઇન્દિરા ગાંધી રાષ્ટ્રીય વૃદ્ધ પેન્શન યોજના (ગુજરાત)',
      hi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (गुजरात)',
    },
    department: {
      en: 'Social Justice and Empowerment Department, Gujarat',
      gu: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ, ગુજરાત સરકાર',
      hi: 'सामाजिक न्याय एवं अधिकारिता विभाग, गुजरात सरकार',
    },
    summary: {
      en: 'Monthly social pension for senior citizens aged 60 and above living below the poverty line.',
      gu: '૬૦ વર્ષ કે તેથી વધુ વયના ગરીબી રેખા હેઠળ જીવતા વરિષ્ઠ નાગરિકો માટે માસિક સહાય પેન્શન.',
      hi: '60 वर्ष या अधिक आयु के गरीबी रेखा से नीचे जीवनयापन करने वाले वरिष्ठ नागरिकों के लिए मासिक पेंशन।',
    },
    benefitDescription: {
      en: '₹1,000 per month for beneficiaries aged 60–79; ₹1,250 per month for beneficiaries aged 80 and above.',
      gu: '૬૦ થી ૭૯ વર્ષના લાભાર્થી માટે માસિક ₹૧,૦૦૦; ૮૦ વર્ષ કે તેથી વધુ વયના લાભાર્થી માટે માસિક ₹૧,૨૫૦.',
      hi: '60 से 79 वर्ष के लाभार्थियों को ₹1,000 मासिक; 80 वर्ष से अधिक आयु वालों को ₹1,250 मासिक।',
    },
    beneficiaryScope: 'individual',
    rules: [
      {
        id: 'rule-vrudh-residence',
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
        id: 'rule-vrudh-age',
        field: 'age',
        operator: 'gte',
        value: 60,
        mandatory: true,
        label: {
          en: 'Age must be 60 years or above',
          gu: 'ઉંમર ૬૦ વર્ષ કે તેથી વધુ હોવી જરૂરી',
          hi: 'आयु 60 वर्ष या उससे अधिक होनी चाहिए',
        },
      },
      {
        id: 'rule-vrudh-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 100000,
        mandatory: true,
        label: {
          en: 'Annual household income under ₹1,00,000',
          gu: 'વાર્ષિક આવક ₹૧,૦૦,૦૦૦ થી ઓછી',
          hi: 'वार्षिक आय ₹1,00,000 से कम',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'identity_proof',
        required: true,
        helpText: {
          en: 'Proof of age and identity (Aadhaar Card, Election Card, or Birth Certificate).',
          gu: 'ઉંમર અને ઓળખનો પુરાવો (આધાર કાર્ડ, ચૂંટણી કાર્ડ અથવા જન્મ પ્રમાણપત્ર).',
          hi: 'आयु एवं पहचान प्रमाण (आधार कार्ड, मतदाता पहचान पत्र या जन्म प्रमाण पत्र)।',
        },
      },
      {
        documentTypeId: 'ration_card',
        required: true,
        helpText: {
          en: 'BPL / Antyodaya ration card indicating economic eligibility.',
          gu: 'બીપીએલ / અંત્યોદય રેશન કાર્ડ.',
          hi: 'बीपीएल अथवा अंत्योदय राशन कार्ड।',
        },
        issuingAuthority: {
          en: 'Food, Civil Supplies & Consumer Affairs Dept',
          gu: 'અન્ન અને નાગરિક પુરવઠા વિભાગ',
          hi: 'खाद्य एवं नागरिक आपूर्ति विभाग',
        },
      },
      {
        documentTypeId: 'bank_passbook',
        required: true,
        helpText: {
          en: 'Bank / Post Office account passbook for pension disbursement.',
          gu: 'પેન્શન જમા થવા માટે બેંક અથવા પોસ્ટ ઓફિસ ખાતાની પાસબુક.',
          hi: 'पेंशन जमा हेतु बैंक अथवा डाकघर पासबुक प्रति।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Collect Form 1 from Mamlatdar Office / Jan Seva Kendra or download online.',
        'Attach BPL certificate, age proof, and bank details.',
        'Submit to Mamlatdar office / Taluka social welfare officer.',
        'Monthly pension credited to bank/post office account upon sanction.',
      ],
      gu: [
        'મામલતદાર કચેરી / જન સેવા કેન્દ્રમાંથી ફોર્મ મેળવો.',
        'બીપીએલ પ્રમાણપત્ર, ઉંમરનો પુરાવો અને બેંક વિગતો જોડો.',
        'મામલતદાર કચેરી અથવા તાલુકા સમાજ કલ્યાણ અધિકારી સમક્ષ જમા કરાવો.',
        'મંજૂરી બાદ દર મહિને સીધા ખાતામાં પેન્શન જમા થશે.',
      ],
      hi: [
        'मामलतदार कार्यालय या जन सेवा केंद्र से आवेदन प्रपत्र प्राप्त करें।',
        'बीपीएल प्रमाण पत्र, आयु प्रमाण और बैंक विवरण संलग्न करें।',
        'मामलतदार कार्यालय अथवा समाज कल्याण अधिकारी को प्रस्तुत करें।',
        'स्वीकृति उपरांत मासिक पेंशन बैंक/डाकघर खाते में सीधे पहुंचेगी।',
      ],
    },
    applicationUrl: 'https://nsap.nic.in/',
    sourceUrl: 'https://nsap.nic.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'demo_placeholder',
      reviewer: null,
      note: 'Guidelines from NSAP Gujarat administration. Needs human review of BPL score ceiling.',
    },
  },
  {
    id: 'manav-garima-yojana',
    name: {
      en: 'Manav Garima Yojana',
      gu: 'માનવ ગરિમા યોજના (સાધન કિટ સહાય)',
      hi: 'मानव गरिमा योजना (कारीगर टूलकिट सहायता)',
    },
    department: {
      en: 'Social Justice and Empowerment Department, Gujarat',
      gu: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ, ગુજરાત સરકાર',
      hi: 'सामाजिक न्याय एवं अधिकारिता विभाग, गुजरात सरकार',
    },
    summary: {
      en: 'Free professional toolkits and trade equipment for self-employed artisans, small vendors, and laborers.',
      gu: 'નાના વેપારીઓ, કારીગરો અને શ્રમિકોને આત્મનિર્ભરતા માટે વિનામૂલ્યે વ્યાવસાયિક સાધન કિટ સહાય.',
      hi: 'छोटे कारीगरों, विक्रेताओं और श्रमिकों को स्वरोजगार हेतु निःशुल्क आधुनिक टूलकिट सहायता।',
    },
    benefitDescription: {
      en: 'Free professional trade toolkit worth up to ₹25,000 across 28 approved occupations (e.g. carpentry, tailoring, plumbing).',
      gu: '૨૮ માન્ય વ્યવસાયો (સુથારી, દરજીકામ, પ્લમ્બિંગ વગેરે) માટે ₹૨૫,૦૦૦ સુધીની સાધન કિટ વિનામૂલ્યે.',
      hi: '28 अनुमोदित व्यवसायों (बढ़ईगीरी, सिलाई, प्लंबिंग आदि) हेतु ₹25,000 मूल्य तक की आधुनिक टूलकिट निःशुल्क।',
    },
    beneficiaryScope: 'individual',
    rules: [
      {
        id: 'rule-mg-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Permanent resident of Gujarat',
          gu: 'ગુજરાતના કાયમી વતની',
          hi: 'गुजरात के स्थायी निवासी',
        },
      },
      {
        id: 'rule-mg-age',
        field: 'age',
        operator: 'gte',
        value: 18,
        mandatory: true,
        label: {
          en: 'Age must be 18 to 60 years',
          gu: 'ઉંમર ૧૮ થી ૬૦ વર્ષ વચ્ચે હોવી જરૂરી',
          hi: 'आयु 18 से 60 वर्ष के बीच होनी चाहिए',
        },
      },
      {
        id: 'rule-mg-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 150000,
        mandatory: true,
        label: {
          en: 'Annual income up to ₹1,50,000',
          gu: 'વાર્ષિક આવક ₹૧,૫૦,૦૦૦ સુધી',
          hi: 'वार्षिक आय ₹1,50,000 तक',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'income_certificate',
        required: true,
        helpText: {
          en: 'Current income certificate issued by competent authority.',
          gu: 'મામલતદાર / ટીડીઓ દ્વારા જારી કરેલ આવકનો દાખલો.',
          hi: 'सक्षम अधिकारी द्वारा प्रदत्त आय प्रमाण पत्र।',
        },
        issuingAuthority: {
          en: 'Revenue Department / TDO',
          gu: 'મહેસૂલ વિભાગ / ટીડીઓ',
          hi: 'राजस्व विभाग / बीडीओ',
        },
      },
      {
        documentTypeId: 'ration_card',
        required: true,
        helpText: {
          en: 'Ration card copy verifying household members.',
          gu: 'કુટુંબના સભ્યોની વિગતો દર્શાવતું રેશન કાર્ડ.',
          hi: 'राशन कार्ड प्रति जिसमें परिवार के सदस्यों का विवरण हो।',
        },
      },
      {
        documentTypeId: 'identity_proof',
        required: true,
        helpText: {
          en: 'Aadhaar Card copy.',
          gu: 'આધાર કાર્ડની નકલ.',
          hi: 'आधार कार्ड प्रति।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Apply online at esamajkalyan.gujarat.gov.in during annual application window.',
        'Select vocation/trade and upload identity & income proofs.',
        'Scrutiny and computer draw by District Social Welfare Office.',
        'Distribution camp organized to hand over toolkits.',
      ],
      gu: [
        'esamajkalyan.gujarat.gov.in પોર્ટલ પર વાર્ષિક સમયગાળામાં અરજી કરો.',
        'તમારો વ્યવસાય પસંદ કરો અને આવક દાખલો તથા આધાર અપલોડ કરો.',
        'જિલ્લા પછાતવર્ગ કલ્યાણ કચેરી દ્વારા ચકાસણી અને કોમ્પ્યુટર ડ્રો.',
        'શિબિર યોજી લાભાર્થીઓને સાધન કિટનું વિતરણ.',
      ],
      hi: [
        'esamajkalyan.gujarat.gov.in पर ऑनलाइन आवेदन करें।',
        'अपने व्यवसाय का चयन करें और आय व आधार दस्तावेज अपलोड करें।',
        'जिला समाज कल्याण कार्यालय द्वारा सत्यापन व कम्प्यूटर ड्रा।',
        'आयोजित शिविर में टूलकिट का निःशुल्क वितरण।',
      ],
    },
    applicationUrl: 'https://esamajkalyan.gujarat.gov.in/',
    sourceUrl: 'https://esamajkalyan.gujarat.gov.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'demo_placeholder',
      reviewer: null,
      note: 'Guidelines from e-Samaj Kalyan portal for artisan kits. Needs human verification.',
    },
  },
  {
    id: 'vidhva-sahay-yojana',
    name: {
      en: 'Ganga Swarupa Sahay Yojana (Widow Pension)',
      gu: 'ગંગા સ્વરૂપા આર્થિક સહાય યોજના (વિધવા સહાય)',
      hi: 'गंगा स्वरूपा आर्थिक सहायता योजना (विधवा पेंशन)',
    },
    department: {
      en: 'Women and Child Development Department, Gujarat',
      gu: 'મહિલા અને બાળ વિકાસ વિભાગ, ગુજરાત સરકાર',
      hi: 'महिला एवं बाल विकास विभाग, गुजरात सरकार',
    },
    summary: {
      en: 'Monthly financial pension directly transferred to widowed women in Gujarat for dignified living.',
      gu: 'નિરાધાર વિધવા બહેનોને સન્માનપૂર્વક જીવન જીવવા માટે માસિક સીધી આર્થિક સહાય.',
      hi: 'निराश्रित विधवा महिलाओं के सम्मानजनक जीवनयापन हेतु मासिक प्रत्यक्ष आर्थिक सहायता।',
    },
    benefitDescription: {
      en: 'Direct monthly pension of ₹1,250 transferred via DBT directly into beneficiary bank/post office account.',
      gu: 'માસિક ₹૧,૨૫૦ ની સીધી સહાય DBT દ્વારા બહેનોના બેંક અથવા પોસ્ટ ખાતામાં દર મહિને.',
      hi: 'प्रति माह ₹1,250 की आर्थिक सहायता सीधे लाभार्थी के बैंक खाते में डीबीटी द्वारा।',
    },
    beneficiaryScope: 'individual',
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
        id: 'rule-gs-marital',
        field: 'maritalStatus',
        operator: 'eq',
        value: 'widowed',
        mandatory: true,
        label: {
          en: 'Must be widowed',
          gu: 'વિધવા (ગંગા સ્વરૂપા) હોવા જરૂરી',
          hi: 'विधवा (गंगा स्वरूपा) होना आवश्यक',
        },
      },
      {
        id: 'rule-gs-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 150000,
        mandatory: true,
        label: {
          en: 'Annual income up to ₹1,50,000',
          gu: 'વાર્ષિક આવક ₹૧,૫૦,૦૦૦ સુધી',
          hi: 'वार्षिक आय ₹1,50,000 तक',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'identity_proof',
        required: true,
        helpText: {
          en: 'Aadhaar Card and husband death certificate.',
          gu: 'આધાર કાર્ડ અને પતિના અવસાનનું સત્તાવાર પ્રમાણપત્ર.',
          hi: 'आधार कार्ड तथा पति का आधिकारिक मृत्यु प्रमाण पत्र।',
        },
        issuingAuthority: {
          en: 'Registrar of Births and Deaths / Local Body',
          gu: 'જન્મ-મરણ રજીસ્ટ્રાર / સ્થાનિક સ્વરાજ્ય સંસ્થા',
          hi: 'जन्म एवं मृत्यु रजिस्ट्रार',
        },
      },
      {
        documentTypeId: 'income_certificate',
        required: true,
        helpText: {
          en: 'Income certificate issued by Mamlatdar / competent revenue officer.',
          gu: 'મામલતદાર દ્વારા જારી આવક પ્રમાણપત્ર.',
          hi: 'मामलतदार द्वारा प्रदत्त आय प्रमाण पत्र।',
        },
        issuingAuthority: {
          en: 'Mamlatdar Office',
          gu: 'મામલતદાર કચેરી',
          hi: 'मामलतदार कार्यालय',
        },
      },
      {
        documentTypeId: 'domicile_certificate',
        required: true,
        helpText: {
          en: 'Proof of continuous residence in Gujarat.',
          gu: 'ગુજરાતમાં વસવાટનો પુરાવો.',
          hi: 'गुजरात में निवास का प्रमाण पत्र।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Collect Ganga Swarupa application form from Jan Seva Kendra or Taluka Mamlatdar office.',
        'Attach husband death certificate, income certificate, and non-remarriage affidavit.',
        'Submit at Jan Seva Kendra or apply on Digital Gujarat portal.',
        'Sanction order issued; monthly assistance credited on 1st of every month.',
      ],
      gu: [
        'જન સેવા કેન્દ્ર અથવા તાલુકા મામલતદાર કચેરીમાંથી ગંગા સ્વરૂપા અરજી ફોર્મ મેળવો.',
        'પતિના મરણનો દાખલો, આવકનો દાખલો અને પુનઃલગ્ન ન કર્યા અંગેનું સોગંદનામું જોડો.',
        'જન સેવા કેન્દ્ર અથવા Digital Gujarat પોર્ટલ પર અરજી જમા કરો.',
        'મંજૂરી હુકમ બાદ દર મહિનાની ૧ તારીખે સીધા ખાતામાં સહાય જમા.',
      ],
      hi: [
        'जन सेवा केंद्र या मामलतदार कार्यालय से आवेदन पत्र प्राप्त करें।',
        'पति का मृत्यु प्रमाण पत्र, आय प्रमाण पत्र व पुनर्विवाह न करने का हलफनामा संलग्न करें।',
        'जन सेवा केंद्र अथवा डिजिटल गुजरात पोर्टल पर आवेदन प्रस्तुत करें।',
        'स्वीकृति के बाद हर महीने की पहली तारीख को सीधे खाते में पेंशन।',
      ],
    },
    applicationUrl: 'https://www.digitalgujarat.gov.in/',
    sourceUrl: 'https://www.digitalgujarat.gov.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'demo_placeholder',
      reviewer: null,
      note: 'Ganga Swarupa Sahay guidelines from Revenue/Welfare dept. Needs verification.',
    },
  },
  {
    id: 'divyang-sadhan-sahay',
    name: {
      en: 'Divyang Sadhan Sahay Yojana (Prosthetics & Aids)',
      gu: 'દિવ્યાંગ સાધન સહાય યોજના (કૃત્રિમ અંગો અને સાધનો)',
      hi: 'दिव्यांग साधन सहायता योजना (सहायक उपकरण)',
    },
    department: {
      en: 'Social Justice and Empowerment Department, Gujarat',
      gu: 'સામાજિક ન્યાય અને અધિકારીતા વિભાગ, ગુજરાત સરકાર',
      hi: 'सामाजिक न्याय एवं अधिकारिता विभाग, गुजरात सरकार',
    },
    summary: {
      en: 'Free assistive devices including tricycles, wheelchairs, hearing aids, and calipers for persons with disabilities.',
      gu: 'દિવ્યાંગ નાગરિકો માટે ટ્રાઇસિકલ, વ્હીલચેર, શ્રવણ યંત્ર અને કેલિપર્સ જેવા સહાયક સાધનો વિનામૂલ્યે.',
      hi: 'दिव्यांगजनों हेतु ट्राईसाइकिल, व्हीलचेयर, श्रवण यंत्र आदि आवश्यक सहायक उपकरण पूर्णतः निःशुल्क।',
    },
    benefitDescription: {
      en: '100% free assistive equipment (tricycles, motorized tricycles, wheelchairs, hearing aids, prosthetic limbs).',
      gu: '૧૦૦% વિનામૂલ્યે જરૂરી સહાયક સાધનો (ટ્રાઇસિકલ, બેટરી સંચાલિત ટ્રાઇસિકલ, વ્હીલચેર, શ્રવણ યંત્ર).',
      hi: '100% निःशुल्क आवश्यक सहायक उपकरण (ट्राईसाइकिल, बैटरी चालित साइकिल, व्हीलचेयर, कान की मशीन)।',
    },
    beneficiaryScope: 'individual',
    rules: [
      {
        id: 'rule-divyang-residence',
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
        id: 'rule-divyang-status',
        field: 'disability',
        operator: 'eq',
        value: 'yes',
        mandatory: true,
        label: {
          en: 'Must have qualifying disability',
          gu: '૪૦% કે તેથી વધુ દિવ્યાંગતા હોવી જરૂરી',
          hi: '40% या उससे अधिक दिव्यांगता होना आवश्यक',
        },
      },
      {
        id: 'rule-divyang-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 100000,
        mandatory: false,
        label: {
          en: 'Annual household income preferably under ₹1,00,000',
          gu: 'વાર્ષિક આવક પ્રાધાન્ય રૂપે ₹૧,૦૦,૦૦૦ થી ઓછી',
          hi: 'वार्षिक आय प्राथमिकता से ₹1,00,000 से कम',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'disability_certificate',
        required: true,
        helpText: {
          en: 'Valid UDID Card or Civil Surgeon Disability Certificate showing minimum 40% disability.',
          gu: 'સિવિલ સર્જન દ્વારા પ્રમાણિત ૪૦% કે તેથી વધુ દિવ્યાંગતા દર્શાવતું UDID કાર્ડ.',
          hi: 'सिविल सर्जन द्वारा जारी 40% या अधिक दिव्यांगता वाला यूडीआईडी कार्ड।',
        },
        issuingAuthority: {
          en: 'District Civil Hospital / Health & Family Welfare Dept',
          gu: 'જિલ્લા સિવિલ હોસ્પિટલ / આરોગ્ય વિભાગ',
          hi: 'जिला अस्पताल / स्वास्थ्य विभाग',
        },
        whereToGet: {
          en: ['Apply at swavlambancard.gov.in or District Civil Hospital.'],
          gu: ['swavlambancard.gov.in પોર્ટલ અથવા સિવિલ હોસ્પિટલમાંથી મેળવો.'],
          hi: ['swavlambancard.gov.in अथवा जिला नागरिक चिकित्सालय से प्राप्त करें।'],
        },
      },
      {
        documentTypeId: 'income_certificate',
        required: true,
        helpText: {
          en: 'Income certificate issued by competent revenue authority.',
          gu: 'મામલતદાર / તાલુકા વિકાસ અધિકારીનો આવકનો દાખલો.',
          hi: 'सक्षम राजस्व अधिकारी द्वारा जारी आय प्रमाण पत्र।',
        },
      },
      {
        documentTypeId: 'identity_proof',
        required: true,
        helpText: {
          en: 'Aadhaar card copy with current residential address.',
          gu: 'હાલના સરનામા સાથે આધાર કાર્ડની નકલ.',
          hi: 'वर्तमान निवास पते के साथ आधार कार्ड प्रति।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Apply online on e-Samaj Kalyan portal (esamajkalyan.gujarat.gov.in).',
        'Upload UDID card, medical assessment, and income certificate.',
        'District social defense officer reviews application and issues sanction.',
        'Equipment handed over at district distribution camp or assistive center.',
      ],
      gu: [
        'e-Samaj Kalyan પોર્ટલ (esamajkalyan.gujarat.gov.in) પર ઓનલાઇન અરજી કરો.',
        'UDID કાર્ડ, મેડિકલ સર્ટીફિકેટ અને આવક દાખલો અપલોડ કરો.',
        'જિલ્લા સમાજ સુરક્ષા અધિકારી દ્વારા મંજૂરી આપવામાં આવશે.',
        'જિલ્લા કક્ષાએ કેમ્પ યોજી જરૂરી સાધનની વિનામૂલ્યે સોંપણી.',
      ],
      hi: [
        'ई-समाज कल्याण पोर्टल पर ऑनलाइन आवेदन करें।',
        'यूडीआईडी कार्ड, मेडिकल सर्टिफिकेट और आय प्रमाण पत्र अपलोड करें।',
        'जिला समाज सुरक्षा अधिकारी द्वारा सत्यापन एवं स्वीकृति।',
        'जिला वितरण शिविर में उपकरण का निःशुल्क वितरण।',
      ],
    },
    applicationUrl: 'https://esamajkalyan.gujarat.gov.in/',
    sourceUrl: 'https://esamajkalyan.gujarat.gov.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'demo_placeholder',
      reviewer: null,
      note: 'e-Samaj Kalyan disability welfare assistance. Human verification pending.',
    },
  },
]

// Validate dataset at module boundary — fails loudly in dev/test if invalid
export const SCHEMES_DATASET: SchemeRecord[] = validateSchemes(RAW_SCHEMES_DATASET)
