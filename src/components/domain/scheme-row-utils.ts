import type { Language } from '../../domain/profile.types'

export function formatVerificationDate(
  dateStr: string | null | undefined,
  language: Language = 'en'
): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    const locale = language === 'gu' ? 'gu-IN' : language === 'hi' ? 'hi-IN' : 'en-IN'
    const formatted = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d)

    if (language === 'gu') return `${formatted} ના રોજ ચકાસાયેલ`
    if (language === 'hi') return `${formatted} को सत्यापित`
    return `Checked on ${formatted}`
  } catch {
    return dateStr
  }
}
