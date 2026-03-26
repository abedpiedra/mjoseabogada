# SETUP.md - Guía de Instalación

Guía completa para configurar el proyecto de asesoría legal.

## Requisitos

| Requisito | Versión | Obligatorio |
|-----------|---------|-------------|
| Node.js | 18+ | Sí |
| npm | 9+ | Sí |
| Cuenta Neon | - | Sí (para BD) |
| Cuenta Vercel | - | Sí (para deploy) |

### Verificar instalación

```bash
node --version    # v18.x.x o superior
npm --version     # 9.x.x o superior
```

### Instalar Node.js

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS
brew install node

# Windows
# Descargar de https://nodejs.org/
```

---

## Instalación Rápida

```bash
# 1. Navegar al proyecto
cd Abogados

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Editar .env.local con tus datos de Neon

# 5. Sincronizar base de datos
npx prisma db push

# 6. Ejecutar
npm run dev
```

Acceder a: http://localhost:3000

---

## Configurar Base de Datos (Neon)

### Paso 1: Crear cuenta en Neon

1. Ir a [neon.tech](https://neon.tech)
2. Crear cuenta (gratis)
3. Crear nuevo proyecto

### Paso 2: Obtener credenciales

1. En el dashboard de Neon, ir a "Connection Details"
2. Copiar la URL de conexión (Connection string)
3. Copiar también la Direct connection URL

### Paso 3: Configurar .env.local

```env
# Base de datos (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# Contacto
CONTACT_PHONE=+56912345678
CONTACT_EMAIL=contacto@ejemplo.cl
```

### Paso 4: Crear tablas

```bash
npx prisma db push
```

---

## Desarrollo Local

### Iniciar servidor

```bash
npm run dev
```

| Servicio | URL |
|----------|-----|
| Aplicación | http://localhost:3000 |
| API | http://localhost:3000/api |

### Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor desarrollo |
| `npm run build` | Build producción |
| `npm run start` | Iniciar build |
| `npx prisma studio` | GUI de base de datos |
| `npx prisma db push` | Sincronizar schema |
| `npx prisma generate` | Regenerar cliente |

---

## Deploy en Vercel

### Paso 1: Subir a GitHub

```bash
git add .
git commit -m "feat: ready for Vercel deployment"
git push origin main
```

### Paso 2: Conectar con Vercel

1. Ir a [vercel.com](https://vercel.com)
2. "Add New Project"
3. Importar repositorio de GitHub
4. Seleccionar el repositorio "Abogados"

### Paso 3: Configurar variables de entorno

En Vercel, ir a Settings > Environment Variables y agregar:

| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | Tu URL de Neon (pooled) |
| `DIRECT_URL` | Tu URL de Neon (direct) |
| `CONTACT_PHONE` | +56912345678 |
| `CONTACT_EMAIL` | tu-email@ejemplo.cl |

### Paso 4: Deploy

Click en "Deploy". Vercel construirá y desplegará automáticamente.

### Paso 5: Configurar dominio (opcional)

1. En Vercel, ir a Settings > Domains
2. Agregar tu dominio personalizado
3. Configurar DNS según instrucciones

---

## Personalización

### 1. Datos de Contacto

**Variables de entorno** (`.env.local` o Vercel):
```env
CONTACT_PHONE=+56912345678
CONTACT_EMAIL=tu-email@ejemplo.cl
```

**Formulario de Contacto** (`components/sections/Contact.tsx`):
- Modificar información de ubicación
- Ajustar campos del formulario

### 2. Información Personal

**About** (`components/sections/About.tsx`):
- Modificar párrafos de biografía
- Actualizar credenciales

**Stats** (`components/sections/Stats.tsx`):
```tsx
const stats = [
  { value: '+500', label: 'Casos Resueltos' },
  { value: '+10', label: 'Años de Experiencia' },
  // ...
]
```

### 3. Servicios

**Services** (`components/sections/Services.tsx`):
- Modificar array `services`
- Cambiar títulos, descripciones, iconos

### 4. Colores y Estilos

**Variables CSS** (`styles/variables.css`):
```css
:root {
  --color-primary: #7A2A3C;     /* Color principal */
  --color-secondary: #1a365d;   /* Color secundario */
  --color-accent: #c9a227;      /* Dorado/acento */
}
```

---

## Solución de Problemas

### Error: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Puerto en uso

```bash
# Ver qué usa el puerto
lsof -i :3000

# Matar proceso
kill -9 <PID>
```

### Error: Prisma no conecta

1. Verificar que DATABASE_URL sea correcta
2. Verificar que la IP esté permitida en Neon
3. Regenerar cliente:
```bash
npx prisma generate
```

### Error: Build falla en Vercel

1. Verificar que todas las variables de entorno estén configuradas
2. Ver logs en Vercel dashboard
3. Probar build local:
```bash
npm run build
```

---

## Estructura de Archivos Clave

```
Abogados/
├── app/
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Página de inicio
│   ├── globals.css           # Estilos globales
│   └── api/
│       ├── contact/route.ts  # API contacto
│       ├── config/route.ts   # API configuración
│       └── health/route.ts   # Health check
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Stats.tsx
│   │   ├── CTA.tsx
│   │   └── Contact.tsx
│   └── common/
│       └── WhatsAppButton.tsx
│
├── lib/
│   ├── prisma.ts             # Cliente Prisma
│   ├── config.ts             # Configuración
│   ├── storage.ts            # Almacenamiento
│   └── validation.ts         # Validación Zod
│
├── prisma/
│   └── schema.prisma         # Schema BD
│
├── styles/
│   └── variables.css         # Variables CSS
│
├── types/
│   └── index.ts              # TypeScript types
│
├── .env.example              # Template variables
├── next.config.js            # Config Next.js
├── package.json
└── tsconfig.json
```

---

## Próximos Pasos

1. Configurar base de datos en Neon
2. Personalizar datos de contacto
3. Ajustar colores en variables.css
4. Modificar textos y servicios
5. Deploy en Vercel
6. Configurar dominio personalizado
