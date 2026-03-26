# CLAUDE.md

Instrucciones para Claude AI al trabajar con este proyecto.

## Descripción del Proyecto

Plataforma web de asesoría legal para **María José Solorza Salas**:

| Componente | Tecnología |
|------------|------------|
| Framework | Next.js 14+ (App Router) |
| Frontend | React 18 + TypeScript |
| Backend | Next.js API Routes |
| Base de datos | MySQL 8.0 (fallback JSON) |
| ORM | Prisma |
| Validación | Zod |
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
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Header + Footer)
│   ├── page.tsx                  # Home page (/)
│   ├── globals.css               # Estilos globales
│   └── api/                      # API Routes
│       ├── contact/route.ts      # POST /api/contact
│       ├── config/route.ts       # GET /api/config
│       ├── health/route.ts       # GET /api/health
│       └── whatsapp/
│           ├── status/route.ts
│           ├── initialize/route.ts
│           ├── disconnect/route.ts
│           └── send/route.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Client Component
│   │   └── Footer.tsx            # Server Component
│   ├── sections/
│   │   ├── Hero.tsx              # Client Component
│   │   ├── Services.tsx          # Client Component
│   │   ├── About.tsx             # Server Component
│   │   ├── Stats.tsx             # Server Component
│   │   ├── CTA.tsx               # Client Component
│   │   └── Contact.tsx           # Client Component
│   └── common/
│       └── WhatsAppButton.tsx    # Client Component
│
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── config.ts                 # Configuración
│   ├── storage.ts                # Servicio de almacenamiento
│   ├── validation.ts             # Schemas Zod
│   └── whatsapp/
│       ├── client.ts             # WhatsApp client singleton
│       └── service.ts            # Funciones del servicio
│
├── types/
│   └── index.ts                  # TypeScript interfaces
│
├── styles/
│   └── variables.css             # Variables CSS
│
├── prisma/
│   └── schema.prisma             # Schema Prisma
│
├── database/
│   └── init/                     # Scripts SQL iniciales
│
├── public/                       # Assets estáticos
│
├── docker-compose.yml            # Producción (2 contenedores)
├── docker-compose.dev.yml        # Desarrollo (MySQL + phpMyAdmin)
├── Dockerfile                    # Next.js con Chromium
├── next.config.js
├── package.json
├── tsconfig.json
├── .env.local                    # Variables de entorno
└── .env.example                  # Template de variables
```

## Comandos Principales

```bash
# Desarrollo
npm install              # Instalar dependencias
npm run dev              # Next.js dev server (puerto 3000)

# Docker
docker-compose -f docker-compose.dev.yml up -d   # MySQL + phpMyAdmin
docker-compose up -d --build                      # Producción

# Build
npm run build            # Build Next.js
npm run start            # Start producción

# Prisma
npx prisma generate      # Generar cliente
npx prisma migrate dev   # Crear migración
npx prisma studio        # GUI de base de datos
```

## Convenciones de Código

### TypeScript
```typescript
// Usar tipos estrictos con path aliases
import type { ContactFormData } from '@/types'

// Interfaces en types/index.ts
export interface ContactFormData {
  nombre: string
  email: string
  telefono?: string  // Opcional con ?
}

// Validación con Zod
import { z } from 'zod'

export const contactFormSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
})
```

### React/Next.js
```tsx
// Server Components (por defecto, sin 'use client')
export default function About() {
  return <section>...</section>
}

// Client Components (cuando necesitan interactividad)
'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({})
  return <form>...</form>
}
```

### CSS
```css
/* Variables en styles/variables.css */
:root {
  --color-primary: #7A2A3C;
  --spacing-md: 1rem;
}

/* BEM naming en globals.css */
.component {}
.component__element {}
.component__element--modifier {}
```

### Path Aliases (tsconfig.json)
```typescript
import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import type { ContactFormData } from '@/types'
```

## Patrones de Desarrollo

### Agregar Nueva Página

```tsx
// app/admin/page.tsx
export default function AdminPage() {
  return <div>Admin Dashboard</div>
}
```

### Agregar Nuevo Endpoint API

```typescript
// app/api/ejemplo/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  campo: z.string(),
})

export async function GET() {
  return NextResponse.json({ data: 'ejemplo' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.errors },
      { status: 400 }
    )
  }

  return NextResponse.json({ success: true })
}
```

### Agregar Nuevo Componente

```
components/
├── common/     → Reutilizables (Button, Modal, Input)
├── layout/     → Estructura (Header, Sidebar)
└── sections/   → Secciones página (Hero, Services)
```

## Variables de Entorno

### .env.local
```env
# Base de datos
DATABASE_URL="mysql://user:pass@localhost:3306/asesoria_legal"

# Contacto
CONTACT_PHONE=+56912345678
CONTACT_EMAIL=contacto@ejemplo.cl

# WhatsApp
WHATSAPP_SESSION_PATH=./whatsapp-session
AUTO_REPLY_ENABLED=true
AUTO_REPLY_MESSAGE=Gracias por contactarnos.
```

## Base de Datos

### Modelos Prisma
```prisma
model ContactSubmission  # Formularios recibidos
model WhatsAppMessage    # Log de mensajes
model Service            # Servicios ofrecidos
```

### Ejecutar Migraciones
```bash
npx prisma migrate dev --name nombre_migracion
npx prisma generate
```

## Próximos Pasos (Panel Admin)

### 1. Autenticación
- [ ] Modelo `User` en Prisma
- [ ] API Route `POST /api/auth/login`
- [ ] NextAuth.js o JWT
- [ ] Middleware de autenticación
- [ ] Página `/admin/login`

### 2. Dashboard
- [ ] API Route `GET /api/admin/stats`
- [ ] Página `/admin/dashboard`
- [ ] Componentes: StatsCard, RecentList

### 3. Gestión Consultas
- [ ] API Route `GET /api/admin/submissions`
- [ ] API Route `PATCH /api/admin/submissions/[id]`
- [ ] Página `/admin/consultas`
- [ ] Filtros por estado

## Notas para Claude

### Hacer
- Mantener TypeScript estricto
- Seguir estructura de carpetas
- Usar `'use client'` solo cuando necesario
- Validación con Zod en API routes
- Respuestas API: `{ success, message, data?, errors? }`
- Usar variables CSS existentes
- Path aliases (@/components, @/lib, etc.)

### No hacer
- No usar `any` en TypeScript
- No crear Client Components innecesarios
- No hardcodear valores (usar .env)
- No ignorar errores de TypeScript
- No mezclar lógica de negocio en componentes

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
