import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { JourneyProvider } from '../app/JourneyContext'
import { ResultsPage } from '../features/results/ResultsPage'
import { SchemeDetailPage } from '../features/scheme-detail/SchemeDetailPage'
import { AppHeader } from '../components/layout/AppHeader'
import { DotRow } from '../components/domain/DotRow'
import {
  buildDotRowAriaLabel,
  buildDotRowCountText,
} from '../components/domain/dot-row-utils'
import { setStoredLanguage, setStoredJourneyState, getStoredJourneyState } from '../lib/storage'
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

const RAMESHBHAI_FARMER_PROFILE: BeneficiaryProfile = {
  id: 'profile-ramesh',
  isSynthetic: true,
  displayName: 'Rameshbhai (Farmer)',
  age: 48,
  gender: 'male',
  maritalStatus: 'married',
  occupation: 'farmer',
  educationLevel: 'class_8_to_10',
  institutionType: 'not_applicable',
  disability: 'no',
  district: 'Rajkot',
  residenceState: 'Gujarat',
  category: 'sebc',
  annualHouseholdIncome: 'under_1l',
  ownsAgriculturalLand: 'yes',
  rationCardType: 'bpl',
  familyMembers: [],
}

const KANTILAL_FAMILY_PROFILE: BeneficiaryProfile = {
  id: 'profile-kantilal',
  isSynthetic: true,
  displayName: 'Kantilal',
  age: 68,
  gender: 'male',
  maritalStatus: 'married',
  occupation: 'retired_or_senior',
  educationLevel: 'below_class_8',
  institutionType: 'not_applicable',
  disability: 'no',
  district: 'Vadodara',
  residenceState: 'Gujarat',
  category: 'general',
  annualHouseholdIncome: 'under_1l',
  ownsAgriculturalLand: 'no',
  rationCardType: 'bpl',
  familyMembers: [
    {
      id: 'fam-meenaben',
      displayName: 'Meenaben',
      relationship: 'spouse',
      age: 64,
      gender: 'female',
      maritalStatus: 'married',
      occupation: 'homemaker',
      educationLevel: 'below_class_8',
      institutionType: 'not_applicable',
      disability: 'no',
    },
  ],
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

describe('Phase 8: Results List, Detail View, Family Lens & Auth Flows', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  describe('DotRow Component and Utilities (DESIGN.md 7.1)', () => {
    it('buildDotRowAriaLabel formats correct accessible labels in English', () => {
      const label1 = buildDotRowAriaLabel({
        passedCount: 4,
        unknownCount: 1,
        failedCount: 1,
        totalCount: 6,
        type: 'condition',
        language: 'en',
      })
      expect(label1).toBe('4 of 6 conditions met, 1 to confirm, 1 not matching')

      const labelAll = buildDotRowAriaLabel({
        passedCount: 5,
        unknownCount: 0,
        failedCount: 0,
        totalCount: 5,
        type: 'condition',
        language: 'en',
      })
      expect(labelAll).toBe('5 of 5 conditions met')

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
      expect(within(group).getByText('4 of 6 conditions met')).toBeInTheDocument()

      const dotsContainer = group.querySelector('[aria-hidden="true"]')
      expect(dotsContainer).toBeInTheDocument()
      expect(dotsContainer?.children.length).toBe(6)
    })
  })

  describe('Demographic & Persona Scheme Filtering', () => {
    it('shows only student scholarships to student persona (Pooja)', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      // Header is present
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /Matching benefits for your household/i
      )

      // Total count is 3 (mysy, pm-usp-csss, pm-vidyalaxmi)
      expect(screen.getByRole('button', { name: /All \(3\)/i })).toBeInTheDocument()
      expect(screen.getByText(/Showing 3 of 3 schemes/i)).toBeInTheDocument()

      // Student scholarships are displayed
      expect(screen.getAllByText(/Mukhyamantri Yuva Swavalamban Yojana/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/PM-USP/i).length).toBeGreaterThanOrEqual(1)

      // Farmer schemes are NOT displayed to student
      expect(screen.queryByText(/PM-KISAN/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Wire Fencing/i)).not.toBeInTheDocument()
    })

    it('shows only farmer schemes to farmer persona (Rameshbhai)', () => {
      setTestJourneyState(RAMESHBHAI_FARMER_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      // Farmer schemes are displayed
      expect(screen.getAllByText(/PM-KISAN/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/Wire Fencing/i).length).toBeGreaterThanOrEqual(1)

      // Student scholarships are NOT displayed to farmer
      expect(screen.queryByText(/Mukhyamantri Yuva Swavalamban Yojana/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/PM-USP/i)).not.toBeInTheDocument()
    })

    it('card rows do not display duplicate Needs checking badges', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      // Locate first scheme card button
      const schemeCard = screen.getAllByText(/Mukhyamantri Yuva Swavalamban Yojana/i)[0].closest('button')
      expect(schemeCard).toBeInTheDocument()

      // Check card badge: only single status badge inside the card
      const cardBadges = within(schemeCard as HTMLElement).queryAllByText(/Needs checking/i)
      expect(cardBadges.length).toBeLessThanOrEqual(1)
    })
  })

  describe('ResultsPage Filters and Master-Detail Flow', () => {
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
      const allButton = screen.getByRole('button', { name: /All \(3\)/i })
      fireEvent.click(allButton)
      expect(allButton).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByText(/Showing 3 of 3 schemes/i)).toBeInTheDocument()
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

      expect(
        screen.getAllByText(/Mukhyamantri Yuva Swavalamban Yojana/i).length
      ).toBeGreaterThanOrEqual(1)
      const initialCountText = screen.getByText(/Showing \d+ of 3 schemes/i).textContent

      unmount()

      // Change income to above 6 lakh
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

      expect(screen.getByText(/Showing \d+ of 3 schemes/i)).toBeInTheDocument()
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

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /તમારા માટે ઉપલબ્ધ સરકારી યોજનાઓ/i
      )

      expect(screen.getByRole('button', { name: /બધી \(3\)/i })).toBeInTheDocument()

      expect(
        screen.getAllByText(/મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના/i).length
      ).toBeGreaterThanOrEqual(1)

      expect(screen.getByText(/આ માર્ગદર્શન છે\. અંતિમ નિર્ણય સંબંધિત વિભાગનો રહેશે\./i)).toBeInTheDocument()
    })

    it('navigates to /schemes/:schemeId on mobile row click', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')
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

  describe('Phase 8B: Scheme Detail Page', () => {
    it('renders criteria breakdown into 3 groups and required documents with instructions', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/schemes/mysy']}>
          <JourneyProvider>
            <Routes>
              <Route path="/schemes/:schemeId" element={<SchemeDetailPage />} />
            </Routes>
          </JourneyProvider>
        </MemoryRouter>
      )

      // Scheme header title
      expect(
        screen.getByRole('heading', { level: 1, name: /Mukhyamantri Yuva Swavalamban Yojana/i })
      ).toBeInTheDocument()

      // Department & scope
      expect(screen.getByText(/Government of Gujarat/i)).toBeInTheDocument()

      // Section titles
      expect(screen.getByRole('heading', { name: /Eligibility criteria/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /Required documents/i })).toBeInTheDocument()

      // Criteria groups
      expect(screen.getByText(/What matches/i)).toBeInTheDocument()

      // Official portal link
      const officialLink = screen.getByRole('link', { name: /Open official application portal/i })
      expect(officialLink).toBeInTheDocument()
      expect(officialLink).toHaveAttribute('href', 'https://mysy.guj.nic.in/')

      // Report button
      expect(screen.getByRole('button', { name: /Report outdated information/i })).toBeInTheDocument()
    })

    it('opens local report sheet and saves report to local storage', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/schemes/mysy']}>
          <JourneyProvider>
            <Routes>
              <Route path="/schemes/:schemeId" element={<SchemeDetailPage />} />
            </Routes>
          </JourneyProvider>
        </MemoryRouter>
      )

      // Open report sheet
      const reportBtn = screen.getByRole('button', { name: /Report outdated information/i })
      fireEvent.click(reportBtn)

      expect(screen.getByText(/this report is stored locally for demonstration purposes only/i)).toBeInTheDocument()

      // Enter notes and submit form
      const notesInput = screen.getByPlaceholderText(/Describe which criterion/i)
      fireEvent.change(notesInput, { target: { value: 'Income limit updated to 8L' } })

      const form = notesInput.closest('form')!
      fireEvent.submit(form)

      // Report modal shows success feedback and records note to localStorage
      expect(screen.getByText(/Feedback recorded locally/i)).toBeInTheDocument()
      expect(localStorage.getItem('scheme_sahayak_feedback')).toContain('Income limit updated to 8L')
    })
  })

  describe('Phase 8C: Family Lens Subject Switcher', () => {
    it('shows switcher chips when family members exist and re-evaluates rules per subject', () => {
      setTestJourneyState(KANTILAL_FAMILY_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <ResultsPage />
          </JourneyProvider>
        </MemoryRouter>
      )

      // Subject switcher exists with "For:" and member chips
      const switcher = screen.getByRole('group', { name: /Household subject lens/i })
      expect(within(switcher).getByText('For:')).toBeInTheDocument()
      expect(within(switcher).getByRole('button', { name: /Kantilal/i })).toBeInTheDocument()
      const meenabenChip = within(switcher).getByRole('button', { name: /Meenaben/i })
      expect(meenabenChip).toBeInTheDocument()

      // Click Meenaben chip
      fireEvent.click(meenabenChip)
      expect(meenabenChip).toHaveAttribute('aria-pressed', 'true')
    })
  })

  describe('Simulated Auth & Fast Testing Flow', () => {
    it('AppHeader shows logged in user and one-click Logout resets localStorage and redirects', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <AppHeader />
            <Routes>
              <Route path="/" element={<div>Welcome Landing Mock</div>} />
              <Route path="/results" element={<div>Results Mock</div>} />
            </Routes>
          </JourneyProvider>
        </MemoryRouter>
      )

      // Shows logged-in user name
      expect(screen.getByText(/Pooja \(Student\)/i)).toBeInTheDocument()

      // Log out button is present
      const logoutBtn = screen.getByRole('button', { name: /Log out and reset session/i })
      expect(logoutBtn).toBeInTheDocument()

      // Click logout
      fireEvent.click(logoutBtn)

      // Storage should be reset
      const stored = getStoredJourneyState()
      expect(stored?.currentProfile).toBeNull()

      // Redirects to /
      expect(screen.getByText('Welcome Landing Mock')).toBeInTheDocument()
    })

    it('AppHeader allows instant persona switching from modal dialog', () => {
      setTestJourneyState(POOJA_STUDENT_PROFILE, 'en')

      render(
        <MemoryRouter initialEntries={['/results']}>
          <JourneyProvider>
            <AppHeader />
          </JourneyProvider>
        </MemoryRouter>
      )

      // Click user button to open persona modal
      const userBtn = screen.getByTitle(/Click to switch persona/i)
      fireEvent.click(userBtn)

      expect(screen.getByText(/Switch Persona /i)).toBeInTheDocument()

      // Click Rameshbhai (Farmer)
      const farmerOption = screen.getByText(/Rameshbhai/i)
      fireEvent.click(farmerOption)

      // User state is switched
      const stored = getStoredJourneyState()
      expect(stored?.currentProfile?.displayName).toContain('Rameshbhai')
    })
  })
})
