import React, { useContext, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { INote } from '../../types';
import { PAGES } from '../../constants';
import { INoteContext, NoteContext } from '../../contexts/NotesContextProvider';
import { useDeleteNote } from '../../hooks/useDeleteNote';
import { useGetNote } from '../../hooks/useGetNote';

const Note: React.FC = () => {
  const { setNotes } = useContext(NoteContext) as INoteContext
  const { id } = useParams()
  const [note, setNote] = useState<INote>()
  const { data, isLoading } = useGetNote({ id: id || "" })
  const { onDelete } = useDeleteNote({ id: id || "", setNotes })
  useMemo(() => {
    setNote(data)
  }, [data])
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      {
        isLoading
          ? <p>Loading...</p>
          : <div className='w-3/5'>
            <div className='flex flex-col sm:flex-row items-center justify-between mb-3'>
              <Link className='bg-gray-300 p-3 ' to={PAGES.NOTES}>
                Go to notes
              </Link>
              <h1 className='text-[3rem]'>{note?.title}</h1>
              <div className='flex items-center gap-3'>
                <Link className='bg-gray-600 text-white p-2 px-4' to={`/note/${note?.id}/edit`}>Edit</Link>
                <button onClick={onDelete} className='bg-gray-600 text-white p-2 px-4'>Delete</button>
              </div>
            </div>
            <p className='w-full bg-gray-300 p-3 break-words'>{note?.content || "..."}</p>
          </div>
      }
    </div>
  )
}

export default React.memo(Note)