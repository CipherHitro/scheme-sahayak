import type { FC } from 'react'
import { cn } from '../../lib/utils'

export interface BandhaniBandProps {
  variant?: 'salt' | 'dark'
  className?: string
}

/**
 * BandhaniBand — Thin decorative band (height 20px) used at most once per screen:
 * under the header on the Welcome screen, and as the top edge of the Checklist summary panel.
 * It is a repeating dot lattice in neel at 14% opacity on salt, or haldi on neel for dark panels.
 * It must never sit behind text.
 */
export const BandhaniBand: FC<BandhaniBandProps> = ({
  variant = 'salt',
  className,
}) => {
  const isDark = variant === 'dark'
  const dotColor = isDark ? '#E59F00' : '#12263F' // haldi vs neel
  const dotOpacity = isDark ? '0.4' : '0.14'

  return (
    <div
      aria-hidden="true"
      className={cn(
        'w-full h-5 overflow-hidden select-none pointer-events-none',
        isDark ? 'bg-neel' : 'bg-transparent',
        className
      )}
    >
      <svg
        className="w-full h-5"
        width="100%"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`bandhani-pattern-${variant}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            {/* Repeating traditional diamond / 9-dot lattice of Bandhani */}
            <circle cx="10" cy="4" r="1.5" fill={dotColor} fillOpacity={dotOpacity} />
            <circle cx="4" cy="10" r="1.5" fill={dotColor} fillOpacity={dotOpacity} />
            <circle cx="16" cy="10" r="1.5" fill={dotColor} fillOpacity={dotOpacity} />
            <circle cx="10" cy="16" r="1.5" fill={dotColor} fillOpacity={dotOpacity} />
            <circle cx="10" cy="10" r="1.2" fill={dotColor} fillOpacity={dotOpacity} />
          </pattern>
        </defs>
        <rect width="100%" height="20" fill={`url(#bandhani-pattern-${variant})`} />
      </svg>
    </div>
  )
}
