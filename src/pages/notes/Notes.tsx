import React from 'react'
import NoteList from '../../components/note/NoteList';
import { PAGES } from '../../constants';
import { Link } from 'react-router-dom';

const Notes: React.FC = () => {
  return (
    <div className='flex flex-col align-center text-center w-full justify-center'>
      <h1 className='mb-10 font-bold text-[40px]'>Notes</h1>
      <Link className='mt-[1em] mb-2 p-3 text-xl mx-auto bg-gray-300 w-1/4' to={PAGES.CREATE_NOTE}>Create new note</Link>
      <NoteList />
    </div>
  )
}

export default React.memo(Notes)