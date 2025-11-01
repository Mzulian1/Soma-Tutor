# Solución de Problemas - SOMA Tutor

Guía para resolver problemas comunes durante el desarrollo y despliegue.

---

## 🐛 Problemas Comunes

### Backend (CodeIgniter 4)

#### Error: "Class 'App\Controllers\Api\V1\AuthController' not found"

**Causa:** Autoload de Composer no está actualizado

**Solución:**
```bash
cd backend
composer dump-autoload
```

---

#### Error: "Database connection failed"

**Causa:** Archivo de base de datos SQLite no existe o sin permisos

**Solución:**
```bash
# Verificar que writable/ existe y tiene permisos
chmod -R 755 backend/writable
mkdir -p backend/writable

# Ejecutar migraciones
cd backend
php spark migrate
```

---

#### Error: "JWT Secret not configured"

**Causa:** Variable de entorno JWT_SECRET no está definida

**Solución:**
```bash
# Verificar .env existe
cp backend/env backend/.env

# Editar y configurar JWT_SECRET
nano backend/.env

# JWT_SECRET debe tener mínimo 32 caracteres
JWT_SECRET=mi_secreto_super_seguro_de_32_caracteres_minimo
```

---

#### Error: "CORS policy blocked"

**Causa:** Origen no está en la lista de permitidos

**Solución:**
```bash
# En backend/.env, agregar origen del frontend
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost

# Reiniciar servidor
php spark serve
```

---

#### Seeder falla al ejecutar

**Problema:** `php spark db:seed DemoSeeder` da error

**Solución:**
```bash
# 1. Verificar que las tablas existen
php spark migrate:status

# 2. Si no existen, ejecutar migraciones
php spark migrate

# 3. Si da error, hacer fresh (CUIDADO: borra datos)
php spark migrate:refresh

# 4. Ejecutar seeder
php spark db:seed DemoSeeder
```

---

### Frontend (React + Vite)

#### Error: "Cannot find module '@/services/api'"

**Causa:** Alias de TypeScript no configurado

**Solución:**
```bash
# Verificar tsconfig.json tiene:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# Verificar vite.config.ts tiene:
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}

# Reiniciar dev server
npm run dev
```

---

#### Error: "Network Error" al hacer login

**Causa:** Backend no está corriendo o URL incorrecta

**Solución:**
```bash
# 1. Verificar que backend está corriendo
cd backend
php spark serve
# Debe mostrar: CodeIgniter development server started on http://localhost:8080

# 2. Verificar frontend/.env
VITE_API_URL=http://localhost:8080/api/v1

# 3. Verificar en navegador
curl http://localhost:8080/api/v1/auth/login
```

---

#### Error: "Token expirado" inmediatamente después de login

**Causa:** Reloj del sistema desincronizado

**Solución:**
```bash
# Linux/Mac
sudo ntpdate -s time.nist.gov

# Windows
w32tm /resync

# O aumentar JWT_EXPIRE en backend/.env
JWT_EXPIRE=3600  # 1 hora en lugar de 30 minutos
```

---

#### Componentes MUI no se renderizan correctamente

**Causa:** Faltan dependencias de MUI

**Solución:**
```bash
cd frontend
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

---

### Docker

#### Error: "Port 80 already in use"

**Causa:** Nginx u otro servicio usando puerto 80

**Solución:**
```bash
# Ver qué está usando el puerto
sudo lsof -i :80

# Opción 1: Detener servicio
sudo systemctl stop nginx

# Opción 2: Cambiar puerto en docker-compose.yml
services:
  nginx:
    ports:
      - "8080:80"  # Usar puerto 8080 en lugar de 80
```

---

#### Error: "permission denied" al ejecutar Docker

**Causa:** Usuario no tiene permisos de Docker

**Solución:**
```bash
# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Logout y login para aplicar cambios
# O ejecutar:
newgrp docker

# Verificar
docker ps
```

---

#### Contenedor backend se reinicia constantemente

**Causa:** Error en PHP o base de datos

**Solución:**
```bash
# Ver logs del contenedor
docker-compose logs backend

# Ver logs en tiempo real
docker-compose logs -f backend

# Acceder al contenedor
docker-compose exec backend sh

