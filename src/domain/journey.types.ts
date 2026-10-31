import type { Language, BeneficiaryProfile } from './profile.types'
import type { DocumentTypeId } from './document.types'

export type { Language, BeneficiaryProfile, IncomeBand } from './profile.types'

export type TextScale = 1 | 1.125 | 1.25

export type JourneyMode = 'citizen' | 'helper'

export interface JourneyState {
  language: Language
  textScale: TextScale
  consentGiven: boolean
  mode: JourneyMode
  currentProfile: BeneficiaryProfile | null
  activeSubjectId: string
  selectedSchemeId: string | null
  documentConfirmations: Partial<Record<DocumentTypeId, boolean>>
}
