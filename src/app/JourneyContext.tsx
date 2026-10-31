import * as React from 'react'
import type { Language, TextScale, JourneyMode, BeneficiaryProfile, JourneyState } from '../domain/journey.types'
import type { DocumentTypeId } from '../domain/document.types'
import {
  getStoredLanguage,
  setStoredLanguage,
  getStoredTextScale,
  setStoredTextScale,
  getStoredJourneyState,
  setStoredJourneyState,
  clearJourneyStorage,
} from '../lib/storage'
import { JourneyContext, type JourneyContextValue } from './journey-context'
import { SAMPLE_PERSONAS } from '../data/personas'

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>(() => getStoredLanguage('en'))
  const [textScale, setTextScaleState] = React.useState<TextScale>(() => getStoredTextScale(1))

  const [journey, setJourney] = React.useState<JourneyState>(() => {
    const stored = getStoredJourneyState()
    const currentProfile = stored?.currentProfile ?? null
    return {
      language: getStoredLanguage('en'),
      textScale: getStoredTextScale(1),
      consentGiven: stored?.consentGiven ?? false,
      mode: stored?.mode ?? 'citizen',
      currentProfile,
      activeSubjectId: stored?.activeSubjectId ?? (currentProfile?.id ?? 'self'),
      selectedSchemeId: stored?.selectedSchemeId ?? null,
      documentConfirmations: stored?.documentConfirmations ?? {},
    }
  })

  // Synchronize language and textScale to HTML attributes and localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language
      document.documentElement.style.setProperty('--text-scale', String(textScale))
      setStoredLanguage(language)
      setStoredTextScale(textScale)
    }
  }, [language, textScale])

  // Synchronize journey state to localStorage
  React.useEffect(() => {
    setStoredJourneyState({
      consentGiven: journey.consentGiven,
      mode: journey.mode,
      currentProfile: journey.currentProfile,
      activeSubjectId: journey.activeSubjectId,
      selectedSchemeId: journey.selectedSchemeId,
      documentConfirmations: journey.documentConfirmations,
    })
  }, [journey])

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang)
    setJourney((prev) => ({ ...prev, language: lang }))
  }, [])

  const setTextScale = React.useCallback((scale: TextScale) => {
    setTextScaleState(scale)
  }, [])

  const setConsentGiven = React.useCallback((consent: boolean) => {
    setJourney((prev) => ({ ...prev, consentGiven: consent }))
  }, [])

  const setMode = React.useCallback((mode: JourneyMode) => {
    setJourney((prev) => ({ ...prev, mode }))
  }, [])

  const setCurrentProfile = React.useCallback((profile: BeneficiaryProfile | null) => {
    setJourney((prev) => ({
      ...prev,
      currentProfile: profile,
      activeSubjectId: profile ? profile.id : 'self',
    }))
  }, [])

  const setActiveSubjectId = React.useCallback((subjectId: string) => {
    setJourney((prev) => ({ ...prev, activeSubjectId: subjectId }))
  }, [])

  const setSelectedSchemeId = React.useCallback((schemeId: string | null) => {
    setJourney((prev) => ({ ...prev, selectedSchemeId: schemeId }))
  }, [])

  const confirmDocument = React.useCallback((docTypeId: DocumentTypeId, confirmed = true) => {
    setJourney((prev) => ({
      ...prev,
      documentConfirmations: {
        ...prev.documentConfirmations,
        [docTypeId]: confirmed,
      },
    }))
  }, [])

  const resetJourney = React.useCallback(() => {
    clearJourneyStorage()
    setJourney({
      language,
      textScale,
      consentGiven: false,
      mode: 'citizen',
      currentProfile: null,
      activeSubjectId: 'self',
      selectedSchemeId: null,
      documentConfirmations: {},
    })
  }, [language, textScale])

  const loadSamplePersona = React.useCallback((persona: 'student' | 'farmer' | 'senior') => {
    const profile = SAMPLE_PERSONAS[persona]
    setJourney((prev) => ({
      ...prev,
      consentGiven: true,
      currentProfile: profile,
      activeSubjectId: profile.id,
      mode: 'citizen',
    }))
  }, [])

  const value = React.useMemo<JourneyContextValue>(
    () => ({
      language,
      setLanguage,
      textScale,
      setTextScale,
      consentGiven: journey.consentGiven,
      setConsentGiven,
      mode: journey.mode,
      setMode,
      currentProfile: journey.currentProfile,
      setCurrentProfile,
      activeSubjectId: journey.activeSubjectId,
      setActiveSubjectId,
      selectedSchemeId: journey.selectedSchemeId,
      setSelectedSchemeId,
      documentConfirmations: journey.documentConfirmations,
      confirmDocument,
      resetJourney,
      loadSamplePersona,
    }),
    [
      language,
      setLanguage,
      textScale,
      setTextScale,
      journey,
      setConsentGiven,
      setMode,
      setCurrentProfile,
      setActiveSubjectId,
      setSelectedSchemeId,
      confirmDocument,
      resetJourney,
      loadSamplePersona,
    ],
  )

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}
