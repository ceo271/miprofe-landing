"use client"

import { useState } from "react"
import { LEADERBOARDS, PROFE_RECORD, STREAK_DAYS } from "../data"
import { useDemo } from "../DemoContext"

export default function PerfilPage() {
  const { chips, streak, bets, copied } = useDemo()
  return (
    <div className="pb-8">
      {/* Cabecera de perfil */}
      <div className="px-4 pt-5 pb-4 text-center bg-gradient-to-b from-profe-green/10 to-transparent">
        <div className="w-20 h-20 rounded-full bg-profe-green/15 border-2 border-profe-green/40 mx-auto flex items-center justify-center text-4xl mb-2">
          😎
        </div>
        <h1 className="text-xl font-black">Tú</h1>
        <MiSeleccion />
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat n={chips.toLocaleString()} label="Fichas" accent="text-profe-green" />
          <Stat n={`${streak} 🔥`} label="Racha" accent="text-profe-gold" />
          <Stat n="71%" label="Aciertos" accent="text-white" />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Stat n={String(bets.length)} label="Apuestas activas" accent="text-profe-blue" />
          <Stat n={String(copied.length)} label="Picks copiados" accent="text-profe-copper" />
        </div>
      </div>

      <StreakCalendar />
      <Achievements />
      <Leaderboards />
      <ProfeRecord />

      <p className="text-center text-[10px] text-white/30 mt-6 px-6">
        Estadísticas ilustrativas. Las fichas son virtuales, sin valor monetario y no canjeables. +18 · Juega responsablemente.
      </p>
    </div>
  )
}

function MiSeleccion() {
  const [team, setTeam] = useState<string | null>("🇲🇽 México")
  const teams = ["🇲🇽 México", "🇦🇷 Argentina", "🇧🇷 Brasil", "🇪🇸 España", "🇫🇷 Francia"]
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/15 rounded-full px-3 py-1 text-white/70"
      >
        {team ? <>Mi selección: <b className="text-white">{team}</b></> : "Elige tu selección"} ▾
      </button>
      {open && (
        <div className="flex flex-wrap justify-center gap-2 mt-2 anim-slide">
          {teams.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTeam(t)
                setOpen(false)
              }}
              className={`text-xs px-2.5 py-1 rounded-full border ${
                team === t ? "bg-profe-green/15 border-profe-green/40 text-profe-green" : "bg-white/5 border-white/10 text-white/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Stat({ n, label, accent }: { n: string; label: string; accent: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl py-2.5">
      <div className={`text-lg font-black ${accent}`}>{n}</div>
      <div className="text-[10px] text-white/45">{label}</div>
    </div>
  )
}

function StreakCalendar() {
  const { addChips, pushToast } = useDemo()
  const [claimed, setClaimed] = useState(false)
  return (
    <div className="px-4 mt-5">
      <h2 className="text-sm font-bold mb-2">Tu racha — no la rompas</h2>
      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
        <div className="grid grid-cols-7 gap-1.5 mb-3">
          {STREAK_DAYS.map((d) => (
            <div key={d.day} className="text-center">
              <div
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold mb-1 ${
                  d.done
                    ? "bg-profe-green text-black"
                    : d.milestone
                    ? "bg-profe-gold/20 border border-profe-gold/40 text-profe-gold"
                    : "bg-white/5 text-white/40"
                }`}
              >
                {d.done ? "✓" : d.milestone ? "🎁" : d.day}
              </div>
              <span className="text-[8px] text-white/40">+{d.reward}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-white/50 mb-3">
          Llevas <b className="text-profe-gold">5 días</b>. Día 7 te da un <b className="text-profe-gold">bono de 1,000 fichas</b>. Los días 14 y 30, premios aún más grandes.
        </p>
        <button
          disabled={claimed}
          onClick={() => {
            setClaimed(true)
            addChips(150, "Recompensa diaria: +150")
            pushToast("¡Día 6 reclamado! Vuelve mañana por el bono grande.")
          }}
          className={`w-full py-2.5 rounded-xl text-sm font-bold ${
            claimed ? "bg-white/5 text-white/40" : "bg-profe-gold text-black"
          }`}
        >
          {claimed ? "✓ Reclamado hoy" : "Reclamar recompensa de hoy (+150)"}
        </button>
      </div>
    </div>
  )
}

