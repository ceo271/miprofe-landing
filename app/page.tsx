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
              <a href="/como-funciona" className="text-white/70 hover:text-white">Cómo funciona</a>
              <a href="#reto" className="text-white/70 hover:text-white">El reto</a>
              <a href="/el-profe" className="text-white/70 hover:text-white">Conoce al Profe</a>
              <a href="/demo" className="text-profe-green hover:text-profe-green/80 font-semibold">Probar demo</a>
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
                <span className="text-profe-green">Tu análisis.</span><br/>
                Cada partido.
              </h1>
              <p className="text-lg text-white/70 mb-8 max-w-lg">
                El Profe te acompaña en cada jornada deportiva. Análisis honestos, predicciones con ventajas reales, y un sistema de fichas virtuales para que practiques sin riesgo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://profe.bet" target="_blank" rel="noopener noreferrer" className="bg-profe-green hover:bg-profe-green/90 text-black px-6 py-3 rounded-lg font-semibold text-center transition">
                  Pon tu primera ficha gratis
                </a>
                <button className="bg-white/5 border border-white/20 text-white/50 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">Próximamente en Google Play</button>
              </div>
              <p className="text-sm text-white/50 mt-4">Regístrate en segundos y recibe <span className="text-profe-green font-semibold">1,000 fichas</span>. Tu primera predicción te espera.</p>
              <p className="text-xs text-white/40 mt-3">+18 | Solo entretenimiento | Fichas virtuales sin valor monetario</p>
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
          <h2 className="text-4xl font-bold mb-4 text-center">¿Qué hace El Profe por ti?</h2>
          <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">Todo el conocimiento de un veterano del deporte, disponible 24/7 en tu bolsillo.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature title="Análisis diarios" body="Cada día El Profe revisa los partidos y te dice dónde ve valor. Sin rodeos, en español claro." />
            <Feature title="Fichas virtuales" body="Practica sin arriesgar un peso. Empieza con 1,000 fichas al registrarte y sube en la clasificación." />
            <Feature title="Habla con El Profe" body="Pregúntale lo que quieras. Tiene datos que otros no tienen y te los explica como a un cuate." />
          </div>
        </div>
      </section>

      {/* El reto: ¿Le ganas al Profe? — predicción + ficha + resultado compartible */}
      <section id="reto" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-profe-copper/10 border border-profe-copper/30 text-profe-copper text-xs font-semibold mb-6">
                El reto del Mundial
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">¿Eres mejor que<br/><span className="text-profe-copper">El Profe?</span></h2>
              <p className="text-lg text-white/70 mb-6">
                Cada partido, El Profe suelta su pronóstico. Tú decides si le entras igual o si lo contradices. Pones tus fichas, esperas el silbatazo final, y ves quién la pegó.
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex gap-3"><span className="text-profe-copper font-bold">1.</span> Mira el pronóstico del Profe y su nivel de confianza.</li>
                <li className="flex gap-3"><span className="text-profe-copper font-bold">2.</span> Pon tus fichas: con él o contra él.</li>
                <li className="flex gap-3"><span className="text-profe-copper font-bold">3.</span> Gana, presume tu tarjeta de resultado y sube de nivel.</li>
              </ul>
              <p className="text-xs text-white/40 mt-6">Las predicciones son entretenimiento. Las fichas no tienen valor monetario. +18. Juega responsablemente.</p>
            </div>
            <PredictionCard />
          </div>
        </div>
      </section>

      {/* Racha diaria + ritual de día de partido */}
      <section className="px-6 py-20 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Vuelve cada día. La racha cuenta.</h2>
          <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">El Profe te avisa antes de cada partido y te premia por no fallar un día.</p>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <StreakStrip />
            <div className="space-y-6">
              <Bullet title="Tu briefing diario" body="Cada mañana, El Profe deja listos los partidos del día. Un toque y ya sabes dónde ve valor." />
              <Bullet title="Aviso antes del silbatazo" body="Te recordamos justo antes de cada partido para que no se te pase poner tu ficha." />
              <Bullet title="Premios por racha" body="Entra 7, 14 y 30 días seguidos y desbloquea bonos de fichas cada vez más grandes. La racha es tuya: no la rompas." />
            </div>
          </div>
        </div>
      </section>

      {/* Clasificaciones múltiples */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Hay más de una forma de ser el mejor</h2>
          <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">No solo cuenta quién tiene más fichas. Compite donde tú eres bueno.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <Leaderboard
              title="Más aciertos"
              accent="text-profe-green"
              rows={[["1", "Carlos_MX", "84%"], ["2", "LaDoña", "81%"], ["3", "Tú", "—"]]}
              foot="Quién la pega más seguido."
            />
            <Leaderboard
              title="Mejor racha"
              accent="text-profe-gold"
              rows={[["1", "ElTío_Beto", "23 🔥"], ["2", "Paty99", "19 🔥"], ["3", "Tú", "—"]]}
              foot="Días seguidos sin fallar."
            />
            <Leaderboard
              title="Top de la semana"
              accent="text-profe-blue"
              rows={[["1", "Regio_23", "+12,400"], ["2", "Chiva4Ever", "+9,850"], ["3", "Tú", "—"]]}
              foot="Se reinicia cada lunes. Todos empiezan parejos."
            />
          </div>
          <p className="text-center text-white/50 text-sm mt-8">Cada semana el marcador vuelve a cero. Siempre hay una clasificación a tu alcance.</p>
        </div>
      </section>

      {/* Historial público — honestidad como producto */}
      <section className="px-6 py-20 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Honesto contigo.</h2>
          <p className="text-lg text-white/70 mb-4">El Profe no te promete ganar siempre. A veces se equivoca, y cuando pasa, lo reconoce.</p>
          <p className="text-lg text-white/70 mb-10">Por eso su historial es público. Aciertos y fallos, a la vista de todos.</p>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Stat n="68%" label="Aciertos últimos 30 días" accent="text-profe-green" />
            <Stat n="Público" label="Historial completo" accent="text-white" />
            <Stat n="Sin filtros" label="También cuenta los fallos" accent="text-profe-red" />
          </div>
          <p className="text-xs text-white/40 mt-8">Las estadísticas mostradas son ilustrativas. Ningún pronóstico garantiza un resultado. +18.</p>
        </div>
      </section>

      {/* Invita a tus cuates — recompensa para los dos */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-profe-green/15 via-profe-blue/5 to-transparent border border-profe-green/20 rounded-3xl p-10 text-center">
            <h2 className="text-4xl font-bold mb-4">Trae a tus cuates</h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">Invita a un cuate y <span className="text-profe-green font-semibold">los dos reciben fichas</span>. Y cuando tu cuate se enganche y empiece a poner sus predicciones, te caen fichas extra.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-3 bg-profe-black/50 border border-white/10 rounded-xl px-5 py-3">
                <span className="text-2xl">🎁</span>
                <span className="text-white/80 text-left text-sm">Tú y tu cuate:<br/><span className="text-profe-green font-semibold">+500 fichas cada uno</span></span>
              </div>
              <span className="text-white/30">+</span>
              <div className="flex items-center gap-3 bg-profe-black/50 border border-white/10 rounded-xl px-5 py-3">
                <span className="text-2xl">🔥</span>
                <span className="text-white/80 text-left text-sm">Si tu cuate sigue jugando:<br/><span className="text-profe-gold font-semibold">bono extra para ti</span></span>
              </div>
            </div>
            <p className="text-xs text-white/40 mt-8">Las fichas son virtuales, sin valor monetario y no canjeables por dinero. +18.</p>
          </div>
        </div>
      </section>

      {/* Demo interactivo */}
      <section className="px-6 py-20 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-profe-green/10 border border-profe-green/30 text-profe-green text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-profe-green animate-pulse" />
            Demo en vivo · sin registro
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-5">Pruébalo ahora mismo</h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Entra al demo interactivo: pon fichas con o contra El Profe, métete al salón en vivo de un partido, rétalo en el chat y sube en las clasificaciones. Todo en tu navegador.
          </p>
          <a href="/demo" className="inline-block bg-profe-green hover:bg-profe-green/90 text-black px-8 py-4 rounded-lg font-bold text-lg transition">
            Abrir el demo →
          </a>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-10 text-left">
            {[
              ["🏠", "Hoy", "Picks del día"],
              ["🔴", "En Vivo", "Salón + apuestas relámpago"],
              ["🎓", "El Profe", "Chat con memoria"],
              ["👥", "Comunidad", "Picks de la banda"],
              ["🏆", "Perfil", "Rachas y rankings"],
            ].map(([icon, title, sub]) => (
              <div key={title} className="bg-profe-black/50 border border-white/10 rounded-xl p-4">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-sm font-bold">{title}</div>
                <div className="text-xs text-white/50">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">El próximo partido ya viene.</h2>
          <p className="text-lg text-white/70 mb-8">Regístrate gratis, recibe tus 1,000 fichas y pon tu primera predicción hoy.</p>
          <a href="https://profe.bet" target="_blank" rel="noopener noreferrer" className="inline-block bg-profe-green hover:bg-profe-green/90 text-black px-8 py-4 rounded-lg font-bold text-lg transition">
            Pon tu primera ficha gratis
          </a>
          <p className="text-xs text-white/40 mt-4">+18 | Solo entretenimiento | Juega responsablemente</p>
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

function Bullet({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-profe-green" />
      <div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-white/60">{body}</p>
      </div>
    </div>
  )
}

function PredictionCard() {
  return (
    <div className="bg-profe-black/60 border border-white/10 rounded-3xl p-6 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs text-white/40">Mundial 2026 · Grupo C</span>
        <span className="text-xs text-profe-green">En 2h 14m</span>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <div className="w-12 h-12 rounded-full bg-profe-green/20 mx-auto mb-2 flex items-center justify-center text-xl">🇲🇽</div>
          <span className="font-semibold text-sm">México</span>
        </div>
        <span className="text-white/30 text-lg font-bold">VS</span>
        <div className="text-center flex-1">
          <div className="w-12 h-12 rounded-full bg-profe-blue/20 mx-auto mb-2 flex items-center justify-center text-xl">🇦🇷</div>
          <span className="font-semibold text-sm">Argentina</span>
        </div>
      </div>
      <div className="bg-profe-copper/10 border border-profe-copper/30 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <img src="/profe-icon.png" alt="El Profe" className="w-6 h-6 rounded-full" />
          <span className="text-sm font-semibold text-profe-copper">El Profe ve valor en:</span>
        </div>
        <p className="text-white/90 font-semibold">Empate o México · Confianza 72%</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-profe-green text-black py-3 rounded-lg font-semibold text-sm">Le entro igual</button>
        <button className="bg-white/5 border border-white/20 text-white py-3 rounded-lg font-semibold text-sm">Yo digo otra cosa</button>
      </div>
      <p className="text-[10px] text-white/30 mt-4 text-center">Ejemplo ilustrativo. Fichas virtuales sin valor monetario. +18.</p>
    </div>
  )
}

function StreakStrip() {
  const days = [
    { d: "L", done: true, reward: "" },
    { d: "M", done: true, reward: "" },
    { d: "M", done: true, reward: "" },
    { d: "J", done: true, reward: "" },
    { d: "V", done: true, reward: "" },
    { d: "S", done: false, reward: "" },
    { d: "D", done: false, reward: "+1,000" },
  ]
  return (
    <div className="bg-profe-black/60 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-5">
        <span className="font-semibold">Tu racha</span>
        <span className="text-profe-gold font-bold">5 días 🔥</span>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((day, i) => (
          <div key={i} className="text-center">
            <div className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold mb-1 ${day.done ? "bg-profe-green text-black" : day.reward ? "bg-profe-gold/20 border border-profe-gold/40 text-profe-gold" : "bg-white/5 text-white/40"}`}>
              {day.done ? "✓" : day.reward ? "🎁" : day.d}
            </div>
            <span className="text-[10px] text-white/40">{day.reward || day.d}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-white/50">Día 7: bono grande de fichas. Días 14 y 30: premios aún mayores. No rompas la racha.</p>
    </div>
  )
}

function Leaderboard({ title, accent, rows, foot }: { title: string; accent: string; rows: string[][]; foot: string }) {
  return (
    <div className="bg-profe-black/50 border border-white/10 rounded-2xl p-6">
      <h3 className={`text-lg font-bold mb-4 ${accent}`}>{title}</h3>
      <ul className="space-y-3 mb-4">
        {rows.map((r, i) => (
          <li key={i} className={`flex items-center justify-between text-sm ${r[1] === "Tú" ? "text-white font-semibold" : "text-white/70"}`}>
            <span className="flex items-center gap-3">
              <span className={`w-6 text-center ${i === 0 ? "text-profe-gold" : "text-white/40"}`}>{r[0]}</span>
              {r[1]}
            </span>
            <span className={r[1] === "Tú" ? "text-white/40" : accent}>{r[2]}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-white/40 border-t border-white/5 pt-3">{foot}</p>
    </div>
  )
}

function Stat({ n, label, accent }: { n: string; label: string; accent: string }) {
  return (
    <div className="bg-profe-black/50 border border-white/10 rounded-2xl p-5">
      <div className={`text-2xl md:text-3xl font-black mb-1 ${accent}`}>{n}</div>
      <div className="text-xs text-white/50">{label}</div>
    </div>
  )
}
