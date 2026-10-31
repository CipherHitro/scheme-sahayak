import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 rounded-[10px] px-5 text-base font-semibold leading-tight transition-colors duration-150 select-none cursor-pointer disabled:cursor-not-allowed disabled:bg-salt-2 disabled:text-ink-2 disabled:border-transparent disabled:shadow-none focus-visible:outline-3 focus-visible:outline-neel focus-visible:outline-offset-[3px]',
  {
    variants: {
      variant: {
        primary:
          'bg-neel text-paper border border-transparent hover:bg-neel-700 active:bg-neel-700',
        secondary:
          'bg-paper text-neel border-[1.5px] border-neel hover:bg-neel-soft/40 active:bg-neel-soft/60',
        ghost:
          'bg-transparent text-neel border-transparent hover:underline active:bg-salt-2',
        danger:
          'bg-transparent text-madder border-[1.5px] border-madder hover:bg-madder-soft/40 active:bg-madder-soft/60',
      },
      size: {
        default: 'h-[52px]',
        large: 'h-[60px] text-lg',
        compact: 'h-[44px] text-sm px-4',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false,
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center shrink-0 min-w-[48px] min-h-[48px] rounded-[10px] transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed disabled:bg-salt-2 disabled:text-ink-2 disabled:border-transparent focus-visible:outline-3 focus-visible:outline-neel focus-visible:outline-offset-[3px] [&>svg]:size-6',
  {
    variants: {
      variant: {
        standard:
          'bg-transparent text-neel hover:bg-salt-2 active:bg-line/40',
        bordered:
          'bg-paper border-[1.5px] border-line text-neel hover:bg-salt-2 active:border-neel',
        primary:
          'bg-neel text-paper hover:bg-neel-700 active:bg-neel-700',
        haldi:
          'bg-haldi text-neel hover:brightness-95 active:brightness-90',
      },
      size: {
        default: 'w-12 h-12',
        large: 'w-16 h-16 [&>svg]:size-8',
        compact: 'w-11 h-11 [&>svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'standard',
      size: 'default',
    },
  },
)

export type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>
