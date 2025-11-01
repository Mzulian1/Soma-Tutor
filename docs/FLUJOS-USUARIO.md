# Flujos de Usuario - SOMA Tutor

Este documento describe paso a paso los flujos principales que un usuario (tutor/apoderado) puede realizar en la aplicación.

---

## 🔐 Flujo 1: Iniciar Sesión

### Objetivo
Autenticar al tutor para acceder a la información de sus residentes.

### Pasos

1. **Usuario accede a la aplicación**
   - URL: `http://localhost` (o dominio configurado)
   - Es redirigido automáticamente a `/login` si no está autenticado

2. **Pantalla de Login**
   - **Campo RUT**: Ingresa su RUT con o sin formato
     - Ejemplo: `11111111-1` o `11.111.111-1`
     - El sistema formatea automáticamente mientras escribe
   - **Campo Contraseña**: Ingresa su contraseña
     - Puede mostrar/ocultar con el ícono de ojo
   - **Botón Ingresar**: Click para autenticar

3. **Validación Frontend**
   ```
   ✓ RUT tiene formato válido (dígito verificador correcto)
   ✓ Contraseña tiene mínimo 6 caracteres
   ✗ Si falla → Muestra error en pantalla
   ```

4. **Envío al Backend**
   ```
   POST /api/v1/auth/login
   Body: { rut: "111111111", password: "Demo123*" }
   ```

5. **Validación Backend**
   ```
   ✓ RUT existe en la base de datos
   ✓ Contraseña coincide (bcrypt)
   ✓ No ha excedido rate limit (5 intentos/5min)
   ✗ Si falla → HTTP 401 con mensaje de error
   ```

6. **Respuesta Exitosa**
   ```json
   {
     "success": true,
     "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGc...",
     "tutor": {
       "id": 1,
       "rut": "11.111.111-1",
       "nombre": "María José González Pérez",
       "email": "maria.gonzalez@example.cl"
     }
   }
   ```

7. **Almacenamiento Local**
   - Token guardado en Zustand store (persiste en localStorage)
   - Información del tutor guardada en memoria

8. **Redirección**
   - Usuario es redirigido a `/` (Dashboard)

### Casos de Error

| Error | Causa | Mensaje |
|-------|-------|---------|
| RUT inválido | Formato incorrecto o DV erróneo | "RUT inválido" |
| Credenciales incorrectas | RUT o contraseña erróneos | "Credenciales inválidas" |
| Rate limit | Demasiados intentos | "Demasiados intentos. Intente en 5 minutos" |
| Error de servidor | Problema en backend/BD | "Error al iniciar sesión" |

---

## 🏠 Flujo 2: Visualizar Dashboard

### Objetivo
Ver información general de todos los residentes a cargo del tutor.

### Pasos

1. **Carga Inicial**
   - Al ingresar a `/`, el sistema verifica autenticación
   - Si no hay token → Redirige a `/login`
   - Si hay token → Carga dashboard

2. **Petición de Datos**
   ```
   GET /api/v1/tutores/me
   Headers: { Authorization: "Bearer {token}" }
   ```

3. **Respuesta del Servidor**
   ```json
   {
     "success": true,
     "data": {
       "tutor": { ... },
       "residentes": [
         {
           "id": 1,
           "rut": "5.555.555-5",
           "nombre": "Rosa Elena Contreras Morales",
           "foto_url": "https://...",
           "fecha_nacimiento": "1940-03-15",
           "sexo": "F",
           "estado_general": "Estable",
           "alergias": "Penicilina, Polen"
         },
         // ... más residentes
       ]
     }
   }
   ```

4. **Carga de Eventos Recientes** (paralelo)
   - Para cada residente:
     ```
     GET /api/v1/residentes/{id}/eventos?page=1&per_page=3
     ```

