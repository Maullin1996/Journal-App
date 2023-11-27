import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth/authSlice';
import { notAuthenticatedState } from "../../fixtures/authFixture";
import { startGoogleSignIn } from '../../../src/store/auth/thunks';

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () =>  mockStartLoginWithEmailPassword({ email, password })
    },
}));

jest.mock('react-redux', () =>({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Pruebas en el <LoginPage />', () => {
    
    beforeEach(() => {jest.clearAllMocks()});

    test('Debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        //screen.debug();
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('boton de google debe de llamar el startGoogleSignIn', async() => {

        //startGoogleSignIn()
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        //console.log(store.getState())
        //screen.debug();
        const googleBtn = screen.getByLabelText('google-btn')
        //console.log(googleBtn);
        /*El console.log del elemento onGoogleSignIn del 
        LoginPage no se muestra ya que si se mira el 
        screen.debug este se encuentra desabilitado. 
        por tanto se debe de cargar el preloadedState:*/
        fireEvent.click( googleBtn );
        //screen.debug();
        //console.log(store.getState())
        expect(mockStartGoogleSignIn).toHaveBeenCalled();

    });

    test('Debe de de llamar el startLoginWithEmailPassword', () => {
        
        const email = 'llanosma@google.com'
        const password = '123456'

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } } );

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } );

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email,
            password
        })

    });


});