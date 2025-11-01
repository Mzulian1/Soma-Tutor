import api from './api'

export interface LoginCredentials {
    rut: string
    password: string
}

export interface LoginResponse {
    success: boolean
    accessToken: string
    tutor: {
        id: number
        rut: string
        nombre: string
        email: string
    }
}

export const authService = {
    /**
     * Inicia sesión con RUT y contraseña
     */
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const { data } = await api.post<LoginResponse>('/auth/login', credentials)
        return data
    },

    /**
     * Refresca el token JWT (opcional en esta versión)
     */
    async refresh(): Promise<void> {
        await api.post('/auth/refresh')
    },
}



