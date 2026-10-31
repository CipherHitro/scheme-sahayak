import type { Language, LocalisedText, RuleField } from './profile.types'
import type { SchemeDocumentRequirement } from './document.types'

// Re-export document types for convenience if needed
export type { DocumentStatus, SchemeDocumentRequirement } from './document.types'

export type RuleOperator = 'eq' | 'lte' | 'gte' | 'in' | 'exists'

export interface SchemeRule {
  id: string
  field: RuleField
  operator: RuleOperator
  value?: string | number | string[]
  mandatory: boolean
  label: LocalisedText
  explanation?: LocalisedText
}

export type VerificationStatus = 'verified' | 'needs_review' | 'demo_placeholder'

export type EligibilityState = 'likely' | 'possible' | 'not_matching' | 'needs_verification'

export type CheckResult = 'pass' | 'fail' | 'unknown'

export interface RuleEvaluation {
  ruleId: string
  field: RuleField
  result: CheckResult
  actualValue: unknown
  expectedValue: unknown
  mandatory: boolean
  reasonCode?: 'straddles_band' | 'missing_value' | 'invalid_value'
}

export interface SchemeEvaluation {
  schemeId: string
  subjectId: string
  state: EligibilityState
  checks: RuleEvaluation[]
  passedCount: number
  unknownCount: number
  failedCount: number
  totalCount: number
  dataStatus: VerificationStatus
  explanation: string
}

export interface SchemeRecord {
  id: string
  name: LocalisedText
  department: LocalisedText
  summary: LocalisedText
  benefitDescription: LocalisedText
  beneficiaryScope: 'individual' | 'household'
  rules: SchemeRule[]
  requiredDocuments: SchemeDocumentRequirement[]
  applicationSteps: Record<Language, string[]>
  applicationUrl: string | null
  sourceUrl: string
  lastVerifiedAt: string | null
  version: string
  verification: {
    status: VerificationStatus
    reviewer: string | null
    note?: string
  }
}
