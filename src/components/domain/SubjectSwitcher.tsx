import type { FC } from 'react'
import type { BeneficiaryProfile, Language } from '../../domain/profile.types'
import { cn } from '../../lib/utils'

export interface SubjectSwitcherProps {
  profile: BeneficiaryProfile
  activeSubjectId: string
  onSelectSubject: (subjectId: string) => void
  language?: Language
  className?: string
}

export const SubjectSwitcher: FC<SubjectSwitcherProps> = ({
  profile,
  activeSubjectId,
  onSelectSubject,
  language = 'en',
  className,
}) => {
  // If no family members exist, hide the switcher per Phase 8C spec
  if (!profile.familyMembers || profile.familyMembers.length === 0) {
    return null
  }

  const forLabel =
    language === 'gu' ? 'કોના માટે:' : language === 'hi' ? 'किसके लिए:' : 'For:'

  const primarySelfLabel =
    language === 'gu'
      ? `${profile.displayName} (મુખ્ય અરજદાર)`
      : language === 'hi'
      ? `${profile.displayName} (मुख्य आवेदक)`
      : `${profile.displayName} (Self)`

  const subjects = [
    {
      id: profile.id,
      name: profile.displayName,
      relationship: 'self',
      ariaLabel: primarySelfLabel,
    },
    ...profile.familyMembers.map((m) => ({
      id: m.id,
      name: m.displayName,
      relationship: m.relationship,
      ariaLabel: `${m.displayName} (${m.relationship})`,
    })),
  ]

  return (
    <div
      role="group"
      aria-label="Household subject lens"
      className={cn('flex items-center gap-2 overflow-x-auto py-1 no-scrollbar', className)}
    >
      <span className="text-xs sm:text-sm font-bold text-ink-2 shrink-0 select-none">
        {forLabel}
      </span>

      <div className="flex items-center gap-2 shrink-0">
        {subjects.map((sub) => {
          const isSelected = activeSubjectId === sub.id
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => onSelectSubject(sub.id)}
              aria-pressed={isSelected}
              aria-label={sub.ariaLabel}
              className={cn(
                'min-h-[44px] px-4 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none shrink-0',
                isSelected
                  ? 'bg-neel text-paper shadow-none'
                  : 'bg-paper text-neel border border-line hover:bg-salt'
              )}
            >
              <span>{sub.name}</span>
              <span className="text-[11px] font-normal opacity-80 ml-1">
                ({sub.relationship})
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
