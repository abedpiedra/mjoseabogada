'use client'

import { useState, useEffect, ReactNode } from 'react'

interface Service {
  id: number
  title: string
  description: string
  icon: ReactNode
}

const services: Service[] = [
  {
    id: 1,
    title: 'Derecho de Familia',
    description:
      'Divorcios, pensiones alimenticias, cuidado personal de hijos, régimen de visitas y liquidación de bienes.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Contratos y Documentos',
    description:
      'Redacción y revisión de contratos civiles, comerciales, laborales y todo tipo de documentos legales.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Asesoría Preventiva',
    description:
      'Orientación legal para prevenir conflictos y tomar decisiones informadas en tu vida personal y profesional.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Derecho Inmobiliario',
    description:
      'Compraventa de propiedades, arriendos, promesas, estudios de títulos y regularización de bienes raíces.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Derecho Laboral',
    description:
      'Finiquitos, despidos, demandas laborales, contratos de trabajo y asesoría en relaciones empleador-trabajador.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Herencias y Sucesiones',
    description:
      'Posesiones efectivas, testamentos, partición de bienes y todo lo relacionado con derecho sucesorio.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
      </svg>
    ),
  },
]

export default function Services() {
  const [phone, setPhone] = useState<string>('')

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch('/api/config')
        const config = await response.json()
        setPhone(config.contact.phone.replace(/[^\d+]/g, ''))
      } catch (error) {
        console.error('Error loading config:', error)
      }
    }
    loadConfig()
  }, [])

  const getWhatsAppUrl = (serviceTitle: string) => {
    const message = `Hola, me gustaría consultar sobre su servicio de ${serviceTitle}.`
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  return (
    <section className="section section--alt" id="servicios">
      <div className="container">
        <div className="section-header">
          <h2>Servicios Legales</h2>
          <p>
            Asesoría integral para proteger tus derechos en cada etapa del
            proceso legal
          </p>
        </div>
        <div className="services__grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card__icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a
                href={getWhatsAppUrl(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="service-card__whatsapp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
