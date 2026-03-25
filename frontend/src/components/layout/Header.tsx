import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getConfig } from "../../services/api";
import type { MouseEvent } from "react";
import "../../styles/components/header.css";

function Header(): JSX.Element {
  const scrollToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ): void => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [whatsappUrl, setWhatsappUrl] = useState<string>("#");

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    async function loadConfig() {
      try {
        const config = await getConfig();
        // Remove any non-numeric characters except + for international format
        const phone = config.contact.phone.replace(/[^\d+]/g, "");
        const message = config.whatsapp.defaultMessage;
        setWhatsappUrl(
          `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        );
      } catch (error) {
        console.error("Error loading WhatsApp config:", error);
        // Fallback to default
        setWhatsappUrl("https://wa.me/");
      }
    }
    loadConfig();
  }, []);

  return (
    <header className={`header ${isHidden ? "header--hidden" : ""}`}>
      <div className="container header__container">
        <Link to="/" className="header__logo">
          María José <span>Solorza</span>
        </Link>

        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
          <ul className="header__nav-list">
            <li>
              <a
                href="#servicios"
                className="header__nav-link"
                onClick={(e) => {
                  scrollToSection(e, "servicios");
                  setIsMenuOpen(false);
                }}
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#sobre-mi"
                className="header__nav-link"
                onClick={(e) => {
                  scrollToSection(e, "sobre-mi");
                  setIsMenuOpen(false);
                }}
              >
                Sobre Mí
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="header__nav-link"
                onClick={(e) => {
                  scrollToSection(e, "contacto");
                  setIsMenuOpen(false);
                }}
              >
                Contacto
              </a>
            </li>
          </ul>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Agendar Consulta
          </a>

        </nav>

        <button
          className={`header__menu-btn ${isMenuOpen ? "header__menu-btn--open" : ""}`}
          aria-label="Menú"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
