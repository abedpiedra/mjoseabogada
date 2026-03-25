import dotenv from 'dotenv'
import type { AppConfig } from '../types/index.js'

dotenv.config()

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'asesoria',
    password: process.env.DB_PASSWORD || 'asesoria123',
    name: process.env.DB_NAME || 'asesoria_legal',
  },

  whatsapp: {
    sessionPath: process.env.WHATSAPP_SESSION_PATH || './whatsapp-session',
    autoReplyEnabled: process.env.AUTO_REPLY_ENABLED === 'true',
    autoReplyMessage:
      process.env.AUTO_REPLY_MESSAGE ||
      'Gracias por contactarnos. Un abogado se comunicará contigo pronto.',
  },

  contact: {
    phone: process.env.CONTACT_PHONE || '+56912345678',
    email: process.env.CONTACT_EMAIL || 'contacto@ejemplo.cl',
  },
}

export default config
