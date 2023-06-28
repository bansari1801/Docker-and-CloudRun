import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseApp = {
    apiKey: "",
    authDomain: "react-registration-form-c660a.firebaseapp.com",
    projectId: "react-registration-form-c660a",
    storageBucket: "react-registration-form-c660a.appspot.com",
    messagingSenderId: "255377184606",
    appId: "1:255377184606:web:bb51b46a1d32d540a7a1cf"
}

const db = getFirestore(initializeApp(firebaseApp));


export default db;