import * as React from 'react'
import { cn } from '../../lib/utils'

export type AppLanguage = 'gu' | 'hi' | 'en'
export type TextScale = 1 | 1.125 | 1.25

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  currentLanguage?: AppLanguage
  onLanguageChange?: (lang: AppLanguage) => void
  currentTextScale?: TextScale
  onTextScaleChange?: (scale: TextScale) => void
  onWordmarkClick?: () => void
}

const languageOptions: { id: AppLanguage; label: string; langAttr: string }[] = [
  { id: 'gu', label: 'ગુજ', langAttr: 'gu' },
  { id: 'hi', label: 'हिं', langAttr: 'hi' },
  { id: 'en', label: 'EN', langAttr: 'en' },
]

const textScaleOptions: { scale: TextScale; label: string; sizeClass: string; title: string }[] = [
  { scale: 1, label: 'A', sizeClass: 'text-xs', title: 'Normal text (100%)' },
  { scale: 1.125, label: 'A', sizeClass: 'text-sm font-semibold', title: 'Large text (112.5%)' },
  { scale: 1.25, label: 'A', sizeClass: 'text-base font-bold', title: 'Extra large text (125%)' },
]

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentLanguage = 'gu',
  onLanguageChange,
  currentTextScale = 1,
  onTextScaleChange,
  onWordmarkClick,
  className,
  ...props
}) => {
  const [lang, setLang] = React.useState<AppLanguage>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('scheme_sahayak_lang') as AppLanguage | null
      if (stored && (stored === 'gu' || stored === 'hi' || stored === 'en')) {
        return stored
      }
    }
    return currentLanguage
  })

  const [textScale, setTextScale] = React.useState<TextScale>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('scheme_sahayak_text_scale')
      if (stored) {
        const parsed = parseFloat(stored)
        if (parsed === 1 || parsed === 1.125 || parsed === 1.25) {
          return parsed as TextScale
        }
      }
    }
    return currentTextScale
  })

  const handleLanguageSelect = (selectedLang: AppLanguage) => {
    setLang(selectedLang)
    onLanguageChange?.(selectedLang)
  }

  const handleTextScaleSelect = (selectedScale: TextScale) => {
    setTextScale(selectedScale)
    onTextScaleChange?.(selectedScale)
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('scheme_sahayak_lang', lang)
      localStorage.setItem('scheme_sahayak_text_scale', String(textScale))
      document.documentElement.lang = lang
      document.documentElement.style.setProperty('--text-scale', String(textScale))
    }
  }, [lang, textScale])

  return (
    <header
      role="banner"
      className={cn(
        'w-full h-16 bg-salt border-b border-line px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4 select-none',
        className,
      )}
      {...props}
    >
      {/* Brand Wordmark */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onWordmarkClick}
          className="text-left font-bold text-xl sm:text-2xl text-neel tracking-tight hover:opacity-90 transition-opacity focus-visible:outline-3 focus-visible:outline-neel focus-visible:outline-offset-2 rounded"
          aria-label="SchemeSahayak Home"
        >
          <span>Scheme</span>
          <span className="text-neel-700">Sahayak</span>
        </button>
      </div>

      {/* Controls: Language and Text Size */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Text Size Control */}
        <div
          role="group"
          aria-label="Text size"
          className="inline-flex items-center p-0.5 rounded-[10px] border border-line bg-paper shadow-none"
        >
          {textScaleOptions.map((opt) => {
            const isSelected = textScale === opt.scale
            return (
              <button
                key={opt.scale}
                type="button"
                aria-pressed={isSelected}
                aria-label={opt.title}
                title={opt.title}
                onClick={() => handleTextScaleSelect(opt.scale)}
                className={cn(
                  'min-w-[34px] sm:min-w-[38px] h-9 px-2 flex items-center justify-center rounded-[8px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-neel',
                  opt.sizeClass,
                  isSelected
                    ? 'bg-neel text-paper'
                    : 'bg-transparent text-neel hover:bg-salt-2',
                )}
              >
                {opt.label}
              </button>
            )
          })}
        </div>

        {/* Language Switcher */}
        <div
          role="group"
          aria-label="Language"
          className="inline-flex items-center p-0.5 rounded-[10px] border border-line bg-paper shadow-none"
        >
          {languageOptions.map((opt) => {
            const isSelected = lang === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                lang={opt.langAttr}
                aria-pressed={isSelected}
                aria-label={`Switch language to ${opt.label}`}
                onClick={() => handleLanguageSelect(opt.id)}
                className={cn(
                  'min-w-[48px] h-9 px-3 flex items-center justify-center text-sm font-semibold rounded-[8px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-neel',
                  isSelected
                    ? 'bg-neel text-paper'
                    : 'bg-transparent text-neel hover:bg-salt-2',
                )}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
