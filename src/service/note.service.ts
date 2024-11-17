import { secureInstance } from "../api/axios"
import { INote } from "../types"

export class NoteService {

    public static findAll = async (): Promise<INote[]> => {
        const response = await secureInstance.get("/notes")
        return response.data
    }

    public static findById = async (id: string): Promise<INote> => {
        const response = await secureInstance.get(`/notes/${id}`)
        return response.data
    }

    public static create = async (data: INote): Promise<INote> => {
        const response = await secureInstance.post("/notes", data)
        return response.data
    }

    public static edit = async (data: INote, id: string): Promise<INote> => {
        const response = await secureInstance.put(`/notes/${id}`, data)
        return response.data
    }

    public static delete = async (id: string): Promise<void> => {
        await secureInstance.delete(`/notes/${id}`)
    }
}