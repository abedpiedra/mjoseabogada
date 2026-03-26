import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

let isConnected = false

export async function initializeDatabase(): Promise<boolean> {
  try {
    await prisma.$connect()
    isConnected = true
    console.log('Database connected successfully (Prisma)')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    isConnected = false
    return false
  }
}

export function isDatabaseConnected(): boolean {
  return isConnected
}

export async function closeDatabase(): Promise<void> {
  await prisma.$disconnect()
  isConnected = false
}

export default prisma
