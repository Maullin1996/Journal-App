import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth/authSlice';
import { notAuthenticatedState } from "../../fixtures/authFixture";
import { startGoogleSignIn } from '../../../src/store/auth/thunks';

const mockStartGoogleSignIn = jest.fn

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

beforeEach(() => {
    jest.clearAllMocks();
} )


describe('Pruebas en el <LoginPage />', () => {

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


});