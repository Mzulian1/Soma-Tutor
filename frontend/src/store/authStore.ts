import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Tutor {
    id: number
    rut: string
    nombre: string
    email: string
}

interface AuthState {
    tutor: Tutor | null
    accessToken: string | null
    isAuthenticated: boolean
    login: (tutor: Tutor, token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            tutor: null,
            accessToken: null,
            isAuthenticated: false,
            login: (tutor, token) =>
                set({
                    tutor,
                    accessToken: token,
                    isAuthenticated: true,
                }),
            logout: () =>
                set({
                    tutor: null,
                    accessToken: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: 'soma-auth-storage',
        }
    )
)



