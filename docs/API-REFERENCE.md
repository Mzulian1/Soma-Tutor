# API Reference - SOMA Tutor

Documentación completa de todos los endpoints de la API REST.

---

## 🔧 Configuración Base

**Base URL:** `http://localhost:8080/api/v1` (desarrollo)

**Formato de Respuesta:** JSON

**Autenticación:** JWT en header `Authorization: Bearer {token}`

---

## 📍 Endpoints

### 🔐 Autenticación

#### `POST /auth/login`

Autentica un tutor y retorna un token JWT.

**Acceso:** Público (sin JWT)

**Request:**
```json
{
  "rut": "111111111",  // Sin formato, solo números y dígito verificador
  "password": "Demo123*"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "tutor": {
    "id": 1,
    "rut": "11.111.111-1",
    "nombre": "María José González Pérez",
    "email": "maria.gonzalez@example.cl"
  }
}
```

**Response Error (401):**
```json
{
  "error": true,
  "message": "Credenciales inválidas"
}
```

**Rate Limit:** 5 intentos por 5 minutos por IP

---

#### `POST /auth/refresh`

Refresca el token JWT (opcional en v1.0).

**Acceso:** Protegido (JWT)

**Response:**
```json
{
  "success": true,
  "message": "Refresh token no implementado en esta versión demo"
}
```

---

### 👤 Tutores

#### `GET /tutores/me`

Obtiene información del tutor autenticado y sus residentes asociados.

**Acceso:** Protegido (JWT)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "tutor": {
      "id": 1,
      "rut": "11.111.111-1",
      "nombre": "María José González Pérez",
      "email": "maria.gonzalez@example.cl",
      "telefono": "+56912345678",
      "created_at": "2024-01-01 00:00:00",
      "updated_at": "2024-01-01 00:00:00"
    },
    "residentes": [
      {
        "id": 1,
        "rut": "5.555.555-5",
        "nombre": "Rosa Elena Contreras Morales",
        "foto_url": "https://i.pravatar.cc/150?img=47",
        "fecha_nacimiento": "1940-03-15",
        "sexo": "F",
        "estado_general": "Estable",
        "alergias": "Penicilina, Polen"
      }
    ]
  }
}
```

---

### 👥 Residentes

#### `GET /residentes`

Lista todos los residentes del tutor autenticado.

**Acceso:** Protegido (JWT)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "rut": "5.555.555-5",
      "nombre": "Rosa Elena Contreras Morales",
      "foto_url": "https://...",
      "fecha_nacimiento": "1940-03-15",
      "sexo": "F",
      "estado_general": "Estable",
      "alergias": "Penicilina, Polen",
      "created_at": "2024-01-01 00:00:00",
      "updated_at": "2024-01-01 00:00:00"
    }
  ]
}
```

---

#### `GET /residentes/:id`

Obtiene información detallada de un residente específico.

**Acceso:** Protegido (JWT) + Verificación de autorización

**Parámetros:**
- `id` (path, integer): ID del residente

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "rut": "5.555.555-5",
    "nombre": "Rosa Elena Contreras Morales",
    "foto_url": "https://...",
    "fecha_nacimiento": "1940-03-15",
    "sexo": "F",
    "estado_general": "Estable",
    "alergias": "Penicilina, Polen",
    "created_at": "2024-01-01 00:00:00",
    "updated_at": "2024-01-01 00:00:00"
  }
}
```

**Response Error (403):**
```json
{
  "error": true,
  "message": "No tiene acceso a este residente"
}
```

---

### 🏥 Ficha Clínica

#### `GET /residentes/:id/antecedentes`

Obtiene antecedentes médicos del residente.

**Acceso:** Protegido (JWT) + Autorización

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "residente_id": 1,
      "tipo": "medico",
      "descripcion": "Hipertensión arterial diagnosticada en 2005",
      "fecha": "2005-04-12",
      "created_at": "2024-01-01 00:00:00",
      "updated_at": "2024-01-01 00:00:00"
    }
  ]
}
```

**Tipos de antecedentes:**
- `medico`: Enfermedades diagnosticadas
- `quirurgico`: Cirugías previas
- `familiar`: Antecedentes familiares
- `alergico`: Alergias

---

#### `GET /residentes/:id/medicamentos`

Obtiene medicamentos activos del residente.

