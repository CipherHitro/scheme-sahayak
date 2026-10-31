import * as React from 'react'
import {
  CheckCircle,
  CircleHalf,
  MinusCircle,
  Hourglass,
} from '@phosphor-icons/react'
import { cn } from '../../lib/utils'

export type SchemeStatus =
  | 'likely'
  | 'possibly'
  | 'not_matching'
  | 'needs_verification'

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: SchemeStatus
  label?: string
}

const statusConfig: Record<
  SchemeStatus,
  {
    planeClass: string
    defaultLabel: string
    icon: React.ReactNode
  }
> = {
  likely: {
    planeClass: 'bg-mor-soft text-mor border border-mor/20',
    defaultLabel: 'Likely eligible',
    icon: <CheckCircle weight="fill" className="size-5 shrink-0" aria-hidden="true" />,
  },
  possibly: {
    planeClass: 'bg-haldi-soft text-haldi-ink border border-haldi/30',
    defaultLabel: 'Possibly eligible',
    icon: <CircleHalf weight="fill" className="size-5 shrink-0" aria-hidden="true" />,
  },
  not_matching: {
    planeClass: 'bg-madder-soft text-madder border border-madder/20',
    defaultLabel: 'Not matching right now',
    icon: <MinusCircle weight="fill" className="size-5 shrink-0" aria-hidden="true" />,
  },
  needs_verification: {
    planeClass: 'bg-salt-2 text-ink-2 border border-line',
    defaultLabel: 'Needs checking',
    icon: <Hourglass weight="fill" className="size-5 shrink-0" aria-hidden="true" />,
  },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className,
  ...props
}) => {
  const config = statusConfig[status]
  const displayLabel = label ?? config.defaultLabel

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
