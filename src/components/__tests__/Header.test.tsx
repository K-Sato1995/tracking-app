import React from 'react'
import { render, screen } from 'test-utils'
import Header from 'components/Header'

test('should render correctly', () => {
  render(<Header />)

  expect(screen.getByText('PLOGress')).toBeInTheDocument()
})
