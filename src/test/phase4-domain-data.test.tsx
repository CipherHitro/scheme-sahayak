import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { JourneyProvider } from '../app/JourneyContext'
import { WelcomePage } from '../features/welcome/WelcomePage'
import { SCHEMES_DATASET } from '../data/schemes'
import { SAMPLE_PERSONAS } from '../data/personas'
import { SAMPLE_FAMILIES } from '../data/helperFamilies'
import { DOCUMENT_CATALOG_MAP } from '../data/documentCatalog'
import type { RuleOperator } from '../domain/scheme.types'

describe('Phase 4 — Language Switching Integration Test', () => {
  it('switches text across entire Welcome page when language buttons are clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <JourneyProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </JourneyProvider>
      </MemoryRouter>
    )

    // Initial state is Gujarati ('gu')
    expect(screen.getByText('તમારા પરિવાર માટે કઈ સરકારી યોજનાઓ છે, જાણો.')).toBeInTheDocument()
    expect(screen.getAllByText('મારા માટે યોજનાઓ શોધો')[0]).toBeInTheDocument()
    expect(screen.getByText('આ માર્ગદર્શન છે. અંતિમ નિર્ણય સંબંધિત વિભાગનો રહેશે.')).toBeInTheDocument()

    // Click Hindi button in header
    const hiButton = screen.getByRole('button', { name: /हि/i })
    fireEvent.click(hiButton)

    // Verify all major elements update to Hindi
    expect(screen.getByText('जानिए आपके परिवार के लिए कौन सी सरकारी योजनाएं उपलब्ध हैं।')).toBeInTheDocument()
    expect(screen.getAllByText('मेरे लिए योजनाएं खोजें')[0]).toBeInTheDocument()
    expect(screen.getByText('यह मार्गदर्शन है। अंतिम निर्णय संबंधित विभाग का होगा।')).toBeInTheDocument()

    // Click English ('EN') button in header
    const enButton = screen.getByRole('button', { name: /Switch language to EN/i })
    fireEvent.click(enButton)

    // Verify all major elements update to English
    expect(screen.getByText('Discover government schemes your family may qualify for.')).toBeInTheDocument()
    expect(screen.getAllByText('Find benefits for me')[0]).toBeInTheDocument()
    expect(screen.getByText('This is guidance. The department makes the final decision.')).toBeInTheDocument()
  })
})

describe('Phase 4 — Domain Data Validation', () => {
  it('validates all scheme records have complete multilingual fields and valid URLs', () => {
    expect(SCHEMES_DATASET.length).toBeGreaterThanOrEqual(6)
    const validOperators: RuleOperator[] = ['eq', 'lte', 'gte', 'in', 'exists']

    SCHEMES_DATASET.forEach((scheme) => {
      expect(scheme.id).toBeTruthy()
      expect(scheme.name.en).toBeTruthy()
      expect(scheme.name.gu).toBeTruthy()
      expect(scheme.name.hi).toBeTruthy()
      expect(scheme.department.en).toBeTruthy()
      expect(scheme.department.gu).toBeTruthy()
      expect(scheme.department.hi).toBeTruthy()
      expect(scheme.summary.en).toBeTruthy()
      expect(scheme.benefitDescription.en).toBeTruthy()
      expect(scheme.sourceUrl).toMatch(/^https:\/\//)
      if (scheme.applicationUrl !== null) {
        expect(scheme.applicationUrl).toMatch(/^https:\/\//)
      }
      expect(['individual', 'household']).toContain(scheme.beneficiaryScope)

      // Rules validation
      expect(scheme.rules.length).toBeGreaterThanOrEqual(1)
      expect(scheme.rules.some((r) => r.mandatory)).toBe(true)
      scheme.rules.forEach((rule) => {
        expect(rule.id).toBeTruthy()
        expect(rule.field).toBeTruthy()
        expect(validOperators).toContain(rule.operator)
        expect(rule.label.en).toBeTruthy()
        expect(rule.label.gu).toBeTruthy()
        expect(rule.label.hi).toBeTruthy()
      })

      // Required documents validation (AGENT.md section 7: documentTypeId)
      expect(scheme.requiredDocuments.length).toBeGreaterThanOrEqual(1)
      scheme.requiredDocuments.forEach((doc) => {
        expect(doc.documentTypeId).toBeTruthy()
        expect(DOCUMENT_CATALOG_MAP[doc.documentTypeId]).toBeDefined()
        expect(doc.helpText.en).toBeTruthy()
      })

      // Verification status validation
      expect(['verified', 'needs_review', 'demo_placeholder']).toContain(scheme.verification.status)
      if (scheme.verification.status === 'demo_placeholder') {
        expect(scheme.verification.note).toBeTruthy()
      }
      if (scheme.verification.status !== 'verified') {
        expect(scheme.lastVerifiedAt).toBeNull()
      }
    })
  })

  it('validates 3 synthetic personas adhere to domain contracts', () => {
    const personas = [SAMPLE_PERSONAS.student, SAMPLE_PERSONAS.farmer, SAMPLE_PERSONAS.senior]
    expect(personas.length).toBe(3)

    personas.forEach((persona) => {
      expect(persona.id).toBeTruthy()
      expect(persona.displayName).toBeTruthy()
      expect(persona.isSynthetic).toBe(true)
      expect(persona.district).toBeTruthy()
      expect(persona.residenceState).toBe('Gujarat')
      expect(typeof persona.age === 'number' || persona.age === null).toBe(true)
      expect(['female', 'male', 'other', 'unknown']).toContain(persona.gender)
      expect(['single', 'married', 'widowed', 'divorced_or_separated', 'unknown']).toContain(
        persona.maritalStatus
      )
      expect(['student', 'farmer', 'retired_or_senior']).toContain(persona.occupation)
      expect(['under_1l', '1l_2_5l', '2_5l_5l', 'above_5l', 'unknown']).toContain(
        persona.annualHouseholdIncome
      )
      expect(['yes', 'no', 'unknown']).toContain(persona.ownsAgriculturalLand)
      expect(['aay', 'bpl', 'apl', 'none', 'unknown']).toContain(persona.rationCardType)
      expect(persona.familyMembers?.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('validates 3 synthetic helper families adhere to schema', () => {
    expect(SAMPLE_FAMILIES.length).toBe(3)

    SAMPLE_FAMILIES.forEach((family) => {
      expect(family.id).toBeTruthy()
      expect(family.familyName.en).toBeTruthy()
      expect(family.familyName.gu).toBeTruthy()
      expect(family.familyName.hi).toBeTruthy()
      expect(family.district).toBeTruthy()
      expect(family.headOfHousehold).toBeTruthy()
      expect(family.membersCount).toBeGreaterThan(0)
      expect(family.missingDocsCount).toBeGreaterThanOrEqual(0)
    })
  })
})
