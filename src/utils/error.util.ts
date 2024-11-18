import { IError } from "../types";

export const handleError = (error: IError) =>
    Object.keys(error.errors).length !== 0
        ? Object.values(error.errors)
        : [error.message]
