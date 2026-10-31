import { useState, type FC, type HTMLAttributes } from 'react'
import { useNavigate, useInRouterContext } from 'react-router-dom'
import {
  UserCircle,
  SignOut,
  SignIn,
  UsersThree,
  X,
  GraduationCap,
  Tractor,
  Heart,
  UserPlus,
} from '@phosphor-icons/react'
import { cn } from '../../lib/utils'
import { useJourney } from '../../app/journey-context'
import type { Language, TextScale } from '../../domain/journey.types'

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  currentLanguage?: Language
  onLanguageChange?: (lang: Language) => void
  currentTextScale?: TextScale
  onTextScaleChange?: (scale: TextScale) => void
  onWordmarkClick?: () => void
}

const languageOptions: { id: Language; label: string; langAttr: string }[] = [
  { id: 'gu', label: 'ગુજ', langAttr: 'gu' },
  { id: 'hi', label: 'हिં', langAttr: 'hi' },
  { id: 'en', label: 'EN', langAttr: 'en' },
]

const textScaleOptions: { scale: TextScale; label: string; sizeClass: string; title: string }[] = [
  { scale: 1, label: 'A', sizeClass: 'text-xs', title: 'Normal text (100%)' },
  { scale: 1.125, label: 'A', sizeClass: 'text-sm font-semibold', title: 'Large text (112.5%)' },
  { scale: 1.25, label: 'A', sizeClass: 'text-base font-bold', title: 'Extra large text (125%)' },
]

interface InnerHeaderProps extends AppHeaderProps {
  navigate: (to: string) => void
}

