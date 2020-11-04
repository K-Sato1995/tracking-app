import React, { useState } from 'react'
import firebaseUtilities from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { TextField, Grid, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'

const FormContainer = styled(Paper)`
  padding: 1em;
`

const initialProjectValue: Project = {
  title: '',
  description: '',
}

const NewProject = () => {
  const [project, setProject] = useState<Project>(initialProjectValue)
  const { user } = useAuth0()
  const { sub: userId } = user
  const { addProject } = firebaseUtilities

  return (
    <FormContainer>
      <Typography variant="h3">Create a new Project</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addProject(userId, {
            ...project,
          })
          setProject(initialProjectValue)
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

export default NewProject
