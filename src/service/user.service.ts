import { secureInstance } from "../api/axios"
import { IUser } from "../types"

export class UserService {

    public static findCurrentUser = async (): Promise<IUser> => {
        const response = await secureInstance.get("/users/current")
        return response.data
    }
}