import { useNavigate } from 'react-router-dom'
import { MagnifyingGlass, UsersThree, ArrowRight } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { useJourney } from '../../app/journey-context'
import { useTranslation } from '../../i18n'

export function WelcomePage() {
  const navigate = useNavigate()
  const { setMode, loadSamplePersona, resetJourney } = useJourney()
  const { t, language } = useTranslation()

  const handleStartCitizen = () => {
    setMode('citizen')
    navigate('/consent')
  }

  const handleStartHelper = () => {
    setMode('helper')
    navigate('/helper')
  }

  const handleQuickSampleStudent = () => {
    loadSamplePersona('student')
    navigate('/results')
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
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: / (Welcome) • Lang: {language.toUpperCase()}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neel tracking-tight">
            {t.welcome.headline}
          </h1>
          <p className="text-sm text-ink-2 leading-relaxed">
            {t.welcome.description}
          </p>
        </header>

        <div className="space-y-3">
          <Button
            fullWidth
            size="large"
            variant="primary"
            icon={<MagnifyingGlass />}
            onClick={handleStartCitizen}
          >
            {t.welcome.findBenefitsBtn}
          </Button>

          <Button
            fullWidth
            size="default"
            variant="secondary"
            icon={<UsersThree />}
            onClick={handleStartHelper}
          >
            {t.welcome.helpSomeoneBtn}
          </Button>
        </div>

        {/* Shortcuts for judges/testers */}
        <section className="pt-4 border-t border-line space-y-3">
          <h2 className="text-xs font-semibold text-ink-2 uppercase tracking-wide">
            {t.common.forJudges}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button
              size="compact"
              variant="secondary"
              onClick={handleQuickSampleStudent}
            >
              {t.common.sampleStudent}
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

        <footer className="text-xs text-ink-2 pt-2 border-t border-line text-center">
          {t.common.guidanceDisclaimer}
        </footer>
      </div>
    </AppShell>
  )
}
