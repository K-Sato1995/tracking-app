import React, { useState } from 'react'
import { addProject } from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { TextField, Grid, Paper, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'

const FormContainer = styled(Paper)`
  padding: 1em;
`

const NewProject = () => {
  const { user } = useAuth0()
  const { sub: userId } = user

  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
  })

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <FormContainer>
      <Typography variant="h3">Create a new Project</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addProject(userId, {
            ...project,
          })
          setProject({ title: '', description: '' })
        }}
      >
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={project.title}
              fullWidth
              name="title"
              placeholder="Title"
              onChange={updateField}
            />
          </Grid>

          <Grid item sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              multiline={true}
              rows={3}
              fullWidth
              required
              value={project.description}
              placeholder="description"
              name="description"
              onChange={updateField}
            />
          </Grid>

          <Grid item sm={12}>
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
