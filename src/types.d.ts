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
  Acceptable field Type
*/
type FieldAcceptableValueType = 'string' | 'boolean' | 'number'

/*
 Field Input Type
*/
type FieldInput = {
  name: string
  type: FieldAcceptableValueType
}
/*
 Project data type
*/
type Project = {
  id?: string
  title?: string
  description?: string
  fields?: FieldInput[]
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
      type: 'UPDATE_VALUE'
      path: 'project' | 'charts' | 'fields'
      name: string
      value: boolean | string
    }
  | {
      type: 'UPDATE_FIELD_VALUE'
      id: number
      name: string
      value: string
    }
  | {
      type: 'ADD_FIELD_INPUT'
    }
  | {
      type: 'REMOVE_FIELD_INPUT'
    }
/*
 Log field type
*/
type LogFieldType =
  | (FieldInput & { value: { [key: string]: string } })
  | (FieldInput & { value: { [key: string]: number } })
  | (FieldInput & { value: { [key: string]: boolean } })

/*
 Log data type
*/
type Log = {
  fields: LogFieldType[]
}
/*
  Type of data that should be given to a calendar chart
*/
type CalendarChartData = {
  day: string
  value: number
}[]
