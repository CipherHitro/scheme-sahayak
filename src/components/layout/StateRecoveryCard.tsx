import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserCircle } from '@phosphor-icons/react'
import { EmptyState } from '../ui/EmptyState'
import { Button } from '../ui/Button'
import { useJourney } from '../../app/journey-context'

export interface StateRecoveryCardProps {
  requiredFor: string
  recoveryPath?: string
  recoveryLabel?: string
}

export const StateRecoveryCard: React.FC<StateRecoveryCardProps> = ({
  requiredFor,
  recoveryPath = '/',
  recoveryLabel = 'Go to Welcome',
}) => {
  const navigate = useNavigate()
  const { loadSamplePersona } = useJourney()

  const handleLoadSampleStudent = () => {
    loadSamplePersona('student')
  }

  return (
    <div className="space-y-4">
      <EmptyState
        icon={<UserCircle className="size-10 text-ink-2" />}
        title="Profile answers not found"
        description={`To view ${requiredFor}, SchemeSahayak needs your answers to evaluate eligibility. Please start from Welcome or test with sample data.`}
        actionLabel={recoveryLabel}
        onAction={() => navigate(recoveryPath)}
      />

      <div className="bg-paper border border-line rounded-[14px] p-4 text-center space-y-2">
        <p className="text-xs text-ink-2">
          <strong>Testing or evaluating this view directly?</strong>
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            size="compact"
            variant="secondary"
            onClick={handleLoadSampleStudent}
          >
            Load sample student profile
          </Button>
          <Button
            size="compact"
            variant="ghost"
            icon={<ArrowLeft />}
            onClick={() => navigate('/')}
          >
            Start from beginning
          </Button>
        </div>
      </div>
    </div>
  )
}
