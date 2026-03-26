import { NextRequest, NextResponse } from 'next/server'
import { whatsappMessageSchema } from '@/lib/validation'
import { sendMessage } from '@/lib/whatsapp/service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate with Zod
    const result = whatsappMessageSchema.safeParse(body)

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

    const { phone, message } = result.data
    const sendResult = await sendMessage(phone, message)

    if (sendResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully',
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: sendResult.reason || 'Failed to send message',
        },
        { status: 503 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 500 }
    )
  }
}
