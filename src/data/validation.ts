import { z } from 'zod'
import { PROFILE_FIELDS } from '../domain/profile.fields'
import type { RuleField } from '../domain/profile.types'
import { DOCUMENT_CATALOG_MAP } from './documentCatalog'
import type { DocumentTypeId } from '../domain/document.types'
import type { SchemeRecord } from '../domain/scheme.types'
import type { BeneficiaryProfile } from '../domain/profile.types'
import type { SampleHelperFamily } from './helperFamilies'

export const LocalisedTextSchema = z.object({
  en: z.string().min(1, 'English string cannot be empty'),
  gu: z.string().min(1, 'Gujarati string cannot be empty'),
  hi: z.string().min(1, 'Hindi string cannot be empty'),
})

export const RuleOperatorSchema = z.enum(['eq', 'lte', 'gte', 'in', 'exists'])

export const SchemeRuleSchema = z
  .object({
    id: z.string().min(1),
    field: z.string().refine((val): val is RuleField => val in PROFILE_FIELDS, {
      message: 'Field must be a valid RuleField defined in PROFILE_FIELDS registry',
    }),
    operator: RuleOperatorSchema,
    value: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
    mandatory: z.boolean(),
    label: LocalisedTextSchema,
    explanation: LocalisedTextSchema.optional(),
  })
  .superRefine((rule, ctx) => {
    const fieldDef = PROFILE_FIELDS[rule.field as RuleField]
    if (!fieldDef) return

    // Operator and value compatibility checks
    if (rule.operator === 'lte' || rule.operator === 'gte') {
      if (typeof rule.value !== 'number') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Numeric operators (lte, gte) require a numeric value for field "${rule.field}"`,
        })
      }
    } else if (rule.operator === 'in') {
      if (!Array.isArray(rule.value) || rule.value.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Operator "in" requires a non-empty array of values for field "${rule.field}"`,
        })
      } else if (fieldDef.allowedValues) {
        const invalidVals = rule.value.filter(
          (v) => !fieldDef.allowedValues?.includes(v)
        )
        if (invalidVals.length > 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Values [${invalidVals.join(', ')}] are not in allowedValues for field "${rule.field}"`,
          })
        }
      }
    } else if (rule.operator === 'eq') {
      if (typeof rule.value !== 'string' && typeof rule.value !== 'number') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Operator "eq" requires a string or number value for field "${rule.field}"`,
        })
      } else if (
        fieldDef.kind === 'enum' &&
        fieldDef.allowedValues &&
        typeof rule.value === 'string' &&
        !fieldDef.allowedValues.includes(rule.value)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Value "${rule.value}" is not an allowed enum value for field "${rule.field}"`,
        })
      }
    }
  })

export const SchemeDocumentRequirementSchema = z.object({
  documentTypeId: z.string().refine(
    (val): val is DocumentTypeId => val in DOCUMENT_CATALOG_MAP,
    {
      message: 'documentTypeId must exist in canonical documentCatalog',
    }
  ),
  required: z.boolean(),
  helpText: LocalisedTextSchema,
  whereToGet: z
    .object({
      en: z.array(z.string().min(1)),
      gu: z.array(z.string().min(1)),
      hi: z.array(z.string().min(1)),
    })
    .optional(),
  issuingAuthority: LocalisedTextSchema.optional(),
})

export const SchemeRecordSchema = z
  .object({
    id: z.string().min(1),
    name: LocalisedTextSchema,
    department: LocalisedTextSchema,
    summary: LocalisedTextSchema,
    benefitDescription: LocalisedTextSchema,
    beneficiaryScope: z.enum(['individual', 'household']),
    rules: z.array(SchemeRuleSchema).refine(
      (rules) => rules.some((r) => r.mandatory),
      {
        message: 'Scheme must contain at least one mandatory rule',
      }
    ),
    requiredDocuments: z.array(SchemeDocumentRequirementSchema),
    applicationSteps: z.object({
      en: z.array(z.string().min(1)),
      gu: z.array(z.string().min(1)),
      hi: z.array(z.string().min(1)),
    }),
    applicationUrl: z
      .string()
      .regex(/^https:\/\//, 'applicationUrl must start with https:// if provided')
      .nullable(),
    sourceUrl: z
      .string()
      .regex(/^https:\/\//, 'sourceUrl must start with https://'),
    lastVerifiedAt: z.string().nullable(),
    version: z.string().min(1),
    verification: z.object({
      status: z.enum(['verified', 'needs_review', 'demo_placeholder']),
      reviewer: z.string().nullable(),
      note: z.string().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    // lastVerifiedAt must be null unless verified
    if (data.verification.status !== 'verified' && data.lastVerifiedAt !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Scheme "${data.id}": lastVerifiedAt must be null unless verification.status is "verified"`,
      })
    }
  })

