import { useEffect, useMemo } from 'react'
import {
  Microphone,
  MicrophoneSlash,
  Stop,
  ArrowCounterClockwise,
  CheckCircle,
  X,
  WarningCircle,
  Info,
} from '@phosphor-icons/react'
import { Button } from '../../components/ui/Button'
import { useVoiceInput } from '../../hooks/useVoiceInput'
import { matchTranscriptToOption } from '../../lib/speech'
import type { QuestionOption } from '../../domain/question.defs'
import type { Language } from '../../domain/profile.types'
import { useTranslation } from '../../i18n'

export interface VoiceInputModalProps {
  isOpen: boolean
  onClose: () => void
  questionTitle: string
  options: QuestionOption[]
  onConfirmAnswer: (val: unknown) => void
  language: Language
}

export function VoiceInputModal({
  isOpen,
  onClose,
  questionTitle,
  options,
  onConfirmAnswer,
  language,
}: VoiceInputModalProps) {
  const { t } = useTranslation()
  const {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceInput(language)

  // Start listening only when opened via explicit action
  useEffect(() => {
    if (isOpen) {
      startListening()
    } else {
      stopListening()
      resetTranscript()
    }
  }, [isOpen, startListening, stopListening, resetTranscript])

  const activeTranscript = transcript || interimTranscript

  // Match transcript against options
  const matchedOption = useMemo(() => {
    if (!transcript) return null
    return matchTranscriptToOption(transcript, options, language)
  }, [transcript, options, language])

  if (!isOpen) return null

  const langLabel =
    language === 'gu'
      ? 'ગુજરાતી (gu-IN)'
      : language === 'hi'
      ? 'हिन्दी (hi-IN)'
      : 'English (en-IN)'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neel/60 backdrop-blur-[2px]"
    >
      <div className="bg-paper border-[1.5px] border-line rounded-[18px] max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-none">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[8px] bg-neel-soft text-neel text-xs font-semibold">
              <Microphone className="size-3.5" aria-hidden="true" />
              <span>{t.voice.voiceAssistant}</span>
            </div>
            <h2 id="voice-modal-title" className="text-lg font-bold text-neel">
              {t.voice.speakAnswerTitle}
            </h2>
            <p className="text-xs text-ink-2">
              {t.voice.listeningIn.replace('{language}', langLabel)}
            </p>
          </div>
          <button
            type="button"
            aria-label={t.common.close}
            onClick={onClose}
            className="size-11 rounded-[10px] flex items-center justify-center hover:bg-salt text-ink-2 hover:text-neel cursor-pointer"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Question Context */}
        <div className="p-3 rounded-[10px] bg-salt border border-line/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-ink-2 block">
            Question
          </span>
          <p className="text-sm font-semibold text-neel mt-0.5">{questionTitle}</p>
        </div>

        {/* Error States */}
        {!isSupported && (
          <div
            role="alert"
            className="p-4 rounded-[12px] bg-haldi-soft border border-haldi/40 text-xs sm:text-sm font-medium text-haldi-ink space-y-1"
          >
            <div className="flex items-center gap-2 font-bold">
              <MicrophoneSlash className="size-4 shrink-0" aria-hidden="true" />
              <span>{t.voice.unsupportedTitle}</span>
            </div>
            <p>{t.voice.unsupportedNotice}</p>
          </div>
        )}

        {error === 'permission-denied' && (
          <div
            role="alert"
            className="p-4 rounded-[12px] bg-madder-soft border border-madder text-xs sm:text-sm font-medium text-madder space-y-1"
          >
            <div className="flex items-center gap-2 font-bold">
              <WarningCircle className="size-4 shrink-0" weight="fill" aria-hidden="true" />
              <span>{t.voice.permissionDeniedTitle}</span>
            </div>
            <p>{t.voice.permissionDeniedNotice}</p>
          </div>
        )}

        {error === 'no-speech' && !isListening && (
          <div
            role="alert"
            className="p-3.5 rounded-[12px] bg-salt border border-line text-xs sm:text-sm font-medium text-ink-2 flex items-center gap-2"
          >
            <WarningCircle className="size-4 shrink-0 text-haldi-ink" aria-hidden="true" />
            <span>{t.voice.noSpeechNotice}</span>
          </div>
        )}

        {/* Active Listening Display */}
        {isListening && (
          <div className="p-5 rounded-[14px] bg-salt border-[1.5px] border-mor/40 flex flex-col items-center justify-center text-center space-y-3">
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden="true"
                className="size-16 rounded-full bg-mor/20 animate-ping absolute motion-reduce:hidden"
              />
              <div className="size-14 rounded-full bg-mor text-paper flex items-center justify-center relative shadow-none">
                <Microphone className="size-7" weight="fill" aria-hidden="true" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-sm font-bold text-neel block">
                {t.voice.listening}
              </span>
              <p className="text-xs text-ink-2">
                {t.voice.speakNow}
              </p>
            </div>

            {/* Live Transcript Preview */}
            <div
              aria-live="polite"
              className="min-h-[36px] w-full px-3 py-2 rounded-[8px] bg-paper border border-line text-xs sm:text-sm font-medium text-neel italic"
            >
              {activeTranscript || '...'}
            </div>

            <Button
              type="button"
              size="compact"
              variant="secondary"
              icon={<Stop weight="fill" aria-hidden="true" />}
              onClick={stopListening}
            >
              {t.voice.stopListening}
            </Button>
          </div>
        )}

        {/* Captured Transcript & Option Confirmation (When not listening and transcript exists) */}
        {!isListening && transcript && (
          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-[12px] bg-salt border border-line space-y-2">
              <span className="text-xs font-bold text-ink-2 block uppercase tracking-wider">
                {t.voice.youSaid}
              </span>
              <p
                aria-live="polite"
                className="text-base font-bold text-neel bg-paper p-3 rounded-[8px] border border-line"
              >
                &ldquo;{transcript}&rdquo;
              </p>
            </div>

            {/* Matched Option Review */}
            {matchedOption ? (
              <div className="p-4 rounded-[12px] bg-mor-soft border border-mor text-neel space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-5 text-mor shrink-0" weight="fill" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider text-mor">
                    {t.voice.matchedOptionLabel}
                  </span>
                </div>
                <p className="text-base font-extrabold text-neel">
                  {matchedOption.label[language] ?? matchedOption.label.en}
                </p>

                <div className="pt-2">
                  <Button
                    type="button"
                    fullWidth
                    size="default"
                    variant="primary"
                    icon={<CheckCircle weight="fill" aria-hidden="true" />}
                    onClick={() => {
                      onConfirmAnswer(matchedOption.value)
                      onClose()
                    }}
                  >
                    {t.voice.confirmAnswer}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-3 rounded-[10px] bg-salt border border-line text-xs text-ink-2">
                  {t.voice.noMatchDesc}
                </div>
                {/* Fallback: tap direct option chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onConfirmAnswer(opt.value)
                        onClose()
                      }}
                      className="p-3 rounded-[10px] bg-paper border border-line hover:border-neel text-left text-xs sm:text-sm font-semibold text-neel cursor-pointer transition-colors"
                    >
                      {opt.label[language] ?? opt.label.en}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Try Again Action */}
            <div className="flex items-center justify-center pt-1">
              <button
                type="button"
                onClick={startListening}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-2 hover:text-neel cursor-pointer min-h-[48px] px-3"
              >
                <ArrowCounterClockwise className="size-4" aria-hidden="true" />
                <span>{t.voice.tryAgain}</span>
              </button>
            </div>
          </div>
        )}

        {/* Stopped without transcript */}
        {!isListening && !transcript && isSupported && error !== 'permission-denied' && (
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <Button
              type="button"
              size="default"
              variant="primary"
              icon={<Microphone weight="bold" aria-hidden="true" />}
              onClick={startListening}
            >
              {t.voice.startSpeaking}
            </Button>
          </div>
        )}

        {/* Honest Prototype Notice */}
        <div className="p-3 rounded-[10px] bg-salt border border-line/60 flex items-start gap-2 text-[11px] text-ink-2 leading-relaxed">
          <Info className="size-4 text-neel shrink-0 mt-0.5" aria-hidden="true" />
          <span>{t.voice.experimentalNotice}</span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
          <Button
            type="button"
            size="compact"
            variant="ghost"
            onClick={onClose}
          >
            {t.common.close}
          </Button>
        </div>
      </div>
    </div>
  )
}
