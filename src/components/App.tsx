import React, { useEffect } from 'react'
import logo from 'logo.svg'
import { useAuth0 } from '@auth0/auth0-react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { addProject, findOrCreateUser } from 'utilities/Firebase'

const App = () => {
  const { user, logout } = useAuth0()
  const { sub: userId, email } = user

  useEffect(() => {
    findOrCreateUser(userId, { email: email })
  }, [email, userId])

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={() => logout()}>Log Out</button>
      <button
        onClick={() =>
          addProject(userId, {
            title: 'new',
          })
        }
      >
        New Project
      </button>
    </div>
  )
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <div>Loading</div>,
})
