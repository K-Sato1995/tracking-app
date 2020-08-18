/*
 Firestore's user id
*/
type FirestoreUserId = 'string'
/*
 Firestore's project id
*/
type FirestoreProjectId = 'string'
/*
 Project data type
*/
type Project = {
  id?: string
  title?: string
  description?: string
}
/*
 Log data type
*/
type Log = {
  title: string
  description?: string
  category: string
  time?: number
  date: Date
}
