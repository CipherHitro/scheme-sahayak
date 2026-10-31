export interface SampleFamily {
  id: string
  familyName: string
  district: string
  membersCount: number
  missingDocsCount: number
  primaryScheme: string
}

export const SAMPLE_FAMILIES: SampleFamily[] = [
  {
    id: 'fam-patel',
    familyName: 'Rameshbhai Patel Household',
    district: 'Mehsana',
    membersCount: 4,
    missingDocsCount: 2,
    primaryScheme: 'Kisan Sahay Yojana',
  },
  {
    id: 'fam-shah',
    familyName: 'Kantilal Shah Household',
    district: 'Vadodara',
    membersCount: 2,
    missingDocsCount: 1,
    primaryScheme: 'Senior Citizen Pension',
  },
  {
    id: 'fam-vankar',
    familyName: 'Dineshbhai Vankar Household',
    district: 'Sabarkantha',
    membersCount: 5,
    missingDocsCount: 3,
    primaryScheme: 'Manav Garima Yojana',
  },
]
