import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'El Profe - Tu companero de analisis deportivo',
  description: 'El Profe te acompana durante cada partido con analisis, predicciones y un sistema de fichas virtuales. Solo para mayores de 18 anos. Entretenimiento.',
  icons: { icon: '/profe-icon.png', apple: '/profe-icon.png' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body className="bg-profe-black text-white antialiased min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 py-12 px-6 text-sm text-white/60">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/profe-icon.png" alt="El Profe" className="w-8 h-8 rounded-full" />
            <span className="text-white font-semibold">El Profe</span>
          </div>
          <p>Tu companero de analisis deportivo. Solo +18.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/privacy" className="hover:text-white">Politica de privacidad</a></li>
            <li><a href="/terms" className="hover:text-white">Terminos de servicio</a></li>
            <li><a href="/responsible-gambling" className="hover:text-white">Juego responsable</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Explora</h3>
          <ul className="space-y-2">
            <li><a href="/como-funciona" className="hover:text-white">Como funciona</a></li>
            <li><a href="/el-profe" className="hover:text-white">Conoce al Profe</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
        <p>Copyright {new Date().getFullYear()} El Profe. Todos los derechos reservados.</p>
        <p className="text-profe-gold">Solo entretenimiento. Juega responsablemente. +18</p>
      </div>
    </footer>
  )
}
