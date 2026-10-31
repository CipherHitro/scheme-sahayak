import type { DocumentStatus } from './scheme.types'

export type DocumentSource =
  | 'profile'
  | 'synthetic_sample'
  | 'user_confirmed'
  | 'not_provided'

export interface DocumentReadiness {
  documentId: string
  status: DocumentStatus
  source: DocumentSource
}

export interface ExtractedField {
  id: string
  label: string
  value: string
  confidence?: number
}

export interface SyntheticDocumentAsset {
  id: string
  title: string
  documentType: 'income_certificate' | 'caste_certificate' | 'marksheet' | 'ration_card'
  watermarkLabel: string
  filePath: string
  fields: ExtractedField[]
  disclaimer: string
}
