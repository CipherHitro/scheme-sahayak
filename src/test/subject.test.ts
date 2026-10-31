import { describe, expect, it } from 'vitest'
import { buildSubject } from '../domain/subject'
import type { BeneficiaryProfile } from '../domain/profile.types'

const mockProfile: BeneficiaryProfile = {
  id: 'profile-1',
  displayName: 'Pooja Patel',
  isSynthetic: true,
  // PersonFacts
  age: 19,
  gender: 'female',
  maritalStatus: 'single',
  occupation: 'student',
  educationLevel: 'undergraduate',
  institutionType: 'government',
  disability: 'no',
  // HouseholdFacts
  district: 'Ahmedabad',
  residenceState: 'Gujarat',
  category: 'ews',
  annualHouseholdIncome: '1l_2_5l',
  ownsAgriculturalLand: 'no',
  rationCardType: 'none',
  familyMembers: [
    {
      id: 'member-father',
      displayName: 'Sureshbhai Patel',
      relationship: 'parent',
      age: 51,
      gender: 'male',
      maritalStatus: 'married',
      occupation: 'salaried',
      educationLevel: 'class_8_to_10',
      institutionType: 'not_applicable',
      disability: 'no',
    },
    {
      id: 'member-mother',
      displayName: 'Hansaben Patel',
      relationship: 'parent',
      age: 47,
      gender: 'female',
      maritalStatus: 'married',
      occupation: 'homemaker',
      educationLevel: 'below_class_8',
      institutionType: 'not_applicable',
      disability: 'no',
    },
  ],
}

describe('buildSubject pure function', () => {
  it('merges primary applicant person facts with household facts when no memberId is passed', () => {
    const subject = buildSubject(mockProfile)
    expect(subject.subjectId).toBe('profile-1')
    expect(subject.displayName).toBe('Pooja Patel')
    expect(subject.age).toBe(19)
    expect(subject.gender).toBe('female')
    expect(subject.occupation).toBe('student')
    expect(subject.educationLevel).toBe('undergraduate')
    expect(subject.institutionType).toBe('government')
    expect(subject.disability).toBe('no')
    expect(subject.district).toBe('Ahmedabad')
    expect(subject.residenceState).toBe('Gujarat')
    expect(subject.category).toBe('ews')
    expect(subject.annualHouseholdIncome).toBe('1l_2_5l')
    expect(subject.ownsAgriculturalLand).toBe('no')
  })

  it('merges primary applicant person facts when memberId is "self" or profile.id', () => {
    const selfSubject = buildSubject(mockProfile, 'self')
    expect(selfSubject.subjectId).toBe('profile-1')
    expect(selfSubject.displayName).toBe('Pooja Patel')

    const idSubject = buildSubject(mockProfile, 'profile-1')
    expect(idSubject.subjectId).toBe('profile-1')
  })

  it('merges family member person facts with household facts when memberId is provided', () => {
    const fatherSubject = buildSubject(mockProfile, 'member-father')
    expect(fatherSubject.subjectId).toBe('member-father')
    expect(fatherSubject.displayName).toBe('Sureshbhai Patel')
    // Member's personal facts
    expect(fatherSubject.age).toBe(51)
    expect(fatherSubject.gender).toBe('male')
    expect(fatherSubject.occupation).toBe('salaried')
    expect(fatherSubject.educationLevel).toBe('class_8_to_10')
    expect(fatherSubject.institutionType).toBe('not_applicable')
    // Retains household facts
    expect(fatherSubject.district).toBe('Ahmedabad')
    expect(fatherSubject.residenceState).toBe('Gujarat')
    expect(fatherSubject.category).toBe('ews')
    expect(fatherSubject.annualHouseholdIncome).toBe('1l_2_5l')
    expect(fatherSubject.ownsAgriculturalLand).toBe('no')
  })

  it('throws an error if an unknown memberId is specified', () => {
    expect(() => buildSubject(mockProfile, 'nonexistent-member')).toThrow(
      'Family member with id "nonexistent-member" was not found in profile "profile-1"'
    )
  })
})
