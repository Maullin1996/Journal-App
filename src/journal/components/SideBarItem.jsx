import { useMemo } from 'react'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

export const SideBarItem = ({note}) => {

    const dispatch = useDispatch();

    const onClickSetNote = () => {
        dispatch( setActiveNote({note}) )
    }

    // para que el texto no pase de una sola linea.
    const newTitle = useMemo( () => {
        return note.title.length > 17
        ? note.title.substring(0,17) + '...'
        : note.title
    }, [ note.title ] )

    return (
    <ListItem 
        disablePadding>
        <ListItemButton onClick={onClickSetNote}>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ note.body } />
            </Grid>
        </ListItemButton>
    </ListItem>
    )
}
