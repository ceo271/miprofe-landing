import './globals.css'
import type { Metadata } from 'next'
import SiteFooter from './SiteFooter'

export const metadata: Metadata = {
  title: 'El Profe - Tu compañero de análisis deportivo',
  description: 'El Profe te acompaña durante cada partido con análisis, predicciones y un sistema de fichas virtuales. Solo para mayores de 18 años. Entretenimiento.',
  icons: { icon: '/profe-icon.png', apple: '/profe-icon.png' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body className="bg-profe-black text-white antialiased min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
