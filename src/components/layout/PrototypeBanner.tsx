import * as React from 'react'
import { Info } from '@phosphor-icons/react'
import { cn } from '../../lib/utils'
import { useTranslation } from '../../i18n'

export interface PrototypeBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

export const PrototypeBanner: React.FC<PrototypeBannerProps> = ({
  message,
  className,
  ...props
}) => {
  const { t } = useTranslation()
  const displayMessage = message ?? t.banner.prototypeNotice

  return (
    <aside
      aria-label="Prototype notice"
      className={cn(
        'w-full min-h-[36px] bg-haldi-soft text-haldi-ink border-b border-haldi/25 px-4 py-1.5 flex items-center justify-center gap-2 text-xs font-semibold tracking-normal text-center select-none',
        className,
      )}
      {...props}
    >
      <Info weight="fill" className="size-4 shrink-0" aria-hidden="true" />
      <span>{displayMessage}</span>
    </aside>
  )
}
