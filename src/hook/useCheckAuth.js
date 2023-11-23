import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/journal/thunks';
import { FirebaseAuth } from '../firebase/config';


export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    useEffect(() => {
        /*Es la funcion encargada de vigilar los cambios que
        el usuario va a tener de forma dinámica
        como lo recomienda firebase*/
        /*Regresa un observable */
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            if( !user ) return dispatch( logout() );
            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoURL }) )
            /*se pone aqui ya que este hook es el primero en enterarse 
            del login del usuario*/
            dispatch( startLoadingNotes() ); 
        } );

    }, [])
    
    return{
        status
    }
}