5. **Renderización**
   
   **Encabezado:**
   - "Bienvenido/a, {nombre del tutor}"
   - Subtítulo con rol

   **Por cada residente:**
   
   a) **Tarjeta Principal**
   - Foto o avatar con inicial
   - Nombre completo
   - RUT
   - Edad calculada
   - Estado general (chip con color)
   - Alergias (si tiene, en rojo)

   b) **Eventos Recientes**
   - Últimos 3 eventos
   - Fecha/hora - Tipo - Descripción
   - Botón "Ver todos los eventos"

   c) **Accesos Rápidos** (4 tarjetas)
   - Ficha Clínica → `/ficha/{id}`
   - Actividades → `/actividades/{id}`
   - Test Clínicos → `/test/{id}`
   - Documentos → `/documentos/{id}`

### Interacciones del Usuario

1. **Click en tarjeta de residente** → Va a Ficha Clínica
2. **Click en "Ficha Clínica"** → Va a `/ficha/{id}`
3. **Click en "Ver todos los eventos"** → Va a `/eventos/{id}`
4. **Menú superior derecho**:
   - Toggle modo claro/oscuro
   - Menú de cuenta
   - Cerrar sesión

---

## 📋 Flujo 3: Ver Ficha Clínica

### Objetivo
Consultar información médica detallada de un residente.

### Pasos

1. **Navegación**
   - Desde Dashboard, click en residente o "Ver Ficha"
   - URL: `/ficha/1` (ID del residente)

2. **Carga Paralela de Datos**
   ```javascript
   Promise.all([
     residenteService.getById(1),
     residenteService.getAntecedentes(1),
     residenteService.getMedicamentos(1),
     residenteService.getVacunas(1)
   ])
   ```

3. **Renderización**

   **Encabezado del Residente:**
   - Botón "Volver al Dashboard"
   - Foto/Avatar grande
   - Nombre completo
   - RUT
   - Edad
   - Fecha de nacimiento
   - Estado general
   - Alergias (destacadas)

   **Tabs:**

   ### Tab 1: Antecedentes
   Tabla con:
   - Tipo (médico, quirúrgico, familiar, alérgico)
   - Descripción
   - Fecha

   Ejemplo:
   | Tipo | Descripción | Fecha |
   |------|-------------|-------|
   | Médico | Hipertensión arterial diagnosticada en 2005 | 12/04/2005 |
   | Quirúrgico | Cirugía de cataratas ojo derecho | 14/02/2018 |

   ### Tab 2: Medicamentos
   Tabla con:
   - Medicamento (nombre comercial)
   - Vía de administración
   - Dosis
   - Frecuencia
   - Indicaciones especiales

   Ejemplo:
   | Medicamento | Vía | Dosis | Frecuencia | Indicaciones |
   |-------------|-----|-------|------------|--------------|
   | Enalapril 10mg | Oral | 10mg | Cada 12 horas | Tomar con las comidas |

   ### Tab 3: Vacunas
   Tabla con:
   - Nombre de la vacuna
   - Fecha de aplicación
   - Lote
   - Profesional que aplicó

   Ejemplo:
   | Vacuna | Fecha | Lote | Profesional |
   |--------|-------|------|-------------|
   | Influenza 2024 | 15/03/2024 | FLU2024-A45 | Enf. Patricia Rojas |

4. **Interacciones**
   - Cambiar entre tabs (sin recargar datos)
   - Volver al dashboard
   - Si no hay datos → Mensaje "No hay {tipo} registrados"

---

## 📝 Flujo 4: Ver Actividades

### Objetivo
Revisar el historial de actividades y cuidados diarios del residente.

### Pasos

1. **Navegación**
   - URL: `/actividades/1`

2. **Carga de Datos (Paginado)**
   ```
   GET /api/v1/residentes/1/actividades?page=1&per_page=20
   ```

3. **Renderización**
   
   Cada actividad se muestra como una tarjeta:
   
   ```
   ┌─────────────────────────────────────────────┐
   │ [Chip: Signos Vitales]  25/10/2024 14:30   │
   │                                             │
   │ PA: 130/80, FC: 72, T: 36.5°C, SatO2: 96% │
   └─────────────────────────────────────────────┘
   ```

   **Colores de chips por tipo:**
   - Signos Vitales → Azul (info)
   - Administración Medicamento → Verde (success)
   - Cuidado Personal → Morado (primary)
   - Alimentación → Naranja (warning)
   - Movilización → Gris (default)

