import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null,
        //como debería de lucir una nota
        // activeNote: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https://foto1.jpg,
        //                     // https://foto2.jpg
        //                     // https://foto3.jpg
        // }

    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },

        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaved = '';

        },

        setNote: (state, action) => {
            state.notes = action.payload

        },

        setSaving: (state) => {
            state.isSaving = true;
            // TODO: mensaje de error...
            state.messageSaved = '';

        },

        updatedNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if( note.id  === action.payload.id ){
                    return action.payload;
                }
                return note; 
            } );
            //TODO: mostrar mensaje de actualizacion
            state.messageSaved = `${ action.payload.title }, 
            actualizada correctamente`
        },

        deleteNoteById: (state, action) => {

        },

    }
});


// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    updatedNote,
    deleteNoteById} = journalSlice.actions;
/*isSaving: true es una bandera booleana que me sertifique 
si estoy guardando o no*/