import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { JourneyProvider } from '../app/JourneyContext'
import { WelcomePage } from '../features/welcome/WelcomePage'
import { ConsentPage } from '../features/consent/ConsentPage'

// Simple mock destination components
function MockProfilePage() {
  return <div data-testid="profile-page">Profile Questions Screen</div>
}

function MockResultsPage() {
  return <div data-testid="results-page">Matching Results Screen</div>
}

function MockHelperPage() {
  return <div data-testid="helper-page">Helper Mode Screen</div>
}

function renderFlow(initialEntry = '/') {
  return render(
    <JourneyProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/consent" element={<ConsentPage />} />
          <Route path="/profile" element={<MockProfilePage />} />
          <Route path="/results" element={<MockResultsPage />} />
          <Route path="/helper" element={<MockHelperPage />} />
        </Routes>
      </MemoryRouter>
    </JourneyProvider>
  )
}

describe('Phase 6: Welcome and Consent Flow', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  describe('Welcome Screen', () => {
    it('renders task-first headline, description and primary/secondary actions', () => {
      renderFlow('/')

      // Primary button
      const findBenefitsBtns = screen.getAllByRole('button', {
        name: /Find benefits for me|મારા માટે યોજનાઓ શોધો|मेरे लिए योजनाएं खोजें/i,
      })
      expect(findBenefitsBtns.length).toBeGreaterThanOrEqual(1)

      // Secondary helper button
      const helperBtn = screen.getByRole('button', {
        name: /Help someone else|બીજા કોઈને મદદ કરો|किसी अन्य की सहायता करें/i,
      })
      expect(helperBtn).toBeDefined()

      // Ghost Try a sample button directly under actions
      const trySampleBtn = screen.getByRole('button', {
        name: /Try a sample|નમૂના પ્રોફાઇલ સાથે અજમાવો|एक नमूना प्रोफ़ाइल आज़माएं/i,
      })
      expect(trySampleBtn).toBeDefined()

      // Privacy reassurance line with LockKey icon
      expect(
        screen.getByText(/We never ask for your OTP|અમે ક્યારેય.*OTP|हम कभी.*OTP/i)
      ).toBeDefined()
    })

    it('navigates from Welcome to Consent when primary button is clicked', () => {
      renderFlow('/')

      const findBenefitsBtns = screen.getAllByRole('button', {
        name: /Find benefits for me|મારા માટે યોજનાઓ શોધો|मेरे लिए योजनाएं खोजें/i,
      })
      fireEvent.click(findBenefitsBtns[0])

      // Should now be on Consent route
      expect(screen.getByText(/Route: \/consent/i)).toBeDefined()
    })

    it('navigates from Welcome to Helper when secondary button is clicked', () => {
      renderFlow('/')

      const helperBtn = screen.getByRole('button', {
        name: /Help someone else|બીજા કોઈને મદદ કરો|किसी अन्य की सहायता करें/i,
      })
      fireEvent.click(helperBtn)

      expect(screen.getByTestId('helper-page')).toBeDefined()
    })

    it('reveals quick sample persona options when Try a Sample is clicked', () => {
      renderFlow('/')

      expect(screen.queryByTestId('quick-samples-panel')).toBeNull()

      const trySampleBtn = screen.getByRole('button', {
        name: /Try a sample|નમૂના પ્રોફાઇલ સાથે અજમાવો|एक नमूना प्रोफ़ाइल आज़माएं/i,
      })
      fireEvent.click(trySampleBtn)

      // Now the quick samples panel is visible
      const samplesPanel = screen.getByTestId('quick-samples-panel')
      expect(samplesPanel).toBeDefined()

      // Shows Student, Farmer, Senior sample buttons
      expect(
        screen.getByRole('button', {
          name: /Pooja|પૂજા|पूजा/i,
        })
      ).toBeDefined()
      expect(
        screen.getByRole('button', {
          name: /Rameshbhai|રમેશભાઈ|रमेशभाई/i,
        })
      ).toBeDefined()
      expect(
        screen.getByRole('button', {
          name: /Kantilal|કાંતિલાલ|कांतिलाल/i,
        })
      ).toBeDefined()
    })

    it('clicking a sample persona loads it and navigates to Consent', () => {
      renderFlow('/')

      const trySampleBtn = screen.getByRole('button', {
        name: /Try a sample|નમૂના પ્રોફાઇલ સાથે અજમાવો|एक नमूना प्रोफ़ाइल आज़માएं/i,
      })
      fireEvent.click(trySampleBtn)

      const studentBtn = screen.getByRole('button', {
        name: /Pooja|પૂજા|पूजा/i,
      })
      fireEvent.click(studentBtn)

      // Navigated to consent
      expect(screen.getByText(/Route: \/consent/i)).toBeDefined()
    })
  })

  describe('Consent Screen & Gating', () => {
    it('renders 4 consent pillars: What we ask, What we do, What we never do, How to clear', () => {
      renderFlow('/consent')

      expect(screen.getByText(/Route: \/consent/i)).toBeDefined()

      // Check all 4 pillar headings exist
      expect(
        screen.getByRole('heading', { name: /What we ask|અમે શું પૂછીએ છીએ|हम क्या पूछते हैं/i })
      ).toBeDefined()
      expect(
        screen.getByRole('heading', { name: /What we do|અમે તેનો શું ઉપયોગ કરીએ છીએ|हम इसका क्या उपयोग करते हैं/i })
      ).toBeDefined()
      expect(
        screen.getByRole('heading', { name: /What we never do|અમે શું ક્યારેય નથી કરતા|हम क्या कभी नहीं करते/i })
      ).toBeDefined()
      expect(
        screen.getByRole('heading', { name: /How to clear|ડેટા કેવી રીતે સાફ કરવો|डेटा कैसे साफ़ करें/i })
      ).toBeDefined()
    })

    it('enforces consent gating: Continue button is disabled until checkbox is checked', () => {
      renderFlow('/consent')

      const continueBtns = screen.getAllByRole('button', {
        name: /Continue|આગળ વધો|जारी रखें/i,
      })
      // Both main and sticky bottom continue buttons should be disabled initially
      for (const btn of continueBtns) {
        expect(btn).toBeDisabled()
      }

      // Find the checkbox
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()

      // Click to agree
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()

      // Continue button must now be enabled
      for (const btn of continueBtns) {
        expect(btn).not.toBeDisabled()
      }

      // Uncheck again
      fireEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
      for (const btn of continueBtns) {
        expect(btn).toBeDisabled()
      }
    })

    it('citizen manual flow: Consent checked -> navigates to /profile', () => {
      renderFlow('/')

      // Start regular citizen flow
      const findBenefitsBtns = screen.getAllByRole('button', {
        name: /Find benefits for me|મારા માટે યોજનાઓ શોધો|मेरे लिए योजनाएं खोजें/i,
      })
      fireEvent.click(findBenefitsBtns[0])

      // On consent
      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)

      const continueBtns = screen.getAllByRole('button', {
        name: /Continue|આગળ વધો|जारी रखें/i,
      })
      fireEvent.click(continueBtns[0])

      // Manual flow goes to profile questions
      expect(screen.getByTestId('profile-page')).toBeDefined()
    })

    it('sample persona flow: choosing sample persona -> Consent -> straight to /results', () => {
      renderFlow('/')

      // Pick sample student from quick panel
      const trySampleBtn = screen.getByRole('button', {
        name: /Try a sample|નમૂના પ્રોફાઇલ સાથે અજમાવો|एक नमूना प्रोफ़ाइल आज़માएं/i,
      })
      fireEvent.click(trySampleBtn)

      const studentBtn = screen.getByRole('button', {
        name: /Pooja|પૂજા|पूजा/i,
      })
      fireEvent.click(studentBtn)

      // Arrives at consent with loaded persona
      expect(screen.getByText(/Route: \/consent/i)).toBeDefined()

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeChecked()

      // Unchecking disables continue
      fireEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
      const continueBtns = screen.getAllByRole('button', {
        name: /Continue|આગળ વધો|जारी रखें/i,
      })
      expect(continueBtns[0]).toBeDisabled()

      // Re-checking enables continue
      fireEvent.click(checkbox)
      expect(continueBtns[0]).not.toBeDisabled()

      // With synthetic persona loaded, clicking continue goes straight to results
      fireEvent.click(continueBtns[0])
      expect(screen.getByTestId('results-page')).toBeDefined()
    })

    it('back button on Consent navigates back to Welcome', () => {
      renderFlow('/consent')

      const backBtn = screen.getByRole('button', {
        name: /Back|પાછા|वापस/i,
      })
      fireEvent.click(backBtn)

      // Back on Welcome
      expect(screen.getByRole('button', {
        name: /Help someone else|બીજા કોઈને મદદ કરો|किसी अन्य की सहायता करें/i,
      })).toBeDefined()
    })
  })
})
