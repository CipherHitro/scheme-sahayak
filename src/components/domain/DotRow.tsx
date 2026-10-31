import type { FC } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { RuleEvaluation } from '../../domain/scheme.types'
import type { Language } from '../../domain/profile.types'
import { cn } from '../../lib/utils'
import {
  type DotStatus,
  type DotItem,
  type DotRowSummary,
  buildDotRowAriaLabel,
  buildDotRowCountText,
} from './dot-row-utils'

export type { DotStatus, DotItem, DotRowSummary }

export interface DotRowProps {
  checks?: RuleEvaluation[]
  items?: DotItem[]
  passedCount?: number
  unknownCount?: number
  failedCount?: number
  totalCount?: number
  type?: 'condition' | 'document'
  language?: Language
  animate?: boolean
  className?: string
  textClassName?: string
}

export const DotRow: FC<DotRowProps> = ({
  checks,
  items: directItems,
  passedCount: directPassed,
  unknownCount: directUnknown,
  failedCount: directFailed,
  totalCount: directTotal,
  type = 'condition',
  language = 'en',
  animate = false,
  className,
  textClassName,
}) => {
  const shouldReduceMotion = useReducedMotion()
  const isReduced = shouldReduceMotion ?? false

  // Derive items from checks or directItems
  let items: DotItem[] = []
  if (checks && checks.length > 0) {
    items = checks.map((c, idx) => ({
      id: c.ruleId || `check-${idx}`,
      status: c.result === 'pass' ? 'met' : c.result === 'unknown' ? 'unknown' : 'unmet',
    }))
  } else if (directItems && directItems.length > 0) {
    items = directItems
  } else {
    // Synthesize items from counts if provided
    const passed = directPassed ?? 0
    const unknown = directUnknown ?? 0
    const failed = directFailed ?? 0
    for (let i = 0; i < passed; i++) items.push({ id: `met-${i}`, status: 'met' })
    for (let i = 0; i < unknown; i++) items.push({ id: `unk-${i}`, status: 'unknown' })
    for (let i = 0; i < failed; i++) items.push({ id: `unm-${i}`, status: 'unmet' })
  }

  const passedCount = directPassed ?? items.filter((i) => i.status === 'met').length
  const unknownCount = directUnknown ?? items.filter((i) => i.status === 'unknown').length
  const failedCount = directFailed ?? items.filter((i) => i.status === 'unmet').length
  const totalCount = directTotal ?? items.length

  const summary: DotRowSummary = {
    passedCount,
    unknownCount,
    failedCount,
    totalCount,
    type,
    language,
  }

  const ariaLabel = buildDotRowAriaLabel(summary)
  const countText = buildDotRowCountText(summary)

  const renderDotShape = (status: DotStatus) => {
    switch (status) {
      case 'met':
        // Filled circle in mor
        return (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className="size-2.5 shrink-0 text-mor"
            aria-hidden="true"
          >
            <circle cx="5" cy="5" r="4.5" fill="currentColor" />
          </svg>
        )
      case 'unknown':
        // Ring with half fill (left half filled) in haldi
        return (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className="size-2.5 shrink-0 text-haldi"
            aria-hidden="true"
          >
            <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M 5 1 A 4 4 0 0 0 5 9 Z" fill="currentColor" />
          </svg>
        )
      case 'unmet':
        if (type === 'condition') {
          // Hollow ring with short dash through it in madder
          return (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className="size-2.5 shrink-0 text-madder"
              aria-hidden="true"
            >
              <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <line
                x1="2.5"
                y1="5"
                x2="7.5"
                y2="5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          )
        }
        // Plain hollow ring for documents in madder
        return (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className="size-2.5 shrink-0 text-madder"
            aria-hidden="true"
          >
            <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        )
    }
  }

  const shouldAnimate = animate && !isReduced

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn('inline-flex items-center gap-2 flex-wrap min-h-6 py-0.5', className)}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-[6px] flex-wrap max-w-full"
      >
        {items.map((item, index) => {
          const dotSvg = renderDotShape(item.status)

          if (!shouldAnimate) {
            return (
              <span key={item.id ?? index} className="inline-flex items-center justify-center">
                {dotSvg}
              </span>
            )
          }

          return (
            <motion.span
              key={item.id ?? index}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.18,
                delay: index * 0.04,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="inline-flex items-center justify-center"
            >
              {dotSvg}
            </motion.span>
          )
        })}
      </div>

      <span
        className={cn(
          'text-xs sm:text-sm font-semibold tabular-nums text-neel select-none',
          textClassName
        )}
      >
        {countText}
      </span>
    </div>
  )
}
