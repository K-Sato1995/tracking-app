import firebase from 'firebase'

// https://sebhastian.com/react-firestore

const firebaseApp: any = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
})

const db = firebaseApp.firestore()

export { firebaseApp, db }
