// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsu2XcgW3QCLS9mX1XKvhFan6vAv611pc",
  authDomain: "quizz-4e9ce.firebaseapp.com",
  projectId: "quizz-4e9ce",
  storageBucket: "quizz-4e9ce.appspot.com",
  messagingSenderId: "471669462590",
  appId: "1:471669462590:web:e625a90b874f2c44d4636f",
  measurementId: "G-R02JL6YQM4"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0 ){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const auth = firebase.auth();
//const analytics = getAnalytics(app);

export { auth };