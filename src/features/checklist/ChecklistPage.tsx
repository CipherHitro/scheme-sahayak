import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowSquareOut, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { StateRecoveryCard } from '../../components/layout/StateRecoveryCard'
import { useJourney } from '../../app/journey-context'

export function ChecklistPage() {
  const { schemeId } = useParams<{ schemeId: string }>()
  const navigate = useNavigate()
  const { currentProfile, documentConfirmations } = useJourney()

  // Deep-link recovery guard
  if (!currentProfile) {
    return (
      <AppShell>
        <StateRecoveryCard
          requiredFor={`readiness checklist (${schemeId})`}
          recoveryPath="/results"
          recoveryLabel="Go to Results"
        />
      </AppShell>
    )
  }

  const isIncomeConfirmed = Boolean(documentConfirmations['income_certificate'])

  return (
    <AppShell
      bottomAction={
        <Button
          fullWidth
          size="large"
          variant="primary"
          icon={<ArrowSquareOut />}
          onClick={() => window.open('https://digitalgujarat.gov.in', '_blank', 'noopener,noreferrer')}
        >
          Open official portal (Digital Gujarat)
        </Button>
      }
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /checklist/{schemeId} (Readiness Checklist Placeholder)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-neel tracking-tight">
            Readiness Checklist for {currentProfile.displayName}
          </h1>
          <p className="text-sm text-ink-2">
            Prepare required documents before applying on the official portal.
          </p>
        </header>

        {/* Dark panel / Readiness summary placeholder per DESIGN.md Section 7.3 */}
        <div className="bg-neel text-paper rounded-[14px] p-5 space-y-2">
          <span className="text-xs text-haldi font-semibold uppercase tracking-wider">
            Preparation Status
          </span>
          <h2 className="text-lg font-bold">
            {isIncomeConfirmed ? 'Ready: 1 of 2 documents confirmed' : 'Missing: 2 of 2 documents needed'}
          </h2>
          <p className="text-xs text-neel-soft">
            {isIncomeConfirmed
              ? 'Sample income certificate verified. Bring original marksheets to centre.'
              : 'Confirm your sample income certificate or gather physical documents.'}
          </p>
        </div>

        {/* Documents Ledger List */}
        <div className="bg-paper border border-line rounded-[14px] divide-y divide-line">
          <div className="p-4 flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-neel block">Income Certificate</span>
              <span className="text-xs text-ink-2">Revenue Department, Gujarat</span>
            </div>
            {isIncomeConfirmed ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-mor">
                <CheckCircle weight="fill" className="size-4" />
                Ready (Sample)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-madder">
                <WarningCircle weight="fill" className="size-4" />
                Missing
              </span>
            )}
          </div>

          <div className="p-4 flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-neel block">Previous Exam Marksheet</span>
              <span className="text-xs text-ink-2">Board / University</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-madder">
              <WarningCircle weight="fill" className="size-4" />
              Missing
            </span>
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
            variant="secondary"
            onClick={() => window.print()}
          >
            Print checklist
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
