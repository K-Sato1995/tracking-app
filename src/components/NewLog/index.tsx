import React, { useState, useEffect } from 'react'
import DynamicFieldInput from 'components/NewLog/DynamicFieldInput'
import { addLog, getProject } from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Button, Typography } from '@material-ui/core'
import { FormContainer } from 'components/NewLog/styles'

const NewLog = () => {
  const { user } = useAuth0()
  const { sub: userId } = user
  const history = useHistory()
  const { id: projectId } = useParams()
  const [log, setLog] = useState<Log>({ fields: [] })

  const setLogFields = (fields: FieldInput[]): LogFieldType[] => {
    const inputs = fields.map((field) => {
      const { name, type } = field
      switch (type) {
        case 'string':
          return { ...field, value: { [name]: '' } }
        case 'number':
          return { ...field, value: { [name]: 0 } }
        case 'boolean':
          return { ...field, value: { [name]: false } }
        default:
          return { ...field, value: { defaultValue: '' } }
      }
    })

    return inputs
  }
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getProject(userId, projectId)
        setLog({ ...log, fields: setLogFields(project.fields) })
      } catch (e) {
        console.error(e)
        history.push('/404')
      }
    }
    fetchProject()
  }, [userId, projectId, history])

  const updateField = (
    fieldId: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const logFields = [...log.fields]
    logFields[fieldId]['value'][e.target.name] = e.target.value
    setLog({
      ...log,
      fields: [...logFields],
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
        }}
      >
        <Grid container spacing={1}>
          {log.fields.map((field, index) => {
            return (
              <Grid item xs={12} sm={12} key={index}>
                <DynamicFieldInput
                  field={field}
                  updateField={updateField}
                  fieldId={index}
                />
              </Grid>
            )
          })}
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
