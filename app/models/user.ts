import { AuthorizationError } from "remix-auth"


export interface User {
    password: string
    username: string
    id: string
}

// export async 