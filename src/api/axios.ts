import axios, { type CreateAxiosDefaults } from 'axios';
import { TokenService } from '../service/token.service';
import { BASE_URL } from '../constants';

const options: CreateAxiosDefaults = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};

const defaultInstance = axios.create(options)

const secureInstance = axios.create(options)

secureInstance.interceptors.request.use(config => {
    const token = TokenService.getToken()
    if (config?.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export { defaultInstance, secureInstance }