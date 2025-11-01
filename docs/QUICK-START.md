# Quick Start - SOMA Tutor

Guía rápida para poner en marcha SOMA Tutor en 5 minutos.

---

## ⚡ Instalación Rápida (Docker)

### 1. Pre-requisitos

- Docker instalado
- Git instalado
- 2GB de espacio en disco

### 2. Comandos

```bash
# Clonar
git clone https://github.com/tu-usuario/soma-tutor.git
cd soma-tutor

# Configurar entorno
cp env .env
# Editar JWT_SECRET si quieres (opcional para demo)

# Desplegar TODO de una vez
make deploy
```

**Tiempo estimado:** 3-5 minutos

### 3. Acceder

1. Abrir navegador en: **http://localhost**
2. Ingresar credenciales:
   - **RUT:** `11.111.111-1`
   - **Contraseña:** `Demo123*`
3. ¡Listo! 🎉

---

## 🛠️ Instalación Manual (Desarrollo)

### Backend

```bash
cd backend

# Instalar dependencias
composer install

# Configurar
cp env .env

# Base de datos
php spark migrate
php spark db:seed DemoSeeder

# Ejecutar
php spark serve
# → http://localhost:8080
```

### Frontend

```bash
# En otra terminal
cd frontend

# Instalar dependencias
npm install

# Configurar
cp env .env

# Ejecutar
npm run dev
# → http://localhost:5173
```

**Tiempo estimado:** 5-10 minutos

---

## 🎯 Primeros Pasos

### 1. Login

- **URL:** http://localhost (o http://localhost:5173 en dev)
- **RUT:** `11.111.111-1`
- **Contraseña:** `Demo123*`

### 2. Explorar Dashboard

Verás:
- ✅ Lista de residentes
- ✅ Eventos recientes
- ✅ Accesos rápidos

### 3. Ver Ficha Clínica

1. Click en tarjeta del residente
2. Explorar tabs:
   - Antecedentes
   - Medicamentos
   - Vacunas

### 4. Revisar Actividades

1. Click en "Ver Actividades"
2. Ver signos vitales, medicamentos, etc.

### 5. Descargar Documentos

1. Ir a "Documentos"
2. Click en "Descargar"
3. PDF se descarga automáticamente

---

## 🧪 Probar Funcionalidades

### ✅ Checklist

- [ ] Login exitoso
- [ ] Ver dashboard con residentes
- [ ] Abrir ficha clínica
- [ ] Ver medicamentos activos
- [ ] Revisar eventos clínicos
- [ ] Descargar un documento
- [ ] Cambiar tema (claro/oscuro)
- [ ] Cerrar sesión

---

## 🔑 Todas las Credenciales

### Tutor 1 (María José)
- **RUT:** `11.111.111-1`
- **Contraseña:** `Demo123*`
- **Residentes:** 2
  - Rosa Elena Contreras
  - Carmen Gloria Fernández

### Tutor 2 (Carlos)
- **RUT:** `22.222.222-2`
- **Contraseña:** `Demo123*`
- **Residentes:** 1
  - Pedro Antonio Ramírez

---

## 📊 Datos de Demostración

Cada residente tiene:
- ✅ 4 antecedentes médicos
- ✅ 4 medicamentos activos
- ✅ 3 vacunas registradas
- ✅ 4 tests clínicos (Katz, Barthel, Pfeiffer, Riesgo de Caídas)
- ✅ 30 actividades recientes
- ✅ 4 eventos clínicos
- ✅ 4 documentos (contrato, 2 liquidaciones, autorización)

---

## 🐛 Problemas Comunes

### No carga el frontend

**Solución:**
```bash
# Verificar que backend está corriendo
curl http://localhost:8080/api/v1/auth/login

# Si no responde, reiniciar
cd backend && php spark serve
```

### Error "Cannot connect to database"

**Solución:**
```bash
cd backend
php spark migrate
php spark db:seed DemoSeeder
```

### Puerto 80 ocupado

**Solución:**
```bash
# Editar docker-compose.yml
# Cambiar puerto:
ports:
  - "8080:80"  # Usar 8080 en lugar de 80

# Acceder en: http://localhost:8080
```

---

## 📚 Siguiente Paso

Una vez que todo funciona:

1. **Desarrolladores:** Leer [Guía de Desarrollo](./GUIA-DESARROLLO.md)
2. **Arquitectos:** Revisar [Arquitectura](./ARQUITECTURA.md)
3. **Integradores:** Consultar [API Reference](./API-REFERENCE.md)
4. **Todos:** Ver [Flujos de Usuario](./FLUJOS-USUARIO.md)

---

## 🚀 Comandos Útiles

```bash
# Ver logs en tiempo real
make logs

# Acceder al backend
make backend-shell

# Reiniciar todo
make down
make up

# Limpiar y reinstalar
make clean
make deploy
```

---

## 💡 Tips

1. **Para desarrollo:** Usa `npm run dev` (frontend) + `php spark serve` (backend)
2. **Para producción:** Usa `make deploy` con Docker
3. **Para tests:** `npm run test` (frontend) y `vendor/bin/phpunit` (backend)
4. **Para linter:** `npm run lint` (frontend)

---

¡Todo listo para explorar SOMA Tutor! 🎉

Si tienes problemas, consulta [Troubleshooting](./TROUBLESHOOTING.md)



