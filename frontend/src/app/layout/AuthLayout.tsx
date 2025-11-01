import { Outlet } from 'react-router-dom'
import { Box, Container, Paper } from '@mui/material'

export default function AuthLayout() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Outlet />
                </Paper>
            </Container>
        </Box>
    )
}



