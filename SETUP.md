# SETUP.md - Guía de Instalación

Guía completa para configurar el proyecto de asesoría legal.

## Requisitos

| Requisito | Versión | Obligatorio |
|-----------|---------|-------------|
| Node.js | 18+ | Sí |
| npm | 9+ | Sí |
| Docker | 20+ | No |
| Docker Compose | 2+ | No |
| MySQL | 8.0 | No |

### Verificar instalación

```bash
node --version    # v18.x.x o superior
npm --version     # 9.x.x o superior
docker --version  # 20.x.x (opcional)
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

# 2. Instalar todas las dependencias
npm run install:all

# 3. Configurar variables de entorno
cp backend/.env.example backend/.env

# 4. Ejecutar
npm run dev
```

Acceder a: http://localhost:3000

---

## Instalación Detallada

### Paso 1: Dependencias

```bash
# Desde la raíz del proyecto
npm run install:all

# O manualmente:
npm install                 # Raíz (concurrently)
cd frontend && npm install  # Frontend
cd ../backend && npm install # Backend
```

### Paso 2: Configuración

```bash
# Copiar archivo de ejemplo
cp backend/.env.example backend/.env

# Editar con tus datos
nano backend/.env
```

### Paso 3: Variables de Entorno

Editar `backend/.env`:

```env
# Servidor
PORT=5000
HOST=0.0.0.0
NODE_ENV=development

# Base de datos (opcional)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=asesoria_legal
DB_USER=asesoria
DB_PASSWORD=asesoria123

# WhatsApp
WHATSAPP_SESSION_PATH=./whatsapp-session
AUTO_REPLY_ENABLED=true
AUTO_REPLY_MESSAGE=Gracias por contactarnos. Te responderemos pronto.

# Contacto
CONTACT_PHONE=+56912345678
CONTACT_EMAIL=tu-email@ejemplo.cl
```

---

## Modos de Ejecución

### Modo 1: Sin Docker (Recomendado para empezar)

Usa archivo JSON como almacenamiento.

```bash
npm run dev
```

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |

### Modo 2: Con Docker (MySQL)

```bash
# 1. Iniciar MySQL + phpMyAdmin
docker-compose -f docker-compose.dev.yml up -d

# 2. Ejecutar la app
npm run dev
```

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| phpMyAdmin | http://localhost:8080 |
| MySQL | localhost:3306 |

**phpMyAdmin:**
- Usuario: `asesoria`
- Password: `asesoria123`

### Modo 3: Docker Producción (Todo en contenedores)

```bash
# Construir y ejecutar
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:80 |
| Backend | http://localhost:5000 |

---

## Acceso en Red Local

El proyecto está configurado para acceso desde otros dispositivos.

### Ver tu IP

```bash
# Linux
ip addr | grep inet

# macOS
ifconfig | grep inet

# Windows
ipconfig
```

### Acceder desde otro dispositivo

1. Ejecutar: `npm run dev`
2. En otro dispositivo: `http://TU_IP:3000`

---

## Personalización

### 1. Datos de Contacto

**WhatsApp Button** (`frontend/src/components/common/WhatsAppButton.tsx`):
```tsx
const WHATSAPP_NUMBER = '56912345678'  // Tu número
const WHATSAPP_MESSAGE = 'Hola, me gustaría consultar...'
```

**Formulario de Contacto** (`frontend/src/components/sections/Contact.tsx`):
```tsx
const contactInfo = [
  { label: 'Teléfono', value: '+56 9 1234 5678' },
  { label: 'Email', value: 'tu-email@ejemplo.cl' },
  { label: 'Ubicación', value: 'Tu ciudad, Chile' },
]
```

### 2. Información Personal

**About** (`frontend/src/components/sections/About.tsx`):
- Modificar párrafos de biografía
- Actualizar credenciales

**Stats** (`frontend/src/components/sections/Stats.tsx`):
```tsx
const stats = [
  { value: '+500', label: 'Casos Resueltos' },
  { value: '+10', label: 'Años de Experiencia' },
  // ...
]
```

### 3. Servicios

