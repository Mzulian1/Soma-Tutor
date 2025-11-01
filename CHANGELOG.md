# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2024-10-25

### ✨ Añadido

#### Frontend
- Aplicación React con TypeScript y Vite
- Material UI (MUI) con tema claro/oscuro
- Sistema de autenticación con JWT
- Dashboard con información de residentes
- Ficha clínica completa (antecedentes, medicamentos, vacunas)
- Visualización de tests clínicos (Katz, Barthel, Pfeiffer, Riesgo de Caídas)
- Listado paginado de actividades y cuidados
- Gestión de eventos clínicos con alertas de críticos
- Sistema de descarga de documentos (contratos, liquidaciones)
- Validación y formateo de RUT chileno
- Diseño responsive para móvil, tablet y desktop
- Code-splitting por rutas
- Store global con Zustand
- Tests unitarios con Vitest

#### Backend
- API REST con CodeIgniter 4
- Autenticación JWT con lcobucci/jwt
- Middleware de autorización
- Filtro CORS configurable
- Rate limiting para login
- 10 migraciones de base de datos (SQLite)
- Seeder con datos sintéticos chilenos
- 8 modelos de datos
- 6 controladores API
- Logs de eventos críticos
- Tests con PHPUnit
- Validación de entrada
- Paginación en endpoints

#### Infraestructura
- Docker Compose con Nginx + PHP-FPM
- Configuración para HTTPS (Let's Encrypt ready)
- Makefile con comandos útiles
- CI/CD con GitHub Actions
- Pre-commit hooks con Husky
- Variables de entorno (.env)

#### Documentación
- README completo con instalación y guías
- Documentación técnica completa en `/docs`:
  - Arquitectura del sistema (ARQUITECTURA.md)
  - Flujos de usuario detallados (FLUJOS-USUARIO.md)
  - Referencia completa de API (API-REFERENCE.md)
  - Guía de desarrollo (GUIA-DESARROLLO.md)
  - Solución de problemas (TROUBLESHOOTING.md)
- Tabla comparativa de proveedores cloud
- Arquitectura recomendada para producción
- Credenciales demo
- Guía de contribución (CONTRIBUTING.md)
- Este CHANGELOG

### 🔒 Seguridad
- JWT con expiración configurable
- Passwords hasheados con bcrypt
- Headers de seguridad en Nginx
- CORS restrictivo
- Verificación de autorización (tutor-residente)
- Rate limiting en login

### 📊 Rendimiento
- Code-splitting automático
- Lazy loading de rutas
- Paginación en listas grandes
- Índices en base de datos
- Gzip en Nginx
- Cache de assets estáticos

---

## [Unreleased]

### Planeado para v1.1
- Notificaciones por email
- Modo offline (PWA)
- Exportación de reportes PDF
- Chat en tiempo real

---

[1.0.0]: https://github.com/tu-usuario/soma-tutor/releases/tag/v1.0.0
[Unreleased]: https://github.com/tu-usuario/soma-tutor/compare/v1.0.0...HEAD

