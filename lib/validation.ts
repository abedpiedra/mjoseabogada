import { z } from 'zod'

export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  email: z
    .string()
    .email('El email no es válido')
    .max(100, 'El email no puede exceder 100 caracteres')
    .trim()
    .toLowerCase(),
  telefono: z
    .string()
    .regex(/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/, 'El teléfono no es válido')
    .optional()
    .or(z.literal('')),
  servicio: z
    .enum(['', 'familia', 'contratos', 'laboral', 'inmobiliario', 'herencias', 'otro'])
    .optional(),
  mensaje: z
    .string()
    .max(2000, 'El mensaje no puede exceder 2000 caracteres')
    .optional(),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
