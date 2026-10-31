import { useState, useMemo, type FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  CheckCircle,
  CircleHalf,
  MinusCircle,
  PencilSimple,
  Flag,
  FileText,
  ListNumbers,
  X,
  Check,
} from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/domain/StatusBadge'
import { DotRow } from '../../components/domain/DotRow'
import { DocumentRow } from '../../components/domain/DocumentRow'
import { StateRecoveryCard } from '../../components/layout/StateRecoveryCard'
import { useJourney } from '../../app/journey-context'
import { SCHEMES_DATASET } from '../../data/schemes'
import { buildSubject } from '../../domain/subject'
import { evaluateScheme } from '../../domain/eligibility/evaluator'
import { explainEvaluation } from '../../domain/eligibility/explanation'
import { formatVerificationDate } from '../../components/domain/scheme-row-utils'
import type { RuleEvaluation, SchemeRule } from '../../domain/scheme.types'
import type { Language, RuleField, LocalisedText } from '../../domain/profile.types'
import { t } from '../../i18n'

function formatActualValue(
  value: unknown,
  field: RuleField,
  language: Language = 'en'
): string {
  if (value === null || value === undefined || value === '' || value === 'unknown') {
    return language === 'gu' ? 'માહિતી આપેલ નથી' : language === 'hi' ? 'जानकारी नहीं दी गई' : 'Not provided'
  }

  if (field === 'annualHouseholdIncome') {
    switch (value) {
      case 'under_1l':
        return language === 'gu' ? '₹૧ લાખથી ઓછી' : language === 'hi' ? '₹1 लाख से कम' : 'Under ₹1 Lakh'
      case '1l_2_5l':
        return language === 'gu' ? '₹૧ થી ₹૨.૫ લાખ' : language === 'hi' ? '₹1 से ₹2.5 लाख' : '₹1 Lakh – ₹2.5 Lakh'
      case '2_5l_5l':
        return language === 'gu' ? '₹૨.૫ થી ₹૫ લાખ' : language === 'hi' ? '₹2.5 से ₹5 लाख' : '₹2.5 Lakh – ₹5 Lakh'
      case 'above_5l':
        return language === 'gu' ? '₹૫ લાખથી વધુ' : language === 'hi' ? '₹5 लाख से अधिक' : 'Above ₹5 Lakh'
    }
  }

  if (field === 'rationCardType') {
    switch (value) {
      case 'aay':
        return 'Antyodaya (AAY)'
      case 'bpl':
        return 'BPL'
      case 'apl':
        return 'APL'
      case 'none':
        return language === 'gu' ? 'કોઈ નહીં' : language === 'hi' ? 'कोई नहीं' : 'None'
    }
  }

  if (field === 'residenceState') {
    return String(value)
  }

  if (typeof value === 'boolean') {
    return value
      ? language === 'gu' ? 'હા' : language === 'hi' ? 'हाँ' : 'Yes'
      : language === 'gu' ? 'ના' : language === 'hi' ? 'नहीं' : 'No'
  }

  return String(value)
}

