import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { JourneyProvider } from '../app/JourneyContext'
import { useJourney } from '../app/journey-context'
import {
  getStoredLanguage,
  setStoredLanguage,
  getStoredTextScale,
  setStoredTextScale,
  getStoredJourneyState,
  setStoredJourneyState,
  clearJourneyStorage,
} from '../lib/storage'
import { WelcomePage } from '../features/welcome/WelcomePage'
import { ConsentPage } from '../features/consent/ConsentPage'
import { ProfilePage } from '../features/profile/ProfilePage'
import { ResultsPage } from '../features/results/ResultsPage'
import { SchemeDetailPage } from '../features/scheme-detail/SchemeDetailPage'
import { DocumentScanPage } from '../features/documents/DocumentScanPage'
import { ChecklistPage } from '../features/checklist/ChecklistPage'
import { HelperPage } from '../features/helper/HelperPage'
import { FamilyDetailPage } from '../features/helper/FamilyDetailPage'

describe('Phase 3 — Storage Helpers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('reads and writes language with safe fallback', () => {
    expect(getStoredLanguage('gu')).toBe('gu')
    setStoredLanguage('hi')
    expect(getStoredLanguage()).toBe('hi')
    setStoredLanguage('en')
    expect(getStoredLanguage()).toBe('en')
  })

  it('reads and writes textScale with safe fallback', () => {
    expect(getStoredTextScale(1)).toBe(1)
    setStoredTextScale(1.125)
    expect(getStoredTextScale()).toBe(1.125)
    setStoredTextScale(1.25)
    expect(getStoredTextScale()).toBe(1.25)
  })

  it('stores and clears journey state', () => {
    setStoredJourneyState({ consentGiven: true, mode: 'helper' })
    const state = getStoredJourneyState()
    expect(state?.consentGiven).toBe(true)
    expect(state?.mode).toBe('helper')

    clearJourneyStorage()
    expect(getStoredJourneyState()).toBeNull()
  })
})

describe('Phase 3 — Journey State Management', () => {
  function StateProbe() {
    const {
      language,
      setLanguage,
      textScale,
      setTextScale,
      consentGiven,
      setConsentGiven,
      currentProfile,
      loadSamplePersona,
      resetJourney,
    } = useJourney()

    return (
      <div>
        <span data-testid="lang-val">{language}</span>
        <span data-testid="scale-val">{textScale}</span>
        <span data-testid="consent-val">{consentGiven ? 'yes' : 'no'}</span>
        <span data-testid="profile-name">{currentProfile?.displayName ?? 'none'}</span>

        <button onClick={() => setLanguage('hi')}>Set Hindi</button>
        <button onClick={() => setTextScale(1.25)}>Set Large Scale</button>
        <button onClick={() => setConsentGiven(true)}>Set Consent</button>
        <button onClick={() => loadSamplePersona('farmer')}>Load Farmer</button>
        <button onClick={resetJourney}>Reset</button>
      </div>
    )
  }

  it('updates state values and sample personas correctly', () => {
    render(
      <JourneyProvider>
        <StateProbe />
      </JourneyProvider>
    )

    expect(screen.getByTestId('consent-val').textContent).toBe('no')
    expect(screen.getByTestId('profile-name').textContent).toBe('none')

    fireEvent.click(screen.getByRole('button', { name: 'Set Hindi' }))
    expect(screen.getByTestId('lang-val').textContent).toBe('hi')

    fireEvent.click(screen.getByRole('button', { name: 'Set Large Scale' }))
    expect(screen.getByTestId('scale-val').textContent).toBe('1.25')

    fireEvent.click(screen.getByRole('button', { name: 'Load Farmer' }))
    expect(screen.getByTestId('consent-val').textContent).toBe('yes')
    expect(screen.getByTestId('profile-name').textContent).toContain('Farmer')

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByTestId('consent-val').textContent).toBe('no')
    expect(screen.getByTestId('profile-name').textContent).toBe('none')
  })
})

describe('Phase 3 — Route Placeholders & Deep-Link Recovery', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders WelcomePage on /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <JourneyProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Route: \/ /i)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /મારા માટે યોજનાઓ શોધો|Find benefits for me/i })[0]).toBeInTheDocument()
  })

  it('renders ConsentPage on /consent', () => {
    render(
      <MemoryRouter initialEntries={['/consent']}>
        <JourneyProvider>
          <Routes>
            <Route path="/consent" element={<ConsentPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Route: \/consent/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders ProfilePage on /profile', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <JourneyProvider>
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Route: \/profile/i)).toBeInTheDocument()
    expect(screen.getByText(/Tell us about your household/i)).toBeInTheDocument()
  })

  it('deep-link refresh on /results without profile does not crash and renders recovery card', () => {
    render(
      <MemoryRouter initialEntries={['/results']}>
        <JourneyProvider>
          <Routes>
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Profile answers not found|પ્રોફાઇલ જવાબો મળ્યા નથી/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Load sample student profile|વિદ્યાર્થી નમૂનો લોડ કરો/i })).toBeInTheDocument()
  })

  it('deep-link refresh on /schemes/:schemeId without profile renders recovery card', () => {
    render(
      <MemoryRouter initialEntries={['/schemes/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/schemes/:schemeId" element={<SchemeDetailPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Profile answers not found|પ્રોફાઇલ જવાબો મળ્યા નથી/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Load sample student profile|વિદ્યાર્થી નમૂનો લોડ કરો/i })).toBeInTheDocument()
  })

  it('deep-link refresh on /documents/:schemeId without profile renders recovery card', () => {
    render(
      <MemoryRouter initialEntries={['/documents/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/documents/:schemeId" element={<DocumentScanPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Profile answers not found|પ્રોફાઇલ જવાબો મળ્યા નથી/i)).toBeInTheDocument()
  })

  it('deep-link refresh on /checklist/:schemeId without profile renders recovery card', () => {
    render(
      <MemoryRouter initialEntries={['/checklist/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/checklist/:schemeId" element={<ChecklistPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Profile answers not found|પ્રોફાઇલ જવાબો મળ્યા નથી/i)).toBeInTheDocument()
  })

  it('renders HelperPage on /helper', () => {
    render(
      <MemoryRouter initialEntries={['/helper']}>
        <JourneyProvider>
          <Routes>
            <Route path="/helper" element={<HelperPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Route: \/helper/i)).toBeInTheDocument()
    expect(screen.getByText(/રમેશભાઈ પટેલ|Rameshbhai Patel/i)).toBeInTheDocument()
  })

  it('renders FamilyDetailPage on /helper/families/:id', () => {
    render(
      <MemoryRouter initialEntries={['/helper/families/fam-patel']}>
        <JourneyProvider>
          <Routes>
            <Route path="/helper/families/:id" element={<FamilyDetailPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Route: \/helper\/families\/fam-patel/i)).toBeInTheDocument()
    expect(screen.getByText(/રમેશભાઈ પટેલ|Rameshbhai Patel/i)).toBeInTheDocument()
  })
})
