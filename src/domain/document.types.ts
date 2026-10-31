import type { Language, LocalisedText } from './profile.types'

export type DocumentTypeId =
  | 'income_certificate'
  | 'marksheet'
  | 'caste_certificate'
  | 'bonafide_certificate'
  | 'domicile_certificate'
  | 'disability_certificate'
  | 'ration_card'
  | 'land_record_7_12'
  | 'bank_passbook'
  | 'identity_proof'

export interface DocumentCatalogEntry {
  id: DocumentTypeId
  name: LocalisedText
}

export interface SchemeDocumentRequirement {
  documentTypeId: DocumentTypeId
  required: boolean
  helpText: LocalisedText
  whereToGet?: Record<Language, string[]>
  issuingAuthority?: LocalisedText
}

export type DocumentStatus = 'ready' | 'missing' | 'unknown'

export interface DocumentReadiness {
  documentTypeId: DocumentTypeId
  status: DocumentStatus
  source: 'profile' | 'synthetic_sample' | 'user_confirmed' | 'not_provided'
}

export interface SampleDocument {
  id: string
  documentTypeId: DocumentTypeId
  assetPath: string
  fields: { key: string; label: LocalisedText; value: string }[]
}
