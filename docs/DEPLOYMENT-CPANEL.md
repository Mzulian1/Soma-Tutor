# 🚀 Deployment en cPanel - Portal SOMA Tutor

Guía paso a paso para desplegar el frontend de SOMA Tutor en un servidor con cPanel.

---

## 📋 Requisitos Previos

- ✅ Acceso a cPanel de tu servidor
- ✅ Node.js instalado en tu computadora local (para hacer el build)
- ✅ Cliente FTP (FileZilla, WinSCP) o usar el File Manager de cPanel
- ✅ Dominio o subdominio configurado (opcional)

---

## 🎯 Paso 1: Generar el Build de Producción

En tu computadora local:

```bash
# Navegar a la carpeta frontend
cd frontend

# Instalar dependencias (si aún no lo has hecho)
npm install

# Generar el build optimizado
npm run build
```

Esto creará una carpeta `frontend/dist/` con todos los archivos listos para producción.

**Contenido de la carpeta dist/:**
```
dist/
├── index.html          # Página principal
├── assets/            # CSS, JS, imágenes optimizadas
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [otros archivos]
└── vite.svg           # Favicon
```

---

## 🎯 Paso 2: Preparar el archivo .htaccess

El archivo `.htaccess` ya está incluido en `frontend/.htaccess`. Este archivo es **CRUCIAL** para que las rutas de React Router funcionen correctamente en Apache.

**Verifica que el archivo .htaccess contenga:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compresión
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Caché para assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

**Copia este archivo a la carpeta dist/:**

```bash
# Windows (PowerShell)
copy .htaccess dist\.htaccess

# Linux/Mac
cp .htaccess dist/.htaccess
```

---

## 🎯 Paso 3: Subir Archivos a cPanel

### Opción A: File Manager de cPanel (Más Fácil)

1. **Acceder a cPanel:**
   - Ve a `https://tudominio.com/cpanel` o `https://tudominio.com:2083`
   - Ingresa tus credenciales

2. **Abrir File Manager:**
   - En la sección "Files" → Click en "File Manager"
   - Se abrirá el administrador de archivos

3. **Navegar a la carpeta correcta:**
   
   **Para dominio principal:**
   - Navega a `public_html/`
   
   **Para subdominio:**
   - Navega a `public_html/subdominio/` (o la carpeta que hayas configurado)
   
   **Para subdirectorio:**
   - Navega a `public_html/soma-tutor/` (crea la carpeta si no existe)

4. **Limpiar carpeta (si hay archivos previos):**
   - Selecciona todos los archivos existentes
   - Click en "Delete"
   - Confirma la eliminación

5. **Subir archivos:**
   - Click en el botón "Upload" en la barra superior
   - **Opción 1 - Subir carpeta completa:**
     - Comprime la carpeta `dist/` en un archivo ZIP en tu computadora:
       ```bash
       # Windows (PowerShell)
       Compress-Archive -Path dist\* -DestinationPath soma-tutor.zip
       
       # Linux/Mac
       cd dist && zip -r ../soma-tutor.zip * && cd ..
       ```
     - Sube el archivo `soma-tutor.zip`
     - Después de subir, vuelve al File Manager
     - Click derecho en `soma-tutor.zip` → "Extract"
     - Elimina el archivo ZIP después de extraer
   
   - **Opción 2 - Subir archivos directamente:**
     - Click en "Select File"
     - Selecciona TODOS los archivos dentro de `dist/` (incluyendo la carpeta `assets/`)
     - Los archivos se subirán automáticamente

6. **Verificar estructura:**
   ```
   public_html/              (o tu carpeta destino)
   ├── index.html
   ├── .htaccess             ⚠️ IMPORTANTE
   ├── assets/
   │   └── [archivos JS y CSS]
   └── vite.svg
   ```

7. **Verificar .htaccess:**
   - ⚠️ **MUY IMPORTANTE:** Asegúrate de que el archivo `.htaccess` esté presente
   - Los archivos que empiezan con punto (.) a veces están ocultos
   - En File Manager → Settings (arriba a la derecha) → Marca "Show Hidden Files (dotfiles)"
   - Verifica que `.htaccess` esté en la carpeta raíz junto a `index.html`

---

### Opción B: FTP/SFTP (Más Rápido para muchos archivos)

1. **Obtener credenciales FTP:**
   - En cPanel → "FTP Accounts"
   - Usa tu cuenta principal o crea una nueva
   - Anota: Host, Usuario, Contraseña, Puerto (21)