**Services** (`frontend/src/components/sections/Services.tsx`):
- Modificar array `services`
- Cambiar títulos, descripciones, iconos

### 4. Colores y Estilos

**Variables CSS** (`frontend/src/styles/variables.css`):
```css
:root {
  --color-primary: #1a365d;     /* Azul principal */
  --color-accent: #c9a227;       /* Dorado */
  --color-text: #2d3748;         /* Texto */
  /* ... */
}
```

---

## Integración WhatsApp

### Activar WhatsApp Bot

1. **Editar servicio** (`backend/src/services/whatsapp.ts`):
   - Descomentar el código dentro de `initializeWhatsApp()`

2. **Activar en servidor** (`backend/src/index.ts`):
   ```typescript
   // Cambiar de:
   // initializeWhatsApp()
   // A:
   initializeWhatsApp()
   ```

3. **Reiniciar y escanear QR**:
   ```bash
   npm run dev:backend
   # Escanear QR que aparece en terminal
   ```

### Funcionalidades

- **Auto-respuesta**: Responde automáticamente a mensajes nuevos
- **Notificaciones**: Avisa cuando llega un formulario
- **API de envío**: `POST /api/whatsapp/send`

---

## Agregar Nuevas Páginas

### Ejemplo: Página de Blog

1. **Crear componente**:
```tsx
// frontend/src/pages/Blog.tsx
import '../styles/pages/blog.css'

function Blog(): JSX.Element {
  return (
    <section className="blog">
      <div className="container">
        <h1>Blog Legal</h1>
      </div>
    </section>
  )
}

export default Blog
```

2. **Crear estilos**:
```css
/* frontend/src/styles/pages/blog.css */
.blog {
  padding: var(--spacing-4xl) 0;
}
```

3. **Agregar ruta** (`frontend/src/App.tsx`):
```tsx
import Blog from './pages/Blog'

<Route path="/blog" element={<Blog />} />
```

4. **Agregar link en Header** (`frontend/src/components/layout/Header.tsx`)

---

## Solución de Problemas

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm run install:all
```

### Error: Puerto en uso
```bash
# Ver qué usa el puerto
lsof -i :3000
lsof -i :5000

# Matar proceso
kill -9 <PID>

# O cambiar puerto en .env
PORT=5001
```

### Error: CORS
Verificar proxy en `frontend/vite.config.ts`:
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
},
```

### Docker: MySQL no conecta
```bash
# Ver logs
docker-compose -f docker-compose.dev.yml logs mysql

# Reiniciar
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up -d
```

### WhatsApp: No muestra QR
- Verificar que Chromium esté instalado
- En Linux:
```bash
sudo apt-get install chromium-browser
```

---

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Frontend + Backend |
| `npm run dev:frontend` | Solo frontend |
| `npm run dev:backend` | Solo backend |
| `npm run build` | Build producción |
| `npm run install:all` | Instalar todo |
| `docker-compose up -d` | Iniciar Docker |
| `docker-compose down` | Detener Docker |
| `docker-compose logs -f` | Ver logs |

---

## Estructura de Archivos Clave

```
Abogados/
├── package.json              # Comandos raíz
├── docker-compose.yml        # Docker producción
├── docker-compose.dev.yml    # Docker desarrollo
│
├── frontend/
│   ├── vite.config.ts        # Config Vite + proxy
│   ├── tsconfig.json         # Config TypeScript
│   └── src/
│       ├── App.tsx           # Rutas
│       ├── main.tsx          # Entry point
│       └── styles/
│           └── variables.css # Variables CSS
│
├── backend/
│   ├── .env.example          # Variables ejemplo
│   ├── tsconfig.json         # Config TypeScript
│   └── src/
│       ├── index.ts          # Entry point
│       └── config/index.ts   # Configuración
│
└── database/
    └── init/01-schema.sql    # SQL inicial
```

---

## Próximos Pasos

1. Personalizar datos de contacto
2. Ajustar colores en variables.css
3. Modificar textos y servicios
4. Probar formulario de contacto
5. (Opcional) Activar WhatsApp
6. (Opcional) Configurar Docker + MySQL
