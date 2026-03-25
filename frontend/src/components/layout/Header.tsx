import { Link } from 'react-router-dom'
import type { MouseEvent } from 'react'
import '../../styles/components/header.css'

function Header(): JSX.Element {
  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">
          María José <span>Solorza</span>
        </Link>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li>
              <a
                href="#servicios"
                className="header__nav-link"
                onClick={(e) => scrollToSection(e, 'servicios')}
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#sobre-mi"
                className="header__nav-link"
                onClick={(e) => scrollToSection(e, 'sobre-mi')}
              >
                Sobre Mí
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="header__nav-link"
                onClick={(e) => scrollToSection(e, 'contacto')}
              >
                Contacto
              </a>
            </li>
          </ul>

          <a
            href="#contacto"
            className="btn btn--primary"
            onClick={(e) => scrollToSection(e, 'contacto')}
          >
            Agendar Consulta
          </a>

          <button className="header__menu-btn" aria-label="Menú">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
