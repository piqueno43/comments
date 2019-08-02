import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyA3c8JW8Hfu8JG3Dv9dIWhnnTHqm6bHiRw",
    authDomain: "reactcommentsweb.firebaseapp.com",
    databaseURL: "https://reactcommentsweb.firebaseio.com",
    projectId: "reactcommentsweb",
    storageBucket: "reactcommentsweb.appspot.com",
    messagingSenderId: "783530895675",
    appId: "1:783530895675:web:8a2850509d114ebb"
}
// Initialize Firebase
firebase.initializeApp(config)

export const database = firebase.database()
export const auth = firebase.auth()