/*
 Firestore's user id
*/
type FirestoreUserId = 'string'
/*
 Firestore's project id
*/
type FirestoreProjectId = 'string'
/*
  Types for available charts
*/
type ChartType = 'calendar' | 'bar'

/*
 Project data type
*/
type Project = {
  id?: string
  title?: string
  description?: string
  charts?: {
    [id in ChartType]: boolean
  }
}
/*
  Type Of Actions of Project reducer
*/
type ProjectReducerAction =
  | {
      type: 'RESET_STATE'
    }
  | {
      type: 'CHANGE_PROJECT_VALUE'
      field: string
      value: string
    }
  | {
      type: 'CHANGE_CHARTS_VALUE'
      field: string
      value: boolean
    }
/*
 Log data type
*/
type Log = {
  title: string
  description?: string
  category: string
  time: number
  date: Date
}

/*
  Type of data that should be given to a calendar chart
*/
type CalendarChartData = {
  day: string
  value: number
}[]
