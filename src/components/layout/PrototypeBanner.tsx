import * as React from 'react'
import { Info } from '@phosphor-icons/react'
import { cn } from '../../lib/utils'
import { useTranslation } from '../../i18n'
import { useJourney } from '../../app/journey-context'

export interface PrototypeBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

export const PrototypeBanner: React.FC<PrototypeBannerProps> = ({
  message,
  className,
  ...props
}) => {
  const { language } = useJourney()
  const { t } = useTranslation()
  const displayMessage = message ?? t.banner.prototypeNotice

  return (
    <aside
      aria-label="Prototype notice"
      className={cn(
        'w-full min-h-[36px] bg-haldi-soft text-haldi-ink border-b border-haldi/25 px-4 py-1.5 flex items-center justify-center gap-2 text-xs font-semibold tracking-normal text-center select-none flex-wrap',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <Info weight="fill" className="size-4 shrink-0" aria-hidden="true" />
        <span>{displayMessage}</span>
      </div>
      {language !== 'en' && (
        <span
          data-testid="native-review-flag"
          className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-haldi/30 border border-haldi-ink/20 text-haldi-ink"
        >
          {t.banner.nativeReviewNotice}
        </span>
      )}
    </aside>
  )
}
