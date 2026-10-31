import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UsersThree,
  ArrowLeft,
  Plus,
  ShieldCheck,
  CaretRight,
  FileText,
  UserCheck,
  X,
  CheckCircle,
  ArrowCounterClockwise,
} from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { DotRow } from '../../components/domain/DotRow'
import { useJourney } from '../../app/journey-context'
import { useTranslation, t } from '../../i18n'
import { SAMPLE_FAMILIES, type SampleHelperFamily } from '../../data/helperFamilies'
import { SCHEMES_DATASET } from '../../data/schemes'
import { formatNumber } from '../../lib/formatters'

const HELPER_STORAGE_KEY = 'scheme_sahayak_helper_families'

const GUJARAT_DISTRICTS = [
  'Ahmedabad',
  'Amreli',
  'Anand',
  'Aravalli',
  'Banaskantha',
  'Bharuch',
  'Bhavnagar',
  'Botad',
  'Chhotaudepur',
  'Dahod',
  'Dang',
  'Devbhoomi Dwarka',
  'Gandhinagar',
  'Gir Somnath',
  'Jamnagar',
  'Junagadh',
  'Kutch',
  'Kheda',
  'Mahisagar',
  'Mehsana',
  'Morbi',
  'Narmada',
  'Navsari',
  'Panchmahal',
  'Patan',
  'Porbandar',
  'Rajkot',
  'Sabarkantha',
  'Surat',
  'Surendranagar',
  'Tapi',
  'Vadodara',
  'Valsad',
]

