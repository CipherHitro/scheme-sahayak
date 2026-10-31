import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, FileText } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { StateRecoveryCard } from '../../components/layout/StateRecoveryCard'
import { useJourney } from '../../app/journey-context'

export function DocumentScanPage() {
  const { schemeId } = useParams<{ schemeId: string }>()
  const navigate = useNavigate()
  const { currentProfile, documentConfirmations, confirmDocument } = useJourney()

  // Deep-link recovery guard
  if (!currentProfile) {
    return (
      <AppShell>
        <StateRecoveryCard
          requiredFor={`document verification (${schemeId})`}
          recoveryPath="/results"
          recoveryLabel="Go to Results"
        />
      </AppShell>
    )
  }

  const isIncomeConfirmed = Boolean(documentConfirmations['income_certificate'])

  const handleSimulateConfirmation = () => {
    confirmDocument('income_certificate', true)
  }

  const handleGoToChecklist = () => {
    navigate(`/checklist/${schemeId ?? 'scholarship-higher-education'}`)
  }

  return (
    <AppShell
      bottomAction={
        <Button
          fullWidth
          size="large"
          variant="primary"
          icon={<ArrowRight />}
          onClick={handleGoToChecklist}
        >
          View final readiness checklist
        </Button>
      }
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /documents/{schemeId} (Synthetic Document Demo Placeholder)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-neel tracking-tight">
            Synthetic Document Evidence Demo
          </h1>
          <p className="text-sm text-ink-2">
            Real uploads are disabled in this prototype. In Phase 9, this screen executes the sample document scan simulation.
          </p>
        </header>

        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="size-6 text-neel" />
              <div>
                <h2 className="text-sm font-semibold text-neel">
                  Sample Gujarat Income Certificate
                </h2>
                <span className="text-xs text-ink-2">Synthetic demo asset</span>
              </div>
            </div>
            {isIncomeConfirmed && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-mor">
                <CheckCircle weight="fill" className="size-4" />
                Confirmed
              </span>
            )}
          </div>

          <div className="pt-2">
            <Button
              size="default"
              variant={isIncomeConfirmed ? 'secondary' : 'primary'}
              onClick={handleSimulateConfirmation}
            >
              {isIncomeConfirmed
                ? 'Sample income confirmed (Update again)'
                : 'Confirm sample income: ₹1,50,000'}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate(`/schemes/${schemeId ?? ''}`)}
          >
            Back to scheme
          </Button>

          <Button
            size="compact"
            variant="primary"
            onClick={handleGoToChecklist}
          >
            Continue to checklist
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
