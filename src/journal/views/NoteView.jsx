import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hook/useForm';
import { setActiveNote, startSaveNote } from '../../store/journal';


export const NoteView = () => {

    const dispatch = useDispatch();
    const  { activeNote: note } = useSelector( state => state.journal);
    const { title, body, data, onInputChange, formState } = useForm( note )

    const dateString = useMemo( () => {
        const newDate = new Date( data );
        return newDate.toUTCString();
    }, [data] )

    useEffect(() => {
        dispatch( setActiveNote(formState) )

    }, [formState])

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }
    
    /*Las notas no cambian debido a que no se tiene la funcion en el useForm
    que le indique que apenas haya un cambio de nota destruya el formulario
    y acceda al nuevo no por tanto se debe de modificar el useForm */
    return (
        <Grid 
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
            >
                <Grid item>
                    <Typography 
                        fontSize={ 39 }
                        fontWeight='light'
                    >
                        { dateString }
                    </Typography>
                </Grid>
                <Grid item>
                    <Button 
                        onClick={ onSaveNote }
                        color='primary' 
                        sx={{ padding: 2 }}>
                        <SaveOutlined 
                        sx={{ fontSize: 30, mr: 1 }}
                        />
                        Save
                    </Button>
                </Grid>
                <Grid container>
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        placeholder="Ingrese un título"
                        label="Título"
                        sx={{ border: 'none', mb: 1 }}
                        name="title"
                        value={ title }
                        onChange={ onInputChange }
                    />
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="¿Qué sucedió en el día de hoy?"
                        minRows={ 5 }
                        name="body"
                        value={ body }
                        onChange={ onInputChange }
                    />
                </Grid>

                <ImageGallery />
        </Grid>
    );
}
