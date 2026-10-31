import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MagnifyingGlass,
  UsersThree,
  ArrowRight,
  Microphone,
  LockKey,
  Sparkle,
  CaretDown,
  CaretUp,
  GraduationCap,
  Tractor,
  Users,
} from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { BandhaniBand } from '../../components/ui/BandhaniBand'
import { useJourney } from '../../app/journey-context'
import { useTranslation } from '../../i18n'

export function WelcomePage() {
  const navigate = useNavigate()
  const { setMode, loadSamplePersona, resetJourney } = useJourney()
  const { t } = useTranslation()

  const [showSampleOptions, setShowSampleOptions] = useState(false)
  const [showVoiceNotice, setShowVoiceNotice] = useState(false)

  const handleStartCitizen = () => {
    setMode('citizen')
    navigate('/consent')
  }

  const handleStartHelper = () => {
    setMode('helper')
    navigate('/helper')
  }

  const handleSelectSample = (persona: 'student' | 'farmer' | 'senior') => {
    loadSamplePersona(persona)
    navigate('/consent')
  }

  const handleVoiceClick = () => {
    setShowVoiceNotice((prev) => !prev)
  }

  return (
    <AppShell
      bottomAction={
        <Button
          fullWidth
          size="large"
          variant="primary"
          icon={<ArrowRight />}
          onClick={handleStartCitizen}
        >
          {t.welcome.findBenefitsBtn}
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Bandhani band: decorative repeating dot lattice under header */}
        <BandhaniBand variant="salt" className="-mx-5 sm:-mx-8 lg:-mx-12 w-auto mb-2" />

        {/* Task-first Display Headline and Description */}
        <header className="space-y-3">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: / (Welcome)
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neel tracking-tight leading-[1.2]">
            {t.welcome.headline}
          </h1>
          <p className="text-base text-ink-2 leading-relaxed">
            {t.welcome.description}
          </p>
        </header>

        {/* Primary and Secondary Actions */}
        <div className="space-y-3 pt-2">
          {/* Primary Action */}
          <Button
            fullWidth
            size="large"
            variant="primary"
            icon={<MagnifyingGlass />}
            onClick={handleStartCitizen}
          >
            {t.welcome.findBenefitsBtn}
          </Button>

          {/* Voice Prompt Action (Accessible speech feature or honest notice) */}
          <Button
            fullWidth
            size="default"
            variant="secondary"
            icon={<Microphone />}
            onClick={handleVoiceClick}
          >
            {t.welcome.speakAnswerBtn}
          </Button>

          {showVoiceNotice && (
            <div
              role="alert"
              className="p-3 bg-paper border border-line rounded-[10px] text-xs text-ink-2 leading-relaxed animate-in fade-in duration-200"
            >
              {t.welcome.voiceTuningNotice}
            </div>
          )}

          {/* Secondary Action: Assisted Helper Mode */}
          <Button
            fullWidth
            size="default"
            variant="secondary"
            icon={<UsersThree />}
            onClick={handleStartHelper}
          >
            {t.welcome.helpSomeoneBtn}
          </Button>

          {/* Visible Ghost Button: Try a sample (directly under actions without scrolling) */}
          <div className="pt-1">
            <Button
              fullWidth
              size="default"
              variant="ghost"
              icon={showSampleOptions ? <CaretUp /> : <CaretDown />}
              onClick={() => setShowSampleOptions((prev) => !prev)}
            >
              <span className="flex items-center gap-1.5">
                <Sparkle className="size-4 text-haldi" />
                {showSampleOptions ? t.welcome.hideSamplesBtn : t.welcome.trySampleBtn}
              </span>
            </Button>

            {/* Quick sample personas panel revealed directly under button without scrolling */}
            {showSampleOptions && (
              <div
                data-testid="quick-samples-panel"
                className="mt-2 p-3 bg-paper border border-line rounded-[14px] space-y-2 animate-in fade-in duration-200"
              >
                <div className="text-xs font-semibold text-neel mb-1">
                  {t.common.forJudges}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    size="default"
                    variant="secondary"
                    icon={<GraduationCap />}
                    className="justify-start text-left"
                    onClick={() => handleSelectSample('student')}
                  >
                    {t.welcome.sampleStudentLabel}
                  </Button>
                  <Button
                    size="default"
                    variant="secondary"
                    icon={<Tractor />}
                    className="justify-start text-left"
                    onClick={() => handleSelectSample('farmer')}
                  >
                    {t.welcome.sampleFarmerLabel}
                  </Button>
                  <Button
                    size="default"
                    variant="secondary"
                    icon={<Users />}
                    className="justify-start text-left"
                    onClick={() => handleSelectSample('senior')}
                  >
                    {t.welcome.sampleSeniorLabel}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Reassurance Line */}
        <div className="flex items-center gap-2 pt-2 text-xs text-ink-2">
          <LockKey className="size-4 text-neel shrink-0" />
          <span>{t.common.privacyNotice}</span>
        </div>

        {/* Below the fold: dedicated shortcuts section for judges and testers */}
        <section className="pt-6 border-t border-line space-y-3">
          <h2 className="text-xs font-semibold text-ink-2 uppercase tracking-wide">
            {t.common.forJudges}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button
              size="compact"
              variant="secondary"
              onClick={() => handleSelectSample('student')}
            >
              {t.common.sampleStudent}
            </Button>
            <Button
              size="compact"
              variant="secondary"
              onClick={() => handleSelectSample('farmer')}
            >
              {t.common.sampleFarmer}
            </Button>
            <Button
              size="compact"
              variant="secondary"
              onClick={() => handleSelectSample('senior')}
            >
              {t.common.sampleSenior}
            </Button>
            <Button
              size="compact"
              variant="ghost"
              onClick={resetJourney}
            >
              {t.common.startOver}
            </Button>
          </div>
        </section>

        {/* Department Disclaimer Footer */}
        <footer className="text-xs text-ink-2 pt-4 border-t border-line text-center">
          {t.common.guidanceDisclaimer}
        </footer>
      </div>
    </AppShell>
  )
}
