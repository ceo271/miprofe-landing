export const metadata = { title: 'Conoce al Profe' }
export default function Page() {
  return (
    <div className="px-6 py-20 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-start mb-12">
        <img src="/profe-icon.png" alt="El Profe" className="w-48 h-48 rounded-2xl" />
        <div>
          <h1 className="text-5xl font-black mb-4">El Profe</h1>
          <p className="text-xl text-white/70 mb-6">Veterano del deporte. Bien informado. Honesto cuando se equivoca.</p>
        </div>
      </div>
      <div className="space-y-6 text-lg text-white/80">
        <p>El Profe no es un oraculo. Es un cuate que lleva anos metido en el deporte y que te cuenta las cosas como son.</p>
        <p>Cuando ve una ventaja, te la dice. Cuando se equivoca, lo reconoce y sigue para adelante.</p>
        <p className="font-semibold text-white">Lo que hace diferente al Profe:</p>
        <ul className="space-y-2 list-disc pl-6">
          <li>Analisis basados en datos reales, no en corazonadas</li>
          <li>Solo recomienda cuando ve valor, no cada partido</li>
          <li>Habla en espanol claro, sin terminos raros</li>
          <li>Muestra su historial publico</li>
        </ul>
      </div>
    </div>
  )
}
