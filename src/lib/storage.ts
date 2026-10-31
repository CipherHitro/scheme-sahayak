import type { Language, TextScale, JourneyState } from '../domain/journey.types'

export const CURRENT_STORAGE_VERSION = 1

export const STORAGE_KEYS = {
  LANGUAGE: 'scheme_sahayak_lang',
  TEXT_SCALE: 'scheme_sahayak_text_scale',
  JOURNEY: 'scheme_sahayak_demo_journey',
} as const

interface StoredJourneyEnvelope {
  version: number
  data: Partial<JourneyState>
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getStoredLanguage(defaultLang: Language = 'en'): Language {
  if (!isBrowser()) return defaultLang
  try {
    const val = localStorage.getItem(STORAGE_KEYS.LANGUAGE)
    if (val === 'gu' || val === 'hi' || val === 'en') {
      return val
    }
  } catch {
    // Ignore storage read errors
  }
  return defaultLang
}

export function setStoredLanguage(lang: Language): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang)
  } catch {
    // Ignore storage write errors
  }
}

export function getStoredTextScale(defaultScale: TextScale = 1): TextScale {
  if (!isBrowser()) return defaultScale
  try {
    const val = localStorage.getItem(STORAGE_KEYS.TEXT_SCALE)
    if (val) {
      const parsed = parseFloat(val)
      if (parsed === 1 || parsed === 1.125 || parsed === 1.25) {
        return parsed as TextScale
      }
    }
  } catch {
    // Ignore storage read errors
  }
  return defaultScale
}

export function setStoredTextScale(scale: TextScale): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEYS.TEXT_SCALE, String(scale))
  } catch {
    // Ignore storage write errors
  }
}

/**
 * Reads persisted journey state.
 * If persisted state is old, invalid, or corrupt, silently discards it and returns null.
 */
export function getStoredJourneyState(): Partial<JourneyState> | null {
  if (!isBrowser()) return null
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JOURNEY)
    if (!raw) return null

    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      // Corrupt JSON: discard silently
      localStorage.removeItem(STORAGE_KEYS.JOURNEY)
      return null
    }

    // Verify envelope and version
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('version' in parsed) ||
      (parsed as StoredJourneyEnvelope).version !== CURRENT_STORAGE_VERSION ||
      !('data' in parsed) ||
      typeof (parsed as StoredJourneyEnvelope).data !== 'object' ||
      (parsed as StoredJourneyEnvelope).data === null
    ) {
      // Old or incompatible schema: discard silently
      localStorage.removeItem(STORAGE_KEYS.JOURNEY)
      return null
    }

    const envelope = parsed as StoredJourneyEnvelope
    return envelope.data
  } catch {
    // Other errors: discard silently
    try {
      localStorage.removeItem(STORAGE_KEYS.JOURNEY)
    } catch {
      // ignore
    }
    return null
  }
}

/**
 * Writes journey state wrapped in a versioned envelope.
 */
export function setStoredJourneyState(state: Partial<JourneyState>): void {
  if (!isBrowser()) return
  try {
    const envelope: StoredJourneyEnvelope = {
      version: CURRENT_STORAGE_VERSION,
      data: state,
    }
    localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(envelope))
  } catch {
    // Ignore storage write errors
  }
}

/**
 * Clears demo journey state from storage.
 */
export function clearJourneyStorage(): void {
  if (!isBrowser()) return
  try {
    localStorage.removeItem(STORAGE_KEYS.JOURNEY)
  } catch {
    // Ignore storage clear errors
  }
}
