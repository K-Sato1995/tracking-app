import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import { getProject, getLogs } from 'utilities/Firebase'
import { useHistory } from 'react-router-dom'
import { Paper, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'

const ProjectDetailContainer = styled(Paper)`
  padding: 1em;
`
const ProjectDetail = () => {
  const { id: projectId } = useParams<RouteParams>()
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

  if (loading) return <>Loading</>

  return (
    <ProjectDetailContainer>
      <Typography variant="h3">{project.title}</Typography>
      <ul>
        {logs.map((log, index) => {
          return (
            <li key={index}>
              {log.date}: {log.time} :{log.description}
            </li>
          )
        })}
      </ul>
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
