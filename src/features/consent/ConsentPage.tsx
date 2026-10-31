import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ShieldCheck, LockKey } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { useJourney } from '../../app/journey-context'

export function ConsentPage() {
  const navigate = useNavigate()
  const { consentGiven, setConsentGiven } = useJourney()

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
          Continue to profile
        </Button>
      }
    >
      <div className="space-y-6">
        <header className="space-y-2">
          <div className="inline-block px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            Route: /consent (Consent Placeholder)
          </div>
          <h1 className="text-2xl font-bold text-neel tracking-tight">
            Privacy and Demo Consent
          </h1>
          <p className="text-sm text-ink-2">
            Clear guidelines on what we ask, how data is processed, and what we never do.
          </p>
        </header>

        <div className="bg-paper border border-line rounded-[14px] p-5 space-y-4">
          <div className="flex items-start gap-3">
            <LockKey className="size-6 text-neel shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-neel">Local processing only</h2>
              <p className="text-xs text-ink-2 leading-relaxed">
                All profile answers and scheme rules are evaluated directly in your browser. No personal data is sent to external cloud servers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="size-6 text-mor shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-neel">No credentials collected</h2>
              <p className="text-xs text-ink-2 leading-relaxed">
                We never ask for OTP, passwords, bank PINs, or real Aadhaar documents.
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
                I understand this is a guidance prototype and consent to continue.
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
            Back to Welcome
          </Button>

          <Button
            size="compact"
            variant="primary"
            disabled={!consentGiven}
            onClick={handleContinue}
          >
            Next: Profile
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
