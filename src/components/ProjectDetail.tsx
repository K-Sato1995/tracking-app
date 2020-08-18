import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'
import { getProject, getLogs } from 'utilities/Firebase'
import { useHistory } from 'react-router-dom'
import { Paper, Button, Typography } from '@material-ui/core'
import { ResponsiveCalendar } from '@nivo/calendar'
import styled from 'styled-components'

const ProjectDetailContainer = styled(Paper)`
  padding: 1em;
`
const ChartContainer = styled.div`
  height: 500px;
`
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
        <ResponsiveCalendar
          data={calendarChartDataSet}
          from="2019-01-01"
          to="2020-12-31"
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          daySpacing={1}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          tooltip={function (e) {
            return (
              <>
                <Typography variant="subtitle2">{e.day}</Typography>
                <Typography variant="subtitle2">
                  {e.value === 1 ? `${e.value} hour` : `${e.value} hours`}
                </Typography>
              </>
            )
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
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