2. **Configurar cliente FTP (FileZilla ejemplo):**
   - **Host:** `ftp.tudominio.com` o la IP de tu servidor
   - **Usuario:** tu usuario de cPanel o usuario FTP
   - **Contraseña:** tu contraseña
   - **Puerto:** 21 (FTP) o 22 (SFTP si está disponible)

3. **Conectar y subir:**
   - Panel derecho → Navega a `public_html/` (o tu carpeta destino)
   - Panel izquierdo → Navega a `frontend/dist/`
   - Selecciona TODOS los archivos y carpetas dentro de `dist/`
   - Arrastra al panel derecho
   - Espera a que termine la transferencia

4. **Verificar .htaccess:**
   - En FileZilla → Server → "Force showing hidden files"
   - Asegúrate de que `.htaccess` se haya subido

---

## 🎯 Paso 4: Configurar Permisos (Si es necesario)

Si tienes problemas de acceso:

1. **En File Manager:**
   - Selecciona el archivo o carpeta
   - Click derecho → "Change Permissions"
   - Archivos: `644` (rw-r--r--)
   - Carpetas: `755` (rwxr-xr-x)

2. **Permisos recomendados:**
   ```
   index.html    → 644
   .htaccess     → 644
   assets/       → 755 (carpeta)
   archivos .js  → 644
   archivos .css → 644
   imágenes      → 644
   ```

---

## 🎯 Paso 5: Configurar el Dominio (Si usas subdirectorio)

Si subiste los archivos a un subdirectorio (ej: `public_html/soma-tutor/`):

### Opción 1: Modificar vite.config.ts ANTES del build

Edita `frontend/vite.config.ts`:

```typescript
export default defineConfig({
    base: '/soma-tutor/',  // ⬅️ Agrega esta línea con tu subdirectorio
    plugins: [react()],
    // ... resto de la configuración
})
```

Luego regenera el build:

```bash
npm run build
```

Y vuelve a subir los archivos.

### Opción 2: Usar Addon Domain o Subdomain en cPanel

**Para un subdominio limpio:**

1. En cPanel → "Subdomains"
2. Click en "Create Subdomain"
3. **Subdomain:** `app` (quedará como `app.tudominio.com`)
4. **Document Root:** `/public_html/soma-tutor`
5. Click "Create"

Ahora puedes acceder en: `https://app.tudominio.com`

---

## 🎯 Paso 6: Configurar HTTPS/SSL (Recomendado)

1. **Activar SSL gratuito:**
   - En cPanel → "SSL/TLS Status"
   - O "Let's Encrypt SSL" (si está disponible)
   - Selecciona tu dominio
   - Click en "Run AutoSSL"

2. **Forzar HTTPS:**
   
   Edita el archivo `.htaccess` y agrega AL INICIO:

   ```apache
   # Forzar HTTPS
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   
   # Resto del archivo .htaccess...
   ```

3. **Verificar:**
   - Accede a `http://tudominio.com`
   - Debería redirigir automáticamente a `https://tudominio.com`

---

## ✅ Paso 7: Verificar el Deployment

1. **Abrir tu sitio:**
   - Dominio principal: `https://tudominio.com`
   - Subdirectorio: `https://tudominio.com/soma-tutor/`
   - Subdominio: `https://app.tudominio.com`

2. **Pruebas básicas:**
   - ✅ La página de login carga correctamente
   - ✅ Puedes hacer login con las credenciales demo
   - ✅ Al navegar entre páginas, las rutas funcionan
   - ✅ Al refrescar la página (F5) en cualquier ruta, no da error 404
   - ✅ Los assets (CSS, JS, imágenes) cargan correctamente

3. **Abrir consola del navegador (F12):**
   - Pestaña "Console" → No debería haber errores rojos
   - Pestaña "Network" → Todos los recursos con status 200

---

## 🔧 Troubleshooting

### Problema: Página en blanco

**Causa:** Ruta base incorrecta o archivos mal ubicados

**Solución:**
1. Verifica que `index.html` esté en la raíz de `public_html/`
2. Abre la consola del navegador (F12) y revisa errores
3. Si usas subdirectorio, configura `base` en `vite.config.ts`
4. Verifica que la carpeta `assets/` esté junto a `index.html`

---

### Problema: Error 404 al refrescar la página

**Causa:** Archivo `.htaccess` faltante o mal configurado

**Solución:**
1. Verifica que `.htaccess` esté en la misma carpeta que `index.html`
2. En File Manager → Settings → Activa "Show Hidden Files"
3. Si no existe, créalo con el contenido del Paso 2
4. Verifica que el módulo `mod_rewrite` esté habilitado en Apache

---

### Problema: Assets no cargan (CSS/JS faltantes)

**Causa:** Ruta base incorrecta

