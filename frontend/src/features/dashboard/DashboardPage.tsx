import { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Alert,
} from '@mui/material'
import {
    Description,
    Assignment,
    Event,
    MedicalServices,
    Assessment,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useResidenteStore, Residente } from '@/store/residenteStore'
import { apiTutorService, apiResidenteService } from '@/services'
import type { EventoClinico } from '@/services/residenteService'
import LoadingSpinner from '@/components/LoadingSpinner'
import ResidenteCard from '@/components/ResidenteCard'
import { formatDateTime } from '@/utils/dateUtils'

export default function DashboardPage() {
    const navigate = useNavigate()
    const tutor = useAuthStore((state) => state.tutor)
    const { residentes, setResidentes } = useResidenteStore()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [eventosRecientes, setEventosRecientes] = useState<
        Record<number, EventoClinico[]>
    >({})

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const data = await apiTutorService.getMe()
            setResidentes(data.residentes)

            // Cargar eventos recientes de cada residente
            const eventosMap: Record<number, EventoClinico[]> = {}
            for (const residente of data.residentes) {
                try {
                    const result = await apiResidenteService.getEventos(residente.id, 1, 3)
                    eventosMap[residente.id] = result.data
                } catch (err) {
                    console.error(`Error cargando eventos del residente ${residente.id}:`, err)
                }
            }
            setEventosRecientes(eventosMap)
        } catch (err: any) {
            console.error('Error cargando dashboard:', err)
            setError('Error al cargar los datos. Por favor, intente nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <LoadingSpinner message="Cargando información..." />
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Bienvenido/a, {tutor?.nombre}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Panel de control - Residentes a su cargo
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Mis Residentes
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {residentes.map((residente) => (
                        <Grid item xs={12} key={residente.id}>
                            <ResidenteCard residente={residente} />

                            {/* Eventos recientes del residente */}
                            {eventosRecientes[residente.id] && eventosRecientes[residente.id].length > 0 && (
                                <Card sx={{ mt: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Eventos Recientes
                                        </Typography>
                                        {eventosRecientes[residente.id].map((evento) => (
                                            <Box
                                                key={evento.id}
                                                sx={{
                                                    mb: 2,
                                                    pb: 2,
                                                    borderBottom: '1px solid',
                                                    borderColor: 'divider',
                                                    '&:last-child': { borderBottom: 0 },
                                                }}
                                            >
                                                <Typography variant="body2" color="text.secondary">
                                                    {formatDateTime(evento.fecha_hora)} - {evento.tipo}
                                                </Typography>
                                                <Typography variant="body1">{evento.descripcion}</Typography>
                                            </Box>
                                        ))}
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            startIcon={<Event />}
                                            onClick={() => navigate(`/eventos/${residente.id}`)}
                                        >
                                            Ver todos los eventos
                                        </Button>
                                    </CardActions>
                                </Card>
                            )}

                            {/* Accesos rápidos */}
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card>
                                        <CardContent>
                                            <MedicalServices color="primary" sx={{ fontSize: 40 }} />
                                            <Typography variant="h6" sx={{ mt: 1 }}>
                                                Ficha Clínica
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Antecedentes, medicamentos y vacunas
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                onClick={() => navigate(`/ficha/${residente.id}`)}
                                            >
                                                Ver Ficha
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Card>
                                        <CardContent>
                                            <Assignment color="primary" sx={{ fontSize: 40 }} />
                                            <Typography variant="h6" sx={{ mt: 1 }}>
                                                Actividades
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Signos vitales y cuidados
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                onClick={() => navigate(`/actividades/${residente.id}`)}
                                            >
                                                Ver Actividades
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Card>
                                        <CardContent>
                                            <Assessment color="primary" sx={{ fontSize: 40 }} />
                                            <Typography variant="h6" sx={{ mt: 1 }}>
                                                Test Clínicos
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Katz, Barthel, Pfeiffer
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                onClick={() => navigate(`/test/${residente.id}`)}
                                            >
                                                Ver Tests
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Card>
                                        <CardContent>
                                            <Description color="primary" sx={{ fontSize: 40 }} />
                                            <Typography variant="h6" sx={{ mt: 1 }}>
                                                Documentos
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Contratos y liquidaciones
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                onClick={() => navigate(`/documentos/${residente.id}`)}
                                            >
                                                Ver Documentos
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>

                {residentes.length === 0 && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        No hay residentes asociados a su cuenta.
                    </Alert>
                )}
            </Box>
        </Box>
    )
}