const AppHeaderInner: FC<InnerHeaderProps> = ({
  navigate,
  currentLanguage,
  onLanguageChange,
  currentTextScale,
  onTextScaleChange,
  onWordmarkClick,
  className,
  ...props
}) => {
  const journey = useJourney()
  const activeLang = currentLanguage ?? journey.language
  const activeScale = currentTextScale ?? journey.textScale
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleLanguageSelect = (selectedLang: Language) => {
    journey.setLanguage(selectedLang)
    onLanguageChange?.(selectedLang)
  }

  const handleTextScaleSelect = (selectedScale: TextScale) => {
    journey.setTextScale(selectedScale)
    onTextScaleChange?.(selectedScale)
  }

  const handleLogout = () => {
    journey.resetJourney()
    setIsAuthModalOpen(false)
    navigate('/')
  }

  const handleSelectPersona = (persona: 'student' | 'farmer' | 'senior') => {
    journey.loadSamplePersona(persona)
    setIsAuthModalOpen(false)
    navigate('/results')
  }

  const handleNewSignup = () => {
    journey.resetJourney()
    setIsAuthModalOpen(false)
    navigate('/consent')
  }

  const handleWordmark = () => {
    if (onWordmarkClick) {
      onWordmarkClick()
    } else {
      navigate('/')
    }
  }

  const isLoggedIn = !!journey.currentProfile

  return (
    <>
      <header
        role="banner"
        className={cn(
          'w-full min-h-16 bg-salt border-b border-line px-3 sm:px-6 md:px-8 py-2.5 flex items-center justify-between gap-2 sm:gap-4 select-none flex-wrap',
          className
        )}
        {...props}
      >
        {/* Brand Wordmark */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleWordmark}
            className="text-left font-bold text-lg sm:text-2xl text-neel tracking-tight hover:opacity-90 transition-opacity focus-visible:outline-3 focus-visible:outline-neel focus-visible:outline-offset-2 rounded cursor-pointer"
            aria-label="SchemeSahayak Home"
          >
            <span>Scheme</span>
            <span className="text-neel-700">Sahayak</span>
          </button>
        </div>

        {/* User Session & Fast Tester Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 order-3 sm:order-2">
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-[8px] bg-paper border border-line hover:border-neel text-neel text-xs font-semibold cursor-pointer transition-colors"
                title="Click to switch persona"
              >
                <UserCircle weight="fill" className="size-4 sm:size-5 text-neel shrink-0" />
                <span className="truncate max-w-[90px] sm:max-w-[140px]">
                  {journey.currentProfile?.displayName}
                </span>
                <UsersThree weight="bold" className="size-3.5 text-ink-2 shrink-0 hidden sm:inline" />
              </button>

              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out and reset session"
                className="inline-flex items-center gap-1 h-9 px-2 sm:px-3 rounded-[8px] bg-paper border border-line hover:bg-madder-soft hover:text-madder hover:border-madder/40 text-neel text-xs font-semibold cursor-pointer transition-colors"
              >
                <SignOut weight="bold" className="size-3.5 sm:size-4 shrink-0" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-[8px] bg-paper border border-line hover:bg-salt text-neel text-xs font-semibold cursor-pointer transition-colors"
            >
              <SignIn weight="bold" className="size-3.5 sm:size-4 shrink-0 text-neel" />
              <span>Log in / Sample</span>
            </button>
          )}
        </div>

        {/* Controls: Language and Text Size */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 order-2 sm:order-3">
          {/* Text Size Control */}
          <div
            role="group"
            aria-label="Text size"
            className="inline-flex items-center p-0.5 rounded-[10px] border border-line bg-paper shadow-none"
          >
            {textScaleOptions.map((opt) => {
              const isSelected = activeScale === opt.scale
              return (
                <button
                  key={opt.scale}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={opt.title}
                  title={opt.title}
                  onClick={() => handleTextScaleSelect(opt.scale)}
                  className={cn(
                    'min-w-[30px] sm:min-w-[36px] h-8 sm:h-9 px-1.5 flex items-center justify-center rounded-[8px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-neel',
                    opt.sizeClass,
                    isSelected
                      ? 'bg-neel text-paper font-bold'
                      : 'bg-transparent text-neel hover:bg-salt-2'
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
              const isSelected = activeLang === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  lang={opt.langAttr}
                  aria-pressed={isSelected}
                  aria-label={`Switch language to ${opt.label}`}
                  onClick={() => handleLanguageSelect(opt.id)}
                  className={cn(
                    'min-w-[42px] sm:min-w-[48px] h-8 sm:h-9 px-2 sm:px-3 flex items-center justify-center text-xs sm:text-sm font-semibold rounded-[8px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-neel',
                    isSelected
                      ? 'bg-neel text-paper'
                      : 'bg-transparent text-neel hover:bg-salt-2'
                  )}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Simulated Auth / Persona Switcher Modal */}
      {isAuthModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neel/40 backdrop-blur-[2px]"
        >
          <div className="bg-paper border border-line rounded-[16px] w-full max-w-md p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <UsersThree weight="fill" className="size-6 text-neel" />
                <h3 id="auth-modal-title" className="text-lg font-bold text-neel">
                  {isLoggedIn ? 'Switch Persona / Session' : 'Quick Login / Test Session'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                aria-label="Close dialog"
                className="p-1 rounded text-ink-2 hover:text-neel hover:bg-salt cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-xs text-ink-2 leading-relaxed">
              Select a persona to test eligibility immediately. You can log out anytime to clear local storage and start fresh.
            </p>

            {/* Persona Quick Options */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleSelectPersona('student')}
                className="w-full text-left p-3.5 rounded-[10px] border border-line hover:border-neel hover:bg-salt transition-colors cursor-pointer flex items-center gap-3 group"
              >
                <div className="p-2 rounded-full bg-mor-soft text-mor">
                  <GraduationCap weight="fill" className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-neel group-hover:text-neel-700">
                    Pooja (Student, Age 19)
                  </div>
                  <div className="text-xs text-ink-2">
                    Undergraduate, General, Ahmedabad, Income ₹1L–₹2.5L
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPersona('farmer')}
                className="w-full text-left p-3.5 rounded-[10px] border border-line hover:border-neel hover:bg-salt transition-colors cursor-pointer flex items-center gap-3 group"
              >
                <div className="p-2 rounded-full bg-haldi-soft text-haldi-ink">
                  <Tractor weight="fill" className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-neel group-hover:text-neel-700">
                    Rameshbhai (Farmer, Age 48)
                  </div>
                  <div className="text-xs text-ink-2">
                    Small agricultural landowner, SEBC, Anand, Income ₹1L–₹2.5L
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPersona('senior')}
                className="w-full text-left p-3.5 rounded-[10px] border border-line hover:border-neel hover:bg-salt transition-colors cursor-pointer flex items-center gap-3 group"
              >
                <div className="p-2 rounded-full bg-neel-soft text-neel">
                  <Heart weight="fill" className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-neel group-hover:text-neel-700">
                    Kantilal & Meenaben (Senior & Widow)
                  </div>
                  <div className="text-xs text-ink-2">
                    Age 65 & 62, Destitute BPL pension & Ganga Swarupa
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={handleNewSignup}
                className="w-full text-left p-3.5 rounded-[10px] border border-dashed border-line hover:border-neel hover:bg-salt transition-colors cursor-pointer flex items-center gap-3 group"
              >
                <div className="p-2 rounded-full bg-salt-2 text-ink-2">
                  <UserPlus weight="bold" className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-neel group-hover:text-neel-700">
                    New Profile (Guided Flow)
                  </div>
                  <div className="text-xs text-ink-2">
                    Start fresh from consent and guided household questions
                  </div>
                </div>
              </button>
            </div>

            {/* Logout button in modal */}
            {isLoggedIn && (
              <div className="pt-2 border-t border-line flex justify-end">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-[8px] bg-madder-soft text-madder hover:bg-madder hover:text-paper font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <SignOut weight="bold" className="size-4" />
                  <span>Log out & clear storage</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

const RouterAppHeader: FC<AppHeaderProps> = (props) => {
  const navigate = useNavigate()
  return <AppHeaderInner {...props} navigate={navigate} />
}

export const AppHeader: FC<AppHeaderProps> = (props) => {
  const inRouter = useInRouterContext()
  if (inRouter) {
    return <RouterAppHeader {...props} />
  }
  const fallbackNavigate = (to: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = to
    }
  }
  return <AppHeaderInner {...props} navigate={fallbackNavigate} />
}