4. **Paginación**
   - 20 actividades por página
   - Controles de paginación al final
   - Indica página actual de total

5. **Orden**
   - Más recientes primero
   - Ordenado por fecha_hora DESC

---

## 🧪 Flujo 5: Ver Tests Clínicos

### Objetivo
Consultar resultados de evaluaciones funcionales y cognitivas.

### Pasos

1. **Navegación**
   - URL: `/test/1`

2. **Carga de Datos**
   ```
   GET /api/v1/residentes/1/test
   ```

3. **Renderización**

   **Vista de Tarjetas (Grid):**
   
   Cada test como tarjeta individual:
   
   ```
   ┌─────────────────────────────────────┐
   │ Índice de Barthel                   │
   │                                     │
   │ [Chip: Dependencia leve] Puntaje: 65│
   │                                     │
   │ Fecha: 01/10/2024                   │
   │ Profesional: TO. Andrea Muñoz       │
   └─────────────────────────────────────┘
   ```

   **Colores de grado:**
   - Leve/Bajo → Verde
   - Moderado/Medio → Naranja
   - Severo/Alto → Rojo
   - Sin clasificar → Gris

   **Tabla Histórica:**
   - Todos los tests en tabla
   - Test | Fecha | Puntaje | Grado | Profesional

4. **Tipos de Tests:**
   - **Índice de Katz**: Dependencia en actividades básicas
   - **Índice de Barthel**: Capacidad funcional
   - **Test de Pfeiffer**: Función cognitiva
   - **Riesgo de Caídas**: Evaluación de riesgo

---

## 🚨 Flujo 6: Ver Eventos Clínicos

### Objetivo
Revisar eventos importantes en la salud del residente.

### Pasos

1. **Navegación**
   - URL: `/eventos/1`

2. **Carga de Datos (Paginado)**
   ```
   GET /api/v1/residentes/1/eventos?page=1&per_page=20
   ```

3. **Renderización**

   Cada evento como tarjeta:
   
   **Evento Normal:**
   ```
   ┌─────────────────────────────────────────────┐
   │ [Control Médico]        20/10/2024 10:00   │
   │                                             │
   │ Control médico rutinario realizado por      │
   │ Dr. Hernández. Presión arterial estable.   │
   └─────────────────────────────────────────────┘
   ```

   **Evento Crítico:**
   ```
   ┌─────────────────────────────────────────────┐█
   │ [Caída] [⚠ Crítico]     05/10/2024 18:30   │█
   │                                             │█
   │ Caída en habitación sin consecuencias      │█
   │ graves. Evaluado por enfermería.           │█
   └─────────────────────────────────────────────┘█
   ```
   (Borde rojo izquierdo para eventos críticos)

4. **Filtrado por Tipo** (futuro)
   - Caídas
   - Cambios de medicamento
   - Hospitalizaciones
   - Controles médicos

---

## 📄 Flujo 7: Descargar Documentos

### Objetivo
Acceder y descargar documentos oficiales (contratos, liquidaciones).

### Pasos

1. **Navegación**
   - URL: `/documentos/1`

2. **Carga de Datos**
   ```
   GET /api/v1/residentes/1/documentos
   ```

3. **Renderización**
   
   Grid de tarjetas por documento:
   
   ```
   ┌─────────────────────────────────┐
   │ 📄                              │
   │ [Contrato]                      │
   │                                 │
   │ Contrato de Residencia 2024    │
   │ Fecha: 01/01/2024               │
   │                                 │
   │ [⬇ Descargar]                  │
   └─────────────────────────────────┘
   ```

   **Chips de Tipo:**
   - Contrato → Azul
   - Liquidación → Verde
   - Autorización → Naranja

4. **Proceso de Descarga**

   a) Usuario click en "Descargar"
   
   b) Frontend hace request:
   ```
   GET /api/v1/documentos/5/download
   Headers: { Authorization: "Bearer {token}" }
   Response: application/pdf (binary)
   ```
   
   c) Backend:
   - Verifica autorización (tutor tiene acceso al residente)
   - Lee archivo desde filesystem
   - Retorna contenido con headers apropiados
   
   d) Frontend:
   ```javascript
   // Crear blob y descargar
   const blob = new Blob([data], { type: 'application/pdf' })
   const url = window.URL.createObjectURL(blob)
   const link = document.createElement('a')
   link.href = url
   link.download = 'Contrato_Residencia_2024.pdf'
   link.click()
   ```
   
   e) Archivo se descarga al dispositivo del usuario

