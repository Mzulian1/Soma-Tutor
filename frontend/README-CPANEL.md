# 🚀 Guía Rápida - Deployment en cPanel

## 🎯 Proceso Simplificado (5 minutos)

### Paso 1: Preparar Archivos (En tu computadora)

**Windows (PowerShell):**
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

**Manual:**
```bash
cd frontend
npm run build
cp .htaccess dist/.htaccess
cd dist
zip -r ../soma-tutor.zip *
```

Esto generará un archivo: `soma-tutor-cpanel-[fecha].zip`

---

### Paso 2: Subir a cPanel

1. **Acceder a cPanel:**
   - Ve a: `https://tudominio.com/cpanel`
   - Ingresa usuario y contraseña

2. **Abrir File Manager:**
   - Sección "Files" → Click "File Manager"

3. **Ir a public_html:**
   - Click en carpeta `public_html/` (panel izquierdo)

4. **Subir archivo ZIP:**
   - Click botón "Upload" (arriba)
   - Selecciona tu archivo `soma-tutor-cpanel-[fecha].zip`
   - Espera a que termine

5. **Extraer archivos:**
   - Vuelve al File Manager
   - Click derecho en el archivo ZIP
   - Selecciona "Extract"
   - Click "Extract Files"
   - Elimina el ZIP después

6. **Verificar .htaccess:**
   - Click en "Settings" (arriba derecha)
   - Marca "Show Hidden Files (dotfiles)"
   - Verifica que `.htaccess` esté presente

---

### Paso 3: Probar

Abre tu navegador y ve a: `https://tudominio.com`

**Pruebas:**
- ✅ Página de login carga
- ✅ Puedes iniciar sesión
- ✅ Navegación funciona
- ✅ Al refrescar (F5) no da error 404

---

## 📂 Estructura en cPanel

Después de subir, deberías tener:

```
public_html/
├── index.html          ✅ Página principal
├── .htaccess           ✅ Configuración Apache (IMPORTANTE)
├── assets/             ✅ Carpeta con JS/CSS
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── vite.svg            ✅ Favicon
```

---

## 🔧 Problemas Comunes

### ❌ Error 404 al refrescar

**Causa:** Falta archivo `.htaccess`

**Solución:**
1. En File Manager → Settings → "Show Hidden Files"
2. Si no existe `.htaccess`, créalo con este contenido:

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

---

### ❌ Página en blanco

**Causa:** Archivos mal ubicados

**Solución:**
1. Verifica que `index.html` esté en `public_html/` (no en una subcarpeta)
2. Verifica que `assets/` esté junto a `index.html`
3. Abre consola del navegador (F12) para ver errores

---

### ❌ CSS/JS no cargan

**Causa:** Ruta base incorrecta

**Solución:**
- Si subes a un **subdirectorio** (`public_html/app/`):
  1. Edita `frontend/vite.config.ts`
  2. Agrega: `base: '/app/',`
  3. Regenera el build

---

## 🌐 Opciones de Ubicación

### Opción 1: Dominio Principal
**Ubicación:** `public_html/`
**URL:** `https://tudominio.com`

### Opción 2: Subdirectorio
**Ubicación:** `public_html/app/`
**URL:** `https://tudominio.com/app/`
⚠️ Requiere configurar `base` en `vite.config.ts`

### Opción 3: Subdominio
1. En cPanel → "Subdomains"
2. Crear subdominio: `app.tudominio.com`
3. Document Root: `/public_html/app`
4. Subir archivos a esa carpeta
**URL:** `https://app.tudominio.com`

---

## 🔒 Configurar HTTPS (Recomendado)

1. **En cPanel → "SSL/TLS Status"**
2. Click en "Run AutoSSL" para tu dominio
3. Espera unos minutos
4. Tu sitio estará en `https://tudominio.com`

**Forzar HTTPS:**

Edita `.htaccess` y agrega AL INICIO:

```apache
# Forzar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 🔄 Actualizar el Sitio

Cuando hagas cambios:

1. **En tu computadora:**
```bash
cd frontend
.\prepare-cpanel.ps1  # o .sh en Linux/Mac
```

2. **En cPanel:**
   - Elimina archivos antiguos de `public_html/`
   - Sube y extrae el nuevo ZIP

💡 **Tip:** Solo elimina `index.html` y `assets/`, mantén `.htaccess`

---

## 📋 Checklist

- [ ] Build generado con script o `npm run build`
- [ ] Archivo `.htaccess` incluido en el ZIP
- [ ] ZIP subido a cPanel
- [ ] Archivos extraídos en `public_html/`
- [ ] `.htaccess` visible (hidden files activado)
- [ ] Sitio accesible en el navegador
- [ ] Login funciona
- [ ] Rutas funcionan al refrescar (F5)
- [ ] SSL/HTTPS activado

---

## 🆘 Necesitas Ayuda?

Ver documentación completa: [`docs/DEPLOYMENT-CPANEL.md`](../docs/DEPLOYMENT-CPANEL.md)

---

## 🔑 Credenciales Demo

- **RUT:** `11.111.111-1` o `22.222.222-2`
- **Contraseña:** `Demo123*`

---

¡Listo! Tu aplicación debería estar funcionando en cPanel. 🎉

