import { useJourney } from '../app/journey-context'
import { translations, type LocaleStrings } from './translations'
import type { Language } from '../domain/journey.types'

/**
 * Pure translation function over the locale dictionaries.
 * Resolves dot-notated keys (e.g. 'welcome.headline') and interpolates {params}.
 */
export function t(
  key: string,
  params?: Record<string, string | number>,
  lang: Language = 'en'
): string {
  const dict = translations[lang] ?? translations.en
  const parts = key.split('.')
  let current: unknown = dict

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return key
    }
  }

  if (typeof current !== 'string') {
    return key
  }

  if (!params) return current

  return Object.entries(params).reduce((str, [paramKey, paramVal]) => {
    return str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal))
  }, current)
}

export type TFunction = {
  (key: string, params?: Record<string, string | number>): string
} & LocaleStrings

export function useTranslation(): {
  t: TFunction
  language: Language
  setLanguage: (lang: Language) => void
} {
  const { language, setLanguage } = useJourney()
  const currentLang = language ?? 'en'
  const strings = translations[currentLang] ?? translations.en

  const tFn = (key: string, params?: Record<string, string | number>) =>
    t(key, params, currentLang)

  const tCombined = Object.assign(tFn, strings) as TFunction

  return {
    t: tCombined,
    language: currentLang,
    setLanguage,
  }
}

export { translations }
export type { LocaleStrings }
