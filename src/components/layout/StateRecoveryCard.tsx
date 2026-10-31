import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserCircle } from '@phosphor-icons/react'
import { EmptyState } from '../ui/EmptyState'
import { Button } from '../ui/Button'
import { useJourney } from '../../app/journey-context'
import { useTranslation } from '../../i18n'

export interface StateRecoveryCardProps {
  requiredFor: string
  recoveryPath?: string
  recoveryLabel?: string
}

export const StateRecoveryCard: React.FC<StateRecoveryCardProps> = ({
  requiredFor,
  recoveryPath = '/',
  recoveryLabel,
}) => {
  const navigate = useNavigate()
  const { loadSamplePersona } = useJourney()
  const { t } = useTranslation()

  const handleLoadSampleStudent = () => {
    loadSamplePersona('student')
  }

  return (
    <div className="space-y-4">
      <EmptyState
        icon={<UserCircle className="size-10 text-ink-2" />}
        title={t.recovery.title}
        description={t('recovery.description', { requiredFor })}
        actionLabel={recoveryLabel ?? t.recovery.defaultLabel}
        onAction={() => navigate(recoveryPath)}
      />

      <div className="bg-paper border border-line rounded-[14px] p-4 text-center space-y-2">
        <p className="text-xs text-ink-2">
          <strong>{t.recovery.testPrompt}</strong>
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            size="compact"
            variant="secondary"
            onClick={handleLoadSampleStudent}
          >
            {t.recovery.loadStudentBtn}
          </Button>
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate('/')}
          >
            {t.recovery.startOverBtn}
          </Button>
        </div>
      </div>
    </div>
  )
}
