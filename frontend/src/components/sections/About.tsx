const credentials: string[] = [
  'Atención Personalizada',
  'Confidencialidad',
  'Compromiso',
  'Experiencia',
]

function About(): JSX.Element {
  return (
    <section className="section" id="sobre-mi">
      <div className="container">
        <div className="about__grid">
          <div className="about__image">
            <div className="about__image-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
          <div className="about__content">
            <h2>María José Solorza Salas</h2>
            <p>
              Abogada con amplia experiencia en asesoría legal integral. Mi compromiso es
              brindar un servicio personalizado, cercano y de excelencia, enfocado siempre
              en proteger los intereses de mis clientes.
            </p>
            <p>
              Creo firmemente que cada caso es único y merece una atención dedicada. Por
              eso, me especializo en entender las necesidades particulares de cada cliente
              para ofrecer soluciones jurídicas efectivas y estratégicas.
            </p>
            <p>
              Mi objetivo es ser tu aliada en cada proceso legal, brindándote la
              tranquilidad y confianza que necesitas para tomar las mejores decisiones.
            </p>
            <div className="about__credentials">
              {credentials.map((credential, index) => (
                <span key={index} className="credential">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z" />
                  </svg>
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
