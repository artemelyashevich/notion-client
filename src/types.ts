export interface AuthDto {
    email: string,
    password: string
}

export interface IUser {
    email: string,
    createdAt: string,
    updatedAt: string,
}

export interface INote {
    id?: string,
    userId?: string,
    title: string,
    content: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface IError {
    errors: {
        [key: string]: string
    },
    message: string
}