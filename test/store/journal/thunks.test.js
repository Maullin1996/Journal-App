import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { addNewEmptyNote, savingNewNote, setActiveNote } from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';
import { FirebaseDB } from '../../../src/firebase/config';

describe('Pruebas en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe de crear una nueva nota en blanco', async() => {
        
        /*El id del usuario es el TEST-UID */
        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid } });

        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: "",
            title: "",
            imageUrls: [],
            id: expect.any( String ),
            data: expect.any( Number ),
        }) );

        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: "",
            title: "",
            imageUrls: [],
            id: expect.any( String ),
            data: expect.any( Number ),

        }) );

        // Borrar el Firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
        const docs = await getDocs( collectionRef );

        //console.log(docs);

        //una promesa para eliminar todas las notas
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
        await Promise.all( deletePromises );
    });
});