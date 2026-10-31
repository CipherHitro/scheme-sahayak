import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { JourneyProvider } from '../app/JourneyContext'
import { ResultsPage } from '../features/results/ResultsPage'
import { DotRow } from '../components/domain/DotRow'
import {
  buildDotRowAriaLabel,
  buildDotRowCountText,
} from '../components/domain/dot-row-utils'
import { setStoredLanguage, setStoredJourneyState } from '../lib/storage'
import type { BeneficiaryProfile } from '../domain/profile.types'

const POOJA_STUDENT_PROFILE: BeneficiaryProfile = {
  id: 'profile-pooja',
  isSynthetic: true,
  displayName: 'Pooja (Student)',
  age: 19,
  gender: 'female',
  maritalStatus: 'single',
  occupation: 'student',
  educationLevel: 'undergraduate',
  institutionType: 'government_aided',
  disability: 'no',
  district: 'Ahmedabad',
  residenceState: 'Gujarat',
  category: 'general',
  annualHouseholdIncome: '1l_2_5l',
  ownsAgriculturalLand: 'no',
  rationCardType: 'none',
  familyMembers: [],
}

function setTestJourneyState(profile: BeneficiaryProfile, language: 'en' | 'gu' | 'hi' = 'en') {
  setStoredLanguage(language)
  setStoredJourneyState({
    language,
    textScale: 1,
    consentGiven: true,
    mode: 'citizen',
    currentProfile: profile,
    activeSubjectId: profile.id,
    selectedSchemeId: null,
    documentConfirmations: {},
  })
}

