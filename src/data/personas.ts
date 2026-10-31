import type { BeneficiaryProfile } from '../domain/journey.types'

export const SAMPLE_PERSONAS: Record<'student' | 'farmer' | 'senior', BeneficiaryProfile> = {
  student: {
    id: 'sample-student',
    displayName: 'Pooja Patel (Sample Student)',
    district: 'Ahmedabad',
    residenceState: 'Gujarat',
    age: 19,
    occupation: 'student',
    course: 'B.Sc. Nursing',
    institutionType: 'Government College',
    category: 'ews',
    annualHouseholdIncome: '1l_2_5l',
    disability: 'no',
  },
  farmer: {
    id: 'sample-farmer',
    displayName: 'Rameshbhai Patel (Sample Farmer)',
    district: 'Mehsana',
    residenceState: 'Gujarat',
    age: 48,
    occupation: 'farmer',
    category: 'general',
    annualHouseholdIncome: 'under_1l',
    disability: 'no',
  },
  senior: {
    id: 'sample-senior',
    displayName: 'Kantilal Shah (Sample Senior)',
    district: 'Vadodara',
    residenceState: 'Gujarat',
    age: 68,
    occupation: 'senior',
    category: 'general',
    annualHouseholdIncome: 'under_1l',
    disability: 'no',
  },
}
