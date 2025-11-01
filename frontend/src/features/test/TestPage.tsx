import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Button,
    Alert,
    Card,
    CardContent,
    Grid,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { apiResidenteService } from '@/services'
import type { TestClinico } from '@/services/residenteService'
import { Residente } from '@/store/residenteStore'
import LoadingSpinner from '@/components/LoadingSpinner'
import { formatDate } from '@/utils/dateUtils'

export default function TestPage() {
    const { residenteId } = useParams<{ residenteId: string }>()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [residente, setResidente] = useState<Residente | null>(null)
    const [tests, setTests] = useState<TestClinico[]>([])

    useEffect(() => {
        loadData()
    }, [residenteId])

    const loadData = async () => {
        if (!residenteId) return

        try {
            setLoading(true)
            const id = parseInt(residenteId)

            const [resData, testData] = await Promise.all([
                apiResidenteService.getById(id),
                apiResidenteService.getTestClinicos(id),
            ])

            setResidente(resData)
            setTests(testData)
        } catch (err: any) {
            console.error('Error cargando tests:', err)
            setError('Error al cargar los tests clínicos.')
        } finally {
            setLoading(false)
        }
    }

    const getTipoLabel = (tipo: string) => {
        const labels: Record<string, string> = {
            katz: 'Índice de Katz',
            barthel: 'Índice de Barthel',
            pfeiffer: 'Test de Pfeiffer',
            riesgo_caidas: 'Riesgo de Caídas',
        }
        return labels[tipo] || tipo
    }

    const getGradoColor = (grado: string | null) => {
        if (!grado) return 'default'
        const gradoLower = grado.toLowerCase()
        if (gradoLower.includes('leve') || gradoLower.includes('bajo')) return 'success'
        if (gradoLower.includes('moderado') || gradoLower.includes('medio')) return 'warning'
        if (gradoLower.includes('severo') || gradoLower.includes('alto')) return 'error'
        return 'info'
    }

    if (loading) {
        return <LoadingSpinner message="Cargando tests clínicos..." />
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
                Tests Clínicos
            </Typography>
            {residente && (
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {residente.nombre}
                </Typography>
            )}

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {tests.map((test) => (
                    <Grid item xs={12} md={6} key={test.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {getTipoLabel(test.tipo)}
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Chip
                                        label={test.grado || 'Sin clasificar'}
                                        color={getGradoColor(test.grado)}
                                        sx={{ mr: 1 }}
                                    />
                                    <Chip label={`Puntaje: ${test.puntaje}`} variant="outlined" />
                                </Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Fecha: {formatDate(test.fecha)}
                                </Typography>
                                {test.profesional && (
                                    <Typography variant="body2" color="text.secondary">
                                        Profesional: {test.profesional}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {tests.length === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    No hay tests clínicos registrados
                </Alert>
            )}

            {tests.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Historial Completo
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Test</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Puntaje</TableCell>
                                    <TableCell>Grado</TableCell>
                                    <TableCell>Profesional</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tests.map((test) => (
                                    <TableRow key={test.id}>
                                        <TableCell>{getTipoLabel(test.tipo)}</TableCell>
                                        <TableCell>{formatDate(test.fecha)}</TableCell>
                                        <TableCell>{test.puntaje}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={test.grado || '-'}
                                                color={getGradoColor(test.grado)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{test.profesional || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    )
}

