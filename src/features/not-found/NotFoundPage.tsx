import { useNavigate } from 'react-router-dom'
import { Question } from '@phosphor-icons/react'
import { AppShell } from '../../components/layout/AppShell'
import { EmptyState } from '../../components/ui/EmptyState'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <AppShell>
      <div className="py-8">
        <EmptyState
          icon={<Question className="size-10 text-ink-2" />}
          title="Page not found"
          description="The route you requested does not exist in SchemeSahayak. Please return to the welcome screen."
          actionLabel="Return to Welcome"
          onAction={() => navigate('/')}
        />
      </div>
    </AppShell>
  )
}
