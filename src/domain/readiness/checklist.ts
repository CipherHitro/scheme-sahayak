import type { SchemeRecord } from '../scheme.types'
import type { EvaluationSubject, Language } from '../profile.types'
import type { DocumentTypeId } from '../document.types'
import { DOCUMENT_CATALOG_MAP } from '../../data/documentCatalog'

export interface ChecklistItem {
  documentTypeId: DocumentTypeId
  name: string
  isReady: boolean
  isFromSample: boolean
  issuingAuthority?: string
  whereToGet: string[]
}

export interface SchemeChecklist {
  schemeId: string
  schemeName: string
  departmentName: string
  subjectId: string
  subjectName: string
  items: ChecklistItem[]
  readyItems: ChecklistItem[]
  missingItems: ChecklistItem[]
  readyCount: number
  missingCount: number
  totalCount: number
  readinessRatio: number
  applicationUrl: string | null
  sourceUrl: string
  lastVerifiedAt: string | null
}

/**
 * Pure function to construct a preparation checklist from a scheme,
 * the active subject, and user's confirmed documents.
 * Where-to-get steps come only from the scheme record; otherwise fallback
 * to "Ask the issuing office".
 */
export function buildChecklist(
  scheme: SchemeRecord,
  subject: EvaluationSubject,
  documentConfirmations: Record<string, boolean> = {},
  language: Language = 'en'
): SchemeChecklist {
  const schemeName = scheme.name[language] ?? scheme.name.en
  const departmentName = scheme.department[language] ?? scheme.department.en
  const subjectName = subject.displayName

  const fallbackWhereToGet =
    language === 'gu'
      ? ['સંબંધિત કચેરી અથવા ઈ-ગ્રામ કેન્દ્ર પરથી માર્ગદર્શન મેળવો.']
      : language === 'hi'
      ? ['संबंधित कार्यालय या ई-ग्राम केंद्र से जानकारी प्राप्त करें।']
      : ['Ask the issuing office or local citizen service centre.']

  const items: ChecklistItem[] = (scheme.requiredDocuments ?? []).map((req) => {
    const catalogEntry = DOCUMENT_CATALOG_MAP[req.documentTypeId]
    const docName = catalogEntry?.name[language] ?? catalogEntry?.name.en ?? req.documentTypeId

    const isReady = Boolean(documentConfirmations[req.documentTypeId])
    const isFromSample = documentConfirmations[req.documentTypeId] === true

    const issuingAuthority = req.issuingAuthority
      ? req.issuingAuthority[language] ?? req.issuingAuthority.en
      : undefined

    let whereToGet: string[] = fallbackWhereToGet
    if (req.whereToGet) {
      const localisedSteps = req.whereToGet[language] ?? req.whereToGet.en
      if (Array.isArray(localisedSteps) && localisedSteps.length > 0) {
        whereToGet = localisedSteps
      }
    }

    return {
      documentTypeId: req.documentTypeId,
      name: docName,
      isReady,
      isFromSample,
      issuingAuthority,
      whereToGet,
    }
  })

  const readyItems = items.filter((i) => i.isReady)
  const missingItems = items.filter((i) => !i.isReady)
  const totalCount = items.length
  const readyCount = readyItems.length
  const missingCount = missingItems.length
  const readinessRatio = totalCount === 0 ? 1 : readyCount / totalCount

  return {
    schemeId: scheme.id,
    schemeName,
    departmentName,
    subjectId: subject.subjectId,
    subjectName,
    items,
    readyItems,
    missingItems,
    readyCount,
    missingCount,
    totalCount,
    readinessRatio,
    applicationUrl: scheme.applicationUrl ?? null,
    sourceUrl: scheme.sourceUrl,
    lastVerifiedAt: scheme.lastVerifiedAt ?? null,
  }
}
