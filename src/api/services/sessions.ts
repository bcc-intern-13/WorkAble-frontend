import api from "../core/axios";
import { User } from "@/shared/types/auth";

interface SessionData {
    user: {
        id: string
        email: string
    }
    access_token: string
}

interface SessionResponse {
    success: boolean
    message?: string
    user?: User
    isLoggedIn: boolean
}

export const sessionService = {
    createSession: async () => {
        const response = await api.post<SessionData>('/auth/session')
        return response.data
    }
}