import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  getSpeechLocale,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  matchTranscriptToOption,
} from '../lib/speech'
import { VoiceInputModal } from '../features/voice/VoiceInputModal'
import { JourneyProvider } from '../app/JourneyContext'
import type { QuestionOption } from '../domain/question.defs'

describe('Phase 13: Voice Enhancement & Web Speech APIs', () => {
  describe('Locale Mapping (BUILD_GUIDE.md 545)', () => {
    it('maps gu to gu-IN', () => {
      expect(getSpeechLocale('gu')).toBe('gu-IN')
    })

    it('maps hi to hi-IN', () => {
      expect(getSpeechLocale('hi')).toBe('hi-IN')
    })

    it('maps en to en-IN', () => {
      expect(getSpeechLocale('en')).toBe('en-IN')
    })

    it('falls back safely to en-IN for unknown or undefined language', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(getSpeechLocale(undefined as any)).toBe('en-IN')
    })
  })

  describe('Feature Detection', () => {
    it('detects SpeechRecognition support gracefully in test environment', () => {
      // In JSDOM by default SpeechRecognition is not defined
      const supported = isSpeechRecognitionSupported()
      expect(typeof supported).toBe('boolean')
    })

    it('detects SpeechSynthesis support gracefully in test environment', () => {
      const supported = isSpeechSynthesisSupported()
      expect(typeof supported).toBe('boolean')
    })
  })

  describe('Transcript to Option Matching', () => {
    const booleanOptions: QuestionOption[] = [
      {
        value: true,
        label: {
          en: 'Yes, permanent resident of Gujarat',
          gu: 'હા, હું ગુજરાતનો કાયમી નિવાસી છું',
          hi: 'हाँ, मैं गुजरात का स्थायी निवासी हूँ',
        },
      },
      {
        value: false,
        label: {
          en: 'No, residing elsewhere',
          gu: 'ના, અન્ય રાજ્યમાં રહું છું',
          hi: 'नहीं, अन्य राज्य में रहता हूँ',
        },
      },
    ]

    const categoryOptions: QuestionOption[] = [
      {
        value: 'farmer',
        label: {
          en: 'Farmer / Agricultural worker',
          gu: 'ખેડૂત / કૃષિ શ્રમિક',
          hi: 'किसान / कृषि श्रमिक',
        },
      },
      {
        value: 'student',
        label: {
          en: 'Student pursuing higher education',
          gu: 'વિદ્યાર્થી (ઉચ્ચ શિક્ષણ)',
          hi: 'विद्यार्थी (उच्च शिक्षा)',
        },
      },
      {
        value: 'senior',
        label: {
          en: 'Senior Citizen (60+ years)',
          gu: 'વરિષ્ઠ નાગરિક (૬૦+ વર્ષ)',
          hi: 'वरिष्ठ नागरिक (60+ वर्ष)',
        },
      },
    ]

    it('matches Gujarati affirmation "હા" to true option', () => {
      const matched = matchTranscriptToOption('હા', booleanOptions, 'gu')
      expect(matched).not.toBeNull()
      expect(matched?.value).toBe(true)
    })

    it('matches English affirmation "yes" to true option', () => {
      const matched = matchTranscriptToOption('yes, I am resident', booleanOptions, 'en')
      expect(matched).not.toBeNull()
      expect(matched?.value).toBe(true)
    })

    it('matches Hindi affirmation "हाँ" to true option', () => {
      const matched = matchTranscriptToOption('हाँ जी', booleanOptions, 'hi')
      expect(matched).not.toBeNull()
      expect(matched?.value).toBe(true)
    })

    it('matches Gujarati negation "ના" to false option', () => {
      const matched = matchTranscriptToOption('ના નથી', booleanOptions, 'gu')
      expect(matched).not.toBeNull()
      expect(matched?.value).toBe(false)
    })

    it('matches English negation "no" to false option', () => {
      const matched = matchTranscriptToOption('no', booleanOptions, 'en')
      expect(matched).not.toBeNull()
      expect(matched?.value).toBe(false)
    })

    it('matches Hindi negation "नहीं" to false option', () => {
      const matched = matchTranscriptToOption('नहीं', booleanOptions, 'hi')
      expect(matched).not.toBeNull()
      expect(matched?.value).toBe(false)
    })

    it('matches category "farmer" / "ખેડૂત"', () => {
      const matchedGu = matchTranscriptToOption('હું ખેડૂત છું', categoryOptions, 'gu')
      expect(matchedGu?.value).toBe('farmer')

      const matchedEn = matchTranscriptToOption('I am a farmer', categoryOptions, 'en')
      expect(matchedEn?.value).toBe('farmer')
    })

    it('returns null on empty string or unrecognized transcript', () => {
      expect(matchTranscriptToOption('', booleanOptions, 'en')).toBeNull()
      expect(matchTranscriptToOption('random gibberish 12345', booleanOptions, 'en')).toBeNull()
    })
  })

  describe('VoiceInputModal Component', () => {
    const mockOptions: QuestionOption[] = [
      {
        value: true,
        label: {
          en: 'Yes, permanent resident',
          gu: 'હા, કાયમી નિવાસી',
          hi: 'हाँ, स्थायी निवासी',
        },
      },
      {
        value: false,
        label: {
          en: 'No',
          gu: 'ના',
          hi: 'नहीं',
        },
      },
    ]

    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('renders modal dialog with question context and honest notice', () => {
      render(
        <JourneyProvider>
          <VoiceInputModal
            isOpen={true}
            onClose={vi.fn()}
            questionTitle="Are you a resident of Gujarat?"
            options={mockOptions}
            onConfirmAnswer={vi.fn()}
            language="en"
          />
        </JourneyProvider>
      )

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Are you a resident of Gujarat?')).toBeInTheDocument()
      expect(screen.getAllByText(/Web Speech Prototype|વેબ સ્પીચ/i).length).toBeGreaterThanOrEqual(1)
    })

    it('calls onClose when close button is clicked', () => {
      const handleClose = vi.fn()
      render(
        <JourneyProvider>
          <VoiceInputModal
            isOpen={true}
            onClose={handleClose}
            questionTitle="Are you a resident of Gujarat?"
            options={mockOptions}
            onConfirmAnswer={vi.fn()}
            language="en"
          />
        </JourneyProvider>
      )

      const closeBtns = screen.getAllByRole('button', { name: /Close|બંધ કરો/i })
      fireEvent.click(closeBtns[0])
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })
})
