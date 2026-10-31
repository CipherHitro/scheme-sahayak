import type { DocumentCatalogEntry, DocumentTypeId } from '../domain/document.types'

export const DOCUMENT_CATALOG: DocumentCatalogEntry[] = [
  {
    id: 'income_certificate',
    name: {
      en: 'Income Certificate',
      gu: 'આવકનું પ્રમાણપત્ર',
      hi: 'आय प्रमाण पत्र',
    },
  },
  {
    id: 'marksheet',
    name: {
      en: 'Marksheet / Academic Record',
      gu: 'ગુણપત્રક (માર્કશીટ) / શૈક્ષણિક પ્રમાણપત્ર',
      hi: 'अंकतालिका / शैक्षणिक प्रमाण पत्र',
    },
  },
  {
    id: 'caste_certificate',
    name: {
      en: 'Caste Certificate',
      gu: 'જાતિનું પ્રમાણપત્ર',
      hi: 'जाति प्रमाण पत्र',
    },
  },
  {
    id: 'bonafide_certificate',
    name: {
      en: 'Bonafide / Admission Certificate',
      gu: 'બોનાફાઇડ / પ્રવેશ પ્રમાણપત્ર',
      hi: 'बोनाफाइड / प्रवेश प्रमाण पत्र',
    },
  },
  {
    id: 'domicile_certificate',
    name: {
      en: 'Domicile Certificate',
      gu: 'રહેઠાણનું પ્રમાણપત્ર',
      hi: 'मूल निवास प्रमाण पत्र',
    },
  },
  {
    id: 'disability_certificate',
    name: {
      en: 'Disability Certificate (UDID)',
      gu: 'દિવ્યાંગતા પ્રમાણપત્ર (UDID)',
      hi: 'दिव्यांगता प्रमाण पत्र (UDID)',
    },
  },
  {
    id: 'ration_card',
    name: {
      en: 'Ration Card',
      gu: 'રેશન કાર્ડ',
      hi: 'राशन कार्ड',
    },
  },
  {
    id: 'land_record_7_12',
    name: {
      en: 'Land Records (7/12 & 8A)',
      gu: 'જમીનના આધાર (૭/૧૨ અને ૮-અ)',
      hi: 'भूमि अभिलेख (7/12 और 8A)',
    },
  },
  {
    id: 'bank_passbook',
    name: {
      en: 'Bank Passbook / Cancelled Cheque',
      gu: 'બેંક પાસબુક / રદ કરેલ ચેક',
      hi: 'बैंक पासबुक / रद्द चेक',
    },
  },
  {
    id: 'identity_proof',
    name: {
      en: 'Identity Proof',
      gu: 'ઓળખનો પુરાવો',
      hi: 'पहचान प्रमाण',
    },
  },
]

export const DOCUMENT_CATALOG_MAP: Record<DocumentTypeId, DocumentCatalogEntry> =
  DOCUMENT_CATALOG.reduce(
    (acc, doc) => {
      acc[doc.id] = doc
      return acc
    },
    {} as Record<DocumentTypeId, DocumentCatalogEntry>
  )
