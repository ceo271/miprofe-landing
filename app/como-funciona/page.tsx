export const metadata = { title: 'Como funciona - El Profe' }
export default function Page() {
  return (
    <div className="px-6 py-20 max-w-4xl mx-auto">
      <h1 className="text-5xl font-black mb-8">Como funciona</h1>
      <div className="space-y-12 text-lg text-white/80">
        <Step n="1" title="Registrate gratis" body="Te damos 1,000 fichas virtuales para que empieces. Las fichas no tienen valor monetario." />
        <Step n="2" title="Revisa los analisis del Profe" body="Cada dia, El Profe publica los partidos donde ve valor." />
        <Step n="3" title="Pon tus fichas" body="Si coincides con El Profe, pones fichas. Si piensas diferente, tambien. Tu decision." />
        <Step n="4" title="Escala en la clasificacion" body="Gana partidos, invita a cuates, sube en el ranking global." />
      </div>
      <div className="mt-16 p-6 bg-profe-gold/10 border border-profe-gold/30 rounded-xl">
        <p className="text-profe-gold font-semibold mb-2">Importante</p>
        <p className="text-white/80">El Profe es una plataforma de entretenimiento. Las fichas virtuales no se pueden convertir en dinero. Solo +18.</p>
      </div>
    </div>
  )
}
function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-profe-green text-black text-2xl font-black flex items-center justify-center">{n}</div>
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  )
}
