import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { addProject, findOrCreateUser, getProjects } from 'utilities/Firebase'
import { Card, CardHeader, CardContent, Grid } from '@material-ui/core'

const Home = () => {
  const { user } = useAuth0()
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
      <button
        onClick={() =>
          addProject(userId, {
            title: 'new',
          })
        }
      >
        New Project
      </button>
      <Grid container spacing={2}>
        {projects.map((project, i) => {
          return (
            <Grid item xs={6} sm={4} key={i}>
              <Card>
                <CardHeader
                  title={
                    <Link to={`project/${project.id}`}>{project.title}</Link>
                  }
                />
                <CardContent>Description</CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Home
