import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNote, setSaving, updatedNote } from './journalSlice';
import { loadNotes } from '../../helper/loadNotes';
import { fileUpload } from '../../helper';

export const startNewNote = () => {
    return async( dispatch, getSate ) => {

        dispatch( savingNewNote() );

        const { uid } = getSate().auth;
        //uid

        const newNote = {
            title: '',
            body:'',
            date: new Date().getTime(),
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

export const startSaveNote =  () => {
    return async ( dispatch, getState ) => {

        dispatch( setSaving() );

        const {uid} = getState().auth;
        const { activeNote: note } = getState().journal;

        const  noteToFireStore = { ...note };
        // para eliminar una propiedad del note
        delete noteToFireStore.id;
        //console.log( noteToFireStore )
        /*se ultiza esta funcion para apuntar al directorio
        para modificar la nota*/
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        await setDoc( docRef, noteToFireStore, { merge: true } )
        /*merge: true es una union en donde analiza si hay campos que
        existian en el noteToFireStore entonces los campos que estaban antes
        se mantienen*/

        dispatch( updatedNote( note ) );

    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        await fileUpload( files[0] )
    }

}
