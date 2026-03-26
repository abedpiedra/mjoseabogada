import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation'
import { saveContactSubmission } from '@/lib/storage'
import { sendWhatsAppNotification } from '@/lib/whatsapp/service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate with Zod
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join('.'),
        msg: err.message,
      }))
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      )
    }

    const { nombre, email, telefono, servicio, mensaje } = result.data

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

    return NextResponse.json({
      success: true,
      message: 'Mensaje recibido correctamente. Te contactaremos pronto.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error al procesar el formulario. Por favor, intenta nuevamente.',
      },
      { status: 500 }
    )
  }
}
