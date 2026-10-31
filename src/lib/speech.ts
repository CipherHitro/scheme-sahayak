import type { Language } from '../domain/profile.types'
import type { QuestionOption } from '../domain/question.defs'

/**
 * Maps application language code to standard BCP 47 Web Speech locale tag.
 */
export function getSpeechLocale(language: Language = 'en'): 'gu-IN' | 'hi-IN' | 'en-IN' {
  switch (language) {
    case 'gu':
      return 'gu-IN'
    case 'hi':
      return 'hi-IN'
    case 'en':
    default:
      return 'en-IN'
  }
}

/**
 * Detects whether the current browser supports SpeechRecognition.
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
}

/**
 * Detects whether the current browser supports SpeechSynthesis.
 */
export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
}

/**
 * Returns SpeechRecognition constructor if available in browser.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSpeechRecognitionConstructor(): (new () => any) | null {
  if (typeof window === 'undefined') return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any
  return win.SpeechRecognition || win.webkitSpeechRecognition || null
}

/**
 * Matches a user-spoken voice transcript to available question options.
 * Handles English, Gujarati, and Hindi affirmations, negations, and category values.
 */
export function matchTranscriptToOption(
  transcript: string,
  options: QuestionOption[],
  language: Language = 'en'
): QuestionOption | null {
  if (!transcript || !options || options.length === 0) return null

  const cleaned = transcript.trim().toLowerCase()

  // 1. Check for boolean yes/no patterns
  const affirmativePatterns = [
    'yes',
    'yeah',
    'yup',
    'true',
    'હા',
    'હાં',
    'હા હું',
    'હા અમે',
    'હા છે',
    'ખરું',
    'हाँ',
    'हाँ जी',
    'हाँ हम',
    'सही',
  ]
  const negativePatterns = [
    'no',
    'nope',
    'false',
    'ના',
    'નથી',
    'ના નથી',
    'ખોટું',
    'नहीं',
    'ना',
    'गलत',
  ]

  const isAffirmative = affirmativePatterns.some((pat) => cleaned.includes(pat) || cleaned === pat)
  const isNegative = negativePatterns.some((pat) => cleaned.includes(pat) || cleaned === pat)

  if (isAffirmative) {
    const trueOpt = options.find((o) => o.value === true || String(o.value).toLowerCase() === 'yes')
    if (trueOpt) return trueOpt
  }

  if (isNegative) {
    const falseOpt = options.find((o) => o.value === false || String(o.value).toLowerCase() === 'no')
    if (falseOpt) return falseOpt
  }

  // 2. Check exact or partial match with option labels in active language
  for (const option of options) {
    const labelInLang = (option.label[language] ?? option.label.en).toLowerCase()
    const labelEn = option.label.en.toLowerCase()
    const valStr = String(option.value).toLowerCase()

    if (cleaned === labelInLang || cleaned === labelEn || cleaned === valStr) {
      return option
    }

    if (
      cleaned.includes(labelInLang) ||
      labelInLang.includes(cleaned) ||
      cleaned.includes(labelEn) ||
      cleaned.includes(valStr)
    ) {
      return option
    }
  }

  // 3. Fallback: Check if spoken text contains significant keywords of option
  for (const option of options) {
    const words = (option.label[language] ?? option.label.en)
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2)

    for (const w of words) {
      if (cleaned.includes(w)) {
        return option
      }
    }
  }

  return null
}
