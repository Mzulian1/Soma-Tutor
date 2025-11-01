import { describe, it, expect } from 'vitest'
import { validateRut, formatRut, cleanRut, calculateDV } from '../rutUtils'

describe('RUT Utils', () => {
    describe('validateRut', () => {
        it('valida RUT correcto con formato', () => {
            expect(validateRut('11.111.111-1')).toBe(true)
        })

        it('valida RUT correcto sin formato', () => {
            expect(validateRut('111111111')).toBe(true)
        })

        it('rechaza RUT inválido', () => {
            expect(validateRut('12.345.678-9')).toBe(false)
        })

        it('rechaza RUT vacío', () => {
            expect(validateRut('')).toBe(false)
        })
    })

    describe('formatRut', () => {
        it('formatea RUT correctamente', () => {
            expect(formatRut('111111111')).toBe('11.111.111-1')
        })

        it('formatea RUT con K', () => {
            expect(formatRut('111111112')).toBe('11.111.111-2')
        })
    })

    describe('cleanRut', () => {
        it('limpia RUT formateado', () => {
            expect(cleanRut('11.111.111-1')).toBe('111111111')
        })

        it('limpia RUT con espacios', () => {
            expect(cleanRut(' 11.111.111-1 ')).toBe('111111111')
        })
    })

    describe('calculateDV', () => {
        it('calcula DV correcto', () => {
            expect(calculateDV('11111111')).toBe('1')
        })

        it('calcula DV para K', () => {
            // Este test depende de un RUT que tenga K como DV
            // Ejemplo: 24965330-K
            expect(calculateDV('24965330')).toBe('K')
        })
    })
})



