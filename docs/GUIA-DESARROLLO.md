# Guía de Desarrollo - SOMA Tutor

Guía completa para desarrolladores que quieran contribuir o modificar el proyecto.

---

## 🚀 Configuración del Entorno

### Requisitos Previos

```bash
# Verificar versiones instaladas
node --version    # >= 18.x
php --version     # >= 8.2
composer --version # >= 2.x
docker --version  # >= 24.x (opcional)
```

### Instalación Inicial

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/soma-tutor.git
cd soma-tutor

# Backend
cd backend
composer install
cp env .env
# Editar .env si es necesario
php spark migrate
php spark db:seed DemoSeeder

# Frontend (en otra terminal)
cd frontend
npm install
cp env .env
# Editar .env si es necesario

# Configurar hooks de Git
cd ..
npm install -g husky
cd frontend && npx husky install
```

---

## 🏗 Estructura del Código

### Backend (CodeIgniter 4)

#### Agregar una Nueva Entidad

**Ejemplo: Agregar tabla "Familiares"**

1. **Crear Migración**

```bash
php spark make:migration CreateFamiliaresTable
```

```php
// backend/app/Database/Migrations/YYYY-MM-DD-xxxxxx_CreateFamiliaresTable.php

public function up()
{
    $this->forge->addField([
        'id' => [
            'type' => 'INTEGER',
            'auto_increment' => true,
        ],
        'residente_id' => [
            'type' => 'INTEGER',
            'unsigned' => true,
        ],
        'nombre' => [
            'type' => 'VARCHAR',
            'constraint' => '255',
        ],
        'parentesco' => [
            'type' => 'VARCHAR',
            'constraint' => '100',
        ],
        'telefono' => [
            'type' => 'VARCHAR',
            'constraint' => '20',
        ],
        'created_at' => ['type' => 'DATETIME', 'null' => true],
        'updated_at' => ['type' => 'DATETIME', 'null' => true],
    ]);
    
    $this->forge->addKey('id', true);
    $this->forge->createTable('familiares');
    
    // Índice para mejorar queries
    $this->db->query('CREATE INDEX idx_residente_familiares ON familiares(residente_id)');
}

public function down()
{
    $this->forge->dropTable('familiares');
}
```

2. **Crear Modelo**

```php
// backend/app/Models/FamiliarModel.php

namespace App\Models;

use CodeIgniter\Model;

class FamiliarModel extends Model
{
    protected $table = 'familiares';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $allowedFields = ['residente_id', 'nombre', 'parentesco', 'telefono'];
    protected $useTimestamps = true;

    public function getByResidente(int $residenteId): array
    {
        return $this->where('residente_id', $residenteId)
                    ->orderBy('nombre', 'ASC')
                    ->findAll();
    }
}
```

3. **Agregar Endpoint**

```php
// backend/app/Controllers/Api/V1/FichaController.php

public function familiares($residenteId)
{
    if (!$this->verificarAcceso($residenteId)) {
        return $this->failForbidden('No tiene acceso a este residente');
    }

    $familiarModel = new \App\Models\FamiliarModel();
    $familiares = $familiarModel->getByResidente($residenteId);

    return $this->respond([
        'success' => true,
        'data' => $familiares
    ]);
}
```

4. **Registrar Ruta**

```php
// backend/app/Config/Routes.php

$routes->get('residentes/(:num)/familiares', 'FichaController::familiares/$1');
```

5. **Agregar Datos al Seeder**

```php
// backend/app/Database/Seeds/DemoSeeder.php

private function createFamiliares(int $residenteId): void
{
    $familiares = [
        [
            'residente_id' => $residenteId,
            'nombre' => 'Juan Pérez',
            'parentesco' => 'Hijo',
            'telefono' => '+56987654321',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ],
    ];

    $this->db->table('familiares')->insertBatch($familiares);
}
```

6. **Ejecutar**

```bash
php spark migrate
php spark db:seed DemoSeeder
```

---

### Frontend (React + TypeScript)

#### Agregar una Nueva Página

**Ejemplo: Página de Familiares**

1. **Crear Servicio API**

```typescript
// frontend/src/services/residenteService.ts

