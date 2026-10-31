import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  UserList,
  Cpu,
  LockKey,
  ArrowCounterClockwise,
  SpeakerHigh,
  SpeakerSlash,
} from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { useJourney } from '../../app/journey-context'
import { useTranslation } from '../../i18n'

export function ConsentPage() {
  const navigate = useNavigate()
  const { consentGiven, setConsentGiven, currentProfile, language } = useJourney()
  const { t } = useTranslation()

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported] = useState(() => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
  })

  // Cancel any active speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleToggleSpeech = useCallback(() => {
    if (!speechSupported || typeof window === 'undefined') return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    window.speechSynthesis.cancel()

    const readText = [
      t.consent.title,
      t.consent.whatWeAskTitle,
      t.consent.whatWeAskDesc,
      t.consent.whatWeDoTitle,
      t.consent.whatWeDoDesc,
      t.consent.whatWeNeverDoTitle,
      t.consent.whatWeNeverDoDesc,
      t.consent.howToClearTitle,
      t.consent.howToClearDesc,
      t.consent.checkboxLabel,
    ].join('. ')

    const utterance = new SpeechSynthesisUtterance(readText)

    // Language mapping
    if (language === 'gu') {
      utterance.lang = 'gu-IN'
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN'
    } else {
      utterance.lang = 'en-IN'
    }

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }, [isSpeaking, speechSupported, language, t])

  const handleContinue = () => {
    if (!consentGiven) return

    // Choosing a sample persona goes straight to results; manual citizen journey goes to profile questions
    if (currentProfile?.isSynthetic) {
      navigate('/results')
    } else {
      navigate('/profile')
    }
  }

  return (
    <AppShell
      bottomAction={
        <Button
          fullWidth
          size="large"
          variant="primary"
          disabled={!consentGiven}
          icon={<ArrowRight />}
          onClick={handleContinue}
        >
          {t.common.continue}
        </Button>
      }
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /consent
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-neel tracking-tight">
              {t.consent.title}
            </h1>

            {/* Read-aloud button only if real support exists */}
            {speechSupported && (
              <Button
                size="compact"
                variant={isSpeaking ? 'primary' : 'ghost'}
                icon={isSpeaking ? <SpeakerSlash /> : <SpeakerHigh />}
                onClick={handleToggleSpeech}
                aria-label={isSpeaking ? t.consent.stopListeningBtn : t.consent.listenBtn}
              >
                {isSpeaking ? t.consent.stopListeningBtn : t.consent.listenBtn}
              </Button>
            )}
          </div>
          <p className="text-sm text-ink-2 leading-relaxed">
            {t.consent.description}
          </p>
        </header>

        {/* 4 Pillars of Consent: What we ask, What we do, What we never do, How to clear */}
        <div className="bg-paper border border-line rounded-[14px] divide-y divide-line">
          {/* 1. What we ask */}
          <div className="p-4 sm:p-5 flex items-start gap-3.5">
            <div className="size-9 rounded-[10px] bg-neel-soft text-neel flex items-center justify-center shrink-0 mt-0.5">
              <UserList className="size-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-neel">
                {t.consent.whatWeAskTitle}
              </h2>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                {t.consent.whatWeAskDesc}
              </p>
            </div>
          </div>

          {/* 2. What we do with it */}
          <div className="p-4 sm:p-5 flex items-start gap-3.5">
            <div className="size-9 rounded-[10px] bg-neel-soft text-neel flex items-center justify-center shrink-0 mt-0.5">
              <Cpu className="size-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-neel">
                {t.consent.whatWeDoTitle}
              </h2>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                {t.consent.whatWeDoDesc}
              </p>
            </div>
          </div>

          {/* 3. What we never do */}
          <div className="p-4 sm:p-5 flex items-start gap-3.5">
            <div className="size-9 rounded-[10px] bg-madder-soft text-madder flex items-center justify-center shrink-0 mt-0.5">
              <LockKey className="size-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-neel">
                {t.consent.whatWeNeverDoTitle}
              </h2>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                {t.consent.whatWeNeverDoDesc}
              </p>
            </div>
          </div>

          {/* 4. How to clear demo data */}
          <div className="p-4 sm:p-5 flex items-start gap-3.5">
            <div className="size-9 rounded-[10px] bg-haldi-soft text-neel flex items-center justify-center shrink-0 mt-0.5">
              <ArrowCounterClockwise className="size-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-neel">
                {t.consent.howToClearTitle}
              </h2>
              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                {t.consent.howToClearDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Acknowledgement Checkbox */}
        <div className="p-4 bg-paper border border-line rounded-[14px]">
          <label className="flex items-start gap-3.5 cursor-pointer min-h-[48px] py-1 select-none">
            <input
              type="checkbox"
              id="consent-acknowledgement"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="size-5 mt-0.5 rounded text-neel focus:ring-neel border-line cursor-pointer shrink-0"
            />
            <span className="text-sm font-medium text-neel leading-relaxed">
              {t.consent.checkboxLabel}
            </span>
          </label>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <Button
            size="default"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate('/')}
          >
            {t.common.back}
          </Button>

          <Button
            size="default"
            variant="primary"
            disabled={!consentGiven}
            icon={<ArrowRight />}
            onClick={handleContinue}
          >
            {t.common.continue}
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
