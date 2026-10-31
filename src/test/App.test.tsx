import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('App Phase 2', () => {
  it('renders SchemeSahayak brand, prototype banner, and honesty disclaimer', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /Gujarat SchemeSahayak/i })).toBeInTheDocument()
    expect(screen.getByText(/Prototype\. Sample data and simulated document reading\./i)).toBeInTheDocument()
    expect(screen.getByText(/This is guidance\. The department makes the final decision\./i)).toBeInTheDocument()
  })

  it('renders language switcher and text scale controls', () => {
    render(<App />)
    expect(screen.getByRole('group', { name: /Language/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /Text size/i })).toBeInTheDocument()
  })
})