export function HelperPage() {
  const navigate = useNavigate()
  const { language, setMode } = useJourney()
  const { t: tr } = useTranslation()

  // Load custom added families or initialize with SAMPLE_FAMILIES
  const [families, setFamilies] = useState<SampleHelperFamily[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(HELPER_STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored) as SampleHelperFamily[]
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed
          }
        }
      } catch {
        // Fall back to default sample families
      }
    }
    return SAMPLE_FAMILIES
  })

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Add Family Form State
  const [familyNameInput, setFamilyNameInput] = useState('')
  const [headNameInput, setHeadNameInput] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('Ahmedabad')
  const [selectedSchemeId, setSelectedSchemeId] = useState('pm-kisan')
  const [membersCountInput, setMembersCountInput] = useState('4')
  const [missingDocsInput, setMissingDocsInput] = useState('2')
  const [consentConfirmed, setConsentConfirmed] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Computed summary metrics from active records
  const totalHouseholds = families.length
  const totalMissingDocs = useMemo(
    () => families.reduce((acc, f) => acc + (f.missingDocsCount || 0), 0),
    [families],
  )
  const totalMembers = useMemo(
    () => families.reduce((acc, f) => acc + (f.membersCount || 0), 0),
    [families],
  )

  const handleOpenFamily = (familyId: string) => {
    navigate(`/helper/families/${familyId}`)
  }

  const handleResetFamilies = () => {
    setFamilies(SAMPLE_FAMILIES)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(HELPER_STORAGE_KEY)
    }
    setSuccessMessage(tr.helper.resetSampleFamilies)
    setTimeout(() => setSuccessMessage(null), 4000)
  }

  const handleSaveNewFamily = (e: React.FormEvent) => {
    e.preventDefault()
    if (!familyNameInput.trim()) {
      setFormError('Please enter a family or household name.')
      return
    }
    if (!headNameInput.trim()) {
      setFormError('Please enter the head of household name.')
      return
    }
    if (!consentConfirmed) {
      setFormError('Informed consent from the household is required before saving.')
      return
    }

    const schemeObj = (SCHEMES_DATASET || []).find((s) => s.id === selectedSchemeId)
    const schemeName = schemeObj?.name ?? {
      en: 'Government Scheme',
      gu: 'સરકારી યોજના',
      hi: 'सरकारी योजना',
    }

    const newFamily: SampleHelperFamily = {
      id: `fam-local-${Date.now()}`,
      familyName: {
        en: familyNameInput.trim(),
        gu: familyNameInput.trim(),
        hi: familyNameInput.trim(),
      },
      district: selectedDistrict,
      headOfHousehold: headNameInput.trim(),
      membersCount: Math.max(1, parseInt(membersCountInput, 10) || 1),
      missingDocsCount: Math.max(0, parseInt(missingDocsInput, 10) || 0),
      primarySchemeId: selectedSchemeId,
      primarySchemeName: schemeName,
      lastAssistedAt: new Date().toISOString().split('T')[0],
    }

    const updated = [newFamily, ...families]
    setFamilies(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem(HELPER_STORAGE_KEY, JSON.stringify(updated))
    }

    // Reset form
    setFamilyNameInput('')
    setHeadNameInput('')
    setConsentConfirmed(false)
    setFormError(null)
    setIsAddModalOpen(false)
    setSuccessMessage(tr.helper.householdAddedSuccess)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  return (
    <AppShell singleColumn={false}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb / Mode info */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => {
              setMode('citizen')
              navigate('/')
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-ink-2 hover:text-neel cursor-pointer min-h-[48px]"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
            <span>{tr.helper.backToWelcome}</span>
          </button>
          <div className="inline-flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
              Route: /helper • CSC Helper Mode
            </span>
            <span className="px-2.5 py-1 rounded-[10px] bg-haldi-soft text-haldi-ink text-xs font-bold">
              {tr.helper.sampleDataBadge}
            </span>
          </div>
        </nav>

        {/* Page Title & Mission */}
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-[10px] bg-neel text-paper flex items-center justify-center shrink-0">
              <UsersThree className="size-6" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neel tracking-tight">
              {tr.helper.title}
            </h1>
          </div>
          <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
            {tr.helper.subtitle}
          </p>
        </header>

        {/* Informed Consent Requirement Banner */}
        <div
          role="region"
          aria-labelledby="helper-consent-title"
          className="p-4 sm:p-5 rounded-[14px] bg-paper border-[1.5px] border-mor/40 flex items-start gap-3.5"
        >
          <div className="size-9 rounded-full bg-mor-soft text-mor flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="size-5" weight="fill" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h2 id="helper-consent-title" className="text-sm font-bold text-neel">
              {tr.helper.consentNoticeTitle}
            </h2>
            <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
              {tr.helper.consentNoticeDesc}
            </p>
          </div>
        </div>

        {/* Live Notification Banner */}
        {successMessage && (
          <div
            role="status"
            aria-live="polite"
            className="p-3.5 rounded-[10px] bg-mor-soft border border-mor text-mor text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            <CheckCircle className="size-4 shrink-0" weight="fill" aria-hidden="true" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Summary Metrics Section (Computed from active records) */}
        <section aria-labelledby="metrics-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="metrics-heading" className="text-sm font-bold text-neel flex items-center gap-2">
              <span>{tr.helper.metricsTitle}</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-haldi-soft text-haldi-ink">
                {tr.helper.sampleDataBadge}
              </span>
            </h2>
            {families.length !== SAMPLE_FAMILIES.length && (
              <button
                type="button"
                onClick={handleResetFamilies}
                className="inline-flex items-center gap-1 text-xs text-ink-2 hover:text-neel cursor-pointer min-h-[48px] px-2"
              >
                <ArrowCounterClockwise className="size-3.5" aria-hidden="true" />
                <span>{tr.helper.resetSampleFamilies}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1: Households Screened */}
            <div className="bg-paper border border-line rounded-[14px] p-4 space-y-1">
              <span className="text-xs font-semibold text-ink-2 block">
                {tr.helper.totalHouseholds}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-neel tabular-nums">
                  {formatNumber(totalHouseholds, language)}
                </span>
                <UserCheck className="size-5 text-mor shrink-0" aria-hidden="true" />
              </div>
            </div>

            {/* Metric 2: Missing Documents Across Records */}
            <div className="bg-paper border border-line rounded-[14px] p-4 space-y-1">
              <span className="text-xs font-semibold text-ink-2 block">
                {tr.helper.totalMissingDocs}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-madder tabular-nums">
                  {formatNumber(totalMissingDocs, language)}
                </span>
                <FileText className="size-5 text-madder shrink-0" aria-hidden="true" />
              </div>
            </div>

            {/* Metric 3: Individuals Assisted */}
            <div className="bg-paper border border-line rounded-[14px] p-4 space-y-1">
              <span className="text-xs font-semibold text-ink-2 block">
                {tr.helper.totalMembers}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-neel tabular-nums">
                  {formatNumber(totalMembers, language)}
                </span>
                <UsersThree className="size-5 text-neel shrink-0" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* Ledger Header & Add Family Action */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neel">
              {tr.helper.ledgerTitle}
            </h2>
            <p className="text-xs text-ink-2">
              Tap any household to view matched schemes and required documents.
            </p>
          </div>
          <Button
            size="compact"
            variant="primary"
            icon={<Plus aria-hidden="true" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            {tr.helper.addFamilyBtn}
          </Button>
        </div>

        {/* Family Ledger Rows */}
        <div
          role="feed"
          aria-label={tr.helper.ledgerTitle}
          className="bg-paper border border-line rounded-[14px] divide-y divide-line overflow-hidden"
        >
          {families.map((family) => {
            const familyTitle = family.familyName[language] ?? family.familyName.en
            const schemeTitle = family.primarySchemeName[language] ?? family.primarySchemeName.en
            const isLocal = family.id.startsWith('fam-local-')

            // Look up total required documents for scheme to compute DotRow
            const schemeObj = (SCHEMES_DATASET || []).find((s) => s.id === family.primarySchemeId)
            const schemeDocs = schemeObj?.requiredDocuments ?? []
            const totalDocs = schemeDocs.length > 0 ? schemeDocs.length : 4
            const readyDocs = Math.max(0, totalDocs - family.missingDocsCount)

            return (
              <article
                key={family.id}
                role="button"
                tabIndex={0}
                aria-label={`${familyTitle}, ${family.district}, ${family.membersCount} members. Primary scheme: ${schemeTitle}. ${family.missingDocsCount} documents missing.`}
                onClick={() => handleOpenFamily(family.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleOpenFamily(family.id)
                  }
                }}
                className="p-4 sm:p-5 hover:bg-salt/60 focus-visible:bg-salt transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-base text-neel">
                      {familyTitle}
                    </span>
                    {isLocal && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neel-soft text-neel">
                        {tr.helper.localRecordBadge}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-ink-2 flex items-center gap-2 flex-wrap">
                    <span>{t('helper.headLabel', { name: family.headOfHousehold }, language)}</span>
                    <span aria-hidden="true">•</span>
                    <span>{t('helper.districtLabel', { district: family.district }, language)}</span>
                    <span aria-hidden="true">•</span>
                    <span>{t('helper.membersCount', { count: family.membersCount }, language)}</span>
                  </div>

                  <div className="text-xs font-semibold text-neel pt-0.5">
                    {t('helper.primaryScheme', { scheme: schemeTitle }, language)}
                  </div>

                  {/* Readiness DotRow */}
                  <div className="pt-1">
                    <DotRow
                      type="document"
                      passedCount={readyDocs}
                      failedCount={family.missingDocsCount}
                      totalCount={totalDocs}
                      language={language}
                    />
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-line/60">
                  {family.missingDocsCount > 0 ? (
                    <span className="px-2.5 py-1 rounded-[10px] bg-madder-soft text-madder text-xs font-bold">
                      {t('helper.missingDocsBadge', { count: family.missingDocsCount }, language)}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-[10px] bg-mor-soft text-mor text-xs font-bold">
                      {tr.helper.allDocsReadyBadge}
                    </span>
                  )}

                  <div className="flex items-center gap-1 text-xs text-ink-2">
                    <span className="hidden sm:inline">{tr.helper.viewFamilyBtn}</span>
                    <CaretRight className="size-4 text-ink-2" aria-hidden="true" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 pb-8 flex-wrap gap-3">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft aria-hidden="true" />}
            onClick={() => {
              setMode('citizen')
              navigate('/')
            }}
          >
            {tr.helper.backToWelcome}
          </Button>

          <Button
            size="compact"
            variant="secondary"
            icon={<Plus aria-hidden="true" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            {tr.helper.addFamilyBtn}
          </Button>
        </div>

        {/* Add Family Working Modal Dialog */}
        {isAddModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-family-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neel/60 backdrop-blur-[2px]"
          >
            <div className="bg-paper border-[1.5px] border-line rounded-[18px] max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-none">
              <div className="flex items-start justify-between gap-2 border-b border-line pb-3">
                <div>
                  <h2 id="add-family-title" className="text-lg font-bold text-neel">
                    {tr.helper.addFamilyModalTitle}
                  </h2>
                  <p className="text-xs text-ink-2 mt-0.5">
                    {tr.helper.addFamilyModalDesc}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={tr.common.close}
                  onClick={() => setIsAddModalOpen(false)}
                  className="size-11 rounded-[10px] flex items-center justify-center hover:bg-salt text-ink-2 hover:text-neel cursor-pointer"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="p-3 rounded-[10px] bg-madder-soft border border-madder text-madder text-xs font-semibold"
                >
                  {formError}
                </div>
              )}

              <form onSubmit={handleSaveNewFamily} className="space-y-4">
                {/* Family Name */}
                <div className="space-y-1">
                  <label htmlFor="family-name-input" className="text-xs font-bold text-neel block">
                    {tr.helper.familyNameLabel} *
                  </label>
                  <input
                    id="family-name-input"
                    type="text"
                    required
                    value={familyNameInput}
                    onChange={(e) => setFamilyNameInput(e.target.value)}
                    placeholder={tr.helper.familyNamePlaceholder}
                    className="w-full min-h-[48px] px-3.5 rounded-[10px] bg-salt border border-line text-sm text-neel focus:border-neel focus:bg-paper outline-none transition-colors"
                  />
                </div>

                {/* Head of Household */}
                <div className="space-y-1">
                  <label htmlFor="head-name-input" className="text-xs font-bold text-neel block">
                    {tr.helper.headNameLabel} *
                  </label>
                  <input
                    id="head-name-input"
                    type="text"
                    required
                    value={headNameInput}
                    onChange={(e) => setHeadNameInput(e.target.value)}
                    placeholder={tr.helper.headNamePlaceholder}
                    className="w-full min-h-[48px] px-3.5 rounded-[10px] bg-salt border border-line text-sm text-neel focus:border-neel focus:bg-paper outline-none transition-colors"
                  />
                </div>

                {/* District Dropdown */}
                <div className="space-y-1">
                  <label htmlFor="district-select" className="text-xs font-bold text-neel block">
                    {tr.helper.selectDistrictLabel}
                  </label>
                  <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full min-h-[48px] px-3.5 rounded-[10px] bg-salt border border-line text-sm text-neel focus:border-neel focus:bg-paper outline-none transition-colors cursor-pointer"
                  >
                    {GUJARAT_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Primary Scheme Dropdown */}
                <div className="space-y-1">
                  <label htmlFor="scheme-select" className="text-xs font-bold text-neel block">
                    {tr.helper.selectSchemeLabel}
                  </label>
                  <select
                    id="scheme-select"
                    value={selectedSchemeId}
                    onChange={(e) => setSelectedSchemeId(e.target.value)}
                    className="w-full min-h-[48px] px-3.5 rounded-[10px] bg-salt border border-line text-sm text-neel focus:border-neel focus:bg-paper outline-none transition-colors cursor-pointer"
                  >
                    {(SCHEMES_DATASET || []).map((scheme) => (
                      <option key={scheme.id} value={scheme.id}>
                        {scheme.name[language] ?? scheme.name.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grid for Numbers */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="members-count-input" className="text-xs font-bold text-neel block">
                      {tr.helper.membersCountLabel}
                    </label>
                    <input
                      id="members-count-input"
                      type="number"
                      min={1}
                      max={20}
                      value={membersCountInput}
                      onChange={(e) => setMembersCountInput(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 rounded-[10px] bg-salt border border-line text-sm text-neel focus:border-neel focus:bg-paper outline-none transition-colors tabular-nums"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="missing-docs-input" className="text-xs font-bold text-neel block">
                      {tr.helper.missingDocsCountLabel}
                    </label>
                    <input
                      id="missing-docs-input"
                      type="number"
                      min={0}
                      max={10}
                      value={missingDocsInput}
                      onChange={(e) => setMissingDocsInput(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 rounded-[10px] bg-salt border border-line text-sm text-neel focus:border-neel focus:bg-paper outline-none transition-colors tabular-nums"
                    />
                  </div>
                </div>

                {/* Informed Consent Confirmation Checkbox */}
                <div className="p-3 rounded-[10px] bg-salt border border-line">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consentConfirmed}
                      onChange={(e) => setConsentConfirmed(e.target.checked)}
                      className="size-5 rounded border-line text-neel mt-0.5 cursor-pointer accent-[#12263F]"
                    />
                    <span className="text-xs font-medium text-neel leading-snug">
                      {tr.helper.helperConsentCheckbox}
                    </span>
                  </label>
                </div>

                {/* Modal Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-line">
                  <Button
                    type="button"
                    size="compact"
                    variant="ghost"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    {tr.helper.cancelBtn}
                  </Button>
                  <Button
                    type="submit"
                    size="compact"
                    variant="primary"
                  >
                    {tr.helper.saveHouseholdBtn}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
