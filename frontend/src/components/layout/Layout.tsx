import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from '../common/WhatsAppButton'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default Layout
