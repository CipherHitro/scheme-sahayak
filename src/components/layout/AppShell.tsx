import * as React from 'react'
import { AppHeader, type AppLanguage, type TextScale } from './AppHeader'
import { PrototypeBanner } from './PrototypeBanner'
import { cn } from '../../lib/utils'

export interface AppShellProps {
  children: React.ReactNode
  currentLanguage?: AppLanguage
  onLanguageChange?: (lang: AppLanguage) => void
  currentTextScale?: TextScale
  onTextScaleChange?: (scale: TextScale) => void
  onWordmarkClick?: () => void
  bottomAction?: React.ReactNode
  className?: string
  contentClassName?: string
  /** Constrain content to 640px single column (default for standard flows) */
  singleColumn?: boolean
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  currentLanguage,
  onLanguageChange,
  currentTextScale,
  onTextScaleChange,
  onWordmarkClick,
  bottomAction,
  className,
  contentClassName,
  singleColumn = true,
}) => {
  return (
    <div className={cn('min-h-screen bg-salt text-neel flex flex-col', className)}>
      {/* Top Chrome */}
      <AppHeader
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        currentTextScale={currentTextScale}
        onTextScaleChange={onTextScaleChange}
        onWordmarkClick={onWordmarkClick}
      />
      <PrototypeBanner />

      {/* Main Content Area */}
      <main
        role="main"
        className={cn(
          'flex-1 w-full px-5 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10',
          singleColumn ? 'max-w-[680px] mx-auto' : 'max-w-7xl mx-auto',
          contentClassName,
        )}
      >
        {children}
      </main>

      {/* Sticky Bottom Action Bar for Mobile if supplied */}
      {bottomAction && (
        <aside
          aria-label="Action bar"
          className="sticky bottom-0 z-20 w-full bg-paper border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-none"
        >
          <div className="max-w-[640px] mx-auto">{bottomAction}</div>
        </aside>
      )}
    </div>
  )
}
