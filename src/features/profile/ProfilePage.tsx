import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, UserCheck } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { useJourney } from '../../app/journey-context'
import { SAMPLE_PERSONAS } from '../../data/personas'

export function ProfilePage() {
  const navigate = useNavigate()
  const { currentProfile, setCurrentProfile } = useJourney()

  const handleSelectSample = (key: 'student' | 'farmer' | 'senior') => {
    setCurrentProfile(SAMPLE_PERSONAS[key])
  }

  const handleProceedToResults = () => {
    // If no profile selected, populate with default sample student to allow testing
    if (!currentProfile) {
      setCurrentProfile(SAMPLE_PERSONAS.student)
    }
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
          onClick={handleProceedToResults}
        >
          View matched schemes
        </Button>
      }
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /profile (Guided Profile Placeholder)
          </div>
          <h1 className="text-2xl font-bold text-neel tracking-tight">
            Tell us about your household
          </h1>
          <p className="text-sm text-ink-2">
            In Phase 7, this will be the one-question-at-a-time profile flow. For Phase 3, choose a test persona below or customize answers.
          </p>
        </header>

        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-neel">
            Active Profile Selection:
          </h2>

          <div className="space-y-2.5">
            {(['student', 'farmer', 'senior'] as const).map((key) => {
              const persona = SAMPLE_PERSONAS[key]
              const isSelected = currentProfile?.id === persona.id
              return (
                <div
                  key={key}
                  onClick={() => handleSelectSample(key)}
                  className={`p-3.5 rounded-[10px] border cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-neel bg-neel-soft/40'
                      : 'border-line bg-paper hover:bg-salt-2'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm text-neel block">
                        {persona.displayName}
                      </span>
                      <span className="text-xs text-ink-2">
                        {persona.district} • Age {persona.age} • Income: {persona.annualHouseholdIncome}
                      </span>
                    </div>
                    {isSelected && (
                      <UserCheck className="size-5 text-neel shrink-0" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate('/consent')}
          >
            Back
          </Button>

          <Button
            size="compact"
            variant="primary"
            onClick={handleProceedToResults}
          >
            Continue to Results
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