# Verificar errores de PHP
cat /var/www/backend/writable/logs/log-*.log
```

---

#### Frontend no se actualiza después de rebuild

**Causa:** Caché del navegador

**Solución:**
```bash
# 1. Hard refresh en navegador
# Chrome/Firefox: Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)

# 2. Limpiar caché de Docker
docker-compose down
docker-compose build --no-cache frontend
docker-compose up -d

# 3. Verificar que dist/ se actualizó
ls -la frontend/dist/
```

---

## 🔍 Debugging Avanzado

### Activar Debug en Backend

```php
// backend/.env
CI_ENVIRONMENT = development

// Verás errores detallados en lugar de mensajes genéricos
```

### Ver SQL Queries

```php
// En cualquier controller
$db = \Config\Database::connect();
$db->enableQueryLog();

// ... tu código ...

// Ver queries ejecutadas
$queries = $db->getQueryLog();
log_message('debug', print_r($queries, true));
```

### React DevTools

```bash
# Instalar extensión
# Chrome: https://chrome.google.com/webstore/detail/react-developer-tools/...
# Firefox: https://addons.mozilla.org/firefox/addon/react-devtools/

# Usar:
# 1. Abrir DevTools (F12)
# 2. Tab "Components" - Ver árbol de componentes, props, state
# 3. Tab "Profiler" - Medir rendimiento
```

### Network Inspector

```bash
# En DevTools del navegador
# 1. Tab "Network"
# 2. Filtrar por "XHR" o "Fetch"
# 3. Click en request → Ver Headers, Payload, Response
# 4. Buscar errores en Status Code
```

---

## 📊 Performance Issues

### Frontend Lento

**Problema:** Aplicación se siente lenta

**Diagnóstico:**
```bash
# Lighthouse en Chrome
# 1. Abrir DevTools
# 2. Tab "Lighthouse"
# 3. Generate Report
# Ver métricas: FCP, LCP, TTI
```

**Soluciones:**

1. **Code splitting**
```typescript
// Usar lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

2. **Memoización**
```typescript
const MemoizedList = React.memo(List)
```

3. **Virtualización para listas largas**
```bash
npm install react-window
```

---

### Backend Lento

**Problema:** API responde lento

**Diagnóstico:**
```bash
# Medir tiempo de respuesta
time curl http://localhost:8080/api/v1/residentes/1/eventos
```

**Soluciones:**

1. **Agregar índices**
```sql
CREATE INDEX idx_fecha ON eventos_clinicos(residente_id, fecha_hora DESC);
```

2. **Optimizar queries**
```php
// Usar select específico en lugar de *
$builder->select('id, nombre, fecha')
        ->where('residente_id', $id)
        ->get();
```

3. **Activar caché de queries** (producción)
```php
// En config
$query = $db->query("SELECT ...", [], true); // true = cache
```

---

## 🔒 Problemas de Seguridad

### JWT no valida correctamente

**Problema:** Token válido es rechazado

**Solución:**
```bash
# 1. Verificar que JWT_SECRET es el mismo en .env y al generar token

# 2. Verificar formato del header
# Debe ser: Authorization: Bearer {token}
# NO: Authorization: {token}

# 3. Ver token decodificado en jwt.io
# Copiar token → Pegar en https://jwt.io
# Verificar payload y expiración
```

---

### CORS bloqueado en producción

**Problema:** Funciona en local pero no en servidor

**Solución:**
```bash
# backend/.env
CORS_ALLOWED_ORIGINS=https://tudominio.com,https://www.tudominio.com

# Verificar que nginx no sobrescribe headers
# docker/nginx/conf.d/default.conf
# NO usar add_header para CORS si el backend ya lo maneja
```

---

## 🗄️ Problemas de Base de Datos

### Migración falla

**Error:** "Table already exists"

**Solución:**
```bash
# Ver estado de migraciones
php spark migrate:status

# Rollback última migración
php spark migrate:rollback

# O rollback todo (CUIDADO: borra datos)
php spark migrate:rollback -all

# Ejecutar de nuevo
php spark migrate
```

---

### Datos del seeder no aparecen

**Problema:** Seeder ejecuta sin error pero no hay datos

