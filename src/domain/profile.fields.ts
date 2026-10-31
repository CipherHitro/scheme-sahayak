import type { RuleField } from './profile.types'

export interface ProfileFieldDefinition {
  scope: 'person' | 'household'
  kind: 'number' | 'enum' | 'incomeBand'
  allowedValues?: readonly string[]
  unknown: string | null
}

export const PROFILE_FIELDS: Record<RuleField, ProfileFieldDefinition> = {
  // PersonFacts
  age: {
    scope: 'person',
    kind: 'number',
    unknown: null,
  },
  gender: {
    scope: 'person',
    kind: 'enum',
    allowedValues: ['female', 'male', 'other', 'unknown'],
    unknown: 'unknown',
  },
  maritalStatus: {
    scope: 'person',
    kind: 'enum',
    allowedValues: ['single', 'married', 'widowed', 'divorced_or_separated', 'unknown'],
    unknown: 'unknown',
  },
  occupation: {
    scope: 'person',
    kind: 'enum',
    allowedValues: [
      'student',
      'farmer',
      'self_employed',
      'salaried',
      'unemployed',
      'homemaker',
      'retired_or_senior',
      'other',
      'unknown',
    ],
    unknown: 'unknown',
  },
  educationLevel: {
    scope: 'person',
    kind: 'enum',
    allowedValues: [
      'below_class_8',
      'class_8_to_10',
      'class_11_12',
      'diploma_or_iti',
      'undergraduate',
      'postgraduate',
      'other',
      'unknown',
    ],
    unknown: 'unknown',
  },
  institutionType: {
    scope: 'person',
    kind: 'enum',
    allowedValues: [
      'government',
      'government_aided',
      'private',
      'not_applicable',
      'unknown',
    ],
    unknown: 'unknown',
  },
  disability: {
    scope: 'person',
    kind: 'enum',
    allowedValues: ['yes', 'no', 'unknown'],
    unknown: 'unknown',
  },

  // HouseholdFacts
  district: {
    scope: 'household',
    kind: 'enum',
    // Districts can be any recognized string or null when unknown
    unknown: null,
  },
  residenceState: {
    scope: 'household',
    kind: 'enum',
    allowedValues: ['Gujarat', 'Other', 'unknown'],
    unknown: 'unknown',
  },
  category: {
    scope: 'household',
    kind: 'enum',
    allowedValues: ['general', 'sc', 'st', 'sebc', 'ews', 'other', 'unknown'],
    unknown: 'unknown',
  },
  annualHouseholdIncome: {
    scope: 'household',
    kind: 'incomeBand',
    allowedValues: ['under_1l', '1l_2_5l', '2_5l_5l', 'above_5l', 'unknown'],
    unknown: 'unknown',
  },
  ownsAgriculturalLand: {
    scope: 'household',
    kind: 'enum',
    allowedValues: ['yes', 'no', 'unknown'],
    unknown: 'unknown',
  },
  rationCardType: {
    scope: 'household',
    kind: 'enum',
    allowedValues: ['aay', 'bpl', 'apl', 'none', 'unknown'],
    unknown: 'unknown',
  },
} as const

/**
 * Income band ranges in Indian Rupees.
 * Semantics:
 * under_1l: [0, 100000]
 * 1l_2_5l:  (100000, 250000]
 * 2_5l_5l:  (250000, 500000]
 * above_5l: (500000, Infinity)
 */
export const INCOME_BAND_RANGES = {
  under_1l: [0, 100000] as const,
  '1l_2_5l': [100000, 250000] as const,
  '2_5l_5l': [250000, 500000] as const,
  above_5l: [500000, Infinity] as const,
} as const
