import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ShieldCheck, LockKey } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { useJourney } from '../../app/journey-context'
import { useTranslation } from '../../i18n'

export function ConsentPage() {
  const navigate = useNavigate()
  const { consentGiven, setConsentGiven } = useJourney()
  const { t } = useTranslation()

  const handleContinue = () => {
    if (consentGiven) {
      navigate('/profile')
    }
  }

  return (
    <AppShell
      bottomAction={
        <Button
          fullWidth
          size="large"
          variant="primary"
          disabled={!consentGiven}
          icon={<ArrowRight />}
          onClick={handleContinue}
        >
          {t.consent.continueBtn}
        </Button>
      }
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /consent
          </div>
          <h1 className="text-2xl font-bold text-neel tracking-tight">
            {t.consent.title}
          </h1>
          <p className="text-sm text-ink-2">
            {t.consent.description}
          </p>
        </header>

        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
          <div className="flex items-start gap-3">
            <LockKey className="size-6 text-neel shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-neel">
                {t.consent.localProcessingTitle}
              </h2>
              <p className="text-xs text-ink-2 leading-relaxed">
                {t.consent.localProcessingDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="size-6 text-mor shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-neel">
                {t.consent.noCredentialsTitle}
              </h2>
              <p className="text-xs text-ink-2 leading-relaxed">
                {t.consent.noCredentialsDesc}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-line">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="size-5 rounded text-neel focus:ring-neel border-line cursor-pointer"
              />
              <span className="text-sm font-medium text-neel">
                {t.consent.checkboxLabel}
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate('/')}
          >
            {t.common.back}
          </Button>

          <Button
            size="compact"
            variant="primary"
            disabled={!consentGiven}
            onClick={handleContinue}
          >
            {t.common.next}
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
