import React, { useState } from 'react'
import {
  Grid,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { FormContainer } from 'components/NewLog/styles'
import { updateProject } from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory, useParams } from 'react-router-dom'

interface Props {
  fields?: FieldInput[]
}

const CalendarForm = ({ fields }: Props) => {
  const [calendarValues, setCalendarValues] = useState({
    used: true,
    day: '',
    value: '',
  })
  const { user } = useAuth0()
  const { sub: userId } = user
  const history = useHistory()
  const { id: projectId } = useParams()
  // TODO: Create a form to assign fields to ResponsiveCalendar's required fields.
  /*
    day: Show only date fields
    value: Show only number fields
  */
  console.log(calendarValues)
  return (
    <FormContainer>
      <Typography variant="h3">Select fields</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateProject(userId, projectId, calendarValues)
          history.push(`/project/${projectId}`)
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <InputLabel>Day</InputLabel>
            <Select
              fullWidth
              variant="outlined"
              name="day"
              labelWidth={2}
              onChange={(e) => {
                setCalendarValues((prevState: any) => ({
                  ...prevState,
                  day: e.target.value,
                }))
              }}
            >
              {fields?.map((field, index) => {
                if (field.type === 'string') {
                  return (
                    <MenuItem key={index} value={field.name}>
                      {field.name}
                    </MenuItem>
                  )
                }
                return null
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputLabel>Value</InputLabel>
            <Select
              fullWidth
              variant="outlined"
              name="value"
              labelWidth={2}
              onChange={(e) => {
                setCalendarValues((prevState: any) => ({
                  ...prevState,
                  value: e.target.value,
                }))
              }}
            >
              {fields?.map((field, index) => {
                if (field.type === 'number') {
                  return (
                    <MenuItem key={index} value={field.name}>
                      {field.name}
                    </MenuItem>
                  )
                }
                return null
              })}
            </Select>
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

export default CalendarForm
