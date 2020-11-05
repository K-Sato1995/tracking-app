import React from 'react'
import { render, screen, waitFor } from 'test-utils'
import ProjectDetail from 'components/ProjectDetail'
import firebaseUtilities from 'utilities/Firebase'

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    id: '5',
  }),
  useHistory: () => ({}),
}))

test('Display the fetched project', async () => {
  firebaseUtilities.getProject = jest.fn().mockResolvedValue({
    id: '5',
    title: 'test project',
    description: 'test',
  })

  render(<ProjectDetail />)

  await waitFor(() => {
    expect(screen.getByText(/test project/)).toBeInTheDocument()
  })
})

test('Display the fetched logs', async () => {
  firebaseUtilities.getLogs = jest
    .fn()
    .mockResolvedValue([
      { id: '12', time: '4', description: 'test', date: '2020-02-21' },
    ])

  render(<ProjectDetail />)

  await waitFor(() => {
    expect(screen.getByText(/4/)).toBeInTheDocument()
  })
})