export const BeneficiaryProfileSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  isSynthetic: z.literal(true),
  // PersonFacts
  age: z.number().nullable(),
  gender: z.enum(['female', 'male', 'other', 'unknown']),
  maritalStatus: z.enum(['single', 'married', 'widowed', 'divorced_or_separated', 'unknown']),
  occupation: z.enum([
    'student',
    'farmer',
    'self_employed',
    'salaried',
    'unemployed',
    'homemaker',
    'retired_or_senior',
    'other',
    'unknown',
  ]),
  educationLevel: z.enum([
    'below_class_8',
    'class_8_to_10',
    'class_11_12',
    'diploma_or_iti',
    'undergraduate',
    'postgraduate',
    'other',
    'unknown',
  ]),
  institutionType: z.enum([
    'government',
    'government_aided',
    'private',
    'not_applicable',
    'unknown',
  ]),
  disability: z.enum(['yes', 'no', 'unknown']),
  // HouseholdFacts
  district: z.string().nullable(),
  residenceState: z.enum(['Gujarat', 'Other', 'unknown']),
  category: z.enum(['general', 'sc', 'st', 'sebc', 'ews', 'other', 'unknown']),
  annualHouseholdIncome: z.enum(['under_1l', '1l_2_5l', '2_5l_5l', 'above_5l', 'unknown']),
  ownsAgriculturalLand: z.enum(['yes', 'no', 'unknown']),
  rationCardType: z.enum(['aay', 'bpl', 'apl', 'none', 'unknown']),
  familyMembers: z.array(
    z.object({
      id: z.string().min(1),
      displayName: z.string().min(1),
      relationship: z.enum(['self', 'spouse', 'child', 'parent', 'sibling', 'other']),
      age: z.number().nullable(),
      gender: z.enum(['female', 'male', 'other', 'unknown']),
      maritalStatus: z.enum(['single', 'married', 'widowed', 'divorced_or_separated', 'unknown']),
      occupation: z.enum([
        'student',
        'farmer',
        'self_employed',
        'salaried',
        'unemployed',
        'homemaker',
        'retired_or_senior',
        'other',
        'unknown',
      ]),
      educationLevel: z.enum([
        'below_class_8',
        'class_8_to_10',
        'class_11_12',
        'diploma_or_iti',
        'undergraduate',
        'postgraduate',
        'other',
        'unknown',
      ]),
      institutionType: z.enum([
        'government',
        'government_aided',
        'private',
        'not_applicable',
        'unknown',
      ]),
      disability: z.enum(['yes', 'no', 'unknown']),
    })
  ),
})

export const SampleHelperFamilySchema = z.object({
  id: z.string().min(1),
  familyName: LocalisedTextSchema,
  district: z.string().min(1),
  headOfHousehold: z.string().min(1),
  membersCount: z.number().positive(),
  missingDocsCount: z.number().nonnegative(),
  primarySchemeId: z.string().min(1),
  primarySchemeName: LocalisedTextSchema,
  lastAssistedAt: z.string().min(1),
})

/**
 * Validates schemes dataset. Fails loudly on invalid schemas.
 */
export function validateSchemes(schemes: SchemeRecord[]): SchemeRecord[] {
  const result = z.array(SchemeRecordSchema).safeParse(schemes)
  if (!result.success) {
    const errorDetails = result.error.issues
      .map((e) => `[${e.path.join('.')}]: ${e.message}`)
      .join('; ')
    throw new Error(`Data validation failed for schemes dataset: ${errorDetails}`)
  }
  return result.data as SchemeRecord[]
}

/**
 * Validates sample personas. Fails loudly on invalid schemas.
 */
export function validatePersonas(
  personas: Record<string, BeneficiaryProfile>
): Record<string, BeneficiaryProfile> {
  const result = z.record(z.string(), BeneficiaryProfileSchema).safeParse(personas)
  if (!result.success) {
    const errorDetails = result.error.issues
      .map((e) => `[${e.path.join('.')}]: ${e.message}`)
      .join('; ')
    throw new Error(`Data validation failed for sample personas: ${errorDetails}`)
  }
  return result.data as Record<string, BeneficiaryProfile>
}

/**
 * Validates sample helper families. Fails loudly on invalid schemas.
 */
export function validateHelperFamilies(
  families: SampleHelperFamily[]
): SampleHelperFamily[] {
  const result = z.array(SampleHelperFamilySchema).safeParse(families)
  if (!result.success) {
    const errorDetails = result.error.issues
      .map((e) => `[${e.path.join('.')}]: ${e.message}`)
      .join('; ')
    throw new Error(`Data validation failed for helper families: ${errorDetails}`)
  }
  return result.data as SampleHelperFamily[]
}
