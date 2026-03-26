'use client'

import { MouseEvent } from 'react'
import Image from 'next/image'

export default function Hero() {
  const scrollToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ): void => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="container hero__container">
        <div className="hero__content">
          <h1>
            Asesoría Legal <span>Profesional</span> y Confiable
          </h1>
          <p>
            En momentos importantes, necesitas más que consejos: una asesoría
            seria, estratégica y enfocada en proteger tus intereses y los de tu
            familia.
          </p>
          <div className="hero__buttons">
            <a
              href="#contacto"
              className="btn btn--primary"
              onClick={(e) => scrollToSection(e, 'contacto')}
            >
              Agenda tu Consulta
            </a>
            <a
              href="#servicios"
              className="btn btn--outline-light"
              onClick={(e) => scrollToSection(e, 'servicios')}
            >
              Ver Servicios
            </a>
          </div>
        </div>
        <div className="hero__image">
          <div className="hero__image-placeholder">
            <Image
              src="/perfil.png"
              alt="María José Solorza Salas - Abogada"
              width={400}
              height={500}
              priority
              style={{ objectFit: 'cover', borderRadius: 'var(--radius-xl)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
