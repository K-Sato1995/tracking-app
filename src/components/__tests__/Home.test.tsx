import React from 'react'
import { render, screen, waitFor } from 'test-utils'
import Home from 'components/Home'
import firebaseUtilities from 'utilities/Firebase'
import { BrowserRouter as Router } from 'react-router-dom'

test('Initial State', () => {
  render(
    <Router>
      <Home />
    </Router>,
  )

  expect(screen.getByText('Top Page')).toBeInTheDocument()
})

test('Display projects', async () => {
  firebaseUtilities.getProjects = jest.fn().mockResolvedValue([
    { id: 'test1', name: 'unique', description: 'test-unique' },
    { id: 'test2', name: 'test2', description: 'test3' },
    { id: 'test3', name: 'test3', description: 'test2' },
    { id: 'test4', name: 'test4', description: 'test1' },
  ])

  render(
    <Router>
      <Home />
    </Router>,
  )

  await waitFor(() => {
    expect(screen.getByText(/test-unique/)).toBeInTheDocument()
  })
})
