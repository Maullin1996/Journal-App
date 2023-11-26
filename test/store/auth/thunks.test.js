import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startCreatingUserWithEmailPassord, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from "../../fixtures/authFixture";

jest.mock('../../../src/firebase/providers')

describe('Pruebas en AuthThunks', () => {
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('Debe de invocar el checkingCredentials', async() => {
        await checkingAuthentication()(dispatch);
        // const valor = checkingCredentials();
        // console.log(valor)
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => {

        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );
        //Thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {

        const loginData = { ok: false, errorMessage: 'un error en Google' };

        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword(formData)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {
        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
    });

    test('startCreatingUserWithEmailPassord Debe de crear el usuario', async() => {
        const loginData = { ok: true, ...demoUser };
        const formData = { 
            email: demoUser.email, 
            displayName: demoUser.displayName, 
            password: '123456' }
        
        await registerUserWithEmailPassword.mockResolvedValue( loginData )
        await startCreatingUserWithEmailPassord( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    })

    test('startCreatingUserWithEmailPassord Debe de mandar el errorMessage', async() => {
        const loginData = { ok: false, errorMessage: 'un error al crear cuenta' };
        const formData = { 
            email: demoUser.email, 
            displayName: demoUser.displayName, 
            password: '123456' }
        
        await registerUserWithEmailPassword.mockResolvedValue( loginData )
        await startCreatingUserWithEmailPassord( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    })
});