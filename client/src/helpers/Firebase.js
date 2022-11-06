import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import {firebase} from "firebase/compat/app";



const firebaseConfig = {
  apiKey: "AIzaSyBPVOnl2HNadqLJDZqGl1vFKm7sCrLY7pU",
  authDomain: "hack-cbs-8424f.firebaseapp.com",
  projectId: "hack-cbs-8424f",
  storageBucket: "hack-cbs-8424f.appspot.com",
  messagingSenderId: "278298918470",
  appId: "1:278298918470:web:f6f00158dce35a9f305447",
};

// function listAll(folder){
//   const storageRef = firebase.storage().ref();

//   var listRef = storageRef.child(folder);

//   listRef
//    .listAll()
//    .then((res) => {
//      res.prefix.forEach((folderRef) => {

//     });
//     res.items.forEach((itemRef) => {
//       console.log( itemRef)
//       itemRef.getDownloadUrl().then((url) => {
//         console.log("download url: " + url)
//       });
//     });
//    })
//    .catch((error) => {
//     console.log(error);
//    })
//   }


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const database = getDatabase(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { app, db ,storage};
