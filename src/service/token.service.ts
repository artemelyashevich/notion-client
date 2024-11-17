import Cookies from 'js-cookie';
import { TOKEN } from '../constants';

export class TokenService {

    public static setToken = (token: string) => {
        Cookies.set(TOKEN.ACCESS_TOKEN, token)
    }

    public static getToken = (): string => {
        const token = Cookies.get(TOKEN.ACCESS_TOKEN)
        return token || ""
    }

    public static deleteToken = () => {
        Cookies.remove(TOKEN.ACCESS_TOKEN)
    }
}