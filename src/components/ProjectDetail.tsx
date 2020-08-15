import React, { useState, useEffect } from 'react'
import LogForm from 'components/LogForm'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import { getProject } from 'utilities/Firebase'
import { useHistory } from 'react-router-dom'

const ProjectDetail = () => {
  const { id: projectId } = useParams()
  let history = useHistory()
  const { user } = useAuth0()
  const { sub: userId } = user

  if (!projectId) throw new Error()
  const [project, setProject] = useState<Project>({})

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProject(userId, projectId)
        setProject(data)
      } catch (e) {
        console.error(e)
        history.push('/404')
      }
    }

    fetchProjects()
  }, [userId, projectId, history])

  return (
    <div>
      <h1>Project Detail</h1>
      <ul>
        <li>id: {project.id}</li>
        <li>title: {project.title}</li>
      </ul>
      <LogForm userId={userId} projectId={projectId} />
    </div>
  )
}

export default ProjectDetail
