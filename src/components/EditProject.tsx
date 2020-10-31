import React, { useState, useEffect } from 'react'
import { updateProject } from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { TextField, Grid, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import { getProject } from 'utilities/Firebase'

const FormContainer = styled(Paper)`
  padding: 1em;
`

const EditProject = () => {
  const { id: projectId } = useParams<RouteParams>()
  let history = useHistory()
  const { user } = useAuth0()
  const { sub: userId } = user

  if (!projectId) throw new Error()

  const [project, setProject] = useState<Project>({})
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProject(userId, projectId)
        setProject(projectData)
        setLoading(false)
      } catch (e) {
        console.error(e)
        history.push('/404')
      }
    }
    fetchProjects()
  }, [userId, projectId, history])

  if (loading) return <>Loading</>

  return (
    <FormContainer>
      <Typography variant="h3">Edit the Project</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateProject(userId, projectId, {
            ...project,
          })
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="title"
              value={project.title}
              placeholder="Title"
              onChange={(e) => {
                setProject({ ...project, title: e.target.value })
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              multiline={true}
              rows={3}
              fullWidth
              required
              placeholder="description"
              value={project.description}
              name="description"
              onChange={(e) => {
                setProject({ ...project, description: e.target.value })
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  )
}

export default EditProject
