export interface AppConfig {
  database: {
    url: string
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
  contact: {
    phone: process.env.CONTACT_PHONE || '+56912345678',
    email: process.env.CONTACT_EMAIL || 'contacto@ejemplo.cl',
  },
}

export default config
