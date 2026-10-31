import type { SchemeEvaluation, SchemeRecord } from '../scheme.types'
import type { Language } from '../profile.types'
import { t } from '../../i18n'

/**
 * Generates a plain-language explanation for a scheme evaluation based on the active language.
 * Incorporates specific messages for straddling income bands, failed rules, or missing criteria.
 */
export function explainEvaluation(
  evaluation: SchemeEvaluation,
  scheme: SchemeRecord,
  language: Language = 'en'
): string {
  // 1. Check for straddling income band
  const straddlingCheck = evaluation.checks.find(
    (c) => c.reasonCode === 'straddles_band'
  )
  if (straddlingCheck) {
    const limit = String(straddlingCheck.expectedValue ?? '')
    return t('engine.straddlesBand', { limit }, language)
  }

  // 2. Not matching
  if (evaluation.state === 'not_matching') {
    const failedMandatory = evaluation.checks.filter(
      (c) => c.mandatory && c.result === 'fail'
    )
    const failedNames = failedMandatory
      .map((c) => {
        const rule = scheme.rules.find((r) => r.id === c.ruleId)
        return rule ? rule.label[language] ?? rule.label.en : String(c.field)
      })
      .join(', ')

    return t('engine.notMatchingCriteria', { failedRules: failedNames }, language)
  }

  // 3. Needs verification
  if (evaluation.state === 'needs_verification') {
    return t('engine.needsVerification', undefined, language)
  }

  // 4. Possible (some criteria missing or unknown)
  if (evaluation.state === 'possible') {
    return t('engine.missingCriteria', undefined, language)
  }

  // 5. Likely (all mandatory criteria pass)
  return t('engine.allCriteriaMet', undefined, language)
}
