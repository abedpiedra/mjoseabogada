export interface AppConfig {
  database: {
    url: string
  }
  whatsapp: {
    sessionPath: string
    autoReplyEnabled: boolean
    autoReplyMessage: string
  }
  contact: {
    phone: string
    email: string
  }
}

export const config: AppConfig = {
  database: {
    url: process.env.DATABASE_URL || '',
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
