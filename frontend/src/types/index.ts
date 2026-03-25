import type { ReactNode } from 'react'

// Contact form types
export interface ContactFormData {
  nombre: string
  email: string
  telefono: string
  servicio: string
  mensaje: string
}

export interface ContactFormStatus {
  type: 'success' | 'error' | ''
  message: string
}

// Service types
export interface Service {
  id: number
  title: string
  description: string
  icon: ReactNode
}

// Contact info types
export interface ContactInfo {
  icon: ReactNode
  label: string
  value: string
}

// Stat types
export interface Stat {
  value: string
  label: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  errors?: Array<{ msg: string; path: string }>
}

// WhatsApp types
export interface WhatsAppStatus {
  initialized: boolean
  ready: boolean
  autoReplyEnabled: boolean
}

export interface WhatsAppMessage {
  phone: string
  message: string
}

// Public config from backend
export interface PublicConfig {
  contact: {
    phone: string
    email: string
  }
  whatsapp: {
    defaultMessage: string
  }
}
