import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contact.js'
import whatsappRoutes from './routes/whatsapp.js'
import { initializeWhatsApp } from './services/whatsapp.js'
import { initializeDatabase } from './services/database.js'
import config from './config/index.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '0.0.0.0'

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/whatsapp', whatsappRoutes)

// Health check
app.get('/api/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Public config (non-sensitive data for frontend)
app.get('/api/config', (_req: Request, res: Response): void => {
  res.json({
    contact: {
      phone: config.contact.phone,
      email: config.contact.email,
    },
    whatsapp: {
      defaultMessage: 'Hola, me gustaría consultar sobre sus servicios legales.',
    },
  })
})

// Error handling middleware
interface ErrorWithStack extends Error {
  stack?: string
}

app.use((err: ErrorWithStack, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
})

// Start server
async function startServer(): Promise<void> {
  // Initialize database (optional - will fallback to file storage if not available)
  try {
    await initializeDatabase()
    console.log('Database initialized')
  } catch (error) {
    console.warn('Database not available, using file storage fallback')
  }

  app.listen(Number(PORT), HOST, (): void => {
    console.log(`Server running on http://${HOST}:${PORT}`)

    // Initialize WhatsApp client (optional - uncomment when ready)
    // initializeWhatsApp()
  })
}

startServer()

// Suppress unused import warning
void initializeWhatsApp
