import { db } from 'firebaseConfig'

const addProject = (userId: string, data: Object) => {
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

export { addProject }
