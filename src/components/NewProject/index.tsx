import React, { useReducer } from 'react'
import {
  initialProjectValue,
  projectReducer,
} from 'components/NewProject/reducers'
import { addProject } from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import {
  TextField,
  Grid,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import { FormContainer } from 'components/NewProject/styles'

const NewProject = () => {
  const { user } = useAuth0()
  const { sub: userId } = user
  const [projectState, dispatch] = useReducer(
    projectReducer,
    initialProjectValue,
  )

  const updateProjectValue = (field: string, value: string) => {
    dispatch({
      type: 'CHANGE_PROJECT_VALUE',
      field: field,
      value: value,
    })
  }

  const updateProjectChartValue = (field: string, value: boolean) => {
    dispatch({
      type: 'CHANGE_CHARTS_VALUE',
      field: field,
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
                updateProjectValue(e.target.name, e.target.value)
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
                updateProjectValue(e.target.name, e.target.value)
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={projectState.charts?.calendar}
                  name="calendar"
                  onChange={(e) => {
                    updateProjectChartValue(e.target.name, e.target.checked)
                  }}
                />
              }
              label="Calendar"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={projectState.charts?.bar}
                  name="bar"
                  onChange={(e) => {
                    updateProjectChartValue(e.target.name, e.target.checked)
                  }}
                />
              }
              label="Bar"
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