export const SchemeDetailPage: FC = () => {
  const { schemeId } = useParams<{ schemeId: string }>()
  const navigate = useNavigate()
  const {
    currentProfile,
    activeSubjectId,
    documentConfirmations,
    setSelectedSchemeId,
    language,
  } = useJourney()

  const [isReportOpen, setIsReportOpen] = useState(false)
  const [reportNote, setReportNote] = useState('')
  const [reportSubmitted, setReportSubmitted] = useState(false)

  // Retrieve matching scheme
  const scheme = useMemo(
    () => SCHEMES_DATASET.find((s) => s.id === schemeId),
    [schemeId]
  )

  // Build subject and evaluate scheme deterministically
  const subject = useMemo(() => {
    if (!currentProfile) return null
    try {
      return buildSubject(currentProfile, activeSubjectId)
    } catch {
      return buildSubject(currentProfile)
    }
  }, [currentProfile, activeSubjectId])

  const primarySubject = useMemo(() => {
    if (!currentProfile) return null
    return buildSubject(currentProfile)
  }, [currentProfile])

  const now = useMemo(() => new Date(), [])

  const evaluation = useMemo(() => {
    if (!scheme || !subject) return null
    const evalSubject =
      scheme.beneficiaryScope === 'household' ? primarySubject ?? subject : subject
    return evaluateScheme(scheme, evalSubject, now)
  }, [scheme, subject, primarySubject, now])

  const getLocText = (locText?: LocalisedText | null): string => {
    if (!locText) return ''
    return locText[language] ?? locText.en ?? ''
  }

  // Deep-link recovery guard
  if (!currentProfile) {
    return (
      <AppShell singleColumn>
        <StateRecoveryCard
          requiredFor={`scheme detail (${schemeId})`}
          recoveryPath="/results"
          recoveryLabel={t('results.goToProfileBtn', undefined, language)}
        />
      </AppShell>
    )
  }

  if (!scheme || !evaluation) {
    return (
      <AppShell singleColumn>
        <div className="p-8 bg-paper border border-line rounded-[14px] text-center space-y-4">
          <h2 className="text-lg font-bold text-neel">Scheme not found</h2>
          <p className="text-sm text-ink-2">
            The requested scheme ID "{schemeId}" is not available in the verified dataset.
          </p>
          <Button variant="primary" onClick={() => navigate('/results')}>
            {t('schemeDetail.backToResults', undefined, language)}
          </Button>
        </div>
      </AppShell>
    )
  }

  // Criteria groupings
  const metChecks: { check: RuleEvaluation; rule: SchemeRule }[] = []
  const confirmChecks: { check: RuleEvaluation; rule: SchemeRule }[] = []
  const unmetChecks: { check: RuleEvaluation; rule: SchemeRule }[] = []

  for (const check of evaluation.checks) {
    const rule = scheme.rules.find((r) => r.id === check.ruleId)
    if (!rule) continue
    if (check.result === 'pass') {
      metChecks.push({ check, rule })
    } else if (check.result === 'unknown') {
      confirmChecks.push({ check, rule })
    } else {
      unmetChecks.push({ check, rule })
    }
  }

  const handleSeeChecklist = () => {
    setSelectedSchemeId(scheme.id)
    navigate(`/checklist/${scheme.id}`)
  }

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const existing = JSON.parse(localStorage.getItem('scheme_sahayak_feedback') || '[]')
      existing.push({ schemeId: scheme.id, note: reportNote, timestamp: new Date().toISOString() })
      localStorage.setItem('scheme_sahayak_feedback', JSON.stringify(existing))
    } catch {
      // local storage failure safe
    }
    setReportSubmitted(true)
    setTimeout(() => {
      setIsReportOpen(false)
      setReportSubmitted(false)
      setReportNote('')
    }, 1800)
  }

  const schemeName = getLocText(scheme.name)
  const departmentName = getLocText(scheme.department)
  const summaryText = getLocText(scheme.summary)
  const benefitText = getLocText(scheme.benefitDescription)
  const appSteps = scheme.applicationSteps[language] ?? scheme.applicationSteps.en ?? []

  return (
    <AppShell
      singleColumn
      bottomAction={
        <div className="flex flex-col gap-2">
          <Button
            fullWidth
            size="large"
            variant="primary"
            icon={<ArrowRight />}
            onClick={handleSeeChecklist}
          >
            {t('schemeDetail.seeChecklistBtn', undefined, language)}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 max-w-[680px] mx-auto pb-12">
        {/* Navigation & Route tag */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate('/results')}
          >
            {t('schemeDetail.backToResults', undefined, language)}
          </Button>

          <Button
            size="compact"
            variant="secondary"
            icon={<PencilSimple />}
            onClick={() => navigate('/profile')}
          >
            {t('results.editAnswersBtn', undefined, language)}
          </Button>
        </div>

        {/* Scheme Header Card */}
        <div className="bg-paper border border-line rounded-[14px] p-5 sm:p-6 space-y-4 shadow-none">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-neel tracking-tight">
                {schemeName}
              </h1>
              <StatusBadge status={evaluation.state} language={language} />
            </div>
            <p className="text-xs sm:text-sm text-ink-2">{departmentName}</p>
          </div>

          {/* DotRow with text count */}
          <div className="pt-1">
            <DotRow
              checks={evaluation.checks}
              type="condition"
              language={language}
              animate={false}
            />
          </div>

          <p className="text-sm text-ink-2 leading-relaxed">{summaryText}</p>

          {/* Benefit summary box */}
          {benefitText && (
            <div className="p-3.5 bg-neel-soft/40 border border-neel/20 rounded-[10px] space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-neel">
                {t('results.estimatedBenefit', undefined, language)}
              </div>
              <p className="text-sm font-semibold text-neel tabular-nums leading-snug">
                {benefitText}
              </p>
            </div>
          )}

          {/* Verification date or Demo note */}
          <div className="text-xs text-ink-2 pt-1 border-t border-line/60 flex items-center justify-between gap-2 flex-wrap">
            {scheme.lastVerifiedAt ? (
              <span>{formatVerificationDate(scheme.lastVerifiedAt, language)}</span>
            ) : (
              <span className="italic">{t('schemeDetail.officialVerificationNote', undefined, language)}</span>
            )}

            <button
              type="button"
              onClick={() => setIsReportOpen(true)}
              className="text-xs text-ink-2 hover:text-neel underline flex items-center gap-1 cursor-pointer"
            >
              <Flag className="size-3.5" />
              <span>{t('schemeDetail.reportOutdatedBtn', undefined, language)}</span>
            </button>
          </div>
        </div>

        {/* Evaluation Explanation Line */}
        <div className="p-4 bg-salt-2 border border-line rounded-[12px]">
          <p className="text-xs sm:text-sm text-neel font-medium leading-relaxed">
            {explainEvaluation(evaluation, scheme, language)}
          </p>
        </div>

        {/* CRITERIA BREAKDOWN IN 3 GROUPS (Phase 8B Requirement) */}
        <div className="bg-paper border border-line rounded-[14px] overflow-hidden shadow-none">
          <div className="p-4 sm:p-5 border-b border-line bg-salt/60">
            <h2 className="text-base font-bold text-neel">
              {t('schemeDetail.criteriaSummaryTitle', undefined, language)}
            </h2>
          </div>

          <div className="divide-y divide-line">
            {/* 1. What Matches */}
            {metChecks.length > 0 && (
              <div className="p-4 sm:p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-mor flex items-center gap-1.5">
                  <CheckCircle weight="fill" className="size-4" />
                  <span>{t('results.criteriaMatchesHeading', undefined, language)} ({metChecks.length})</span>
                </h3>
                <div className="space-y-2.5">
                  {metChecks.map(({ check, rule }) => (
                    <div
                      key={check.ruleId}
                      className="p-3 bg-mor-soft/25 border border-mor/20 rounded-[8px] space-y-1 text-xs"
                    >
                      <div className="font-semibold text-neel flex justify-between gap-2">
                        <span>{getLocText(rule.label)}</span>
                        <span className="text-mor font-bold uppercase text-[10px]">Match</span>
                      </div>
                      <div className="text-ink-2">
                        <span className="font-medium text-neel">{t('schemeDetail.yourValueLabel', undefined, language)}:</span>{' '}
                        {formatActualValue(check.actualValue, check.field, language)}
                      </div>
                      {rule.explanation && (
                        <p className="text-ink-2 italic pt-0.5">{getLocText(rule.explanation)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. We need to confirm */}
            {confirmChecks.length > 0 && (
              <div className="p-4 sm:p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-haldi-ink flex items-center gap-1.5">
                  <CircleHalf weight="fill" className="size-4 text-haldi" />
                  <span>{t('results.criteriaConfirmHeading', undefined, language)} ({confirmChecks.length})</span>
                </h3>
                <div className="space-y-2.5">
                  {confirmChecks.map(({ check, rule }) => (
                    <div
                      key={check.ruleId}
                      className="p-3 bg-haldi-soft/30 border border-haldi/30 rounded-[8px] space-y-1 text-xs"
                    >
                      <div className="font-semibold text-neel flex justify-between gap-2">
                        <span>{getLocText(rule.label)}</span>
                        <span className="text-haldi-ink font-bold uppercase text-[10px]">To Confirm</span>
                      </div>
                      <div className="text-ink-2">
                        <span className="font-medium text-neel">{t('schemeDetail.yourValueLabel', undefined, language)}:</span>{' '}
                        {formatActualValue(check.actualValue, check.field, language)}
                      </div>
                      {check.reasonCode === 'straddles_band' && (
                        <p className="text-haldi-ink font-medium pt-0.5">
                          {t('engine.straddlesBand', { limit: String(check.expectedValue ?? '') }, language)}
                        </p>
                      )}
                      {rule.explanation && (
                        <p className="text-ink-2 italic pt-0.5">{getLocText(rule.explanation)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. What does not match */}
            {unmetChecks.length > 0 && (
              <div className="p-4 sm:p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-madder flex items-center gap-1.5">
                  <MinusCircle weight="fill" className="size-4" />
                  <span>{t('results.criteriaFailsHeading', undefined, language)} ({unmetChecks.length})</span>
                </h3>
                <div className="space-y-2.5">
                  {unmetChecks.map(({ check, rule }) => (
                    <div
                      key={check.ruleId}
                      className="p-3 bg-madder-soft/25 border border-madder/20 rounded-[8px] space-y-1 text-xs"
                    >
                      <div className="font-semibold text-neel flex justify-between gap-2">
                        <span>{getLocText(rule.label)}</span>
                        <span className="text-madder font-bold uppercase text-[10px]">Unmet</span>
                      </div>
                      <div className="text-ink-2">
                        <span className="font-medium text-neel">{t('schemeDetail.yourValueLabel', undefined, language)}:</span>{' '}
                        {formatActualValue(check.actualValue, check.field, language)}
                      </div>
                      {rule.explanation && (
                        <p className="text-ink-2 italic pt-0.5">{getLocText(rule.explanation)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* REQUIRED DOCUMENTS WITH HAVE/MISSING READINESS (Phase 8B Requirement) */}
        {scheme.requiredDocuments && scheme.requiredDocuments.length > 0 && (
          <div className="bg-paper border border-line rounded-[14px] overflow-hidden shadow-none">
            <div className="p-4 sm:p-5 border-b border-line bg-salt/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-neel" />
                <h2 className="text-base font-bold text-neel">
                  {t('results.requiredDocuments', undefined, language)}
                </h2>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-salt-2 text-ink-2">
                {scheme.requiredDocuments.length} total
              </span>
            </div>

            <div className="divide-y divide-line">
              {scheme.requiredDocuments.map((req) => (
                <DocumentRow
                  key={req.documentTypeId}
                  requirement={req}
                  isReady={!!documentConfirmations[req.documentTypeId]}
                  isFromSample={documentConfirmations[req.documentTypeId] === true}
                  language={language}
                />
              ))}
            </div>
          </div>
        )}

        {/* OFFICIAL APPLICATION STEPS */}
        {appSteps.length > 0 && (
          <div className="bg-paper border border-line rounded-[14px] p-5 sm:p-6 space-y-3 shadow-none">
            <div className="flex items-center gap-2">
              <ListNumbers className="size-5 text-neel" />
              <h2 className="text-base font-bold text-neel">
                {t('schemeDetail.applicationStepsTitle', undefined, language)}
              </h2>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-ink-2 leading-relaxed pl-1">
              {appSteps.map((step, idx) => (
                <li key={idx} className="pl-1">
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* OFFICIAL PORTAL LINK & DISCLAIMER */}
        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-4 text-center shadow-none">
          {(scheme.applicationUrl || scheme.sourceUrl) && (
            <a
              href={scheme.applicationUrl || scheme.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[10px] bg-neel text-paper font-semibold text-sm hover:bg-neel-700 transition-colors cursor-pointer"
            >
              <span>{t('schemeDetail.openPortalBtn', undefined, language)}</span>
              <ArrowSquareOut className="size-4" />
            </a>
          )}

          <p className="text-xs text-ink-2 leading-relaxed max-w-md mx-auto">
            {t('common.guidanceDisclaimer', undefined, language)}
          </p>
        </div>
      </div>

      {/* REPORT OUTDATED INFORMATION MODAL SHEET */}
      {isReportOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neel/40 backdrop-blur-[2px]"
        >
          <div className="bg-paper border border-line rounded-[16px] w-full max-w-lg p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h3 id="report-modal-title" className="text-base font-bold text-neel">
                {t('schemeDetail.reportSheetTitle', undefined, language)}
              </h3>
              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                aria-label="Close dialog"
                className="p-1 rounded text-ink-2 hover:text-neel hover:bg-salt cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-xs text-ink-2 leading-relaxed">
              {t('schemeDetail.reportSheetDesc', undefined, language)}
            </p>

            {reportSubmitted ? (
              <div className="p-4 rounded-[10px] bg-mor-soft text-mor font-semibold text-sm flex items-center gap-2">
                <Check className="size-5" />
                <span>{t('schemeDetail.reportSuccessMsg', undefined, language)}</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <textarea
                  required
                  rows={4}
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder={t('schemeDetail.reportNotePlaceholder', undefined, language)}
                  className="w-full p-3 rounded-[10px] border border-line bg-paper text-sm text-neel placeholder:text-ink-2 focus:outline-none focus:border-neel focus:ring-1 focus:ring-neel"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    size="compact"
                    variant="ghost"
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                  >
                    {t('common.close', undefined, language)}
                  </Button>
                  <Button size="compact" variant="primary" type="submit">
                    {t('schemeDetail.reportSubmitBtn', undefined, language)}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AppShell>
  )
}
