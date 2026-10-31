import { useNavigate, useParams } from 'react-router-dom'
import {
  UsersThree,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  WarningCircle,
  ArrowSquareOut,
} from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { DotRow } from '../../components/domain/DotRow'
import { useJourney } from '../../app/journey-context'
import { useTranslation, t } from '../../i18n'
import { SAMPLE_FAMILIES, type SampleHelperFamily } from '../../data/helperFamilies'
import { SCHEMES_DATASET } from '../../data/schemes'
import { formatDate } from '../../lib/formatters'

const HELPER_STORAGE_KEY = 'scheme_sahayak_helper_families'

function getFamilyRecord(id: string | undefined): SampleHelperFamily | undefined {
  if (!id) return undefined
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(HELPER_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as SampleHelperFamily[]
        const found = parsed.find((f) => f.id === id)
        if (found) return found
      }
    } catch {
      // Fall back to sample list
    }
  }
  return SAMPLE_FAMILIES.find((f) => f.id === id)
}

export function FamilyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { language, loadSamplePersona, setSelectedSchemeId } = useJourney()
  const { t: tr } = useTranslation()

  const familyRecord = getFamilyRecord(id)

  const familyName = familyRecord
    ? familyRecord.familyName[language] ?? familyRecord.familyName.en
    : `Household (${id})`
  const schemeName = familyRecord
    ? familyRecord.primarySchemeName[language] ?? familyRecord.primarySchemeName.en
    : 'Primary Scheme'
  const district = familyRecord?.district ?? 'Gujarat'
  const membersCount = familyRecord?.membersCount ?? 4
  const missingDocsCount = familyRecord?.missingDocsCount ?? 2
  const lastAssistedAt = familyRecord?.lastAssistedAt ?? '2026-10-31'
  const headOfHousehold = familyRecord?.headOfHousehold ?? 'Head of Household'

  // Retrieve scheme info
  const schemeObj = (SCHEMES_DATASET || []).find((s) => s.id === familyRecord?.primarySchemeId)
  const schemeDocuments = schemeObj?.requiredDocuments ?? []
  const totalDocs = schemeDocuments.length || 4
  const readyDocs = Math.max(0, totalDocs - missingDocsCount)

  // Derive missing documents from scheme requirements
  const missingDocItems = schemeDocuments.slice(readyDocs)

  const handleReviewSchemes = () => {
    if (familyRecord?.id === 'fam-patel') {
      loadSamplePersona('farmer')
    } else if (familyRecord?.id === 'fam-shah' || familyRecord?.id === 'fam-vankar') {
      loadSamplePersona('senior')
    } else {
      loadSamplePersona('farmer')
    }
    if (familyRecord?.primarySchemeId) {
      setSelectedSchemeId(familyRecord.primarySchemeId)
    }
    navigate('/results')
  }

  return (
    <AppShell singleColumn={false}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => navigate('/helper')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink-2 hover:text-neel cursor-pointer min-h-[48px]"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
            <span>{tr.helper.backToHelper}</span>
          </button>
          <div className="inline-flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
              Route: /helper/families/{id}
            </span>
            <span className="px-2.5 py-1 rounded-[10px] bg-haldi-soft text-haldi-ink text-xs font-bold">
              {tr.helper.sampleDataBadge}
            </span>
          </div>
        </nav>

        {/* Family Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-[10px] bg-neel text-paper flex items-center justify-center shrink-0">
              <UsersThree className="size-6" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neel tracking-tight">
              {familyName}
            </h1>
          </div>
          <p className="text-sm sm:text-base text-ink-2">
            {tr.helper.familyDetailSubtitle}
          </p>
        </header>

        {/* Household Metadata Ledger Panel */}
        <section aria-labelledby="household-meta-heading" className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
          <h2 id="household-meta-heading" className="text-xs font-bold uppercase tracking-wider text-ink-2">
            Household Profile Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-[10px] bg-salt border border-line/60">
              <span className="text-xs text-ink-2 block">Head of household</span>
              <span className="font-bold text-neel">{headOfHousehold}</span>
            </div>
            <div className="p-3 rounded-[10px] bg-salt border border-line/60">
              <span className="text-xs text-ink-2 block">District</span>
              <span className="font-bold text-neel">{district}, Gujarat</span>
            </div>
            <div className="p-3 rounded-[10px] bg-salt border border-line/60">
              <span className="text-xs text-ink-2 block">Household members</span>
              <span className="font-bold text-neel">{membersCount} individuals</span>
            </div>
            <div className="p-3 rounded-[10px] bg-salt border border-line/60">
              <span className="text-xs text-ink-2 block">Last assisted date</span>
              <span className="font-bold text-neel">
                {t('helper.lastAssistedLabel', { date: formatDate(lastAssistedAt, language) }, language)}
              </span>
            </div>
          </div>

          {/* Informed Consent Confirmation Pill */}
          <div className="flex items-center gap-2 p-3 rounded-[10px] bg-mor-soft/60 border border-mor/30 text-xs font-medium text-neel">
            <ShieldCheck className="size-4 text-mor shrink-0" weight="fill" aria-hidden="true" />
            <span>Beneficiary verbal consent confirmed on record for this demonstration session.</span>
          </div>
        </section>

        {/* Primary Scheme & Readiness Section */}
        <section aria-labelledby="scheme-readiness-heading" className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ink-2 block">
                Primary Matched Scheme
              </span>
              <h2 id="scheme-readiness-heading" className="text-lg sm:text-xl font-bold text-neel mt-0.5">
                {schemeName}
              </h2>
              {schemeObj?.department && (
                <span className="text-xs text-ink-2 block mt-0.5">
                  {schemeObj.department[language] ?? schemeObj.department.en}
                </span>
              )}
            </div>

            {missingDocsCount > 0 ? (
              <span className="px-2.5 py-1 rounded-[10px] bg-madder-soft text-madder text-xs font-bold">
                {t('helper.missingDocsBadge', { count: missingDocsCount }, language)}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-[10px] bg-mor-soft text-mor text-xs font-bold">
                {tr.helper.allDocsReadyBadge}
              </span>
            )}
          </div>

          {/* Readiness DotRow */}
          <div className="p-3.5 rounded-[10px] bg-salt border border-line space-y-2">
            <span className="text-xs font-semibold text-neel block">
              Document Readiness Overview
            </span>
            <DotRow
              type="document"
              passedCount={readyDocs}
              failedCount={missingDocsCount}
              totalCount={totalDocs}
              language={language}
            />
          </div>

          {/* Missing Documents Breakdown & Where to get them */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-neel">
              {tr.helper.whereToGetMissingDocs}
            </h3>

            {missingDocsCount === 0 ? (
              <div className="p-3.5 rounded-[10px] bg-mor-soft/40 border border-mor/20 text-xs font-medium text-neel flex items-center gap-2">
                <CheckCircle className="size-4 text-mor shrink-0" weight="fill" aria-hidden="true" />
                <span>{tr.helper.noMissingDocs}</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {missingDocItems.map((doc, idx) => {
                  const docTitle = doc.documentTypeId
                    .split('-')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')
                  const whereToGetText = doc.whereToGet
                    ? (doc.whereToGet[language] ?? doc.whereToGet.en)
                    : tr.checklist.askIssuingOffice
                  const issuingAuthority = doc.issuingAuthority
                    ? (doc.issuingAuthority[language] ?? doc.issuingAuthority.en)
                    : 'Designated Government Authority'

                  return (
                    <div
                      key={doc.documentTypeId || idx}
                      className="p-3.5 rounded-[10px] bg-salt border border-line space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <WarningCircle className="size-4 text-madder shrink-0" weight="fill" aria-hidden="true" />
                        <span className="text-sm font-bold text-neel">{docTitle}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-madder-soft text-madder">
                          Missing
                        </span>
                      </div>
                      <p className="text-xs text-ink-2 pl-6">
                        <strong className="text-neel">Where to obtain:</strong> {whereToGetText}
                      </p>
                      <p className="text-xs text-ink-2 pl-6">
                        <strong className="text-neel">Issuing office:</strong> {issuingAuthority}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Primary CTA and Actions */}
        <div className="flex items-center justify-between pt-4 pb-8 flex-wrap gap-3">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft aria-hidden="true" />}
            onClick={() => navigate('/helper')}
          >
            {tr.helper.backToHelper}
          </Button>

          <Button
            size="compact"
            variant="primary"
            icon={<ArrowSquareOut aria-hidden="true" />}
            onClick={handleReviewSchemes}
          >
            {tr.helper.reviewFamilySchemesBtn}
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
