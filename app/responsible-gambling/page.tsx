export const metadata = { title: 'Juego responsable' }
export default function Page() {
  return (
    <div className="px-6 py-20 max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-black mb-4">Juego responsable</h1>
      <p className="text-lg text-white/80">El Profe es entretenimiento con fichas virtuales. No involucra dinero real. Aun asi, nos importa tu bienestar.</p>
      <h2 className="text-2xl font-bold mt-8">Senales de alerta</h2>
      <ul className="list-disc pl-6 space-y-2 text-white/80">
        <li>Piensas en apostar constantemente</li>
        <li>Sientes ansiedad cuando no puedes usar la plataforma</li>
        <li>Descuidas responsabilidades por la plataforma</li>
        <li>Quieres recuperar una racha perdida a toda costa</li>
      </ul>
      <h2 className="text-2xl font-bold mt-8">Necesitas ayuda?</h2>
      <ul className="list-disc pl-6 space-y-2 text-white/80">
        <li><strong>Mexico - Centros de Integracion Juvenil:</strong> <a href="tel:5552127718" className="text-profe-green underline">55 5212 7718</a></li>
        <li><strong>Jugadores Anonimos Mexico:</strong> <a href="tel:5555436533" className="text-profe-green underline">55 5543 6533</a></li>
        <li><strong>Linea de la Vida (salud mental 24/7):</strong> <a href="tel:8002900024" className="text-profe-green underline">800 290 0024</a></li>
      </ul>
      <p className="text-profe-gold font-semibold mt-8">Solo +18. Si alguien menor tiene acceso, contactanos: <a href="mailto:soporte@miprofe.app" className="text-profe-gold underline">soporte@miprofe.app</a></p>
    </div>
  )
}
