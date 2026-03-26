import { NextResponse } from 'next/server'
import { disconnect } from '@/lib/whatsapp/service'

export async function POST() {
  try {
    await disconnect()
    return NextResponse.json({
      success: true,
      message: 'WhatsApp disconnected',
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
