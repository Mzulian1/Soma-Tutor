import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Button,
    Alert,
    Card,
    CardContent,
    CardActions,
    Grid,
    Chip,
} from '@mui/material'
import { ArrowBack, Download, Description } from '@mui/icons-material'
import { apiResidenteService } from '@/services'
import type { Documento } from '@/services/residenteService'
import { Residente } from '@/store/residenteStore'
import LoadingSpinner from '@/components/LoadingSpinner'
import { formatDate } from '@/utils/dateUtils'

export default function DocumentosPage() {
    const { residenteId } = useParams<{ residenteId: string }>()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [residente, setResidente] = useState<Residente | null>(null)
    const [documentos, setDocumentos] = useState<Documento[]>([])

    useEffect(() => {
        loadData()
    }, [residenteId])

    const loadData = async () => {
        if (!residenteId) return

        try {
            setLoading(true)
            const id = parseInt(residenteId)

            const [resData, docData] = await Promise.all([
                apiResidenteService.getById(id),
                apiResidenteService.getDocumentos(id),
            ])

            setResidente(resData)
            setDocumentos(docData)
        } catch (err: any) {
            console.error('Error cargando documentos:', err)
            setError('Error al cargar los documentos.')
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = async (documento: Documento) => {
        try {
            const blob = await apiResidenteService.downloadDocumento(documento.id)
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', documento.nombre)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.error('Error descargando documento:', err)
            alert('Error al descargar el documento')
        }
    }

    const getTipoColor = (tipo: string) => {
        switch (tipo) {
            case 'contrato':
                return 'primary'
            case 'liquidacion':
                return 'success'
            case 'autorizacion':
                return 'warning'
            default:
                return 'default'
        }
    }

    const getTipoLabel = (tipo: string) => {
        const labels: Record<string, string> = {
            contrato: 'Contrato',
            liquidacion: 'Liquidación',
            autorizacion: 'Autorización',
        }
        return labels[tipo] || tipo
    }

    if (loading) {
        return <LoadingSpinner message="Cargando documentos..." />
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
                Documentos
            </Typography>
            {residente && (
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {residente.nombre}
                </Typography>
            )}

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {documentos.map((doc) => (
                    <Grid item xs={12} sm={6} md={4} key={doc.id}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Description color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                    <Box>
                                        <Chip
                                            label={getTipoLabel(doc.tipo)}
                                            color={getTipoColor(doc.tipo)}
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                                <Typography variant="h6" gutterBottom noWrap>
                                    {doc.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Fecha: {formatDate(doc.fecha)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    startIcon={<Download />}
                                    onClick={() => handleDownload(doc)}
                                >
                                    Descargar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {documentos.length === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    No hay documentos disponibles
                </Alert>
            )}
        </Box>
    )
}

