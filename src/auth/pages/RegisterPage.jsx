import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hook';
import { startCreatingUserWithEmailPassord } from '../../store/auth';


const formData = {
    email: '',
    password: '',
    displayName: ''
}
//se crea un objeto con la informacion que se desea validar.
const formValidations = {
    //Preguntas de validación, si no tiene el @ muestra el mensaje...
    email: [ (value) => value.includes('@') , 'El correo debe de tener una @.'],
    password: [ (value) => value.length >= 6 , 'La contraseña debe de tener más de 6 letras.'],
    displayName: [ (value) => value.length >= 1 , 'el nombre es obligatorio.']
}


export const RegisterPage = () => {

    const disPatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState()

    const { 
        displayName, email, password, onInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations );

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        if ( !isFormValid ) return;
        //console.log(formState);
        disPatch( startCreatingUserWithEmailPassord(formState) )
    }
    return (
        <AuthLayout tittle='Crear Cuenta'>
            {/* <h1>FormValid { isFormValid ?  'Valido' : 'Incorrecto' }</h1> */}
            <form onSubmit={ onSubmit }>
                <Grid container>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder="Your Name"
                            fullWidth
                            name='displayName'
                            value={ displayName }
                            onChange={ onInputChange }
                            // se pone la doble negacion para convertirlo en un 
                            // valor booleano
                            /*solo se dispara el error si el !!displayNameValid 
                            no es valido y el formSubmitted se ha disparado*/
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ displayNameValid }
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name='email'
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid }
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="contraseña"
                            fullWidth
                            name='password'
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} >
                            <Button 
                                type="submit"
                                variant="contained"
                                fullWidth>
                                Crear Cuenta
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end' >
                        <Typography sx={{ mr: 1 }}> ¿Ya tienes cuenta? </Typography>
                        <Link
                            component={RouterLink}
                            color='inherit'
                            to="/auth/login">
                                Ingresar
                        </Link>
                    </Grid>

                </Grid>

            </form>
        </AuthLayout>
    );
}
