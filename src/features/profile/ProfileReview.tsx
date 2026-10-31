import { useState } from 'react'
import {
  PencilSimple,
  ArrowRight,
  UserPlus,
  Users,
  GraduationCap,
  Tractor,
  Trash,
} from '@phosphor-icons/react'
import { Button } from '../../components/ui/Button'
import type { QuestionDef } from '../../domain/question.defs'
import { formatAnswerValue } from '../../domain/question.defs'
import type { BeneficiaryProfile, FamilyMember } from '../../domain/profile.types'
import { useTranslation } from '../../i18n'
import { SAMPLE_PERSONAS } from '../../data/personas'

export interface ProfileReviewProps {
  questions: QuestionDef[]
  answers: Partial<BeneficiaryProfile>
  familyMembers: FamilyMember[]
  onEditQuestion: (index: number) => void
  onAddFamilyMember: (member: FamilyMember) => void
  onRemoveFamilyMember: (memberId: string) => void
  onLoadSample: (key: 'student' | 'farmer' | 'senior') => void
  onSubmit: () => void
}

export function ProfileReview({
  questions,
  answers,
  familyMembers,
  onEditQuestion,
  onAddFamilyMember,
  onRemoveFamilyMember,
  onLoadSample,
  onSubmit,
}: ProfileReviewProps) {
  const { t, language } = useTranslation()
  const [showMemberModal, setShowMemberModal] = useState(false)

  // Family member form state
  const [memName, setMemName] = useState('')
  const [memRelation, setMemRelation] = useState<'spouse' | 'child' | 'parent' | 'sibling' | 'other'>('spouse')
  const [memAge, setMemAge] = useState(30)
  const [memGender, setMemGender] = useState<'female' | 'male' | 'other'>('female')
  const [memOccupation, setMemOccupation] = useState<'student' | 'farmer' | 'homemaker' | 'salaried' | 'retired_or_senior' | 'other'>('homemaker')
  const [memMarital, setMemMarital] = useState<'single' | 'married' | 'widowed' | 'divorced_or_separated'>('married')

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!memName.trim()) return

    const newMember: FamilyMember = {
      id: `member-${Date.now()}`,
      displayName: memName.trim(),
      relationship: memRelation,
      age: Number(memAge) || 25,
      gender: memGender,
      maritalStatus: memMarital,
      occupation: memOccupation,
      educationLevel: 'below_class_8',
      institutionType: 'not_applicable',
      disability: 'no',
    }

    onAddFamilyMember(newMember)
    setShowMemberModal(false)
    setMemName('')
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-neel tracking-tight">
          {t.profile.reviewTitle}
        </h1>
        <p className="text-sm text-ink-2 leading-relaxed">
          {t.profile.reviewSubtitle}
        </p>
      </header>

      {/* Answer Summary Ledger */}
      <div className="bg-paper border border-line rounded-[14px] divide-y divide-line overflow-hidden">
        {questions.map((q, idx) => {
          const val = answers[q.field as keyof BeneficiaryProfile]
          const formattedVal = formatAnswerValue(q.field, val, language)

          return (
            <div
              key={q.field}
              className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-salt transition-colors"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-ink-2 block">
                  {q.title[language] ?? q.title.en}
                </span>
                <span className="text-sm sm:text-base font-semibold text-neel block">
                  {formattedVal}
                </span>
              </div>

              <Button
                size="compact"
                variant="ghost"
                icon={<PencilSimple />}
                onClick={() => onEditQuestion(idx)}
                aria-label={`Edit ${q.title[language] ?? q.title.en}`}
              >
                {t.profile.editAnswer}
              </Button>
            </div>
          )
        })}
      </div>

      {/* Family Members Section */}
      <div className="bg-paper border border-line rounded-[14px] p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-neel" />
            <h2 className="text-sm font-semibold text-neel">
              {t.profile.familyMembersTitle}
            </h2>
          </div>

          <Button
            size="compact"
            variant="secondary"
            icon={<UserPlus />}
            onClick={() => setShowMemberModal(true)}
          >
            {t.profile.addFamilyMemberBtn}
          </Button>
        </div>

        {familyMembers.length === 0 ? (
          <p className="text-xs text-ink-2">
            {t.profile.noFamilyMembers}
          </p>
        ) : (
          <div className="divide-y divide-line pt-1">
            {familyMembers.map((m) => (
              <div
                key={m.id}
                className="py-2.5 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-semibold text-neel block">{m.displayName}</span>
                  <span className="text-ink-2">
                    {m.relationship} • {m.age} years • {m.occupation} • {m.maritalStatus}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveFamilyMember(m.id)}
                  aria-label={`Remove ${m.displayName}`}
                  className="p-1 text-madder hover:bg-madder-soft rounded transition-colors cursor-pointer"
                >
                  <Trash className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Family Member Inline Modal / Form */}
        {showMemberModal && (
          <form
            onSubmit={handleSaveMember}
            className="pt-3 border-t border-line space-y-3 bg-salt-2 p-3.5 rounded-[10px]"
          >
            <div className="text-xs font-semibold text-neel">
              Add household member details
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                placeholder="Full Name (e.g. Meenaben Shah)"
                value={memName}
                onChange={(e) => setMemName(e.target.value)}
                required
                className="p-2 border border-line rounded bg-paper text-neel"
              />
              <select
                value={memRelation}
                onChange={(e) => setMemRelation(e.target.value as typeof memRelation)}
                className="p-2 border border-line rounded bg-paper text-neel"
              >
                <option value="spouse">Spouse</option>
                <option value="child">Child / Daughter-in-law / Son</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="other">Other relation</option>
              </select>
              <input
                type="number"
                placeholder="Age"
                min={1}
                max={120}
                value={memAge}
                onChange={(e) => setMemAge(Number(e.target.value))}
                className="p-2 border border-line rounded bg-paper text-neel"
              />
              <select
                value={memGender}
                onChange={(e) => setMemGender(e.target.value as typeof memGender)}
                className="p-2 border border-line rounded bg-paper text-neel"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <select
                value={memMarital}
                onChange={(e) => setMemMarital(e.target.value as typeof memMarital)}
                className="p-2 border border-line rounded bg-paper text-neel"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="divorced_or_separated">Divorced / Separated</option>
              </select>
              <select
                value={memOccupation}
                onChange={(e) => setMemOccupation(e.target.value as typeof memOccupation)}
                className="p-2 border border-line rounded bg-paper text-neel"
              >
                <option value="homemaker">Homemaker</option>
                <option value="student">Student</option>
                <option value="farmer">Farmer</option>
                <option value="salaried">Salaried</option>
                <option value="retired_or_senior">Retired / Senior</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button
                size="compact"
                variant="ghost"
                type="button"
                onClick={() => setShowMemberModal(false)}
              >
                {t.common.close}
              </Button>
              <Button size="compact" variant="primary" type="submit">
                Save member
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Sample Personas Fast-Loader for Testers */}
      <div className="pt-2 border-t border-line space-y-2">
        <span className="text-xs font-semibold text-ink-2 block">
          {t.profile.loadSamplePrompt}
        </span>
        <div className="flex flex-wrap gap-2">
          <Button
            size="compact"
            variant="secondary"
            icon={<GraduationCap />}
            onClick={() => onLoadSample('student')}
          >
            {SAMPLE_PERSONAS.student.displayName}
          </Button>
          <Button
            size="compact"
            variant="secondary"
            icon={<Tractor />}
            onClick={() => onLoadSample('farmer')}
          >
            {SAMPLE_PERSONAS.farmer.displayName}
          </Button>
          <Button
            size="compact"
            variant="secondary"
            icon={<Users />}
            onClick={() => onLoadSample('senior')}
          >
            {SAMPLE_PERSONAS.senior.displayName}
          </Button>
        </div>
      </div>

      {/* Submission Button */}
      <div className="pt-4 border-t border-line">
        <Button
          fullWidth
          size="large"
          variant="primary"
          icon={<ArrowRight />}
          onClick={onSubmit}
        >
          {t.profile.viewResultsBtn}
        </Button>
      </div>
    </div>
  )
}
