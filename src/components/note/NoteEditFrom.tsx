import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query';
import { IError, INote } from '../../types';
import toast from 'react-hot-toast'
import { AxiosError } from 'axios';
import { PAGES } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { NoteService } from '../../service/note.service';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEditNote } from '../../hooks/useEditNote';
import { useGetNote } from '../../hooks/useGetNote';


const CreateNoteSchema = z.object({
    title: z.string().min(2, {
        message: "Title must contain more then 2 character(s)"
    }),
    content: z.string()
})

type CreateNoteSchemaType = z.infer<typeof CreateNoteSchema>


const NoteEditFrom: React.FC = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetNote({ id: id || "" })
    const { register,
        handleSubmit,
        formState: { errors },
        reset } = useForm<CreateNoteSchemaType>({ resolver: zodResolver(CreateNoteSchema) })
    const { mutate, apiErrors } = useEditNote({ reset, id: id || "" })
    const handleSubmitForm: SubmitHandler<CreateNoteSchemaType> = (data) => {
        mutate(data)
    }
    return (
        <>
            {
                isLoading
                    ? <p>Loading...</p>
                    : <form onSubmit={handleSubmit(handleSubmitForm)} className='p-5 border flex flex-col justify-center items-center w-3/4'>

                        <div className='flex items-start flex-col gap-1 mb-3 w-full'>
                            <label>Title</label>
                            <input {...register('title')} defaultValue={data?.title} className='border p-2 w-full' />
                            {errors.title && <span className='text-red-500'>{errors.title.message}</span>}
                        </div>
                        <div className='flex items-start flex-col gap-1 mb-3 w-full'>
                            <label>Content</label>
                            <textarea defaultValue={data?.content} {...register('content')} className='border p-2 w-full' ></textarea>
                        </div>
                        <div className='p-1'>
                            {apiErrors.map((err, index) => (
                                <p key={index} className='text-sm text-red-500'>{err}</p>
                            ))}
                        </div>
                        <button className='border px-5 py-2 text-center hover:bg-black hover:text-white' type='submit'>Update</button>
                    </form>
            }
        </>
    )
}

export default NoteEditFrom