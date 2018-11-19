import firebase from 'firebase'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyBEaQnXANUCoSjzUFl5QAPBLkqqBNuAkNY",
    authDomain: "vue-firebase-project-35197.firebaseapp.com",
    databaseURL: "https://vue-firebase-project-35197.firebaseio.com",
    projectId: "vue-firebase-project-35197",
    storageBucket: "vue-firebase-project-35197.appspot.com",
    messagingSenderId: "134193557436"
};

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const shopCollection = firebase.database().ref('shoes')

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    shopCollection,
}



