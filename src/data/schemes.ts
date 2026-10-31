import type { SchemeRecord } from '../domain/scheme.types'
import { validateSchemes } from './validation'

const RAW_SCHEMES_DATASET: SchemeRecord[] = [
  {
    id: 'mysy',
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
      en: 'Tuition fee assistance, hostel allowance, and book grants for higher education students admitted to recognized diploma and degree courses.',
      gu: 'માન્ય ડિપ્લોમા અને ડિગ્રી અભ્યાસક્રમોમાં પ્રવેશ મેળવતા ઉચ્ચ શિક્ષણના વિદ્યાર્થીઓ માટે ટ્યુશન ફી, હોસ્ટેલ અને પુસ્તક સહાય.',
      hi: 'मान्यता प्राप्त डिप्लोमा एवं डिग्री पाठ्यक्रमों में प्रवेश लेने वाले उच्च शिक्षा विद्यार्थियों के लिए ट्यूशन फीस, हॉस्टल और पुस्तक सहायता।',
    },
    benefitDescription: {
      en: 'Tuition assistance up to approved course limits (e.g. up to ₹2,00,000 for Medical/Dental, ₹50,000 for Professional courses) plus ₹1,200/month lodging.',
      gu: '૫૦% ટ્યુશન ફી સહાય (મેડિકલ માટે ₹૨,૦૦,૦૦૦ સુધી, પ્રોફેશનલ માટે ₹૫૦,૦૦૦ સુધી) અને માસિક ₹૧,૨૦૦ હોસ્ટેલ સહાય.',
      hi: 'पाठ्यक्रम अनुसार 50% ट्यूशन फीस सहायता (मेडिकल हेतु अधिकतम ₹2,00,000, इंजीनियरिंग हेतु ₹50,000) तथा ₹1,200 मासिक हॉस्टल अनुदान।',
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
        id: 'rule-mysy-education',
        field: 'educationLevel',
        operator: 'in',
        value: ['undergraduate', 'diploma_or_iti'],
        mandatory: true,
        label: {
          en: 'Enrolled in Diploma or Undergraduate degree program',
          gu: 'ડિપ્લોમા અથવા સ્નાતક ડિગ્રીમાં અભ્યાસ',
          hi: 'डिप्लोमा अथवा स्नातक डिग्री में अध्ययनरत',
        },
      },
      {
        id: 'rule-mysy-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 600000,
        mandatory: true,
        label: {
          en: 'Parents annual income up to ₹6,00,000',
          gu: 'વાલીની વાર્ષિક આવક ₹૬,૦૦,૦૦૦ સુધી',
          hi: 'माता-पिता की वार्षिक आय ₹6,00,000 तक',
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
          en: 'Parent income certificate from Mamlatdar or Taluka Development Officer (TDO).',
          gu: 'મામલતદાર અથવા તાલુકા વિકાસ અધિકારી (TDO) નું આવકનું પ્રમાણપત્ર.',
          hi: 'मामलतदार या तालुका विकास अधिकारी (TDO) का आय प्रमाण पत्र।',
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
        documentTypeId: 'marksheet',
        required: true,
        helpText: {
          en: 'Class 10 or 12 board examination marksheet showing 80 percentile or Diploma marksheet.',
          gu: 'ધોરણ ૧૦ અથવા ૧૨ બોર્ડ પરીક્ષાનું ગુણપત્રક (૮૦ પર્સન્ટાઇલ) અથવા ડિપ્લોમા ગુણપત્રક.',
          hi: 'कक्षा 10वीं या 12वीं बोर्ड परीक्षा की अंकतालिका अथवा डिप्लोमा अंकतालिका।',
        },
        issuingAuthority: {
          en: 'Gujarat Secondary & Higher Secondary Education Board / Technical Board',
          gu: 'ગુજરાત માધ્યમિક અને ઉચ્ચતર માધ્યમિક શિક્ષણ બોર્ડ / ટેકનિકલ બોર્ડ',
          hi: 'गुजरात माध्यमिक एवं उच्चतर माध्यमिक शिक्षा बोर्ड',
        },
      },
      {
        documentTypeId: 'bonafide_certificate',
        required: true,
        helpText: {
          en: 'Admission committee letter and certificate from head of institution on letterhead.',
          gu: 'પ્રવેશ સમિતિનો પત્ર અને સંસ્થાના વડાનું પ્રમાણપત્ર.',
          hi: 'प्रवेश समिति का आवंटन पत्र एवं संस्था प्रमुख का प्रमाण पत्र।',
        },
        issuingAuthority: {
          en: 'Admitting College / ACPC Gujarat',
          gu: 'કોલેજ વહીવટી વિભાગ / ACPC ગુજરાત',
          hi: 'महाविद्यालय / एसीपीसी गुजरात',
        },
      },
      {
        documentTypeId: 'bank_passbook',
        required: true,
        helpText: {
          en: 'First page of student savings bank passbook with clear account number and IFSC.',
          gu: 'વિદ્યાર્થીના બચત ખાતાની પાસબુકનું પ્રથમ પાનું.',
          hi: 'विद्यार्थी के बचत बैंक खाते की पासबुक का प्रथम पृष्ठ।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Register/login at mysy.guj.nic.in with board seat number.',
        'Complete fresh application form and upload scanned self-attested documents.',
        'Attend designated help-centre for original document verification.',
        'Renew application every academic year to continue benefit.',
      ],
      gu: [
        'mysy.guj.nic.in પોર્ટલ પર બોર્ડ સીટ નંબર સાથે ઓનલાઇન નોંધણી કરો.',
        'નવી અરજી પૂર્ણ કરી જરૂરી દસ્તાવેજો અપલોડ કરો.',
        'નિયુક્ત હેલ્પ સેન્ટર પર રૂબરૂ અસલ દસ્તાવેજોની ચકાસણી કરાવો.',
        'લાભ ચાલુ રાખવા માટે દર શૈક્ષણિક વર્ષે અરજી રિન્યૂ કરો.',
      ],
      hi: [
        'mysy.guj.nic.in पर बोर्ड रोल नंबर के साथ ऑनलाइन पंजीकरण करें।',
        'आवेदन पत्र भरें और प्रमाणित दस्तावेज अपलोड करें।',
        'नामित सहायता केंद्र पर मूल दस्तावेजों का भौतिक सत्यापन कराएं।',
        'सहायता जारी रखने हेतु प्रत्येक शैक्षणिक वर्ष में नवीनीकरण करें।',
      ],
    },
    applicationUrl: 'https://mysy.guj.nic.in/',
    sourceUrl: 'https://mysy.guj.nic.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'needs_review',
      reviewer: null,
      note: 'Official FAQs and technical guidelines checked on 2026-10-31. Human sign-off pending.',
    },
  },
  {
    id: 'pm-usp-csss',
    name: {
      en: 'PM-USP Central Sector Scheme of Scholarship (CSSS)',
      gu: 'પીએમ-યુએસપી સેન્ટ્રલ સેક્ટર સ્કોલરશિપ સ્કીમ (CSSS)',
      hi: 'पीएम-यूएसपी सेंट्रल सेक्टर स्कॉलरशिप स्कीम (CSSS)',
    },
    department: {
      en: 'Ministry of Education, Department of Higher Education',
      gu: 'શિક્ષણ મંત્રાલય, ઉચ્ચ શિક્ષણ વિભાગ',
      hi: 'शिक्षा मंत्रालय, उच्च शिक्षा विभाग',
    },
    summary: {
      en: 'Central scholarship for low-income meritorious students scoring in top 20th percentile of Class 12 pursuing regular higher education.',
      gu: 'ધોરણ ૧૨ માં ટોપ ૨૦ પર્સન્ટાઇલ મેળવી નિયમિત સ્નાતક અભ્યાસ કરતા ઓછી આવક ધરાવતા તેજસ્વી વિદ્યાર્થીઓ માટે કેન્દ્રીય શિષ્યવૃત્તિ.',
      hi: 'कक्षा 12वीं में शीर्ष 20 प्रतिशतक प्राप्त कर नियमित स्नातक अध्ययन करने वाले मेधावी विद्यार्थियों के लिए केंद्रीय छात्रवृत्ति।',
    },
    benefitDescription: {
      en: '₹12,000/year at graduation for first 3 years; ₹20,000/year at PG level directly credited via DBT on National Scholarship Portal.',
      gu: 'સ્નાતકના પ્રથમ ૩ વર્ષ માટે વાર્ષિક ₹૧૨,૦૦૦; અનુસ્નાતક માટે વાર્ષિક ₹૨૦,૦૦૦ સીધા બેંક ખાતામાં DBT મારફત.',
      hi: 'स्नातक के प्रथम 3 वर्षों हेतु ₹12,000/वर्ष; स्नातकोत्तर स्तर पर ₹20,000/वर्ष सीधे डीबीटी द्वारा।',
    },
    beneficiaryScope: 'individual',
    rules: [
      {
        id: 'rule-csss-occupation',
        field: 'occupation',
        operator: 'eq',
        value: 'student',
        mandatory: true,
        label: {
          en: 'Must be enrolled as regular student',
          gu: 'નિયમિત વિદ્યાર્થી તરીકે અભ્યાસ જરૂરી',
          hi: 'नियमित विद्यार्थी के रूप में अध्ययनरत होना आवश्यक',
        },
      },
      {
        id: 'rule-csss-education',
        field: 'educationLevel',
        operator: 'in',
        value: ['undergraduate', 'postgraduate'],
        mandatory: true,
        label: {
          en: 'Enrolled in regular Undergraduate or Postgraduate course (Diploma excluded)',
          gu: 'નિયમિત સ્નાતક અથવા અનુસ્નાતક અભ્યાસક્રમ (ડિપ્લોમા માન્ય નથી)',
          hi: 'नियमित स्नातक अथवा स्नातकोत्तर पाठ्यक्रम (डिप्लोमा पात्र नहीं)',
        },
      },
      {
        id: 'rule-csss-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 450000,
        mandatory: true,
        label: {
          en: 'Annual family income up to ₹4,50,000',
          gu: 'કુટુંબની વાર્ષિક આવક ₹૪,૫૦,૦૦૦ સુધી',
          hi: 'पारिवारिक वार्षिक आय ₹4,50,000 तक',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'marksheet',
        required: true,
        helpText: {
          en: 'Class 12 board marksheet verifying candidate is within top 20th percentile cutoff.',
          gu: 'ધોરણ ૧૨ બોર્ડ માર્કશીટ (ટોપ ૨૦ પર્સન્ટાઇલ કટઓફ મુજબ).',
          hi: 'कक्षा 12वीं बोर्ड अंकतालिका (शीर्ष 20 पर्सेंटाइल कटऑफ हेतु)।',
        },
      },
      {
        documentTypeId: 'income_certificate',
        required: true,
        helpText: {
          en: 'Current financial year family income certificate issued by competent authority.',
          gu: 'સક્ષમ સત્તાધિકારી દ્વારા આપવામાં આવેલ કુટુંબની આવકનો દાખલો.',
          hi: 'सक्षम अधिकारी द्वारा जारी पारिवारिक आय प्रमाण पत्र।',
        },
      },
      {
        documentTypeId: 'caste_certificate',
        required: false,
        helpText: {
          en: 'Category certificate for SC/ST/OBC/EWS candidates claiming quota.',
          gu: 'અનામત વર્ગ માટે જાતિનું સત્તાવાર પ્રમાણપત્ર.',
          hi: 'आरक्षित वर्ग हेतु सक्षम अधिकारी द्वारा जारी जाति प्रमाण पत्र।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Complete One Time Registration (OTR) on scholarships.gov.in',
        'Login, generate Application ID, and select PM-USP CSSS under Post-Matric section',
        'Fill academic and category details, upload documents, and submit',
        'Institute and State Nodal Officer verify credentials before DBT disbursement',
      ],
      gu: [
        'scholarships.gov.in પોર્ટલ પર વન ટાઇમ રજીસ્ટ્રેશન (OTR) પૂર્ણ કરો',
        'લોગિન કરી પોસ્ટ-મેટ્રિક હેઠળ PM-USP CSSS યોજના પસંદ કરો',
        'શૈક્ષણિક વિગતો ભરી દસ્તાવેજો અપલોડ કરો અને સબમિટ કરો',
        'કોલેજ અને રાજ્ય નોડલ અધિકારી દ્વારા ચકાસણી બાદ સહાય ખાતામાં જમા',
      ],
      hi: [
        'scholarships.gov.in पर वन टाइम रजिस्ट्रेशन (OTR) पूर्ण करें',
        'लॉगिन कर पोस्ट-मैट्रिक अनुभाग में PM-USP CSSS योजना का चयन करें',
        'शैक्षणिक विवरण भरें, दस्तावेज अपलोड कर सबमिट करें',
        'संस्थान एवं राज्य नोडल अधिकारी सत्यापन के पश्चात डीबीटी वितरण',
      ],
    },
    applicationUrl: 'https://scholarships.gov.in/',
    sourceUrl: 'https://scholarships.gov.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'needs_review',
      reviewer: null,
      note: 'Official AY 2025-26 FAQ checked 2026-10-31. Requires no other scholarship receipt. Human sign-off pending.',
    },
  },
  {
    id: 'pm-vidyalaxmi',
    name: {
      en: 'Pradhan Mantri Vidyalaxmi',
      gu: 'પ્રધાનમંત્રી વિદ્યાલક્ષ્મી યોજના',
      hi: 'प्रधानमंत्री विद्यालक्ष्मी योजना',
    },
    department: {
      en: 'Ministry of Education, Department of Higher Education',
      gu: 'શિક્ષણ મંત્રાલય, ઉચ્ચ શિક્ષણ વિભાગ',
      hi: 'शिक्षा मंत्रालय, उच्च शिक्षा विभाग',
    },
    summary: {
      en: 'Digital education loan platform with 3% interest subvention during moratorium for meritorious students admitted to Quality Higher Education Institutions (QHEIs).',
      gu: 'ગુણવત્તાયુક્ત ઉચ્ચ શૈક્ષણિક સંસ્થાઓ (QHEIs) માં મેરિટ પર પ્રવેશ મેળવતા વિદ્યાર્થીઓ માટે ૩% વ્યાજ સબસિડી સાથે એજ્યુકેશન લોન પ્લેટફોર્મ.',
      hi: 'गुणवत्तापूर्ण उच्च शिक्षण संस्थानों (QHEIs) में मेरिट प्रवेश पाने वाले विद्यार्थियों हेतु 3% ब्याज अनुदान सहित शिक्षा ऋण मंच।',
    },
    benefitDescription: {
      en: 'Education loan (not a grant) with 3% interest subvention up to ₹10 lakh loan for family income up to ₹8 lakh; CSIS full subvention for income up to ₹4.5 lakh.',
      gu: 'વાર્ષિક ₹૮ લાખ સુધીની આવક માટે ₹૧૦ લાખ સુધીની લોન પર ૩% વ્યાજ સબસિડી (આ લોન છે, ગ્રાન્ટ નથી).',
      hi: '₹8 लाख तक की आय हेतु ₹10 लाख तक के ऋण पर 3% ब्याज अनुदान (यह ऋण है, अनुदान नहीं)।',
    },
    beneficiaryScope: 'individual',
    rules: [
      {
        id: 'rule-vl-occupation',
        field: 'occupation',
        operator: 'eq',
        value: 'student',
        mandatory: true,
        label: {
          en: 'Must be a student admitted on merit',
          gu: 'મેરિટ પર પ્રવેશ મેળવેલ વિદ્યાર્થી હોવા જરૂરી',
          hi: 'मेरिट पर प्रवेश पाने वाले विद्यार्थी होना आवश्यक',
        },
      },
      {
        id: 'rule-vl-education',
        field: 'educationLevel',
        operator: 'in',
        value: ['undergraduate', 'postgraduate', 'diploma_or_iti'],
        mandatory: true,
        label: {
          en: 'Enrolled in eligible higher education program',
          gu: 'માન્ય ઉચ્ચ શિક્ષણ અભ્યાસક્રમમાં પ્રવેશ',
          hi: 'मान्यता प्राप्त उच्च शिक्षा पाठ्यक्रम में प्रवेश',
        },
      },
      {
        id: 'rule-vl-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 800000,
        mandatory: true,
        label: {
          en: 'Family annual income up to ₹8,00,000 for interest subvention',
          gu: 'વ્યાજ સહાય માટે કુટુંબની વાર્ષિક આવક ₹૮,૦૦,૦૦૦ સુધી',
          hi: 'ब्याज अनुदान हेतु पारिवारिक वार्षिक आय ₹8,00,000 तक',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'bonafide_certificate',
        required: true,
        helpText: {
          en: 'Admission letter and official fee schedule issued by the higher educational institution.',
          gu: 'પ્રવેશ પત્ર અને શૈક્ષણિક સંસ્થા દ્વારા આપવામાં આવેલ ફી માળખું.',
          hi: 'प्रवेश आवंटन पत्र एवं शिक्षण संस्थान द्वारा जारी शुल्क विवरण।',
        },
      },
      {
        documentTypeId: 'marksheet',
        required: true,
        helpText: {
          en: 'Class 10 and Class 12 or last qualifying examination marksheets.',
          gu: 'ધોરણ ૧૦ અને ૧૨ અથવા છેલ્લી પરીક્ષાનું ગુણપત્રક.',
          hi: 'कक्षा 10वीं एवं 12वीं अथवा अंतिम योग्यता परीक्षा की अंकतालिका।',
        },
      },
      {
        documentTypeId: 'income_certificate',
        required: true,
        helpText: {
          en: 'Family income certificate from competent revenue authority for interest subvention claim.',
          gu: 'વ્યાજ સબસિડી ક્લેમ માટે સક્ષમ અધિકારી દ્વારા જારી આવક પ્રમાણપત્ર.',
          hi: 'ब्याज अनुदान दावे हेतु सक्षम राजस्व अधिकारी द्वारा जारी आय प्रमाण पत्र।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Register/login at pmvidyalaxmi.co.in',
        'Fill common education loan application form (CELAF) with course and college details',
        'Upload marksheet, admission proof, and income documents',
        'Select up to 3 preferred banks, review loan offers, and opt for interest subvention',
      ],
      gu: [
        'pmvidyalaxmi.co.in પર નોંધણી/લોગિન કરો',
        'સામાન્ય એજ્યુકેશન લોન અરજી ફોર્મ ભરો અને અભ્યાસક્રમ વિગતો દાખલ કરો',
        'માર્કશીટ, પ્રવેશ પુરાવો અને આવકના દસ્તાવેજો અપલોડ કરો',
        'મહત્તમ ૩ બેંકો પસંદ કરી સબમિટ કરો અને વ્યાજ સબસિડી પસંદ કરો',
      ],
      hi: [
        'pmvidyalaxmi.co.in पर पंजीकरण/लॉगिन करें',
        'शिक्षा ऋण आवेदन पत्र भरें और कॉलेज व पाठ्यक्रम विवरण दर्ज करें',
        'अंकतालिका, प्रवेश पत्र तथा आय दस्तावेज अपलोड करें',
        'अधिकतम 3 बैंक चुनें, लोन प्रस्ताव जांचें और ब्याज अनुदान चुनें',
      ],
    },
    applicationUrl: 'https://pmvidyalaxmi.co.in/',
    sourceUrl: 'https://pmvidyalaxmi.co.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'needs_review',
      reviewer: null,
      note: 'Official guidelines checked 2026-10-31; loan product with interest subvention, not direct grant. Human sign-off pending.',
    },
  },
  {
    id: 'pm-kisan',
    name: {
      en: 'PM-KISAN Samman Nidhi',
      gu: 'પીએમ-કિસાન સન્માન નિધિ યોજના',
      hi: 'पीएम-किसान सम्मान निधि योजना',
    },
    department: {
      en: 'Department of Agriculture and Farmers Welfare, Government of India',
      gu: 'કૃષિ અને ખેડૂત કલ્યાણ વિભાગ, ભારત સરકાર',
      hi: 'कृषि एवं किसान कल्याण विभाग, भारत सरकार',
    },
    summary: {
      en: 'Direct income support of ₹6,000 per year in three 4-monthly instalments of ₹2,000 to all landholding farmer families with cultivable land.',
      gu: 'ખેતીલાયક જમીન ધરાવતા ખેડૂત પરિવારોને વાર્ષિક ₹૬,૦૦૦ ની સીધી આવક સહાય, દર ૪ મહિને ₹૨,૦૦૦ ના ૩ હપ્તામાં.',
      hi: 'कृषि योग्य भूमि वाले सभी किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता, ₹2,000 की 3 किस्तों में।',
    },
    benefitDescription: {
      en: '₹6,000 per year transferred directly via Aadhaar-linked DBT into farmer savings bank accounts (no general household income cap).',
      gu: 'વાર્ષિક ₹૬,૦૦૦ ની સહાય, ₹૨,૦૦૦ ના ૩ હપ્તામાં સીધા આધાર લિંક્ડ બેંક ખાતામાં DBT મારફત.',
      hi: 'प्रति वर्ष ₹6,00,000 नहीं अपितु ₹6,000 की सहायता सीधे आधार लिंक बैंक खाते में डीबीटी द्वारा।',
    },
    beneficiaryScope: 'household',
    rules: [
      {
        id: 'rule-pmk-occupation',
        field: 'occupation',
        operator: 'eq',
        value: 'farmer',
        mandatory: true,
        label: {
          en: 'Occupation must be Farmer',
          gu: 'મુખ્ય વ્યવસાય ખેતી/ખેડૂત હોવો જરૂરી',
          hi: 'मुख्य व्यवसाय किसान होना आवश्यक',
        },
      },
      {
        id: 'rule-pmk-land',
        field: 'ownsAgriculturalLand',
        operator: 'eq',
        value: 'yes',
        mandatory: true,
        label: {
          en: 'Must own cultivable agricultural landholding',
          gu: 'ખેતીલાયક જમીનની માલિકી હોવી જરૂરી',
          hi: 'कृषि योग्य भूमि का स्वामित्व होना आवश्यक',
        },
        explanation: {
          en: 'Landholding must be in State land records (7/12 & 8-A in Gujarat). Exclusions apply for tax-payers and institutional landholders.',
          gu: 'જમીન રેકોર્ડમાં નામ હોવું જરૂરી છે. આવકવેરો ભરનાર કે સંસ્થાકીય જમીનદારો બાકાત છે.',
          hi: 'राज्य भूमि अभिलेखों में नाम होना आवश्यक। आयकर दाता अपवर्जित हैं।',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'land_record_7_12',
        required: true,
        helpText: {
          en: 'Cultivable land record extract (RoR 7/12 and 8-A in Gujarat) showing applicant ownership.',
          gu: 'જમીનના આધાર ગામ નમૂના ૭/૧૨ અને ૮-અ ની તાજેતરની નકલ.',
          hi: 'कृषि भूमि खतौनी नकल (गुजरात में 7/12 और 8-A)।',
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
        documentTypeId: 'identity_proof',
        required: true,
        helpText: {
          en: 'Aadhaar details for mandatory eKYC verification on pmkisan.gov.in portal.',
          gu: 'પોર્ટલ પર ફરજિયાત eKYC ચકાસણી માટે આધાર વિગતો.',
          hi: 'पीएम किसान पोर्टल पर अनिवार्य ई-केवाईसी सत्यापन हेतु आधार विवरण।',
        },
      },
      {
        documentTypeId: 'bank_passbook',
        required: true,
        helpText: {
          en: 'Aadhaar-seeded active bank account passbook copy for DBT transfer.',
          gu: 'ડીબીટી માટે આધાર લિંક્ડ સક્રિય બેંક ખાતાની પાસબુક.',
          hi: 'डीबीटी हेतु आधार से जुड़े सक्रिय बैंक खाते की पासबुक प्रति।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Use New Farmer Registration on pmkisan.gov.in or apply via local CSC / Gram Panchayat',
        'Enter Aadhaar number, state, district, and land survey block details',
        'State revenue authorities verify land ownership and exclusion criteria',
        'Complete mandatory eKYC (OTP or biometric) to receive quarterly DBT instalments',
      ],
      gu: [
        'pmkisan.gov.in પર ન્યુ ફાર્મર રજીસ્ટ્રેશન કરો અથવા સ્થાનિક CSC/ગ્રામ પંચાયત દ્વારા અરજી કરો',
        'આધાર નંબર, જિલ્લો અને જમીન સર્વે નંબરની વિગતો દાખલ કરો',
        'રાજ્ય મહેસૂલ તંત્ર જમીન માલિકી અને બાકાત નિયમોની ચકાસણી કરે છે',
        'હપ્તા મેળવવા માટે પોર્ટલ પર ફરજિયાત eKYC પૂર્ણ કરો',
      ],
      hi: [
        'pmkisan.gov.in पर नया किसान पंजीकरण करें या सीएससी/ग्राम पंचायत से आवेदन करें',
        'आधार नंबर, जिला और भूमि सर्वे नंबर दर्ज करें',
        'राज्य कृषि विभाग द्वारा भूमि स्वामित्व एवं अपवर्जन सत्यापन',
        'नियमित किस्त प्राप्त करने हेतु पोर्टल पर अनिवार्य ई-केवाईसी पूर्ण करें',
      ],
    },
    applicationUrl: 'https://pmkisan.gov.in/',
    sourceUrl: 'https://pmkisan.gov.in/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'needs_review',
      reviewer: null,
      note: 'Official operational guidelines checked 2026-10-31. No income cap; exclusion criteria apply. Human sign-off pending.',
    },
  },
  {
    id: 'ikhedut-wire-fencing',
    name: {
      en: 'i-Khedut Wire Fencing Assistance (Tar ni Vad)',
      gu: 'આઇ-ખેડૂત કાંટાળી તારની વાડ સહાય યોજના (તાર ની વાડ)',
      hi: 'आई-खेड़ूत तारबंदी सहायता योजना (कांटेदार तार की बाड़)',
    },
    department: {
      en: 'Agriculture, Farmers Welfare and Cooperation Department, Government of Gujarat',
      gu: 'કૃષિ, ખેડૂત કલ્યાણ અને સહકાર વિભાગ, ગુજરાત સરકાર',
      hi: 'कृषि, किसान कल्याण एवं सहकारिता विभाग, गुजरात सरकार',
    },
    summary: {
      en: 'State government subsidy for farmers to construct barbed wire fencing around agricultural land to protect crops from wild animals and stray cattle.',
      gu: 'જંગલી પ્રાણીઓ અને નીલગાયથી પાકના રક્ષણ માટે ખેતર ફરતે કાંટાળી તારની વાડ બનાવવા રાજ્ય સરકારની સબસિડી સહાય.',
      hi: 'जंगली जानवरों और आवारा पशुओं से फसल सुरक्षा हेतु खेत के चारों ओर कांटेदार तारबंदी निर्माण पर राज्य अनुदान।',
    },
    benefitDescription: {
      en: 'Subsidy per running meter based on active component notification upon physical verification and geo-tagging.',
      gu: 'સત્તાવાર ઘટક સૂચના મુજબ રનિંગ મીટર દીઠ સબસિડી (સ્થળ તપાસ બાદ).',
      hi: 'सक्रिय घटक अधिसूचना के अनुसार रनिंग मीटर पर निर्धारित अनुदान।',
    },
    beneficiaryScope: 'household',
    rules: [
      {
        id: 'rule-wf-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Must reside in Gujarat',
          gu: 'ગુજરાતના કાયમી રહેવાસી હોવા જરૂરી',
          hi: 'गुजरात का निवासी होना आवश्यक',
        },
      },
      {
        id: 'rule-wf-occupation',
        field: 'occupation',
        operator: 'eq',
        value: 'farmer',
        mandatory: true,
        label: {
          en: 'Occupation must be Farmer',
          gu: 'મુખ્ય વ્યવસાય ખેતી/ખેડૂત હોવો જરૂરી',
          hi: 'मुख्य व्यवसाय किसान होना आवश्यक',
        },
      },
      {
        id: 'rule-wf-land',
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
          en: 'Updated 7/12 & 8-A land records extract showing survey number.',
          gu: 'જમીનના ગામ નમૂના ૭/૧૨ અને ૮-અ ની નકલ.',
          hi: 'अद्यतन 7/12 और 8-A भूमि खतौनी नकल।',
        },
      },
      {
        documentTypeId: 'bank_passbook',
        required: true,
        helpText: {
          en: 'Aadhaar-linked active bank account passbook copy.',
          gu: 'આધાર લિંક્ડ બેંક ખાતાની પાસબુકની નકલ.',
          hi: 'बैंक खाते की पासबुक प्रति।',
        },
      },
      {
        documentTypeId: 'identity_proof',
        required: true,
        helpText: {
          en: 'Farmer identity verification and demarcated survey map.',
          gu: 'ખેડૂત ઓળખ પુરાવો અને સર્વે નંબરનો નકશો.',
          hi: 'पहचान प्रमाण तथा खेत का सीमांकन नक्शा।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Open ikhedut.gujarat.gov.in and confirm active wire-fencing application window',
        'Fill online application form with land survey numbers and group/individual details',
        'Print application and submit listed documents to District Agriculture Officer within 10 days',
        'Field inspection and geo-tagging carried out prior to subsidy disbursement',
      ],
      gu: [
        'ikhedut.gujarat.gov.in પર જઈ તારની વાડ યોજનાની અરજી ચાલુ હોવાની ખાતરી કરો',
        'જમીન સર્વે નંબર સાથે ઓનલાઇન અરજી ભરો',
        'અરજીની પ્રિન્ટ કાઢી ૧૦ દિવસમાં જિલ્લા ખેતીવાડી અધિકારીને સાધનિક કાગળો જમા કરાવો',
        'સહાય ચુકવણી પહેલાં સ્થળ તપાસ અને જીઓ-ટેગિંગ કરવામાં આવશે',
      ],
      hi: [
        'ikhedut.gujarat.gov.in पर तारबंदी योजना का सक्रिय आवेदन काल जांचें',
        'सर्वे नंबर के साथ ऑनलाइन आवेदन भरें',
        'प्रिंट निकालकर 10 दिनों के भीतर जिला कृषि अधिकारी को दस्तावेज प्रस्तुत करें',
        'अनुदान वितरण से पूर्व स्थलीय निरीक्षण एवं जियो-टैगिंग',
      ],
    },
    applicationUrl: 'https://ikhedut.gujarat.gov.in/iKhedutPublicScheme/',
    sourceUrl: 'https://ikhedut.gujarat.gov.in/iKhedutPublicScheme/',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'needs_review',
      reviewer: null,
      note: 'Partial official source check on 2026-10-31. Component window and exact subsidy rate require human sign-off.',
    },
  },
  {
    id: 'ignoa-vayvandana',
    name: {
      en: 'Indira Gandhi National Old Age Pension (Vay Vandana)',
      gu: 'ઇન્દિરા ગાંધી રાષ્ટ્રીય વૃદ્ધ પેન્શન યોજના (વય વંદના)',
      hi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (वय वंदना)',
    },
    department: {
      en: 'Director of Social Defense, Government of Gujarat',
      gu: 'સમાજ સુરક્ષા ખાતું, ગુજરાત સરકાર',
      hi: 'समाज सुरक्षा निदेशालय, गुजरात सरकार',
    },
    summary: {
      en: 'Monthly social security pension for elderly citizens aged 60 and above living below the poverty line (BPL score 0-20).',
      gu: '૬૦ વર્ષ કે તેથી વધુ વયના ગરીબી રેખા હેઠળ જીવતા (૦-૨૦ સ્કોર) વરિષ્ઠ નાગરિકો માટે માસિક સહાય પેન્શન.',
      hi: '60 वर्ष या अधिक आयु के गरीबी रेखा से नीचे जीवनयापन करने वाले (बीपीएल स्कोर 0-20) वरिष्ठ नागरिकों के लिए मासिक पेंशन।',
    },
    benefitDescription: {
      en: '₹750/month for age 60–79; ₹1,000/month for age 80+ (including ₹500 state contribution) via DBT or money order.',
      gu: '૬૦ થી ૭૯ વર્ષ માટે માસિક ₹૭૫૦; ૮૦ વર્ષ કે વધુ માટે માસિક ₹૧,૦૦૦ (રાજ્ય સરકારના ₹૫૦૦ સહિત).',
      hi: '60 से 79 वर्ष हेतु ₹750 मासिक; 80 वर्ष से अधिक हेतु ₹1,000 मासिक (₹500 राज्य अंशदान सहित)।',
    },
    beneficiaryScope: 'individual',
    rules: [
      {
        id: 'rule-ig-residence',
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
        id: 'rule-ig-age',
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
        id: 'rule-ig-bpl',
        field: 'rationCardType',
        operator: 'in',
        value: ['aay', 'bpl'],
        mandatory: true,
        label: {
          en: 'Must belong to BPL / Antyodaya category',
          gu: 'બીપીએલ અથવા અંત્યોદય કેટેગરીમાં સમાવેશ',
          hi: 'बीपीएल अथवा अंत्योदय श्रेणी में शामिल',
        },
        explanation: {
          en: 'Beneficiary family must be included in rural BPL list (score 0-20) or recognized urban BPL list.',
          gu: 'લાભાર્થી કુટુંબ ૦-૨૦ સ્કોરની બીપીએલ યાદીમાં હોવું જરૂરી.',
          hi: 'लाभार्थी परिवार का नाम 0-20 स्कोर वाली बीपीएल सूची में होना अनिवार्य।',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'identity_proof',
        required: true,
        helpText: {
          en: 'Age certificate / birth proof / school leaving certificate / medical officer certificate.',
          gu: 'ઉંમરનો પુરાવો (જન્મ તારીખનો દાખલો, શાળા છોડ્યાનું પ્રમાણપત્ર અથવા સિવિલ સર્જન દાખલો).',
          hi: 'आयु प्रमाण पत्र (जन्म प्रमाण, स्कूल छोड़ने का प्रमाण पत्र या चिकित्सा अधिकारी प्रमाण पत्र)।',
        },
      },
      {
        documentTypeId: 'ration_card',
        required: true,
        helpText: {
          en: 'BPL certificate or Antyodaya ration card verifying household score.',
          gu: 'બીપીએલ પ્રમાણપત્ર અથવા અંત્યોદય રેશન કાર્ડ.',
          hi: 'बीपीएल प्रमाण पत्र अथवा अंत्योदय राशन कार्ड।',
        },
      },
      {
        documentTypeId: 'bank_passbook',
        required: true,
        helpText: {
          en: 'Bank or Post Office savings account passbook for monthly pension deposit.',
          gu: 'પેન્શન જમા થવા માટે બેંક અથવા પોસ્ટ ઓફિસ ખાતાની પાસબુક.',
          hi: 'पेंशन जमा हेतु बैंक अथवा डाकघर बचत पासबुक।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Collect application form from local Mamlatdar office or Jan Seva Kendra',
        'Attach verified age certificate and official BPL certificate',
        'Submit application to Mamlatdar or Taluka Social Security Officer',
        'Monthly pension credited via DBT or post office account upon approval',
      ],
      gu: [
        'સ્થાનિક મામલતદાર કચેરી અથવા જન સેવા કેન્દ્રમાંથી અરજી ફોર્મ મેળવો',
        'ઉંમરનો પુરાવો અને બીપીએલ પ્રમાણપત્ર જોડો',
        'મામલતદાર અથવા તાલુકા સમાજ સુરક્ષા અધિકારીને અરજી જમા કરો',
        'મંજૂરી મળ્યા બાદ દર મહિને DBT અથવા પોસ્ટ ખાતામાં પેન્શન જમા થશે',
      ],
      hi: [
        'मामलतदार कार्यालय या जन सेवा केंद्र से आवेदन पत्र प्राप्त करें',
        'आयु प्रमाण एवं बीपीएल प्रमाण पत्र संलग्न करें',
        'मामलतदार अथवा तालुका समाज सुरक्षा अधिकारी को आवेदन प्रस्तुत करें',
        'स्वीकृति उपरांत मासिक पेंशन डीबीटी अथवा डाकघर खाते में जमा',
      ],
    },
    applicationUrl: 'https://sje.gujarat.gov.in/dsd/Schemes/2208?lang=English',
    sourceUrl: 'https://sje.gujarat.gov.in/dsd/Schemes/2208?lang=English',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'needs_review',
      reviewer: null,
      note: 'Official DSD portal page checked 2026-10-31. Exact BPL score 0-20 proof requires human sign-off.',
    },
  },
  {
    id: 'niradhar-vriddha',
    name: {
      en: 'Niradhar Vriddha Pension Yojana (Gujarat)',
      gu: 'નિરાધાર વૃદ્ધ પેન્શન યોજના (ગુજરાત)',
      hi: 'निराधार वृद्ध पेंशन योजना (गुजरात)',
    },
    department: {
      en: 'Director of Social Defense, Government of Gujarat',
      gu: 'સમાજ સુરક્ષા ખાતું, ગુજરાત સરકાર',
      hi: 'समाज सुरक्षा निदेशालय, गुजरात सरकार',
    },
    summary: {
      en: 'Gujarat state pension for destitute senior citizens aged 60 and above without adult earning son, or elderly living in low-income households.',
      gu: '૬૦ વર્ષ કે તેથી વધુ વયના નિરાધાર વૃદ્ધો (જેમને ૨૧ વર્ષથી મોટો કમાતો પુત્ર ન હોય) અથવા ઓછી આવક ધરાવતા વડીલો માટે રાજ્ય સરકારની પેન્શન યોજના.',
      hi: '60 वर्ष या अधिक आयु के निराधार वृद्धों (जिनका 21 वर्ष से अधिक आयु का कमाऊ पुत्र न हो) अथवा कम आय वाले वरिष्ठ नागरिकों के लिए राज्य पेंशन।',
    },
    benefitDescription: {
      en: '₹1,000/month for age 60–79; ₹1,250/month for age 80+ transferred directly via DBT.',
      gu: '૬૦ થી ૭૯ વર્ષ માટે માસિક ₹૧,૦૦૦; ૮૦ વર્ષ કે તેથી વધુ માટે માસિક ₹૧,૨૫૦ સીધા બેંક ખાતામાં DBT દ્વારા.',
      hi: '60 से 79 वर्ष हेतु ₹1,000 मासिक; 80 वर्ष से अधिक हेतु ₹1,250 मासिक सीधे डीबीटी द्वारा।',
    },
    beneficiaryScope: 'individual',
    rules: [
      {
        id: 'rule-nv-residence',
        field: 'residenceState',
        operator: 'eq',
        value: 'Gujarat',
        mandatory: true,
        label: {
          en: 'Must reside in Gujarat',
          gu: 'ગુજરાતના કાયમી રહેવાસી હોવા જરૂરી',
          hi: 'गुजरात के स्थायी निवासी होना आवश्यक',
        },
      },
      {
        id: 'rule-nv-age',
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
        id: 'rule-nv-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 150000,
        mandatory: true,
        label: {
          en: 'Annual income up to ₹1,50,000 (urban) / ₹1,20,000 (rural)',
          gu: 'વાર્ષિક આવક ₹૧,૫૦,૦૦૦ (શહેરી) / ₹૧,૨૦,૦૦૦ (ગ્રામ્ય) સુધી',
          hi: 'वार्षिक आय ₹1,50,000 (शहरी) / ₹1,20,000 (ग्रामीण) तक',
        },
        explanation: {
          en: 'Income route threshold is ₹1,20,000 in rural areas and ₹1,50,000 in urban areas. Alternatively, BPL score 0-20 qualifies directly.',
          gu: 'ગ્રામ્ય વિસ્તારમાં ₹૧,૨૦,૦૦૦ અને શહેરી વિસ્તારમાં ₹૧,૫૦,૦૦૦ ની આવક મર્યાદા.',
          hi: 'ग्रामीण क्षेत्र में ₹1,20,000 एवं शहरी क्षेत्र में ₹1,50,000 की आय सीमा।',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'identity_proof',
        required: true,
        helpText: {
          en: 'Age proof (school leaving certificate, voter ID, or civil surgeon certificate).',
          gu: 'ઉંમરનો પુરાવો (શાળા છોડ્યાનો દાખલો, ચૂંટણી કાર્ડ અથવા સિવિલ સર્જન દાખલો).',
          hi: 'आयु प्रमाण पत्र (स्कूल प्रमाणपत्र, मतदाता पहचान पत्र अथवा डॉक्टर प्रमाण पत्र)।',
        },
      },
      {
        documentTypeId: 'income_certificate',
        required: true,
        helpText: {
          en: 'Income certificate from Mamlatdar or BPL card verifying economic eligibility.',
          gu: 'મામલતદારનો આવકનો દાખલો અથવા બીપીએલ પ્રમાણપત્ર.',
          hi: 'मामलतदार द्वारा प्रदत्त आय प्रमाण पत्र अथवा बीपीएल कार्ड।',
        },
      },
      {
        documentTypeId: 'ration_card',
        required: true,
        helpText: {
          en: 'Ration card copy verifying household composition and family members.',
          gu: 'કુટુંબના સભ્યોની વિગતો દર્શાવતું રેશન કાર્ડ.',
          hi: 'परिवार के सदस्यों का विवरण दर्शाने वाला राशन कार्ड।',
        },
      },
      {
        documentTypeId: 'bank_passbook',
        required: true,
        helpText: {
          en: 'Bank / Post Office account passbook for pension disbursement.',
          gu: 'પેન્શન જમા થવા માટે બેંક અથવા પોસ્ટ ઓફિસ પાસબુક.',
          hi: 'पेंशन जमा हेतु बैंक अथवा डाकघर पासबुक प्रति।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Apply online via Digital Gujarat portal or visit local Jan Seva Kendra / Gram Panchayat VCE',
        'Submit age certificate, income proof, and ration card',
        'Mamlatdar conducts inquiry and issues sanction order',
        'Monthly assistance credited directly via DBT',
      ],
      gu: [
        'Digital Gujarat પોર્ટલ પર ઓનલાઇન અરજી કરો અથવા સ્થાનિક જન સેવા કેન્દ્ર/VCE ની મુલાકાત લો',
        'ઉંમરનો દાખલો, આવકનો દાખલો અને રેશન કાર્ડ જોડો',
        'મામલતદાર દ્વારા ચકાસણી કરી મંજૂરી હુકમ જારી કરવામાં આવશે',
        'માસિક સહાય સીધી બેંક ખાતામાં DBT દ્વારા જમા થશે',
      ],
      hi: [
        'डिजिटल गुजरात पोर्टल पर ऑनलाइन आवेदन करें अथवा जन सेवा केंद्र/वीसीई से संपर्क करें',
        'आयु प्रमाण पत्र, आय प्रमाण पत्र एवं राशन कार्ड प्रस्तुत करें',
        'मामलतदार द्वारा सत्यापन उपरांत स्वीकृति आदेश जारी',
        'मासिक पेंशन सीधे बैंक खाते में डीबीटी द्वारा जमा',
      ],
    },
    applicationUrl: 'https://www.digitalgujarat.gov.in/',
    sourceUrl: 'https://sje.gujarat.gov.in/dsd/schemes/2212?lang=english',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'needs_review',
      reviewer: null,
      note: 'Official DSD page updated 30 Oct 2026 checked on 2026-10-31. Alternative BPL vs Income routes noted.',
    },
  },
  {
    id: 'ganga-swarupa',
    name: {
      en: 'Ganga Swarupa Pension Scheme (Widow Pension)',
      gu: 'ગંગા સ્વરૂપા આર્થિક સહાય યોજના (વિધવા સહાય પેન્શન)',
      hi: 'गंगा स्वरूपा आर्थिक सहायता योजना (विधवा पेंशन)',
    },
    department: {
      en: 'Women and Child Development Department, Government of Gujarat',
      gu: 'મહિલા અને બાળ વિકાસ વિભાગ, ગુજરાત સરકાર',
      hi: 'महिला एवं बाल विकास विभाग, गुजरात सरकार',
    },
    summary: {
      en: 'Monthly financial pension directly transferred to widowed women in Gujarat for economic dignity and lifetime livelihood support.',
      gu: 'નિરાધાર વિધવા બહેનોને સન્માનપૂર્વક જીવન જીવવા અને આજીવન આજીવિકા સહાય માટે માસિક સીધી આર્થિક સહાય.',
      hi: 'निराश्रित विधवा महिलाओं के सम्मानजनक जीवनयापन हेतु आजीवन मासिक प्रत्यक्ष आर्थिक सहायता।',
    },
    benefitDescription: {
      en: '₹1,250 per month deposited directly into beneficiary bank or post office account via DBT (adult son age-21 stop condition removed).',
      gu: 'માસિક ₹૧,૨૫૦ ની સીધી સહાય DBT દ્વારા બહેનોના બેંક અથવા પોસ્ટ ખાતામાં (પુત્ર ૨૧ વર્ષનો થતાં સહાય બંધ કરવાનો નિયમ રદ કરેલ છે).',
      hi: 'प्रति माह ₹1,250 की सहायता सीधे लाभार्थी के बैंक खाते में डीबीटी द्वारा (21 वर्ष के पुत्र पर सहायता बंद होने की शर्त समाप्त)।',
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
        id: 'rule-gs-gender',
        field: 'gender',
        operator: 'eq',
        value: 'female',
        mandatory: true,
        label: {
          en: 'Must be female',
          gu: 'સ્ત્રી (મહિલા) હોવા જરૂરી',
          hi: 'महिला होना आवश्यक',
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
        id: 'rule-gs-age',
        field: 'age',
        operator: 'gte',
        value: 18,
        mandatory: true,
        label: {
          en: 'Age must be 18 years or above',
          gu: 'ઉંમર ૧૮ વર્ષ કે તેથી વધુ હોવી જરૂરી',
          hi: 'आयु 18 वर्ष या उससे अधिक होनी चाहिए',
        },
      },
      {
        id: 'rule-gs-income',
        field: 'annualHouseholdIncome',
        operator: 'lte',
        value: 150000,
        mandatory: true,
        label: {
          en: 'Family annual income up to ₹1,50,000 (urban) / ₹1,20,000 (rural)',
          gu: 'કુટુંબની વાર્ષિક આવક ₹૧,૫૦,૦૦૦ (શહેરી) / ₹૧,૨૦,૦૦૦ (ગ્રામ્ય) સુધી',
          hi: 'पारिवारिक वार्षिक आय ₹1,50,000 (शहरी) / ₹1,20,000 (ग्रामीण) तक',
        },
      },
    ],
    requiredDocuments: [
      {
        documentTypeId: 'identity_proof',
        required: true,
        helpText: {
          en: 'Aadhaar / Voter ID and husband official death certificate.',
          gu: 'આધાર કાર્ડ / ચૂંટણી કાર્ડ અને પતિના અવસાનનું સત્તાવાર પ્રમાણપત્ર.',
          hi: 'आधार कार्ड / मतदाता पत्र तथा पति का आधिकारिक मृत्यु प्रमाण पत्र।',
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
          en: 'Income certificate issued by Taluka Mamlatdar / competent authority.',
          gu: 'તાલુકા મામલતદાર દ્વારા જારી આવક પ્રમાણપત્ર.',
          hi: 'तालुका मामलतदार द्वारा जारी आय प्रमाण पत्र।',
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
          en: 'Proof of residence in Gujarat (electricity bill, domicile, or ration card).',
          gu: 'ગુજરાતમાં વસવાટનો પુરાવો (વીજળી બિલ, રહેઠાણ દાખલો અથવા રેશન કાર્ડ).',
          hi: 'गुजरात में निवास का प्रमाण (बिजली बिल, निवास प्रमाण अथवा राशन कार्ड)।',
        },
      },
      {
        documentTypeId: 'ration_card',
        required: true,
        helpText: {
          en: 'Ration card copy verifying applicant and household members.',
          gu: 'રેશન કાર્ડની પ્રમાણિત નકલ.',
          hi: 'राशन कार्ड की सत्यापित प्रति।',
        },
      },
    ],
    applicationSteps: {
      en: [
        'Collect prescribed Ganga Swarupa application form from Jan Seva Kendra or Taluka Mamlatdar office',
        'Attach husband death certificate, income certificate, and non-remarriage affidavit',
        'Submit completed application form to Taluka Mamlatdar office',
        'Upon approval, ₹1,250 monthly pension is deposited directly into beneficiary post office or bank account',
      ],
      gu: [
        'જન સેવા કેન્દ્ર અથવા તાલુકા મામલતદાર કચેરીમાંથી ગંગા સ્વરૂપા અરજી ફોર્મ મેળવો',
        'પતિના મરણનો દાખલો, આવકનો દાખલો અને પુનઃલગ્ન ન કર્યા અંગેનું સોગંદનામું જોડો',
        'તાલુકા મામલતદાર કચેરીમાં અરજી જમા કરાવો',
        'મંજૂરી બાદ દર મહિને ₹૧,૨૫૦ બેંક અથવા પોસ્ટ ખાતામાં જમા થશે',
      ],
      hi: [
        'जन सेवा केंद्र या तालुका मामलतदार कार्यालय से आवेदन पत्र प्राप्त करें',
        'पति का मृत्यु प्रमाण पत्र, आय प्रमाण पत्र तथा पुनर्विवाह न करने का हलफनामा संलग्न करें',
        'तालुका मामलतदार कार्यालय में आवेदन प्रस्तुत करें',
        'स्वीकृति के बाद प्रतिमाह ₹1,250 सीधे बैंक अथवा डाकघर खाते में जमा',
      ],
    },
    applicationUrl: 'https://wcd.gujarat.gov.in/initiativedetails?id=231',
    sourceUrl: 'https://wcd.gujarat.gov.in/initiativedetails?id=231',
    lastVerifiedAt: null,
    version: '1.0.0',
    verification: {
      status: 'needs_review',
      reviewer: null,
      note: 'Official WCD portal page updated 28 Oct 2026 checked on 2026-10-31. Evaluated against widowed female member (Meenaben).',
    },
  },
]

// Validate dataset at module boundary — fails loudly in dev/test if invalid
export const SCHEMES_DATASET: SchemeRecord[] = validateSchemes(RAW_SCHEMES_DATASET)
export const SAMPLE_SCHEMES = SCHEMES_DATASET
