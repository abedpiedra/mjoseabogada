import { Router } from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import {
  sendMessage,
  getStatus,
  initializeWhatsApp,
  disconnect,
} from '../services/whatsapp.js'

const router = Router()

/**
 * GET /api/whatsapp/status
 * Get WhatsApp connection status
 */
router.get('/status', (_req: Request, res: Response): void => {
  const status = getStatus()
  res.json(status)
})

/**
 * POST /api/whatsapp/initialize
 * Initialize WhatsApp connection (requires QR scan)
 */
router.post('/initialize', async (_req: Request, res: Response): Promise<void> => {
  try {
    await initializeWhatsApp()
    res.json({
      success: true,
      message: 'WhatsApp initialization started. Check console for QR code.',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    })
  }
})

/**
 * POST /api/whatsapp/disconnect
 * Disconnect WhatsApp client
 */
router.post('/disconnect', async (_req: Request, res: Response): Promise<void> => {
  try {
    await disconnect()
    res.json({
      success: true,
      message: 'WhatsApp disconnected',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    })
  }
})

interface SendMessageBody {
  phone: string
  message: string
}

/**
 * POST /api/whatsapp/send
 * Send a WhatsApp message
 */
router.post(
  '/send',
  [
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^\+?[1-9]\d{6,14}$/)
      .withMessage('Invalid phone number format'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ max: 4096 })
      .withMessage('Message too long'),
  ],
  async (req: Request<object, object, SendMessageBody>, res: Response): Promise<void> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      })
      return
    }

    try {
      const { phone, message } = req.body
      const result = await sendMessage(phone, message)

      if (result.success) {
        res.json({
          success: true,
          message: 'Message sent successfully',
        })
      } else {
        res.status(503).json({
          success: false,
          message: result.reason || 'Failed to send message',
        })
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as Error).message,
      })
    }
  }
)

export default router
