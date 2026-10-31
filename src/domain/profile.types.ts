export type Language = 'en' | 'gu' | 'hi'
export type LocalisedText = Record<Language, string>

// ---- Profile facts (candidate vocabulary: derived from verified schemes) ----
export type IncomeBand = 'under_1l' | '1l_2_5l' | '2_5l_5l' | 'above_5l' | 'unknown'
export type YesNoUnknown = 'yes' | 'no' | 'unknown'
export type Gender = 'female' | 'male' | 'other' | 'unknown'
export type MaritalStatus = 'single' | 'married' | 'widowed' | 'divorced_or_separated' | 'unknown'
export type Occupation =
  | 'student'
  | 'farmer'
  | 'self_employed'
  | 'salaried'
  | 'unemployed'
  | 'homemaker'
  | 'retired_or_senior'
  | 'other'
  | 'unknown'
export type OccupationType = Occupation // backward compatibility alias

export type EducationLevel =
  | 'below_class_8'
  | 'class_8_to_10'
  | 'class_11_12'
  | 'diploma_or_iti'
  | 'undergraduate'
  | 'postgraduate'
  | 'other'
  | 'unknown'

export type InstitutionType =
  | 'government'
  | 'government_aided'
  | 'private'
  | 'not_applicable'
  | 'unknown'

export type SocialCategory = 'general' | 'sc' | 'st' | 'sebc' | 'ews' | 'other' | 'unknown'
export type RationCardType = 'aay' | 'bpl' | 'apl' | 'none' | 'unknown'

export interface PersonFacts {
  age: number | null
  gender: Gender
  maritalStatus: MaritalStatus
  occupation: Occupation
  educationLevel: EducationLevel
  institutionType: InstitutionType
  disability: YesNoUnknown
}

export interface HouseholdFacts {
  district: string | null
  residenceState: 'Gujarat' | 'Other' | 'unknown'
  category: SocialCategory
  annualHouseholdIncome: IncomeBand
  ownsAgriculturalLand: YesNoUnknown
  rationCardType: RationCardType
}

export interface FamilyMember extends PersonFacts {
  id: string
  displayName: string // fictional demo name only
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'sibling' | 'other'
}

export interface BeneficiaryProfile extends PersonFacts, HouseholdFacts {
  id: string
  displayName: string // fictional demo name only
  isSynthetic: true
  familyMembers: FamilyMember[] // may be empty
}

/** What the engine evaluates: one person's facts merged with household facts. */
export type EvaluationSubject = PersonFacts &
  HouseholdFacts & {
    subjectId: string
    displayName: string
  }

// Never "id", "displayName" or "familyMembers"
export type RuleField = keyof PersonFacts | keyof HouseholdFacts
