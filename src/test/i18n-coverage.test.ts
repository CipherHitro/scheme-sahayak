import { describe, expect, it } from 'vitest'
import en from '../i18n/en.json'
import gu from '../i18n/gu.json'
import hi from '../i18n/hi.json'
import { t } from '../i18n'

/**
 * Recursively extracts all dot-notated key paths from a nested dictionary object.
 */
function getAllKeyPaths(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = []
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeyPaths(value as Record<string, unknown>, fullPath))
    } else {
      keys.push(fullPath)
    }
  }
  return keys
}

/**
 * Retrieves value at dot-notated key path.
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return undefined
    }
  }
  return current
}

describe('i18n Complete Coverage & Parity', () => {
  const enKeys = getAllKeyPaths(en)

  it('contains at least 25 canonical keys in en.json', () => {
    expect(enKeys.length).toBeGreaterThanOrEqual(25)
  })

  it('fails when gu.json lacks any key present in en.json', () => {
    const missingInGu: string[] = []
    const emptyInGu: string[] = []

    for (const keyPath of enKeys) {
      const val = getNestedValue(gu, keyPath)
      if (val === undefined) {
        missingInGu.push(keyPath)
      } else if (typeof val === 'string' && val.trim().length === 0) {
        emptyInGu.push(keyPath)
      }
    }

    expect(
      missingInGu,
      `gu.json is missing the following keys found in en.json:\n${missingInGu.join('\n')}`
    ).toEqual([])

    expect(
      emptyInGu,
      `gu.json contains empty translations for keys:\n${emptyInGu.join('\n')}`
    ).toEqual([])
  })

  it('fails when hi.json lacks any key present in en.json', () => {
    const missingInHi: string[] = []
    const emptyInHi: string[] = []

    for (const keyPath of enKeys) {
      const val = getNestedValue(hi, keyPath)
      if (val === undefined) {
        missingInHi.push(keyPath)
      } else if (typeof val === 'string' && val.trim().length === 0) {
        emptyInHi.push(keyPath)
      }
    }

    expect(
      missingInHi,
      `hi.json is missing the following keys found in en.json:\n${missingInHi.join('\n')}`
    ).toEqual([])

    expect(
      emptyInHi,
      `hi.json contains empty translations for keys:\n${emptyInHi.join('\n')}`
    ).toEqual([])
  })

  it('interpolates parameters correctly with the pure t() function', () => {
    const interpolated = t('recovery.description', { requiredFor: 'scheme results' }, 'en')
    expect(interpolated).toContain('To view scheme results, SchemeSahayak needs your answers')
  })
})
