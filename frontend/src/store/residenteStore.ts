import { create } from 'zustand'

export interface Residente {
    id: number
    rut: string
    nombre: string
    foto_url: string | null
    fecha_nacimiento: string
    sexo: string
    estado_general: string | null
    alergias: string | null
}

interface ResidenteState {
    residentes: Residente[]
    selectedResidente: Residente | null
    setResidentes: (residentes: Residente[]) => void
    setSelectedResidente: (residente: Residente | null) => void
}

export const useResidenteStore = create<ResidenteState>((set) => ({
    residentes: [],
    selectedResidente: null,
    setResidentes: (residentes) => set({ residentes }),
    setSelectedResidente: (residente) => set({ selectedResidente: residente }),
}))



