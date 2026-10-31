import * as React from 'react'
import { iconButtonVariants, type IconButtonVariantProps } from './button-variants'
import { cn } from '../../lib/utils'

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    IconButtonVariantProps {
  /** Accessible label is required for screen readers */
  'aria-label': string
  icon: React.ReactNode
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        title={ariaLabel}
        className={cn(iconButtonVariants({ variant, size, className }))}
        {...props}
      >
        {icon}
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
