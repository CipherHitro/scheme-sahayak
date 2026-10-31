import { useNavigate } from 'react-router-dom'
import { MagnifyingGlass, UsersThree, ArrowRight } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { useJourney } from '../../app/journey-context'

export function WelcomePage() {
  const navigate = useNavigate()
  const { setMode, loadSamplePersona, resetJourney } = useJourney()

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
          Find benefits for me
        </Button>
      }
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: / (Welcome Screen Placeholder)
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neel tracking-tight">
            તમારા પરિવાર માટે કઈ સરકારી યોજનાઓ છે, જાણો.
          </h1>
          <p className="text-sm text-ink-2 leading-relaxed">
            Answer a few simple questions. SchemeSahayak evaluates eligibility using local deterministic rules, explains why, and prepares your required documents.
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
            Find benefits for me
          </Button>

          <Button
            fullWidth
            size="default"
            variant="secondary"
            icon={<UsersThree />}
            onClick={handleStartHelper}
          >
            Help someone else (Helper mode)
          </Button>
        </div>

        {/* Shortcuts for judges/testers */}
        <section className="pt-4 border-t border-line space-y-3">
          <h2 className="text-xs font-semibold text-ink-2 uppercase tracking-wide">
            For judges and testers (Synthetic shortcuts)
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button
              size="compact"
              variant="secondary"
              onClick={handleQuickSampleStudent}
            >
              Direct test: Sample Student
            </Button>
            <Button
              size="compact"
              variant="ghost"
              onClick={resetJourney}
            >
              Start over / Clear demo data
            </Button>
          </div>
        </section>

        <footer className="text-xs text-ink-2 pt-2 border-t border-line text-center">
          This is guidance. The department makes the final decision.
        </footer>
      </div>
    </AppShell>
  )
}
