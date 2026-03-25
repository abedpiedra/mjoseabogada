import prisma, { isDatabaseConnected } from './database.js'
import type { ContactFormData, ContactSubmission } from '../types/index.js'

// Fallback to file storage if database is not connected
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const STORAGE_DIR = path.join(__dirname, '../../logs')
const SUBMISSIONS_FILE = path.join(STORAGE_DIR, 'submissions.json')

/**
 * Ensure storage directory exists (for file fallback)
 */
async function ensureStorageDir(): Promise<void> {
  try {
    await fs.access(STORAGE_DIR)
  } catch {
    await fs.mkdir(STORAGE_DIR, { recursive: true })
  }
}

/**
 * Get all contact submissions from file (fallback)
 */
async function getSubmissionsFromFile(): Promise<ContactSubmission[]> {
  await ensureStorageDir()
  try {
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf-8')
    return JSON.parse(data) as ContactSubmission[]
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

/**
 * Save submission to file (fallback)
 */
async function saveSubmissionToFile(
  formData: ContactFormData & { timestamp: string }
): Promise<ContactSubmission> {
  await ensureStorageDir()
  const submissions = await getSubmissionsFromFile()

  const newSubmission: ContactSubmission = {
    id: Date.now().toString(),
    nombre: formData.nombre,
    email: formData.email,
    telefono: formData.telefono,
    servicio: formData.servicio || 'no especificado',
    mensaje: formData.mensaje,
    timestamp: formData.timestamp,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  submissions.push(newSubmission)
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8')
  return newSubmission
}

// ============ Prisma Methods ============

/**
 * Get all contact submissions
 */
export async function getSubmissions(): Promise<ContactSubmission[]> {
  if (!isDatabaseConnected()) {
    return getSubmissionsFromFile()
  }

  const rows = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return rows.map((row) => ({
    id: row.id.toString(),
    nombre: row.nombre,
    email: row.email,
    telefono: row.telefono || undefined,
    servicio: row.servicio || undefined,
    mensaje: row.mensaje || undefined,
    status: row.status as 'pending' | 'contacted' | 'resolved',
    timestamp: row.createdAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }))
}

/**
 * Save a contact form submission
 */
export async function saveContactSubmission(
  formData: ContactFormData & { timestamp: string }
): Promise<ContactSubmission> {
  if (!isDatabaseConnected()) {
    return saveSubmissionToFile(formData)
  }

  const result = await prisma.contactSubmission.create({
    data: {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono || null,
      servicio: formData.servicio || null,
      mensaje: formData.mensaje || null,
      status: 'pending',
    },
  })

  return {
    id: result.id.toString(),
    nombre: result.nombre,
    email: result.email,
    telefono: result.telefono || undefined,
    servicio: result.servicio || 'no especificado',
    mensaje: result.mensaje || undefined,
    timestamp: formData.timestamp,
    status: 'pending',
    createdAt: result.createdAt.toISOString(),
  }
}

/**
 * Update submission status
 */
export async function updateSubmissionStatus(
  id: string,
  status: ContactSubmission['status']
): Promise<ContactSubmission | null> {
  if (!isDatabaseConnected()) {
    // File fallback
    const submissions = await getSubmissionsFromFile()
    const index = submissions.findIndex((s) => s.id === id)
    if (index === -1) return null

    submissions[index].status = status
    submissions[index].updatedAt = new Date().toISOString()
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8')
    return submissions[index]
  }

  const result = await prisma.contactSubmission.update({
    where: { id: parseInt(id, 10) },
    data: { status },
  })

  return {
    id: result.id.toString(),
    nombre: result.nombre,
    email: result.email,
    telefono: result.telefono || undefined,
    servicio: result.servicio || undefined,
    mensaje: result.mensaje || undefined,
    status: result.status as 'pending' | 'contacted' | 'resolved',
    timestamp: result.createdAt.toISOString(),
    createdAt: result.createdAt.toISOString(),
    updatedAt: result.updatedAt.toISOString(),
  }
}

/**
 * Get submission by ID
 */
export async function getSubmissionById(id: string): Promise<ContactSubmission | null> {
  if (!isDatabaseConnected()) {
    const submissions = await getSubmissionsFromFile()
    return submissions.find((s) => s.id === id) || null
  }

  const row = await prisma.contactSubmission.findUnique({
    where: { id: parseInt(id, 10) },
  })

  if (!row) return null

  return {
    id: row.id.toString(),
    nombre: row.nombre,
    email: row.email,
    telefono: row.telefono || undefined,
    servicio: row.servicio || undefined,
    mensaje: row.mensaje || undefined,
    status: row.status as 'pending' | 'contacted' | 'resolved',
    timestamp: row.createdAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}
