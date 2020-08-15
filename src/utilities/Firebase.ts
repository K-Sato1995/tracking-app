import { db } from 'firebaseConfig'

/*
  Create a new Project.
*/
const addProject = (userId: FirestoreUserId, data: Object) => {
  db.collection('users')
    .doc(userId)
    .collection('projects')
    .add(data)
    .then(function () {
      alert('A new project was successfully created!')
    })
    .catch(function (error: any) {
      alert(`Error: ${error}`)
    })
}

/*
  Get all the projects associated with the user.
*/
const getProjects = async (userId: FirestoreUserId) => {
  const querySnapshot = await db
    .collection('users')
    .doc(userId)
    .collection('projects')
    .get()

  const data = querySnapshot.docs.map((doc: any) => doc.data())

  return data
}

/*
  Create a new log.
*/
const addLog = (
  userId: FirestoreUserId,
  projectId: FirestoreProjectId,
  data: Object,
) => {
  db.collection('users')
    .doc(userId)
    .collection('projects')
    .doc(projectId)
    .collection('logs')
    .add(data)
    .then(function () {
      alert('A new log was successfully created!')
    })
    .catch(function (error: any) {
      alert(`Error: ${error}`)
    })
}

/*
  Create a user if the user with the given id dose not exist in the db.
*/
const findOrCreateUser = (userId: FirestoreUserId, data: Object) => {
  db.collection('users').doc(userId).set(data, { merge: true })
}
export { addProject, getProjects, addLog, findOrCreateUser }
