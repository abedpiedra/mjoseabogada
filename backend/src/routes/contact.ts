import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { handleContactForm } from '../controllers/contact.js'

const router = Router()

// Validation middleware
const validateContact = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido')
    .normalizeEmail(),

  body('telefono')
    .optional()
    .trim()
    .matches(/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/)
    .withMessage('El teléfono no es válido'),

  body('servicio')
    .optional()
    .trim()
    .isIn(['', 'familia', 'contratos', 'laboral', 'inmobiliario', 'herencias', 'otro'])
    .withMessage('Servicio no válido'),

  body('mensaje')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('El mensaje no puede exceder 2000 caracteres'),
]

// Validation error handler
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
    })
    return
  }
  next()
}

// POST /api/contact
router.post('/', validateContact, handleValidationErrors, handleContactForm)

export default router
