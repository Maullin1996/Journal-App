// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnviroments } from '../helper';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnviroments()
//console.log(env)

// Your web app's Firebase configuration

//console.log( import.meta.env );
//console.log(process.env)

// Dev/Prod
// const firebaseConfig = {
//   apiKey: "AIzaSyCKqr11YyYCNG3K_7uIXPZXlcOxHUcSqvU",
//   authDomain: "react-cursos-48580.firebaseapp.com",
//   projectId: "react-cursos-48580",
//   storageBucket: "react-cursos-48580.appspot.com",
//   messagingSenderId: "376524180465",
//   appId: "1:376524180465:web:03f5be794484a19a77d250"
// };

// Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyBpal1SkEDzuxhrT0NWE13_J3ixxO-RHL8",
//   authDomain: "tracker-da524.firebaseapp.com",
//   projectId: "tracker-da524",
//   storageBucket: "tracker-da524.appspot.com",
//   messagingSenderId: "505901582805",
//   appId: "1:505901582805:web:4e601725294591285ed55c"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};

//console.log(firebaseConfig)


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