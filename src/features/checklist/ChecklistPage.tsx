import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowSquareOut,
  CheckCircle,
  WarningCircle,
  Printer,
  CaretDown,
  CaretUp,
  FileText,
  Scan,
} from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { StateRecoveryCard } from '../../components/layout/StateRecoveryCard'
import { DotRow } from '../../components/domain/DotRow'
import { useJourney } from '../../app/journey-context'
import { SCHEMES_DATASET } from '../../data/schemes'
import { buildSubject } from '../../domain/subject'
import { buildChecklist, type ChecklistItem } from '../../domain/readiness/checklist'
import { t } from '../../i18n'
import { cn } from '../../lib/utils'

export function ChecklistPage() {
  const { schemeId } = useParams<{ schemeId: string }>()
  const navigate = useNavigate()
  const journey = useJourney()
  const { currentProfile, activeSubjectId, documentConfirmations } = journey
  const language = journey.language

  // State to track expanded "Where to get it" accordions
  const [expandedDocs, setExpandedDocs] = useState<Record<string, boolean>>({})

  // Deep-link recovery guard
  if (!currentProfile) {
    return (
      <AppShell singleColumn>
        <StateRecoveryCard
          requiredFor={`readiness checklist (${schemeId ?? 'demo'})`}
          recoveryPath="/results"
          recoveryLabel={t('recovery.defaultLabel', undefined, language)}
        />
      </AppShell>
    )
  }

  // Find target scheme
  const scheme = SCHEMES_DATASET.find((s) => s.id === schemeId) ?? SCHEMES_DATASET[0]

  // Resolve active subject
  const subject = buildSubject(currentProfile, activeSubjectId)

  // Construct pure checklist
  const checklist = buildChecklist(scheme, subject, documentConfirmations, language)

  const toggleExpand = (docTypeId: string) => {
    setExpandedDocs((prev) => ({
      ...prev,
      [docTypeId]: !prev[docTypeId],
    }))
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const handleOpenPortal = () => {
    const targetUrl = checklist.applicationUrl || checklist.sourceUrl
    if (typeof window !== 'undefined' && targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const allReady = checklist.missingCount === 0

  return (
    <AppShell
      singleColumn
      bottomAction={
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="large"
            variant="secondary"
            icon={<Printer />}
            onClick={handlePrint}
            className="sm:w-auto"
          >
            {t('checklist.printChecklist', undefined, language)}
          </Button>

          <Button
            fullWidth
            size="large"
            variant="primary"
            icon={<ArrowSquareOut />}
            onClick={handleOpenPortal}
            className="flex-1"
          >
            {checklist.applicationUrl
              ? t('checklist.openOfficialPortal', undefined, language)
              : t('checklist.openSchemeInfo', undefined, language)}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 max-w-[680px] mx-auto pb-12">
        {/* Navigation & Print Trigger */}
        <div className="flex items-center justify-between gap-3 flex-wrap no-print">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate(schemeId ? `/schemes/${schemeId}` : '/results')}
          >
            {t('checklist.backToDetail', undefined, language)}
          </Button>

          <Button
            size="compact"
            variant="secondary"
            icon={<Printer />}
            onClick={handlePrint}
          >
            {t('checklist.printChecklist', undefined, language)}
          </Button>
        </div>

        {/* Screen Header */}
        <header className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-neel tracking-tight">
            {t('checklist.title', undefined, language)}: {checklist.schemeName}
          </h1>
          <p className="text-xs sm:text-sm text-ink-2">
            {t('checklist.subtitle', undefined, language)}
          </p>
        </header>

        {/* PRINT ONLY HEADER METADATA (Visible only in window.print) */}
        <div className="hidden print-only p-4 border border-line rounded mb-4 space-y-1 text-xs">
          <div className="font-bold text-sm text-neel">SchemeSahayak — Preparation Checklist</div>
          <div>Scheme: <span className="font-semibold">{checklist.schemeName}</span></div>
          <div>Department: <span>{checklist.departmentName}</span></div>
          <div>{t('checklist.printedFor', undefined, language)}: <span className="font-semibold">{checklist.subjectName}</span></div>
          <div>{t('checklist.printGeneratedOn', undefined, language)}: <span>{new Date().toLocaleDateString()}</span></div>
        </div>

        {/* 1. ONE DARK READINESS SUMMARY PANEL ONLY (AGENT.md Section 389) */}
        <div className="bg-neel text-paper rounded-[16px] p-5 sm:p-6 space-y-4 shadow-none">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-haldi uppercase tracking-wider">
              {t('checklist.summaryTitle', undefined, language)}
            </span>
            <span className="text-xs font-semibold text-neel-soft">
              {checklist.subjectName}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-paper tracking-tight">
              {checklist.readyCount} of {checklist.totalCount} documents ready
              {checklist.missingCount > 0 ? `, ${checklist.missingCount} missing` : ''}
            </h2>

            {/* DotRow component for document readiness dots */}
            <div className="pt-1">
              <DotRow
                passedCount={checklist.readyCount}
                unknownCount={0}
                failedCount={checklist.missingCount}
                totalCount={checklist.totalCount}
                type="document"
                language={language}
                animate={false}
              />
            </div>

            <p className="text-xs sm:text-sm text-neel-soft/90 leading-relaxed pt-1">
              {allReady
                ? t('checklist.allReady', undefined, language)
                : t('checklist.almostReady', undefined, language)}
            </p>
          </div>
        </div>

        {/* 2. READY DOCUMENTS GROUP */}
        {checklist.readyItems.length > 0 && (
          <div className="bg-paper border border-line rounded-[14px] overflow-hidden shadow-none">
            <div className="p-4 sm:p-5 border-b border-line bg-mor-soft/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle weight="fill" className="size-5 text-mor shrink-0" />
                <h3 className="text-sm font-bold text-neel">
                  {t('checklist.readyCount', undefined, language)} ({checklist.readyCount})
                </h3>
              </div>
              <span className="text-xs font-bold text-mor uppercase tracking-wider">Ready</span>
            </div>

            <div className="divide-y divide-line">
              {checklist.readyItems.map((item) => (
                <div key={item.documentTypeId} className="p-4 sm:p-5 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm sm:text-base text-neel">
                        {item.name}
                      </span>
                      {item.isFromSample && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-mor-soft text-mor">
                          <CheckCircle weight="fill" className="size-3" />
                          <span>{t('checklist.readFromSample', undefined, language)}</span>
                        </span>
                      )}
                    </div>
                    {item.issuingAuthority && (
                      <p className="text-xs text-ink-2">
                        {item.issuingAuthority}
                      </p>
                    )}
                  </div>
                  <span className="text-mor font-bold text-xs uppercase shrink-0 pt-0.5">
                    ✓ Ready
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. MISSING DOCUMENTS GROUP */}
        {checklist.missingItems.length > 0 && (
          <div className="bg-paper border border-line rounded-[14px] overflow-hidden shadow-none">
            <div className="p-4 sm:p-5 border-b border-line bg-madder-soft/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WarningCircle weight="fill" className="size-5 text-madder shrink-0" />
                <h3 className="text-sm font-bold text-neel">
                  {t('checklist.missingCount', undefined, language)} ({checklist.missingCount})
                </h3>
              </div>
              <span className="text-xs font-bold text-madder uppercase tracking-wider">Missing</span>
            </div>

            <div className="divide-y divide-line">
              {checklist.missingItems.map((item: ChecklistItem) => {
                const isExpanded = Boolean(expandedDocs[item.documentTypeId])
                return (
                  <div key={item.documentTypeId} className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="font-bold text-sm sm:text-base text-neel block">
                          {item.name}
                        </span>
                        {item.issuingAuthority && (
                          <p className="text-xs text-ink-2">
                            {item.issuingAuthority}
                          </p>
                        )}
                      </div>
                      <span className="text-madder font-bold text-xs uppercase shrink-0 pt-0.5">
                        Missing
                      </span>
                    </div>

                    {/* Expandable "Where to get it" Section */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.documentTypeId)}
                        className="text-xs font-semibold text-neel hover:text-neel-700 inline-flex items-center gap-1 cursor-pointer select-none no-print"
                        aria-expanded={isExpanded}
                      >
                        <span>{t('checklist.whereToGet', undefined, language)}</span>
                        {isExpanded ? <CaretUp className="size-3.5" /> : <CaretDown className="size-3.5" />}
                      </button>

                      {/* Content (Visible if expanded or always in print) */}
                      <div
                        className={cn(
                          'mt-2.5 p-3 rounded-[8px] bg-salt-2 border border-line text-xs text-neel space-y-1.5',
                          !isExpanded && 'hidden print:block'
                        )}
                      >
                        <span className="font-semibold text-ink-2 block">
                          Instructions / ક્યાંથી મેળવવું:
                        </span>
                        <ul className="list-disc list-inside space-y-1 pl-1 text-ink-2">
                          {item.whereToGet.map((step, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Quick action: If document is Income Certificate, offer sample scan */}
                    {item.documentTypeId === 'income_certificate' && (
                      <div className="pt-1 no-print">
                        <Button
                          size="compact"
                          variant="secondary"
                          icon={<Scan />}
                          onClick={() => navigate(`/documents/${scheme.id}`)}
                        >
                          {t('checklist.scanSampleAction', undefined, language)}
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 4. OFFICIAL SOURCE LINK & VERIFICATION NOTE */}
        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-3 shadow-none">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-neel shrink-0" />
            <h3 className="text-sm font-bold text-neel">
              Official Portal & Source Verification
            </h3>
          </div>

          <div className="text-xs text-ink-2 space-y-1.5">
            <div>
              Department:{' '}
              <span className="font-semibold text-neel">{checklist.departmentName}</span>
            </div>
            <div>
              Official Portal:{' '}
              <a
                href={checklist.applicationUrl || checklist.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-neel font-semibold underline break-all inline-flex items-center gap-1"
              >
                <span>{checklist.applicationUrl || checklist.sourceUrl}</span>
                <ArrowSquareOut className="size-3.5" />
              </a>
            </div>
            {checklist.lastVerifiedAt && (
              <div className="text-[11px] text-ink-2/80 italic pt-1">
                Official source checked on {checklist.lastVerifiedAt}. Human sign-off pending.
              </div>
            )}
          </div>
        </div>

        {/* 5. MANDATORY GUIDANCE DISCLAIMER */}
        <div className="text-center pt-2 pb-4 space-y-2">
          <p className="text-xs text-ink-2 leading-relaxed max-w-lg mx-auto">
            {t('checklist.printDisclaimer', undefined, language)}
          </p>
          <p className="text-[11px] text-ink-2/80 italic">
            This readiness checklist is for citizen personal planning only. No application has been submitted.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
