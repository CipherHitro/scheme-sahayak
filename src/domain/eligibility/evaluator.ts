import type {
  EligibilityState,
  RuleEvaluation,
  SchemeEvaluation,
  SchemeRecord,
  SchemeRule,
} from '../scheme.types'
import type { EvaluationSubject, Language } from '../profile.types'
import { INCOME_BAND_RANGES } from '../profile.fields'
import { explainEvaluation } from './explanation'

export const STALE_AFTER_DAYS = 180

/**
 * Checks whether a scheme's verification date is missing, set in the future,
 * or older than staleAfterDays (default 180 days).
 */
export function isMissingOrStale(
  lastVerifiedAt: string | null | undefined,
  now: Date,
  staleAfterDays: number = STALE_AFTER_DAYS
): boolean {
  if (!lastVerifiedAt) return true

  const verifiedTime = new Date(lastVerifiedAt).getTime()
  if (isNaN(verifiedTime)) return true

  const nowTime = now.getTime()
  // Considered invalid/stale if dated in the future
  if (verifiedTime > nowTime) return true

  const diffDays = (nowTime - verifiedTime) / (1000 * 60 * 60 * 24)
  return diffDays > staleAfterDays
}

/**
 * Evaluates a single scheme rule against an EvaluationSubject.
 * Pure and deterministic; never coerces invalid strings to numbers.
 */
