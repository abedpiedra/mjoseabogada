import config from '@/lib/config'
import type { ContactFormData, WhatsAppStatus, WhatsAppMessageResult } from '@/types'
import {
  getClient,
  getIsReady,
  setIsReady,
  initializeClient,
  destroyClient,
  getRepliedContacts,
  getReplyCooldown,
} from './client'

export async function initializeWhatsApp(): Promise<void> {
  await initializeClient()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleIncomingMessage(message: any): Promise<void> {
  if (!config.whatsapp.autoReplyEnabled) return

  const contact = await message.getContact()
  const contactId = contact.id._serialized as string
  const repliedContacts = getRepliedContacts()
  const cooldown = getReplyCooldown()

  // Check cooldown to avoid spam
  const lastReply = repliedContacts.get(contactId)
  if (lastReply && Date.now() - lastReply < cooldown) {
    return
  }

  // Send auto-reply
  await message.reply(config.whatsapp.autoReplyMessage)
  repliedContacts.set(contactId, Date.now())

  console.log(`Auto-reply sent to ${contact.pushname || contactId}`)
}

export async function sendMessage(
  phone: string,
  message: string
): Promise<WhatsAppMessageResult> {
  const client = getClient()
  const isReady = getIsReady()

  if (!isReady || !client) {
    console.log('WhatsApp not ready. Message queued:', { phone, message })
    return { success: false, reason: 'WhatsApp not initialized' }
  }

  try {
    const chatId = `${phone.replace(/\D/g, '')}@c.us`
    await client.sendMessage(chatId, message)
    return { success: true }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    return { success: false, reason: (error as Error).message }
  }
}

export async function sendWhatsAppNotification(
  submission: ContactFormData & { timestamp: string }
): Promise<WhatsAppMessageResult> {
  const ownerPhone = config.contact.phone.replace(/\D/g, '')

  const message = `Nueva consulta legal

Nombre: ${submission.nombre}
Email: ${submission.email}
Telefono: ${submission.telefono || 'No proporcionado'}
Servicio: ${submission.servicio || 'No especificado'}
Mensaje: ${submission.mensaje || 'Sin mensaje'}

${new Date(submission.timestamp).toLocaleString('es-CL')}`

  return sendMessage(ownerPhone, message)
}

export function getStatus(): WhatsAppStatus {
  const client = getClient()
  const isReady = getIsReady()

  return {
    initialized: client !== null,
    ready: isReady,
    autoReplyEnabled: config.whatsapp.autoReplyEnabled,
  }
}

export async function disconnect(): Promise<void> {
  await destroyClient()
  setIsReady(false)
}
