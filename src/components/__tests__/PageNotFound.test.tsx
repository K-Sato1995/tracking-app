import React from 'react'
import { render, screen } from 'test-utils'
import PageNotFound from 'components/PageNotFound'

test('should render correctly', () => {
  render(<PageNotFound />)

  expect(screen.getByText('Page Not Found')).toBeInTheDocument()
})
