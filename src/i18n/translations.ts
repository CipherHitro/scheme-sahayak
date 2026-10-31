import en from './en.json'
import gu from './gu.json'
import hi from './hi.json'
import type { Language } from '../domain/journey.types'

export type LocaleStrings = typeof en

export const translations: Record<Language, LocaleStrings> = {
  en,
  gu,
  hi,
}