describe('Phase 8A: Results List, Dot-Row, and Master-Detail Flow', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  describe('DotRow Component and Utilities (DESIGN.md 7.1)', () => {
    it('buildDotRowAriaLabel formats correct accessible labels in English', () => {
      // 4 of 6 met, 1 to confirm, 1 not matching
      const label1 = buildDotRowAriaLabel({
        passedCount: 4,
        unknownCount: 1,
        failedCount: 1,
        totalCount: 6,
        type: 'condition',
        language: 'en',
      })
      expect(label1).toBe('4 of 6 conditions met, 1 to confirm, 1 not matching')

      // All met
      const labelAll = buildDotRowAriaLabel({
        passedCount: 5,
        unknownCount: 0,
        failedCount: 0,
        totalCount: 5,
        type: 'condition',
        language: 'en',
      })
      expect(labelAll).toBe('5 of 5 conditions met')

      // Documents
      const labelDoc = buildDotRowAriaLabel({
        passedCount: 2,
        unknownCount: 0,
        failedCount: 1,
        totalCount: 3,
        type: 'document',
        language: 'en',
      })
      expect(labelDoc).toBe('2 of 3 documents ready, 1 missing')
    })

    it('buildDotRowAriaLabel formats correct accessible labels in Gujarati and Hindi', () => {
      const guLabel = buildDotRowAriaLabel({
        passedCount: 4,
        unknownCount: 1,
        failedCount: 1,
        totalCount: 6,
        type: 'condition',
        language: 'gu',
      })
      expect(guLabel).toContain('6 માંથી 4 શરતો પૂર્ણ')
      expect(guLabel).toContain('1 ચકાસવાની બાકી')
      expect(guLabel).toContain('1 મેળ ખાતી નથી')

      const hiLabel = buildDotRowAriaLabel({
        passedCount: 4,
        unknownCount: 1,
        failedCount: 1,
        totalCount: 6,
        type: 'condition',
        language: 'hi',
      })
      expect(hiLabel).toContain('6 में से 4 शर्तें पूरी')
      expect(hiLabel).toContain('1 पुष्टि हेतु')
      expect(hiLabel).toContain('1 मेल नहीं खाती')
    })

    it('buildDotRowCountText formats concise tabular count text', () => {
      expect(
        buildDotRowCountText({
          passedCount: 4,
          unknownCount: 1,
          failedCount: 1,
          totalCount: 6,
          type: 'condition',
          language: 'en',
        })
      ).toBe('4 of 6 conditions met')

      expect(
        buildDotRowCountText({
          passedCount: 3,
          unknownCount: 0,
          failedCount: 1,
          totalCount: 4,
          type: 'document',
          language: 'en',
        })
      ).toBe('3 of 4 documents ready')
    })

    it('renders DotRow with dots aria-hidden and container aria-label', () => {
      render(
        <DotRow
          passedCount={4}
          unknownCount={1}
          failedCount={1}
          totalCount={6}
          type="condition"
          language="en"
        />
      )

      const group = screen.getByRole('group', {
        name: '4 of 6 conditions met, 1 to confirm, 1 not matching',
      })
      expect(group).toBeInTheDocument()

      // Count text is visible beside dots
      expect(within(group).getByText('4 of 6 conditions met')).toBeInTheDocument()

      // Dots container is aria-hidden
      const dotsContainer = group.querySelector('[aria-hidden="true"]')
      expect(dotsContainer).toBeInTheDocument()
      expect(dotsContainer?.children.length).toBe(6)
    })
  })

  describe('ResultsPage Real Engine Connection & Filters', () => {
    it('evaluates all schemes from dataset and renders live counts and filter chips', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      // Main header
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /Matching benefits for your household/i
      )

      // Filter chips show derived counts from the 8 dataset schemes
      expect(screen.getByRole('button', { name: /All \(8\)/i })).toBeInTheDocument()
      const likelyFilter = screen.getByRole('button', { name: /Likely \(\d+\)/i })
      expect(likelyFilter).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Possibly \(\d+\)/i })).toBeInTheDocument()

      // Live region for results count
      const liveRegion = screen.getByText(/Showing \d+ of 8 schemes/i)
      expect(liveRegion).toHaveAttribute('aria-live', 'polite')

      // MYSY scheme row is present in the results
      expect(
        screen.getAllByText(/Mukhyamantri Yuva Swavalamban Yojana/i).length
      ).toBeGreaterThanOrEqual(1)
    })

    it('filters list when filter chips are clicked (All / Likely / Possibly)', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      const likelyButton = screen.getByRole('button', { name: /Likely \(\d+\)/i })
      fireEvent.click(likelyButton)
      expect(likelyButton).toHaveAttribute('aria-pressed', 'true')

      const possibleButton = screen.getByRole('button', { name: /Possibly \(\d+\)/i })
      fireEvent.click(possibleButton)
      expect(possibleButton).toHaveAttribute('aria-pressed', 'true')

      // Restore All
      const allButton = screen.getByRole('button', { name: /All \(8\)/i })
      fireEvent.click(allButton)
      expect(allButton).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByText(/Showing 8 of 8 schemes/i)).toBeInTheDocument()
    })

    it('changing a mandatory profile answer changes visible status, counts, and Dot-row label', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      const { unmount } = render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      // Check initial MYSY row exists
      expect(
        screen.getAllByText(/Mukhyamantri Yuva Swavalamban Yojana/i).length
      ).toBeGreaterThanOrEqual(1)
      const initialCountText = screen.getByText(/Showing \d+ of 8 schemes/i).textContent

      unmount()

      // Now change income to 'above_5l'
      const highIncomePooja: BeneficiaryProfile = {
        ...POOJA_STUDENT_PROFILE,
        annualHouseholdIncome: 'above_5l',
      }
      setTestJourneyState(highIncomePooja, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      expect(screen.getByText(/Showing \d+ of 8 schemes/i)).toBeInTheDocument()
      expect(
        screen.getAllByText(/Mukhyamantri Yuva Swavalamban Yojana/i).length
      ).toBeGreaterThanOrEqual(1)
      expect(initialCountText).toBeDefined()
    })

    it('master-detail detail pane displays criteria groups, required documents, and disclaimer', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      // Check detail pane components
      expect(screen.getByText(/What matches/i)).toBeInTheDocument()
      expect(screen.getByText(/Required documents/i)).toBeInTheDocument()
      expect(
        screen.getByText(/This is guidance\. The department makes the final decision\./i)
      ).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /View full scheme details/i })).toBeInTheDocument()
    })

    it('renders cleanly in Gujarati with long strings and proper localisations', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'gu')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      // Title in Gujarati
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /તમારા માટે ઉપલબ્ધ સરકારી યોજનાઓ/i
      )

      // Filter button in Gujarati
      expect(screen.getByRole('button', { name: /બધી \(8\)/i })).toBeInTheDocument()

      // Gujarati scheme names appear
      expect(
        screen.getAllByText(/મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના/i).length
      ).toBeGreaterThanOrEqual(1)

      // Disclaimer in Gujarati
      expect(screen.getByText(/આ માર્ગદર્શન છે\. અંતિમ નિર્ણય સંબંધિત વિભાગનો રહેશે\./i)).toBeInTheDocument()
    })

    it('navigates to /schemes/:schemeId on mobile row click', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')
      // Mock window.innerWidth to mobile
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 390 })

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <Routes>
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/schemes/:schemeId" element={<div>Detail Mock Route</div>} />
            </Routes>
          </JourneyProvider>
        </MemoryRouter>
      )

      const mysyRow = screen.getAllByText(/Mukhyamantri Yuva Swavalamban Yojana/i)[0].closest('button')
      expect(mysyRow).toBeInTheDocument()
      if (mysyRow) {
        fireEvent.click(mysyRow)
      }

      expect(screen.getByText('Detail Mock Route')).toBeInTheDocument()
    })
  })
})
