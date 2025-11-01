import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff, Login } from '@mui/icons-material'
import { useAuthStore } from '@/store/authStore'
import { apiAuthService } from '@/services'
import { formatRutOnType, validateRut, cleanRut } from '@/utils/rutUtils'

export default function LoginPage() {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const [rut, setRut] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatRutOnType(e.target.value)
        setRut(formatted)
        setError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validar RUT
        if (!validateRut(rut)) {
            setError('RUT inválido')
            return
        }

        // Validar contraseña
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setLoading(true)

        try {
            const response = await apiAuthService.login({
                rut: cleanRut(rut),
                password,
            })

            login(response.tutor, response.accessToken)
            navigate('/')
        } catch (err: any) {
            console.error('Error en login:', err)
            setError(
                err.response?.data?.message || 'Error al iniciar sesión. Verifique sus credenciales.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                SOMA Tutor
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
                Portal de Tutores y Apoderados
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <TextField
                    fullWidth
                    label="RUT"
                    placeholder="11.111.111-1"
                    value={rut}
                    onChange={handleRutChange}
                    margin="normal"
                    required
                    autoFocus
                    disabled={loading}
                />

                <TextField
                    fullWidth
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    disabled={loading}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<Login />}
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                >
                    {loading ? 'Iniciando sesión...' : 'Ingresar'}
                </Button>

                <Box sx={{ mt: 4, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="caption" display="block" gutterBottom>
                        <strong>Credenciales de Demo:</strong>
                    </Typography>
                    <Typography variant="caption" display="block">
                        RUT: 11.111.111-1
                    </Typography>
                    <Typography variant="caption" display="block">
                        Contraseña: Demo123*
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

