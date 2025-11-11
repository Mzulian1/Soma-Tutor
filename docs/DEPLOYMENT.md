# Guía de Deployment - Portal SOMA Tutor

Esta guía explica cómo compilar y desplegar la aplicación frontend en diferentes servicios de hosting.

## 📦 Construcción del Build

### Paso 1: Preparar el Proyecto

```bash
cd frontend
npm install
```

### Paso 2: Generar el Build de Producción

```bash
npm run build
```

Este comando:
- Compila TypeScript a JavaScript
- Optimiza y minifica el código
- Genera archivos estáticos en la carpeta `frontend/dist/`

### Estructura del Build

Después del build, tendrás:
```
frontend/dist/
├── index.html          # Página principal
├── assets/            # CSS, JS y otros recursos optimizados
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── vite.svg          # Favicon
```

### Verificar el Build Localmente

```bash
npm run preview
```

Esto inicia un servidor local en `http://localhost:4173` para probar el build.

---

## 🚀 Opciones de Deployment

### Opción 1: cPanel (Hosting Compartido)

**Ventajas:** Compatible con cualquier hosting compartido, control total, sin dependencias

Esta es la opción más común si ya tienes un servidor web con cPanel.

#### Preparación Automática

**Windows (PowerShell):**
```bash
cd frontend
.\prepare-cpanel.ps1
```

**Linux/Mac:**
```bash
cd frontend
chmod +x prepare-cpanel.sh
./prepare-cpanel.sh
```

Esto generará un archivo ZIP listo para subir.

#### Subir a cPanel

1. Accede a tu cPanel: `https://tudominio.com/cpanel`
2. File Manager → public_html/
3. Upload → Sube el archivo ZIP
4. Click derecho → Extract
5. Verifica que `.htaccess` esté presente (Settings → Show Hidden Files)

**📚 Guía completa:** [DEPLOYMENT-CPANEL.md](./DEPLOYMENT-CPANEL.md)

---

### Opción 2: Netlify (Recomendado para Demos - Gratis)

**Ventajas:** Gratis, CI/CD automático, CDN global, SSL incluido

#### Método A: Deploy desde GitHub

