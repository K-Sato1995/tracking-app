import React from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import { Typography } from '@material-ui/core'

interface Props {
  logs: Log[]
  correspondingFields: { used: boolean; day: string; value: string }
}

const CalendarChart = ({ logs, correspondingFields }: Props) => {
  const nameOfDayField = correspondingFields.day
  const nameOfValueField = correspondingFields.value

  // ideal Outcome: { day: string, value: number }[]
  const calendarChartDataSet = logs.map((log) => {
    const data = { day: '', value: 0 }

    const requiredFields = log.fields.filter((field) => {
      return field.name === nameOfDayField || field.name === nameOfValueField
    })
    // log: {id: string, fields: Field[]}
    // field: { name: string, type: string, value: { [name]: [type]} }

    requiredFields.map((field) => {
      if (field.name === nameOfDayField) {
        data.day = field.value[nameOfDayField] as string
      }

      if (field.name === nameOfValueField) {
        data.value = parseInt(field.value[nameOfValueField] as string)
      }
    })
    return data
  })

  return (
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
  )
}

export default CalendarChart
