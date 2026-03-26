'use client'

import { useState, ChangeEvent, FormEvent, ReactNode } from 'react'

interface ContactFormData {
  nombre: string
  email: string
  telefono: string
  servicio: string
  mensaje: string
}

interface ContactFormStatus {
  type: 'success' | 'error' | ''
  message: string
}

interface ContactInfo {
  icon: ReactNode
  label: string
  value: string
}

interface ServiceOption {
  value: string
  label: string
}

const contactInfo: ContactInfo[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    label: 'Teléfono',
    value: '+56 9 4047 9146',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: 'Email',
    value: 'a.piedracastillo23@gmail.com',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    label: 'Ubicación',
    value: 'Santiago, Chile',
  },
]

const serviceOptions: ServiceOption[] = [
  { value: '', label: 'Selecciona un servicio' },
  { value: 'familia', label: 'Derecho de Familia' },
  { value: 'contratos', label: 'Contratos y Documentos' },
  { value: 'laboral', label: 'Derecho Laboral' },
  { value: 'inmobiliario', label: 'Derecho Inmobiliario' },
  { value: 'herencias', label: 'Herencias y Sucesiones' },
  { value: 'otro', label: 'Otro' },
]

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  })
  const [status, setStatus] = useState<ContactFormStatus>({
    type: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error sending contact form')
      }

      setStatus({
        type: 'success',
        message: '¡Gracias por tu mensaje! Te contactaré a la brevedad.',
      })
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        servicio: '',
        mensaje: '',
      })
    } catch {
      setStatus({
        type: 'error',
        message:
          'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section contact" id="contacto">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info">
            <h2>Contáctame</h2>
            <p>
              Estoy aquí para ayudarte. Completa el formulario o contáctame
              directamente por los medios disponibles. Respondo a la brevedad.
            </p>
            <div className="contact__details">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-item__icon">{item.icon}</div>
                  <div className="contact-item__text">
                    <h4>{item.label}</h4>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <h3>Envíame un Mensaje</h3>

            {status.message && (
              <div
                className={`form-status form-status--${status.type}`}
              >
                {status.message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+56 9 XXXX XXXX"
              />
            </div>

            <div className="form-group">
              <label htmlFor="servicio">Tipo de Consulta</label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
              >
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Cuéntame brevemente tu caso..."
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
