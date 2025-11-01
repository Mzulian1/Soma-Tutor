import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Button,
    Alert,
    Card,
    CardContent,
    Chip,
    Pagination,
} from '@mui/material'
import { ArrowBack, Warning } from '@mui/icons-material'
import { apiResidenteService } from '@/services'
import type { EventoClinico } from '@/services/residenteService'
import { Residente } from '@/store/residenteStore'
import LoadingSpinner from '@/components/LoadingSpinner'
import { formatDateTime } from '@/utils/dateUtils'

export default function EventosPage() {
    const { residenteId } = useParams<{ residenteId: string }>()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [residente, setResidente] = useState<Residente | null>(null)
    const [eventos, setEventos] = useState<EventoClinico[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        loadData()
    }, [residenteId, page])

    const loadData = async () => {
        if (!residenteId) return

        try {
            setLoading(true)
            const id = parseInt(residenteId)

            const [resData, eventData] = await Promise.all([
                apiResidenteService.getById(id),
                apiResidenteService.getEventos(id, page, 20),
            ])

            setResidente(resData)
            setEventos(eventData.data)
            setTotalPages(eventData.pagination.total_pages)
        } catch (err: any) {
            console.error('Error cargando eventos:', err)
            setError('Error al cargar los eventos.')
        } finally {
            setLoading(false)
        }
    }

    const getTipoColor = (tipo: string) => {
        switch (tipo) {
            case 'caida':
                return 'error'
            case 'hospitalizacion':
                return 'warning'
            case 'cambio_medicamento':
                return 'info'
            case 'control_medico':
                return 'success'
            default:
                return 'default'
        }
    }

    const getTipoLabel = (tipo: string) => {
        const labels: Record<string, string> = {
            caida: 'Caída',
            hospitalizacion: 'Hospitalización',
            cambio_medicamento: 'Cambio de Medicamento',
            control_medico: 'Control Médico',
            evaluacion_nutricional: 'Evaluación Nutricional',
        }
        return labels[tipo] || tipo
    }

    if (loading && page === 1) {
        return <LoadingSpinner message="Cargando eventos..." />
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>
    }

    return (
        <Box>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
                Volver al Dashboard
            </Button>

            <Typography variant="h4" gutterBottom>
                Eventos Clínicos
            </Typography>
            {residente && (
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {residente.nombre}
                </Typography>
            )}

            <Box sx={{ mt: 4 }}>
                {eventos.map((evento) => (
                    <Card
                        key={evento.id}
                        sx={{
                            mb: 2,
                            borderLeft: evento.critico ? '4px solid' : 'none',
                            borderColor: 'error.main',
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Chip
                                        label={getTipoLabel(evento.tipo)}
                                        color={getTipoColor(evento.tipo)}
                                        size="small"
                                    />
                                    {evento.critico === 1 && (
                                        <Chip
                                            icon={<Warning />}
                                            label="Crítico"
                                            color="error"
                                            size="small"
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    {formatDateTime(evento.fecha_hora)}
                                </Typography>
                            </Box>
                            <Typography variant="body1">{evento.descripcion}</Typography>
                        </CardContent>
                    </Card>
                ))}

                {eventos.length === 0 && (
                    <Alert severity="info">No hay eventos clínicos registrados</Alert>
                )}

                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

