import { useState, useRef, useCallback, useEffect } from 'react'
import type { Language } from '../domain/profile.types'
import {
  getSpeechLocale,
  isSpeechRecognitionSupported,
  getSpeechRecognitionConstructor,
} from '../lib/speech'

export type VoiceErrorType =
  | 'not-supported'
  | 'permission-denied'
  | 'no-speech'
  | 'aborted'
  | 'unknown'

export interface UseVoiceInputReturn {
  isSupported: boolean
  isListening: boolean
  transcript: string
  interimTranscript: string
  error: VoiceErrorType | null
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
}

export function useVoiceInput(language: Language = 'en'): UseVoiceInputReturn {
  const isSupported = isSpeechRecognitionSupported()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<VoiceErrorType | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch {
        // Safe ignore
      }
    }
    setIsListening(false)
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
    setError(null)
  }, [])

  const startListening = useCallback(() => {
    resetTranscript()

    if (!isSupported) {
      setError('not-supported')
      return
    }

    const SpeechRec = getSpeechRecognitionConstructor()
    if (!SpeechRec) {
      setError('not-supported')
      return
    }

    try {
      const recognition = new SpeechRec()
      recognition.lang = getSpeechLocale(language)
      recognition.continuous = false
      recognition.interimResults = true
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
        setIsListening(true)
        setError(null)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let currentFinal = ''
        let currentInterim = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i]
          if (item.isFinal) {
            currentFinal += item[0].transcript
          } else {
            currentInterim += item[0].transcript
          }
        }

        if (currentFinal) {
          setTranscript((prev) => (prev ? `${prev} ${currentFinal}` : currentFinal).trim())
        }
        setInterimTranscript(currentInterim.trim())
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        const err = event.error
        if (err === 'not-allowed' || err === 'service-not-allowed') {
          setError('permission-denied')
        } else if (err === 'no-speech') {
          setError('no-speech')
        } else if (err === 'aborted') {
          setError('aborted')
        } else {
          setError('unknown')
        }
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
        setInterimTranscript('')
      }

      recognitionRef.current = recognition
      recognition.start()
    } catch {
      setError('unknown')
      setIsListening(false)
    }
  }, [isSupported, language, resetTranscript])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch {
          // Safe ignore
        }
      }
    }
  }, [])

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  }
}