1. Sube tu código a GitHub
2. Ve a [Netlify](https://www.netlify.com/)
3. Click en "Add new site" → "Import an existing project"
4. Conecta tu repositorio de GitHub
5. Configura el build:
   - **Build command:** `cd frontend && npm run build`
   - **Publish directory:** `frontend/dist`
   - **Base directory:** (dejar vacío)
6. Click en "Deploy site"

#### Método B: Deploy Manual (Drag & Drop)

1. Genera el build: `npm run build`
2. Ve a [Netlify Drop](https://app.netlify.com/drop)
3. Arrastra la carpeta `frontend/dist` al navegador
4. ¡Listo! Tu sitio estará en línea

#### Configuración Adicional para Netlify

Crea un archivo `frontend/public/_redirects` con:

```
/*    /index.html   200
```

Esto asegura que las rutas de React Router funcionen correctamente.

---

### Opción 2: Vercel (Gratis)

**Ventajas:** Gratis, excelente rendimiento, CI/CD automático

#### Deploy desde GitHub

1. Sube tu código a GitHub
2. Ve a [Vercel](https://vercel.com/)
3. Click en "Add New" → "Project"
4. Importa tu repositorio de GitHub
5. Configura el proyecto:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click en "Deploy"

#### Deploy desde CLI

```bash
npm install -g vercel
cd frontend
vercel
```

---

### Opción 3: GitHub Pages (Gratis)

**Ventajas:** Gratis, integrado con GitHub

#### Pasos:

1. Instala `gh-pages`:

```bash
cd frontend
npm install --save-dev gh-pages
```

2. Modifica `frontend/vite.config.ts`:

```typescript
export default defineConfig({
    base: '/nombre-de-tu-repositorio/',  // Agregar esta línea
    plugins: [react()],
    // ... resto de la configuración
})
```

3. Agrega scripts en `frontend/package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:

```bash
npm run deploy
```

5. Configura GitHub Pages:
   - Ve a Settings → Pages
   - Source: gh-pages branch
   - Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo/`

---

### Opción 4: Servidor Tradicional (Apache/Nginx)

**Para:** Servidores propios, VPS, hosting compartido

#### A. Servidor con Apache

1. Genera el build:
```bash
cd frontend
npm run build
```

2. Crea un archivo `.htaccess` en `frontend/dist/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

3. Sube el contenido de `frontend/dist/` a tu servidor (por FTP/SFTP)

4. Coloca los archivos en:
   - **Root domain:** `/var/www/html/` o `/public_html/`
   - **Subdirectorio:** `/var/www/html/soma-tutor/`

#### B. Servidor con Nginx

1. Genera el build:
```bash
cd frontend
npm run build
```

2. Configura Nginx (`/etc/nginx/sites-available/soma-tutor`):

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/soma-tutor;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché para assets estáticos
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compresión gzip
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

3. Sube los archivos:
```bash
scp -r frontend/dist/* usuario@servidor:/var/www/soma-tutor/
```

4. Activa el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/soma-tutor /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Opción 5: Docker

**Para:** Despliegue en contenedores

Crea `frontend/Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Crea `frontend/nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

Construye y ejecuta:

```bash
cd frontend
docker build -t soma-tutor-frontend .
docker run -d -p 8080:80 soma-tutor-frontend
```

---

## 🔧 Configuraciones Adicionales

### Variables de Entorno

Si necesitas configurar la URL del backend, crea `frontend/.env.production`:

```env
VITE_API_URL=https://tu-backend.com/api
```

Y úsala en tu código:

```typescript
const API_URL = import.meta.env.VITE_API_URL || '/api'
```

### Optimizaciones de Build

Para reducir el tamaño del bundle, modifica `frontend/vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,  // Desactivar sourcemaps en producción
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Eliminar console.log
      },
    },
  },
})
```

---

## 📊 Métricas de Build

Build típico de esta aplicación:
- **Tamaño total:** ~800 KB (comprimido con gzip)
- **Tiempo de build:** 15-30 segundos
- **Chunks principales:**
  - `react-vendor.js`: ~150 KB
  - `mui-vendor.js`: ~400 KB
  - `index.js`: ~250 KB

---

## 🔍 Troubleshooting

### Problema: Página en blanco después del deploy

**Solución:** Verifica que el `base` en `vite.config.ts` coincida con la ruta de tu sitio.

```typescript
// Para dominio raíz
base: '/'

// Para subdirectorio
base: '/soma-tutor/'
```

### Problema: 404 al refrescar en rutas internas

**Solución:** Configura el rewrite de URLs según tu servidor (ver secciones de Apache/Nginx arriba).

### Problema: Assets no cargan

**Solución:** Verifica las rutas en el navegador (F12 → Network) y ajusta el `base` en `vite.config.ts`.

---

## 🎯 Recomendaciones por Caso de Uso

| Caso de Uso | Servicio Recomendado |
|-------------|---------------------|
| **Ya tengo hosting con cPanel** | cPanel (usar scripts prepare-cpanel) |
| **Demo rápida sin servidor** | Netlify Drop (drag & drop) |
| **Proyecto personal** | Netlify o Vercel |
| **Empresa pequeña** | Netlify/Vercel con dominio propio |
| **Hosting compartido existente** | cPanel o FTP tradicional |
| **Servidor propio VPS** | Nginx + Docker |
| **Alta disponibilidad** | Vercel Edge Network |
| **Control total** | VPS con Nginx + Docker |

---

## 📝 Checklist Pre-Deploy

- [ ] Ejecutar `npm run build` sin errores
- [ ] Probar el build localmente con `npm run preview`
- [ ] Verificar que todas las rutas funcionan
- [ ] Configurar variables de entorno si es necesario
- [ ] Configurar rewrite de URLs para SPA
- [ ] Configurar SSL/HTTPS en el servidor
- [ ] Configurar dominio personalizado (opcional)
- [ ] Activar compresión gzip/brotli
- [ ] Configurar caché para assets estáticos

---

## 🚀 Deploy Rápido

### cPanel (5 minutos)

Si tienes hosting con cPanel:

```bash
# Windows
cd frontend
.\prepare-cpanel.ps1

# Linux/Mac
cd frontend
./prepare-cpanel.sh
```

Luego sube el ZIP a cPanel File Manager → public_html/

### Netlify (2 minutos)

La forma más rápida sin servidor:

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Build
cd frontend
npm run build

# 3. Deploy
netlify deploy --prod --dir=dist
```

¡Listo! Tu aplicación estará en línea.

---

## 📚 Recursos Adicionales

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deployment)

---

**Nota:** Esta es una aplicación frontend con datos mock. Si deseas conectar un backend real, deberás configurar las variables de entorno y ajustar los servicios en `frontend/src/services/`.

