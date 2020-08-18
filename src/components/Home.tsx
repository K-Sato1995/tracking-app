import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { findOrCreateUser, getProjects } from 'utilities/Firebase'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  IconButton,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const Title = styled(Link)`
  text-decoration: none;
`

const Home = () => {
  const { user } = useAuth0()
  const { sub: userId, email } = user
  const history = useHistory()
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
      <Grid container spacing={2}>
        {projects.map((project, i) => {
          return (
            <Grid item xs={6} sm={4} key={i}>
              <Card>
                <CardHeader
                  title={
                    <Title to={`project/${project.id}`}>{project.title}</Title>
                  }
                />
                <CardContent>{project.description}</CardContent>
              </Card>
            </Grid>
          )
        })}
        <Grid item xs={6} sm={4}>
          <Card>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => history.push('/project/new')}
            >
              <AddIcon />
            </IconButton>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
