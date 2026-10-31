import type { Language } from '../domain/journey.types'

export interface LocaleStrings {
  banner: {
    prototypeNotice: string
  }
  common: {
    appName: string
    guidanceDisclaimer: string
    privacyNotice: string
    startOver: string
    back: string
    next: string
    continue: string
    close: string
    forJudges: string
    sampleStudent: string
    sampleFarmer: string
    sampleSenior: string
    language: string
    textSize: string
  }
  welcome: {
    headline: string
    description: string
    findBenefitsBtn: string
    helpSomeoneBtn: string
    speakAnswerBtn: string
    shortcutsTitle: string
  }
  consent: {
    title: string
    description: string
    localProcessingTitle: string
    localProcessingDesc: string
    noCredentialsTitle: string
    noCredentialsDesc: string
    checkboxLabel: string
    continueBtn: string
  }
  profile: {
    title: string
    subtitle: string
    activeSelection: string
    viewResultsBtn: string
  }
  results: {
    title: string
    subtitle: string
    viewSchemeBtn: string
    profileMissingTitle: string
    profileMissingDesc: string
    goToProfileBtn: string
  }
  checklist: {
    title: string
    subtitle: string
    summaryTitle: string
    readyCount: string
    missingCount: string
    openOfficialPortal: string
    printChecklist: string
  }
  helper: {
    title: string
    subtitle: string
    screenedToday: string
    missingDocsNote: string
    addFamilyBtn: string
  }
}

