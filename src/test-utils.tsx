jest.spyOn(window, 'alert').mockImplementation(() => {})

// jest.mock('utilities/Firebase', () => ({
//   getProjects: jest.fn(() => {
//     return Promise.resolve([
//       { id: 'test', name: 'test', description: 'test-unique' },
//       { id: 'test', name: 'test', description: 'test' },
//       { id: 'test', name: 'test', description: 'test' },
//       { id: 'test', name: 'test', description: 'test' },
//     ])
//   }),
//   findOrCreateUser: jest.fn((userId: string) => {}),
// }))

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      sub: '2',
      email: 'test@example.com',
    },
  }),
}))

export * from '@testing-library/react'
