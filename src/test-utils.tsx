jest.spyOn(window, 'alert').mockImplementation(() => {})

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      sub: '2',
      email: 'test@example.com',
    },
  }),
}))

export * from '@testing-library/react'
