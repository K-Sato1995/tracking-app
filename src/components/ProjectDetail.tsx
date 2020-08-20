import React, { useState, useEffect } from 'react'
import CalendarChart from 'components/Charts/CalendarChart'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import { getProject, getLogs } from 'utilities/Firebase'
import { useHistory } from 'react-router-dom'
import { Paper, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'

const ProjectDetailContainer = styled(Paper)`
  padding: 1em;
`
const ChartContainer = styled.div`
  height: 500px;
`
// TODO:
// Make it able to customise the page.
// For instance, a user can choose which charts they want to show on each project.
const ProjectDetail = () => {
  const { id: projectId } = useParams()
  let history = useHistory()
  const { user } = useAuth0()
  const { sub: userId } = user

  if (!projectId) throw new Error()
  const [project, setProject] = useState<Project>({})
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProject(userId, projectId)
        const logData = await getLogs(userId, projectId)
        setProject(projectData)
        setLogs(logData)
        setLoading(false)
      } catch (e) {
        console.error(e)
        history.push('/404')
      }
    }

    fetchProjects()
  }, [userId, projectId, history])

  //TODO: Merge the values of the same date
  const calendarChartDataSet = logs.map((log) => {
    const { date, time } = log
    const subset = { day: date.toString(), value: time }
    return subset
  })

  if (loading) return <>Loading</>

  return (
    <ProjectDetailContainer>
      <Typography variant="h3">{project.title}</Typography>
      <ChartContainer>
        <CalendarChart data={calendarChartDataSet} />
      </ChartContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          history.push(`/project/${projectId}/new_log`)
        }}
      >
        Create a new Log
      </Button>
    </ProjectDetailContainer>
  )
}

export default ProjectDetail