export function evaluateRule(
  rule: SchemeRule,
  subject: EvaluationSubject
): RuleEvaluation {
  const actualValue = subject ? subject[rule.field] : undefined

  // 1. Check for absent, null, undefined, empty, or explicit "unknown" values
  const isUnknown =
    actualValue === null ||
    actualValue === undefined ||
    actualValue === '' ||
    actualValue === 'unknown'

  // exists operator: known present value => pass; absent/unknown => unknown
  if (rule.operator === 'exists') {
    if (!isUnknown) {
      return {
        ruleId: rule.id,
        field: rule.field,
        result: 'pass',
        actualValue,
        expectedValue: true,
        mandatory: rule.mandatory,
      }
    }
    return {
      ruleId: rule.id,
      field: rule.field,
      result: 'unknown',
      actualValue,
      expectedValue: true,
      mandatory: rule.mandatory,
      reasonCode: 'missing_value',
    }
  }

  // All other operators: absent or unknown fact => unknown, never fail
  if (isUnknown) {
    return {
      ruleId: rule.id,
      field: rule.field,
      result: 'unknown',
      actualValue,
      expectedValue: rule.value,
      mandatory: rule.mandatory,
      reasonCode: 'missing_value',
    }
  }

  // 2. Income band evaluation for annualHouseholdIncome
  if (rule.field === 'annualHouseholdIncome') {
    if (rule.operator === 'lte' || rule.operator === 'gte') {
      const T = typeof rule.value === 'number' ? rule.value : Number(rule.value)
      if (isNaN(T)) {
        return {
          ruleId: rule.id,
          field: rule.field,
          result: 'unknown',
          actualValue,
          expectedValue: rule.value,
          mandatory: rule.mandatory,
          reasonCode: 'invalid_value',
        }
      }

      const bandKey = actualValue as keyof typeof INCOME_BAND_RANGES
      const bandRange = INCOME_BAND_RANGES[bandKey]
      if (!bandRange) {
        return {
          ruleId: rule.id,
          field: rule.field,
          result: 'unknown',
          actualValue,
          expectedValue: rule.value,
          mandatory: rule.mandatory,
          reasonCode: 'missing_value',
        }
      }

      const [lower, upper] = bandRange

      if (rule.operator === 'lte') {
        // Pass if the band's upper bound is known and <= T
        if (upper !== Infinity && upper <= T) {
          return {
            ruleId: rule.id,
            field: rule.field,
            result: 'pass',
            actualValue,
            expectedValue: rule.value,
            mandatory: rule.mandatory,
          }
        }
        // Fail if the band's lower bound is >= T
        if (lower >= T) {
          return {
            ruleId: rule.id,
            field: rule.field,
            result: 'fail',
            actualValue,
            expectedValue: rule.value,
            mandatory: rule.mandatory,
          }
        }
        // Limit falls inside the band => straddles_band
        return {
          ruleId: rule.id,
          field: rule.field,
          result: 'unknown',
          actualValue,
          expectedValue: rule.value,
          mandatory: rule.mandatory,
          reasonCode: 'straddles_band',
        }
      }

      // operator === 'gte' (mirror image)
      // Pass if the band's lower bound is >= T
      if (lower >= T) {
        return {
          ruleId: rule.id,
          field: rule.field,
          result: 'pass',
          actualValue,
          expectedValue: rule.value,
          mandatory: rule.mandatory,
        }
      }
      // Fail if the band's upper bound is known and <= T
      if (upper !== Infinity && upper <= T) {
        return {
          ruleId: rule.id,
          field: rule.field,
          result: 'fail',
          actualValue,
          expectedValue: rule.value,
          mandatory: rule.mandatory,
        }
      }
      // Limit falls inside the band => straddles_band
      return {
        ruleId: rule.id,
        field: rule.field,
        result: 'unknown',
        actualValue,
        expectedValue: rule.value,
        mandatory: rule.mandatory,
        reasonCode: 'straddles_band',
      }
    }

    if (rule.operator === 'eq') {
      const match =
        String(actualValue).trim().toLowerCase() ===
        String(rule.value).trim().toLowerCase()
      return {
        ruleId: rule.id,
        field: rule.field,
        result: match ? 'pass' : 'fail',
        actualValue,
        expectedValue: rule.value,
        mandatory: rule.mandatory,
      }
    }

    if (rule.operator === 'in') {
      if (!Array.isArray(rule.value)) {
        return {
          ruleId: rule.id,
          field: rule.field,
          result: 'unknown',
          actualValue,
          expectedValue: rule.value,
          mandatory: rule.mandatory,
          reasonCode: 'invalid_value',
        }
      }
      const set = rule.value.map((v) => String(v).trim().toLowerCase())
      const match = set.includes(String(actualValue).trim().toLowerCase())
      return {
        ruleId: rule.id,
        field: rule.field,
        result: match ? 'pass' : 'fail',
        actualValue,
        expectedValue: rule.value,
        mandatory: rule.mandatory,
      }
    }
  }

  // 3. Numeric rules for non-income fields (e.g. age)
  if (rule.operator === 'lte' || rule.operator === 'gte') {
    if (typeof actualValue !== 'number' || isNaN(actualValue)) {
      return {
        ruleId: rule.id,
        field: rule.field,
        result: 'unknown',
        actualValue,
        expectedValue: rule.value,
        mandatory: rule.mandatory,
        reasonCode: 'invalid_value',
      }
    }

    const expectedNum =
      typeof rule.value === 'number' ? rule.value : Number(rule.value)
    if (isNaN(expectedNum)) {
      return {
        ruleId: rule.id,
        field: rule.field,
        result: 'unknown',
        actualValue,
        expectedValue: rule.value,
        mandatory: rule.mandatory,
        reasonCode: 'invalid_value',
      }
    }

    const pass =
      rule.operator === 'lte'
        ? actualValue <= expectedNum
        : actualValue >= expectedNum

    return {
      ruleId: rule.id,
      field: rule.field,
      result: pass ? 'pass' : 'fail',
      actualValue,
      expectedValue: rule.value,
      mandatory: rule.mandatory,
    }
  }

  // 4. Equality operator (eq) with safe enum normalisation
  if (rule.operator === 'eq') {
    const actualNorm =
      typeof actualValue === 'string'
        ? actualValue.trim().toLowerCase()
        : actualValue
    const expectedNorm =
      typeof rule.value === 'string'
        ? rule.value.trim().toLowerCase()
        : rule.value

    return {
      ruleId: rule.id,
      field: rule.field,
      result: actualNorm === expectedNorm ? 'pass' : 'fail',
      actualValue,
      expectedValue: rule.value,
      mandatory: rule.mandatory,
    }
  }

  // 5. In operator (in)
  if (rule.operator === 'in') {
    if (!Array.isArray(rule.value)) {
      return {
        ruleId: rule.id,
        field: rule.field,
        result: 'unknown',
        actualValue,
        expectedValue: rule.value,
        mandatory: rule.mandatory,
        reasonCode: 'invalid_value',
      }
    }

    const allowed = rule.value.map((v) => String(v).trim().toLowerCase())
    const actualNorm = String(actualValue).trim().toLowerCase()

    return {
      ruleId: rule.id,
      field: rule.field,
      result: allowed.includes(actualNorm) ? 'pass' : 'fail',
      actualValue,
      expectedValue: rule.value,
      mandatory: rule.mandatory,
    }
  }

  return {
    ruleId: rule.id,
    field: rule.field,
    result: 'unknown',
    actualValue,
    expectedValue: rule.value,
    mandatory: rule.mandatory,
    reasonCode: 'invalid_value',
  }
}

