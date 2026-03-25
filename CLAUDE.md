# CLAUDE.md

Instrucciones para Claude AI al trabajar con este proyecto.

## Descripción del Proyecto

Plataforma web de asesoría legal para **María José Solorza Salas**:

| Componente | Tecnología |
|------------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| Base de datos | MySQL 8.0 (fallback JSON) |
| Mensajería | WhatsApp Web API (whatsapp-web.js) |
| Contenedores | Docker + Docker Compose |

## Visión del Proyecto

```
FASE 1 (Actual): Landing + WhatsApp
├── Landing page
├── Formulario contacto
├── Botón WhatsApp
└── Storage MySQL/JSON

FASE 2 (En desarrollo): Panel Admin
├── Autenticación
├── Dashboard
├── Gestión de consultas (CRM)
└── WhatsApp desde panel

FASE 3 (Futuro): Automatización
├── Bot WhatsApp inteligente
├── Sistema de citas
├── Recordatorios automáticos
└── Seguimiento de leads

FASE 4 (Futuro): Portal Clientes
├── Login clientes
├── Estado de casos
├── Documentos
├── Pagos online
└── Chat directo
```

## Estructura del Proyecto

```
Abogados/
├── frontend/                  # React App
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Reutilizables (Button, Modal, etc)
│   │   │   ├── layout/        # Header, Footer, Layout, Sidebar
│   │   │   └── sections/      # Hero, Services, About, Contact
│   │   ├── pages/             # Home, Admin (futuro)
│   │   ├── services/          # api.ts (llamadas HTTP)
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Helpers
│   │   ├── types/             # TypeScript interfaces
│   │   └── styles/
│   │       ├── variables.css  # Variables globales
│   │       ├── global.css     # Reset y base
│   │       ├── components/    # CSS por componente
│   │       └── pages/         # CSS por página
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend/                   # API Node.js
│   ├── src/
│   │   ├── config/            # Configuración (.env)
│   │   ├── controllers/       # Lógica de endpoints
│   │   ├── middleware/        # Auth, validation, etc
│   │   ├── routes/            # Definición de rutas
│   │   ├── services/          # database.ts, whatsapp.ts, storage.ts
│   │   └── types/             # TypeScript interfaces
│   ├── Dockerfile
│   └── package.json
│
├── database/
│   └── init/                  # Scripts SQL iniciales
│
├── docker-compose.yml         # Producción
├── docker-compose.dev.yml     # Desarrollo (MySQL + phpMyAdmin)
├── package.json               # Comandos raíz
├── README.md
├── SETUP.md
└── CLAUDE.md
```

## Comandos Principales

```bash
# Desarrollo
npm run dev              # Frontend + Backend
npm run dev:frontend     # Solo frontend (3000)
npm run dev:backend      # Solo backend (5000)

# Docker
docker-compose -f docker-compose.dev.yml up -d   # MySQL dev
docker-compose up -d --build                      # Producción

# Build
npm run build            # Build todo
npm run install:all      # Instalar dependencias
```

## Convenciones de Código

### TypeScript
```typescript
// Usar tipos estrictos
import type { ContactFormData } from '../types'

// Interfaces en types/index.ts
export interface ContactFormData {
  nombre: string
  email: string
  telefono?: string  // Opcional con ?
}

// Funciones con tipos explícitos
function handleSubmit(data: ContactFormData): Promise<void> {
  // ...
}
```

### React/TSX
```tsx
// Componentes funcionales tipados
function Button({ children, onClick }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{children}</button>
}

// Props con interface
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

// Hooks tipados
const [data, setData] = useState<ContactFormData | null>(null)
```

### CSS
```css
/* Variables en variables.css */
:root {
  --color-primary: #1a365d;
  --spacing-md: 1rem;
}

/* BEM naming */
.component {}
.component__element {}
.component__element--modifier {}

/* Un archivo por componente */
/* styles/components/button.css */
```

### Archivos
- Componentes: `PascalCase.tsx` → `Header.tsx`
- Servicios: `camelCase.ts` → `api.ts`
- Estilos: `kebab-case.css` → `whatsapp-button.css`
- Types: `index.ts` en carpeta types

## Patrones de Desarrollo

### Agregar Nueva Página

