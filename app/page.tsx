export default function Home() {
  return (
    <div>
      <section className="relative px-6 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-profe-green/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3">
              <img src="/profe-icon.png" alt="El Profe" className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold">El Profe</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="/como-funciona" className="text-white/70 hover:text-white">Como funciona</a>
              <a href="/el-profe" className="text-white/70 hover:text-white">Conoce al Profe</a>
            </div>
          </nav>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-profe-green/10 border border-profe-green/30 text-profe-green text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-profe-green animate-pulse" />
                Listo para el Mundial 2026
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                Tu profe.<br/>
                <span className="text-profe-green">Tu analisis.</span><br/>
                Cada partido.
              </h1>
              <p className="text-lg text-white/70 mb-8 max-w-lg">
                El Profe te acompana en cada jornada deportiva. Analisis honestos, predicciones con ventajas reales, y un sistema de fichas virtuales para que practiques sin riesgo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white/5 border border-white/20 text-white/50 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">Proximamente en Google Play</button>
                <a href="https://profe.bet" target="_blank" rel="noopener noreferrer" className="bg-profe-green hover:bg-profe-green/90 text-black px-6 py-3 rounded-lg font-semibold text-center transition">Abrir version web</a>
              </div>
              <p className="text-xs text-white/40 mt-4">+18 | Solo entretenimiento | Fichas virtuales sin valor monetario</p>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-profe-green/20 via-profe-blue/10 to-profe-copper/20 rounded-3xl p-8 flex items-center justify-center">
                <img src="/profe-icon.png" alt="El Profe" className="w-full max-w-xs rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 py-20 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Que hace El Profe por ti?</h2>
          <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">Todo el conocimiento de un veterano del deporte, disponible 24/7 en tu bolsillo.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature title="Analisis diarios" body="Cada dia El Profe revisa los partidos y te dice donde ve valor. Sin rodeos, en espanol claro." />
            <Feature title="Fichas virtuales" body="Practica sin arriesgar un peso. Empieza con 1,000 fichas al registrarte y sube en la clasificacion." />
            <Feature title="Habla con El Profe" body="Preguntale lo que quieras. Tiene datos que otros no tienen y te los explica como a un cuate." />
          </div>
        </div>
      </section>
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Honesto contigo.</h2>
          <p className="text-lg text-white/70 mb-4">El Profe no te promete ganar siempre. A veces se equivoca, y cuando pasa, lo reconoce.</p>
          <p className="text-lg text-white/70">Porque esa es la unica manera de darle valor real a lo que si pega.</p>
        </div>
      </section>
    </div>
  )
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-profe-black/50 border border-white/10 rounded-2xl p-6 hover:border-profe-green/30 transition">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/60">{body}</p>
    </div>
  )
}
