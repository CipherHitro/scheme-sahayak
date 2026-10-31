import * as React from 'react'
import {
  CheckCircle,
  CircleHalf,
  MinusCircle,
  Hourglass,
} from '@phosphor-icons/react'
import type { EligibilityState } from '../../domain/scheme.types'
import type { Language } from '../../domain/profile.types'
import { cn } from '../../lib/utils'

export type SchemeStatus = EligibilityState | 'possibly'

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: SchemeStatus
  label?: string
  language?: Language
}

const statusLabels: Record<EligibilityState, Record<Language, string>> = {
  likely: {
    en: 'Likely eligible',
    gu: 'સંભવિત પાત્ર',
    hi: 'संभावित पात्र',
  },
  possible: {
    en: 'Possibly eligible',
    gu: 'શક્ય પાત્ર',
    hi: 'शायद पात्र',
  },
  not_matching: {
    en: 'Not matching right now',
    gu: 'હાલ મેળ ખાતી નથી',
    hi: 'फिलहाल मेल नहीं खाती',
  },
  needs_verification: {
    en: 'Needs checking',
    gu: 'ચકાસણી જરૂરી',
    hi: 'पुष्टि आवश्यक',
  },
}

const getNormalizedStatus = (status: SchemeStatus): EligibilityState => {
  return status === 'possibly' ? 'possible' : status
}

const statusConfig: Record<
  EligibilityState,
  {
    planeClass: string
    icon: React.ReactNode
  }
> = {
  likely: {
    planeClass: 'bg-mor-soft text-mor border border-mor/20',
    icon: <CheckCircle weight="fill" className="size-5 shrink-0" aria-hidden="true" />,
  },
  possible: {
    planeClass: 'bg-haldi-soft text-haldi-ink border border-haldi/30',
    icon: <CircleHalf weight="fill" className="size-5 shrink-0" aria-hidden="true" />,
  },
  not_matching: {
    planeClass: 'bg-madder-soft text-madder border border-madder/20',
    icon: <MinusCircle weight="fill" className="size-5 shrink-0" aria-hidden="true" />,
  },
  needs_verification: {
    planeClass: 'bg-salt-2 text-ink-2 border border-line',
    icon: <Hourglass weight="fill" className="size-5 shrink-0" aria-hidden="true" />,
  },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  language = 'en',
  className,
  ...props
}) => {
  const normStatus = getNormalizedStatus(status)
  const config = statusConfig[normStatus]
  const defaultLabel = statusLabels[normStatus]?.[language] ?? statusLabels[normStatus].en
  const displayLabel = label ?? defaultLabel

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-semibold tracking-normal select-none',
        config.planeClass,
        className,
      )}
      {...props}
    >
      {config.icon}
      <span>{displayLabel}</span>
    </span>
  )
}
