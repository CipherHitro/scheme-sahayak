import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  UploadSimple,
  PencilSimple,
  Check,
  ShieldCheck,
  Trash,
} from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { StateRecoveryCard } from '../../components/layout/StateRecoveryCard'
import { useJourney } from '../../app/journey-context'
import { t } from '../../i18n'
import { cn } from '../../lib/utils'

export function DocumentScanPage() {
  const { schemeId } = useParams<{ schemeId: string }>()
  const navigate = useNavigate()
  const journey = useJourney()
  const { currentProfile, documentConfirmations, confirmDocument } = journey
  const language = journey.language

  // Local state for synthetic document scanning workflow
  const [isAssetLoaded, setIsAssetLoaded] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanFinished, setScanFinished] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Extracted sample fields (local demonstration data, never from cloud OCR)
  const [extractedData, setExtractedData] = useState(() => ({
    certNumber: 'SYN-GJ-DEMO-2026-0042',
    holderName: currentProfile?.displayName ?? 'Pooja Patel',
    annualIncomeFormatted: '₹1,50,000',
    annualIncomeValue: 150000,
    issuingAuthority: 'Office of the Mamlatdar, Ahmedabad',
    validUntil: '31/03/2027',
  }))

  // Deep-link recovery guard
  if (!currentProfile) {
    return (
      <AppShell singleColumn>
        <StateRecoveryCard
          requiredFor={`document verification (${schemeId ?? 'demo'})`}
          recoveryPath="/results"
          recoveryLabel={t('recovery.defaultLabel', undefined, language)}
        />
      </AppShell>
    )
  }

  const isIncomeConfirmed = Boolean(documentConfirmations['income_certificate'])

  // Check user prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleLoadSample = () => {
    setIsAssetLoaded(true)
    setIsScanning(true)
    setScanFinished(false)

    // Sweep duration per DESIGN.md: 1.2s (or instant if reduced-motion)
    const sweepDuration = prefersReducedMotion ? 50 : 1200

    setTimeout(() => {
      setIsScanning(false)
      setScanFinished(true)
    }, sweepDuration)
  }

  const handleConfirmAsIs = () => {
    confirmDocument('income_certificate', true)
    setIsEditing(false)
  }

  const handleSaveAndConfirm = (e: FormEvent) => {
    e.preventDefault()
    confirmDocument('income_certificate', true)
    setIsEditing(false)
  }

  const handleGoToChecklist = () => {
    navigate(`/checklist/${schemeId ?? 'mysy'}`)
  }

  return (
    <AppShell
      singleColumn
      bottomAction={
        isIncomeConfirmed ? (
          <Button
            fullWidth
            size="large"
            variant="primary"
            icon={<ArrowRight />}
            onClick={handleGoToChecklist}
          >
            {t('documents.viewChecklistBtn', undefined, language)}
          </Button>
        ) : undefined
      }
    >
      <div className="space-y-6 max-w-[680px] mx-auto pb-12">
        {/* Navigation back */}
        <div className="flex items-center justify-between gap-3">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate(schemeId ? `/schemes/${schemeId}` : '/results')}
          >
            {t('documents.backToScheme', undefined, language)}
          </Button>

          {isIncomeConfirmed && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-mor-soft text-mor border border-mor/20">
              <CheckCircle weight="fill" className="size-4" />
              <span>{t('documents.confirmedBadge', undefined, language)}</span>
            </span>
          )}
        </div>

        {/* Screen Header */}
        <header className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-bold text-neel tracking-tight">
            {t('documents.title', undefined, language)}
          </h1>
          <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
            {t('documents.subtitle', undefined, language)}
          </p>
        </header>

        {/* 1. REAL UPLOADS DISABLED HONEST NOTICE */}
        <div className="p-4 rounded-[12px] bg-salt-2 border border-line space-y-2">
          <div className="flex items-center gap-2 text-ink-2">
            <UploadSimple className="size-4 shrink-0 text-neel" />
            <span className="text-xs font-bold uppercase tracking-wider text-neel">
              {t('documents.realUploadsLabel', undefined, language)}
            </span>
          </div>
          <p className="text-xs text-ink-2 leading-relaxed">
            {t('documents.realUploadsDisabled', undefined, language)}
          </p>
        </div>

        {/* 2. SYNTHETIC SAMPLE DOCUMENT CARD & TRIGGER */}
        {!isAssetLoaded && (
          <div className="bg-paper border-2 border-dashed border-line rounded-[14px] p-6 text-center space-y-4">
            <div className="size-12 rounded-full bg-neel-soft flex items-center justify-center mx-auto text-neel">
              <FileText className="size-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h2 className="text-base font-bold text-neel">
                Sample Gujarat Income Certificate
              </h2>
              <p className="text-xs text-ink-2">
                Click below to load the bundled synthetic sample certificate and test automated data extraction.
              </p>
            </div>
            <Button
              size="default"
              variant="primary"
              onClick={handleLoadSample}
            >
              {t('documents.useSampleBtn', undefined, language)}
            </Button>
          </div>
        )}

        {/* 3. SYNTHETIC ASSET DISPLAY WITH SCAN SWEEP ANIMATION */}
        {isAssetLoaded && (
          <div className="space-y-4">
            {/* Visual Synthetic Certificate Paper Container */}
            <div
              className={cn(
                'relative overflow-hidden bg-salt border border-line rounded-[14px] p-5 sm:p-7 select-none',
                'shadow-sm'
              )}
            >
              {/* Prominent Diagonal SAMPLE Watermark per AGENT.md */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 rotate-[-25deg]"
              >
                <span className="text-4xl sm:text-6xl font-black text-madder tracking-widest text-center uppercase">
                  {t('documents.sampleWatermark', undefined, language)}
                </span>
              </div>

              {/* Glowing Haldi Scan Sweep Line */}
              {isScanning && !prefersReducedMotion && (
                <div
                  aria-hidden="true"
                  className="absolute left-0 right-0 h-1 bg-haldi shadow-[0_0_14px_#D97706] z-20 animate-scan-sweep pointer-events-none"
                />
              )}

              {/* Synthetic Certificate Content (Strictly no official emblem or real Aadhaar/PAN) */}
              <div className="space-y-4 relative z-10 text-neel">
                <div className="text-center pb-3 border-b border-line space-y-0.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink-2">
                    Government of Gujarat (Demonstration Sample)
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-neel">
                    Certificate of Family Income (આવકનું પ્રમાણપત્ર)
                  </h3>
                  <div className="text-[10px] text-ink-2 font-mono">
                    Certificate No: {extractedData.certNumber}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded bg-paper/80 border border-line/60">
                    <span className="text-[10px] text-ink-2 uppercase block font-semibold">
                      {t('documents.holderNameLabel', undefined, language)}
                    </span>
                    <span className="font-bold text-neel text-sm">
                      {extractedData.holderName}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-paper/80 border border-line/60">
                    <span className="text-[10px] text-ink-2 uppercase block font-semibold">
                      {t('documents.incomeLabel', undefined, language)}
                    </span>
                    <span className="font-bold text-neel text-sm tabular-nums">
                      {extractedData.annualIncomeFormatted}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-paper/80 border border-line/60">
                    <span className="text-[10px] text-ink-2 uppercase block font-semibold">
                      {t('documents.issuingAuthorityLabel', undefined, language)}
                    </span>
                    <span className="font-medium text-neel">
                      {extractedData.issuingAuthority}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-paper/80 border border-line/60">
                    <span className="text-[10px] text-ink-2 uppercase block font-semibold">
                      {t('documents.validityPeriodLabel', undefined, language)}
                    </span>
                    <span className="font-medium text-neel tabular-nums">
                      Until {extractedData.validUntil}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scanning indicator */}
            {isScanning && (
              <div
                role="status"
                aria-live="polite"
                className="text-center py-2 text-xs font-semibold text-neel flex items-center justify-center gap-2"
              >
                <div className="size-2 rounded-full bg-haldi animate-ping" />
                <span>{t('documents.scanningTitle', undefined, language)}</span>
              </div>
            )}

            {/* 4. EXTRACTED FIELDS REVEAL & CONFIRMATION PANEL */}
            {scanFinished && !isIncomeConfirmed && !isEditing && (
              <div className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-neel">
                    {t('documents.isThisCorrect', undefined, language)}
                  </h3>
                  <p className="text-xs text-ink-2">
                    Review the extracted values below. Confirm to update readiness across all matching schemes.
                  </p>
                </div>

                <div className="space-y-2 p-3 bg-salt-2 rounded-[10px] text-xs divide-y divide-line/60">
                  <div className="flex justify-between py-1">
                    <span className="text-ink-2">{t('documents.docTypeLabel', undefined, language)}:</span>
                    <span className="font-semibold text-neel">Income Certificate</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-ink-2">{t('documents.holderNameLabel', undefined, language)}:</span>
                    <span className="font-semibold text-neel">{extractedData.holderName}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-ink-2">{t('documents.incomeLabel', undefined, language)}:</span>
                    <span className="font-semibold text-neel tabular-nums">{extractedData.annualIncomeFormatted}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-ink-2">{t('documents.issuingAuthorityLabel', undefined, language)}:</span>
                    <span className="font-semibold text-neel">{extractedData.issuingAuthority}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 flex-wrap">
                  <Button
                    size="default"
                    variant="primary"
                    icon={<Check />}
                    onClick={handleConfirmAsIs}
                  >
                    {t('documents.yesUseThese', undefined, language)}
                  </Button>

                  <Button
                    size="default"
                    variant="secondary"
                    icon={<PencilSimple />}
                    onClick={() => setIsEditing(true)}
                  >
                    {t('documents.fixValue', undefined, language)}
                  </Button>
                </div>
              </div>
            )}

            {/* 5. EDIT/FIX FORM WHEN USER CHOOSES 'FIX A VALUE' */}
            {isEditing && !isIncomeConfirmed && (
              <form onSubmit={handleSaveAndConfirm} className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-neel">
                    {t('documents.fixValue', undefined, language)}
                  </h3>
                  <p className="text-xs text-ink-2">
                    Adjust any value as needed before confirming readiness.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="edit-name" className="text-xs font-semibold text-neel block mb-1">
                      {t('documents.holderNameLabel', undefined, language)}
                    </label>
                    <input
                      id="edit-name"
                      type="text"
                      value={extractedData.holderName}
                      onChange={(e) => setExtractedData((prev) => ({ ...prev, holderName: e.target.value }))}
                      required
                      className="w-full p-2.5 rounded-[8px] border border-line bg-paper text-sm text-neel focus:outline-none focus:border-neel"
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-income" className="text-xs font-semibold text-neel block mb-1">
                      {t('documents.incomeLabel', undefined, language)} (₹)
                    </label>
                    <input
                      id="edit-income"
                      type="number"
                      value={extractedData.annualIncomeValue}
                      onChange={(e) => {
                        const val = Number(e.target.value)
                        setExtractedData((prev) => ({
                          ...prev,
                          annualIncomeValue: val,
                          annualIncomeFormatted: `₹${val.toLocaleString('en-IN')}`,
                        }))
                      }}
                      required
                      className="w-full p-2.5 rounded-[8px] border border-line bg-paper text-sm text-neel focus:outline-none focus:border-neel"
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-authority" className="text-xs font-semibold text-neel block mb-1">
                      {t('documents.issuingAuthorityLabel', undefined, language)}
                    </label>
                    <input
                      id="edit-authority"
                      type="text"
                      value={extractedData.issuingAuthority}
                      onChange={(e) => setExtractedData((prev) => ({ ...prev, issuingAuthority: e.target.value }))}
                      required
                      className="w-full p-2.5 rounded-[8px] border border-line bg-paper text-sm text-neel focus:outline-none focus:border-neel"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button size="default" variant="primary" type="submit">
                    {t('documents.saveAndConfirm', undefined, language)}
                  </Button>
                  <Button size="default" variant="ghost" type="button" onClick={() => setIsEditing(false)}>
                    {t('common.cancel', undefined, language)}
                  </Button>
                </div>
              </form>
            )}

            {/* 6. POST-CONFIRMATION SESSION NOTICES (Phase 9 Spec) */}
            {isIncomeConfirmed && (
              <div className="space-y-3 pt-2">
                {/* File deleted notice */}
                <div className="p-3.5 rounded-[10px] bg-salt-2 border border-line flex items-start gap-2.5 text-xs text-ink-2">
                  <Trash className="size-4 shrink-0 text-neel mt-0.5" />
                  <p className="leading-relaxed">
                    {t('documents.fileDeletedNotice', undefined, language)}
                  </p>
                </div>

                {/* Honesty / Authenticity disclaimer */}
                <div className="p-3.5 rounded-[10px] bg-salt border border-line/60 flex items-start gap-2.5 text-xs text-ink-2">
                  <ShieldCheck className="size-4 shrink-0 text-mor mt-0.5" />
                  <p className="leading-relaxed">
                    {t('documents.authenticityDisclaimer', undefined, language)}
                  </p>
                </div>

                <div className="pt-3">
                  <Button
                    fullWidth
                    size="large"
                    variant="primary"
                    icon={<ArrowRight />}
                    onClick={handleGoToChecklist}
                  >
                    {t('documents.viewChecklistBtn', undefined, language)}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  )
}
