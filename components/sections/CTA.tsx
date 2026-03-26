'use client'

import { MouseEvent } from 'react'

export default function CTA() {
  const scrollToContact = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    const element = document.getElementById('contacto')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="section cta">
      <div className="container">
        <div className="cta__content">
          <h2>¿Necesitas Asesoría Legal?</h2>
          <p>
            No esperes más. Agenda una consulta y conversemos sobre tu caso.
            La primera orientación es gratuita.
          </p>
          <a
            href="#contacto"
            className="btn btn--primary"
            onClick={scrollToContact}
          >
            Agendar Consulta Gratuita
          </a>
        </div>
      </div>
    </section>
  )
}