export interface Familiar {
  id: number
  residente_id: number
  nombre: string
  parentesco: string
  telefono: string
}

// En el objeto residenteService, agregar:
async getFamiliares(residenteId: number): Promise<Familiar[]> {
  const { data } = await api.get(`/residentes/${residenteId}/familiares`)
  return data.data
}
```

2. **Crear Componente/Página**

```typescript
// frontend/src/features/familiares/FamiliaresPage.tsx

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Card, CardContent } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { residenteService, Familiar } from '@/services/residenteService'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function FamiliaresPage() {
  const { residenteId } = useParams<{ residenteId: string }>()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [familiares, setFamiliares] = useState<Familiar[]>([])

  useEffect(() => {
    loadData()
  }, [residenteId])

  const loadData = async () => {
    if (!residenteId) return

    try {
      setLoading(true)
      const data = await residenteService.getFamiliares(parseInt(residenteId))
      setFamiliares(data)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}>
        Volver
      </Button>

      <Typography variant="h4" sx={{ mt: 2 }}>
        Familiares
      </Typography>

      {familiares.map((familiar) => (
        <Card key={familiar.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{familiar.nombre}</Typography>
            <Typography variant="body2">
              Parentesco: {familiar.parentesco}
            </Typography>
            <Typography variant="body2">
              Teléfono: {familiar.telefono}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
```

3. **Agregar Ruta**

```typescript
// frontend/src/App.tsx

import FamiliaresPage from './features/familiares/FamiliaresPage'

// En el Route element con PrivateRoute:
<Route path="/familiares/:residenteId" element={<FamiliaresPage />} />
```

4. **Agregar Navegación**

```typescript
// En DashboardPage.tsx, agregar botón:

<Button onClick={() => navigate(`/familiares/${residente.id}`)}>
  Ver Familiares
</Button>
```

---

## 🧪 Testing

### Backend (PHPUnit)

#### Crear Test de Feature

```php
// backend/tests/Feature/FamiliarTest.php

namespace Tests\Feature;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\FeatureTestTrait;

class FamiliarTest extends CIUnitTestCase
{
    use FeatureTestTrait;

    protected $token;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Login para obtener token
        $result = $this->post('/api/v1/auth/login', [
            'rut' => '11.111.111-1',
            'password' => 'Demo123*'
        ]);
        
        $this->token = $result->getJSON()->accessToken;
    }

    public function testObtenerFamiliares()
    {
        $result = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token
        ])->get('/api/v1/residentes/1/familiares');

        $result->assertStatus(200);
        $result->assertJSONFragment(['success' => true]);
    }
}
```

**Ejecutar:**
```bash
cd backend
vendor/bin/phpunit tests/Feature/FamiliarTest.php
```

---

### Frontend (Vitest)

#### Crear Test de Componente

```typescript
// frontend/src/features/familiares/__tests__/FamiliaresPage.test.tsx

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FamiliaresPage from '../FamiliaresPage'

// Mock del servicio
vi.mock('@/services/residenteService', () => ({
  residenteService: {
    getFamiliares: vi.fn().mockResolvedValue([
      {
        id: 1,
        residente_id: 1,
        nombre: 'Juan Pérez',
        parentesco: 'Hijo',
        telefono: '+56987654321'
      }
    ])
  }
}))

describe('FamiliaresPage', () => {
  it('muestra lista de familiares', async () => {
    render(
      <BrowserRouter>
        <FamiliaresPage />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
      expect(screen.getByText(/Hijo/)).toBeInTheDocument()
    })
  })
})
```

**Ejecutar:**
```bash
cd frontend
npm run test
```

---

## 🎨 Estilos y Tema

### Personalizar Tema MUI

```typescript
// frontend/src/app/theme.ts

// Agregar colores personalizados
export const getTheme = (mode: 'light' | 'dark') => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: '#1976d2', // Cambiar color primario
      },
      // Agregar color personalizado
      custom: {
        main: '#FF6B6B',
      }
    },
  }
  
  return createTheme(themeOptions)
}
```

### Usar en Componente

```typescript
<Button sx={{ bgcolor: 'custom.main' }}>
  Botón Personalizado
