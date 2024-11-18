export const BASE_URL = "http://localhost:8222/api/v1"

export enum PAGES {
    ABOUT = "/",
    NOTES = "/notes",
    AUTH = "/auth",
    NOTE = "/note/:id",
    CREATE_NOTE = "/note/create",
    EDIT_NOTE = "/note/:id/edit",
    NOTFOUND = "*"  
}

export enum TOKEN {
    ACCESS_TOKEN = "accessToken"
}