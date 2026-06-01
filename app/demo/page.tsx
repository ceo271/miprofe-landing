"use client"

import { useState } from "react"
import Link from "next/link"
import { MATCHES, STREAK_DAYS, type Match } from "./data"
import { useDemo } from "./DemoContext"

export default function HoyPage() {
  return (
    <div className="pb-8">
      <ColdStartBanner />
      <StreakMini />
      <div className="px-4 pt-1">
        <h1 className="text-2xl font-black mb-1">Tu jornada de hoy</h1>
        <p className="text-sm text-white/50 mb-4">El Profe ya revisó los partidos. Tú decides.</p>
      </div>
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
          addChips(500, "¡+500 fichas de bienvenida!")
        }}
        className={`w-full py-2.5 rounded-xl text-sm font-bold transition ${
          claimed ? "bg-white/5 text-white/40" : "bg-profe-green text-black"
        }`}
      >
        {claimed ? "✓ Bono reclamado" : "Reclama +500 fichas para empezar"}
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