**Acceso:** Protegido (JWT) + Autorización

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "residente_id": 1,
      "nombre": "Enalapril 10mg",
      "via": "Oral",
      "dosis": "10mg",
      "frecuencia": "Cada 12 horas",
      "indicaciones": "Tomar con las comidas",
      "activo": 1,
      "created_at": "2024-01-01 00:00:00",
      "updated_at": "2024-01-01 00:00:00"
    }
  ]
}
```

---

#### `GET /residentes/:id/vacunas`

Obtiene registro de vacunación del residente.

**Acceso:** Protegido (JWT) + Autorización

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "residente_id": 1,
      "nombre": "Influenza 2024",
      "fecha": "2024-03-15",
      "lote": "FLU2024-A45",
      "profesional": "Enf. Patricia Rojas",
      "created_at": "2024-01-01 00:00:00",
      "updated_at": "2024-01-01 00:00:00"
    }
  ]
}
```

---

#### `GET /residentes/:id/test`

Obtiene tests clínicos del residente.

**Acceso:** Protegido (JWT) + Autorización

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "residente_id": 1,
      "tipo": "katz",
      "fecha": "2024-10-01",
      "puntaje": 4,
      "grado": "Dependencia moderada",
      "profesional": "TO. Andrea Muñoz",
      "opciones_json": "{\"banarse\":1,\"vestirse\":1,...}",
      "created_at": "2024-01-01 00:00:00",
      "updated_at": "2024-01-01 00:00:00"
    }
  ]
}
```

**Tipos de tests:**
- `katz`: Índice de Katz (actividades básicas)
- `barthel`: Índice de Barthel (independencia funcional)
- `pfeiffer`: Test de Pfeiffer (función cognitiva)
- `riesgo_caidas`: Evaluación de riesgo de caídas

---

### 📊 Seguimiento

#### `GET /residentes/:id/actividades`

Obtiene actividades y cuidados del residente (paginado).

**Acceso:** Protegido (JWT) + Autorización

**Query Parameters:**
- `page` (integer, opcional): Número de página (default: 1)
- `per_page` (integer, opcional): Items por página (default: 20, max: 100)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "residente_id": 1,
      "tipo": "signos_vitales",
      "fecha_hora": "2024-10-25 14:30:00",
      "notas": "PA: 130/80, FC: 72, T: 36.5°C, SatO2: 96%",
      "adjunto_url": null,
      "created_at": "2024-10-25 14:30:00",
      "updated_at": "2024-10-25 14:30:00"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

**Tipos de actividades:**
- `signos_vitales`: Toma de signos vitales
- `administracion_medicamento`: Administración de medicamentos
- `cuidado_personal`: Aseo e higiene
- `alimentacion`: Comidas
- `movilizacion`: Ejercicios y traslados

---

#### `GET /residentes/:id/eventos`

Obtiene eventos clínicos del residente (paginado).

**Acceso:** Protegido (JWT) + Autorización

**Query Parameters:**
- `page` (integer, opcional): Número de página (default: 1)
- `per_page` (integer, opcional): Items por página (default: 20, max: 100)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "residente_id": 1,
      "tipo": "control_medico",
      "fecha_hora": "2024-10-20 10:00:00",
      "descripcion": "Control médico rutinario realizado por Dr. Hernández.",
      "adjunto_url": null,
      "critico": 0,
      "created_at": "2024-10-20 10:00:00",
      "updated_at": "2024-10-20 10:00:00"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total": 12,
    "total_pages": 1
  }
}
```

**Tipos de eventos:**
- `control_medico`: Controles médicos rutinarios
- `cambio_medicamento`: Modificaciones en tratamiento
- `caida`: Caídas (usualmente crítico=1)
- `hospitalizacion`: Internaciones
- `evaluacion_nutricional`: Evaluaciones nutricionales

**Campo `critico`:**
- `0`: Evento normal
- `1`: Evento crítico que requiere atención

---

### 📄 Documentos

#### `GET /residentes/:id/documentos`

Lista documentos disponibles del residente.

**Acceso:** Protegido (JWT) + Autorización

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "residente_id": 1,
      "tipo": "contrato",
      "nombre": "Contrato de Residencia 2024.pdf",
      "url": "docs/contrato_1.pdf",
      "fecha": "2024-01-01",
      "created_at": "2024-01-01 00:00:00",
      "updated_at": "2024-01-01 00:00:00"
    }
  ]
}
```

**Tipos de documentos:**
- `contrato`: Contratos de residencia
- `liquidacion`: Liquidaciones mensuales
- `autorizacion`: Autorizaciones firmadas

---

#### `GET /documentos/:id/download`

Descarga un documento específico.

**Acceso:** Protegido (JWT) + Autorización

**Parámetros:**
- `id` (path, integer): ID del documento

**Response (200):**
- **Content-Type:** `application/pdf`
- **Content-Disposition:** `attachment; filename="nombre_archivo.pdf"`
- **Body:** Contenido binario del PDF

**Response Error (404):**
```json
{
  "error": true,
  "message": "Archivo no encontrado"
}
```

---

## 🔒 Autenticación y Autorización

### Headers Requeridos

Todas las rutas protegidas requieren:

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

### Estructura del JWT

**Header:**
```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

