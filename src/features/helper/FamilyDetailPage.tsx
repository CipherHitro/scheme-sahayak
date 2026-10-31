import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, UsersThree, FileText } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { SAMPLE_FAMILIES } from '../../data/helperFamilies'
import { useJourney } from '../../app/journey-context'

export function FamilyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { language } = useJourney()

  const familyRecord = SAMPLE_FAMILIES.find((f) => f.id === id)
  const familyName = familyRecord
    ? (familyRecord.familyName[language] ?? familyRecord.familyName.en)
    : `Household (${id})`
  const schemeName = familyRecord
    ? (familyRecord.primarySchemeName[language] ?? familyRecord.primarySchemeName.en)
    : 'Primary Scheme'
  const district = familyRecord?.district ?? 'Gujarat'
  const membersCount = familyRecord?.membersCount ?? 3
  const missingDocsCount = familyRecord?.missingDocsCount ?? 2

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
              {familyName}
            </h1>
          </div>
          <p className="text-xs text-ink-2">
            District: {district} • Family Members: {membersCount}
          </p>
        </header>

        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-neel">Primary Matched Scheme</h2>
          <div className="p-3.5 rounded-[10px] bg-salt border border-line flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm text-neel block">
                {schemeName}
              </span>
              <span className="text-xs text-madder font-medium">
                {missingDocsCount} documents missing for full readiness
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
