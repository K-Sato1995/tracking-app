import React from 'react'
import { render, screen } from '@testing-library/react'
import About from 'components/About'

test('should render correctly', () => {
  render(<About />)

  expect(screen.getByText('About This Site')).toBeInTheDocument()
})
