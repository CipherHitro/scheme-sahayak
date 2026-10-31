import type { Language } from '../domain/profile.types'

/**
 * Returns the appropriate BCP 47 locale tag for a given supported language.
 */
export function getLocaleTag(language: Language = 'en'): string {
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
 * Formats an amount into Indian Rupees (INR) using standard Intl.NumberFormat.
 * e.g. ₹6,000 or ₹1,20,000
 */
export function formatCurrency(amount: number, language: Language = 'en'): string {
  try {
    const locale = getLocaleTag(language)
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `₹${amount.toLocaleString('en-IN')}`
  }
}

/**
 * Formats a number with Indian numbering separators using Intl.NumberFormat.
 */
export function formatNumber(value: number, language: Language = 'en'): string {
  try {
    const locale = getLocaleTag(language)
    return new Intl.NumberFormat(locale).format(value)
  } catch {
    return value.toLocaleString('en-IN')
  }
}

/**
 * Formats a Date or ISO string into a human-readable date using Intl.DateTimeFormat.
 */
export function formatDate(
  dateValue: string | Date | null | undefined,
  language: Language = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateValue) return ''
  try {
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue
    if (isNaN(date.getTime())) return String(dateValue)
    const locale = getLocaleTag(language)
    return new Intl.DateTimeFormat(
      locale,
      options ?? {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    ).format(date)
  } catch {
    return String(dateValue)
  }
}
