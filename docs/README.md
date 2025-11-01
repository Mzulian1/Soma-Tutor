# Documentación SOMA Tutor

Índice completo de la documentación del proyecto.

---

## 📚 Documentos Disponibles

### 0. [Quick Start](./QUICK-START.md) ⚡
Guía rápida para poner en marcha el proyecto en 5 minutos.

**Contenido:**
- Instalación rápida con Docker
- Instalación manual para desarrollo
- Primeros pasos
- Credenciales de acceso
- Checklist de funcionalidades
- Problemas comunes
- Comandos útiles

**Para:** Todos (empezar aquí)

---

### 1. [Arquitectura](./ARQUITECTURA.md)
Documentación técnica completa de la arquitectura del sistema.

**Contenido:**
- Visión general de la arquitectura
- Capas de la aplicación (Presentación, Lógica, Datos)
- Modelo entidad-relación
- Seguridad (JWT, Autorización)
- Flujos de trabajo principales
- Optimizaciones de rendimiento
- Testing
- Despliegue

**Para:** Arquitectos, desarrolladores senior, DevOps

---

### 2. [Flujos de Usuario](./FLUJOS-USUARIO.md)
Descripción detallada paso a paso de cada flujo desde la perspectiva del usuario.

**Contenido:**
- Flujo de inicio de sesión
- Visualizar dashboard
- Ver ficha clínica
- Ver actividades
- Ver tests clínicos
- Ver eventos clínicos
- Descargar documentos
- Cambiar tema
- Cerrar sesión
- Manejo de errores

**Para:** Product owners, diseñadores UX, QA testers

---

### 3. [API Reference](./API-REFERENCE.md)
Referencia completa de todos los endpoints de la API REST.

**Contenido:**
- Endpoints de autenticación
- Endpoints de tutores
- Endpoints de residentes
- Endpoints de ficha clínica
- Endpoints de seguimiento
- Endpoints de documentos
- Autenticación JWT
- Códigos de estado HTTP
- Rate limiting
- Ejemplos de uso

**Para:** Desarrolladores frontend, integradores, testers de API

---

### 4. [Guía de Desarrollo](./GUIA-DESARROLLO.md)
Guía práctica para desarrolladores que quieran contribuir al proyecto.

**Contenido:**
- Configuración del entorno
- Estructura del código
- Agregar nuevas entidades
- Agregar nuevas páginas
- Testing (backend y frontend)
- Estilos y tema
- Seguridad
- Base de datos
- Optimización
- Debugging
- Build y deploy
- Git workflow

**Para:** Desarrolladores (todos los niveles)

---

### 5. [Solución de Problemas](./TROUBLESHOOTING.md)
Guía para resolver problemas comunes.

**Contenido:**
- Problemas de backend
- Problemas de frontend
- Problemas de Docker
- Debugging avanzado
- Performance issues
- Problemas de seguridad
- Problemas de base de datos
- Problemas de red
- Git issues
- Deploy issues
- Checklist de diagnóstico

**Para:** Desarrolladores, DevOps, soporte técnico

---

## 🗂️ Organización

```
docs/
├── README.md              # Este archivo (índice)
├── ARQUITECTURA.md        # Arquitectura técnica
├── FLUJOS-USUARIO.md      # Flujos de usuario
├── API-REFERENCE.md       # Referencia de API
├── GUIA-DESARROLLO.md     # Guía de desarrollo
└── TROUBLESHOOTING.md     # Solución de problemas
```

---

## 🚀 Inicio Rápido

### Para Usuarios Nuevos
1. Leer [README principal](../README.md)
2. Seguir guía de instalación
3. Revisar [Flujos de Usuario](./FLUJOS-USUARIO.md)

### Para Desarrolladores
1. Leer [README principal](../README.md)
2. Configurar entorno según [Guía de Desarrollo](./GUIA-DESARROLLO.md)
3. Revisar [Arquitectura](./ARQUITECTURA.md)
4. Consultar [API Reference](./API-REFERENCE.md) según necesidad

### Para Arquitectos/DevOps
1. Leer [Arquitectura](./ARQUITECTURA.md)
2. Revisar [API Reference](./API-REFERENCE.md)
3. Consultar sección de despliegue en README principal

---

## 🔄 Mantener la Documentación

### Al Agregar Funcionalidad

1. **Actualizar [API-REFERENCE.md](./API-REFERENCE.md)**
   - Agregar nuevos endpoints
   - Documentar request/response
   - Agregar ejemplos

2. **Actualizar [FLUJOS-USUARIO.md](./FLUJOS-USUARIO.md)**
   - Documentar nuevo flujo si aplica
   - Agregar capturas de pantalla (opcional)

3. **Actualizar [GUIA-DESARROLLO.md](./GUIA-DESARROLLO.md)**
   - Agregar ejemplo de implementación
   - Actualizar estructura si cambia

4. **Actualizar [ARQUITECTURA.md](./ARQUITECTURA.md)**
   - Si hay cambios arquitectónicos significativos
   - Actualizar diagramas

---

## 📝 Convenciones

### Formato
- Markdown estándar
- Headers con emojis para mejor visualización
- Bloques de código con syntax highlighting
- Ejemplos prácticos siempre que sea posible

### Estilo
- Escribir en español
- Usar lenguaje claro y directo
- Incluir ejemplos de código
- Agregar advertencias cuando sea necesario

### Estructura
- Comenzar con visión general
- Dividir en secciones claras
- Incluir tabla de contenidos para docs largos
- Referenciar otros documentos cuando aplique

---

## 🤝 Contribuir a la Documentación

1. **Fork del repositorio**
2. **Crear rama**: `git checkout -b docs/mejora-arquitectura`
3. **Hacer cambios** en docs/
4. **Commit**: `git commit -m "docs: mejorar sección de JWT"`
5. **Push**: `git push origin docs/mejora-arquitectura`
6. **Crear Pull Request**

---

## 📞 Preguntas

Si la documentación no resuelve tu duda:

1. Revisar [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Buscar en [Issues de GitHub](https://github.com/tu-usuario/soma-tutor/issues)
3. Crear nuevo Issue con tag `documentation`

---

## 🔗 Enlaces Externos Útiles

### Tecnologías
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CodeIgniter 4 User Guide](https://codeigniter.com/user_guide/)
- [Material UI Documentation](https://mui.com/)
- [Docker Documentation](https://docs.docker.com/)

### Herramientas
- [Postman](https://www.postman.com/) - Testing de API
- [jwt.io](https://jwt.io/) - Debugger de JWT
- [DB Browser for SQLite](https://sqlitebrowser.org/) - Ver BD SQLite

---

¡Documentación completa y actualizada! 📚

