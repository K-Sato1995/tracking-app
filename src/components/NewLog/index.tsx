import React, { useState } from 'react'
import { addLog } from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Button, Typography, TextField } from '@material-ui/core'
import { FormContainer } from 'components/NewLog/styles'

const NewLog = () => {
  const { user } = useAuth0()
  const { sub: userId } = user
  const history = useHistory()
  const { id: projectId } = useParams<RouteParams>()
  const [log, setLog] = useState<Log>({ date: '', description: '' })

  return (
    <FormContainer>
      <Typography variant="h3">Create a new Log</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addLog(userId, projectId, {
            ...log,
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
              name="Date"
              type="date"
              value={log.date}
              onChange={(e) => {
                setLog({ ...log, date: e.target.value })
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
              value={log.description}
              name="description"
              onChange={(e) => {
                setLog({ ...log, description: e.target.value })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                history.push(`/project/${projectId}`)
              }}
            >
              Go back to the Project detail Page
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  )
}

export default NewLog
