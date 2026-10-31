import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, FileText } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { StateRecoveryCard } from '../../components/layout/StateRecoveryCard'
import { useJourney } from '../../app/journey-context'

export function ResultsPage() {
  const navigate = useNavigate()
  const { currentProfile, setSelectedSchemeId } = useJourney()

  // Deep-link recovery guard
  if (!currentProfile) {
    return (
      <AppShell>
        <StateRecoveryCard requiredFor="scheme results" recoveryPath="/profile" recoveryLabel="Go to Profile" />
      </AppShell>
    )
  }

  const handleOpenScheme = (schemeId: string) => {
    setSelectedSchemeId(schemeId)
    navigate(`/schemes/${schemeId}`)
  }

  return (
    <AppShell
      bottomAction={
        <Button
          fullWidth
          size="large"
          variant="primary"
          icon={<ArrowRight />}
          onClick={() => handleOpenScheme('scholarship-higher-education')}
        >
          View primary matched scheme
        </Button>
      }
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /results (Results Placeholder)
          </div>
          <h1 className="text-2xl font-bold text-neel tracking-tight">
            Matching benefits for {currentProfile.displayName}
          </h1>
          <p className="text-sm text-ink-2">
            Evaluated for {currentProfile.occupation} in {currentProfile.district}. Click any scheme to inspect criteria and evidence readiness.
          </p>
        </header>

        {/* Demo Scheme Rows */}
        <div className="bg-paper border border-line rounded-[14px] divide-y divide-line">
          <div
            onClick={() => handleOpenScheme('scholarship-higher-education')}
            className="p-4 hover:bg-salt transition-colors cursor-pointer space-y-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-base text-neel">
                  Post-Matric Higher Education Scholarship (Demo)
                </h2>
                <p className="text-xs text-ink-2">Education Department, Govt. of Gujarat</p>
              </div>
              <StatusBadge status="likely" />
            </div>
            <p className="text-xs text-ink-2">
              Income certificate needed for final document readiness.
            </p>
          </div>

          <div
            onClick={() => handleOpenScheme('mysy-gujarat')}
            className="p-4 hover:bg-salt transition-colors cursor-pointer space-y-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-base text-neel">
                  Mukhyamantri Yuva Swavalamban Yojana (MYSY Demo)
                </h2>
                <p className="text-xs text-ink-2">Higher Education Department</p>
              </div>
              <StatusBadge status="possibly" />
            </div>
            <p className="text-xs text-ink-2">
              Requires 80 percentile verification in 12th board.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate('/profile')}
          >
            Edit profile
          </Button>

          <Button
            size="compact"
            variant="secondary"
            icon={<FileText />}
            onClick={() => handleOpenScheme('scholarship-higher-education')}
          >
            Open detail
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
