import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNote } from './journalSlice';
import { loadNotes } from '../../helper/loadNotes';

export const startNewNote = () => {
    return async( dispatch, getSate ) => {

        dispatch( savingNewNote() );

        const { uid } = getSate().auth;
        //uid

        const newNote = {
            title: '',
            body:'',
            data: new Date().getTime(),
        }
        //Esto se hace para crear el path donde se va a guardar la nota
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        // dispatch
        //dispatch newNote
        dispatch( addNewEmptyNote( newNote ) );
        //dispatch activeNote
        dispatch( setActiveNote( newNote ) );
        //console.log({newDoc, setDocResp})
    }
}

export const startLoadingNotes = () => {
    return async ( dispatch, getSate ) => {


        const { uid } = getSate().auth;
        if( !uid ) throw new Error('El UID del usuario no exite');
        
        const notes = await loadNotes( uid )

        dispatch( setNote( notes ) )
        //console.log({uid})

    }
}
