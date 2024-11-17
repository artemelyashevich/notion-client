import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { NoteService } from "../service/note.service";
import { INote } from "../types";

export interface INoteContext {
    notes: INote[],
    isLoading: boolean,
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>
}

export const NoteContext = createContext<INoteContext | null>(null)

const NotesContextProvider = ({ children }: PropsWithChildren) => {
    const { data, isLoading } = useQuery({
        queryKey: ["findAllNotesByCurrentUser"],
        queryFn: () => NoteService.findAll(),
    })

    const [notes, setNotes] = useState<INote[]>([])

    useMemo(() => {
        setNotes(data || [])
    }, [data])
    return (
        <NoteContext.Provider value={{ notes, isLoading, setNotes }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NotesContextProvider