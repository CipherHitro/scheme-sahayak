import type { FC } from 'react'
import { Flask, Hourglass } from '@phosphor-icons/react'
import type { SchemeRecord, SchemeEvaluation } from '../../domain/scheme.types'
import type { Language } from '../../domain/profile.types'
import { StatusBadge } from './StatusBadge'
import { DotRow } from './DotRow'
import { explainEvaluation } from '../../domain/eligibility/explanation'
import { formatVerificationDate } from './scheme-row-utils'
import { cn } from '../../lib/utils'

export interface SchemeRowProps {
  scheme: SchemeRecord
  evaluation: SchemeEvaluation
  language?: Language
  selected?: boolean
  onClick?: () => void
  animateDots?: boolean
  className?: string
}

export const SchemeRow: FC<SchemeRowProps> = ({
  scheme,
  evaluation,
  language = 'en',
  selected = false,
  onClick,
  animateDots = false,
  className,
}) => {
  const schemeName = scheme.name[language] ?? scheme.name.en
  const departmentName = scheme.department[language] ?? scheme.department.en
  const explanation = explainEvaluation(evaluation, scheme, language)
  const benefit = scheme.benefitDescription?.[language] ?? scheme.benefitDescription?.en

  const renderDataStatusTag = () => {
    if (scheme.verification.status === 'demo_placeholder') {
      const demoLabel = language === 'gu' ? 'ડેમો ડેટા' : language === 'hi' ? 'डेमो डेटा' : 'Demo data'
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-haldi-soft text-haldi-ink border border-haldi/30 select-none">
          <Flask className="size-3.5 shrink-0" weight="fill" aria-hidden="true" />
          <span>{demoLabel}</span>
        </span>
      )
    }

    if (scheme.verification.status === 'needs_review') {
      const needsReviewLabel =
        language === 'gu' ? 'ચકાસણી જરૂરી' : language === 'hi' ? 'पुष्टि आवश्यक' : 'Needs checking'
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-salt-2 text-ink-2 border border-line select-none">
          <Hourglass className="size-3.5 shrink-0" weight="fill" aria-hidden="true" />
          <span>{needsReviewLabel}</span>
        </span>
      )
    }

    if (scheme.verification.status === 'verified' && scheme.lastVerifiedAt) {
      return (
        <span className="text-xs text-ink-2 select-none">
          {formatVerificationDate(scheme.lastVerifiedAt, language)}
        </span>
      )
    }

    return null
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? 'true' : undefined}
      className={cn(
        'w-full text-left p-4 sm:p-5 transition-colors cursor-pointer group block outline-none',
        'hover:bg-salt/80 focus-visible:bg-salt focus-visible:ring-2 focus-visible:ring-neel focus-visible:ring-inset',
        'min-h-[96px]',
        selected
          ? 'bg-neel-soft hover:bg-neel-soft border-l-[3px] border-l-neel'
          : 'border-l-[3px] border-l-transparent',
        className
      )}
    >
      <div className="flex flex-col gap-2.5">
        {/* Top line: Scheme Name & Department + Badges */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="min-w-0 flex-1 space-y-0.5">
            <h3 className="text-base sm:text-lg font-bold text-neel tracking-tight leading-snug group-hover:text-neel-700">
              {schemeName}
            </h3>
            <p className="text-xs sm:text-sm text-ink-2 line-clamp-1">{departmentName}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {renderDataStatusTag()}
            <StatusBadge status={evaluation.state} language={language} />
          </div>
        </div>

        {/* Middle line: DotRow with count */}
        <div className="pt-0.5">
          <DotRow
            checks={evaluation.checks}
            type="condition"
            language={language}
            animate={animateDots}
          />
        </div>

        {/* Plain language explanation from explainEvaluation */}
        <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
          {explanation}
        </p>

        {/* Optional Benefit Description snippet if present */}
        {benefit && (
          <p className="text-xs sm:text-sm font-semibold text-neel tracking-tight tabular-nums">
            {benefit}
          </p>
        )}
      </div>
    </button>
  )
}
