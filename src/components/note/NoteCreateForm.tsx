import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateNote } from '../../hooks/useCreateNote';


const CreateNoteSchema = z.object({
    title: z.string().min(2, {
        message: "Title must contain more then 2 character(s)"
    }),
    content: z.string()
})

type CreateNoteSchemaType = z.infer<typeof CreateNoteSchema>

const NoteCreateForm: React.FC = () => {
    const { register,
        handleSubmit,
        formState: { errors },
        reset } = useForm<CreateNoteSchemaType>({ resolver: zodResolver(CreateNoteSchema) })
    const { mutate, apiErrors } = useCreateNote({ reset })
    const handleSubmitForm: SubmitHandler<CreateNoteSchemaType> = (data) => {
        mutate(data)
    }
    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className='p-5 border flex flex-col justify-center items-center w-3/4'>
            <div className='flex items-start flex-col gap-1 mb-3 w-full'>
                <label>Title</label>
                <input {...register('title')} className='border p-2 w-full' />
                {errors.title && <span className='text-red-500'>{errors.title.message}</span>}
            </div>
            <div className='flex items-start flex-col gap-1 mb-3 w-full'>
                <label>Content</label>
                <textarea {...register('content')} className='border p-2 w-full' ></textarea>
            </div>
            <div className='p-1'>
                {apiErrors.map((err, index) => (
                    <p key={index} className='text-sm text-red-500'>{err}</p>
                ))}
            </div>
            <button className='border px-5 py-2 text-center hover:bg-black hover:text-white' type='submit'>Create</button>
        </form>
    )
}

export default React.memo(NoteCreateForm)