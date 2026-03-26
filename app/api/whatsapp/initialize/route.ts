import { NextResponse } from 'next/server'
import { initializeWhatsApp } from '@/lib/whatsapp/service'

export async function POST() {
  try {
    await initializeWhatsApp()
    return NextResponse.json({
      success: true,
      message: 'WhatsApp initialization started. Check console for QR code.',
    })
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
