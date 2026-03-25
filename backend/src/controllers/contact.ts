import type { Request, Response } from 'express'
import { sendWhatsAppNotification } from '../services/whatsapp.js'
import { saveContactSubmission } from '../services/storage.js'
import type { ContactFormData } from '../types/index.js'

interface ContactRequestBody extends ContactFormData {
  nombre: string
  email: string
  telefono?: string
  servicio?: string
  mensaje?: string
}

/**
 * Handle contact form submission
 */
export async function handleContactForm(
  req: Request<object, object, ContactRequestBody>,
  res: Response
): Promise<void> {
  try {
    const { nombre, email, telefono, servicio, mensaje } = req.body

    const submission = {
      nombre,
      email,
      telefono: telefono || '',
      servicio: servicio || 'no especificado',
      mensaje: mensaje || '',
      timestamp: new Date().toISOString(),
    }

    // Save submission to storage (file or database)
    await saveContactSubmission(submission)

    // Send WhatsApp notification (optional)
    try {
      await sendWhatsAppNotification(submission)
    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', (whatsappError as Error).message)
      // Don't fail the request if WhatsApp fails
    }

    res.status(200).json({
      success: true,
      message: 'Mensaje recibido correctamente. Te contactaremos pronto.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Error al procesar el formulario. Por favor, intenta nuevamente.',
    })
  }
}
