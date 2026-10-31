import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { JourneyProvider } from '../app/JourneyContext'
import { DocumentScanPage } from '../features/documents/DocumentScanPage'
import { ChecklistPage } from '../features/checklist/ChecklistPage'
import { setStoredLanguage, setStoredJourneyState, getStoredJourneyState } from '../lib/storage'
import type { BeneficiaryProfile } from '../domain/profile.types'

const POOJA_STUDENT_PROFILE: BeneficiaryProfile = {
  id: 'profile-pooja',
  isSynthetic: true,
  displayName: 'Pooja Patel',
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

function setTestJourneyState(
  profile: BeneficiaryProfile = POOJA_STUDENT_PROFILE,
  confirmations: Record<string, boolean> = {},
  language: 'en' | 'gu' | 'hi' = 'en'
) {
  setStoredLanguage(language)
  setStoredJourneyState({
    language,
    textScale: 1,
    consentGiven: true,
    mode: 'citizen',
    currentProfile: profile,
    activeSubjectId: profile.id,
    selectedSchemeId: 'mysy',
    documentConfirmations: confirmations,
  })
}

describe('Phase 9: Synthetic Document Demo Flow', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    vi.useRealTimers()
  })

  it('displays honest disabled real uploads notice', () => {
    setTestJourneyState()

    render(
      <MemoryRouter initialEntries={['/documents/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/documents/:schemeId" element={<DocumentScanPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Heading
    expect(screen.getByRole('heading', { level: 1, name: /Synthetic Document Evidence Demo/i })).toBeInTheDocument()

    // Real uploads disabled banner
    expect(screen.getByText(/Real uploads disabled for privacy/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Real document uploads are disabled in this prototype/i)
    ).toBeInTheDocument()

    // Trigger button
    expect(screen.getByRole('button', { name: /Use sample income certificate/i })).toBeInTheDocument()
  })

  it('loads sample asset with prominent SAMPLE watermark and runs scan sweep animation', async () => {
    vi.useFakeTimers()
    setTestJourneyState()

    render(
      <MemoryRouter initialEntries={['/documents/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/documents/:schemeId" element={<DocumentScanPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    const useSampleBtn = screen.getByRole('button', { name: /Use sample income certificate/i })
    fireEvent.click(useSampleBtn)

    // Sample watermark is present
    expect(screen.getByText(/SAMPLE • NOT OFFICIAL • DEMO ONLY/i)).toBeInTheDocument()

    // Scanning indicator is shown
    expect(screen.getByText(/Scanning sample document\.\.\./i)).toBeInTheDocument()

    // Fast-forward DESIGN.md 1.2s scan sweep timing
    act(() => {
      vi.advanceTimersByTime(1250)
    })

    // Predefined local fields are revealed
    expect(screen.getByText(/Is this extracted information correct\?/i)).toBeInTheDocument()
    expect(screen.getAllByText(/₹1,50,000/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Office of the Mamlatdar/i).length).toBeGreaterThanOrEqual(1)

    // Confirm button is available
    expect(screen.getByRole('button', { name: /Yes, use these/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Fix a value/i })).toBeInTheDocument()
  })

  it('confirming updates readiness for canonical documentTypeId and shows privacy notice', async () => {
    vi.useFakeTimers()
    setTestJourneyState()

    render(
      <MemoryRouter initialEntries={['/documents/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/documents/:schemeId" element={<DocumentScanPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /Use sample income certificate/i }))

    act(() => {
      vi.advanceTimersByTime(1250)
    })

    // Click confirm
    const yesBtn = screen.getByRole('button', { name: /Yes, use these/i })
    fireEvent.click(yesBtn)

    // Verify readiness updated in storage for canonical 'income_certificate'
    const stored = getStoredJourneyState()
    expect(stored?.documentConfirmations?.income_certificate).toBe(true)

    // Session feedback notices
    expect(screen.getByText(/File deleted from this session/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Simulated document reading\. Authenticity is not verified/i)
    ).toBeInTheDocument()

    // Navigation button to checklist
    expect(screen.getAllByRole('button', { name: /View final readiness checklist/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('allows fixing extracted values and saving edited values locally', async () => {
    vi.useFakeTimers()
    setTestJourneyState()

    render(
      <MemoryRouter initialEntries={['/documents/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/documents/:schemeId" element={<DocumentScanPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /Use sample income certificate/i }))

    act(() => {
      vi.advanceTimersByTime(1250)
    })

    // Click Fix a value
    const fixBtn = screen.getByRole('button', { name: /Fix a value/i })
    fireEvent.click(fixBtn)

    // Editable input fields appear
    const incomeInput = screen.getByLabelText(/Annual Household Income/i)
    expect(incomeInput).toBeInTheDocument()

    fireEvent.change(incomeInput, { target: { value: '200000' } })

    // Save & confirm
    const saveBtn = screen.getByRole('button', { name: /Save & confirm/i })
    fireEvent.click(saveBtn)

    // Confirmed
    const stored = getStoredJourneyState()
    expect(stored?.documentConfirmations?.income_certificate).toBe(true)
  })
})

describe('Phase 10: Readiness Checklist and Official Hand-off', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    vi.useRealTimers()
  })

  it('renders single dark readiness summary panel with DotRow and ready/missing groups', () => {
    setTestJourneyState(POOJA_STUDENT_PROFILE, { income_certificate: true }, 'en')

    render(
      <MemoryRouter initialEntries={['/checklist/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/checklist/:schemeId" element={<ChecklistPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Heading
    expect(screen.getByRole('heading', { level: 1, name: /Readiness Checklist/i })).toBeInTheDocument()

    // Dark summary panel
    expect(screen.getByText(/Preparation Status/i)).toBeInTheDocument()
    expect(screen.getAllByText(/1 of \d+ documents ready/i).length).toBeGreaterThanOrEqual(1)

    // Ready group
    expect(screen.getByRole('heading', { name: /Ready documents \(1\)/i })).toBeInTheDocument()
    expect(screen.getByText(/Read from sample certificate/i)).toBeInTheDocument()

    // Missing group
    expect(screen.getByRole('heading', { name: /Missing documents \(\d+\)/i })).toBeInTheDocument()
  })

  it('missing document expands "Where to get it" instructions', () => {
    setTestJourneyState(POOJA_STUDENT_PROFILE, {}, 'en')

    render(
      <MemoryRouter initialEntries={['/checklist/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/checklist/:schemeId" element={<ChecklistPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Find first "Where to get it" accordion trigger
    const whereToGetButtons = screen.getAllByRole('button', { name: /Where to get it/i })
    expect(whereToGetButtons.length).toBeGreaterThanOrEqual(1)

    // Expand first one
    fireEvent.click(whereToGetButtons[0])
    expect(whereToGetButtons[0]).toHaveAttribute('aria-expanded', 'true')

    // Instructions visible
    expect(screen.getAllByText(/Instructions \/ ક્યાંથી મેળવવું:/i).length).toBeGreaterThanOrEqual(1)
  })

  it('provides official portal link with honest label and guidance disclaimer', () => {
    setTestJourneyState(POOJA_STUDENT_PROFILE, {}, 'en')

    render(
      <MemoryRouter initialEntries={['/checklist/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/checklist/:schemeId" element={<ChecklistPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Official portal action button
    const openPortalBtn = screen.getByRole('button', { name: /Open official application portal/i })
    expect(openPortalBtn).toBeInTheDocument()

    // Official link in source block
    const portalLink = screen.getByRole('link', { name: /https:\/\/mysy\.guj\.nic\.in\//i })
    expect(portalLink).toBeInTheDocument()

    // Never claims application submitted
    expect(screen.queryByText(/Application submitted/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Application completed/i)).not.toBeInTheDocument()

    // Disclaimer
    expect(screen.getByText(/Guidance tool\. Not an official government service\./i)).toBeInTheDocument()
  })

  it('calls window.print() when print button is clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})
    setTestJourneyState(POOJA_STUDENT_PROFILE, {}, 'en')

    render(
      <MemoryRouter initialEntries={['/checklist/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/checklist/:schemeId" element={<ChecklistPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    const printBtn = screen.getAllByRole('button', { name: /Print or save checklist/i })[0]
    fireEvent.click(printBtn)

    expect(printSpy).toHaveBeenCalledTimes(1)
    printSpy.mockRestore()
  })

  it('renders cleanly in Gujarati with long strings and localised checklist labels', () => {
    setTestJourneyState(POOJA_STUDENT_PROFILE, { income_certificate: true }, 'gu')

    render(
      <MemoryRouter initialEntries={['/checklist/mysy']}>
        <JourneyProvider>
          <Routes>
            <Route path="/checklist/:schemeId" element={<ChecklistPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Gujarati header
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/દસ્તાવેજ તૈયારી યાદી/i)

    // Gujarati status summary
    expect(screen.getByText(/દસ્તાવેજ તૈયારી સ્થિતિ/i)).toBeInTheDocument()

    // Gujarati ready group
    expect(screen.getByText(/તૈયાર દસ્તાવેજ \(1\)/i)).toBeInTheDocument()
    expect(screen.getByText(/નમૂના પ્રમાણપત્રમાંથી વાંચેલ/i)).toBeInTheDocument()

    // Gujarati disclaimer
    expect(screen.getByText(/માર્ગદર્શન સાધન\. કોઈ સત્તાવાર સરકારી સેવા નથી\./i)).toBeInTheDocument()
  })
})
