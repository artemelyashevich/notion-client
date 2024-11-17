import React, { useContext } from 'react'
import { INote } from '../../types'
import { formatDate } from '../../utils/date.utils'
import { Link } from 'react-router-dom'
import { INoteContext, NoteContext } from '../../contexts/NotesContextProvider';
import { useDeleteNote } from '../../hooks/useDeleteNote';

interface IProps {
    note: INote
}

const NoteCard = ({ note }: IProps) => {

    const { setNotes } = useContext(NoteContext) as INoteContext
    const { onDelete } = useDeleteNote({ id: note.id || "", setNotes })

    return (
        <div className='flex flex-col sm:flex-row w-full bg-gray-300 p-3 justify-between items-center mt-5'>
            <Link to={`/note/${note.id}`} className='flex gap-5'>
                <h1>{note.title}</h1>
                <p>{formatDate(note.createdAt)}</p>
            </Link>
            <div className='flex gap-5'>
                <Link className='bg-gray-600 text-white p-2 px-4' to={`/note/${note.id}/edit`}>Edit</Link>
                <button onClick={onDelete} className='bg-gray-600 text-white p-2 px-4'>Delete</button>
            </div>
        </div>
    )
}

export default React.memo(NoteCard)