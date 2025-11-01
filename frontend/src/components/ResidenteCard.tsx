import { Card, CardContent, CardMedia, Typography, Box, Chip, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Residente } from '@/store/residenteStore'
import { calculateAge, formatDate } from '@/utils/dateUtils'

interface ResidenteCardProps {
    residente: Residente
}

export default function ResidenteCard({ residente }: ResidenteCardProps) {
    const navigate = useNavigate()
    const edad = calculateAge(residente.fecha_nacimiento)

    const getEstadoColor = (estado: string | null) => {
        if (!estado) return 'default'
        const estadoLower = estado.toLowerCase()
        if (estadoLower.includes('bueno') || estadoLower.includes('estable')) return 'success'
        if (estadoLower.includes('delicado') || estadoLower.includes('crítico')) return 'error'
        return 'warning'
    }

    return (
        <Card
            sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                },
            }}
            onClick={() => navigate(`/ficha/${residente.id}`)}
        >
            <Box sx={{ display: 'flex', p: 2 }}>
                {residente.foto_url ? (
                    <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120, borderRadius: 2 }}
                        image={residente.foto_url}
                        alt={residente.nombre}
                    />
                ) : (
                    <Avatar sx={{ width: 120, height: 120, fontSize: '3rem' }}>
                        {residente.nombre.charAt(0)}
                    </Avatar>
                )}

                <CardContent sx={{ flex: 1, pl: 2 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                        {residente.nombre}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        RUT: {residente.rut}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Edad: {edad} años ({formatDate(residente.fecha_nacimiento)})
                    </Typography>

                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {residente.estado_general && (
                            <Chip
                                label={residente.estado_general}
                                color={getEstadoColor(residente.estado_general)}
                                size="small"
                            />
                        )}
                        <Chip label={residente.sexo === 'M' ? 'Masculino' : 'Femenino'} size="small" />
                    </Box>

                    {residente.alergias && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                            Alergias: {residente.alergias}
                        </Typography>
                    )}
                </CardContent>
            </Box>
        </Card>
    )
}



