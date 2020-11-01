import React from 'react'
import { render, screen } from 'test-utils'
import Home from 'components/Home'

test('Initial loading state for the graphql request', () => {
  render(<Home />)
  expect(screen.getByText('Top Page')).toBeInTheDocument()
})
