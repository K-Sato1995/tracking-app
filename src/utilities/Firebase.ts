import { db } from 'firebase/config'
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

  const data = querySnapshot.docs.map((doc: any) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })

  return data
}

/*
  Get a project by id.
*/
const getProject = async (
  userId: FirestoreUserId,
  projectId: FirestoreProjectId,
) => {
  const doc = await db
    .collection('users')
    .doc(userId)
    .collection('projects')
    .doc(projectId)
    .get()

  if (doc.exists) {
    return { id: projectId, ...doc.data() }
  } else {
    throw new Error('No such document exists')
  }
}

/*
  Update project values
*/
const updateProject = (
  userId: FirestoreUserId,
  projectId: FirestoreProjectId,
  data: Object,
) => {
  db.collection('users')
    .doc(userId)
    .collection('projects')
    .doc(projectId)
    .update(data)
    .then(function () {
      alert('The project was successfully updated!')
    })
    .catch(function (error: any) {
      alert(`Error: ${error}`)
    })
}

/*
  Get all the projects associated with the user.
*/
const getLogs = async (
  userId: FirestoreUserId,
  projectId: FirestoreProjectId,
) => {
  const querySnapshot = await db
    .collection('users')
    .doc(userId)
    .collection('projects')
    .doc(projectId)
    .collection('logs')
    .get()

  const data = querySnapshot.docs.map((doc: any) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })

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

const exportedFunctions = {
  addProject,
  getProjects,
  getProject,
  updateProject,
  addLog,
  findOrCreateUser,
  getLogs,
}

export default exportedFunctions
