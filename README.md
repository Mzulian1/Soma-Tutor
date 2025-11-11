# SOMA Tutor - Portal de Tutores y Apoderados

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![PHP](https://img.shields.io/badge/PHP-8.2-777bb4.svg)

**Aplicación web para tutores y apoderados de residentes de ELEAMs (Establecimientos de Larga Estadía para Adultos Mayores)**

[Demo en Vivo](#credenciales-demo) • [Características](#características) • [Instalación](#instalación) • [Documentación](#documentación)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
  - [Desarrollo Local](#desarrollo-local)
  - [Producción con Docker](#producción-con-docker)
- [Credenciales Demo](#credenciales-demo)
- [Documentación](#documentación)
- [Arquitectura](#arquitectura)
- [API REST](#api-rest)
- [Seguridad](#seguridad)
- [Tests](#tests)
- [Despliegue en Servidor](#despliegue-en-servidor)
- [Selección de Proveedores Cloud](#selección-de-proveedores-cloud)
- [Roadmap](#roadmap)
- [Licencia](#licencia)

---

## ✨ Características

### Para Tutores/Apoderados
- 🔐 **Autenticación segura** con RUT chileno y JWT
- 👥 **Gestión de residentes** asociados
- 📋 **Ficha clínica completa**
  - Antecedentes médicos
  - Medicamentos activos
  - Registro de vacunación
- 📊 **Tests clínicos** (Katz, Barthel, Pfeiffer, Riesgo de Caídas)
- 📝 **Actividades y cuidados** diarios
- 🚨 **Eventos clínicos** con alertas de eventos críticos
- 📄 **Documentos** descargables (contratos, liquidaciones, autorizaciones)
- 🌓 **Modo claro/oscuro**
- 📱 **Diseño responsive** (móvil, tablet, desktop)

### Técnicas
- ⚡ **Alto rendimiento** con code-splitting y lazy loading
- 🔒 **Seguridad** implementada según mejores prácticas
- 🧪 **Tests** unitarios e integración
- 🐳 **Containerizado** con Docker
- 📦 **CI/CD** con GitHub Actions
- 🎨 **Material UI** con tema personalizable
- 🌐 **i18n** preparado (español chileno base)

---

## 🛠 Stack Tecnológico

### Frontend
- **Framework**: React 18.2 + TypeScript
- **Build Tool**: Vite 5
- **UI Library**: Material UI (MUI) 5
- **Routing**: React Router 6
- **Estado Global**: Zustand
- **HTTP Client**: Axios
- **Formato de Fechas**: date-fns
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

### Backend
- **Framework**: CodeIgniter 4 (PHP 8.2)
- **Autenticación**: JWT (lcobucci/jwt)
- **Base de Datos**: SQLite (demo) / PostgreSQL (producción recomendada)
- **Testing**: PHPUnit
- **API**: RESTful

### Infraestructura
- **Web Server**: Nginx (reverse proxy)
- **PHP**: PHP-FPM 8.2
- **Containerización**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hooks**: Husky (pre-commit)

---

## 📦 Requisitos

### Desarrollo Local
- **Node.js** >= 18.x
- **PHP** >= 8.2
- **Composer** >= 2.x
- **SQLite3**
- **Git**

### Producción (Docker)
- **Docker** >= 24.x
- **Docker Compose** >= 2.x

---

## 🚀 Instalación

### Desarrollo Local

#### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/soma-tutor.git
cd soma-tutor
```

#### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
composer install

# Copiar archivo de entorno
cp env .env
# Editar .env y configurar JWT_SECRET

# Ejecutar migraciones
php spark migrate

# Poblar base de datos con datos demo
php spark db:seed DemoSeeder

# Levantar servidor de desarrollo
php spark serve
```

El backend estará disponible en `http://localhost:8080`

#### 3. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Copiar archivo de entorno
cp env .env
# Verificar que VITE_API_URL apunte a http://localhost:8080/api/v1

# Levantar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

---

### Producción con Docker

#### 1. Preparar entorno

```bash
# Copiar archivo de entorno
cp env .env

# Editar .env y configurar:
# - JWT_SECRET (mínimo 32 caracteres)
# - CORS_ALLOWED_ORIGINS
```

#### 2. Usar Makefile (recomendado)

```bash
# Instalar todo y desplegar
make deploy

# O paso a paso:
make install          # Instala dependencias
make frontend-build   # Build del frontend
make build           # Build de imágenes Docker
make up              # Levanta contenedores
make seed            # Pobla la BD
```

#### 3. Comandos Docker Compose directos

```bash
# Build frontend
cd frontend && npm install && npm run build && cd ..

# Build backend
cd backend && composer install && cd ..

# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ejecutar seeders
docker-compose exec backend php spark db:seed DemoSeeder
```

La aplicación estará disponible en `http://localhost`

---

## 🌐 Deployment Frontend (Solo Demo)

Si deseas desplegar **solo el frontend** con datos mock (sin backend):

### Opción 1: cPanel (Hosting Compartido)

¿Tienes un servidor con cPanel? Usa nuestro script automatizado:

**Windows:**
```powershell
cd frontend
.\prepare-cpanel.ps1
```

**Linux/Mac:**
```bash
cd frontend
chmod +x prepare-cpanel.sh
./prepare-cpanel.sh
```

Luego sube el archivo ZIP generado a cPanel File Manager → public_html/

📚 [**Guía completa cPanel**](./docs/DEPLOYMENT-CPANEL.md) | [Guía rápida](./frontend/README-CPANEL.md)

---

### Opción 2: Netlify (2 minutos)

```bash
cd frontend
npm run build
# Arrastra la carpeta dist/ a https://app.netlify.com/drop
```

---

### Opción 3: Scripts Automatizados

**Windows:**
```powershell
cd frontend
.\deploy.ps1 netlify  # o vercel, docker, build
```

**Linux/Mac:**
```bash
cd frontend
chmod +x deploy.sh
./deploy.sh netlify  # o vercel, docker, build
```

---

### Otras Opciones

- **Vercel**: `npm install -g vercel && vercel --prod`
- **Docker**: `docker build -t soma-tutor-frontend . && docker run -d -p 8080:80 soma-tutor-frontend`
- **Servidor tradicional**: `npm run build` y sube `dist/` por FTP/SFTP

📚 **Documentación completa**: [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | [Frontend Quick Guide](./frontend/DEPLOYMENT-QUICK.md)

---

## 🔑 Credenciales Demo

### Tutor 1 (2 residentes)
- **RUT**: `11.111.111-1`
- **Contraseña**: `Demo123*`
- **Residentes**: Rosa Elena Contreras, Carmen Gloria Fernández

### Tutor 2 (1 residente)
- **RUT**: `22.222.222-2`
- **Contraseña**: `Demo123*`
- **Residente**: Pedro Antonio Ramírez

---

## 📖 Documentación

### Documentación Completa

Este proyecto incluye documentación detallada en el directorio `/docs`:

| Documento | Descripción | Para Quién |
|-----------|-------------|------------|
| [⚡ Quick Start](./docs/QUICK-START.md) | Poner en marcha en 5 minutos | **Empezar aquí** |
| [📐 Arquitectura](./docs/ARQUITECTURA.md) | Arquitectura técnica completa del sistema | Arquitectos, Dev Senior |
| [👤 Flujos de Usuario](./docs/FLUJOS-USUARIO.md) | Flujos paso a paso desde perspectiva del usuario | PO, UX, QA |
| [🔌 API Reference](./docs/API-REFERENCE.md) | Referencia completa de todos los endpoints | Desarrolladores Frontend |
| [💻 Guía de Desarrollo](./docs/GUIA-DESARROLLO.md) | Guía práctica para contribuir al proyecto | Desarrolladores |
| [🚀 Deployment](./docs/DEPLOYMENT.md) | Guía completa de deployment en producción | DevOps, Arquitectos |
| [🔧 Troubleshooting](./docs/TROUBLESHOOTING.md) | Solución de problemas comunes | DevOps, Soporte |

### Inicio Rápido por Rol

**🆕 Usuario Nuevo:**
1. Seguir [Instalación](#instalación)
2. Leer [Credenciales Demo](#credenciales-demo)
3. Revisar [Flujos de Usuario](./docs/FLUJOS-USUARIO.md)

**👨‍💻 Desarrollador:**
1. Configurar entorno: [Guía de Desarrollo](./docs/GUIA-DESARROLLO.md)
2. Entender arquitectura: [Arquitectura](./docs/ARQUITECTURA.md)
3. Consultar API: [API Reference](./docs/API-REFERENCE.md)

**🏗️ Arquitecto/DevOps:**
1. Revisar [Arquitectura](./docs/ARQUITECTURA.md)
2. Ver [Despliegue en Servidor](#despliegue-en-servidor)
3. Consultar [Selección de Proveedores Cloud](#selección-de-proveedores-cloud)

---

## 🏗 Arquitectura

### Estructura del Proyecto

```
soma-tutor/
├── backend/                 # API REST CodeIgniter 4
│   ├── app/
│   │   ├── Config/         # Configuración (Routes, Database, etc.)
│   │   ├── Controllers/    # Controladores API
│   │   ├── Models/         # Modelos de datos
│   │   ├── Filters/        # Filtros (JWT, CORS)
│   │   └── Database/
│   │       ├── Migrations/ # Migraciones de BD
│   │       └── Seeds/      # Seeders con datos demo
│   ├── public/             # Entry point
│   └── writable/           # Logs, cache, storage
│
├── frontend/               # SPA React + TypeScript
│   ├── src/
│   │   ├── app/           # Configuración (theme, layout)
│   │   ├── components/    # Componentes reutilizables
│   │   ├── features/      # Módulos por funcionalidad
│   │   ├── services/      # Servicios API (Axios)
│   │   ├── store/         # Estado global (Zustand)
│   │   └── utils/         # Utilidades (RUT, fechas)
│   └── dist/              # Build de producción
│
├── docker/                 # Configuración Docker
│   ├── nginx/             # Configuración Nginx
│   └── php/               # Dockerfile PHP-FPM
│
├── docker-compose.yml      # Orquestación de servicios
├── Makefile               # Comandos útiles
└── README.md              # Este archivo
```

---

## 🔌 API REST

### Endpoints Principales

#### Autenticación
- `POST /api/v1/auth/login` - Iniciar sesión

#### Tutores
- `GET /api/v1/tutores/me` - Información del tutor autenticado

#### Residentes
- `GET /api/v1/residentes` - Listar residentes del tutor
- `GET /api/v1/residentes/:id` - Detalle de un residente

#### Ficha Clínica
- `GET /api/v1/residentes/:id/antecedentes` - Antecedentes médicos
- `GET /api/v1/residentes/:id/medicamentos` - Medicamentos activos
- `GET /api/v1/residentes/:id/vacunas` - Registro de vacunación
- `GET /api/v1/residentes/:id/test` - Tests clínicos

#### Seguimiento
- `GET /api/v1/residentes/:id/actividades` - Actividades (paginado)
- `GET /api/v1/residentes/:id/eventos` - Eventos clínicos (paginado)

#### Documentos
- `GET /api/v1/residentes/:id/documentos` - Listar documentos
- `GET /api/v1/documentos/:id/download` - Descargar documento

**Autenticación**: Todas las rutas excepto `/auth/login` requieren header `Authorization: Bearer {token}`

---

## 🔒 Seguridad

### Implementaciones

1. **Autenticación JWT**
   - Tokens firmados con HS256
   - Expiración configurable (30 min por defecto)
   - Refresh token (opcional)

2. **Autorización**
   - Middleware JWT en todas las rutas protegidas
   - Verificación de relación tutor-residente
   - Un tutor solo puede ver SUS residentes

3. **Rate Limiting**
   - Limitación de intentos de login (5 intentos / 5 minutos)
   - Por IP

4. **Headers de Seguridad**
   - X-Frame-Options
   - X-Content-Type-Options
   - X-XSS-Protection
   - CORS configurado

5. **HTTPS**
   - Configuración preparada para Let's Encrypt
   - Certificados SSL/TLS

6. **Validación**
   - Sanitización de entrada
   - Validación de RUT chileno
   - Passwords hasheados con bcrypt

---

## 🧪 Tests

### Backend (PHPUnit)

```bash
cd backend
composer test

# O directamente
vendor/bin/phpunit
```

**Cobertura**:
- Tests de autenticación
- Tests de acceso a recursos
- Tests de autorización

### Frontend (Vitest)

```bash
cd frontend
npm run test

# Modo UI
npm run test:ui
```

**Cobertura**:
- Tests de componentes
- Tests de utilidades (RUT, fechas)
- Tests de integración

---

## 🌐 Despliegue en Servidor

### Requisitos del Servidor
- Ubuntu 20.04+ (o similar)
- Docker y Docker Compose instalados
- Dominio apuntando al servidor (opcional, para HTTPS)

### Pasos

#### 1. Conectar al servidor

```bash
ssh usuario@tu-servidor.com
```

#### 2. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/soma-tutor.git
cd soma-tutor
```

#### 3. Configurar entorno

```bash
cp env .env
nano .env

# Configurar:
# JWT_SECRET: Generar un secreto seguro de 32+ caracteres
# CORS_ALLOWED_ORIGINS: Tu dominio (https://tudominio.com)
```

#### 4. Desplegar

```bash
make deploy
```

#### 5. Configurar HTTPS con Let's Encrypt (opcional)

```bash
# Instalar certbot
sudo apt-get update
sudo apt-get install certbot

# Obtener certificado
sudo certbot certonly --standalone -d tudominio.com

# Copiar certificados
sudo cp /etc/letsencrypt/live/tudominio.com/fullchain.pem docker/ssl/cert.pem
sudo cp /etc/letsencrypt/live/tudominio.com/privkey.pem docker/ssl/key.pem

# Descomentar sección HTTPS en docker/nginx/conf.d/default.conf
nano docker/nginx/conf.d/default.conf

# Reiniciar
docker-compose restart nginx
```

#### 6. Verificar

```bash
# Ver logs
docker-compose logs -f

# Verificar servicios
docker-compose ps
```

La aplicación estará disponible en `http://tu-servidor.com` (o `https://` si configuraste SSL)

---

## ☁️ Selección de Proveedores Cloud

### Análisis Comparativo (Criterio 2.1.3.1)

Para una implementación en producción real (más allá de esta demo), se recomienda evaluar los siguientes proveedores:

#### 1. **Almacenamiento de Archivos** (Documentos PDF)

| Criterio | AWS S3 | Google Cloud Storage | Azure Blob Storage | Filesystem Local |
|----------|---------|---------------------|-------------------|-----------------|
| **Seguridad** | ⭐⭐⭐⭐⭐ Encriptación, IAM, versioning | ⭐⭐⭐⭐⭐ Encriptación, IAM | ⭐⭐⭐⭐⭐ Encriptación, RBAC | ⭐⭐ Depende del servidor |
| **Integración** | ⭐⭐⭐⭐⭐ SDK PHP nativo | ⭐⭐⭐⭐ SDK disponible | ⭐⭐⭐⭐ SDK disponible | ⭐⭐⭐⭐⭐ Nativo |
| **Costo** | ⭐⭐⭐⭐ $0.023/GB/mes | ⭐⭐⭐⭐ $0.020/GB/mes | ⭐⭐⭐ $0.0184/GB/mes | ⭐⭐⭐⭐⭐ Solo hardware |
| **Soporte** | ⭐⭐⭐⭐⭐ 24/7 empresarial | ⭐⭐⭐⭐ 24/7 empresarial | ⭐⭐⭐⭐ 24/7 empresarial | ⭐⭐ Depende de IT |
| **Total** | 19/20 | 17/20 | 16/20 | 14/20 |

**Recomendación**: **AWS S3** por su madurez, integración y soporte empresarial.

#### 2. **Base de Datos** (Producción)

| Criterio | AWS RDS (PostgreSQL) | Google Cloud SQL | Azure Database | MySQL Managed | SQLite |
|----------|---------------------|-----------------|---------------|--------------|---------|
| **Seguridad** | ⭐⭐⭐⭐⭐ Encriptación, backups automáticos | ⭐⭐⭐⭐⭐ Encriptación, HA | ⭐⭐⭐⭐⭐ Encriptación, geo-redundancia | ⭐⭐⭐⭐ Según proveedor | ⭐⭐ Archivo local |
| **Integración** | ⭐⭐⭐⭐⭐ PDO nativo PHP | ⭐⭐⭐⭐ PDO nativo | ⭐⭐⭐⭐ PDO nativo | ⭐⭐⭐⭐⭐ PDO nativo | ⭐⭐⭐⭐⭐ PDO nativo |
| **Escalabilidad** | ⭐⭐⭐⭐⭐ Read replicas, auto-scaling | ⭐⭐⭐⭐ Read replicas | ⭐⭐⭐⭐ Read replicas | ⭐⭐⭐ Limitado | ⭐ Monolítico |
| **Costo** | ⭐⭐⭐ ~$45/mes (db.t3.micro) | ⭐⭐⭐ ~$40/mes | ⭐⭐⭐ ~$50/mes | ⭐⭐⭐⭐ Variable | ⭐⭐⭐⭐⭐ Gratis |
| **Total** | 18/20 | 16/20 | 16/20 | 15/20 | 12/20 |

**Recomendación**: **AWS RDS PostgreSQL** por rendimiento, confiabilidad y backups automáticos.

#### 3. **Notificaciones** (Email - Futuro)

| Criterio | AWS SES | SendGrid | Mailgun | SMTP Propio |
|----------|---------|----------|---------|------------|
| **Seguridad** | ⭐⭐⭐⭐⭐ SPF, DKIM, DMARC | ⭐⭐⭐⭐⭐ SPF, DKIM, DMARC | ⭐⭐⭐⭐ SPF, DKIM | ⭐⭐ Manual |
| **Integración** | ⭐⭐⭐⭐⭐ SDK AWS | ⭐⭐⭐⭐⭐ API REST simple | ⭐⭐⭐⭐ API REST | ⭐⭐⭐ PHPMailer |
| **Deliverability** | ⭐⭐⭐⭐ ~98% | ⭐⭐⭐⭐⭐ ~99% | ⭐⭐⭐⭐ ~98% | ⭐⭐ Variable |
| **Costo** | ⭐⭐⭐⭐⭐ $0.10/1000 emails | ⭐⭐⭐ $19.95/mes (40k) | ⭐⭐⭐ $35/mes (50k) | ⭐⭐⭐⭐ Servidor |
| **Total** | 19/20 | 18/20 | 15/20 | 11/20 |

**Recomendación**: **AWS SES** por integración con otros servicios AWS y costo competitivo. Alternativa: **SendGrid** por mejor deliverability.

### Arquitectura Recomendada para Producción

```
┌─────────────────────────────────────────────────┐
│  CloudFlare CDN (Frontend + Assets)             │
└─────────────────────────────────────────────────┘
                     │
┌─────────────────────────────────────────────────┐
│  AWS Application Load Balancer (HTTPS)          │
└─────────────────────────────────────────────────┘
        │                            │
┌───────────────┐          ┌────────────────────┐
│ EC2 Instance  │          │ EC2 Instance       │
│ (Backend API) │          │ (Backend API)      │
└───────────────┘          └────────────────────┘
        │                            │
        └────────────┬───────────────┘
                     │
        ┌────────────────────────┐
        │ AWS RDS PostgreSQL     │
        │ (Multi-AZ)             │
        └────────────────────────┘
                     │
        ┌────────────────────────┐
        │ AWS S3 (Documentos)    │
        └────────────────────────┘
                     │
        ┌────────────────────────┐
        │ AWS SES (Emails)       │
        └────────────────────────┘
```

**Costo Estimado Mensual**: ~$150-200 USD para <1000 usuarios

---

## 🗺 Roadmap

### Versión 1.1 (Próximo)
- [ ] Notificaciones por email
- [ ] Modo offline (PWA)
- [ ] Exportación de reportes PDF
- [ ] Chat en tiempo real (WebSocket)

### Versión 2.0 (Futuro)
- [ ] App móvil nativa (React Native)
- [ ] Video llamadas
- [ ] Firma electrónica de documentos
- [ ] Panel administrativo para ELEAMs

---

## 📝 Licencia

Este proyecto es una **demo** desarrollada con fines educativos y de evaluación.

---

## 👥 Contacto y Soporte

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/soma-tutor/issues)
- **Documentación**: [Wiki](https://github.com/tu-usuario/soma-tutor/wiki)

---

<div align="center">

**SOMA Tutor** - Cuidado transparente y accesible para tus seres queridos

Desarrollado con ❤️ para mejorar la calidad de vida de los adultos mayores

</div>

