import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Scan, CheckSquare } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { StateRecoveryCard } from '../../components/layout/StateRecoveryCard'
import { useJourney } from '../../app/journey-context'

export function SchemeDetailPage() {
  const { schemeId } = useParams<{ schemeId: string }>()
  const navigate = useNavigate()
  const { currentProfile, setSelectedSchemeId } = useJourney()

  // Deep-link recovery guard
  if (!currentProfile) {
    return (
      <AppShell>
        <StateRecoveryCard
          requiredFor={`scheme detail (${schemeId})`}
          recoveryPath="/results"
          recoveryLabel="Go to Results"
        />
      </AppShell>
    )
  }

  const handleGoToDocuments = () => {
    setSelectedSchemeId(schemeId ?? null)
    navigate(`/documents/${schemeId ?? 'scholarship-higher-education'}`)
  }

  const handleGoToChecklist = () => {
    setSelectedSchemeId(schemeId ?? null)
    navigate(`/checklist/${schemeId ?? 'scholarship-higher-education'}`)
  }

  return (
    <AppShell
      bottomAction={
        <Button
          fullWidth
          size="large"
          variant="primary"
          icon={<Scan />}
          onClick={handleGoToDocuments}
        >
          Check required documents
        </Button>
      }
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /schemes/{schemeId} (Scheme Detail Placeholder)
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-neel tracking-tight">
              Higher Education Assistance ({schemeId})
            </h1>
            <StatusBadge status="likely" />
          </div>
          <p className="text-xs text-ink-2">Education Department • Verified demo record</p>
        </header>

        {/* Criteria Explanation Summary */}
        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-neel">Evaluation Summary for {currentProfile.displayName}</h2>
          <ul className="text-sm text-ink-2 space-y-2 list-disc list-inside">
            <li>Matched condition: Gujarat resident ({currentProfile.residenceState})</li>
            <li>Matched condition: Enrolled course ({currentProfile.course ?? 'Student'})</li>
            <li>Evidence required: Income certificate under ₹2.5 lakh</li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate('/results')}
          >
            Back to results
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="compact"
              variant="secondary"
              icon={<CheckSquare />}
              onClick={handleGoToChecklist}
            >
              Skip to checklist
            </Button>
            <Button
              size="compact"
              variant="primary"
              icon={<ArrowRight />}
              onClick={handleGoToDocuments}
            >
              Verify document
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
