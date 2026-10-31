import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { JourneyProvider } from '../app/JourneyContext'
import { ProfilePage } from '../features/profile/ProfilePage'
import { SCHEMES_DATASET } from '../data/schemes'
import { getActiveQuestions, getReferencedRuleFields, QUESTION_DEFS } from '../domain/question.defs'
import type { BeneficiaryProfile } from '../domain/profile.types'

function MockConsentPage() {
  return <div data-testid="consent-screen">Consent Screen</div>
}

function MockResultsPage() {
  return <div data-testid="results-screen">Results Screen</div>
}

function renderProfileFlow(initialEntry = '/profile') {
  return render(
    <JourneyProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/consent" element={<MockConsentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/results" element={<MockResultsPage />} />
        </Routes>
      </MemoryRouter>
    </JourneyProvider>
  )
}

describe('Phase 7: Guided Profile Flow', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  describe('Question Derivation & N Recomputation', () => {
    it('only includes fields referenced by loaded schemes', () => {
      const referenced = getReferencedRuleFields(SCHEMES_DATASET)
      expect(referenced.has('residenceState')).toBe(true)
      expect(referenced.has('occupation')).toBe(true)
      expect(referenced.has('annualHouseholdIncome')).toBe(true)
      expect(referenced.has('educationLevel')).toBe(true)
      expect(referenced.has('ownsAgriculturalLand')).toBe(true)
    })

    it('dynamically activates conditional questions and recomputes N', () => {
      const baseProfile: Partial<BeneficiaryProfile> = {
        residenceState: 'Gujarat',
      }

      // Initial questions without student or farmer occupation
      const initialQuestions = getActiveQuestions(SCHEMES_DATASET, baseProfile)
      const initialFieldNames = initialQuestions.map((q) => q.field)
      expect(initialFieldNames).not.toContain('educationLevel')
      expect(initialFieldNames).not.toContain('ownsAgriculturalLand')
      const initialN = initialQuestions.length

      // When occupation is set to student
      const studentProfile: Partial<BeneficiaryProfile> = {
        ...baseProfile,
        occupation: 'student',
      }
      const studentQuestions = getActiveQuestions(SCHEMES_DATASET, studentProfile)
      expect(studentQuestions.map((q) => q.field)).toContain('educationLevel')
      expect(studentQuestions.map((q) => q.field)).not.toContain('ownsAgriculturalLand')
      expect(studentQuestions.length).toBe(initialN + 1)

      // When occupation is set to farmer
      const farmerProfile: Partial<BeneficiaryProfile> = {
        ...baseProfile,
        occupation: 'farmer',
      }
      const farmerQuestions = getActiveQuestions(SCHEMES_DATASET, farmerProfile)
      expect(farmerQuestions.map((q) => q.field)).toContain('ownsAgriculturalLand')
      expect(farmerQuestions.map((q) => q.field)).not.toContain('educationLevel')
      expect(farmerQuestions.length).toBe(initialN + 1)
    })

    it('contains "I don\'t know" option on all questions', () => {
      for (const q of QUESTION_DEFS) {
        const hasDontKnow = q.options.some(
          (opt) => opt.value === 'unknown' || opt.value === null
        )
        expect(hasDontKnow).toBe(true)
      }
    })
  })

  describe('Interactive Profile Questions & Navigation', () => {
    it('renders first question with progress bar and answer options', () => {
      renderProfileFlow()

      expect(screen.getByRole('progressbar')).toBeDefined()
      expect(screen.getByText(/Question 1\//i)).toBeDefined()

      // Residence State question options
      const gujaratOption = screen.getByRole('radio', { name: /Gujarat|ગુજરાત|गुजरात/i })
      expect(gujaratOption).toBeDefined()
    })

    it('clicking an answer selects it and enables Next button', () => {
      renderProfileFlow()

      const nextBtn = screen.getByRole('button', { name: /Next question|આગળનો પ્રશ્ન|अगला प्रश्न/i })
      expect(nextBtn).toBeDefined()

      // Select Gujarat option
      const gujaratOption = screen.getByRole('radio', { name: /Gujarat|ગુજરાત|गुजरात/i })
      fireEvent.click(gujaratOption)
      expect(gujaratOption).toHaveAttribute('aria-checked', 'true')

      // Click Next advances to question 2
      fireEvent.click(nextBtn)
      expect(screen.getByText(/Question 2\//i)).toBeDefined()
    })

    it('preserves answers when navigating back and forward', () => {
      renderProfileFlow()

      // Answer question 1
      const gujaratOption = screen.getByRole('radio', { name: /Gujarat|ગુજરાત|गुजरात/i })
      fireEvent.click(gujaratOption)

      const nextBtn = screen.getByRole('button', { name: /Next question|આગળનો પ્રશ્ન|अगला प्रश्न/i })
      fireEvent.click(nextBtn)

      // Now on Question 2
      expect(screen.getByText(/Question 2\//i)).toBeDefined()

      // Click Back (use first back button found)
      const backBtn = screen.getAllByRole('button', { name: /Back|પાછા|वापस/i })[0]
      fireEvent.click(backBtn)

      // Back on Question 1, answer is preserved
      expect(screen.getByText(/Question 1\//i)).toBeDefined()
      const restoredOption = screen.getByRole('radio', { name: /Gujarat|ગુજરાત|गुजरात/i })
      expect(restoredOption).toHaveAttribute('aria-checked', 'true')
    })

    it('clicking Back on question 1 navigates to /consent', () => {
      renderProfileFlow()

      const backBtn = screen.getAllByRole('button', { name: /Back|પાછા|वापस/i })[0]
      fireEvent.click(backBtn)

      expect(screen.getByTestId('consent-screen')).toBeDefined()
    })
  })

  describe('Profile Review & Submission', () => {
    it('allows editing an answer directly from the review screen and returning', () => {
      renderProfileFlow()

      // Answer questions sequentially until review screen is reached
      let safetyCounter = 0
      while (
        screen.queryByRole('heading', {
          name: /Review your profile|તમારા જવાબોની ચકાસણી કરો|अपने उत्तरों की समीक्षा करें/i,
        }) === null &&
        safetyCounter < 20
      ) {
        safetyCounter++
        const radios = screen.getAllByRole('radio')
        if (radios.length > 0) {
          fireEvent.click(radios[0])
        }

        const actionBtns = screen.getAllByRole('button', {
          name: /Next question|Review answers|આગળનો પ્રશ્ન|જવાબો ચકાસો|अगला प्रश्न|उत्तरों की समीक्षा करें/i,
        })
        fireEvent.click(actionBtns[0])
      }

      // Review screen is now visible
      expect(
        screen.getByRole('heading', {
          name: /Review your profile|તમારા જવાબોની ચકાસણી કરો|अपने उत्तरों की समीक्षा करें/i,
        })
      ).toBeDefined()

      // Click Edit on the first ledger row
      const editButtons = screen.getAllByRole('button', {
        name: /Edit|સુધારો|बदलें/i,
      })
      expect(editButtons.length).toBeGreaterThan(0)
      fireEvent.click(editButtons[0])

      // Returns to question 1
      expect(screen.getByText(/Question 1\//i)).toBeDefined()

      // Click next returns straight back to review
      const nextBtn = screen.getByRole('button', {
        name: /Next question|Review answers|આગળનો પ્રશ્ન|જવાબો ચકાસો|अगला प्रश्न|उत्तरों की समीक्षा करें/i,
      })
      fireEvent.click(nextBtn)

      // Back on review screen
      expect(
        screen.getByRole('heading', {
          name: /Review your profile|તમારા જવાબોની ચકાસણી કરો|अपने उत्तरों की समीक्षा करें/i,
        })
      ).toBeDefined()
    })

    it('submitting profile from review navigates to /results', () => {
      renderProfileFlow()

      // Fast-forward to review by answering questions
      let safetyCounter = 0
      while (
        screen.queryByRole('heading', {
          name: /Review your profile|તમારા જવાબોની ચકાસણી કરો|अपने उत्तरોની समीक्षा करें/i,
        }) === null &&
        safetyCounter < 20
      ) {
        safetyCounter++
        const radios = screen.getAllByRole('radio')
        if (radios.length > 0) fireEvent.click(radios[0])
        const actionBtns = screen.getAllByRole('button', {
          name: /Next question|Review answers|આગળનો પ્રશ્ન|જવાબો ચકાસો|अगલા प्रश्न|उत्तरों की समीक्षा करें/i,
        })
        fireEvent.click(actionBtns[0])
      }

      // Find submit button on review screen
      const submitBtn = screen.getAllByRole('button', {
        name: /View matched schemes|મેળ ખાતી યોજનાઓ જુઓ|योजना परिणाम देखें/i,
      })[0]

      fireEvent.click(submitBtn)
      expect(screen.getByTestId('results-screen')).toBeDefined()
    })
  })
})
