// los thunks solo son para tareas asincronas.

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './authSlice';


export const checkingAuthentication = ( ) => {
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

        const result = await registerUserWithEmailPassword({
            email, 
            password, 
            displayName })

        if( !result.ok ) return dispatch( logout( result.errorMessage ) )
        
        dispatch( login( result ) );
        //console.log(resp);
    }
}

export const startLoginWithEmailPassword = ( { email, password } ) => {

    return  async( dispatch ) => {
        
        dispatch( checkingCredentials() );


        const resp = await loginWithEmailPassword({
            email,
            password,
        });
        if( !resp.ok )return dispatch( logout( resp ) );
        dispatch( login( resp ));
    }

}

export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );

    }
}