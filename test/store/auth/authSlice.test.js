import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authFixture";

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
});