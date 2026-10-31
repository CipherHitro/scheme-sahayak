import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Microphone,
  SpeakerHigh,
  Stop,
} from '@phosphor-icons/react'
import { Button } from '../../components/ui/Button'
import type { QuestionDef } from '../../domain/question.defs'
import { useTranslation } from '../../i18n'
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis'
import { VoiceInputModal } from '../voice/VoiceInputModal'
import { cn } from '../../lib/utils'

export interface QuestionStepProps {
  question: QuestionDef
  currentNumber: number
  totalQuestions: number
  value: unknown
  onSelectAnswer: (val: unknown) => void
  onNext: () => void
  onBack: () => void
  isLastQuestion: boolean
}

export function QuestionStep({
  question,
  currentNumber,
  totalQuestions,
  value,
  onSelectAnswer,
  onNext,
  onBack,
  isLastQuestion,
}: QuestionStepProps) {
  const { t, language } = useTranslation()
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)
  const { isSupported: isTtsSupported, isSpeaking, speak, stop } = useSpeechSynthesis(language)

  const progressPercent = Math.min(100, Math.round((currentNumber / totalQuestions) * 100))
  const isAnswered = value !== undefined

  const questionTitle = question.title[language] ?? question.title.en
  const helperText = question.helperText ? (question.helperText[language] ?? question.helperText.en) : ''

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stop()
    } else {
      speak(`${questionTitle}. ${helperText}`, language)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Progress Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-ink-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-neel hover:underline cursor-pointer py-1 min-h-[48px]"
          >
            <ArrowLeft className="size-4" />
            <span>{t.common.back}</span>
          </button>

          <span aria-live="polite" className="tabular-nums">
            {t.profile.questionProgress
              .replace('{current}', String(currentNumber))
              .replace('{total}', String(totalQuestions))}
          </span>

          <div className="flex items-center gap-1">
            {/* Read-Aloud Action with Visible Stop Control */}
            {isTtsSupported && (
              <button
                type="button"
                onClick={handleToggleSpeech}
                aria-label={isSpeaking ? t.voice.stopReading : t.voice.readQuestion}
                className={cn(
                  'px-2.5 py-1.5 rounded-[8px] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[48px]',
                  isSpeaking
                    ? 'bg-madder-soft text-madder border border-madder/40'
                    : 'text-neel hover:bg-salt-2 border border-transparent'
                )}
              >
                {isSpeaking ? (
                  <>
                    <Stop className="size-4 shrink-0" weight="fill" aria-hidden="true" />
                    <span>{t.voice.stopReading}</span>
                  </>
                ) : (
                  <>
                    <SpeakerHigh className="size-4 shrink-0" aria-hidden="true" />
                    <span className="hidden sm:inline">{t.voice.readQuestion}</span>
                  </>
                )}
              </button>
            )}

            {/* Voice Input Modal Trigger */}
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              aria-label={t.voice.speakAnswerTitle}
              className="p-2 rounded-[8px] text-neel hover:bg-salt-2 transition-colors cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <Microphone className="size-5 text-neel" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 4px Haldi Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="w-full h-1 bg-salt-2 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-haldi transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Large Question Headline & Helper */}
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-neel tracking-tight leading-[1.2]">
          {questionTitle}
        </h1>
        {helperText && (
          <p className="text-sm text-ink-2 leading-relaxed">
            {helperText}
          </p>
        )}
      </header>

      {/* Answer Options Radio Group */}
      <div
        role="radiogroup"
        aria-label={question.title[language] ?? question.title.en}
        className="space-y-3 pt-2"
      >
        {question.options.map((option, idx) => {
          const isSelected = value === option.value
          const optionLabel = option.label[language] ?? option.label.en

          return (
            <div
              key={idx}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onSelectAnswer(option.value)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  onSelectAnswer(option.value)
                }
              }}
              className={cn(
                'min-h-[60px] p-4 rounded-[10px] border flex items-center gap-3.5 transition-colors cursor-pointer select-none',
                isSelected
                  ? 'border-2 border-neel bg-neel-soft/60'
                  : 'border-[1.5px] border-line bg-paper hover:bg-salt-2'
              )}
            >
              {/* Radio Indicator */}
              <div
                className={cn(
                  'size-5 rounded-full flex items-center justify-center shrink-0 transition-colors',
                  isSelected
                    ? 'border-2 border-neel bg-neel'
                    : 'border-[1.5px] border-line bg-paper'
                )}
              >
                {isSelected && <div className="size-2 rounded-full bg-paper" />}
              </div>

              {/* Option Text */}
              <span className="text-sm sm:text-base font-medium text-neel leading-snug">
                {optionLabel}
              </span>
            </div>
          )
        })}
      </div>

      {/* Sticky Bottom Bar / Action Navigation */}
      <div className="pt-4 flex items-center justify-between border-t border-line">
        <Button
          size="default"
          variant="ghost"
          icon={<ArrowLeft />}
          onClick={onBack}
        >
          {t.common.back}
        </Button>

        <Button
          size="default"
          variant="primary"
          disabled={!isAnswered}
          icon={<ArrowRight />}
          onClick={onNext}
        >
          {isLastQuestion ? t.profile.reviewProfileBtn : t.profile.nextQuestion}
        </Button>
      </div>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        questionTitle={questionTitle}
        options={question.options}
        onConfirmAnswer={(val) => {
          onSelectAnswer(val)
          setIsVoiceModalOpen(false)
        }}
        language={language}
      />
    </div>
  )
}