/**
 * Evaluates a complete SchemeRecord against an EvaluationSubject.
 * Injected now ensures deterministic time comparison.
 */
export function evaluateScheme(
  scheme: SchemeRecord,
  subject: EvaluationSubject,
  now: Date
): SchemeEvaluation {
  const checks: RuleEvaluation[] = scheme.rules.map((rule) =>
    evaluateRule(rule, subject)
  )

  const passedCount = checks.filter((c) => c.result === 'pass').length
  const unknownCount = checks.filter((c) => c.result === 'unknown').length
  const failedCount = checks.filter((c) => c.result === 'fail').length
  const totalCount = checks.length

  const mandatoryChecks = checks.filter((c) => c.mandatory)

  // Verification staleness check
  const needsCheck =
    scheme.verification.status === 'needs_review' ||
    (scheme.verification.status === 'verified' &&
      isMissingOrStale(scheme.lastVerifiedAt, now, STALE_AFTER_DAYS))

  let state: EligibilityState
  if (needsCheck) {
    state = 'needs_verification'
  } else if (mandatoryChecks.some((c) => c.result === 'fail')) {
    state = 'not_matching'
  } else if (mandatoryChecks.some((c) => c.result === 'unknown')) {
    state = 'possible'
  } else {
    state = 'likely'
  }

  const evaluation: SchemeEvaluation = {
    schemeId: scheme.id,
    subjectId: subject.subjectId,
    state,
    checks,
    passedCount,
    unknownCount,
    failedCount,
    totalCount,
    dataStatus: scheme.verification.status,
    explanation: '',
  }

  evaluation.explanation = explainEvaluation(evaluation, scheme, 'en')

  return evaluation
}

/**
 * Evaluates a list of schemes against an EvaluationSubject.
 */
export function evaluateAll(
  schemes: SchemeRecord[],
  subject: EvaluationSubject,
  now: Date
): SchemeEvaluation[] {
  return schemes.map((scheme) => evaluateScheme(scheme, subject, now))
}

const STATE_PRIORITY: Record<EligibilityState, number> = {
  likely: 1,
  possible: 2,
  needs_verification: 3,
  not_matching: 4,
}

/**
 * Pure function to sort evaluations:
 * 1. Eligibility state (likely > possible > needs_verification > not_matching)
 * 2. More passed rules first (descending)
 * 3. Fewer failed rules (ascending)
 * 4. Scheme name alphabetically (locale aware)
 */
export function sortEvaluations(
  evaluations: SchemeEvaluation[],
  schemes:
    | SchemeRecord[]
    | Record<string, SchemeRecord>
    | Map<string, SchemeRecord>,
  language: Language = 'en'
): SchemeEvaluation[] {
  const getSchemeName = (schemeId: string): string => {
    let scheme: SchemeRecord | undefined
    if (schemes instanceof Map) {
      scheme = schemes.get(schemeId)
    } else if (Array.isArray(schemes)) {
      scheme = schemes.find((s) => s.id === schemeId)
    } else if (typeof schemes === 'object' && schemes !== null) {
      scheme = schemes[schemeId]
    }
    if (!scheme) return schemeId
    return scheme.name[language] ?? scheme.name.en ?? scheme.id
  }

  return [...evaluations].sort((a, b) => {
    // 1. State priority
    const stateDiff = STATE_PRIORITY[a.state] - STATE_PRIORITY[b.state]
    if (stateDiff !== 0) return stateDiff

    // 2. Passed count descending
    const passedDiff = b.passedCount - a.passedCount
    if (passedDiff !== 0) return passedDiff

    // 3. Failed count ascending
    const failedDiff = a.failedCount - b.failedCount
    if (failedDiff !== 0) return failedDiff

    // 4. Alphabetical by scheme name
    const nameA = getSchemeName(a.schemeId)
    const nameB = getSchemeName(b.schemeId)
    return nameA.localeCompare(nameB)
  })
}
