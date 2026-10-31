import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { QuestionStep } from './QuestionStep'
import { ProfileReview } from './ProfileReview'
import { useJourney } from '../../app/journey-context'
import { SCHEMES_DATASET } from '../../data/schemes'
import { getActiveQuestions } from '../../domain/question.defs'
import type { BeneficiaryProfile, FamilyMember } from '../../domain/profile.types'
import { SAMPLE_PERSONAS } from '../../data/personas'
import { useTranslation } from '../../i18n'

export function ProfilePage() {
  const navigate = useNavigate()
  const { currentProfile, setCurrentProfile } = useJourney()
  const { t } = useTranslation()

  // Initialize draft profile answers from currentProfile if available
  const [answers, setAnswers] = useState<Partial<BeneficiaryProfile>>(() => {
    if (currentProfile) {
      return { ...currentProfile }
    }
    return {
      residenceState: 'Gujarat',
      district: 'Ahmedabad',
      category: 'general',
      disability: 'no',
      rationCardType: 'apl',
      ownsAgriculturalLand: 'no',
    }
  })

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    return currentProfile?.familyMembers ? [...currentProfile.familyMembers] : []
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isReviewMode, setIsReviewMode] = useState(false)
  const [returnToReviewAfterEdit, setReturnToReviewAfterEdit] = useState(false)

  // Dynamically recompute active questions based on current answers and loaded schemes
  const activeQuestions = useMemo(() => {
    return getActiveQuestions(SCHEMES_DATASET, answers)
  }, [answers])

  const currentQuestion = activeQuestions[currentIndex]
  const totalQuestions = activeQuestions.length
  const isLastQuestion = currentIndex >= totalQuestions - 1

  const handleSelectAnswer = (val: unknown) => {
    if (!currentQuestion) return
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.field]: val,
    }))
  }

  const handleNext = () => {
    if (returnToReviewAfterEdit) {
      setReturnToReviewAfterEdit(false)
      setIsReviewMode(true)
      return
    }

    if (isLastQuestion) {
      setIsReviewMode(true)
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1))
    }
  }

  const handleBack = () => {
    if (returnToReviewAfterEdit) {
      setReturnToReviewAfterEdit(false)
      setIsReviewMode(true)
      return
    }

    if (currentIndex === 0) {
      navigate('/consent')
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  const handleEditQuestion = (index: number) => {
    setCurrentIndex(index)
    setIsReviewMode(false)
    setReturnToReviewAfterEdit(true)
  }

  const handleAddFamilyMember = (member: FamilyMember) => {
    setFamilyMembers((prev) => [...prev, member])
  }

  const handleRemoveFamilyMember = (memberId: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== memberId))
  }

  const handleLoadSample = (key: 'student' | 'farmer' | 'senior') => {
    const persona = SAMPLE_PERSONAS[key]
    setAnswers({ ...persona })
    setFamilyMembers(persona.familyMembers ? [...persona.familyMembers] : [])
    setIsReviewMode(true)
  }

  const handleSubmitProfile = () => {
    // Build full validated BeneficiaryProfile
    const profile: BeneficiaryProfile = {
      id: currentProfile?.id ?? `citizen-${Date.now()}`,
      displayName: answers.displayName ?? 'Citizen Applicant',
      isSynthetic: true,
      // PersonFacts
      age: typeof answers.age === 'number' ? answers.age : 25,
      gender: answers.gender ?? 'female',
      maritalStatus: answers.maritalStatus ?? 'single',
      occupation: answers.occupation ?? 'other',
      educationLevel: answers.educationLevel ?? 'undergraduate',
      institutionType: answers.institutionType ?? 'government',
      disability: answers.disability ?? 'no',
      // HouseholdFacts
      district: answers.district ?? 'Ahmedabad',
      residenceState: answers.residenceState ?? 'Gujarat',
      category: answers.category ?? 'general',
      annualHouseholdIncome: answers.annualHouseholdIncome ?? '1l_2_5l',
      ownsAgriculturalLand: answers.ownsAgriculturalLand ?? 'no',
      rationCardType: answers.rationCardType ?? 'apl',
      familyMembers,
    }

    setCurrentProfile(profile)
    navigate('/results')
  }

  return (
    <AppShell
      bottomAction={
        isReviewMode ? (
          <Button
            fullWidth
            size="large"
            variant="primary"
            icon={<ArrowRight />}
            onClick={handleSubmitProfile}
          >
            {t.profile.viewResultsBtn}
          </Button>
        ) : undefined
      }
    >
      <div className="space-y-6">
        <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
          Route: /profile • {isReviewMode ? 'Review Mode' : `Question ${currentIndex + 1}/${totalQuestions}`}
        </div>

        {isReviewMode ? (
          <ProfileReview
            questions={activeQuestions}
            answers={answers}
            familyMembers={familyMembers}
            onEditQuestion={handleEditQuestion}
            onAddFamilyMember={handleAddFamilyMember}
            onRemoveFamilyMember={handleRemoveFamilyMember}
            onLoadSample={handleLoadSample}
            onSubmit={handleSubmitProfile}
          />
        ) : currentQuestion ? (
          <QuestionStep
            question={currentQuestion}
            currentNumber={currentIndex + 1}
            totalQuestions={totalQuestions}
            value={answers[currentQuestion.field as keyof BeneficiaryProfile]}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNext}
            onBack={handleBack}
            isLastQuestion={isLastQuestion}
          />
        ) : (
          <div className="text-center py-8">
            <Button
              size="default"
              variant="primary"
              onClick={() => setIsReviewMode(true)}
            >
              Go to review
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  )
}
