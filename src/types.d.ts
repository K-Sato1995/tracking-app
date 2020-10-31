/*
 Firestore's user id
*/
type FirestoreUserId = string
/*
 Firestore's project id
*/
type FirestoreProjectId = string
/*
  Types for available charts
*/
type ChartType = 'calendar' | 'bar'
/*
  Acceptable field Type
*/
type FieldAcceptableValueType = string | boolean | number

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
      name: string
      value: boolean | string
    }
/*
 Log data type
*/
type Log = {
  date: string
  time: number
  description: string
}

interface RouteParams {
  id: string
}