export const translations: Record<Language, LocaleStrings> = {
  gu: {
    banner: {
      prototypeNotice: 'પ્રોટોટાઇપ: નમૂના ડેટા અને દસ્તાવેજ વાંચનનું સિમ્યુલેશન.',
    },
    common: {
      appName: 'ગુજરાત યોજના સહાયક',
      guidanceDisclaimer: 'આ માર્ગદર્શન છે. અંતિમ નિર્ણય સંબંધિત વિભાગનો રહેશે.',
      privacyNotice: 'અમે ક્યારેય આપનો OTP, પાસવર્ડ કે અસલ આધાર નંબર નથી પૂછતા.',
      startOver: 'ફરી શરૂ કરો / ડેમો ડેટા સાફ કરો',
      back: 'પાછા જાઓ',
      next: 'આગળ',
      continue: 'આગળ વધો',
      close: 'બંધ કરો',
      forJudges: 'પરીક્ષકો અને મૂલ્યાંકનકારો માટે (નમૂના શોર્ટકટ્સ)',
      sampleStudent: 'વિદ્યાર્થી નમૂનો',
      sampleFarmer: 'ખેડૂત નમૂનો',
      sampleSenior: 'વરિષ્ઠ નાગરિક નમૂનો',
      language: 'ભાષા',
      textSize: 'અક્ષર માપ',
    },
    welcome: {
      headline: 'તમારા પરિવાર માટે કઈ સરકારી યોજનાઓ છે, જાણો.',
      description: 'સરળ પ્રશ્નોના ઉત્તર આપો. આપ કઈ યોજના માટે પાત્ર છો, શા માટે, અને કયા પુરાવાની જરૂર છે તે સરળ ભાષામાં સમજો.',
      findBenefitsBtn: 'મારા માટે યોજનાઓ શોધો',
      helpSomeoneBtn: 'બીજા કોઈને મદદ કરો',
      speakAnswerBtn: 'તમારી ભાષામાં બોલો',
      shortcutsTitle: 'પરીક્ષકો માટે સીધા નમૂના',
    },
    consent: {
      title: 'ગોપનીયતા અને સંમતિ',
      description: 'અમે શું પૂછીએ છીએ, તેનો શું ઉપયોગ થાય છે, અને અમે શું ક્યારેય નથી કરતા.',
      localProcessingTitle: 'માત્ર તમારા ફોન/બ્રાઉઝરમાં પ્રોસેસિંગ',
      localProcessingDesc: 'તમામ પ્રશ્નોના જવાબો અને યોજનાઓની પાત્રતા તમારા ઉપકરણ પર જ તપાસવામાં આવે છે. કોઈ સર્વર પર ડેટા સંગ્રહિત થતો નથી.',
      noCredentialsTitle: 'કોઈ ગોપનીય પાસવર્ડ લેવામાં આવતા નથી',
      noCredentialsDesc: 'અમે ક્યારેય OTP, બેંક વિગતો કે અસલ ઓળખ કાર્ડ માગતા નથી.',
      checkboxLabel: 'હું સમજું છું કે આ માર્ગદર્શન ટૂલ છે અને આગળ વધવા સંમતિ આપું છું.',
      continueBtn: 'પ્રોફાઇલ શરૂ કરો',
    },
    profile: {
      title: 'તમારા પરિવારની વિગતો જણાવો',
      subtitle: 'યોજનાઓના નિયમો સાથે સુસંગત માહિતી આપો.',
      activeSelection: 'પસંદ કરેલ પ્રોફાઇલ:',
      viewResultsBtn: 'મેળ ખાતી યોજનાઓ જુઓ',
    },
    results: {
      title: 'તમારા માટે ઉપલબ્ધ સરકારી યોજનાઓ',
      subtitle: 'તમારા પ્રોફાઇલ જવાબો મુજબ સ્થાનિક નિયમ એન્જિન દ્વારા મૂલ્યાંકન કરેલ પરિણામો.',
      viewSchemeBtn: 'યોજનાની વિગત જુઓ',
      profileMissingTitle: 'પ્રોફાઇલ જવાબો મળ્યા નથી',
      profileMissingDesc: 'યોજનાઓ તપાસવા માટે આપના પ્રોફાઇલ જવાબો જરૂરી છે. કૃપા કરીને શરૂઆતથી શરૂ કરો.',
      goToProfileBtn: 'પ્રોફાઇલ પર જાઓ',
    },
    checklist: {
      title: 'દસ્તાવેજ તૈયારી યાદી',
      subtitle: 'સત્તાવાર પોર્ટલ પર અરજી કરતાં પહેલાં જરૂરી પુરાવા તપાસો.',
      summaryTitle: 'દસ્તાવેજ તૈયારી સ્થિતિ',
      readyCount: 'તૈયાર દસ્તાવેજ',
      missingCount: 'બાકી રહેલા દસ્તાવેજ',
      openOfficialPortal: 'સત્તાવાર પોર્ટલ ખોલો (Digital Gujarat)',
      printChecklist: 'યાદી પ્રિન્ટ કરો',
    },
    helper: {
      title: 'સહાયક મોડ: લાભાર્થી પરિવારો',
      subtitle: 'CSC, ઈ-ગ્રામ કે સમુદાય સહાયકો માટે સંમતિ સાથે પરિવારોને મદદ કરવાનો મોડ.',
      screenedToday: 'આજે તપાસેલા પરિવારો (નમૂના ડેટા)',
      missingDocsNote: 'દસ્તાવેજો બાકી છે',
      addFamilyBtn: 'નવો પરિવાર ઉમેરો',
    },
  },
  hi: {
    banner: {
      prototypeNotice: 'प्रोटोटाइप: नमूना डेटा और सिमुलेटेड दस्तावेज़ पठन।',
    },
    common: {
      appName: 'गुजरात योजना सहायक',
      guidanceDisclaimer: 'यह मार्गदर्शन है। अंतिम निर्णय संबंधित विभाग का होगा।',
      privacyNotice: 'हम कभी आपका OTP, पासवर्ड या असली आधार नंबर नहीं मांगते।',
      startOver: 'पुनः आरंभ करें / डेमो डेटा साफ़ करें',
      back: 'वापस जाएं',
      next: 'आगे बढ़ें',
      continue: 'जारी रखें',
      close: 'बंद करें',
      forJudges: 'परीक्षकों एवं मूल्यांकनकर्ताओं के लिए (नमूना शॉर्टकट)',
      sampleStudent: 'विद्यार्थी नमूना',
      sampleFarmer: 'किसान नमूना',
      sampleSenior: 'वरिष्ठ नागरिक नमूना',
      language: 'भाषा',
      textSize: 'अक्षर आकार',
    },
    welcome: {
      headline: 'जानिए आपके परिवार के लिए कौन सी सरकारी योजनाएं उपलब्ध हैं।',
      description: 'कुछ सरल सवालों के जवाब दें। हम बताएंगे कि आप किस योजना के पात्र हैं, क्यों, और क्या प्रमाण तैयार रखने हैं।',
      findBenefitsBtn: 'मेरे लिए योजनाएं खोजें',
      helpSomeoneBtn: 'किसी अन्य की सहायता करें',
      speakAnswerBtn: 'अपनी भाषा में बोलें',
      shortcutsTitle: 'परीक्षकों के लिए सीधे नमूने',
    },
    consent: {
      title: 'गोपनीयता एवं सहमति',
      description: 'हम क्या पूछते हैं, उसका क्या उपयोग होता है, और हम क्या कभी नहीं करते।',
      localProcessingTitle: 'केवल आपके फोन/ब्राउज़र में मूल्यांकन',
      localProcessingDesc: 'सभी उत्तर और योजना नियम आपके डिवाइस पर ही जाँचे जाते हैं। कोई भी व्यक्तिगत डेटा सर्वर पर नहीं भेजा जाता।',
      noCredentialsTitle: 'कोई गोपनीय क्रेडेंशियल नहीं लिया जाता',
      noCredentialsDesc: 'हम कभी OTP, बैंक पिन या असली पहचान दस्तावेज़ नहीं मांगते।',
      checkboxLabel: 'मैं समझता/समझती हूँ कि यह मार्गदर्शन टूल है और आगे बढ़ने की सहमति देता/देती हूँ।',
      continueBtn: 'प्रोफाइल शुरू करें',
    },
    profile: {
      title: 'अपने परिवार की जानकारी दें',
      subtitle: 'योजना के नियमों के अनुसार सही उत्तर चुनें।',
      activeSelection: 'सक्रिय प्रोफाइल चयन:',
      viewResultsBtn: 'योजना परिणाम देखें',
    },
    results: {
      title: 'आपके लिए उपलब्ध योजनाएं',
      subtitle: 'आपके प्रोफाइल उत्तरों के आधार पर स्थानीय नियम इंजन द्वारा मूल्यांकित परिणाम।',
      viewSchemeBtn: 'योजना विवरण देखें',
      profileMissingTitle: 'प्रोफाइल उत्तर नहीं मिले',
      profileMissingDesc: 'योजनाओं का मूल्यांकन करने के लिए प्रोफाइल उत्तर आवश्यक हैं। कृपया आरंभ से शुरू करें।',
      goToProfileBtn: 'प्रोफाइल पर जाएं',
    },
    checklist: {
      title: 'दस्तावेज़ तैयारी चेकलिस्ट',
      subtitle: 'आधिकारिक पोर्टल पर आवेदन करने से पहले आवश्यक प्रमाण तैयार रखें।',
      summaryTitle: 'दस्तावेज़ तत्परता स्थिति',
      readyCount: 'तैयार दस्तावेज़',
      missingCount: 'आवश्यक दस्तावेज़',
      openOfficialPortal: 'आधिकारिक पोर्टल खोलें (Digital Gujarat)',
      printChecklist: 'चेकलिस्ट प्रिंट करें',
    },
    helper: {
      title: 'सहायक मोड: लाभार्थी परिवार',
      subtitle: 'सीएससी, ई-ग्राम या सामाजिक कार्यकर्ताओं के लिए सहमति से परिवारों की सहायता का मोड।',
      screenedToday: 'आज मूल्यांकित परिवार (नमूना डेटा)',
      missingDocsNote: 'दस्तावेज़ शेष हैं',
      addFamilyBtn: 'नया परिवार जोड़ें',
    },
  },
  en: {
    banner: {
      prototypeNotice: 'Prototype: sample data and simulated document reading.',
    },
    common: {
      appName: 'Gujarat SchemeSahayak',
      guidanceDisclaimer: 'This is guidance. The department makes the final decision.',
      privacyNotice: 'We never ask for your OTP, password or real Aadhaar number.',
      startOver: 'Start over / Clear demo data',
      back: 'Back',
      next: 'Next',
      continue: 'Continue',
      close: 'Close',
      forJudges: 'For judges and testers (Synthetic shortcuts)',
      sampleStudent: 'Sample Student',
      sampleFarmer: 'Sample Farmer',
      sampleSenior: 'Sample Senior',
      language: 'Language',
      textSize: 'Text size',
    },
    welcome: {
      headline: 'Discover government schemes your family may qualify for.',
      description: 'Answer a few simple questions. We show what may fit, why, and what evidence you need to bring to the official portal.',
      findBenefitsBtn: 'Find benefits for me',
      helpSomeoneBtn: 'Help someone else',
      speakAnswerBtn: 'Speak in your language',
      shortcutsTitle: 'Quick synthetic shortcuts for judges',
    },
    consent: {
      title: 'Privacy and Demo Consent',
      description: 'What we ask, what we do with it, and what we never do.',
      localProcessingTitle: 'Local browser processing only',
      localProcessingDesc: 'All profile answers and scheme rules are evaluated entirely inside your browser. No personal data is uploaded to cloud servers.',
      noCredentialsTitle: 'No sensitive credentials collected',
      noCredentialsDesc: 'We never collect OTPs, passwords, bank credentials, or real Aadhaar cards.',
      checkboxLabel: 'I understand this is a guidance prototype and consent to continue.',
      continueBtn: 'Continue to profile',
    },
    profile: {
      title: 'Tell us about your household',
      subtitle: 'Questions map directly to criteria evaluated by Gujarat government schemes.',
      activeSelection: 'Active Profile Selection:',
      viewResultsBtn: 'View matched schemes',
    },
    results: {
      title: 'Matching benefits for your household',
      subtitle: 'Evaluated using our local deterministic rules engine against verified scheme criteria.',
      viewSchemeBtn: 'View scheme criteria & evidence',
      profileMissingTitle: 'Profile answers not found',
      profileMissingDesc: 'To evaluate schemes, SchemeSahayak needs your household answers. Please start from the beginning.',
      goToProfileBtn: 'Go to Profile',
    },
    checklist: {
      title: 'Readiness Checklist',
      subtitle: 'Prepare required documents before continuing on the official portal.',
      summaryTitle: 'Preparation Status',
      readyCount: 'Ready documents',
      missingCount: 'Missing documents',
      openOfficialPortal: 'Open official portal (Digital Gujarat)',
      printChecklist: 'Print checklist',
    },
    helper: {
      title: 'Helper Mode: Beneficiary Households',
      subtitle: 'Assisted workflow for CSC operators, e-Gram staff, and NGO workers assisting families with consent.',
      screenedToday: 'Households Screened Today (Sample Data)',
      missingDocsNote: 'documents missing across records',
      addFamilyBtn: 'Add new family',
    },
  },
}
