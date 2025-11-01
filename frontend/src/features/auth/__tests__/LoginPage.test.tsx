import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from '../LoginPage'

// Mock del router
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

// Mock del authService
vi.mock('@/services/authService', () => ({
    authService: {
        login: vi.fn(),
    },
}))

describe('LoginPage', () => {
    it('renderiza el formulario de login', () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        expect(screen.getByText('SOMA Tutor')).toBeInTheDocument()
        expect(screen.getByLabelText(/RUT/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument()
    })

    it('muestra error si el RUT es inválido', async () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        const rutInput = screen.getByLabelText(/RUT/i)
        const passwordInput = screen.getByLabelText(/Contraseña/i)
        const submitButton = screen.getByRole('button', { name: /Ingresar/i })

        fireEvent.change(rutInput, { target: { value: '12345678-9' } })
        fireEvent.change(passwordInput, { target: { value: 'Demo123*' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText(/RUT inválido/i)).toBeInTheDocument()
        })
    })
})



