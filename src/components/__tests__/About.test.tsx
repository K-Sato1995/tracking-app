import React from 'react'
import { render, screen } from 'test-utils'
import About from 'components/About'

test('should render correctly', () => {
  render(<About />)

  expect(screen.getByText('About This Site')).toBeInTheDocument()
})
