/**
 * WhatsApp Service
 *
 * This service handles WhatsApp integration using whatsapp-web.js
 * To enable WhatsApp functionality:
 * 1. Install dependencies: npm install whatsapp-web.js qrcode-terminal
 * 2. Uncomment the initialization code below
 * 3. Scan the QR code with your WhatsApp mobile app
 */

import config from '../config/index.js'
import type { ContactFormData, WhatsAppStatus, WhatsAppMessageResult } from '../types/index.js'

// WhatsApp client instance (will be initialized when needed)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: any = null
let isReady = false

// Store for auto-reply tracking (to avoid spamming)
const repliedContacts = new Map<string, number>()
const REPLY_COOLDOWN = 60 * 60 * 1000 // 1 hour cooldown

/**
 * Initialize WhatsApp client
 * Uncomment and configure when ready to use
 */
export async function initializeWhatsApp(): Promise<void> {
  // Uncomment the following code when ready to implement WhatsApp

  /*
  const { Client, LocalAuth } = await import('whatsapp-web.js')
  const qrcode = await import('qrcode-terminal')

  client = new Client({
    authStrategy: new LocalAuth({
      dataPath: config.whatsapp.sessionPath
    }),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  })

  client.on('qr', (qr: string) => {
    console.log('Scan this QR code with WhatsApp:')
    qrcode.default.generate(qr, { small: true })
  })

  client.on('ready', () => {
    console.log('WhatsApp client is ready!')
    isReady = true
  })

  client.on('message', async (message: any) => {
    await handleIncomingMessage(message)
  })

  client.on('disconnected', (reason: string) => {
    console.log('WhatsApp disconnected:', reason)
    isReady = false
  })

  await client.initialize()
  */

  console.log('WhatsApp service initialized (placeholder mode)')
}

/**
 * Handle incoming WhatsApp messages
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleIncomingMessage(message: any): Promise<void> {
  if (!config.whatsapp.autoReplyEnabled) return

  const contact = await message.getContact()
  const contactId = contact.id._serialized as string

  // Check cooldown to avoid spam
  const lastReply = repliedContacts.get(contactId)
  if (lastReply && Date.now() - lastReply < REPLY_COOLDOWN) {
    return
  }

  // Send auto-reply
  await message.reply(config.whatsapp.autoReplyMessage)
  repliedContacts.set(contactId, Date.now())

  console.log(`Auto-reply sent to ${contact.pushname || contactId}`)
}

/**
 * Send a WhatsApp message
 */
export async function sendMessage(phone: string, message: string): Promise<WhatsAppMessageResult> {
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

/**
 * Send notification about new contact form submission
 */
export async function sendWhatsAppNotification(
  submission: ContactFormData & { timestamp: string }
): Promise<WhatsAppMessageResult> {
  const ownerPhone = config.contact.phone.replace(/\D/g, '')

  const message = `📬 *Nueva consulta legal*

👤 *Nombre:* ${submission.nombre}
📧 *Email:* ${submission.email}
📱 *Teléfono:* ${submission.telefono || 'No proporcionado'}
📋 *Servicio:* ${submission.servicio || 'No especificado'}
💬 *Mensaje:* ${submission.mensaje || 'Sin mensaje'}

⏰ ${new Date(submission.timestamp).toLocaleString('es-CL')}`

  return sendMessage(ownerPhone, message)
}

/**
 * Get WhatsApp connection status
 */
export function getStatus(): WhatsAppStatus {
  return {
    initialized: client !== null,
    ready: isReady,
    autoReplyEnabled: config.whatsapp.autoReplyEnabled,
  }
}

/**
 * Disconnect WhatsApp client
 */
export async function disconnect(): Promise<void> {
  if (client) {
    await client.destroy()
    client = null
    isReady = false
  }
}

// Suppress unused variable warning for handleIncomingMessage
void handleIncomingMessage
