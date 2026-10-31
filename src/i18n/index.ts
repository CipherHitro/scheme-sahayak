import { useJourney } from '../app/journey-context'
import { translations, type LocaleStrings } from './translations'
import type { Language } from '../domain/journey.types'

export function useTranslation(): {
  t: LocaleStrings
  language: Language
  setLanguage: (lang: Language) => void
} {
  const { language, setLanguage } = useJourney()
  const t = translations[language] ?? translations.gu

  return {
    t,
    language,
    setLanguage,
  }
}

export { translations }
export type { LocaleStrings }
