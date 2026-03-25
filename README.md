# Asesoría Legal - María José Solorza Salas

Plataforma web profesional para servicios de asesoría legal con integración de WhatsApp, panel administrativo y gestión de clientes.

## Visión del Proyecto

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTE                               │
│  Landing → Consulta → Agenda cita → Paga → Portal       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   WHATSAPP BOT                          │
│  Auto-respuesta → Menú → Recordatorios → Seguimiento    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  PANEL ADMIN                            │
│  CRM → Calendario → Documentos → Reportes → Pagos      │
└─────────────────────────────────────────────────────────┘
```

## Tecnologías

| Capa | Tecnología |
|------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| Base de datos | MySQL 8.0 (fallback JSON) |
| Mensajería | WhatsApp Web API |
| Contenedores | Docker + Docker Compose |

## Estructura del Proyecto

```
Abogados/
├── frontend/                  # React + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Reutilizables
│   │   │   ├── layout/        # Header, Footer
│   │   │   └── sections/      # Secciones landing
│   │   ├── pages/             # Páginas
│   │   ├── services/          # API calls
│   │   ├── styles/            # CSS modular
│   │   └── types/             # TypeScript
│   ├── Dockerfile
│   └── package.json
│
├── backend/                   # Node.js + Express
│   ├── src/
│   │   ├── config/            # Configuración
│   │   ├── controllers/       # Lógica
│   │   ├── routes/            # Endpoints
│   │   ├── services/          # WhatsApp, DB
│   │   └── types/             # TypeScript
│   ├── Dockerfile
│   └── package.json
│
├── database/init/             # SQL inicial
├── docker-compose.yml         # Producción
├── docker-compose.dev.yml     # Desarrollo
└── package.json               # Comandos raíz
```

## Requisitos

- Node.js 18+
- npm 9+
- Docker y Docker Compose (opcional)
- MySQL 8.0 (opcional)

## Instalación Rápida

```bash
# Clonar e instalar
cd Abogados
npm run install:all

# Configurar backend
cp backend/.env.example backend/.env

# Ejecutar
npm run dev
```

## Desarrollo

### Sin Docker (usa JSON como storage)

```bash
npm run dev
```

### Con Docker + MySQL

```bash
# Terminal 1: MySQL + phpMyAdmin
docker-compose -f docker-compose.dev.yml up -d

# Terminal 2: App
npm run dev
```

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Frontend + Backend juntos |
| `npm run dev:frontend` | Solo frontend (puerto 3000) |
| `npm run dev:backend` | Solo backend (puerto 5000) |
| `npm run install:all` | Instalar todo |
| `npm run build` | Build producción |

## Acceso en Red Local

El proyecto está configurado para acceso desde otros dispositivos:

```bash
# Ver tu IP
ip addr | grep inet   # Linux
ipconfig              # Windows

# Ejecutar y acceder desde otro dispositivo
npm run dev
# http://TU_IP:3000
```

## Docker Producción

```bash
# Construir y ejecutar
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

| Servicio | Puerto |
|----------|--------|
| Frontend | 80 |
| Backend | 5000 |
| MySQL | 3306 |
| phpMyAdmin (dev) | 8080 |

## Configuración

### Variables de Entorno (backend/.env)

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
```

## Funcionalidades

### Actuales
- [x] Landing page responsive
- [x] Formulario de contacto
- [x] Botón WhatsApp
- [x] API REST
- [x] Almacenamiento MySQL/JSON
- [x] Docker ready

### En desarrollo
- [ ] Panel administrativo
- [ ] Autenticación admin
- [ ] CRM básico (gestión de leads)
- [ ] Bot WhatsApp inteligente

### Futuras
- [ ] Sistema de citas
- [ ] Portal de clientes
- [ ] Blog legal
- [ ] Pagos online
- [ ] Reportes y analytics

## API Endpoints

### Contacto
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/contact` | Enviar formulario |

### WhatsApp
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/whatsapp/status` | Estado conexión |
| POST | `/api/whatsapp/initialize` | Iniciar (QR) |
| POST | `/api/whatsapp/send` | Enviar mensaje |
| POST | `/api/whatsapp/disconnect` | Desconectar |

### Sistema
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Estado servidor |

## Base de Datos

### Tablas

```sql
contact_submissions  -- Formularios de contacto
whatsapp_messages    -- Log de mensajes
services             -- Servicios ofrecidos
```

### Fallback

Si MySQL no está disponible, usa `backend/logs/submissions.json`.

## Personalización

### Datos de contacto
- `frontend/src/components/common/WhatsAppButton.tsx`
- `frontend/src/components/sections/Contact.tsx`
- `backend/.env`

### Colores y estilos
- `frontend/src/styles/variables.css`

### Servicios
- `frontend/src/components/sections/Services.tsx`
- `database/init/01-schema.sql`

## Documentación

- `README.md` - Este archivo
- `SETUP.md` - Guía detallada de instalación
- `CLAUDE.md` - Instrucciones para desarrollo con IA
