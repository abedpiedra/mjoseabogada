// Contact form types
export interface ContactFormData {
  nombre: string
  email: string
  telefono?: string
  servicio?: string
  mensaje?: string
}

export interface ContactSubmission extends ContactFormData {
  id: string
  status: 'pending' | 'contacted' | 'resolved'
  timestamp: string
  createdAt: string
  updatedAt?: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  errors?: ValidationError[]
}

export interface ValidationError {
  msg: string
  path: string
  location?: string
}

// WhatsApp types
export interface WhatsAppConfig {
  sessionPath: string
  autoReplyEnabled: boolean
  autoReplyMessage: string
}

export interface WhatsAppStatus {
  initialized: boolean
  ready: boolean
  autoReplyEnabled: boolean
}

export interface WhatsAppMessageResult {
  success: boolean
  reason?: string
}

// Database types
export interface DatabaseConfig {
  host: string
  port: number
  user: string
  password: string
  name: string
}

// Config types
export interface AppConfig {
  port: number
  nodeEnv: string
  database: DatabaseConfig
  whatsapp: WhatsAppConfig
  contact: {
    phone: string
    email: string
  }
}
