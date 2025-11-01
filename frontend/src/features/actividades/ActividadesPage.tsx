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
import { ArrowBack } from '@mui/icons-material'
import { apiResidenteService } from '@/services'
import type { Actividad } from '@/services/residenteService'
import { Residente } from '@/store/residenteStore'
import LoadingSpinner from '@/components/LoadingSpinner'
import { formatDateTime } from '@/utils/dateUtils'

export default function ActividadesPage() {
    const { residenteId } = useParams<{ residenteId: string }>()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [residente, setResidente] = useState<Residente | null>(null)
    const [actividades, setActividades] = useState<Actividad[]>([])
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

            const [resData, actData] = await Promise.all([
                apiResidenteService.getById(id),
                apiResidenteService.getActividades(id, page, 20),
            ])

            setResidente(resData)
            setActividades(actData.data)
            setTotalPages(actData.pagination.total_pages)
        } catch (err: any) {
            console.error('Error cargando actividades:', err)
            setError('Error al cargar las actividades.')
        } finally {
            setLoading(false)
        }
    }

    const getTipoColor = (tipo: string) => {
        switch (tipo) {
            case 'signos_vitales':
                return 'info'
            case 'administracion_medicamento':
                return 'success'
            case 'cuidado_personal':
                return 'primary'
            case 'alimentacion':
                return 'warning'
            default:
                return 'default'
        }
    }

    const getTipoLabel = (tipo: string) => {
        const labels: Record<string, string> = {
            signos_vitales: 'Signos Vitales',
            administracion_medicamento: 'Medicamento',
            cuidado_personal: 'Cuidado Personal',
            alimentacion: 'Alimentación',
            movilizacion: 'Movilización',
        }
        return labels[tipo] || tipo
    }

    if (loading && page === 1) {
        return <LoadingSpinner message="Cargando actividades..." />
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
                Actividades y Cuidados
            </Typography>
            {residente && (
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {residente.nombre}
                </Typography>
            )}

            <Box sx={{ mt: 4 }}>
                {actividades.map((actividad) => (
                    <Card key={actividad.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Chip
                                    label={getTipoLabel(actividad.tipo)}
                                    color={getTipoColor(actividad.tipo)}
                                    size="small"
                                />
                                <Typography variant="caption" color="text.secondary">
                                    {formatDateTime(actividad.fecha_hora)}
                                </Typography>
                            </Box>
                            {actividad.notas && (
                                <Typography variant="body1">{actividad.notas}</Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}

                {actividades.length === 0 && (
                    <Alert severity="info">No hay actividades registradas</Alert>
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

