import { beforeEach, describe, expect, it } from 'vitest'
import {
  CURRENT_STORAGE_VERSION,
  STORAGE_KEYS,
  getStoredJourneyState,
  setStoredJourneyState,
  clearJourneyStorage,
} from '../lib/storage'
import type { JourneyState } from '../domain/journey.types'

describe('Storage Schema Versioning & Resilient Discard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('persists and retrieves valid journey state with schema envelope', () => {
    const mockState: Partial<JourneyState> = {
      consentGiven: true,
      mode: 'citizen',
      activeSubjectId: 'sample-student',
      documentConfirmations: {
        income_certificate: true,
      },
    }

    setStoredJourneyState(mockState)

    // Check that stored string in localStorage is enveloped with CURRENT_STORAGE_VERSION
    const rawStored = localStorage.getItem(STORAGE_KEYS.JOURNEY)
    expect(rawStored).toBeTruthy()

    const parsed = JSON.parse(rawStored!)
    expect(parsed.version).toBe(CURRENT_STORAGE_VERSION)
    expect(parsed.data.consentGiven).toBe(true)
    expect(parsed.data.activeSubjectId).toBe('sample-student')

    // Check retrieval
    const retrieved = getStoredJourneyState()
    expect(retrieved).not.toBeNull()
    expect(retrieved?.consentGiven).toBe(true)
    expect(retrieved?.activeSubjectId).toBe('sample-student')
    expect(retrieved?.documentConfirmations?.income_certificate).toBe(true)
  })

  it('silently discards corrupt JSON and starts clean', () => {
    localStorage.setItem(STORAGE_KEYS.JOURNEY, '{ corrupt json invalid: 123,')

    const retrieved = getStoredJourneyState()
    expect(retrieved).toBeNull()
    // Verifies it was wiped clean from storage
    expect(localStorage.getItem(STORAGE_KEYS.JOURNEY)).toBeNull()
  })

  it('silently discards legacy unversioned data and starts clean', () => {
    // Old legacy state without envelope
    localStorage.setItem(
      STORAGE_KEYS.JOURNEY,
      JSON.stringify({ consentGiven: true, mode: 'citizen' })
    )

    const retrieved = getStoredJourneyState()
    expect(retrieved).toBeNull()
    expect(localStorage.getItem(STORAGE_KEYS.JOURNEY)).toBeNull()
  })

  it('silently discards data with mismatched schema version and starts clean', () => {
    // Old version 0 envelope
    localStorage.setItem(
      STORAGE_KEYS.JOURNEY,
      JSON.stringify({
        version: 0,
        data: { consentGiven: true, mode: 'citizen' },
      })
    )

    const retrieved = getStoredJourneyState()
    expect(retrieved).toBeNull()
    expect(localStorage.getItem(STORAGE_KEYS.JOURNEY)).toBeNull()
  })

  it('silently discards invalid data shape inside envelope', () => {
    localStorage.setItem(
      STORAGE_KEYS.JOURNEY,
      JSON.stringify({
        version: CURRENT_STORAGE_VERSION,
        data: 'not an object',
      })
    )

    const retrieved = getStoredJourneyState()
    expect(retrieved).toBeNull()
    expect(localStorage.getItem(STORAGE_KEYS.JOURNEY)).toBeNull()
  })

  it('clears stored journey state completely via clearJourneyStorage', () => {
    setStoredJourneyState({ consentGiven: true })
    expect(localStorage.getItem(STORAGE_KEYS.JOURNEY)).not.toBeNull()

    clearJourneyStorage()
    expect(localStorage.getItem(STORAGE_KEYS.JOURNEY)).toBeNull()
  })
})
