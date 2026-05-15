export const metadata = { title: 'Términos de servicio' }
export default function Page() {
  return (
    <div className="px-6 py-20 max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-black mb-4">Términos de servicio</h1>
      <p className="text-white/60">Última actualización: {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <h2 className="text-2xl font-bold mt-8">1. Edad mínima</h2>
      <p className="text-white/80">Debes tener al menos 18 años para usar El Profe.</p>
      <h2 className="text-2xl font-bold mt-8">2. Naturaleza del servicio</h2>
      <p className="text-white/80">El Profe es una plataforma de <strong>análisis deportivo y entretenimiento</strong>. Las fichas virtuales <strong>no tienen valor monetario</strong>, no se pueden canjear por dinero, ni retirar, ni transferir. El Profe no es una plataforma de apuestas reales.</p>
      <h2 className="text-2xl font-bold mt-8">3. Análisis y recomendaciones</h2>
      <p className="text-white/80">Los análisis del Profe son opiniones informadas basadas en datos estadísticos. No garantizamos resultados.</p>
      <h2 className="text-2xl font-bold mt-8">4. Conducta del usuario</h2>
      <p className="text-white/80">No puedes usar El Profe para infringir leyes, suplantar identidades, enviar spam, ni manipular las fichas virtuales.</p>
      <h2 className="text-2xl font-bold mt-8">5. Ley aplicable</h2>
      <p className="text-white/80">Estos términos se rigen por las leyes del estado de California, Estados Unidos.</p>
      <h2 className="text-2xl font-bold mt-8">6. Contacto</h2>
      <p className="text-white/80"><a href="mailto:soporte@miprofe.app" className="text-profe-green underline">soporte@miprofe.app</a></p>
    </div>
  )
}
