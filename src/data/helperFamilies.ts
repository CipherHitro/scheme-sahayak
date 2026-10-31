import type { Language } from '../domain/journey.types'
import { validateHelperFamilies } from './validation'

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

const RAW_SAMPLE_FAMILIES: SampleHelperFamily[] = [
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
    primarySchemeId: 'pm-kisan',
    primarySchemeName: {
      en: 'PM-KISAN Samman Nidhi',
      gu: 'પીએમ-કિસાન સન્માન નિધિ યોજના',
      hi: 'पीएम-किसान सम्मान निधि योजना',
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
    primarySchemeId: 'ignoa-vayvandana',
    primarySchemeName: {
      en: 'Indira Gandhi National Old Age Pension (Vay Vandana)',
      gu: 'ઇન્દિરા ગાંધી રાષ્ટ્રીય વૃદ્ધ પેન્શન યોજના (વય વંદના)',
      hi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (वय वंदना)',
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
    primarySchemeId: 'niradhar-vriddha',
    primarySchemeName: {
      en: 'Niradhar Vriddha Pension Yojana',
      gu: 'નિરાધાર વૃદ્ધ પેન્શન યોજના',
      hi: 'निराधार वृद्ध पेंशन योजना',
    },
    lastAssistedAt: '2026-10-30',
  },
]

export const SAMPLE_FAMILIES: SampleHelperFamily[] = validateHelperFamilies(RAW_SAMPLE_FAMILIES)
