import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { addProject, findOrCreateUser, getProjects } from 'utilities/Firebase'

const App = () => {
  const { user, logout } = useAuth0()
  const { sub: userId, email } = user
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects(userId)
        setProjects(data)
      } catch (e) {
        console.log(e)
      }
    }

    findOrCreateUser(userId, { email: email })
    fetchProjects()
  }, [email, userId])

  return (
    <div className="App">
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
      <ul>
        {projects.map((project, i) => {
          return <li key={i}>{project.title}</li>
        })}
      </ul>
    </div>
  )
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <div>Loading</div>,
})
