import { useState, useMemo, useEffect, useCallback, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  CheckCircle,
  CircleHalf,
  MinusCircle,
  FileText,
  SlidersHorizontal,
} from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/domain/StatusBadge'
import { DotRow } from '../../components/domain/DotRow'
import { SchemeRow } from '../../components/domain/SchemeRow'
import { SubjectSwitcher } from '../../components/domain/SubjectSwitcher'
import { EmptyState } from '../../components/ui/EmptyState'
import { StateRecoveryCard } from '../../components/layout/StateRecoveryCard'
import { useJourney } from '../../app/journey-context'
import { SCHEMES_DATASET } from '../../data/schemes'
import { buildSubject } from '../../domain/subject'
import { evaluateScheme, sortEvaluations } from '../../domain/eligibility/evaluator'
import { isSchemeTargetedToSubject } from '../../domain/eligibility/targeting'
import { explainEvaluation } from '../../domain/eligibility/explanation'
import type { SchemeRecord, RuleEvaluation } from '../../domain/scheme.types'
import type { LocalisedText } from '../../domain/profile.types'
import { t } from '../../i18n'
import { cn } from '../../lib/utils'

export type FilterType = 'all' | 'likely' | 'possible'

export const ResultsPage: FC = () => {
  const navigate = useNavigate()
  const {
    currentProfile,
    activeSubjectId,
    setActiveSubjectId,
    selectedSchemeId,
    setSelectedSchemeId,
    language,
  } = useJourney()

  // Track initial animation state so orchestrated dots animate once per results load
  const [hasAnimated, setHasAnimated] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Build EvaluationSubject based on activeSubjectId (Phase 8C Family Lens)
  const subject = useMemo(() => {
    if (!currentProfile) return null
    try {
      return buildSubject(currentProfile, activeSubjectId)
    } catch {
      return buildSubject(currentProfile)
    }
  }, [currentProfile, activeSubjectId])

  // Primary applicant for household-scoped schemes
  const primarySubject = useMemo(() => {
    if (!currentProfile) return null
    return buildSubject(currentProfile)
  }, [currentProfile])

  const now = useMemo(() => new Date(), [])

  // Persona targeting: student only sees student schemes, farmer only sees farmer schemes!
  const targetedSchemes = useMemo(() => {
    if (!subject) return SCHEMES_DATASET
    return SCHEMES_DATASET.filter((scheme) => isSchemeTargetedToSubject(scheme, subject))
  }, [subject])

  const rawEvaluations = useMemo(() => {
    if (!subject) return []
    return targetedSchemes.map((scheme) => {
      // Individual schemes evaluate per chosen member; household schemes evaluate for primary applicant
      const evalSubject =
        scheme.beneficiaryScope === 'household' ? primarySubject ?? subject : subject
      return evaluateScheme(scheme, evalSubject, now)
    })
  }, [targetedSchemes, subject, primarySubject, now])

  const sortedEvaluations = useMemo(() => {
    if (rawEvaluations.length === 0) return []
    return sortEvaluations(rawEvaluations, targetedSchemes, language)
  }, [rawEvaluations, targetedSchemes, language])

  // Map of scheme id to scheme record
  const schemesById = useMemo(() => {
    const map = new Map<string, SchemeRecord>()
    for (const scheme of SCHEMES_DATASET) {
      map.set(scheme.id, scheme)
    }
    return map
  }, [])

  // Filter state and derived counts
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const totalCount = sortedEvaluations.length
  const likelyCount = useMemo(
    () => sortedEvaluations.filter((e) => e.state === 'likely').length,
    [sortedEvaluations]
  )
  const possibleCount = useMemo(
    () => sortedEvaluations.filter((e) => e.state === 'possible').length,
    [sortedEvaluations]
  )

  const filteredEvaluations = useMemo(() => {
    if (activeFilter === 'likely') {
      return sortedEvaluations.filter((e) => e.state === 'likely')
    }
    if (activeFilter === 'possible') {
      return sortedEvaluations.filter((e) => e.state === 'possible')
    }
    // 'all' includes likely, possible, needs_verification, and not_matching
    return sortedEvaluations
  }, [sortedEvaluations, activeFilter])

  // Selection state for Master-Detail (Desktop >= 1024px)
  const [selectedId, setSelectedId] = useState<string>(() => {
    if (selectedSchemeId && schemesById.has(selectedSchemeId)) {
      return selectedSchemeId
    }
    return sortedEvaluations[0]?.schemeId ?? ''
  })

  // Ensure active selectedId is valid when filtered list changes
  const activeSelectedId = useMemo(() => {
    if (filteredEvaluations.some((e) => e.schemeId === selectedId)) {
      return selectedId
    }
    return filteredEvaluations[0]?.schemeId ?? ''
  }, [filteredEvaluations, selectedId])

  const selectedEvaluation = useMemo(
    () => sortedEvaluations.find((e) => e.schemeId === activeSelectedId),
    [sortedEvaluations, activeSelectedId]
  )
  const selectedScheme = useMemo(
    () => (activeSelectedId ? schemesById.get(activeSelectedId) : undefined),
    [schemesById, activeSelectedId]
  )

  // Localised text helper
  const getLocText = useCallback(
    (locText?: LocalisedText | null): string => {
      if (!locText) return ''
      return locText[language] ?? locText.en ?? ''
    },
    [language]
  )

  // Criteria groupings for desktop preview pane
  const criteriaGrouping = useMemo(() => {
    if (!selectedEvaluation || !selectedScheme) return null

    const met: { check: RuleEvaluation; label: string }[] = []
    const confirm: { check: RuleEvaluation; label: string }[] = []
    const unmet: { check: RuleEvaluation; label: string }[] = []

    for (const check of selectedEvaluation.checks) {
      const rule = selectedScheme.rules.find((r) => r.id === check.ruleId)
      const label = getLocText(rule?.label) || String(check.field)

      if (check.result === 'pass') {
        met.push({ check, label })
      } else if (check.result === 'unknown') {
        confirm.push({ check, label })
      } else {
        unmet.push({ check, label })
      }
    }

    return { met, confirm, unmet }
  }, [selectedEvaluation, selectedScheme, getLocText])

  // Deep-link recovery guard if no profile is present
  if (!currentProfile) {
    return (
      <AppShell singleColumn>
        <StateRecoveryCard
          requiredFor="scheme results"
          recoveryPath="/profile"
          recoveryLabel={t('results.goToProfileBtn', undefined, language)}
        />
      </AppShell>
    )
  }

  // Top/Primary matched scheme for mobile primary action
  const primarySchemeId = sortedEvaluations[0]?.schemeId ?? 'mysy'

  const handleSchemeClick = (schemeId: string) => {
    setSelectedSchemeId(schemeId)
    setSelectedId(schemeId)

    // Mobile viewport (< 1024px): tap opens scheme detail route directly
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      navigate(`/schemes/${schemeId}`)
    }
  }

  const handleOpenDetail = (schemeId: string) => {
    setSelectedSchemeId(schemeId)
    navigate(`/schemes/${schemeId}`)
  }

  return (
    <AppShell
      singleColumn={false}
      bottomAction={
        <div className="lg:hidden flex flex-col gap-2">
          <Button
            fullWidth
            size="large"
            variant="primary"
            icon={<ArrowRight />}
            onClick={() => handleOpenDetail(activeSelectedId || primarySchemeId)}
          >
            {t('results.primaryMatchedBtn', undefined, language)}
          </Button>
        </div>
      }
    >
      {/* Route Badge for development / audit test suite */}
      <div className="mb-4">
        <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
          Route: /results
        </div>
      </div>

      {/* Main Two-Pane Master-Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
        {/* LEFT COLUMN: Master List */}
        <div className="space-y-5 sm:space-y-6 min-w-0">
          {/* Header */}
          <header className="space-y-1.5 sm:space-y-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neel tracking-tight">
              {t('results.title', undefined, language)}
            </h1>
            <p className="text-xs sm:text-sm text-ink-2 leading-relaxed max-w-prose">
              {t('results.subtitle', undefined, language)}
            </p>
          </header>

          {/* Phase 8C: Family Lens Subject Switcher (if profile has family members) */}
          {currentProfile.familyMembers && currentProfile.familyMembers.length > 0 && (
            <div className="p-3 bg-paper border border-line rounded-[12px]">
              <SubjectSwitcher
                profile={currentProfile}
                activeSubjectId={activeSubjectId}
                onSelectSubject={setActiveSubjectId}
                language={language}
              />
            </div>
          )}

          {/* Filter Chips */}
          <div
            role="toolbar"
            aria-label="Filter schemes by eligibility status"
            className="flex items-center gap-2 flex-wrap"
          >
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              aria-pressed={activeFilter === 'all'}
              className={cn(
                'min-h-[44px] px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none',
                activeFilter === 'all'
                  ? 'bg-neel text-paper border border-neel shadow-none'
                  : 'bg-paper text-neel border border-line hover:bg-salt'
              )}
            >
              {t('results.filterAll', undefined, language)} ({totalCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('likely')}
              aria-pressed={activeFilter === 'likely'}
              className={cn(
                'min-h-[44px] px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none',
                activeFilter === 'likely'
                  ? 'bg-neel text-paper border border-neel shadow-none'
                  : 'bg-paper text-neel border border-line hover:bg-salt'
              )}
            >
              {t('results.filterLikely', undefined, language)} ({likelyCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('possible')}
              aria-pressed={activeFilter === 'possible'}
              className={cn(
                'min-h-[44px] px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none',
                activeFilter === 'possible'
                  ? 'bg-neel text-paper border border-neel shadow-none'
                  : 'bg-paper text-neel border border-line hover:bg-salt'
              )}
            >
              {t('results.filterPossibly', undefined, language)} ({possibleCount})
            </button>
          </div>

          {/* Result Count Live Region */}
          <div
            aria-live="polite"
            className="text-xs sm:text-sm font-medium text-ink-2 select-none"
          >
            {t(
              'results.resultsCount',
              { count: filteredEvaluations.length, total: totalCount },
              language
            )}
          </div>

          {/* Ledger List Container */}
          {filteredEvaluations.length === 0 ? (
            <EmptyState
              icon={<SlidersHorizontal className="size-10 text-ink-2" />}
              title={t('results.noSchemesFound', undefined, language)}
              description={t('results.noSchemesFoundDesc', undefined, language)}
              actionLabel={t('results.showAllBtn', undefined, language)}
              onAction={() => setActiveFilter('all')}
            />
          ) : (
            <div className="bg-paper border border-line rounded-[14px] divide-y divide-line overflow-hidden shadow-none">
              {filteredEvaluations.map((evaluation) => {
                const scheme = schemesById.get(evaluation.schemeId)
                if (!scheme) return null

                return (
                  <SchemeRow
                    key={evaluation.schemeId}
                    scheme={scheme}
                    evaluation={evaluation}
                    language={language}
                    selected={evaluation.schemeId === activeSelectedId}
                    onClick={() => handleSchemeClick(evaluation.schemeId)}
                    animateDots={!hasAnimated}
                  />
                )
              })}
            </div>
          )}

          {/* Edit Answers link to Profile */}
          <div className="pt-2">
            <Button
              size="compact"
              variant="ghost"
              icon={<ArrowLeft />}
              onClick={() => navigate('/profile')}
            >
              {t('results.editAnswersBtn', undefined, language)}
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN: Detail Pane Preview (Desktop >= 1024px) */}
        <div className="hidden lg:block sticky top-6 self-start">
          {selectedScheme && selectedEvaluation ? (
            <article
              aria-label={getLocText(selectedScheme.name)}
              className="bg-paper border border-line rounded-[14px] p-6 space-y-6 shadow-none"
            >
              {/* Header */}
              <div className="space-y-3 pb-4 border-b border-line">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-neel tracking-tight">
                      {getLocText(selectedScheme.name)}
                    </h2>
                    <p className="text-sm text-ink-2">
                      {getLocText(selectedScheme.department)}
                    </p>
                  </div>
                  <StatusBadge status={selectedEvaluation.state} language={language} />
                </div>

                {/* DotRow with text count */}
                <div className="pt-1">
                  <DotRow
                    checks={selectedEvaluation.checks}
                    type="condition"
                    language={language}
                    animate={false}
                  />
                </div>
              </div>

              {/* Summary and Plain-Language Explanation */}
              <div className="space-y-3">
                <p className="text-sm text-ink-2 leading-relaxed">
                  {getLocText(selectedScheme.summary)}
                </p>

                <div className="p-3.5 bg-salt rounded-[10px] border border-line/60">
                  <p className="text-sm text-neel font-medium leading-relaxed">
                    {explainEvaluation(selectedEvaluation, selectedScheme, language)}
                  </p>
                </div>

                {selectedScheme.benefitDescription && (
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-ink-2 uppercase tracking-wide">
                      {t('results.estimatedBenefit', undefined, language)}
                    </div>
                    <p className="text-sm font-semibold text-neel tabular-nums">
                      {getLocText(selectedScheme.benefitDescription)}
                    </p>
                  </div>
                )}
              </div>

              {/* Criteria Groups */}
              {criteriaGrouping && (
                <div className="space-y-4 pt-2 border-t border-line">
                  {/* Matches */}
                  {criteriaGrouping.met.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-mor flex items-center gap-1.5">
                        <CheckCircle weight="fill" className="size-4" />
                        <span>{t('results.criteriaMatchesHeading', undefined, language)}</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs text-neel">
                        {criteriaGrouping.met.map((item) => (
                          <li
                            key={item.check.ruleId}
                            className="flex items-start gap-2 bg-mor-soft/30 px-2.5 py-1.5 rounded-[6px]"
                          >
                            <span className="font-medium">{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* To Confirm */}
                  {criteriaGrouping.confirm.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-haldi-ink flex items-center gap-1.5">
                        <CircleHalf weight="fill" className="size-4 text-haldi" />
                        <span>{t('results.criteriaConfirmHeading', undefined, language)}</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs text-neel">
                        {criteriaGrouping.confirm.map((item) => (
                          <li
                            key={item.check.ruleId}
                            className="flex items-start gap-2 bg-haldi-soft/40 px-2.5 py-1.5 rounded-[6px]"
                          >
                            <span className="font-medium">{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Does Not Match */}
                  {criteriaGrouping.unmet.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-madder flex items-center gap-1.5">
                        <MinusCircle weight="fill" className="size-4" />
                        <span>{t('results.criteriaFailsHeading', undefined, language)}</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs text-neel">
                        {criteriaGrouping.unmet.map((item) => (
                          <li
                            key={item.check.ruleId}
                            className="flex items-start gap-2 bg-madder-soft/30 px-2.5 py-1.5 rounded-[6px]"
                          >
                            <span className="font-medium">{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Required Documents Summary */}
              {selectedScheme.requiredDocuments && selectedScheme.requiredDocuments.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-line">
                  <div className="text-xs font-bold uppercase tracking-wider text-ink-2 flex items-center gap-1.5">
                    <FileText weight="regular" className="size-4" />
                    <span>{t('results.requiredDocuments', undefined, language)}</span>
                  </div>
                  <p className="text-xs text-ink-2">
                    {selectedScheme.requiredDocuments.length} certificates and documents required for official application.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-line">
                <Button
                  fullWidth
                  size="default"
                  variant="primary"
                  icon={<ArrowRight />}
                  onClick={() => handleOpenDetail(selectedScheme.id)}
                >
                  {t('results.viewDetailBtn', undefined, language)}
                </Button>

                {(selectedScheme.applicationUrl || selectedScheme.sourceUrl) && (
                  <a
                    href={selectedScheme.applicationUrl || selectedScheme.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full text-xs font-semibold text-neel hover:text-neel-700 py-2 underline"
                  >
                    <span>{t('results.officialSource', undefined, language)}</span>
                    <ArrowSquareOut className="size-4" />
                  </a>
                )}

                {/* Disclaimer line */}
                <p className="text-xs text-ink-2 text-center pt-1 select-none">
                  {t('common.guidanceDisclaimer', undefined, language)}
                </p>
              </div>
            </article>
          ) : (
            <div className="bg-salt-2 border border-line rounded-[14px] p-8 text-center text-sm text-ink-2">
              {t('results.selectSchemePrompt', undefined, language)}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
