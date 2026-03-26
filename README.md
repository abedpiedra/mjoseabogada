# Asesoría Legal - María José Solorza Salas

Plataforma web profesional para servicios de asesoría legal.

## Tecnologías

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14 (App Router) |
| Frontend | React 18 + TypeScript |
| Backend | Next.js API Routes |
| Base de datos | PostgreSQL (Neon) |
| ORM | Prisma |
| Validación | Zod |
| Deploy | Vercel |

## Estructura del Proyecto

```
Abogados/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── globals.css           # Estilos globales
│   └── api/                  # API Routes
│       ├── contact/          # Formulario contacto
│       ├── config/           # Configuración pública
│       └── health/           # Health check
│
├── components/
│   ├── layout/               # Header, Footer
│   ├── sections/             # Hero, Services, About, etc.
│   └── common/               # WhatsAppButton
│
├── lib/                      # Utilidades
│   ├── prisma.ts             # Cliente Prisma
│   ├── config.ts             # Configuración
│   ├── storage.ts            # Almacenamiento
│   └── validation.ts         # Schemas Zod
│
├── prisma/
│   └── schema.prisma         # Schema PostgreSQL
│
└── types/                    # TypeScript interfaces
```

## Requisitos

- Node.js 18+
- npm 9+
- Cuenta en [Neon](https://neon.tech) (base de datos gratuita)
- Cuenta en [Vercel](https://vercel.com) (deploy gratuito)

## Instalación Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus datos de Neon

# 3. Sincronizar base de datos
npx prisma db push

# 4. Ejecutar
npm run dev
```

Acceder a: http://localhost:3000

## Variables de Entorno

```env
# Base de datos (Neon PostgreSQL)
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
DIRECT_URL="postgresql://user:pass@host/db?sslmode=require"

# Contacto
CONTACT_PHONE=+56912345678
CONTACT_EMAIL=contacto@ejemplo.cl
```

## Deploy en Vercel

### 1. Crear base de datos en Neon

1. Ir a [neon.tech](https://neon.tech)
2. Crear proyecto
3. Copiar `DATABASE_URL` y `DIRECT_URL`

### 2. Deploy en Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Importar repositorio de GitHub
3. Configurar variables de entorno:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `CONTACT_PHONE`
   - `CONTACT_EMAIL`
4. Deploy

### 3. Migrar base de datos

```bash
npx prisma db push
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor desarrollo (puerto 3000) |
| `npm run build` | Build producción |
| `npm run start` | Iniciar producción |
| `npx prisma studio` | GUI base de datos |
| `npx prisma db push` | Sincronizar schema |

## Funcionalidades

### Actuales
- Landing page responsive
- Formulario de contacto con validación
- Botón WhatsApp flotante
- Almacenamiento en PostgreSQL
- API REST con validación Zod

### Futuras
- Panel administrativo
- Autenticación admin
- CRM básico
- Sistema de citas
- Portal de clientes

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/contact` | Enviar formulario |
| GET | `/api/config` | Configuración pública |
| GET | `/api/health` | Estado del servidor |

## Base de Datos

### Tablas

```
contact_submissions  # Formularios de contacto
services             # Servicios ofrecidos
```

## Personalización

### Datos de contacto
- `components/sections/Contact.tsx`
- Variables de entorno

### Colores y estilos
- `styles/variables.css`
- `app/globals.css`

### Servicios
- `components/sections/Services.tsx`

## Documentación

- `README.md` - Este archivo
- `SETUP.md` - Guía detallada de instalación
- `CLAUDE.md` - Instrucciones para desarrollo con IA
