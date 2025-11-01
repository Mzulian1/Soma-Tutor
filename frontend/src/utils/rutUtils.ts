/**
 * Utilidades para validación y formateo de RUT chileno
 */

/**
 * Limpia el RUT removiendo puntos y guión
 */
export function cleanRut(rut: string): string {
    return rut.replace(/\./g, '').replace(/-/g, '').trim()
}

/**
 * Formatea el RUT con puntos y guión (11.111.111-1)
 */
export function formatRut(rut: string): string {
    const cleaned = cleanRut(rut)
    if (cleaned.length < 2) return cleaned

    const body = cleaned.slice(0, -1)
    const dv = cleaned.slice(-1)

    // Agregar puntos cada 3 dígitos desde la derecha
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return `${formattedBody}-${dv}`
}

/**
 * Calcula el dígito verificador de un RUT
 */
export function calculateDV(rut: string): string {
    const cleaned = cleanRut(rut)
    let sum = 0
    let multiplier = 2

    for (let i = cleaned.length - 1; i >= 0; i--) {
        sum += parseInt(cleaned[i]) * multiplier
        multiplier = multiplier === 7 ? 2 : multiplier + 1
    }

    const remainder = sum % 11
    const dv = 11 - remainder

    if (dv === 11) return '0'
    if (dv === 10) return 'K'
    return dv.toString()
}

/**
 * Valida un RUT chileno
 */
export function validateRut(rut: string): boolean {
    if (!rut || rut.trim().length === 0) return false

    const cleaned = cleanRut(rut)

    // Debe tener al menos 2 caracteres (1 número + DV)
    if (cleaned.length < 2) return false

    // Extraer cuerpo y DV
    const body = cleaned.slice(0, -1)
    const dv = cleaned.slice(-1).toUpperCase()

    // Validar que el cuerpo sea numérico
    if (!/^\d+$/.test(body)) return false

    // Calcular DV esperado
    const expectedDV = calculateDV(body)

    return dv === expectedDV
}

/**
 * Formatea el RUT mientras el usuario escribe
 */
export function formatRutOnType(value: string): string {
    // Remover caracteres no válidos
    let cleaned = value.replace(/[^\dkK]/g, '')

    if (cleaned.length === 0) return ''
    if (cleaned.length === 1) return cleaned

    // Separar cuerpo y DV
    const body = cleaned.slice(0, -1)
    const dv = cleaned.slice(-1)

    // Formatear cuerpo con puntos
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return cleaned.length > 1 ? `${formattedBody}-${dv}` : formattedBody
}



