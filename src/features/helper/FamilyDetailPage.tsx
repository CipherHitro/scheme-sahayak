import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, UsersThree, FileText } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { SAMPLE_FAMILIES } from '../../data/helperFamilies'

export function FamilyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const family = SAMPLE_FAMILIES.find((f) => f.id === id) ?? {
    id: id ?? 'unknown',
    familyName: `Household (${id})`,
    district: 'Gujarat',
    membersCount: 3,
    missingDocsCount: 2,
    primaryScheme: 'Sample Scheme',
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /helper/families/{id} (Family Detail Placeholder)
          </div>
          <div className="flex items-center gap-2">
            <UsersThree className="size-6 text-neel" />
            <h1 className="text-xl sm:text-2xl font-bold text-neel tracking-tight">
              {family.familyName}
            </h1>
          </div>
          <p className="text-xs text-ink-2">
            District: {family.district} • Family Members: {family.membersCount}
          </p>
        </header>

        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-neel">Primary Matched Scheme</h2>
          <div className="p-3.5 rounded-[10px] bg-salt border border-line flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-neel block">
                {family.primaryScheme}
              </span>
              <span className="text-xs text-madder font-medium">
                {family.missingDocsCount} documents missing for full readiness
              </span>
            </div>
            <Button
              size="compact"
              variant="secondary"
              icon={<FileText />}
              onClick={() => navigate('/results')}
            >
              Open schemes
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate('/helper')}
          >
            Back to helper list
          </Button>

          <Button
            size="compact"
            variant="primary"
            onClick={() => navigate('/results')}
          >
            Review family schemes
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
