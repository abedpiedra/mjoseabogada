import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

let isConnected = false

/**
 * Initialize database connection
 */
export async function initializeDatabase(): Promise<void> {
  try {
    await prisma.$connect()
    isConnected = true
    console.log('Database connected successfully (Prisma)')
  } catch (error) {
    console.error('Database connection failed:', error)
    isConnected = false
    throw error
  }
}

/**
 * Get Prisma client instance
 */
export function getPrismaClient(): PrismaClient {
  return prisma
}

/**
 * Close database connection
 */
export async function closeDatabase(): Promise<void> {
  await prisma.$disconnect()
  isConnected = false
  console.log('Database connection closed')
}

/**
 * Check if database is connected
 */
export function isDatabaseConnected(): boolean {
  return isConnected
}

export default prisma