1. Crear componente:
```tsx
// frontend/src/pages/Admin.tsx
import '../styles/pages/admin.css'

function Admin(): JSX.Element {
  return <div className="admin">...</div>
}

export default Admin
```

2. Crear estilos:
```css
/* frontend/src/styles/pages/admin.css */
.admin { ... }
```

3. Agregar ruta:
```tsx
// frontend/src/App.tsx
import Admin from './pages/Admin'

<Route path="/admin" element={<Admin />} />
```

### Agregar Nuevo Endpoint

1. Crear controller:
```typescript
// backend/src/controllers/admin.ts
export async function getSubmissions(req: Request, res: Response) {
  // ...
}
```

2. Crear ruta:
```typescript
// backend/src/routes/admin.ts
router.get('/submissions', getSubmissions)
```

3. Registrar en index:
```typescript
// backend/src/index.ts
import adminRoutes from './routes/admin.js'
app.use('/api/admin', adminRoutes)
```

4. Agregar al frontend:
```typescript
// frontend/src/services/api.ts
export async function getSubmissions() {
  const res = await fetch('/api/admin/submissions')
  return res.json()
}
```

### Agregar Nuevo Componente

1. Crear en carpeta apropiada:
```
components/
├── common/     → Reutilizables (Button, Modal, Input)
├── layout/     → Estructura (Header, Sidebar)
└── sections/   → Secciones página (Hero, Services)
```

2. Crear CSS correspondiente en `styles/components/`

3. Exportar e importar donde se necesite

## Variables de Entorno

### Backend (.env)
```env
# Servidor
PORT=5000
HOST=0.0.0.0
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=asesoria_legal
DB_USER=asesoria
DB_PASSWORD=asesoria123

# WhatsApp
WHATSAPP_SESSION_PATH=./whatsapp-session
AUTO_REPLY_ENABLED=true
AUTO_REPLY_MESSAGE=Gracias por contactarnos.

# Contacto
CONTACT_PHONE=+56912345678
CONTACT_EMAIL=contacto@ejemplo.cl

# Admin (futuro)
ADMIN_EMAIL=admin@ejemplo.cl
ADMIN_PASSWORD=hash_seguro
JWT_SECRET=secreto_jwt
```

## Base de Datos

### Tablas Actuales
```sql
contact_submissions  -- Formularios recibidos
whatsapp_messages    -- Log de mensajes
services             -- Servicios ofrecidos
```

### Tablas Futuras (Panel Admin)
```sql
users                -- Usuarios admin
clients              -- Clientes
appointments         -- Citas
documents            -- Documentos
```

## Próximos Pasos (Panel Admin)

### 1. Autenticación
- [ ] Tabla `users` en MySQL
- [ ] Endpoint `POST /api/auth/login`
- [ ] JWT tokens
- [ ] Middleware `authRequired`
- [ ] Página `/admin/login`

### 2. Dashboard
- [ ] Endpoint `GET /api/admin/stats`
- [ ] Página `/admin/dashboard`
- [ ] Componentes: StatsCard, RecentList

### 3. Gestión Consultas
- [ ] Endpoint `GET /api/admin/submissions`
- [ ] Endpoint `PATCH /api/admin/submissions/:id`
- [ ] Página `/admin/consultas`
- [ ] Filtros por estado
- [ ] Cambio de estado

### 4. WhatsApp desde Panel
- [ ] Enviar mensaje desde detalle
- [ ] Ver historial de conversación
- [ ] Templates de respuesta

## Notas para Claude

### Hacer
- Mantener TypeScript estricto
- Seguir estructura de carpetas
- CSS modular (no inline excepto estados)
- Componentes pequeños y enfocados
- Validación con express-validator
- Respuestas API: `{ success, message, data?, errors? }`
- Usar variables CSS existentes
- Documentar cambios importantes

### No hacer
- No usar `any` en TypeScript
- No mezclar lógica de negocio en componentes
- No estilos inline permanentes
- No hardcodear valores (usar .env)
- No commits sin probar
- No ignorar errores de TypeScript

### Formato de respuestas API
```typescript
// Éxito
{
  success: true,
  message: 'Operación exitosa',
  data: { ... }
}

// Error
{
  success: false,
  message: 'Error descripción',
  errors: [{ path: 'campo', msg: 'detalle' }]
}
```
