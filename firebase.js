import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBXR-PhkT270X4OVbBwfE0BvaVoYjUTFfA",
  authDomain: "link-fc1fa.firebaseapp.com",
  projectId: "link-fc1fa",
  storageBucket: "link-fc1fa.appspot.com",
  messagingSenderId: "347293249868",
  appId: "1:347293249868:web:e9fbc3bbffb9514ab5dfe9",
  measurementId: "G-ENNMX2JM4R"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app()

const db = app.firestore()

export default db