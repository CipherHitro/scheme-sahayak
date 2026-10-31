export type Language = 'gu' | 'hi' | 'en'

export type TextScale = 1 | 1.125 | 1.25

export type JourneyMode = 'citizen' | 'helper'

export type IncomeBand =
  | 'under_1l'
  | '1l_2_5l'
  | '2_5l_5l'
  | 'above_5l'
  | 'unknown'

export interface BeneficiaryProfile {
  id: string
  displayName: string // fictional demo name only
  district: string
  residenceState: 'Gujarat' | 'Other' | 'unknown'
  age: number | null
  occupation:
    | 'student'
    | 'farmer'
    | 'self_employed'
    | 'salaried'
    | 'unemployed'
    | 'homemaker'
    | 'senior'
    | 'other'
    | 'unknown'
  course?: string | null
  institutionType?: string | null
  category?: 'general' | 'sc' | 'st' | 'sebc' | 'ews' | 'other' | 'unknown'
  annualHouseholdIncome: IncomeBand
  disability?: 'yes' | 'no' | 'unknown'
}

export interface JourneyState {
  language: Language
  textScale: TextScale
  consentGiven: boolean
  mode: JourneyMode
  currentProfile: BeneficiaryProfile | null
  selectedSchemeId: string | null
  documentConfirmations: Record<string, boolean>
}
