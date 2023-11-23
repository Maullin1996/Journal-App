import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNote, setPhotosToActiveNote, setSaving, updatedNote } from './journalSlice';
import { loadNotes } from '../../helper/loadNotes';
import { fileUpload } from '../../helper/fileUpload';


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;
        // //uid

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
        dispatch( addNewEmptyNote( newNote ) );
        //dispatch activeNote
        dispatch( setActiveNote( newNote ) );
        // //console.log({newDoc, setDocResp})
    }
}

export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => {


        const { uid } = getState().auth;
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

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }

}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const{ uid } = getState().auth;
        const { activeNote: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );
    }
}
