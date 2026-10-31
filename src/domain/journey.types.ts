import type { BeneficiaryProfile } from './profile.types'

export type Language = 'gu' | 'hi' | 'en'

export type TextScale = 1 | 1.125 | 1.25

export type JourneyMode = 'citizen' | 'helper'

export type { BeneficiaryProfile, IncomeBand } from './profile.types'

export interface JourneyState {
  language: Language
  textScale: TextScale
  consentGiven: boolean
  mode: JourneyMode
  currentProfile: BeneficiaryProfile | null
  selectedSchemeId: string | null
  documentConfirmations: Record<string, boolean>
}