</Button>
```

---

## 🔒 Seguridad

### Agregar Nuevo Filtro

```php
// backend/app/Filters/AdminFilter.php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AdminFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Verificar si el usuario es admin
        $userRole = $request->userRole; // Del JWT
        
        if ($userRole !== 'admin') {
            $response = service('response');
            $response->setStatusCode(403);
            $response->setJSON(['error' => 'Acceso denegado']);
            return $response;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return $response;
    }
}
```

**Registrar:**
```php
// backend/app/Config/Filters.php

public array $aliases = [
    // ... otros filtros
    'admin' => \App\Filters\AdminFilter::class,
];
```

**Usar:**
```php
// En Routes.php
$routes->group('admin', ['filter' => 'admin'], static function ($routes) {
    $routes->get('users', 'AdminController::users');
});
```

---

## 📊 Base de Datos

### Consultas Optimizadas

```php
// ❌ MAL - N+1 queries
$residentes = $residenteModel->findAll();
foreach ($residentes as $residente) {
    $medicamentos = $medicamentoModel->getByResidente($residente['id']);
}

// ✅ BIEN - Join o IN
$db = \Config\Database::connect();
$builder = $db->table('residentes r');

$residentes = $builder
    ->select('r.*, GROUP_CONCAT(m.nombre) as medicamentos')
    ->join('medicamentos m', 'm.residente_id = r.id', 'left')
    ->groupBy('r.id')
    ->get()
    ->getResultArray();
```

### Índices

```php
// En migración
$this->db->query('CREATE INDEX idx_fecha_hora ON eventos_clinicos(residente_id, fecha_hora DESC)');
```

---

## 🚀 Optimización

### Frontend

#### Code Splitting

```typescript
// Lazy load de páginas pesadas
const FichaPage = lazy(() => import('./features/ficha/FichaPage'))

// En Routes
<Suspense fallback={<LoadingSpinner />}>
  <Route path="/ficha/:id" element={<FichaPage />} />
</Suspense>
```

#### Memoización

```typescript
// Evitar re-renders innecesarios
const MemoizedCard = React.memo(ResidenteCard, (prev, next) => {
  return prev.residente.id === next.residente.id
})
```

#### Debounce en Búsquedas

```typescript
import { debounce } from 'lodash'

const debouncedSearch = debounce((query: string) => {
  // Realizar búsqueda
}, 300)
```

---

## 🐛 Debugging

### Backend

```php
// Usar log
log_message('debug', 'Usuario ID: ' . $userId);
log_message('error', 'Error: ' . $e->getMessage());

// Ver logs
tail -f writable/logs/log-YYYY-MM-DD.log
```

### Frontend

```typescript
// Console con contexto
console.log('[ResidenteCard]', { residente, estado })

// React DevTools
// Instalar extensión de Chrome/Firefox
// Ver props, state, y re-renders
```

---

## 📦 Build y Deploy

### Build Frontend

```bash
cd frontend
npm run build

# Resultado en: frontend/dist/
# Archivos optimizados y minificados
```

### Build Docker

```bash
# Desde raíz del proyecto
docker-compose build

# Solo un servicio
docker-compose build backend
```

### Deploy en Servidor

```bash
# SSH al servidor
ssh user@servidor.com

# Pull últimos cambios
cd soma-tutor
git pull origin main

# Rebuild
make frontend-build
docker-compose up -d --build

# Ver logs
docker-compose logs -f
```

---

## 🔄 Git Workflow

### Crear Feature

```bash
git checkout -b feature/agregar-familiares
# ... hacer cambios ...
git add .
git commit -m "feat: agregar módulo de familiares"
git push origin feature/agregar-familiares
# Crear Pull Request en GitHub
```

### Convenciones de Commits

```
feat: Nueva funcionalidad
fix: Corrección de bug
docs: Documentación
style: Formato (sin cambios de código)
refactor: Refactorización
test: Tests
chore: Tareas de mantenimiento
```

---

## 📚 Recursos Útiles

### Documentación Oficial

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [CodeIgniter 4](https://codeigniter.com/user_guide/)
- [Zustand](https://github.com/pmndrs/zustand)

### Herramientas

- [Postman](https://www.postman.com/) - Testing de API
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [PHP Debug](https://xdebug.org/)

---

¡Listo para desarrollar! 🚀



