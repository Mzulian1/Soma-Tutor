import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Avatar,
    Tooltip,
} from '@mui/material'
import {
    Brightness4,
    Brightness7,
    AccountCircle,
    Logout,
    Settings,
} from '@mui/icons-material'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'

export default function MainLayout() {
    const navigate = useNavigate()
    const tutor = useAuthStore((state) => state.tutor)
    const logout = useAuthStore((state) => state.logout)
    const mode = useThemeStore((state) => state.mode)
    const toggleMode = useThemeStore((state) => state.toggleMode)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handlePerfil = () => {
        handleClose()
        navigate('/perfil')
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        SOMA Tutor
                    </Typography>

                    <Tooltip title={mode === 'light' ? 'Modo oscuro' : 'Modo claro'}>
                        <IconButton color="inherit" onClick={toggleMode} sx={{ mr: 1 }}>
                            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Cuenta">
                        <IconButton
                            size="large"
                            aria-label="cuenta del usuario"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            {tutor?.nombre ? (
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                                    {tutor.nombre.charAt(0)}
                                </Avatar>
                            ) : (
                                <AccountCircle />
                            )}
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem disabled>
                            <Typography variant="body2">{tutor?.nombre}</Typography>
                        </MenuItem>
                        <MenuItem disabled>
                            <Typography variant="caption" color="text.secondary">
                                {tutor?.email}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handlePerfil}>
                            <Settings fontSize="small" sx={{ mr: 1 }} />
                            Mi Perfil
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <Logout fontSize="small" sx={{ mr: 1 }} />
                            Cerrar Sesión
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Outlet />
            </Container>

            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="xl">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © {new Date().getFullYear()} SOMA Tutor - Portal de Tutores y Apoderados
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}



