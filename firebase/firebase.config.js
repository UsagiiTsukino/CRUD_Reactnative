// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0q4U1N93pkqT-9pj6x5HoSqw6llUNt_U",
  authDomain: "crud-react-native-2569f.firebaseapp.com",
  projectId: "crud-react-native-2569f",
  storageBucket: "crud-react-native-2569f.appspot.com",
  messagingSenderId: "670901873528",
  appId: "1:670901873528:web:2fef03b188a32f660d368d",
  measurementId: "G-HGP6N6KTB8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);
