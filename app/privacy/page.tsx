export const metadata = { title: 'Politica de privacidad' }
export default function Page() {
  return (
    <div className="px-6 py-20 max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-black mb-4">Politica de privacidad</h1>
      <p className="text-white/60">Ultima actualizacion: {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <h2 className="text-2xl font-bold mt-8">1. Informacion que recopilamos</h2>
      <p className="text-white/80">Correo electronico, numero de telefono, preferencias deportivas, historial de uso, informacion tecnica del dispositivo.</p>
      <h2 className="text-2xl font-bold mt-8">2. Como usamos tu informacion</h2>
      <p className="text-white/80">Para personalizar las recomendaciones del Profe, mantener tu cuenta segura, y mejorar nuestro servicio.</p>
      <h2 className="text-2xl font-bold mt-8">3. Con quien la compartimos</h2>
      <p className="text-white/80">No vendemos tu informacion. Compartimos datos limitados con proveedores de servicio bajo contratos de confidencialidad.</p>
      <h2 className="text-2xl font-bold mt-8">4. Tus derechos</h2>
      <p className="text-white/80">Puedes acceder, corregir y eliminar tu informacion en cualquier momento escribiendo a <a href="mailto:privacy@miprofe.app" className="text-profe-green underline">privacy@miprofe.app</a>.</p>
      <h2 className="text-2xl font-bold mt-8">5. Menores de edad</h2>
      <p className="text-white/80">El Profe es solo +18. No recopilamos informacion de menores de edad.</p>
      <h2 className="text-2xl font-bold mt-8">6. Contacto</h2>
      <p className="text-white/80"><a href="mailto:privacy@miprofe.app" className="text-profe-green underline">privacy@miprofe.app</a></p>
    </div>
  )
}
