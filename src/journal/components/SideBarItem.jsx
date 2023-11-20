import { useMemo } from 'react'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

export const SideBarItem = ({title = '', body, id, data, imageUrls = []}) => {

    const dispatch = useDispatch();

    const onClickSetNote = () => {
        dispatch( setActiveNote({title, body, id, data, imageUrls}) )
    }

    // para que el texto no pase de una sola linea.
    const newTitle = useMemo( () => {
        return title.length > 17
        ? title.substring(0,17) + '...'
        : title
    }, [ title ] )

    return (
    <ListItem 
        disablePadding>
        <ListItemButton onClick={onClickSetNote}>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
    )
}
