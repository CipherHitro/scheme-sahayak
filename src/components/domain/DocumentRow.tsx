import { useState, type FC } from 'react'
import { FileText, CheckCircle, WarningCircle, CaretDown, CaretUp } from '@phosphor-icons/react'
import type { SchemeDocumentRequirement } from '../../domain/document.types'
import type { Language } from '../../domain/profile.types'
import { DOCUMENT_CATALOG } from '../../data/documentCatalog'
import { cn } from '../../lib/utils'

export interface DocumentRowProps {
  requirement: SchemeDocumentRequirement
  isReady?: boolean
  isFromSample?: boolean
  language?: Language
  className?: string
}

export const DocumentRow: FC<DocumentRowProps> = ({
  requirement,
  isReady = false,
  isFromSample = false,
  language = 'en',
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const catalogEntry = DOCUMENT_CATALOG.find((d) => d.id === requirement.documentTypeId)
  const docName = catalogEntry?.name[language] ?? catalogEntry?.name.en ?? requirement.documentTypeId
  const helpText = requirement.helpText[language] ?? requirement.helpText.en
  const whereToGetSteps = requirement.whereToGet?.[language] ?? requirement.whereToGet?.en

  const statusLabel = isReady
    ? language === 'gu'
      ? 'તૈયાર'
      : language === 'hi'
      ? 'तैयार'
      : 'Ready'
    : language === 'gu'
    ? 'ખૂટે છે'
    : language === 'hi'
    ? 'शेष'
    : 'Missing'

  const whereToGetLabel =
    language === 'gu'
      ? 'ક્યાંથી મેળવવું'
      : language === 'hi'
      ? 'कहाँ से प्राप्त करें'
      : 'Where to get it'

  const askOfficeLabel =
    language === 'gu'
      ? 'સંબંધિત કચેરી અથવા e-Gram કેન્દ્ર પર પૂછપરછ કરો.'
      : language === 'hi'
      ? 'संबंधित कार्यालय अथवा ई-ग्राम केंद्र से संपर्क करें।'
      : 'Ask the issuing office or nearest e-Gram center.'

  const sampleLabel =
    language === 'gu'
      ? 'નમૂના પ્રમાણપત્રમાંથી વાંચેલ'
      : language === 'hi'
      ? 'नमूना प्रमाण पत्र से पढ़ा गया'
      : 'Read from sample certificate'

  return (
    <div
      className={cn(
        'p-4 bg-paper transition-colors',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: Document Icon + Name + Help text */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <FileText
            weight="regular"
            className={cn(
              'size-5 shrink-0 mt-0.5',
              isReady ? 'text-mor' : 'text-ink-2'
            )}
            aria-hidden="true"
          />
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-neel leading-tight">
                {docName}
              </h4>
              {isFromSample && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-mor-soft text-mor select-none">
                  {sampleLabel}
                </span>
              )}
            </div>

            {helpText && (
              <p className="text-xs text-ink-2 leading-relaxed">
                {helpText}
              </p>
            )}
          </div>
        </div>

        {/* Right: Status Tag & Expand Button */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold select-none',
              isReady
                ? 'bg-mor-soft text-mor border border-mor/20'
                : 'bg-madder-soft text-madder border border-madder/20'
            )}
          >
            {isReady ? (
              <CheckCircle weight="fill" className="size-3.5" aria-hidden="true" />
            ) : (
              <WarningCircle weight="fill" className="size-3.5" aria-hidden="true" />
            )}
            <span>{statusLabel}</span>
          </span>

          {!isReady && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={`${whereToGetLabel} for ${docName}`}
              className="p-1.5 rounded text-ink-2 hover:text-neel hover:bg-salt transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-neel"
            >
              {isExpanded ? (
                <CaretUp className="size-4" />
              ) : (
                <CaretDown className="size-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expandable "Where to get it" Section */}
      {isExpanded && !isReady && (
        <div className="mt-3 pt-3 border-t border-line/60 pl-8 space-y-2 text-xs">
          <div className="font-semibold text-neel flex items-center gap-1.5">
            <span>{whereToGetLabel}:</span>
          </div>

          {whereToGetSteps && whereToGetSteps.length > 0 ? (
            <ol className="list-decimal list-inside space-y-1 text-ink-2 leading-relaxed pl-1">
              {whereToGetSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="text-ink-2 italic">{askOfficeLabel}</p>
          )}

          {requirement.issuingAuthority && (
            <p className="text-ink-2 pt-1">
              <span className="font-medium text-neel">
                {language === 'gu' ? 'ઇસ્યુઇંગ ઓથોરિટી' : language === 'hi' ? 'जारीकर्ता प्राधिकरण' : 'Issuing authority'}:
              </span>{' '}
              {requirement.issuingAuthority[language] ?? requirement.issuingAuthority.en}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