**Payload:**
```json
{
  "iss": "soma-tutor-api",
  "iat": 1698249600,
  "exp": 1698251400,
  "tutor_id": 1,
  "rut": "11.111.111-1",
  "nombre": "María José González Pérez"
}
```

**Expiración:** 30 minutos (1800 segundos)

### Verificación de Autorización

Para endpoints de residentes, el backend verifica:

```sql
SELECT COUNT(*) FROM tutor_residente
WHERE tutor_id = {tutor_id_del_jwt}
  AND residente_id = {residente_id_del_endpoint}
```

Si el count es 0 → HTTP 403 Forbidden

---

## 📋 Códigos de Estado HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Operación exitosa |
| 400 | Bad Request | Datos inválidos en request |
| 401 | Unauthorized | Token ausente, inválido o expirado |
| 403 | Forbidden | Token válido pero sin permisos |
| 404 | Not Found | Recurso no existe |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Server Error | Error del servidor |

---

## 🚦 Rate Limiting

### Login

- **Límite:** 5 intentos
- **Ventana:** 5 minutos (300 segundos)
- **Por:** Dirección IP
- **Respuesta al exceder:**

```json
{
  "error": true,
  "message": "Demasiados intentos. Intente nuevamente en 5 minutos."
}
```

### Otros Endpoints

No implementado en v1.0 (considerar para producción).

---

## 🔍 Filtrado y Ordenamiento

### Actividades y Eventos

**Ordenamiento:** Siempre por `fecha_hora DESC` (más recientes primero)

**Paginación:**
```
GET /residentes/1/actividades?page=2&per_page=50
```

**Límites:**
- `per_page` máximo: 100
- Si se excede, se usa 100 automáticamente

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Flujo Completo de Autenticación

```javascript
// 1. Login
const loginResponse = await fetch('http://localhost:8080/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    rut: '111111111',
    password: 'Demo123*'
  })
})

const { accessToken, tutor } = await loginResponse.json()

// 2. Usar token en siguiente request
const residentesResponse = await fetch('http://localhost:8080/api/v1/residentes', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
})

const residentes = await residentesResponse.json()
```

---

### Ejemplo 2: Obtener Ficha Completa

```javascript
const residenteId = 1

// Cargar datos en paralelo
const [residente, antecedentes, medicamentos, vacunas, tests] = await Promise.all([
  fetch(`/api/v1/residentes/${residenteId}`, { headers }),
  fetch(`/api/v1/residentes/${residenteId}/antecedentes`, { headers }),
  fetch(`/api/v1/residentes/${residenteId}/medicamentos`, { headers }),
  fetch(`/api/v1/residentes/${residenteId}/vacunas`, { headers }),
  fetch(`/api/v1/residentes/${residenteId}/test`, { headers })
])

// Procesar respuestas
const fichaCompleta = {
  residente: await residente.json(),
  antecedentes: await antecedentes.json(),
  medicamentos: await medicamentos.json(),
  vacunas: await vacunas.json(),
  tests: await tests.json()
}
```

---

### Ejemplo 3: Descargar Documento

```javascript
const documentoId = 5

const response = await fetch(`/api/v1/documentos/${documentoId}/download`, {
  headers: { 'Authorization': `Bearer ${token}` }
})

const blob = await response.blob()
const url = window.URL.createObjectURL(blob)

// Descargar
const link = document.createElement('a')
link.href = url
link.download = 'documento.pdf'
link.click()

window.URL.revokeObjectURL(url)
```

---

## 🐛 Manejo de Errores

### Formato de Error Estándar

```json
{
  "error": true,
  "message": "Descripción del error en español"
}
```

### Errores de Validación

```json
{
  "error": true,
  "message": "Validation errors",
  "errors": {
    "rut": "El RUT es obligatorio",
    "password": "La contraseña debe tener al menos 6 caracteres"
  }
}
```

---

## 📊 Consideraciones de Rendimiento

### Recomendaciones

1. **Cachear respuestas** que no cambian frecuentemente:
   - Información del residente
   - Antecedentes médicos
   - Medicamentos activos

2. **Usar paginación** para listas grandes:
   - Actividades
   - Eventos

3. **Cargar en paralelo** datos independientes:
   - Ficha clínica (antecedentes + medicamentos + vacunas)

4. **Evitar requests innecesarios**:
   - Guardar datos en store local
   - Solo recargar cuando sea necesario

---

Esta API está diseñada siguiendo principios RESTful y mejores prácticas de seguridad y rendimiento.