function Achievements() {
  const badges = [
    { icon: "🎯", label: "Primera apuesta", got: true },
    { icon: "🔥", label: "Racha de 5", got: true },
    { icon: "🧠", label: "Le ganó al Profe", got: true },
    { icon: "👑", label: "Top 10 semanal", got: false },
    { icon: "💎", label: "Racha de 30", got: false },
    { icon: "📢", label: "Trajo 3 cuates", got: false },
  ]
  return (
    <div className="px-4 mt-5">
      <h2 className="text-sm font-bold mb-2">Logros</h2>
      <div className="grid grid-cols-3 gap-2">
        {badges.map((b) => (
          <div
            key={b.label}
            className={`rounded-xl border p-3 text-center ${
              b.got ? "bg-white/[0.04] border-white/15" : "bg-white/[0.02] border-white/5 opacity-40"
            }`}
          >
            <div className="text-2xl mb-1">{b.icon}</div>
            <div className="text-[9px] text-white/60 leading-tight">{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Leaderboards() {
  const [tab, setTab] = useState<keyof typeof LEADERBOARDS>("aciertos")
  const labels: Record<keyof typeof LEADERBOARDS, string> = {
    aciertos: "Más aciertos",
    racha: "Mejor racha",
    semana: "Top semana",
  }
  return (
    <div className="px-4 mt-6">
      <h2 className="text-sm font-bold mb-2">Clasificaciones</h2>
      <div className="flex gap-2 mb-3">
        {(Object.keys(LEADERBOARDS) as (keyof typeof LEADERBOARDS)[]).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold ${
              tab === k ? "bg-profe-green text-black" : "bg-white/5 text-white/60"
            }`}
          >
            {labels[k]}
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
        {LEADERBOARDS[tab].map((r, i) => (
          <div
            key={r.user}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
              "you" in r && r.you ? "bg-profe-green/10" : ""
            } ${i > 0 ? "border-t border-white/5" : ""}`}
          >
            <span className={`w-6 text-center font-black ${r.rank === 1 ? "text-profe-gold" : "text-white/40"}`}>
              {r.rank}
            </span>
            <span className={`flex-1 ${"you" in r && r.you ? "font-bold" : "text-white/75"}`}>{r.user}</span>
            <span className="font-bold text-profe-green">{r.value}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-white/35 mt-2">
        El top semanal se reinicia cada lunes: todos vuelven a empezar parejos.
      </p>
    </div>
  )
}

function ProfeRecord() {
  const won = PROFE_RECORD.filter((r) => r.result === "won").length
  return (
    <div className="px-4 mt-6">
      <h2 className="text-sm font-bold mb-1">Historial público del Profe</h2>
      <p className="text-[11px] text-white/45 mb-3">
        Sin maquillar. {won} de {PROFE_RECORD.length} en los últimos partidos. Cuando falla, lo verás aquí.
      </p>
      <div className="space-y-2">
        {PROFE_RECORD.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/10 px-3 py-2.5">
            <span className={`text-lg ${r.result === "won" ? "" : "grayscale"}`}>
              {r.result === "won" ? "✅" : "❌"}
            </span>
            <div className="flex-1">
              <div className="text-xs font-semibold">{r.match}</div>
              <div className="text-[10px] text-white/45">{r.pick}</div>
            </div>
            <span className={`text-xs font-bold ${r.result === "won" ? "text-profe-green" : "text-profe-red"}`}>
              {r.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
