import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('App Root Router & Journey Integration', () => {
  it('renders root welcome route with brand wordmark, banner, and disclaimer', () => {
    render(<App />)
    expect(screen.getByText('Scheme')).toBeInTheDocument()
    expect(screen.getByText('Sahayak')).toBeInTheDocument()
    expect(
      screen.getByText(/પ્રોટોટાઇપ|Prototype/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/આ માર્ગદર્શન છે|This is guidance/i),
    ).toBeInTheDocument()
  })

  it('renders language switcher and text scale controls in header', () => {
    render(<App />)
    expect(screen.getByRole('group', { name: /Language/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /Text size/i })).toBeInTheDocument()
  })
})
