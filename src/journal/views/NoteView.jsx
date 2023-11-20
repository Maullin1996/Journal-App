import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hook/useForm";
import { useSelector } from "react-redux";

export const NoteView = () => {

    const  { activeNote } = useSelector( state => state.journal);

    const { onInputChange, formState } = useForm( activeNote )

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
                        28 de agosto, 2023
                    </Typography>
                </Grid>
                <Grid item>
                    <Button color='primary' sx={{ padding: 2 }}>
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
                        value={ notes.title }
                        onChange={ onInputChange }
                    />
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="¿Qué sucedió en el día de hoy?"
                        minRows={ 5 }
                    />
                </Grid>

                <ImageGallery />
        </Grid>
    );
}
