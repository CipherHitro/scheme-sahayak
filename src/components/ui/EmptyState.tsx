import * as React from 'react'
import { Info } from '@phosphor-icons/react'
import { Button, type ButtonProps } from './Button'
import { cn } from '../../lib/utils'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  actionVariant?: ButtonProps['variant']
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <Info weight="regular" className="size-10 text-ink-2" aria-hidden="true" />,
  title,
  description,
  actionLabel,
  onAction,
  actionVariant = 'secondary',
  className,
  ...props
}) => {
  return (
    <div
      role="region"
      aria-label={title}
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 bg-salt-2 border border-line rounded-[14px] space-y-3',
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center [&>svg]:size-10 [&>svg]:text-ink-2">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neel tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-ink-2 leading-relaxed max-w-sm">
        {description}
      </p>
      {actionLabel && (
        <div className="pt-2">
          <Button variant={actionVariant} size="compact" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
