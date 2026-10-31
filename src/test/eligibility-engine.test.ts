import { describe, expect, it } from 'vitest'
import {
  evaluateRule,
  evaluateScheme,
  evaluateAll,
  sortEvaluations,
  isMissingOrStale,
  STALE_AFTER_DAYS,
} from '../domain/eligibility/evaluator'
import { explainEvaluation } from '../domain/eligibility/explanation'
import { buildSubject } from '../domain/subject'
import { validateSchemes } from '../data/validation'
import type {
  SchemeRecord,
  SchemeRule,
  SchemeEvaluation,
  EvaluationSubject,
  BeneficiaryProfile,
} from '../domain'

const FIXED_NOW = new Date('2026-10-31T12:00:00Z')

const baseSubject: EvaluationSubject = {
  subjectId: 'student-1',
  displayName: 'Pooja Patel',
  age: 19,
  gender: 'female',
  maritalStatus: 'single',
  occupation: 'student',
  educationLevel: 'undergraduate',
  institutionType: 'government',
  disability: 'no',
  district: 'Ahmedabad',
  residenceState: 'Gujarat',
  category: 'ews',
  annualHouseholdIncome: '1l_2_5l',
  ownsAgriculturalLand: 'no',
  rationCardType: 'apl',
}

const mockScheme: SchemeRecord = {
  id: 'test-scholarship',
  name: {
    en: 'Higher Education Scholarship',
    gu: 'ઉચ્ચ શિક્ષણ શિષ્યવૃત્તિ',
    hi: 'उच्च शिक्षा छात्रवृत्ति',
  },
  department: {
    en: 'Education Department',
    gu: 'શિક્ષણ વિભાગ',
    hi: 'शिक्षा विभाग',
  },
  summary: {
    en: 'Tuition assistance for undergraduate students.',
    gu: 'વિદ્યાર્થીઓ માટે ટ્યુશન સહાય.',
    hi: 'विद्यार्थियों हेतु ट्यूशन सहायता।',
  },
  benefitDescription: {
    en: '50% fee reimbursement.',
    gu: '૫૦% ફી સહાય.',
    hi: '50% फीस सहायता।',
  },
  beneficiaryScope: 'individual',
  rules: [
    {
      id: 'rule-residence',
      field: 'residenceState',
      operator: 'eq',
      value: 'Gujarat',
      mandatory: true,
      label: {
        en: 'Gujarat Domicile',
        gu: 'ગુજરાતના કાયમી રહેવાસી',
        hi: 'गुजरात के निवासी',
      },
    },
    {
      id: 'rule-occupation',
      field: 'occupation',
      operator: 'eq',
      value: 'student',
      mandatory: true,
      label: {
        en: 'Enrolled as student',
        gu: 'વિદ્યાર્થી હોવા જરૂરી',
        hi: 'विद्यार्थी होना आवश्यक',
      },
    },
    {
      id: 'rule-income',
      field: 'annualHouseholdIncome',
      operator: 'lte',
      value: 600000,
      mandatory: true,
      label: {
        en: 'Annual income up to ₹6,00,000',
        gu: 'વાર્ષિક આવક ₹૬,૦૦,૦૦૦ સુધી',
        hi: 'वार्षिक आय ₹6,00,000 तक',
      },
    },
    {
      id: 'rule-optional-disability',
      field: 'disability',
      operator: 'eq',
      value: 'yes',
      mandatory: false,
      label: {
        en: 'Disability assistance priority',
        gu: 'દિવ્યાંગતા સહાય અગ્રતા',
        hi: 'दिव्यांगता सहायता प्राथमिकता',
      },
    },
  ],
  requiredDocuments: [
    {
      documentTypeId: 'income_certificate',
      required: true,
      helpText: {
        en: 'Income certificate',
        gu: 'આવકનો દાખલો',
        hi: 'आय प्रमाण पत्र',
      },
    },
  ],
  applicationSteps: {
    en: ['Apply online'],
    gu: ['ઓનલાઇન અરજી કરો'],
    hi: ['ऑनलाइन आवेदन करें'],
  },
  applicationUrl: 'https://mysy.guj.nic.in/',
  sourceUrl: 'https://mysy.guj.nic.in/',
  lastVerifiedAt: '2026-10-01T00:00:00Z',
  version: '1.0.0',
  verification: {
    status: 'verified',
    reviewer: 'Test Reviewer',
  },
}

