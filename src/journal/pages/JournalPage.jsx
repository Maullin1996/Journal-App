import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { startNewNote } from '../../store/journal';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView } from '../views/NoteView';
import { NothingSelectedView } from '../views/NothingSelectedView';



export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, activeNote: page } = useSelector( state => state.journal );
    //console.log(isSaving)

    const onClickNewNote = () => {
        dispatch( startNewNote() );
    }

    return (
        <JournalLayout>

            { (!!page)
            ?<NoteView />
            :<NothingSelectedView />
            }

            <IconButton
                onClick={onClickNewNote}
                disabled={ isSaving }
                size="large"
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor:'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50, 
                    bottom: 50,
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />

            </IconButton>
        </JournalLayout>
    );
}
