"use client"

import { usePathname } from "next/navigation"

export default function SiteFooter() {
  const pathname = usePathname()
  // El demo (/demo) es una maqueta de app: no mostrar el footer de marketing.
  if (pathname?.startsWith("/demo")) return null
  return (
    <footer className="border-t border-white/10 mt-24 py-12 px-6 text-sm text-white/60">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/profe-icon.png" alt="El Profe" className="w-8 h-8 rounded-full" />
            <span className="text-white font-semibold">El Profe</span>
          </div>
          <p>Tu compañero de análisis deportivo. Solo +18.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/privacy" className="hover:text-white">Política de privacidad</a></li>
            <li><a href="/terms" className="hover:text-white">Términos de servicio</a></li>
            <li><a href="/responsible-gambling" className="hover:text-white">Juego responsable</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Explora</h3>
          <ul className="space-y-2">
            <li><a href="/como-funciona" className="hover:text-white">Cómo funciona</a></li>
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
