import React from 'react'
import Routes from 'routes'
import { withAuthenticationRequired } from '@auth0/auth0-react'

const App = () => {
  return <Routes></Routes>
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <div>Loading</div>,
})
