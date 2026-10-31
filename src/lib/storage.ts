import type { Language, TextScale, JourneyState } from '../domain/journey.types'

const STORAGE_KEYS = {
  LANGUAGE: 'scheme_sahayak_lang',
  TEXT_SCALE: 'scheme_sahayak_text_scale',
  JOURNEY: 'scheme_sahayak_demo_journey',
} as const

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getStoredLanguage(defaultLang: Language = 'gu'): Language {
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

export function getStoredJourneyState(): Partial<JourneyState> | null {
  if (!isBrowser()) return null
  try {
    const data = localStorage.getItem(STORAGE_KEYS.JOURNEY)
    if (!data) return null
    return JSON.parse(data) as Partial<JourneyState>
  } catch {
    return null
  }
}

export function setStoredJourneyState(state: Partial<JourneyState>): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(state))
  } catch {
    // Ignore storage write errors
  }
}

export function clearJourneyStorage(): void {
  if (!isBrowser()) return
  try {
    localStorage.removeItem(STORAGE_KEYS.JOURNEY)
  } catch {
    // Ignore storage clear errors
  }
}
