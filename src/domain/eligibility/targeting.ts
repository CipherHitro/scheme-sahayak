import type { SchemeRecord } from '../scheme.types'
import type { EvaluationSubject } from '../profile.types'

/**
 * Pure function to check whether a scheme is relevant/targeted to a given subject's persona.
 * Filters out schemes with hard demographic mismatches (e.g. farmer schemes for students,
 * scholarships for working farmers, senior pensions for youth, widow pensions for married/male).
 */
export function isSchemeTargetedToSubject(
  scheme: SchemeRecord,
  subject: EvaluationSubject
): boolean {
  if (!subject) return true

  for (const rule of scheme.rules) {
    // 1. Occupation check
    if (rule.field === 'occupation') {
      const allowed = Array.isArray(rule.value) ? rule.value : [rule.value]
      if (
        subject.occupation &&
        subject.occupation !== 'unknown' &&
        !allowed.includes(subject.occupation)
      ) {
        return false
      }
    }

    // 2. Senior pension check (age >= 60)
    if (rule.field === 'age' && rule.operator === 'gte' && typeof rule.value === 'number') {
      if (rule.value >= 60) {
        if (
          typeof subject.age === 'number' &&
          !isNaN(subject.age) &&
          subject.age < 60
        ) {
          return false
        }
      }
    }

    // 3. Widow assistance check (maritalStatus === 'widowed')
    if (rule.field === 'maritalStatus' && rule.value === 'widowed') {
      if (
        subject.maritalStatus &&
        subject.maritalStatus !== 'unknown' &&
        subject.maritalStatus !== 'widowed'
      ) {
        return false
      }
      if (subject.gender && subject.gender === 'male') {
        return false
      }
    }
  }

  return true
}
