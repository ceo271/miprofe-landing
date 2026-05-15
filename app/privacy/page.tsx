export const metadata = { title: 'Política de privacidad' }
export default function Page() {
  return (
    <div className="px-6 py-20 max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-black mb-4">Política de privacidad</h1>
      <p className="text-white/60">Última actualización: {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <h2 className="text-2xl font-bold mt-8">1. Información que recopilamos</h2>
      <p className="text-white/80">Correo electrónico, número de teléfono, preferencias deportivas, historial de uso, información técnica del dispositivo.</p>
      <h2 className="text-2xl font-bold mt-8">2. Cómo usamos tu información</h2>
      <p className="text-white/80">Para personalizar las recomendaciones del Profe, mantener tu cuenta segura, y mejorar nuestro servicio.</p>
      <h2 className="text-2xl font-bold mt-8">3. Con quién la compartimos</h2>
      <p className="text-white/80">No vendemos tu información. Compartimos datos limitados con proveedores de servicio bajo contratos de confidencialidad.</p>
      <h2 className="text-2xl font-bold mt-8">4. Tus derechos</h2>
      <p className="text-white/80">Puedes acceder, corregir y eliminar tu información en cualquier momento escribiendo a <a href="mailto:privacy@miprofe.app" className="text-profe-green underline">privacy@miprofe.app</a>.</p>
      <h2 className="text-2xl font-bold mt-8">5. Menores de edad</h2>
      <p className="text-white/80">El Profe es solo +18. No recopilamos información de menores de edad.</p>
      <h2 className="text-2xl font-bold mt-8">6. Contacto</h2>
      <p className="text-white/80"><a href="mailto:privacy@miprofe.app" className="text-profe-green underline">privacy@miprofe.app</a></p>
    </div>
  )
}
