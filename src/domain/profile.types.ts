import type { Language } from './journey.types'

export type IncomeBand =
  | 'under_1l'
  | '1l_2_5l'
  | '2_5l_5l'
  | 'above_5l'
  | 'unknown'

export type OccupationType =
  | 'student'
  | 'farmer'
  | 'self_employed'
  | 'salaried'
  | 'unemployed'
  | 'homemaker'
  | 'senior'
  | 'other'
  | 'unknown'

export type SocialCategory =
  | 'general'
  | 'sc'
  | 'st'
  | 'sebc'
  | 'ews'
  | 'other'
  | 'unknown'

export interface FamilyMember {
  id: string
  displayName: Record<Language, string>
  relationship: Record<Language, string>
  age: number | null
  occupation: OccupationType
}

export interface BeneficiaryProfile {
  id: string
  displayName: string // fictional demo name only
  district: string
  residenceState: 'Gujarat' | 'Other' | 'unknown'
  age: number | null
  occupation: OccupationType
  course?: string | null
  institutionType?: string | null
  category?: SocialCategory
  annualHouseholdIncome: IncomeBand
  disability?: 'yes' | 'no' | 'unknown'
  familyMembers?: FamilyMember[]
}