---

## 🌓 Flujo 8: Cambiar Tema (Claro/Oscuro)

### Objetivo
Personalizar la apariencia de la interfaz.

### Pasos

1. **Interacción**
   - Click en ícono de sol/luna en la barra superior

2. **Cambio de Estado**
   ```typescript
   // Zustand store
   toggleMode() → mode: 'light' → 'dark' (o viceversa)
   ```

3. **Persistencia**
   - El estado se guarda automáticamente en localStorage
   - Nombre: `soma-theme-storage`

4. **Re-render**
   - Material UI theme se actualiza
   - Toda la aplicación cambia de tema instantáneamente

5. **Próxima Sesión**
   - Al volver a abrir la app, se carga el tema guardado

---

## 🚪 Flujo 9: Cerrar Sesión

### Objetivo
Terminar la sesión de forma segura.

### Pasos

1. **Interacción**
   - Click en avatar (esquina superior derecha)
   - Click en "Cerrar Sesión"

2. **Limpieza de Estado**
   ```typescript
   authStore.logout()
   // Limpia:
   // - tutor: null
   // - accessToken: null
   // - isAuthenticated: false
   ```

3. **Persistencia**
   - El logout se refleja en localStorage
   - Token JWT eliminado

4. **Redirección**
   - Usuario redirigido a `/login`

5. **Seguridad**
   - Cualquier intento de acceder a rutas protegidas redirige a login
   - El token anterior queda inválido (backend lo rechazará si se reutiliza después de expirar)

---

## 🔄 Flujo 10: Manejo de Errores

### Errores Comunes y Respuestas

#### 1. Token Expirado

**Síntoma:** Al hacer una petición después de 30 min de inactividad

**Flujo:**
```
Request → Backend → JWT expirado → HTTP 401
↓
Interceptor de Axios detecta 401
↓
Limpia store de autenticación
↓
Redirige a /login
↓
Usuario debe volver a autenticarse
```

**Mensaje:** "Su sesión ha expirado. Por favor, inicie sesión nuevamente."

#### 2. Sin Conexión a Internet

**Síntoma:** Request falla por network error

**Flujo:**
```
Request → Error de red
↓
Catch en el componente
↓
Muestra mensaje de error
```

**Mensaje:** "Error de conexión. Verifique su internet."

#### 3. Error del Servidor (500)

**Síntoma:** Backend tiene un error interno

**Flujo:**
```
Request → Backend error → HTTP 500
↓
Catch en el componente
↓
Log del error
↓
Muestra mensaje genérico
```

**Mensaje:** "Ocurrió un error. Por favor, intente más tarde."

#### 4. Recurso No Encontrado (404)

**Síntoma:** Intenta acceder a un residente inexistente

**Flujo:**
```
GET /residentes/999 → HTTP 404
↓
Muestra mensaje
↓
Opción de volver al dashboard
```

**Mensaje:** "Residente no encontrado"

#### 5. Sin Autorización (403)

**Síntoma:** Intenta acceder a un residente de otro tutor

**Flujo:**
```
GET /residentes/5 → Verificación → No tiene acceso → HTTP 403
↓
Muestra error
↓
Registra en logs del backend
```

**Mensaje:** "No tiene acceso a este residente"

---

## 📱 Consideraciones Responsive

### Móvil (< 600px)
- Tarjetas en columna única
- Menú hamburguesa (futuro)
- Tablas con scroll horizontal
- Botones en stack vertical

### Tablet (600-900px)
- Grid de 2 columnas
- Tablas normales
- Botones en fila

### Desktop (> 900px)
- Grid de hasta 4 columnas
- Tablas completas
- Sidebar (futuro)

---

Esta documentación cubre todos los flujos principales que un tutor puede realizar en SOMA Tutor.



