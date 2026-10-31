import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { JourneyProvider } from '../app/JourneyContext'
import { HelperPage } from '../features/helper/HelperPage'
import { FamilyDetailPage } from '../features/helper/FamilyDetailPage'
import { formatCurrency, formatDate } from '../lib/formatters'
import en from '../i18n/en.json'
import gu from '../i18n/gu.json'
import hi from '../i18n/hi.json'

describe('Phase 11: Helper Mode Implementation', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('computes and displays summary metrics from sample records labelled "Sample data"', () => {
    render(
      <MemoryRouter initialEntries={['/helper']}>
        <JourneyProvider>
          <Routes>
            <Route path="/helper" element={<HelperPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Check single h1
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)
    expect(h1Elements[0]).toHaveTextContent(/સહાયક મોડ: લાભાર્થી પરિવારો|Helper Mode/i)

    // Check Sample data badge presence
    const sampleDataBadges = screen.getAllByText(/નમૂના ડેટા|Sample data/i)
    expect(sampleDataBadges.length).toBeGreaterThanOrEqual(1)

    // Households screened: 3
    expect(screen.getByText('3')).toBeInTheDocument()

    // Missing documents: 2 + 1 + 3 = 6
    expect(screen.getByText('6')).toBeInTheDocument()

    // Total members: 4 + 2 + 5 = 11
    expect(screen.getByText('11')).toBeInTheDocument()
  })

  it('prominently displays beneficiary consent requirement banner', () => {
    render(
      <MemoryRouter initialEntries={['/helper']}>
        <JourneyProvider>
          <Routes>
            <Route path="/helper" element={<HelperPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    expect(
      screen.getByText(/લાભાર્થીની સંમતિ અનિવાર્ય છે|Informed Beneficiary Consent Required/i)
    ).toBeInTheDocument()
  })

  it('renders all sample family ledger rows with names, districts, schemes, DotRows and missing doc badges', () => {
    render(
      <MemoryRouter initialEntries={['/helper']}>
        <JourneyProvider>
          <Routes>
            <Route path="/helper" element={<HelperPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Patel family
    expect(screen.getAllByText(/રમેશભાઈ પટેલ|Rameshbhai Patel/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Mehsana/i)).toBeInTheDocument()
    expect(screen.getAllByText(/પીએમ-કિસાન|PM-KISAN/i).length).toBeGreaterThanOrEqual(1)

    // Shah family
    expect(screen.getAllByText(/કાંતિલાલ શાહ|Kantilal Shah/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Vadodara/i)).toBeInTheDocument()

    // Vankar family
    expect(screen.getAllByText(/દિનેશભાઈ વણકર|Dineshbhai Vankar/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Sabarkantha/i)).toBeInTheDocument()

    // Badges
    expect(screen.getByText(/1 દસ્તાવેજો બાકી છે|1 documents missing/i)).toBeInTheDocument()
    expect(screen.getByText(/2 દસ્તાવેજો બાકી છે|2 documents missing/i)).toBeInTheDocument()
    expect(screen.getByText(/3 દસ્તાવેજો બાકી છે|3 documents missing/i)).toBeInTheDocument()

    // Accessible DotRows
    const dotRows = screen.getAllByRole('group', { name: /દસ્તાવેજો તૈયાર|documents ready/i })
    expect(dotRows.length).toBeGreaterThanOrEqual(3)
  })

  it('opens "Add new family" modal and adds a household locally without network calls', async () => {
    render(
      <MemoryRouter initialEntries={['/helper']}>
        <JourneyProvider>
          <Routes>
            <Route path="/helper" element={<HelperPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Click "Add new family"
    const addButtons = screen.getAllByText(/નવો પરિવાર ઉમેરો|Add new family/i)
    fireEvent.click(addButtons[0])

    // Modal dialog is opened
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    // Fill form
    const familyNameInput = screen.getByLabelText(/પરિવાર અથવા કુટુંબનું નામ|Family or household name/i)
    fireEvent.change(familyNameInput, { target: { value: 'Govindbhai Parmar Household' } })

    const headNameInput = screen.getByLabelText(/કુટુંબના વડાનું પૂરું નામ|Head of household full name/i)
    fireEvent.change(headNameInput, { target: { value: 'Govindbhai Parmar' } })

    const consentCheckbox = screen.getByRole('checkbox')
    fireEvent.click(consentCheckbox)

    // Submit form
    const saveButton = screen.getByRole('button', { name: /સ્થાનિક રીતે સાચવો|Save household locally/i })
    fireEvent.click(saveButton)

    // Verify modal closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Verify new household appears in the ledger
    expect(screen.getAllByText(/Govindbhai Parmar Household/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Govindbhai Parmar/i).length).toBeGreaterThanOrEqual(1)

    // Metrics updated: 3 -> 4 households
    expect(screen.getByText('4')).toBeInTheDocument()

    // Stored in localStorage
    const stored = localStorage.getItem('scheme_sahayak_helper_families')
    expect(stored).toBeTruthy()
    expect(stored).toContain('Govindbhai Parmar Household')
  })

  it('renders FamilyDetailPage with single h1, primary scheme readiness, and missing docs breakdown', () => {
    render(
      <MemoryRouter initialEntries={['/helper/families/fam-patel']}>
        <JourneyProvider>
          <Routes>
            <Route path="/helper/families/:id" element={<FamilyDetailPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Single h1
    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)
    expect(h1Elements[0]).toHaveTextContent(/રમેશભાઈ પટેલ|Rameshbhai Patel/i)

    // Scheme information
    expect(screen.getAllByText(/પીએમ-કિસાન|PM-KISAN/i).length).toBeGreaterThanOrEqual(1)

    // Missing documents guidance
    expect(
      screen.getByText(/બાકી દસ્તાવેજો ક્યાંથી મેળવવા|Where to get missing documents/i)
    ).toBeInTheDocument()

    // Review schemes button
    expect(
      screen.getByRole('button', { name: /પરિવારની યોજનાઓ અને પરિણામો જુઓ|Review family schemes/i })
    ).toBeInTheDocument()
  })

  it('navigates to /results when "Review family schemes" is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/helper/families/fam-patel']}>
        <JourneyProvider>
          <Routes>
            <Route path="/helper/families/:id" element={<FamilyDetailPage />} />
            <Route path="/results" element={<div>Results Screen Reached</div>} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    const reviewBtn = screen.getByRole('button', {
      name: /પરિવારની યોજનાઓ અને પરિણામો જુઓ|Review family schemes/i,
    })
    fireEvent.click(reviewBtn)

    expect(screen.getByText('Results Screen Reached')).toBeInTheDocument()
  })
})

describe('Phase 12: i18n & Accessibility Audit', () => {
  it('has 100% key parity across en, gu, and hi dictionaries', () => {
    const enKeys = Object.keys(en)
    const guKeys = Object.keys(gu)
    const hiKeys = Object.keys(hi)

    expect(guKeys).toEqual(enKeys)
    expect(hiKeys).toEqual(enKeys)
  })

  it('formats currency using Intl.NumberFormat in Indian numbering style', () => {
    const formattedEn = formatCurrency(6000, 'en')
    expect(formattedEn).toMatch(/₹\s*6,000/)

    const formattedGu = formatCurrency(120000, 'gu')
    expect(formattedGu).toContain('1,20,000')

    const formattedHi = formatCurrency(50000, 'hi')
    expect(formattedHi).toContain('50,000')
  })

  it('formats dates using Intl.DateTimeFormat', () => {
    const formatted = formatDate('2026-10-31', 'en')
    expect(formatted).toContain('2026')
    expect(formatted).toMatch(/Oct|31/)
  })

  it('displays native-speaker review flag when language is non-English', () => {
    render(
      <MemoryRouter initialEntries={['/helper']}>
        <JourneyProvider>
          <Routes>
            <Route path="/helper" element={<HelperPage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // By default language is 'gu' in JourneyContext
    const flag = screen.queryByTestId('native-review-flag')
    expect(flag).toBeInTheDocument()
    expect(flag).toHaveTextContent(/સત્તાવાર સમીક્ષા|સમીક્ષા બાકી|review/i)
  })
})
