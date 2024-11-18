import { useQuery } from '@tanstack/react-query';
import { NoteService } from '../service/note.service';

interface IProps {
    id: string
}

export const useGetNote = ({ id }: IProps) => {
    const { data, isLoading } = useQuery({
        queryKey: [`findNote${id}`],
        queryFn: () => NoteService.findById(id || ""),
        retry: false
    })
    return { data, isLoading }
}
