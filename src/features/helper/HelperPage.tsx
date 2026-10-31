import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UsersThree, CaretRight } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { useJourney } from '../../app/journey-context'
import { SAMPLE_FAMILIES } from '../../data/helperFamilies'

export function HelperPage() {
  const navigate = useNavigate()
  const { setMode, language } = useJourney()

  const handleOpenFamily = (familyId: string) => {
    navigate(`/helper/families/${familyId}`)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /helper (Helper Mode Placeholder)
          </div>
          <div className="flex items-center gap-2">
            <UsersThree className="size-7 text-neel" />
            <h1 className="text-2xl font-bold text-neel tracking-tight">
              Assisted Beneficiary Families
            </h1>
          </div>
          <p className="text-sm text-ink-2">
            Designed for CSC operators, e-Gram staff, and community volunteers assisting multiple households with consent.
          </p>
        </header>

        {/* Summary card */}
        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-2">
          <h2 className="text-xs font-semibold text-ink-2 uppercase tracking-wide">
            Screened Today (Sample Data)
          </h2>
          <p className="text-xl font-bold text-neel">
            3 Families • 6 Documents Missing Across All Records
          </p>
        </div>

        {/* Family list */}
        <div className="bg-paper border border-line rounded-[14px] divide-y divide-line">
          {SAMPLE_FAMILIES.map((family) => {
            const familyTitle = family.familyName[language] ?? family.familyName.en
            const schemeTitle = family.primarySchemeName[language] ?? family.primarySchemeName.en
            return (
              <div
                key={family.id}
                onClick={() => handleOpenFamily(family.id)}
                className="p-4 hover:bg-salt transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-sm text-neel block">
                    {familyTitle}
                  </span>
                  <span className="text-xs text-ink-2">
                    {family.district} • {family.membersCount} members • {schemeTitle}
                  </span>
                  <span className="text-xs font-medium text-madder block mt-0.5">
                    {family.missingDocsCount} documents missing
                  </span>
                </div>
                <CaretRight className="size-5 text-ink-2 shrink-0" />
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => {
              setMode('citizen')
              navigate('/')
            }}
          >
            Back to Welcome
          </Button>

          <Button
            size="compact"
            variant="secondary"
            onClick={() => alert('Add Family is a local prototype action configured for Phase 11.')}
          >
            Add new family (Planned)
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
