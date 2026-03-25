import '../../styles/components/footer.css'

function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} María José Solorza Salas. Todos los derechos reservados.</p>
        <div className="footer__links">
          <a href="/privacidad">Política de Privacidad</a>
          <a href="/terminos">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
