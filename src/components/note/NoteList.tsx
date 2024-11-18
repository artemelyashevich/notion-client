import React, { useContext } from 'react'
import NoteCard from './NoteCard'
import { INoteContext, NoteContext } from '../../contexts/NotesContextProvider'
import Loader from '../shared/Loader'

const NoteList: React.FC = () => {
    const { isLoading, notes } = useContext(NoteContext) as INoteContext
    return (
        <div className='flex align-center text-center w-full justify-center'>
            {
                isLoading
                    ? <Loader />
                    : <div className='w-3/5 flex flex-col justify-center items-center'>
                        {notes?.map(note => <NoteCard note={note} key={note.id} />)}
                        {notes?.length === 0 && <p>There are no notes...</p>}
                    </div>
            }
        </div>
    )
}

export default React.memo(NoteList)