import { NextResponse } from 'next/server'
import { getStatus } from '@/lib/whatsapp/service'

export async function GET() {
  const status = getStatus()
  return NextResponse.json(status)
}
