import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyAu-Tx-ymQKLE_yZN5Efio9KmnbYrpfbVU",
  authDomain: "social-media-redwood.firebaseapp.com",
  projectId: "social-media-redwood",
  storageBucket: "social-media-redwood.appspot.com",
  messagingSenderId: "639641925246",
  appId: "1:639641925246:web:25f0eac71e5785c4f84a2f",
  measurementId: "G-VLZ1TDENBW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export {
  storage, firebase as default
}