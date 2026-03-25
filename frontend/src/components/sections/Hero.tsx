import type { MouseEvent } from "react";

function Hero(): JSX.Element {
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
              onClick={(e) => scrollToSection(e, "contacto")}
            >
              Agenda tu Consulta
            </a>
            <a
              href="#servicios"
              className="btn btn--outline-light"
              onClick={(e) => scrollToSection(e, "servicios")}
            >
              Ver Servicios
            </a>
          </div>
        </div>
        <div className="hero__image">
          <div className="hero__image-placeholder">
            <img
              className="hero__image"
              src="../../../public/perfil.png"
              alt="Perfil"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
