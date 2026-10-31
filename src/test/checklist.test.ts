import { describe, it, expect } from 'vitest'
import { buildChecklist } from '../domain/readiness/checklist'
import { SCHEMES_DATASET } from '../data/schemes'
import type { EvaluationSubject } from '../domain/profile.types'

const MOCK_SUBJECT: EvaluationSubject = {
  subjectId: 'subj-pooja',
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
}

describe('buildChecklist pure domain function', () => {
  const mysyScheme = SCHEMES_DATASET.find((s) => s.id === 'mysy')!

  it('builds checklist with all items missing when confirmations are empty', () => {
    const checklist = buildChecklist(mysyScheme, MOCK_SUBJECT, {}, 'en')

    expect(checklist.schemeId).toBe('mysy')
    expect(checklist.subjectName).toBe('Pooja Patel')
    expect(checklist.totalCount).toBeGreaterThan(0)
    expect(checklist.readyCount).toBe(0)
    expect(checklist.missingCount).toBe(checklist.totalCount)
    expect(checklist.readyItems).toEqual([])
    expect(checklist.missingItems.length).toBe(checklist.totalCount)

    // Checks that each missing item has whereToGet steps
    for (const item of checklist.missingItems) {
      expect(item.whereToGet.length).toBeGreaterThan(0)
      expect(item.isReady).toBe(false)
    }
  })

  it('updates readiness when a canonical documentTypeId is confirmed', () => {
    const confirmations = { income_certificate: true }
    const checklist = buildChecklist(mysyScheme, MOCK_SUBJECT, confirmations, 'en')

    expect(checklist.readyCount).toBe(1)
    expect(checklist.missingCount).toBe(checklist.totalCount - 1)

    const incomeItem = checklist.readyItems.find((i) => i.documentTypeId === 'income_certificate')
    expect(incomeItem).toBeDefined()
    expect(incomeItem?.isReady).toBe(true)
    expect(incomeItem?.isFromSample).toBe(true)
  })

  it('localises scheme name, document names and whereToGet steps in Gujarati and Hindi', () => {
    const guChecklist = buildChecklist(mysyScheme, MOCK_SUBJECT, {}, 'gu')
    expect(guChecklist.schemeName).toContain('મુખ્યમંત્રી')
    const incomeDocGu = guChecklist.items.find((i) => i.documentTypeId === 'income_certificate')
    expect(incomeDocGu?.name).toBe('આવકનું પ્રમાણપત્ર')

    const hiChecklist = buildChecklist(mysyScheme, MOCK_SUBJECT, {}, 'hi')
    expect(hiChecklist.schemeName).toContain('मुख्यमंत्री')
    const incomeDocHi = hiChecklist.items.find((i) => i.documentTypeId === 'income_certificate')
    expect(incomeDocHi?.name).toBe('आय प्रमाण पत्र')
  })

  it('uses honest URL and lastVerifiedAt from scheme record', () => {
    const checklist = buildChecklist(mysyScheme, MOCK_SUBJECT, {}, 'en')
    expect(checklist.sourceUrl).toBe('https://mysy.guj.nic.in/')
    expect(checklist.lastVerifiedAt).toBe(mysyScheme.lastVerifiedAt)
  })
})
