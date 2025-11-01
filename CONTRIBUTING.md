# Guía de Contribución

¡Gracias por tu interés en contribuir a SOMA Tutor!

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/soma-tutor.git
cd soma-tutor
```

### 2. Crear una Rama

```bash
git checkout -b feature/mi-nueva-funcionalidad
# o
git checkout -b fix/correccion-de-bug
```

### 3. Hacer Cambios

- Sigue las convenciones de código existentes
- Escribe tests para nuevas funcionalidades
- Actualiza la documentación si es necesario

### 4. Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: agregar notificaciones por email"
git commit -m "fix: corregir validación de RUT"
git commit -m "docs: actualizar README"
```

**Tipos de commit**:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Formato, sin cambios de código
- `refactor`: Refactorización
- `test`: Agregar o actualizar tests
- `chore`: Tareas de mantenimiento

### 5. Push y Pull Request

```bash
git push origin feature/mi-nueva-funcionalidad
```

Luego crea un Pull Request en GitHub.

## 📋 Checklist del PR

- [ ] El código sigue las convenciones del proyecto
- [ ] Los tests pasan (`make test`)
- [ ] El linter no muestra errores (`npm run lint`)
- [ ] La documentación está actualizada
- [ ] El commit sigue Conventional Commits

## 🧪 Ejecutar Tests

### Backend
```bash
cd backend
composer test
```

### Frontend
```bash
cd frontend
npm run test
```

## 📝 Estándares de Código

### Frontend (TypeScript/React)
- Usar TypeScript estricto
- Componentes funcionales con hooks
- Nombres en PascalCase para componentes
- Nombres en camelCase para funciones y variables

### Backend (PHP)
- PSR-12 para estilo de código
- DocBlocks en funciones públicas
- Nombres en PascalCase para clases
- Nombres en camelCase para métodos

## 🐛 Reportar Bugs

Usa [GitHub Issues](https://github.com/tu-usuario/soma-tutor/issues) con:

1. Descripción clara del problema
2. Pasos para reproducir
3. Comportamiento esperado vs actual
4. Screenshots si aplica
5. Entorno (OS, navegador, versión)

## 💡 Solicitar Funcionalidades

Abre un Issue con:

1. Descripción de la funcionalidad
2. Caso de uso
3. Beneficio esperado
4. Mockups/wireframes si aplica

## ❓ Preguntas

Si tienes preguntas, abre un [Discussion](https://github.com/tu-usuario/soma-tutor/discussions).

---

¡Gracias por contribuir! 🙌



