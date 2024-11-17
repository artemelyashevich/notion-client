import React from 'react'
import NoteCreateForm from '../../components/note/NoteCreateForm'

const CreateNote: React.FC = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='mb-10 font-bold text-[30px]'>Create new Note</h1>
      <NoteCreateForm />
    </div>
  )
}

export default React.memo(CreateNote)