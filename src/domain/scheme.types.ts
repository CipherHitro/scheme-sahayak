import type { Language } from './journey.types'
import type { BeneficiaryProfile } from './profile.types'

export type RuleOperator = 'eq' | 'lte' | 'gte' | 'in' | 'exists'

export interface SchemeRule {
  id: string
  field: keyof BeneficiaryProfile
  operator: RuleOperator
  value?: string | number | string[]
  mandatory: boolean
  label: Record<Language, string>
  explanation?: Record<Language, string>
}

export type VerificationStatus = 'verified' | 'needs_review' | 'demo_placeholder'

export type EligibilityState = 'likely' | 'possible' | 'not_matching' | 'needs_verification'

export type CheckResult = 'pass' | 'fail' | 'unknown'

export interface RuleEvaluation {
  ruleId: string
  result: CheckResult
  actualValue: unknown
  expectedValue: unknown
  mandatory: boolean
}

export interface SchemeEvaluation {
  schemeId: string
  state: EligibilityState
  checks: RuleEvaluation[]
  passedCount: number
  unknownCount: number
  failedCount: number
  totalCount: number
  explanation: string
}

export type DocumentStatus = 'ready' | 'missing' | 'unknown'

export interface SchemeDocumentRequirement {
  id: string
  name: Record<Language, string>
  helpText: Record<Language, string>
  required: boolean
  issuingAuthority?: Record<Language, string>
  whereToGet?: Record<Language, string[]>
}

export interface SchemeRecord {
  id: string
  name: Record<Language, string>
  department: Record<Language, string>
  summary: Record<Language, string>
  benefitDescription: Record<Language, string>
  rules: SchemeRule[]
  requiredDocuments: SchemeDocumentRequirement[]
  applicationSteps: Record<Language, string[]>
  applicationUrl: string
  sourceUrl: string
  lastVerifiedAt: string | null
  version: string
  verification: {
    status: VerificationStatus
    reviewer: string | null
    note?: string
  }
}
