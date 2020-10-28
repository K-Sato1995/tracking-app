import React, { useReducer } from 'react'
import {
  initialProjectValue,
  projectReducer,
} from 'components/NewProject/reducers'
import { addProject } from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { TextField, Grid, Button, Typography } from '@material-ui/core'
import { FormContainer } from 'components/NewProject/styles'

const NewProject = () => {
  const { user } = useAuth0()
  const { sub: userId } = user
  const [projectState, dispatch] = useReducer(
    projectReducer,
    initialProjectValue,
  )

  const updateValue = (name: string, value: string) => {
    dispatch({
      type: 'UPDATE_VALUE',
      name: name,
      value: value,
    })
  }

  const resetProjectState = () => dispatch({ type: 'RESET_STATE' })

  return (
    <FormContainer>
      <Typography variant="h3">Create a new Project</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addProject(userId, {
            ...projectState,
          })
          resetProjectState()
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
              value={projectState.title}
              placeholder="Title"
              onChange={(e) => {
                updateValue(e.target.name, e.target.value)
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
              value={projectState.description}
              name="description"
              onChange={(e) => {
                updateValue(e.target.name, e.target.value)
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
