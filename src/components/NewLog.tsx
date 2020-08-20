import React, { useState, useEffect } from 'react'
import { addLog, getProject } from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory, useParams } from 'react-router-dom'
import { TextField, Grid, Paper, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'

const FormContainer = styled(Paper)`
  padding: 1em;
`
const defaultLogValue: Log = {
  title: '',
  description: '',
  category: '',
  time: 0,
  date: new Date(),
}

const NewLog = () => {
  const { user } = useAuth0()
  const { sub: userId } = user
  const history = useHistory()
  const { id: projectId } = useParams()

  const [log, setLog] = useState<Log>(defaultLogValue)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        await getProject(userId, projectId)
      } catch (e) {
        console.error(e)
        history.push('/404')
      }
    }

    fetchProject()
  }, [userId, projectId, history])

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLog({
      ...log,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <FormContainer>
      <Typography variant="h3">Create a new Log</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addLog(userId, projectId, {
            ...log,
          })
          setLog(defaultLogValue)
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={log.title}
              fullWidth
              name="title"
              placeholder="Title"
              onChange={updateField}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={log.category}
              fullWidth
              name="category"
              placeholder="Category"
              onChange={updateField}
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
              value={log.description}
              placeholder="description"
              name="description"
              onChange={updateField}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={log.time}
              fullWidth
              type="number"
              name="time"
              placeholder="Time (hour)"
              onChange={updateField}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={log.date}
              fullWidth
              type="date"
              name="date"
              onChange={updateField}
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
