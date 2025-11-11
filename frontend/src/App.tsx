import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useThemeStore } from './store/themeStore'
import { useAuthStore } from './store/authStore'
import { getTheme } from './app/theme'

// Layouts
import MainLayout from './app/layout/MainLayout'
import AuthLayout from './app/layout/AuthLayout'

// Pages
import LoginPage from './features/auth/LoginPage'
import DashboardPage from './features/dashboard/DashboardPage'
import FichaPage from './features/ficha/FichaPage'
import ActividadesPage from './features/actividades/ActividadesPage'
import DocumentosPage from './features/documentos/DocumentosPage'
import TestPage from './features/test/TestPage'
import EventosPage from './features/eventos/EventosPage'
import PerfilPage from './features/perfil/PerfilPage'

// Guard para rutas privadas
function PrivateRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
    const mode = useThemeStore((state) => state.mode)
    const theme = getTheme(mode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                {/* Rutas públicas */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                {/* Rutas privadas */}
                <Route
                    element={
                        <PrivateRoute>
                            <MainLayout />
                        </PrivateRoute>
                    }
                >
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/perfil" element={<PerfilPage />} />
                    <Route path="/ficha/:residenteId" element={<FichaPage />} />
                    <Route path="/actividades/:residenteId" element={<ActividadesPage />} />
                    <Route path="/documentos/:residenteId" element={<DocumentosPage />} />
                    <Route path="/test/:residenteId" element={<TestPage />} />
                    <Route path="/eventos/:residenteId" element={<EventosPage />} />
                </Route>

                {/* Ruta por defecto */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </ThemeProvider>
    )
}

export default App



