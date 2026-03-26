import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/common/WhatsAppButton'
import './globals.css'

export const metadata: Metadata = {
  title: 'María José Solorza Salas - Asesoría Legal Profesional',
  description: 'Asesoría legal integral en derecho de familia, contratos, laboral, inmobiliario y sucesiones. Servicio personalizado y confiable en Santiago, Chile.',
  keywords: ['abogada', 'asesoría legal', 'derecho de familia', 'contratos', 'derecho laboral', 'Santiago', 'Chile'],
  authors: [{ name: 'María José Solorza Salas' }],
  openGraph: {
    title: 'María José Solorza Salas - Asesoría Legal Profesional',
    description: 'Asesoría legal integral en derecho de familia, contratos, laboral, inmobiliario y sucesiones.',
    type: 'website',
    locale: 'es_CL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
