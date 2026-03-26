import { NextResponse } from 'next/server'
import config from '@/lib/config'

export async function GET() {
  return NextResponse.json({
    contact: {
      phone: config.contact.phone,
      email: config.contact.email,
    },
    whatsapp: {
      defaultMessage: 'Hola, me gustaría consultar sobre sus servicios legales.',
    },
  })
}
