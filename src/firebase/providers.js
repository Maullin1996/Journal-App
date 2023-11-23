import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try{

        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        //const credentials =  GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return{
            ok: true,
            //User info
            displayName, email, photoURL, uid
        }
    }

    catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok: false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try{

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user;
        //console.log(resp);
        //TODO: actualizar el displayName en Firebase
        /*para saber cual es usuario acutal con farebase
        esta es la función que se necesita.*/
        await updateProfile( FirebaseAuth.currentUser, {
            displayName,
            photoURL
        } );

        return {
            ok: true,
            uid, photoURL, displayName, email
        }
    }

    catch (error) {
        console.log(error);
        return { ok: false, errorMessage: 'El usurio ya existe' }
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {
    //signInWithEmailAndPassword
    try{

        const response = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, 
                photoURL, 
                displayName} = response.user;

        return{
            ok: true,
            uid, photoURL, displayName
        }
    }
    catch (error) {
        //console.log(error);
        return { ok: false, errorMessage: error.message}
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}