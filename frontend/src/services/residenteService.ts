import api from './api'
import { Residente } from '@/store/residenteStore'

export interface Antecedente {
    id: number
    residente_id: number
    tipo: string
    descripcion: string
    fecha: string | null
}

export interface Medicamento {
    id: number
    residente_id: number
    nombre: string
    via: string
    dosis: string
    frecuencia: string
    indicaciones: string | null
    activo: number
}

export interface Vacuna {
    id: number
    residente_id: number
    nombre: string
    fecha: string
    lote: string | null
    profesional: string | null
}

export interface TestClinico {
    id: number
    residente_id: number
    tipo: string
    fecha: string
    puntaje: number
    grado: string | null
    profesional: string | null
    opciones_json: string | null
}

export interface Actividad {
    id: number
    residente_id: number
    tipo: string
    fecha_hora: string
    notas: string | null
    adjunto_url: string | null
}

export interface EventoClinico {
    id: number
    residente_id: number
    tipo: string
    fecha_hora: string
    descripcion: string
    adjunto_url: string | null
    critico: number
}

export interface Documento {
    id: number
    residente_id: number
    tipo: string
    nombre: string
    url: string
    fecha: string
}

export const residenteService = {
    /**
     * Obtiene todos los residentes del tutor
     */
    async getAll(): Promise<Residente[]> {
        const { data } = await api.get('/residentes')
        return data.data
    },

    /**
     * Obtiene un residente por ID
     */
    async getById(id: number): Promise<Residente> {
        const { data } = await api.get(`/residentes/${id}`)
        return data.data
    },

    /**
     * Obtiene antecedentes de un residente
     */
    async getAntecedentes(residenteId: number): Promise<Antecedente[]> {
        const { data } = await api.get(`/residentes/${residenteId}/antecedentes`)
        return data.data
    },

    /**
     * Obtiene medicamentos de un residente
     */
    async getMedicamentos(residenteId: number): Promise<Medicamento[]> {
        const { data } = await api.get(`/residentes/${residenteId}/medicamentos`)
        return data.data
    },

    /**
     * Obtiene vacunas de un residente
     */
    async getVacunas(residenteId: number): Promise<Vacuna[]> {
        const { data } = await api.get(`/residentes/${residenteId}/vacunas`)
        return data.data
    },

    /**
     * Obtiene tests clínicos de un residente
     */
    async getTestClinicos(residenteId: number): Promise<TestClinico[]> {
        const { data } = await api.get(`/residentes/${residenteId}/test`)
        return data.data
    },

    /**
     * Obtiene actividades de un residente
     */
    async getActividades(
        residenteId: number,
        page = 1,
        perPage = 20
    ): Promise<{ data: Actividad[]; pagination: any }> {
        const { data } = await api.get(
            `/residentes/${residenteId}/actividades?page=${page}&per_page=${perPage}`
        )
        return data
    },

    /**
     * Obtiene eventos clínicos de un residente
     */
    async getEventos(
        residenteId: number,
        page = 1,
        perPage = 20
    ): Promise<{ data: EventoClinico[]; pagination: any }> {
        const { data } = await api.get(
            `/residentes/${residenteId}/eventos?page=${page}&per_page=${perPage}`
        )
        return data
    },

    /**
     * Obtiene documentos de un residente
     */
    async getDocumentos(residenteId: number): Promise<Documento[]> {
        const { data } = await api.get(`/residentes/${residenteId}/documentos`)
        return data.data
    },

    /**
     * Descarga un documento
     */
    async downloadDocumento(documentoId: number): Promise<Blob> {
        const { data } = await api.get(`/documentos/${documentoId}/download`, {
            responseType: 'blob',
        })
        return data
    },
}



