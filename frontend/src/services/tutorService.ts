import api from './api'
import { Residente } from '@/store/residenteStore'

interface TutorMeResponse {
    success: boolean
    data: {
        tutor: {
            id: number
            rut: string
            nombre: string
            email: string
            telefono?: string
        }
        residentes: Residente[]
    }
}

export const tutorService = {
    /**
     * Obtiene información del tutor autenticado y sus residentes
     */
    async getMe(): Promise<TutorMeResponse['data']> {
        const { data } = await api.get<TutorMeResponse>('/tutores/me')
        return data.data
    },
}



