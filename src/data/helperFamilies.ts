import type { Language } from '../domain/journey.types'

export interface SampleHelperFamily {
  id: string
  familyName: Record<Language, string>
  district: string
  headOfHousehold: string
  membersCount: number
  missingDocsCount: number
  primarySchemeId: string
  primarySchemeName: Record<Language, string>
  lastAssistedAt: string
}

export const SAMPLE_FAMILIES: SampleHelperFamily[] = [
  {
    id: 'fam-patel',
    familyName: {
      en: 'Rameshbhai Patel Household',
      gu: 'રમેશભાઈ પટેલ કુટુંબ',
      hi: 'रमेशभाई पटेल परिवार',
    },
    district: 'Mehsana',
    headOfHousehold: 'Rameshbhai Patel',
    membersCount: 4,
    missingDocsCount: 2,
    primarySchemeId: 'kisan-sahay-yojana',
    primarySchemeName: {
      en: 'Mukhyamantri Kisan Sahay Yojana',
      gu: 'મુખ્યમંત્રી કિસાન સહાય યોજના',
      hi: 'मुख्यमंत्री किसान सहाय योजना',
    },
    lastAssistedAt: '2026-10-24',
  },
  {
    id: 'fam-shah',
    familyName: {
      en: 'Kantilal Shah Household',
      gu: 'કાંતિલાલ શાહ કુટુંબ',
      hi: 'कांतिलाल शाह परिवार',
    },
    district: 'Vadodara',
    headOfHousehold: 'Kantilal Shah',
    membersCount: 2,
    missingDocsCount: 1,
    primarySchemeId: 'vrudh-pension-yojana',
    primarySchemeName: {
      en: 'Indira Gandhi National Old Age Pension (Gujarat)',
      gu: 'ઇન્દિરા ગાંધી રાષ્ટ્રીય વૃદ્ધ પેન્શન યોજના',
      hi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना',
    },
    lastAssistedAt: '2026-10-28',
  },
  {
    id: 'fam-vankar',
    familyName: {
      en: 'Dineshbhai Vankar Household',
      gu: 'દિનેશભાઈ વણકર કુટુંબ',
      hi: 'दिनेशभाई वणकर परिवार',
    },
    district: 'Sabarkantha',
    headOfHousehold: 'Dineshbhai Vankar',
    membersCount: 5,
    missingDocsCount: 3,
    primarySchemeId: 'manav-garima-yojana',
    primarySchemeName: {
      en: 'Manav Garima Yojana (Toolkits for Artisans)',
      gu: 'માનવ ગરિમા યોજના (સાધન કિટ સહાય)',
      hi: 'मानव गरिमा योजना (कारीगर टूलकिट सहायता)',
    },
    lastAssistedAt: '2026-10-30',
  },
]
