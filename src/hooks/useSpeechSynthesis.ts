import { useState, useCallback, useEffect, useRef } from 'react'
import type { Language } from '../domain/profile.types'
import { isSpeechSynthesisSupported, getSpeechLocale } from '../lib/speech'

export interface UseSpeechSynthesisReturn {
  isSupported: boolean
  isSpeaking: boolean
  speak: (text: string, lang?: Language) => void
  stop: () => void
}

export function useSpeechSynthesis(defaultLanguage: Language = 'en'): UseSpeechSynthesisReturn {
  const isSupported = isSpeechSynthesisSupported()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const isSpeakingRef = useRef(false)

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
      } catch {
        // Safe ignore
      }
    }
    setIsSpeaking(false)
    isSpeakingRef.current = false
  }, [])

  const speak = useCallback(
    (text: string, lang: Language = defaultLanguage) => {
      if (!isSupported || !text || typeof window === 'undefined') return

      stop()

      try {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = getSpeechLocale(lang)

        utterance.onstart = () => {
          setIsSpeaking(true)
          isSpeakingRef.current = true
        }

        utterance.onend = () => {
          setIsSpeaking(false)
          isSpeakingRef.current = false
        }

        utterance.onerror = () => {
          setIsSpeaking(false)
          isSpeakingRef.current = false
        }

        window.speechSynthesis.speak(utterance)
      } catch {
        setIsSpeaking(false)
        isSpeakingRef.current = false
      }
    },
    [defaultLanguage, isSupported, stop]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  return {
    isSupported,
    isSpeaking,
    speak,
    stop,
  }
}
