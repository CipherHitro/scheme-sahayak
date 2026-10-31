import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../components/ui/Button'
import { IconButton } from '../components/ui/IconButton'
import { StatusBadge } from '../components/ui/StatusBadge'
import { EmptyState } from '../components/ui/EmptyState'
import { PrototypeBanner } from '../components/layout/PrototypeBanner'
import { AppHeader } from '../components/layout/AppHeader'
import { Info } from '@phosphor-icons/react'

describe('Phase 2 — Design System Components', () => {
  describe('Button', () => {
    it('renders primary variant by default and responds to click', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Find benefits for me</Button>)
      const btn = screen.getByRole('button', { name: /Find benefits for me/i })
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveClass('bg-neel')
      fireEvent.click(btn)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('renders secondary and danger variants with proper styling', () => {
      render(
        <>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </>
      )
      expect(screen.getByRole('button', { name: /Secondary/i })).toHaveClass('border-neel')
      expect(screen.getByRole('button', { name: /Danger/i })).toHaveClass('text-madder')
    })

    it('disables button when disabled prop is provided', () => {
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      const btn = screen.getByRole('button', { name: /Disabled/i })
      expect(btn).toBeDisabled()
      fireEvent.click(btn)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('IconButton', () => {
    it('renders accessible icon button with required aria-label', () => {
      const handleClick = vi.fn()
      render(
        <IconButton
          aria-label="Speak your answer"
          icon={<Info data-testid="icon" />}
          onClick={handleClick}
        />
      )
      const btn = screen.getByRole('button', { name: /Speak your answer/i })
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveAttribute('aria-label', 'Speak your answer')
      fireEvent.click(btn)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('StatusBadge', () => {
    it('renders Likely eligible status correctly', () => {
      render(<StatusBadge status="likely" />)
      expect(screen.getByText('Likely eligible')).toBeInTheDocument()
    })

    it('renders Possibly eligible status correctly', () => {
      render(<StatusBadge status="possibly" />)
      expect(screen.getByText('Possibly eligible')).toBeInTheDocument()
    })

    it('renders gentle Not matching right now phrasing', () => {
      render(<StatusBadge status="not_matching" />)
      expect(screen.getByText('Not matching right now')).toBeInTheDocument()
    })

    it('renders Needs checking status correctly', () => {
      render(<StatusBadge status="needs_verification" />)
      expect(screen.getByText('Needs checking')).toBeInTheDocument()
    })
  })

  describe('EmptyState', () => {
    it('renders title, description and triggers action button', () => {
      const handleAction = vi.fn()
      render(
        <EmptyState
          title="No documents uploaded"
          description="Use the sample document."
          actionLabel="Try sample"
          onAction={handleAction}
        />
      )
      expect(screen.getByText('No documents uploaded')).toBeInTheDocument()
      expect(screen.getByText('Use the sample document.')).toBeInTheDocument()
      const actionBtn = screen.getByRole('button', { name: /Try sample/i })
      fireEvent.click(actionBtn)
      expect(handleAction).toHaveBeenCalledTimes(1)
    })
  })

  describe('PrototypeBanner', () => {
    it('renders exact honesty copy', () => {
      render(<PrototypeBanner />)
      expect(
        screen.getByText('Prototype. Sample data and simulated document reading.')
      ).toBeInTheDocument()
    })
  })

  describe('AppHeader', () => {
    it('renders wordmark, language options and text size options', () => {
      const handleLangChange = vi.fn()
      const handleScaleChange = vi.fn()
      render(
        <AppHeader
          currentLanguage="gu"
          onLanguageChange={handleLangChange}
          currentTextScale={1}
          onTextScaleChange={handleScaleChange}
        />
      )

      expect(screen.getByText('Scheme')).toBeInTheDocument()
      expect(screen.getByText('Sahayak')).toBeInTheDocument()

      // Language buttons
      const hiBtn = screen.getByRole('button', { name: /हि/i })
      fireEvent.click(hiBtn)
      expect(handleLangChange).toHaveBeenCalledWith('hi')

      // Text size buttons
      const largeScaleBtn = screen.getByRole('button', { name: /^Large text/i })
      fireEvent.click(largeScaleBtn)
      expect(handleScaleChange).toHaveBeenCalledWith(1.125)
    })
  })
})
