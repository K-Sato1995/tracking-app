import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import { getProject, getLogs } from 'utilities/Firebase'
import { useHistory } from 'react-router-dom'
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.time}</TableCell>
                <TableCell>{log.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          history.push(`/project/${projectId}/new_log`)
        }}
      >
        Create a new Log
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push(`/project/${projectId}/edit`)
        }}
      >
        Edit This Project
      </Button>
    </ProjectDetailContainer>
  )
}

export default ProjectDetail
