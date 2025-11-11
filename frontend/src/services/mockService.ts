/**
 * Servicio Mock - Simula las respuestas de la API
 * Para desarrollo frontend sin backend
 */

import {
    mockTutores,
    mockResidentes,
    mockAntecedentes,
    mockMedicamentos,
    mockVacunas,
    mockTestClinicos,
    mockActividades,
    mockEventos,
    mockDocumentos,
    mockTutorResidente,
} from './mockData'
import { generarPDFSintetico } from '@/utils/pdfGenerator'

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Almacenar sesión simulada
let currentTutorId: number | null = null

export const mockAuthService = {
    async login(credentials: { rut: string; password: string }) {
        await delay(500)

        // Buscar tutor por RUT (sin formato)
        const rutClean = credentials.rut.replace(/\./g, '').replace(/-/g, '')
        const tutor = mockTutores.find((t) => t.rut.replace(/\./g, '').replace(/-/g, '') === rutClean)

        if (!tutor || credentials.password !== 'Demo123*') {
            throw new Error('Credenciales inválidas')
        }

        currentTutorId = tutor.id

        return {
            success: true,
            accessToken: `mock-token-${tutor.id}-${Date.now()}`,
            tutor: {
                id: tutor.id,
                rut: tutor.rut,
                nombre: tutor.nombre,
                email: tutor.email,
                telefono: tutor.telefono,
                telefono_secundario: tutor.telefono_secundario,
                direccion: tutor.direccion,
                relacion: tutor.relacion,
            },
        }
    },

    async refresh() {
        await delay(300)
        return {
            success: true,
            message: 'Refresh token no implementado en versión mock',
        }
    },
}

export const mockTutorService = {
    async getMe() {
        await delay(400)

        if (!currentTutorId) {
            throw new Error('No autenticado')
        }

        const tutor = mockTutores.find((t) => t.id === currentTutorId)!
        const residenteIds = mockTutorResidente
            .filter((tr) => tr.tutor_id === currentTutorId)
            .map((tr) => tr.residente_id)

        const residentes = mockResidentes.filter((r) => residenteIds.includes(r.id))

        return {
            tutor,
            residentes,
        }
    },
}

export const mockResidenteService = {
    async getAll() {
        await delay(300)

        if (!currentTutorId) {
            throw new Error('No autenticado')
        }

        const residenteIds = mockTutorResidente
            .filter((tr) => tr.tutor_id === currentTutorId)
            .map((tr) => tr.residente_id)

        return mockResidentes.filter((r) => residenteIds.includes(r.id))
    },

    async getById(id: number) {
        await delay(300)
        const residente = mockResidentes.find((r) => r.id === id)
        if (!residente) {
            throw new Error('Residente no encontrado')
        }
        return residente
    },

    async getAntecedentes(residenteId: number) {
        await delay(300)
        return mockAntecedentes.filter((a) => a.residente_id === residenteId)
    },

    async getMedicamentos(residenteId: number) {
        await delay(300)
        return mockMedicamentos.filter((m) => m.residente_id === residenteId && m.activo === 1)
    },

    async getVacunas(residenteId: number) {
        await delay(300)
        return mockVacunas.filter((v) => v.residente_id === residenteId)
    },

    async getTestClinicos(residenteId: number) {
        await delay(300)
        return mockTestClinicos.filter((t) => t.residente_id === residenteId)
    },

    async getActividades(residenteId: number, page = 1, perPage = 20) {
        await delay(400)
        const all = mockActividades.filter((a) => a.residente_id === residenteId)
        const start = (page - 1) * perPage
        const data = all.slice(start, start + perPage)

        return {
            data,
            pagination: {
                current_page: page,
                per_page: perPage,
                total: all.length,
                total_pages: Math.ceil(all.length / perPage),
            },
        }
    },

    async getEventos(residenteId: number, page = 1, perPage = 20) {
        await delay(400)
        const all = mockEventos.filter((e) => e.residente_id === residenteId)
        const start = (page - 1) * perPage
        const data = all.slice(start, start + perPage)

        return {
            data,
            pagination: {
                current_page: page,
                per_page: perPage,
                total: all.length,
                total_pages: Math.ceil(all.length / perPage),
            },
        }
    },

    async getDocumentos(residenteId: number) {
        await delay(300)
        return mockDocumentos.filter((d) => d.residente_id === residenteId)
    },

    async downloadDocumento(documentoId: number) {
        await delay(500)
        const doc = mockDocumentos.find((d) => d.id === documentoId)
        if (!doc) {
            throw new Error('Documento no encontrado')
        }

        // Obtener datos del residente
        const residente = mockResidentes.find((r) => r.id === doc.residente_id)
        if (!residente) {
            throw new Error('Residente no encontrado')
        }

        // Obtener datos del tutor
        const tutorResidente = mockTutorResidente.find((tr) => tr.residente_id === doc.residente_id)
        const tutor = tutorResidente ? mockTutores.find((t) => t.id === tutorResidente.tutor_id) : null

        // Generar PDF con datos sintéticos realistas
        return generarPDFSintetico({
            tipo: doc.tipo,
            nombre: doc.nombre,
            fecha: doc.fecha,
            residenteNombre: residente.nombre,
            residenteRut: residente.rut,
            tutorNombre: tutor?.nombre || 'Sin tutor asignado',
            tutorRut: tutor?.rut || '',
        })
    },
}



