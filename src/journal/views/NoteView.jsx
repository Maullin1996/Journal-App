import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hook/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import { ImageGallery } from '../components/ImageGallery';




export const NoteView = () => {

    const dispatch = useDispatch();
    const  { activeNote: note, messageSaved, isSaving } = useSelector( state => state.journal);
    const { title, body, data, onInputChange, formState } = useForm(note)

    const dateString = useMemo( () => {
        const newDate = new Date( data );
        return newDate.toLocaleString();
    }, [data] );

    /*Ya que el input para la subida de archivos
    no se puede estilizar hay que utilizar el useRef para
    simular un boton, el cual estará asociado al
    UploadOutlined */
    const fileInputRef = useRef();


    useEffect(() => {
        dispatch( setActiveNote(formState) )

    }, [formState])

    useEffect(() => {
        if( messageSaved.length > 0 ) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])
    

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if( target.files.length === 0 ) return;
        console.log('subiendo archivos');
        dispatch( startUploadingFiles( target.files ) );
    }
    
    /*Las notas no cambian debido a que no se tiene la funcion en el useForm
    que le indique que apenas haya un cambio de nota destruya el formulario
    y acceda al nuevo no por tanto se debe de modificar el useForm */

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }
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

                    <input 
                        type="file"
                        multiple
                        ref={ fileInputRef }
                        onChange={ onFileInputChange }
                        style={{ display: 'none' }}
                    />

                    <IconButton
                        color='primary'
                        disabled={ isSaving }
                        onClick={ () => fileInputRef.current.click() }
                        >
                        <UploadOutlined/>
                    </IconButton>

                    <Button
                        disabled={ isSaving }
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

                <Grid
                    container
                    justifyContent='end'>
                        <Button
                            onClick={ onDelete }
                            sx={{ mt: 2 }}
                            color='error'>
                            <DeleteOutline/>
                            Borrar
                        </Button>

                </Grid>

                <ImageGallery images={ note.imageUrls } />
        </Grid>
    );
}