describe('Eligibility Engine — evaluateRule Operator Semantics', () => {
  it('evaluates eq with strict comparison after normalisation', () => {
    const rule: SchemeRule = {
      id: 'r1',
      field: 'residenceState',
      operator: 'eq',
      value: 'Gujarat',
      mandatory: true,
      label: { en: 'Resident', gu: 'રહેવાસી', hi: 'निवासी' },
    }

    expect(evaluateRule(rule, baseSubject).result).toBe('pass')

    // Case and whitespace normalisation
    const ruleCaseNorm: SchemeRule = { ...rule, value: '  gujarat  ' }
    expect(evaluateRule(ruleCaseNorm, baseSubject).result).toBe('pass')

    // Fail case
    const otherSubject: EvaluationSubject = { ...baseSubject, residenceState: 'Other' }
    expect(evaluateRule(rule, otherSubject).result).toBe('fail')
  })

  it('evaluates numeric lte and gte on non-income numeric fields (e.g. age)', () => {
    const lteRule: SchemeRule = {
      id: 'r-age-lte',
      field: 'age',
      operator: 'lte',
      value: 25,
      mandatory: true,
      label: { en: 'Age <= 25', gu: 'ઉંમર <= ૨૫', hi: 'आयु <= 25' },
    }
    expect(evaluateRule(lteRule, baseSubject).result).toBe('pass')

    const gteRule: SchemeRule = {
      id: 'r-age-gte',
      field: 'age',
      operator: 'gte',
      value: 60,
      mandatory: true,
      label: { en: 'Age >= 60', gu: 'ઉંમર >= ૬૦', hi: 'आयु >= 60' },
    }
    expect(evaluateRule(gteRule, baseSubject).result).toBe('fail')

    // Exact equal boundary
    const exactRule: SchemeRule = { ...gteRule, value: 19 }
    expect(evaluateRule(exactRule, baseSubject).result).toBe('pass')
  })

  it('evaluates in operator', () => {
    const inRule: SchemeRule = {
      id: 'r-cat',
      field: 'category',
      operator: 'in',
      value: ['sc', 'st', 'ews'],
      mandatory: true,
      label: { en: 'Eligible Category', gu: 'માન્ય વર્ગ', hi: 'मान्य वर्ग' },
    }
    expect(evaluateRule(inRule, baseSubject).result).toBe('pass')

    const generalSubject: EvaluationSubject = { ...baseSubject, category: 'general' }
    expect(evaluateRule(inRule, generalSubject).result).toBe('fail')
  })

  it('evaluates exists operator: pass when present and known, unknown when absent/unknown', () => {
    const existsRule: SchemeRule = {
      id: 'r-exists',
      field: 'district',
      operator: 'exists',
      mandatory: true,
      label: { en: 'District provided', gu: 'જિલ્લો', hi: 'जिला' },
    }
    expect(evaluateRule(existsRule, baseSubject).result).toBe('pass')

    const noDistrictSubject: EvaluationSubject = { ...baseSubject, district: null }
    const result = evaluateRule(existsRule, noDistrictSubject)
    expect(result.result).toBe('unknown')
    expect(result.reasonCode).toBe('missing_value')

    const unknownDistrictSubject: EvaluationSubject = {
      ...baseSubject,
      residenceState: 'unknown',
    }
    const stateExistsRule: SchemeRule = {
      ...existsRule,
      field: 'residenceState',
    }
    expect(evaluateRule(stateExistsRule, unknownDistrictSubject).result).toBe('unknown')
  })
})

