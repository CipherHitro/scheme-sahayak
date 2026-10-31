import * as React from 'react'
import type {
  Language,
  TextScale,
  JourneyMode,
  BeneficiaryProfile,
} from '../domain/journey.types'

export interface JourneyContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  textScale: TextScale
  setTextScale: (scale: TextScale) => void
  consentGiven: boolean
  setConsentGiven: (consent: boolean) => void
  mode: JourneyMode
  setMode: (mode: JourneyMode) => void
  currentProfile: BeneficiaryProfile | null
  setCurrentProfile: (profile: BeneficiaryProfile | null) => void
  selectedSchemeId: string | null
  setSelectedSchemeId: (schemeId: string | null) => void
  documentConfirmations: Record<string, boolean>
  confirmDocument: (docId: string, confirmed?: boolean) => void
  resetJourney: () => void
  loadSamplePersona: (persona: 'student' | 'farmer' | 'senior') => void
}

export const defaultJourneyContext: JourneyContextValue = {
  language: 'gu',
  setLanguage: () => {},
  textScale: 1,
  setTextScale: () => {},
  consentGiven: false,
  setConsentGiven: () => {},
  mode: 'citizen',
  setMode: () => {},
  currentProfile: null,
  setCurrentProfile: () => {},
  selectedSchemeId: null,
  setSelectedSchemeId: () => {},
  documentConfirmations: {},
  confirmDocument: () => {},
  resetJourney: () => {},
  loadSamplePersona: () => {},
}

export const JourneyContext = React.createContext<JourneyContextValue | null>(null)

export function useJourney(): JourneyContextValue {
  const context = React.useContext(JourneyContext)
  return context ?? defaultJourneyContext
}
