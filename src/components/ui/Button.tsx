import * as React from 'react'
import { buttonVariants, type ButtonVariantProps } from './button-variants'
import { cn } from '../../lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  icon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {icon && <span className="inline-flex shrink-0 [&>svg]:size-6">{icon}</span>}
        <span>{children}</span>
      </button>
    )
  },
)

Button.displayName = 'Button'
