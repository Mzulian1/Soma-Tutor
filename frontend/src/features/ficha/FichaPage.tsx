import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
    Alert,
    Avatar,
} from '@mui/material'
import { ArrowBack, Download } from '@mui/icons-material'
import { apiResidenteService } from '@/services'
import type { Antecedente, Medicamento, Vacuna } from '@/services/residenteService'
import { Residente } from '@/store/residenteStore'
import LoadingSpinner from '@/components/LoadingSpinner'
import { formatDate, calculateAge } from '@/utils/dateUtils'
import { generarPDFFichaClinica } from '@/utils/pdfGenerator'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    )
}

export default function FichaPage() {
    const { residenteId } = useParams<{ residenteId: string }>()
    const navigate = useNavigate()

    const [tabValue, setTabValue] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [residente, setResidente] = useState<Residente | null>(null)
    const [antecedentes, setAntecedentes] = useState<Antecedente[]>([])
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
    const [vacunas, setVacunas] = useState<Vacuna[]>([])

    useEffect(() => {
        loadData()
    }, [residenteId])

    const loadData = async () => {
        if (!residenteId) return

        try {
            setLoading(true)
            const id = parseInt(residenteId)

            const [resData, antData, medData, vacData] = await Promise.all([
                apiResidenteService.getById(id),
                apiResidenteService.getAntecedentes(id),
                apiResidenteService.getMedicamentos(id),
                apiResidenteService.getVacunas(id),
            ])

            setResidente(resData)
            setAntecedentes(antData)
            setMedicamentos(medData)
            setVacunas(vacData)
        } catch (err: any) {
            console.error('Error cargando ficha:', err)
            setError('Error al cargar la ficha del residente.')
        } finally {
            setLoading(false)
        }
    }

    const handleDescargarFicha = () => {
        if (!residente) return

        try {
            const blob = generarPDFFichaClinica(residente, antecedentes, medicamentos, vacunas)
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `Ficha_Clinica_${residente.nombre.replace(/ /g, '_')}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.error('Error generando PDF:', err)
            alert('Error al generar el PDF de la ficha clínica')
        }
    }

    if (loading) {
        return <LoadingSpinner message="Cargando ficha clínica..." />
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>
    }

    if (!residente) {
        return <Alert severity="warning">Residente no encontrado</Alert>
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}>
                    Volver al Dashboard
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Download />}
                    onClick={handleDescargarFicha}
                    color="primary"
                >
                    Descargar Ficha Completa (PDF)
                </Button>
            </Box>

            {/* Encabezado del residente */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Avatar
                            src={residente.foto_url || undefined}
                            sx={{ width: 100, height: 100, fontSize: '2.5rem' }}
                        >
                            {residente.nombre.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="h5">{residente.nombre}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                RUT: {residente.rut}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Edad: {calculateAge(residente.fecha_nacimiento)} años
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Nacimiento: {formatDate(residente.fecha_nacimiento)}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <Chip label={residente.estado_general || 'Sin estado'} size="small" />
                            </Box>
                            {residente.alergias && (
                                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                    Alergias: {residente.alergias}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                    <Tab label="Antecedentes" />
                    <Tab label="Medicamentos" />
                    <Tab label="Vacunas" />
                </Tabs>
            </Box>

            {/* Antecedentes */}
            <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom>
                    Antecedentes Médicos
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Fecha</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {antecedentes.map((ant) => (
                                <TableRow key={ant.id}>
                                    <TableCell>
                                        <Chip label={ant.tipo} size="small" />
                                    </TableCell>
                                    <TableCell>{ant.descripcion}</TableCell>
                                    <TableCell>{ant.fecha ? formatDate(ant.fecha) : 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                            {antecedentes.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No hay antecedentes registrados
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            {/* Medicamentos */}
            <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                    Medicamentos Activos
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Medicamento</TableCell>
                                <TableCell>Vía</TableCell>
                                <TableCell>Dosis</TableCell>
                                <TableCell>Frecuencia</TableCell>
                                <TableCell>Indicaciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicamentos.map((med) => (
                                <TableRow key={med.id}>
                                    <TableCell>{med.nombre}</TableCell>
                                    <TableCell>{med.via}</TableCell>
                                    <TableCell>{med.dosis}</TableCell>
                                    <TableCell>{med.frecuencia}</TableCell>
                                    <TableCell>{med.indicaciones || '-'}</TableCell>
                                </TableRow>
                            ))}
                            {medicamentos.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No hay medicamentos activos
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            {/* Vacunas */}
            <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                    Registro de Vacunación
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Vacuna</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Lote</TableCell>
                                <TableCell>Profesional</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vacunas.map((vac) => (
                                <TableRow key={vac.id}>
                                    <TableCell>{vac.nombre}</TableCell>
                                    <TableCell>{formatDate(vac.fecha)}</TableCell>
                                    <TableCell>{vac.lote || '-'}</TableCell>
                                    <TableCell>{vac.profesional || '-'}</TableCell>
                                </TableRow>
                            ))}
                            {vacunas.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No hay vacunas registradas
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </Box>
    )
}

