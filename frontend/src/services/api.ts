import type { ContactFormData, ApiResponse, WhatsAppStatus, WhatsAppMessage, PublicConfig } from '../types'

const API_BASE_URL = '/api'

/**
 * Send contact form data to the backend
 */
export async function sendContactForm(formData: ContactFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Error sending contact form')
  }

  return response.json()
}

/**
 * Send a message via WhatsApp (future implementation)
 */
export async function sendWhatsAppMessage(messageData: WhatsAppMessage): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/whatsapp/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  })

  if (!response.ok) {
    throw new Error('Error sending WhatsApp message')
  }

  return response.json()
}

/**
 * Get WhatsApp connection status (future implementation)
 */
export async function getWhatsAppStatus(): Promise<WhatsAppStatus> {
  const response = await fetch(`${API_BASE_URL}/whatsapp/status`)

  if (!response.ok) {
    throw new Error('Error getting WhatsApp status')
  }

  return response.json()
}

/**
 * Get public configuration (contact info, etc.)
 */
export async function getConfig(): Promise<PublicConfig> {
  const response = await fetch(`${API_BASE_URL}/config`)

  if (!response.ok) {
    throw new Error('Error getting config')
  }

  return response.json()
}
