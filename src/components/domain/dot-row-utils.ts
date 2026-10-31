import type { Language } from '../../domain/profile.types'

export type DotStatus = 'met' | 'unknown' | 'unmet'

export interface DotItem {
  id?: string
  status: DotStatus
}

export interface DotRowSummary {
  passedCount: number
  unknownCount: number
  failedCount: number
  totalCount: number
  type?: 'condition' | 'document'
  language?: Language
}

/**
 * Pure function to format accessible aria-label for DotRow.
 * Example: "4 of 6 conditions met, 1 to confirm, 1 not matching"
 */
export function buildDotRowAriaLabel({
  passedCount,
  unknownCount,
  failedCount,
  totalCount,
  type = 'condition',
  language = 'en',
}: DotRowSummary): string {
  if (language === 'gu') {
    if (totalCount === 0) return type === 'document' ? '0 દસ્તાવેજ' : '0 શરતો'
    const parts: string[] = []
    if (type === 'document') {
      parts.push(`${totalCount} માંથી ${passedCount} દસ્તાવેજો તૈયાર`)
      if (failedCount > 0) parts.push(`${failedCount} ખૂટે છે`)
    } else {
      parts.push(`${totalCount} માંથી ${passedCount} શરતો પૂર્ણ`)
      if (unknownCount > 0) parts.push(`${unknownCount} ચકાસવાની બાકી`)
      if (failedCount > 0) parts.push(`${failedCount} મેળ ખાતી નથી`)
    }
    return parts.join(', ')
  }

  if (language === 'hi') {
    if (totalCount === 0) return type === 'document' ? '0 दस्तावेज़' : '0 शर्तें'
    const parts: string[] = []
    if (type === 'document') {
      parts.push(`${totalCount} में से ${passedCount} दस्तावेज़ तैयार`)
      if (failedCount > 0) parts.push(`${failedCount} शेष`)
    } else {
      parts.push(`${totalCount} में से ${passedCount} शर्तें पूरी`)
      if (unknownCount > 0) parts.push(`${unknownCount} पुष्टि हेतु`)
      if (failedCount > 0) parts.push(`${failedCount} मेल नहीं खाती`)
    }
    return parts.join(', ')
  }

  // English default
  if (totalCount === 0) {
    return type === 'document' ? '0 documents' : '0 conditions'
  }

  const parts: string[] = []
  if (type === 'document') {
    parts.push(`${passedCount} of ${totalCount} documents ready`)
    if (failedCount > 0) parts.push(`${failedCount} missing`)
  } else {
    parts.push(`${passedCount} of ${totalCount} conditions met`)
    if (unknownCount > 0) parts.push(`${unknownCount} to confirm`)
    if (failedCount > 0) parts.push(`${failedCount} not matching`)
  }

  return parts.join(', ')
}

/**
 * Pure function to format visible count text beside the DotRow.
 * Example: "4 of 6 conditions met"
 */
export function buildDotRowCountText({
  passedCount,
  totalCount,
  type = 'condition',
  language = 'en',
}: DotRowSummary): string {
  if (language === 'gu') {
    return type === 'document'
      ? `${totalCount} માંથી ${passedCount} દસ્તાવેજો તૈયાર`
      : `${totalCount} માંથી ${passedCount} શરતો પૂર્ણ`
  }

  if (language === 'hi') {
    return type === 'document'
      ? `${totalCount} में से ${passedCount} दस्तावेज़ तैयार`
      : `${totalCount} में से ${passedCount} शर्तें पूरी`
  }

  // English default
  return type === 'document'
    ? `${passedCount} of ${totalCount} documents ready`
    : `${passedCount} of ${totalCount} conditions met`
}
