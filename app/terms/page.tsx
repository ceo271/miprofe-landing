export const metadata = { title: 'Terminos de servicio' }
export default function Page() {
  return (
    <div className="px-6 py-20 max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-black mb-4">Terminos de servicio</h1>
      <p className="text-white/60">Ultima actualizacion: {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <h2 className="text-2xl font-bold mt-8">1. Edad minima</h2>
      <p className="text-white/80">Debes tener al menos 18 anos para usar El Profe.</p>
      <h2 className="text-2xl font-bold mt-8">2. Naturaleza del servicio</h2>
      <p className="text-white/80">El Profe es una plataforma de <strong>analisis deportivo y entretenimiento</strong>. Las fichas virtuales <strong>no tienen valor monetario</strong>, no se pueden canjear por dinero, ni retirar, ni transferir. El Profe no es una plataforma de apuestas reales.</p>
      <h2 className="text-2xl font-bold mt-8">3. Analisis y recomendaciones</h2>
      <p className="text-white/80">Los analisis del Profe son opiniones informadas basadas en datos estadisticos. No garantizamos resultados.</p>
      <h2 className="text-2xl font-bold mt-8">4. Conducta del usuario</h2>
      <p className="text-white/80">No puedes usar El Profe para infringir leyes, suplantar identidades, enviar spam, ni manipular las fichas virtuales.</p>
      <h2 className="text-2xl font-bold mt-8">5. Ley aplicable</h2>
      <p className="text-white/80">Estos terminos se rigen por las leyes del estado de California, Estados Unidos.</p>
      <h2 className="text-2xl font-bold mt-8">6. Contacto</h2>
      <p className="text-white/80"><a href="mailto:soporte@miprofe.app" className="text-profe-green underline">soporte@miprofe.app</a></p>
    </div>
  )
}
