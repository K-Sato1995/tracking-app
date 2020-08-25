import React, { useState, useEffect } from 'react'
import { getProject } from 'utilities/Firebase'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory, useParams } from 'react-router-dom'
import CalendarForm from 'components/AddChart/CalendarForm'

const AddChart = () => {
  const { user } = useAuth0()
  const { sub: userId } = user
  const history = useHistory()
  const { id: projectId } = useParams()
  const [project, setProject] = useState<Project>({
    charts: { calendar: { used: false, day: '', value: '' } },
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProject(userId, projectId)
        setProject(data)
      } catch (e) {
        console.error(e)
        history.push('/404')
      }
    }
    fetchProject()
  }, [userId, projectId, history])

  return (
    <div>
      <h1>Add Chart</h1>
      <CalendarForm fields={project.fields} />
    </div>
  )
}

export default AddChart