**Solución:**
```bash
# 1. Verificar en qué BD está insertando
# SQLite: backend/writable/soma_tutor.db
ls -la backend/writable/*.db

# 2. Ver datos directamente
sqlite3 backend/writable/soma_tutor.db
> SELECT COUNT(*) FROM tutores;
> .quit

# 3. Truncar y re-seed
php spark db:seed DemoSeeder
```

---

## 🌐 Problemas de Red

### Cannot connect to backend from frontend

**En desarrollo:**
```bash
# Verificar que ambos servidores están corriendo
# Terminal 1:
cd backend && php spark serve
# Debe mostrar: http://localhost:8080

# Terminal 2:
cd frontend && npm run dev
# Debe mostrar: http://localhost:5173

# Verificar CORS en backend/.env
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**En Docker:**
```bash
# Verificar que contenedores están en la misma red
docker network ls
docker network inspect soma-network

# Ping entre contenedores
docker-compose exec frontend ping backend
```

---

### Timeout en requests

**Problema:** Requests tardan mucho y fallan

**Solución:**
```typescript
// Aumentar timeout en axios
// frontend/src/services/api.ts
export const api = axios.create({
  baseURL: '...',
  timeout: 10000, // 10 segundos
})
```

---

## 🔄 Git Issues

### Conflictos de merge

**Problema:** Git conflicts al hacer pull

**Solución:**
```bash
# Ver archivos en conflicto
git status

# Opción 1: Aceptar cambios remotos
git checkout --theirs archivo.txt
git add archivo.txt

# Opción 2: Mantener cambios locales
git checkout --ours archivo.txt
git add archivo.txt

# Opción 3: Resolver manualmente
nano archivo.txt
# Editar y resolver <<<< ==== >>>>
git add archivo.txt

# Continuar merge
git commit
```

---

### Archivos grandes en Git

**Error:** "File too large"

**Solución:**
```bash
# Usar .gitignore
echo "*.db" >> .gitignore
echo "node_modules/" >> .gitignore

# Remover del historial si ya se subió
git rm --cached archivo-grande.db
git commit -m "Remove large file"
```

---

## 🚀 Deploy Issues

### SSL/HTTPS no funciona

**Problema:** Certificado SSL no se aplica

**Solución:**
```bash
# 1. Verificar certificados existen
ls -la docker/ssl/

# 2. Verificar permisos
chmod 644 docker/ssl/cert.pem
chmod 600 docker/ssl/key.pem

# 3. Descomentar config HTTPS en nginx
# docker/nginx/conf.d/default.conf
# Buscar sección "server { listen 443 ssl ..."

# 4. Reiniciar nginx
docker-compose restart nginx
```

---

### Build falla en CI/CD

**Problema:** GitHub Actions falla

**Solución:**
```yaml
# .github/workflows/ci.yml
# Agregar caché para acelerar
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

# Verificar versiones de Node/PHP coinciden con local
node-version: '18'
php-version: '8.2'
```

---

## 📞 Obtener Ayuda

Si ninguna solución funciona:

1. **Revisar logs completos**
   ```bash
   # Backend
   cat backend/writable/logs/log-*.log
   
   # Docker
   docker-compose logs
   
   # Sistema
   dmesg | tail
   ```

2. **Buscar en Issues de GitHub**
   - Revisar issues cerrados
   - Buscar error específico

3. **Crear nuevo Issue**
   - Incluir logs relevantes
   - Pasos para reproducir
   - Versiones (PHP, Node, Docker)
   - Sistema operativo

4. **Stack Overflow**
   - Tag: codeigniter4, react, docker
   - Incluir código mínimo reproducible

---

## ✅ Checklist de Diagnóstico

Antes de reportar un problema, verificar:

- [ ] Versiones correctas (Node 18+, PHP 8.2+)
- [ ] Dependencias instaladas (`composer install`, `npm install`)
- [ ] Migraciones ejecutadas (`php spark migrate`)
- [ ] Seeders ejecutados (`php spark db:seed DemoSeeder`)
- [ ] Variables de entorno configuradas (`.env`)
- [ ] Puertos disponibles (80, 8080, 5173)
- [ ] Logs revisados (backend y frontend)
- [ ] Cache limpiado (navegador y Docker)
- [ ] Última versión del código (`git pull`)
- [ ] Documentación revisada

---

¡Espero que esta guía te ayude a resolver cualquier problema! 🛠️



