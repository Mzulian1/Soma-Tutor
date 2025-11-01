/**
 * Exporta servicios según el modo (mock o real)
 * Para cambiar entre mock y API real, modificar USE_MOCK
 */

// Cambiar a false cuando el backend esté disponible
const USE_MOCK = true

// Servicios mock
import {
    mockAuthService,
    mockTutorService,
    mockResidenteService,
} from './mockService'

// Servicios reales
import { authService } from './authService'
import { tutorService } from './tutorService'
import { residenteService } from './residenteService'

// Exportar según configuración
export const apiAuthService = USE_MOCK ? mockAuthService : authService
export const apiTutorService = USE_MOCK ? mockTutorService : tutorService
export const apiResidenteService = USE_MOCK ? mockResidenteService : residenteService

// Para facilitar el cambio a API real en el futuro:
// 1. Cambiar USE_MOCK = false
// 2. Configurar VITE_API_URL en .env
// 3. Asegurarse que el backend esté corriendo



