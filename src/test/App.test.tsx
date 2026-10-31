import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('App placeholder', () => {
  it('renders the SchemeSahayak heading and honesty disclaimer', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /Gujarat SchemeSahayak/i })).toBeInTheDocument()
    expect(screen.getByText(/Prototype: sample data and simulated document reading/i)).toBeInTheDocument()
    expect(screen.getByText(/This is guidance. The department makes the final decision./i)).toBeInTheDocument()
  })
})
