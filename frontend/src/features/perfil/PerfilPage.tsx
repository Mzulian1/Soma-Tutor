import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    Alert,
    Snackbar,
} from '@mui/material'
import { ArrowBack, Save, Person } from '@mui/icons-material'
import { useAuthStore } from '@/store/authStore'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function PerfilPage() {
    const navigate = useNavigate()
    const tutor = useAuthStore((state) => state.tutor)

    const [loading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        rut: '',
        email: '',
        telefono: '',
        telefono_secundario: '',
        direccion: '',
        relacion: '',
    })

    useEffect(() => {
        if (tutor) {
            setFormData({
                nombre: tutor.nombre || '',
                rut: tutor.rut || '',
                email: tutor.email || '',
                telefono: tutor.telefono || '',
                telefono_secundario: tutor.telefono_secundario || '',
                direccion: tutor.direccion || '',
                relacion: tutor.relacion || '',
            })
        }
    }, [tutor])

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simular guardado
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // En un entorno real, aquí se llamaría a la API
        // await apiTutorService.updateProfile(formData)

        setLoading(false)
        setShowSuccess(true)

        // Actualizar el store
        useAuthStore.setState({
            tutor: {
                ...tutor!,
                ...formData,
            },
        })
    }

    if (!tutor) {
        return <LoadingSpinner message="Cargando perfil..." />
    }

    return (
        <Box>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate('/dashboard')}
                sx={{ mb: 2 }}
            >
                Volver al Dashboard
            </Button>

            <Card>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                        <Person fontSize="large" color="primary" />
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Mi Perfil
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Información personal y de contacto
                            </Typography>
                        </Box>
                    </Box>

                    <Alert severity="info" sx={{ mb: 3 }}>
                        Mantén tu información actualizada para que el ELEAM pueda contactarte en caso de
                        emergencia.
                    </Alert>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Información Personal */}
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    Información Personal
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre Completo"
                                    value={formData.nombre}
                                    onChange={handleChange('nombre')}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="RUT"
                                    value={formData.rut}
                                    disabled
                                    helperText="El RUT no se puede modificar"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Relación con el Residente"
                                    value={formData.relacion}
                                    onChange={handleChange('relacion')}
                                    placeholder="Ej: Nieto/a, Hijo/a, Sobrino/a"
                                />
                            </Grid>

                            {/* Información de Contacto */}
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                    Información de Contacto
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange('email')}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Teléfono Principal"
                                    value={formData.telefono}
                                    onChange={handleChange('telefono')}
                                    required
                                    placeholder="+56912345678"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Teléfono Secundario"
                                    value={formData.telefono_secundario}
                                    onChange={handleChange('telefono_secundario')}
                                    placeholder="+56223334444"
                                    helperText="Opcional - Número de contacto alternativo"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Dirección"
                                    value={formData.direccion}
                                    onChange={handleChange('direccion')}
                                    multiline
                                    rows={2}
                                    placeholder="Calle, número, comuna, ciudad"
                                />
                            </Grid>

                            {/* Botón de guardar */}
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate('/dashboard')}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<Save />}
                                        disabled={loading}
                                    >
                                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            {/* Snackbar de éxito */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={4000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    ✓ Perfil actualizado correctamente
                </Alert>
            </Snackbar>
        </Box>
    )
}

