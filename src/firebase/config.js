// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKqr11YyYCNG3K_7uIXPZXlcOxHUcSqvU",
  authDomain: "react-cursos-48580.firebaseapp.com",
  projectId: "react-cursos-48580",
  storageBucket: "react-cursos-48580.appspot.com",
  messagingSenderId: "376524180465",
  appId: "1:376524180465:web:03f5be794484a19a77d250"
};

// Initialize Firebase
//La inicialización sirve para la autentificación y la DB
export const FirebaseApp = initializeApp(firebaseConfig);
//Es el que tiene todas las funcionalidades de autentificación
export const FirebaseAuth = getAuth( FirebaseApp );
// Es la configuración de la base de datos.
export const FirebaseDB = getFirestore( FirebaseApp )

/* Cloud Firestore es una base de datos no relacional esto quiere
decir que no se tienene las tipicas tablas, se tiene colecciones
las cuales son parecidas, pero estas son mas permisivas que las
bases de datos relacionales */