describe('Eligibility Engine — Income Band Semantics', () => {
  it('passes when income limit is equal to upper band edge (e.g. 1l_2_5l with lte 250000)', () => {
    const rule: SchemeRule = {
      id: 'r-income',
      field: 'annualHouseholdIncome',
      operator: 'lte',
      value: 250000,
      mandatory: true,
      label: { en: 'Income limit', gu: 'આવક મર્યાદા', hi: 'आय सीमा' },
    }
    // 1l_2_5l upper bound is 250000 <= 250000 -> pass
    const subject: EvaluationSubject = { ...baseSubject, annualHouseholdIncome: '1l_2_5l' }
    expect(evaluateRule(rule, subject).result).toBe('pass')
  })

  it('fails when income limit is equal to lower band edge for lte (e.g. 1l_2_5l with lte 100000)', () => {
    const rule: SchemeRule = {
      id: 'r-income',
      field: 'annualHouseholdIncome',
      operator: 'lte',
      value: 100000,
      mandatory: true,
      label: { en: 'Income limit', gu: 'આવક મર્યાદા', hi: 'आय सीमा' },
    }
    // 1l_2_5l lower bound is 100000 >= 100000 -> fail
    const subject: EvaluationSubject = { ...baseSubject, annualHouseholdIncome: '1l_2_5l' }
    expect(evaluateRule(rule, subject).result).toBe('fail')
  })

  it('yields unknown with reasonCode straddles_band when limit falls strictly inside band', () => {
    const rule: SchemeRule = {
      id: 'r-income-straddle',
      field: 'annualHouseholdIncome',
      operator: 'lte',
      value: 150000,
      mandatory: true,
      label: { en: 'Income limit ₹1.5L', gu: 'આવક ₹૧.૫ લાખ', hi: 'आय ₹1.5 लाख' },
    }
    // 1l_2_5l range is (100k, 250k]; 150k falls inside
    const subject: EvaluationSubject = { ...baseSubject, annualHouseholdIncome: '1l_2_5l' }
    const result = evaluateRule(rule, subject)
    expect(result.result).toBe('unknown')
    expect(result.reasonCode).toBe('straddles_band')
  })

  it('passes when limit is above all known bands (e.g. ₹6,00,000 for under_1l, 1l_2_5l, 2_5l_5l)', () => {
    const rule: SchemeRule = {
      id: 'r-income-6l',
      field: 'annualHouseholdIncome',
      operator: 'lte',
      value: 600000,
      mandatory: true,
      label: { en: 'Income limit ₹6L', gu: 'આવક ₹૬ લાખ', hi: 'आय ₹6 लाख' },
    }
    expect(evaluateRule(rule, { ...baseSubject, annualHouseholdIncome: 'under_1l' }).result).toBe('pass')
    expect(evaluateRule(rule, { ...baseSubject, annualHouseholdIncome: '1l_2_5l' }).result).toBe('pass')
    expect(evaluateRule(rule, { ...baseSubject, annualHouseholdIncome: '2_5l_5l' }).result).toBe('pass')
  })

  it('yields unknown for unknown income band', () => {
    const rule: SchemeRule = {
      id: 'r-income-lte',
      field: 'annualHouseholdIncome',
      operator: 'lte',
      value: 250000,
      mandatory: true,
      label: { en: 'Income limit', gu: 'આવક', hi: 'आय' },
    }
    const subject: EvaluationSubject = { ...baseSubject, annualHouseholdIncome: 'unknown' }
    const result = evaluateRule(rule, subject)
    expect(result.result).toBe('unknown')
    expect(result.reasonCode).toBe('missing_value')
  })

  it('evaluates gte operator for income bands correctly', () => {
    const rule: SchemeRule = {
      id: 'r-income-gte',
      field: 'annualHouseholdIncome',
      operator: 'gte',
      value: 100000,
      mandatory: true,
      label: { en: 'Income at least ₹1L', gu: 'આવક', hi: 'आय' },
    }
    // 1l_2_5l lower bound is 100000 >= 100000 -> pass
    expect(evaluateRule(rule, { ...baseSubject, annualHouseholdIncome: '1l_2_5l' }).result).toBe('pass')

    // under_1l upper bound is 100000 <= 100000 -> fail
    expect(evaluateRule(rule, { ...baseSubject, annualHouseholdIncome: 'under_1l' }).result).toBe('fail')

    // gte straddle: 2_5l_5l (250k to 500k) with limit 300000
    const straddleRule: SchemeRule = { ...rule, value: 300000 }
    const straddleResult = evaluateRule(straddleRule, { ...baseSubject, annualHouseholdIncome: '2_5l_5l' })
    expect(straddleResult.result).toBe('unknown')
    expect(straddleResult.reasonCode).toBe('straddles_band')
  })
})

