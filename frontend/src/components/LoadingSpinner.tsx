import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingSpinnerProps {
    message?: string
}

export default function LoadingSpinner({ message = 'Cargando...' }: LoadingSpinnerProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                gap: 2,
            }}
        >
            <CircularProgress size={60} />
            <Typography variant="body1" color="text.secondary">
                {message}
            </Typography>
        </Box>
    )
}



