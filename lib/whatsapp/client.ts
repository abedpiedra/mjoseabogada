import config from '@/lib/config'

// WhatsApp client singleton
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: any = null
let isReady = false
let isInitializing = false

// Store for auto-reply tracking (to avoid spamming)
const repliedContacts = new Map<string, number>()
const REPLY_COOLDOWN = 60 * 60 * 1000 // 1 hour cooldown

export function getClient() {
  return client
}

export function getIsReady(): boolean {
  return isReady
}

export function setIsReady(value: boolean): void {
  isReady = value
}

export function getIsInitializing(): boolean {
  return isInitializing
}

export function setIsInitializing(value: boolean): void {
  isInitializing = value
}

export function getRepliedContacts(): Map<string, number> {
  return repliedContacts
}

export function getReplyCooldown(): number {
  return REPLY_COOLDOWN
}

export async function initializeClient(): Promise<void> {
  if (client || isInitializing) return

  isInitializing = true

  try {
    const { Client, LocalAuth } = await import('whatsapp-web.js')
    const qrcode = await import('qrcode-terminal')

    client = new Client({
      authStrategy: new LocalAuth({
        dataPath: config.whatsapp.sessionPath,
      }),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
        ],
      },
    })

    client.on('qr', (qr: string) => {
      console.log('Scan this QR code with WhatsApp:')
      qrcode.default.generate(qr, { small: true })
    })

    client.on('ready', () => {
      console.log('WhatsApp client is ready!')
      isReady = true
    })

    client.on('disconnected', (reason: string) => {
      console.log('WhatsApp disconnected:', reason)
      isReady = false
      client = null
    })

    await client.initialize()
  } catch (error) {
    console.error('Failed to initialize WhatsApp client:', error)
    isInitializing = false
    throw error
  } finally {
    isInitializing = false
  }
}

export async function destroyClient(): Promise<void> {
  if (client) {
    await client.destroy()
    client = null
    isReady = false
  }
}

export { client }
