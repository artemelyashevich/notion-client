import { useState } from "react"
import { NoteService } from "../service/note.service"
import { IError, INote } from "../types"
import { AxiosError } from "axios"
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import { useMutation } from '@tanstack/react-query';
import { PAGES } from "../constants"
import { UseFormReset } from 'react-hook-form'


interface IProps {
    reset: UseFormReset<any>,
    id: string
}

export const useEditNote = ({ reset, id }: IProps) => {
    const navigate = useNavigate()
    const [apiErrors, setApiErrors] = useState<string[]>([])
    const { mutate } = useMutation({
        mutationKey: ["updateNote"],
        mutationFn: (data: INote) => NoteService.edit(data, id),
        onSuccess: () => {
            reset()
            toast.success("Note has been updated!")
            navigate(PAGES.NOTES)
        },
        onError: (err: AxiosError) => {
            const e = err.response?.data as IError
            setApiErrors(Object.keys(e.errors).length !== 0 ? Object.values(e.errors) : [e.message])
            toast.error("An error occurred.")
        }
    })
    return { apiErrors, mutate }
}