import React, { useReducer } from 'react'
import FieldFormInput from 'components/NewProject/FieldInput'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
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
  IconButton,
} from '@material-ui/core'
import { FormContainer } from 'components/NewProject/styles'

const NewProject = () => {
  const { user } = useAuth0()
  const { sub: userId } = user
  const [projectState, dispatch] = useReducer(
    projectReducer,
    initialProjectValue,
  )

  const updateValue = (
    path: 'project' | 'charts' | 'fields',
    name: string,
    value: string | boolean,
  ) => {
    dispatch({
      type: 'UPDATE_VALUE',
      path: path,
      name: name,
      value: value,
    })
  }

  const updateFieldValue = (id: number, name: string, value: string) => {
    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      id: id,
      name: name,
      value: value,
    })
  }

  const resetProjectState = () => dispatch({ type: 'RESET_STATE' })
  const addFieldInput = () => dispatch({ type: 'ADD_FIELD_INPUT' })
  const removeFieldInput = () => dispatch({ type: 'REMOVE_FIELD_INPUT' })

  console.log(projectState)
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
                updateValue('project', e.target.name, e.target.value)
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
                updateValue('project', e.target.name, e.target.value)
              }}
            />
          </Grid>

          {projectState.fields.map((field: FieldInput, index: number) => (
            <FieldFormInput
              key={index}
              fieldId={index}
              field={field}
              updateFieldValue={updateFieldValue}
            />
          ))}

          <Grid item xs={12} sm={12}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={addFieldInput}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={removeFieldInput}
            >
              <RemoveIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={projectState.charts?.calendar}
                  name="calendar"
                  onChange={(e) => {
                    updateValue('charts', e.target.name, e.target.checked)
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
                    updateValue('charts', e.target.name, e.target.checked)
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
