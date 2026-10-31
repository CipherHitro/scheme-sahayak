import type { BeneficiaryProfile, EvaluationSubject } from './profile.types'

/**
 * Pure function that merges household facts with the chosen person's facts
 * and returns an EvaluationSubject suitable for the eligibility engine.
 *
 * @param profile The full beneficiary profile containing household facts and family members.
 * @param memberId Optional member id. If omitted or matching the primary applicant, returns the primary applicant.
 */
export function buildSubject(
  profile: BeneficiaryProfile,
  memberId?: string
): EvaluationSubject {
  // If no memberId is passed or it targets the primary applicant
  if (!memberId || memberId === profile.id || memberId === 'self') {
    return {
      subjectId: profile.id,
      displayName: profile.displayName,
      // PersonFacts:
      age: profile.age,
      gender: profile.gender,
      maritalStatus: profile.maritalStatus,
      occupation: profile.occupation,
      educationLevel: profile.educationLevel,
      institutionType: profile.institutionType,
      disability: profile.disability,
      // HouseholdFacts:
      district: profile.district,
      residenceState: profile.residenceState,
      category: profile.category,
      annualHouseholdIncome: profile.annualHouseholdIncome,
      ownsAgriculturalLand: profile.ownsAgriculturalLand,
      rationCardType: profile.rationCardType,
    }
  }

  // Look for family member
  const member = profile.familyMembers?.find((m) => m.id === memberId)
  if (!member) {
    throw new Error(
      `Family member with id "${memberId}" was not found in profile "${profile.id}"`
    )
  }

  return {
    subjectId: member.id,
    displayName: member.displayName,
    // PersonFacts from family member:
    age: member.age,
    gender: member.gender,
    maritalStatus: member.maritalStatus,
    occupation: member.occupation,
    educationLevel: member.educationLevel,
    institutionType: member.institutionType,
    disability: member.disability,
    // HouseholdFacts from household profile:
    district: profile.district,
    residenceState: profile.residenceState,
    category: profile.category,
    annualHouseholdIncome: profile.annualHouseholdIncome,
    ownsAgriculturalLand: profile.ownsAgriculturalLand,
    rationCardType: profile.rationCardType,
  }
}