**Solución:**
1. Abre la consola del navegador (F12) → Pestaña "Network"
2. Verifica las URLs de los archivos que fallan
3. Si las rutas son incorrectas:
   - Edita `vite.config.ts` y ajusta `base`
   - Regenera el build: `npm run build`
   - Vuelve a subir los archivos

**Ejemplo:**
- ❌ Mal: `https://tudominio.com/assets/index.js` (pero archivos están en `/soma-tutor/`)
- ✅ Bien: `https://tudominio.com/soma-tutor/assets/index.js`

---

### Problema: Permisos denegados

**Causa:** Permisos de archivos incorrectos

**Solución:**
1. En File Manager, selecciona todos los archivos
2. Click derecho → "Change Permissions"
3. Archivos: `644`
4. Carpetas: `755`
5. Marca "Recurse into subdirectories" para aplicar a todo

---

### Problema: Error 500 Internal Server Error

**Causa:** Error en `.htaccess`

**Solución:**
1. Renombra `.htaccess` temporalmente a `.htaccess.bak`
2. Si el sitio funciona, el problema está en `.htaccess`
3. Revisa la sintaxis del archivo
4. Verifica que `mod_rewrite` esté habilitado
5. Contacta a tu proveedor de hosting si persiste

---

### Problema: El sitio funciona pero las rutas internas no

**Causa:** `.htaccess` no está funcionando

**Solución:**
1. Verifica que el archivo `.htaccess` existe
2. Contacta a tu proveedor y pregunta si `mod_rewrite` está habilitado
3. Algunas configuraciones de cPanel requieren ajustes adicionales
4. Como alternativa temporal, usa hash router (ver abajo)

**Alternativa - Usar Hash Router:**

Si no puedes hacer funcionar `.htaccess`, modifica `frontend/src/App.tsx`:

```typescript
// Reemplazar BrowserRouter por HashRouter
import { HashRouter as Router } from 'react-router-dom'

// Esto hará que las URLs sean: tudominio.com/#/dashboard
// No es ideal pero funciona sin configuración de servidor
```

---

## 📊 Checklist de Deployment

- [ ] Build generado con `npm run build`
- [ ] Archivo `.htaccess` copiado a `dist/`
- [ ] Todos los archivos de `dist/` subidos a cPanel
- [ ] Estructura de carpetas correcta verificada
- [ ] Archivo `.htaccess` visible (hidden files activado)
- [ ] Permisos configurados correctamente
- [ ] SSL/HTTPS configurado (recomendado)
- [ ] Sitio accesible desde el navegador
- [ ] Login funciona correctamente
- [ ] Navegación entre páginas funciona
- [ ] Refresh (F5) en rutas internas no da 404
- [ ] Assets (CSS/JS/imágenes) cargan correctamente
- [ ] Consola del navegador sin errores

---

## 🎯 Resumen Rápido

```bash
# En tu computadora
cd frontend
npm run build
cp .htaccess dist/.htaccess

# Subir a cPanel:
# 1. Comprimir dist/ en ZIP
# 2. Subir a cPanel File Manager
# 3. Extraer en public_html/
# 4. Verificar .htaccess
# 5. Probar en el navegador
```

---

## 💡 Tips Adicionales

### Actualizar el sitio

Cuando hagas cambios:

```bash
cd frontend
npm run build
cp .htaccess dist/.htaccess
```

Luego vuelve a subir solo los archivos modificados, o todo el contenido de `dist/`.

### Optimización

Para un sitio más rápido:
- Activa compresión gzip (incluido en `.htaccess`)
- Activa caché de navegador (incluido en `.htaccess`)
- Considera usar CloudFlare como CDN (gratis)

### Subdominios vs Subdirectorios

**Subdirectorio** (`tudominio.com/app/`):
- ✅ Más fácil de configurar
- ❌ Requiere ajustar `base` en vite.config.ts

**Subdominio** (`app.tudominio.com`):
- ✅ URLs más limpias
- ✅ No requiere ajustar `base`
- ❌ Requiere configurar en cPanel

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la sección Troubleshooting
2. Verifica los logs de error de cPanel (Error Log en File Manager)
3. Contacta al soporte de tu proveedor de hosting
4. Revisa que tu plan de hosting soporte aplicaciones React/SPA

---

## 📚 Recursos

- [Documentación completa de Deployment](./DEPLOYMENT.md)
- [Guía rápida de Deployment](../frontend/DEPLOYMENT-QUICK.md)
- [Datos sintéticos para editar](../frontend/src/services/mockData.ts)

---

**¡Listo!** Tu aplicación SOMA Tutor debería estar funcionando en tu servidor cPanel. 🎉