describe('Eligibility Engine — Null, Undefined, Wrong Types & Absent Facts', () => {
  it('returns unknown (never fail) when facts are null or undefined', () => {
    const rule: SchemeRule = {
      id: 'r-age',
      field: 'age',
      operator: 'gte',
      value: 18,
      mandatory: true,
      label: { en: 'Age', gu: 'ઉંમર', hi: 'आयु' },
    }
    const nullSubject: EvaluationSubject = { ...baseSubject, age: null }
    const result = evaluateRule(rule, nullSubject)
    expect(result.result).toBe('unknown')
    expect(result.reasonCode).toBe('missing_value')
  })

  it('returns unknown with invalid_value for non-numeric input without coercing arbitrary strings', () => {
    const rule: SchemeRule = {
      id: 'r-age',
      field: 'age',
      operator: 'gte',
      value: 18,
      mandatory: true,
      label: { en: 'Age', gu: 'ઉંમર', hi: 'आयु' },
    }
    // Intentionally pass an invalid string type to simulate runtime garbage
    const badSubject = { ...baseSubject, age: 'nineteen' as unknown as number }
    const result = evaluateRule(rule, badSubject)
    expect(result.result).toBe('unknown')
    expect(result.reasonCode).toBe('invalid_value')
  })
})

describe('Eligibility Engine — Scheme Evaluation Outcomes & Precedence', () => {
  it('yields likely when all mandatory rules pass', () => {
    const evaluation = evaluateScheme(mockScheme, baseSubject, FIXED_NOW)
    expect(evaluation.state).toBe('likely')
    expect(evaluation.passedCount).toBeGreaterThanOrEqual(3)
    expect(evaluation.failedCount).toBe(1) // optional disability rule failed
    expect(evaluation.dataStatus).toBe('verified')
  })

  it('optional failures stay visible and do not disqualify', () => {
    // Subject disability is 'no', mockScheme has optional rule disability: 'yes'
    const evaluation = evaluateScheme(mockScheme, baseSubject, FIXED_NOW)
    expect(evaluation.state).toBe('likely')

    const optionalCheck = evaluation.checks.find((c) => !c.mandatory)
    expect(optionalCheck).toBeDefined()
    expect(optionalCheck?.result).toBe('fail')
  })

  it('mandatory fail yields not_matching', () => {
    const nonGujSubject: EvaluationSubject = {
      ...baseSubject,
      residenceState: 'Other',
    }
    const evaluation = evaluateScheme(mockScheme, nonGujSubject, FIXED_NOW)
    expect(evaluation.state).toBe('not_matching')
  })

  it('mandatory unknown yields possible', () => {
    const unknownSubject: EvaluationSubject = {
      ...baseSubject,
      occupation: 'unknown',
    }
    const evaluation = evaluateScheme(mockScheme, unknownSubject, FIXED_NOW)
    expect(evaluation.state).toBe('possible')
  })

  it('yields needs_verification when verification.status is needs_review', () => {
    const needsReviewScheme: SchemeRecord = {
      ...mockScheme,
      verification: { status: 'needs_review', reviewer: null },
    }
    const evaluation = evaluateScheme(needsReviewScheme, baseSubject, FIXED_NOW)
    expect(evaluation.state).toBe('needs_verification')
    expect(evaluation.dataStatus).toBe('needs_review')
    // Rule checks are still calculated and returned
    expect(evaluation.checks.length).toBe(mockScheme.rules.length)
  })

  it('yields needs_verification when lastVerifiedAt is older than 180 days', () => {
    const staleDate = new Date(FIXED_NOW.getTime() - (STALE_AFTER_DAYS + 5) * 24 * 60 * 60 * 1000).toISOString()
    const staleScheme: SchemeRecord = {
      ...mockScheme,
      lastVerifiedAt: staleDate,
      verification: { status: 'verified', reviewer: 'Old Reviewer' },
    }
    const evaluation = evaluateScheme(staleScheme, baseSubject, FIXED_NOW)
    expect(evaluation.state).toBe('needs_verification')
  })

  it('yields needs_verification when lastVerifiedAt is in the future', () => {
    const futureDate = new Date(FIXED_NOW.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString()
    const futureScheme: SchemeRecord = {
      ...mockScheme,
      lastVerifiedAt: futureDate,
      verification: { status: 'verified', reviewer: 'Future Reviewer' },
    }
    const evaluation = evaluateScheme(futureScheme, baseSubject, FIXED_NOW)
    expect(evaluation.state).toBe('needs_verification')
  })

  it('evaluates demo_placeholder schemes normally with dataStatus demo_placeholder', () => {
    const demoScheme: SchemeRecord = {
      ...mockScheme,
      verification: {
        status: 'demo_placeholder',
        reviewer: null,
        note: 'Demo testing',
      },
      lastVerifiedAt: null,
    }
    const evaluation = evaluateScheme(demoScheme, baseSubject, FIXED_NOW)
    // All mandatory pass -> evaluates to likely on demo rules!
    expect(evaluation.state).toBe('likely')
    expect(evaluation.dataStatus).toBe('demo_placeholder')
  })

  it('isMissingOrStale helper returns correct boolean', () => {
    expect(isMissingOrStale(null, FIXED_NOW)).toBe(true)
    expect(isMissingOrStale('invalid-date', FIXED_NOW)).toBe(true)
    // 30 days ago => not stale
    const freshDate = new Date(FIXED_NOW.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
    expect(isMissingOrStale(freshDate, FIXED_NOW)).toBe(false)
    // 200 days ago => stale
    const oldDate = new Date(FIXED_NOW.getTime() - 200 * 24 * 60 * 60 * 1000).toISOString()
    expect(isMissingOrStale(oldDate, FIXED_NOW)).toBe(true)
  })
})

describe('Eligibility Engine — Data Boundary & Zero Mandatory Rules', () => {
  it('rejects schemes with zero mandatory rules at data validation', () => {
    const invalidScheme: SchemeRecord = {
      ...mockScheme,
      id: 'scheme-no-mandatory',
      rules: [
        {
          id: 'rule-opt',
          field: 'age',
          operator: 'gte',
          value: 18,
          mandatory: false,
          label: { en: 'Optional age', gu: 'ઉંમર', hi: 'आयु' },
        },
      ],
    }

    expect(() => validateSchemes([invalidScheme])).toThrow(
      /Scheme must contain at least one mandatory rule/
    )
  })
})

describe('Eligibility Engine — Sorting, Evaluation Explanation & Multi-subject', () => {
  it('sorts evaluations by likely > possible > needs_verification > not_matching, then passed rules, then name', () => {
    const evalLikely: SchemeEvaluation = {
      schemeId: 'scheme-a',
      subjectId: 'sub-1',
      state: 'likely',
      checks: [],
      passedCount: 3,
      unknownCount: 0,
      failedCount: 0,
      totalCount: 3,
      dataStatus: 'verified',
      explanation: '',
    }

    const evalLikelyMorePassed: SchemeEvaluation = {
      ...evalLikely,
      schemeId: 'scheme-b',
      passedCount: 4,
    }

    const evalPossible: SchemeEvaluation = {
      ...evalLikely,
      schemeId: 'scheme-c',
      state: 'possible',
    }

    const evalNeedsVerification: SchemeEvaluation = {
      ...evalLikely,
      schemeId: 'scheme-d',
      state: 'needs_verification',
    }

    const evalNotMatching: SchemeEvaluation = {
      ...evalLikely,
      schemeId: 'scheme-e',
      state: 'not_matching',
    }

    const list = [
      evalNotMatching,
      evalPossible,
      evalLikely,
      evalNeedsVerification,
      evalLikelyMorePassed,
    ]

    const schemesMap: Record<string, SchemeRecord> = {
      'scheme-a': { ...mockScheme, id: 'scheme-a', name: { en: 'Alpha Scheme', gu: 'આલ્ફા', hi: 'अल्फा' } },
      'scheme-b': { ...mockScheme, id: 'scheme-b', name: { en: 'Beta Scheme', gu: 'બીટા', hi: 'बीटा' } },
      'scheme-c': { ...mockScheme, id: 'scheme-c', name: { en: 'Gamma Scheme', gu: 'ગામા', hi: 'गामा' } },
      'scheme-d': { ...mockScheme, id: 'scheme-d', name: { en: 'Delta Scheme', gu: 'ડેલ્ટા', hi: 'डेल्टा' } },
      'scheme-e': { ...mockScheme, id: 'scheme-e', name: { en: 'Epsilon Scheme', gu: 'એપ્સિલોન', hi: 'एप्सिलॉन' } },
    }

    const sorted = sortEvaluations(list, schemesMap, 'en')
    expect(sorted.map((s) => s.schemeId)).toEqual([
      'scheme-b', // likely, 4 passed
      'scheme-a', // likely, 3 passed
      'scheme-c', // possible
      'scheme-d', // needs_verification
      'scheme-e', // not_matching
    ])
  })

  it('explainEvaluation builds plain-language explanation with straddles_band guidance', () => {
    const straddlingEval = evaluateScheme(
      {
        ...mockScheme,
        rules: [
          {
            id: 'rule-straddle',
            field: 'annualHouseholdIncome',
            operator: 'lte',
            value: 150000,
            mandatory: true,
            label: { en: 'Income ₹1.5L', gu: 'આવક', hi: 'आय' },
          },
        ],
      },
      baseSubject,
      FIXED_NOW
    )

    const explanationEn = explainEvaluation(straddlingEval, mockScheme, 'en')
    expect(explanationEn).toContain('confirm with your income certificate')
    expect(explanationEn).toContain('150000')

    const explanationGu = explainEvaluation(straddlingEval, mockScheme, 'gu')
    expect(explanationGu).toContain('આવકના પ્રમાણપત્ર સાથે ખાતરી કરો')

    const explanationHi = explainEvaluation(straddlingEval, mockScheme, 'hi')
    expect(explanationHi).toContain('आय प्रमाण पत्र से पुष्टि करें')
  })

  it('evaluateAll maps over an array of schemes deterministically', () => {
    const scheme2: SchemeRecord = {
      ...mockScheme,
      id: 'scheme-2',
      rules: [
        {
          id: 'rule-farmer',
          field: 'occupation',
          operator: 'eq',
          value: 'farmer',
          mandatory: true,
          label: { en: 'Farmer', gu: 'ખેડૂત', hi: 'किसान' },
        },
      ],
    }

    const results = evaluateAll([mockScheme, scheme2], baseSubject, FIXED_NOW)
    expect(results.length).toBe(2)
    expect(results[0].state).toBe('likely')
    expect(results[1].state).toBe('not_matching')
  })

  it('buildSubject works for primary and family member before feeding into evaluateScheme', () => {
    const profile: BeneficiaryProfile = {
      id: 'profile-parent',
      displayName: 'Rameshbhai Patel',
      isSynthetic: true,
      age: 48,
      gender: 'male',
      maritalStatus: 'married',
      occupation: 'farmer',
      educationLevel: 'class_8_to_10',
      institutionType: 'not_applicable',
      disability: 'no',
      district: 'Mehsana',
      residenceState: 'Gujarat',
      category: 'general',
      annualHouseholdIncome: 'under_1l',
      ownsAgriculturalLand: 'yes',
      rationCardType: 'bpl',
      familyMembers: [
        {
          id: 'member-student-son',
          displayName: 'Jay Patel',
          relationship: 'child',
          age: 17,
          gender: 'male',
          maritalStatus: 'single',
          occupation: 'student',
          educationLevel: 'class_11_12',
          institutionType: 'government',
          disability: 'no',
        },
      ],
    }

    // Evaluate primary applicant (farmer)
    const primarySubject = buildSubject(profile)
    const primaryEval = evaluateScheme(mockScheme, primarySubject, FIXED_NOW)
    // mockScheme requires student -> farmer fails mandatory rule
    expect(primaryEval.state).toBe('not_matching')

    // Evaluate family member (student son)
    const memberSubject = buildSubject(profile, 'member-student-son')
    const memberEval = evaluateScheme(mockScheme, memberSubject, FIXED_NOW)
    // Son is student, Gujarat resident, income under 1L <= 6L -> passes!
    expect(memberEval.state).toBe('likely')
  })

  it('acceptance: changing one mandatory answer changes the evaluation state', () => {
    // Initial: Gujarat resident student with income 1L-2.5L -> likely
    const initialEval = evaluateScheme(mockScheme, baseSubject, FIXED_NOW)
    expect(initialEval.state).toBe('likely')

    // Change single mandatory field: residenceState from Gujarat to Other
    const changedSubject: EvaluationSubject = {
      ...baseSubject,
      residenceState: 'Other',
    }
    const modifiedEval = evaluateScheme(mockScheme, changedSubject, FIXED_NOW)
    expect(modifiedEval.state).toBe('not_matching')
    expect(modifiedEval.state).not.toBe(initialEval.state)
  })

  it('is completely deterministic: identical calls yield identical results', () => {
    const run1 = evaluateScheme(mockScheme, baseSubject, FIXED_NOW)
    const run2 = evaluateScheme(mockScheme, baseSubject, FIXED_NOW)
    expect(run1).toEqual(run2)
  })
})
