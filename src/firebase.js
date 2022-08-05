
import {initializeApp} from "firebase/app";



    const firebaseConfig = {
    apiKey: "AIzaSyDGV3aHc-AeC5aSF-NCf5nQjureOrFwj8A",
    authDomain: "crud-firebase-6a57d.firebaseapp.com",
    projectId: "crud-firebase-6a57d",
    storageBucket: "crud-firebase-6a57d.appspot.com",
    messagingSenderId: "1046124915754",
    appId: "1:1046124915754:web:7b6c1d604162dba2332753"
    };


export const appFirebase = initializeApp(firebaseConfig);

/*const fb = initializeApp(firebaseConfig);  

export const db = getFirestore(fb);*/