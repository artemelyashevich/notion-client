import React from 'react'
import NoteEditFrom from '../../components/note/NoteEditFrom'

const EditNote: React.FC = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='mb-10 font-bold text-[30px]'>Edit note</h1>
      <NoteEditFrom />
    </div>
  )
}

export default React.memo(EditNote)