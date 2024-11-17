import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { UserService } from "../service/user.service";
import { IUser } from "../types";

export interface IUserContext {
    user: IUser | undefined,
    isLoading: boolean
}

export const UserContext = createContext<IUserContext | null>(null)

const UserContextProvider = ({ children }: PropsWithChildren) => {

    const [user, setUser] = useState<IUser | undefined>()

    const { data, isLoading } = useQuery({
        queryKey: ['findCurrentUser'],
        queryFn: () => UserService.findCurrentUser(),
        retry: false
    })

    useMemo(() => {
        setUser(data)
    }, [data])

    return (
        <UserContext.Provider value={{ user, isLoading: isLoading }}>{children}</UserContext.Provider>
    )
}

export default UserContextProvider