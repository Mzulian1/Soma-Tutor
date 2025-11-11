# 🚀 Deployment Rápido - SOMA Tutor

## Opción 1: cPanel (5 minutos) 🖥️

¿Tienes un servidor con cPanel?

### Preparar archivos

**Windows:**
```powershell
.\prepare-cpanel.ps1
```

**Linux/Mac:**
```bash
chmod +x prepare-cpanel.sh
./prepare-cpanel.sh
```

### Subir a cPanel

1. Ve a `https://tudominio.com/cpanel`
2. File Manager → public_html/
3. Upload → Sube el archivo ZIP generado
4. Click derecho en ZIP → Extract
5. Elimina el ZIP
6. Settings → Show Hidden Files → Verifica `.htaccess`

📚 [**Guía completa cPanel**](../docs/DEPLOYMENT-CPANEL.md) | [Guía rápida](./README-CPANEL.md)

---

## Opción 2: Netlify (2 minutos) ⚡

### Método Drag & Drop
1. `npm run build`
2. Abre [app.netlify.com/drop](https://app.netlify.com/drop)
3. Arrastra la carpeta `dist/` al navegador
4. ¡Listo! 🎉

### Método CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## Opción 2: Vercel (2 minutos) ▲

```bash
npm install -g vercel
npm run build
vercel --prod
```

---

## Opción 3: Scripts Automatizados 🤖

### Windows (PowerShell)
```powershell
.\deploy.ps1 netlify
# o
.\deploy.ps1 vercel
# o
.\deploy.ps1 docker
# o
.\deploy.ps1 build
```

### Linux/Mac (Bash)
```bash
chmod +x deploy.sh
./deploy.sh netlify
# o
./deploy.sh vercel
# o
./deploy.sh docker
# o
./deploy.sh build
```

---

## Opción 4: Docker 🐳

```bash
docker build -t soma-tutor-frontend .
docker run -d -p 8080:80 --name soma-tutor soma-tutor-frontend
```

Abre: http://localhost:8080

---

## Opción 5: Servidor Tradicional 🖥️

### Preparar archivos
```bash
npm run build
```

### Subir por FTP/SFTP
- Sube el contenido de `dist/` a tu servidor
- Copia `.htaccess` a la raíz (para Apache)
- Asegúrate de que el servidor redirija todas las rutas a `index.html`

---

## Verificar Build Localmente

```bash
npm run build
npm run preview
```

Abre: http://localhost:4173

---

## 📋 Checklist

- [ ] `npm install` ejecutado
- [ ] `npm run build` sin errores
- [ ] `npm run preview` funciona correctamente
- [ ] Todas las rutas funcionan al navegar
- [ ] Las imágenes cargan correctamente

---

## 🆘 Problemas Comunes

### Página en blanco
- Verifica la ruta base en `vite.config.ts`
- Debe ser `/` para dominio raíz
- Debe ser `/carpeta/` para subdirectorio

### 404 al refrescar
- Asegúrate de que el servidor redirija a `index.html`
- Netlify: archivo `_redirects` en `public/`
- Apache: archivo `.htaccess` incluido
- Nginx: configuración `try_files` correcta

### Assets no cargan
- Verifica la ruta base en `vite.config.ts`
- Inspecciona la consola del navegador (F12)

---

## 📚 Documentación Completa

Ver [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md) para:
- Configuración detallada de cada servicio
- Variables de entorno
- Optimizaciones
- Configuraciones avanzadas
- Troubleshooting completo

---

## 🎯 Recomendación

Para una demo rápida: **Netlify Drag & Drop** ⚡

Es la forma más rápida de tener tu aplicación en línea sin configuración.

