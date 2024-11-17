import { defaultInstance } from "../api/axios";
import { AuthDto } from "../types";
import { TokenService } from "./token.service";

export class AuthService {

    public static register = async (dto: AuthDto) => {
        const response = await defaultInstance.post("auth/register", dto)
        TokenService.setToken(response.data.accessToken)
    }

    public static login = async (dto: AuthDto) => {
        const response = await defaultInstance.post("auth/login", dto)
        TokenService.setToken(response.data.accessToken)
    }
}