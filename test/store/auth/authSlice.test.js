import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixture";

describe('Pruebas en el authSlice', () => {
    
    test('Debe de regresar el estado inicial y llamarse "auth"', () => {
        //console.log(authSlice)
        /*se hace con el fin de garantizar el nombre que llama
        al reducer y no se vaya a cambiar la funcionalidad*/ 
        const state = authSlice.reducer( initialState, {} );
        //console.log(state)

        expect( authSlice.name ).toBe('auth');
        expect( state ).toEqual( initialState );

    });

    test('Dede de realizar la autenticación', () => {
        //console.log( login( demoUser ) );
        const state = authSlice.reducer( initialState, login(demoUser) );
        //console.log(state);
        expect( state ).toEqual( authenticatedState );
    });

    test('Debe de realizar el logout sin argumentos', () => {
        const errorMessage = null
        //console.log( login( demoUser ) );
        const state = authSlice.reducer( authenticatedState, logout({errorMessage}) );
        //console.log(state);
        expect( state ).toEqual( notAuthenticatedState );

    })

    test('Debe de realizar el logout y mostrar un mensaje', () => {
        const errorMessage = 'Credenciales no son correctas'
        const state = authSlice.reducer( authenticatedState, logout({errorMessage}) );
        //console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage
        });
    });
    test('Debe de cambiar el estado a checking', () => {
        const state = authSlice.reducer( authenticatedState, checkingCredentials() )
        expect( state.status ).toBe('checking');
    });
});