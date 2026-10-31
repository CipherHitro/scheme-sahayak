import * as React from 'react'
import {
  FileText,
  MagnifyingGlass,
  Microphone,
  UsersThree,
  Trash,
} from '@phosphor-icons/react'
import { AppShell } from './components/layout/AppShell'
import { Button } from './components/ui/Button'
import { IconButton } from './components/ui/IconButton'
import { StatusBadge } from './components/ui/StatusBadge'
import { EmptyState } from './components/ui/EmptyState'

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'components'>('overview')
  const [feedbackMsg, setFeedbackMsg] = React.useState<string | null>(null)

  const handleActionClick = (msg: string) => {
    setFeedbackMsg(msg)
    const timer = setTimeout(() => setFeedbackMsg(null), 3000)
    return () => clearTimeout(timer)
  }

  return (
    <AppShell
      bottomAction={
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-ink-2 truncate">
            {feedbackMsg ?? 'Phase 2: Design Tokens & App Shell Active'}
          </div>
          <Button
            size="compact"
            variant="primary"
            onClick={() => handleActionClick('Action confirmed')}
          >
            Test Action
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Header Intro / Screen Title */}
        <section className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[10px] bg-neel-soft text-neel text-xs font-semibold">
            <span>Phase 2 Deliverable</span>
            <span>•</span>
            <span>Rann &amp; Ajrakh Design System</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neel">
            Gujarat SchemeSahayak
          </h1>

          {/* Multilingual Typography Sample: Gujarati, Hindi, English */}
          <div className="space-y-1.5 pt-1 text-ink-2">
            <p className="text-lg font-medium text-neel" lang="gu">
              તમારા પરિવાર માટે કઈ સરકારી યોજનાઓ છે, જાણો.
            </p>
            <p className="text-sm leading-relaxed" lang="hi">
              सरल सवालों के जवाब दें — समझें कि आप किन योजनाओं के लिए पात्र हैं और कौन से दस्तावेज़ तैयार रखने हैं।
            </p>
            <p className="text-xs text-ink-2">
              From “I may qualify” to “I know what evidence I need and I am ready to apply.”
            </p>
          </div>
        </section>

        {/* Navigation tabs between overview and components */}
        <nav aria-label="Section tabs" className="flex border-b border-line gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
              activeTab === 'overview'
                ? 'border-neel text-neel'
                : 'border-transparent text-ink-2 hover:text-neel'
            }`}
          >
            System Foundations
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('components')}
            className={`pb-2.5 px-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
              activeTab === 'components'
                ? 'border-neel text-neel'
                : 'border-transparent text-ink-2 hover:text-neel'
            }`}
          >
            Component Library
          </button>
        </nav>

        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Color Palette Plane */}
            <div className="bg-paper border border-line rounded-[14px] p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-semibold text-neel">
                Rann &amp; Ajrakh Core Palette Tokens
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-[10px] bg-salt border border-line">
                  <span className="font-bold block text-neel">Salt</span>
                  <span className="text-ink-2">#F2F3EF (Ground)</span>
                </div>
                <div className="p-3 rounded-[10px] bg-neel text-paper">
                  <span className="font-bold block">Neel</span>
                  <span>#12263F (Indigo)</span>
                </div>
                <div className="p-3 rounded-[10px] bg-haldi-soft text-haldi-ink border border-haldi/30">
                  <span className="font-bold block">Haldi</span>
                  <span>#E0A526 (Highlight)</span>
                </div>
                <div className="p-3 rounded-[10px] bg-mor-soft text-mor border border-mor/20">
                  <span className="font-bold block">Mor</span>
                  <span>#1B6B5A (Success)</span>
                </div>
                <div className="p-3 rounded-[10px] bg-madder-soft text-madder border border-madder/20">
                  <span className="font-bold block">Madder</span>
                  <span>#A6392B (Attention)</span>
                </div>
                <div className="p-3 rounded-[10px] bg-salt-2 text-ink-2 border border-line">
                  <span className="font-bold block">Salt-2</span>
                  <span>#E7E9E3 (Secondary)</span>
                </div>
                <div className="p-3 rounded-[10px] bg-neel-soft text-neel border border-line">
                  <span className="font-bold block">Neel-Soft</span>
                  <span>#DCE4EE (Selection)</span>
                </div>
                <div className="p-3 rounded-[10px] bg-paper text-neel border border-line">
                  <span className="font-bold block">Paper</span>
                  <span>#FFFFFF (Surfaces)</span>
                </div>
              </div>
            </div>

            {/* Status Badges Section */}
            <div className="bg-paper border border-line rounded-[14px] p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-semibold text-neel">
                Status System (Single Source of Truth)
              </h2>
              <p className="text-xs text-ink-2">
                Every status pairs icon + label + colour. Negative states use gentle phrasing.
              </p>
              <div className="flex flex-wrap gap-2.5 items-center">
                <StatusBadge status="likely" />
                <StatusBadge status="possibly" />
                <StatusBadge status="not_matching" />
                <StatusBadge status="needs_verification" />
              </div>
            </div>

            {/* Accessibility & Typography note */}
            <div className="bg-paper border border-line rounded-[14px] p-5 sm:p-6 space-y-3">
              <h2 className="text-base font-semibold text-neel">
                Typography &amp; Accessibility Rules
              </h2>
              <ul className="text-sm text-ink-2 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-neel">Anek variable font family:</strong> Latin, Gujarati, and Devanagari matching scripts with generous line heights.
                </li>
                <li>
                  <strong className="text-neel">Three-step text scale:</strong> Normal (100%), Large (112.5%), Extra large (125%) via the header control.
                </li>
                <li>
                  <strong className="text-neel">Touch targets:</strong> 48px minimum on all controls (56px/60px for primary actions).
                </li>
                <li>
                  <strong className="text-neel">Honesty copy:</strong> Prototype notice always visible in the header banner.
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Button Variants Demonstration */}
            <div className="bg-paper border border-line rounded-[14px] p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-semibold text-neel">
                Button System &amp; Variants
              </h2>
              <div className="flex flex-wrap gap-3 items-center">
                <Button
                  variant="primary"
                  icon={<MagnifyingGlass />}
                  onClick={() => handleActionClick('Primary button clicked')}
                >
                  Find benefits for me
                </Button>
                <Button
                  variant="secondary"
                  icon={<UsersThree />}
                  onClick={() => handleActionClick('Secondary button clicked')}
                >
                  Help someone else
                </Button>
                <Button
                  variant="danger"
                  icon={<Trash />}
                  onClick={() => handleActionClick('Delete data initiated')}
                >
                  Clear demo data
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleActionClick('Ghost action clicked')}
                >
                  Learn more
                </Button>
                <Button variant="primary" disabled>
                  Disabled state
                </Button>
              </div>

              <div className="pt-2 border-t border-line">
                <h3 className="text-xs font-semibold text-ink-2 mb-2">Sizes: Large (60px), Default (52px), Compact (44px)</h3>
                <div className="flex flex-wrap gap-2.5 items-center">
                  <Button size="large" variant="primary">Large 60px</Button>
                  <Button size="default" variant="primary">Default 52px</Button>
                  <Button size="compact" variant="secondary">Compact 44px</Button>
                </div>
              </div>
            </div>

            {/* Icon Buttons */}
            <div className="bg-paper border border-line rounded-[14px] p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-semibold text-neel">
                IconButtons (48px Touch Targets)
              </h2>
              <div className="flex flex-wrap gap-3 items-center">
                <IconButton
                  aria-label="Speak your answer"
                  variant="haldi"
                  icon={<Microphone />}
                  onClick={() => handleActionClick('Microphone triggered')}
                />
                <IconButton
                  aria-label="View document details"
                  variant="bordered"
                  icon={<FileText />}
                  onClick={() => handleActionClick('Document icon clicked')}
                />
                <IconButton
                  aria-label="Search schemes"
                  variant="standard"
                  icon={<MagnifyingGlass />}
                  onClick={() => handleActionClick('Search icon clicked')}
                />
                <IconButton
                  aria-label="Clear session data"
                  variant="standard"
                  icon={<Trash />}
                  onClick={() => handleActionClick('Trash icon clicked')}
                />
              </div>
            </div>

            {/* Empty State Demonstration */}
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-neel">
                Empty / Resting State
              </h2>
              <EmptyState
                icon={<FileText weight="regular" className="size-10 text-ink-2" />}
                title="No documents uploaded yet"
                description="Use the sample income certificate to test simulated evidence verification in this prototype."
                actionLabel="Try sample document"
                onAction={() => handleActionClick('Sample document demo selected')}
              />
            </div>
          </div>
        )}

        {/* Footer honesty disclaimer */}
        <footer className="pt-6 border-t border-line text-xs text-ink-2 text-center space-y-1">
          <p className="font-medium text-neel">
            This is guidance. The department makes the final decision.
          </p>
          <p>
            Gujarat SchemeSahayak prototype • Frontend only • No real personal data collected
          </p>
        </footer>
      </div>
    </AppShell>
  )
}
