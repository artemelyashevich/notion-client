import React, { useState } from "react"
import { IError, INote } from "../types"
import { useNavigate } from "react-router-dom"
import { PAGES } from "../constants"
import { NoteService } from "../service/note.service"
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast'
import { AxiosError } from "axios"

interface IProps {
    id: string,
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>
}

export const useDeleteNote = ({ id, setNotes }: IProps) => {
    const navigate = useNavigate()
    const [apiErrors, setApiErrors] = useState<string[]>([])
    const { mutate } = useMutation({
        mutationKey: ["deleteNote"],
        mutationFn: (id: string) => NoteService.delete(id),
        onError: (err: AxiosError) => {
            const e = err.response?.data as IError
            setApiErrors(Object.keys(e.errors).length !== 0 ? Object.values(e.errors) : [e.message])
            toast.error("An error occurred.")
        }
    })
    const onDelete = () => {
        mutate(id || "")
        setNotes(prev => prev.filter(n => n.id !== id))
        navigate(PAGES.NOTES)
        toast.success("Note has been deleted.")
    }
    return { onDelete, apiErrors }
}