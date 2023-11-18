// los thunks solo son para tareas asincronas.

import { signInWithGoogle, registerUserWithEmailPassword } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle()
        if ( !result.ok ) 
        return dispatch( logout( result.errorMessage ) );
        
        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassord = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({
            email, 
            password, 
            displayName })

        if( !ok ) return dispatch( logout( {errorMessage} ) )
        
        dispatch( login( {uid, displayName, email, photoURL} ) );
        //console.log(resp);
    }
}