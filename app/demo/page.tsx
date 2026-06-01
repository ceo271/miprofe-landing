"use client"

import { useState } from "react"
import Link from "next/link"
import { MATCHES, STREAK_DAYS, type Match } from "./data"
import { useDemo } from "./DemoContext"

export default function HoyPage() {
  const { onboarded } = useDemo()
  return (
    <div className="pb-8">
      {!onboarded && <OnboardingSheet />}
      <ColdStartBanner />
      <StreakMini />
      <div className="px-4 pt-1">
        <h1 className="text-2xl font-black mb-1">Tu jornada de hoy</h1>
        <p className="text-sm text-white/50 mb-4">El Profe ya revisó los partidos. Tú decides.</p>
      </div>
      <JornadaTimeline />
      <div className="space-y-4 px-4">
        {MATCHES.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
      <p className="text-center text-[10px] text-white/30 mt-8 px-6">
        Ejemplos ilustrativos. Fichas virtuales sin valor monetario. Ningún pronóstico garantiza un resultado. +18 · Juega responsablemente.
      </p>
    </div>
  )
}

function JornadaTimeline() {
  const points = [
    { time: "08:00", label: "Briefing", icon: "☀️", state: "done" as const },
    { time: "13:00", label: "Alineaciones", icon: "📋", state: "done" as const },
    { time: "Ahora", label: "Brasil-España", icon: "🔴", state: "live" as const },
    { time: "21:00", label: "México-Arg", icon: "⚽", state: "next" as const },
    { time: "23:30", label: "Resumen", icon: "🌙", state: "upcoming" as const },
  ]
  return (
    <div className="px-4 mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-white/70">El Profe te acompaña todo el día</span>
        <span className="text-[10px] text-white/35">5 momentos</span>
      </div>
      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
        {points.map((p, i) => {
          const content = (
            <div className="flex flex-col items-center gap-1 flex-shrink-0 w-[68px]">
              <div className="flex items-center w-full">
                <div className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : p.state === "upcoming" ? "bg-white/10" : "bg-profe-green/50"}`} />
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                    p.state === "live"
                      ? "bg-profe-red/20 border-2 border-profe-red anim-live"
                      : p.state === "done"
                      ? "bg-profe-green/20 border border-profe-green/40"
                      : p.state === "next"
                      ? "bg-profe-gold/15 border border-profe-gold/40"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  {p.icon}
                </div>
                <div className={`h-0.5 flex-1 ${i === points.length - 1 ? "opacity-0" : p.state === "done" ? "bg-profe-green/50" : "bg-white/10"}`} />
              </div>
              <span className={`text-[9px] font-semibold ${p.state === "live" ? "text-profe-red" : "text-white/55"}`}>{p.time}</span>
              <span className="text-[8px] text-white/40 text-center leading-tight">{p.label}</span>
            </div>
          )
          return p.state === "live" ? (
            <Link key={i} href="/demo/vivo">{content}</Link>
          ) : (
            <div key={i}>{content}</div>
          )
        })}
      </div>
    </div>
  )
}

function OnboardingSheet() {
  const { completeOnboarding } = useDemo()
  const [step, setStep] = useState(0)
  const [team, setTeam] = useState<string | null>(null)
  const [leagues, setLeagues] = useState<string[]>([])
  const teams = ["🇲🇽 México", "🇦🇷 Argentina", "🇧🇷 Brasil", "🇪🇸 España", "🇫🇷 Francia", "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra"]
  const ligas = ["Mundial 2026", "Liga MX", "Premier League", "LaLiga", "Champions"]

  function toggleLeague(l: string) {
    setLeagues((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70">
      <div className="w-full max-w-[420px] bg-profe-black border-t border-white/15 rounded-t-3xl p-6 anim-slide">
        {/* progreso */}
        <div className="flex gap-1.5 mb-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-profe-green" : "bg-white/10"}`} />
          ))}
        </div>

        {step === 0 && (
          <>
            <h2 className="text-xl font-black mb-1">¡Bienvenido al equipo! 🎓</h2>
            <p className="text-sm text-white/60 mb-4">Dime tu selección y El Profe arma tu jornada a tu medida.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {teams.map((t) => (
                <button
                  key={t}
                  onClick={() => setTeam(t)}
                  className={`text-sm px-3 py-2 rounded-xl border ${
                    team === t ? "bg-profe-green/15 border-profe-green/50 text-profe-green" : "bg-white/5 border-white/10 text-white/75"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              disabled={!team}
              onClick={() => setStep(1)}
              className={`w-full py-3 rounded-xl text-sm font-bold ${team ? "bg-profe-green text-black" : "bg-white/5 text-white/30"}`}
            >
              Siguiente
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-xl font-black mb-1">¿Qué ligas sigues?</h2>
            <p className="text-sm text-white/60 mb-4">Para mandarte solo los partidos que te importan.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {ligas.map((l) => (
                <button
                  key={l}
                  onClick={() => toggleLeague(l)}
                  className={`text-sm px-3 py-2 rounded-xl border ${
                    leagues.includes(l) ? "bg-profe-blue/15 border-profe-blue/50 text-profe-blue" : "bg-white/5 border-white/10 text-white/75"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl text-sm font-bold bg-profe-green text-black">
              Siguiente
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-black mb-1">¿Cómo le entras?</h2>
            <p className="text-sm text-white/60 mb-4">No te preocupes, lo puedes cambiar cuando quieras.</p>
            <div className="space-y-2 mb-6">
              <button
                onClick={() => completeOnboarding(team!)}
                className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-profe-green/40"
              >
                <div className="font-bold text-sm">🤝 Con El Profe</div>
                <div className="text-xs text-white/55">Sigo sus picks y aprendo de su lectura.</div>
              </button>
              <button
                onClick={() => completeOnboarding(team!)}
                className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-profe-copper/40"
              >
                <div className="font-bold text-sm">😎 A mi manera</div>
                <div className="text-xs text-white/55">Me gusta llevarle la contraria y demostrarle.</div>
              </button>
            </div>
            <p className="text-center text-xs text-profe-green font-semibold">Termina y recibe +500 fichas para empezar 🪙</p>
          </>
        )}
        <p className="text-center text-[10px] text-white/30 mt-4">Fichas virtuales sin valor monetario · +18</p>
      </div>
    </div>
  )
}

function ColdStartBanner() {
  const { addChips } = useDemo()
  const [claimed, setClaimed] = useState(false)
  return (
    <div className="m-4 mb-3 rounded-2xl bg-gradient-to-br from-profe-green/20 to-profe-blue/5 border border-profe-green/30 p-4">
      <p className="text-sm font-semibold mb-1">🔥 Lo que todos apuestan hoy</p>
      <p className="text-xs text-white/60 mb-3">
        5,890 personas ya pusieron fichas en <b className="text-white">Brasil vs España</b>. No te quedes fuera.
      </p>
      <button
        disabled={claimed}
        onClick={() => {
          if (claimed) return
          setClaimed(true)
          addChips(300, "¡+300 fichas del bono de hoy!")
        }}
        className={`w-full py-2.5 rounded-xl text-sm font-bold transition ${
          claimed ? "bg-white/5 text-white/40" : "bg-profe-green text-black"
        }`}
      >
        {claimed ? "✓ Bono de hoy reclamado" : "Reclama el bono de hoy (+300)"}
      </button>
    </div>
  )
}

function StreakMini() {
  return (
    <Link href="/demo/perfil" className="flex items-center gap-2 mx-4 mb-4 overflow-x-auto no-scrollbar">
      {STREAK_DAYS.map((d) => (
        <div key={d.day} className="flex flex-col items-center gap-1 flex-shrink-0">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
              d.done
                ? "bg-profe-green text-black"
                : d.milestone
                ? "bg-profe-gold/20 border border-profe-gold/40 text-profe-gold"
                : "bg-white/5 text-white/40"
            }`}
          >
            {d.done ? "✓" : d.milestone ? "🎁" : d.day}
          </div>
          <span className="text-[9px] text-white/40">D{d.day}</span>
        </div>
      ))}
    </Link>
  )
}

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 75 ? "bg-profe-green" : value >= 60 ? "bg-profe-gold" : "bg-profe-copper"
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-bold tabular-nums">{value}%</span>
    </div>
  )
}

function MatchCard({ match }: { match: Match }) {
  const { placeBet, addChips } = useDemo()
  const [showFactors, setShowFactors] = useState(false)
  const [side, setSide] = useState<"profe" | "contra" | null>(null)
  const [placed, setPlaced] = useState<{ stake: number; side: "profe" | "contra" } | null>(null)
  const [settled, setSettled] = useState<null | { won: boolean; payout: number }>(null)

  const live = match.status === "live"

  function confirm(stake: number) {
    if (!side) return
    placeBet({ matchId: match.id, label: match.profePick, stake, side })
    setPlaced({ stake, side })
    setSide(null)
  }

  function settle() {
    if (!placed) return
    // Resultado honesto: si fuiste con el Profe, ganas con su nivel de confianza.
    const profeHits = Math.random() * 100 < match.profeConfidence
    const won = placed.side === "profe" ? profeHits : !profeHits
    const payout = won ? Math.round(placed.stake * 1.85) : 0
    setSettled({ won, payout })
    if (won) addChips(payout, placed.side === "contra" ? "¡Le ganaste al Profe!" : "¡El Profe la pegó!")
  }

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden anim-slide">
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="text-[10px] text-white/40">{match.stage}</span>
        {match.trending && <span className="text-[10px] text-profe-copper font-semibold">🔥 Popular</span>}
      </div>

      {/* Equipos */}
      <div className="flex items-center justify-between px-6 py-4">
        <Team flag={match.home.flag} name={match.home.name} />
        <div className="text-center">
          {live && match.score ? (
            <>
              <div className="text-2xl font-black tabular-nums">
                {match.score[0]}-{match.score[1]}
              </div>
              <div className="text-[10px] text-profe-red font-bold anim-live">● {match.minute}&apos;</div>
            </>
          ) : (
            <>
              <div className="text-white/30 font-bold">VS</div>
              <div className="text-[10px] text-profe-green mt-1">{match.kickoff}</div>
            </>
          )}
        </div>
        <Team flag={match.away.flag} name={match.away.name} />
      </div>

      {/* Pick del Profe */}
      <div className="mx-4 mb-3 rounded-2xl bg-profe-copper/10 border border-profe-copper/25 p-3">
        <div className="flex items-center gap-2 mb-2">
          <img src="/profe-icon.png" alt="" className="w-5 h-5 rounded-full" />
          <span className="text-xs font-semibold text-profe-copper">El Profe ve valor en:</span>
        </div>
        <p className="font-bold text-sm mb-2">{match.profePick}</p>
        <ConfidenceBar value={match.profeConfidence} />
        <button
          onClick={() => setShowFactors((s) => !s)}
          className="text-[11px] text-white/50 mt-2 hover:text-white/80"
        >
          {showFactors ? "▲ Ocultar análisis" : "▼ Ver el análisis de 5 factores"}
        </button>
        {showFactors && (
          <div className="mt-3 space-y-2 anim-slide">
            {match.factors.map((f) => (
              <FactorRow key={f.label} f={f} home={match.home.name} away={match.away.name} />
            ))}
            <p className="text-[11px] text-white/55 leading-relaxed pt-1">{match.reasoning}</p>
          </div>
        )}
      </div>

      <div className="px-4 pb-3 flex items-center justify-between text-[11px] text-white/40">
        <span>🎯 {match.playersBetting.toLocaleString()} jugando ahora</span>
        {live && (
          <Link href="/demo/vivo" className="text-profe-red font-semibold">
            Ver en vivo →
          </Link>
        )}
      </div>

      {/* Acción */}
      <div className="border-t border-white/5 p-4">
        {settled ? (
          <SettledView settled={settled} side={placed!.side} />
        ) : placed ? (
          <div className="text-center">
            <p className="text-sm text-white/70 mb-3">
              Apostaste <b className="text-profe-green">{placed.stake} fichas</b>{" "}
              {placed.side === "profe" ? "con El Profe" : "contra El Profe"}.
            </p>
            <button
              onClick={settle}
              className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-bold hover:bg-white/15"
            >
              Simular resultado ▶
            </button>
          </div>
        ) : side ? (
          <StakePicker side={side} onConfirm={confirm} onCancel={() => setSide(null)} />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSide("profe")}
              className="py-3 rounded-xl bg-profe-green text-black text-sm font-bold"
            >
              Le entro igual
            </button>
            <button
              onClick={() => setSide("contra")}
              className="py-3 rounded-xl bg-white/5 border border-white/20 text-sm font-bold"
            >
              Yo digo otra cosa
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Team({ flag, name }: { flag: string; name: string }) {
  return (
    <div className="text-center flex-1">
      <div className="text-3xl mb-1">{flag}</div>
      <div className="text-xs font-semibold">{name}</div>
    </div>
  )
}

function FactorRow({ f, home, away }: { f: { label: string; home: number; away: number }; home: string; away: string }) {
  const total = f.home + f.away
  return (
    <div>
      <div className="flex justify-between text-[10px] text-white/40 mb-0.5">
        <span>{f.label}</span>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden bg-white/10">
        <div className="bg-profe-green" style={{ width: `${(f.home / total) * 100}%` }} />
        <div className="bg-profe-blue" style={{ width: `${(f.away / total) * 100}%` }} />
      </div>
    </div>
  )
}

function StakePicker({
  side,
  onConfirm,
  onCancel,
}: {
  side: "profe" | "contra"
  onConfirm: (stake: number) => void
  onCancel: () => void
}) {
  const [stake, setStake] = useState(250)
  return (
    <div className="anim-slide">
      <p className="text-xs text-white/60 mb-2 text-center">
        Apostando <b className={side === "profe" ? "text-profe-green" : "text-profe-copper"}>
          {side === "profe" ? "con El Profe" : "contra El Profe"}
        </b>
      </p>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {[100, 250, 500, 1000].map((v) => (
          <button
            key={v}
            onClick={() => setStake(v)}
            className={`py-2 rounded-lg text-xs font-bold ${
              stake === v ? "bg-profe-green text-black" : "bg-white/5 text-white/70"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={onCancel} className="px-4 py-2.5 rounded-xl bg-white/5 text-xs font-semibold text-white/60">
          ✕
        </button>
        <button
          onClick={() => onConfirm(stake)}
          className="flex-1 py-2.5 rounded-xl bg-profe-green text-black text-sm font-bold"
        >
          Poner {stake} fichas
        </button>
      </div>
    </div>
  )
}

function SettledView({ settled, side }: { settled: { won: boolean; payout: number }; side: "profe" | "contra" }) {
  return (
    <div className="text-center relative">
      {settled.won && (
        <div className="absolute inset-x-0 -top-2 flex justify-center pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="anim-float text-xl absolute"
              style={{ left: `${30 + i * 12}%`, animationDelay: `${i * 0.08}s` }}
            >
              🪙
            </span>
          ))}
        </div>
      )}
      <div className={`anim-chip text-lg font-black mb-1 ${settled.won ? "text-profe-green" : "text-white/60"}`}>
        {settled.won
          ? side === "contra"
            ? "¡Le ganaste al Profe! 🏆"
            : "¡La pegaron juntos! 🎯"
          : "Esta vez no se dio 🤝"}
      </div>
      <p className="text-xs text-white/50">
        {settled.won ? `Ganaste +${settled.payout} fichas` : "El Profe también pierde a veces. Mañana hay revancha."}
      </p>
    </div>
  )
}
