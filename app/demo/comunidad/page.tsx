"use client"

import { useState } from "react"
import { COMMUNITY_PICKS, MATCHES, type CommunityPick } from "../data"
import { useDemo } from "../DemoContext"

export default function ComunidadPage() {
  const [tab, setTab] = useState<"feed" | "profetas">("feed")
  const [composer, setComposer] = useState(false)
  const [myPicks, setMyPicks] = useState<CommunityPick[]>([])

  return (
    <div className="pb-8">
      <div className="px-4 pt-4">
        <h1 className="text-2xl font-black mb-1">Comunidad</h1>
        <p className="text-sm text-white/50 mb-3">Predice, presume y rétalos. Aquí todos son profetas.</p>
      </div>

      <div className="flex gap-2 px-4 mb-4">
        <TabBtn active={tab === "feed"} onClick={() => setTab("feed")}>
          Picks de la banda
        </TabBtn>
        <TabBtn active={tab === "profetas"} onClick={() => setTab("profetas")}>
          🏅 Profetas
        </TabBtn>
      </div>

      {tab === "feed" ? (
        <div className="px-4 space-y-3">
          <button
            onClick={() => setComposer(true)}
            className="w-full py-3 rounded-2xl border border-dashed border-profe-green/40 text-profe-green text-sm font-semibold hover:bg-profe-green/5"
          >
            + Arma tu propio pick
          </button>
          {myPicks.map((p) => (
            <PickCard key={p.id} pick={p} mine />
          ))}
          {COMMUNITY_PICKS.map((p) => (
            <PickCard key={p.id} pick={p} />
          ))}
          <p className="text-center text-[10px] text-white/30 pt-2">
            Opiniones de usuarios. Fichas virtuales sin valor monetario. +18 · Juega responsablemente.
          </p>
        </div>
      ) : (
        <ProfetasBoard />
      )}

      {composer && (
        <Composer
          onClose={() => setComposer(false)}
          onPublish={(p) => {
            setMyPicks((m) => [p, ...m])
            setComposer(false)
          }}
        />
      )}
    </div>
  )
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
        active ? "bg-profe-green text-black" : "bg-white/5 text-white/60"
      }`}
    >
      {children}
    </button>
  )
}

function PickCard({ pick, mine }: { pick: CommunityPick; mine?: boolean }) {
  const { copied, toggleCopy, followed, toggleFollow, pushToast } = useDemo()
  const [agrees, setAgrees] = useState(pick.agrees)
  const [agreed, setAgreed] = useState(false)
  const isCopied = copied.includes(pick.id)
  const isFollowed = followed.includes(pick.id)

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 anim-slide">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg">{pick.avatar}</div>
          <div>
            <div className="text-sm font-semibold flex items-center gap-1.5">
              {pick.user}
              {pick.hot && <span className="text-[9px] bg-profe-copper/20 text-profe-copper px-1.5 py-0.5 rounded-full">🔥 en racha</span>}
            </div>
            <div className="text-[10px] text-white/40">Acierto {pick.accuracy}%</div>
          </div>
        </div>
        {!mine && (
          <button
            onClick={() => {
              toggleFollow(pick.id)
              if (!isFollowed) pushToast(`Sigues a ${pick.user}`)
            }}
            className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
              isFollowed ? "bg-white/10 text-white/60" : "bg-profe-green/15 text-profe-green border border-profe-green/30"
            }`}
          >
            {isFollowed ? "Siguiendo" : "Seguir"}
          </button>
        )}
      </div>

      <div className="text-[11px] text-white/40 mb-1">{pick.match}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-bold">{pick.pick}</span>
        <span
          className={`text-[9px] px-1.5 py-0.5 rounded-full ${
            pick.side === "profe" ? "bg-profe-green/15 text-profe-green" : "bg-profe-copper/15 text-profe-copper"
          }`}
        >
          {pick.side === "profe" ? "con El Profe" : "contra El Profe"}
        </span>
      </div>
      <p className="text-xs text-white/65 leading-relaxed mb-3">{pick.takes}</p>

      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => {
            if (agreed) return
            setAgrees((a) => a + 1)
            setAgreed(true)
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
            agreed ? "bg-profe-green/15 text-profe-green" : "bg-white/5 text-white/60"
          }`}
        >
          👏 {agrees}
        </button>
        <button
          onClick={() => {
            toggleCopy(pick.id)
            pushToast(isCopied ? "Pick quitado" : `Copiaste el pick de ${pick.user}`, "chip")
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold ${
            isCopied ? "bg-profe-green text-black" : "bg-white/5 text-white/70"
          }`}
        >
          {isCopied ? "✓ Copiado" : `📋 Copiar (${pick.copies})`}
        </button>
      </div>
    </div>
  )
}

function ProfetasBoard() {
  const ranking = [...COMMUNITY_PICKS]
    .map((p) => ({ user: p.user, avatar: p.avatar, accuracy: p.accuracy }))
    .concat([
      { user: "Carlos_MX", avatar: "🦅", accuracy: 84 },
      { user: "Paty99", avatar: "🌟", accuracy: 73 },
    ])
    .sort((a, b) => b.accuracy - a.accuracy)

  return (
    <div className="px-4 space-y-2">
      <p className="text-xs text-white/50 mb-2">Los que más la pegan. Se actualiza cada jornada.</p>
      {ranking.map((r, i) => (
        <div
          key={r.user}
          className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/10 p-3"
        >
          <span className={`w-6 text-center font-black ${i === 0 ? "text-profe-gold" : "text-white/40"}`}>
            {i + 1}
          </span>
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg">{r.avatar}</div>
          <span className="flex-1 text-sm font-semibold">{r.user}</span>
          <span className="text-sm font-bold text-profe-green">{r.accuracy}%</span>
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-xl bg-profe-green/10 border border-profe-green/30 p-3 mt-3">
        <span className="w-6 text-center font-black text-white/60">47</span>
        <div className="w-9 h-9 rounded-full bg-profe-green/20 flex items-center justify-center text-lg">😎</div>
        <span className="flex-1 text-sm font-bold">Tú</span>
        <span className="text-sm font-bold text-profe-green">71%</span>
      </div>
    </div>
  )
}

function Composer({ onClose, onPublish }: { onClose: () => void; onPublish: (p: CommunityPick) => void }) {
  const { pushToast } = useDemo()
  const [matchId, setMatchId] = useState(MATCHES[0].id)
  const [pick, setPick] = useState("")
  const [takes, setTakes] = useState("")
  const match = MATCHES.find((m) => m.id === matchId)!

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={onClose}>
      <div
        className="w-full max-w-[420px] bg-profe-black border-t border-white/15 rounded-t-3xl p-5 anim-slide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Arma tu pick</h3>
          <button onClick={onClose} className="text-white/50 text-sm">
            ✕
          </button>
        </div>

        <label className="text-[11px] text-white/50">Partido</label>
        <select
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm mt-1 mb-3 outline-none"
        >
          {MATCHES.map((m) => (
            <option key={m.id} value={m.id} className="bg-profe-black">
              {m.home.name} vs {m.away.name}
            </option>
          ))}
        </select>

        <label className="text-[11px] text-white/50">Tu pronóstico</label>
        <input
          value={pick}
          onChange={(e) => setPick(e.target.value)}
          placeholder="Ej. Gana México 2-1"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm mt-1 mb-3 outline-none focus:border-profe-green/40"
        />

        <label className="text-[11px] text-white/50">¿Por qué? (tu take)</label>
        <textarea
          value={takes}
          onChange={(e) => setTakes(e.target.value)}
          placeholder="Convence a la banda…"
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm mt-1 mb-4 outline-none focus:border-profe-green/40 resize-none"
        />

        <button
          disabled={!pick.trim()}
          onClick={() => {
            onPublish({
              id: "mine-" + Date.now(),
              user: "Tú",
              avatar: "😎",
              accuracy: 71,
              match: `${match.home.name} vs ${match.away.name}`,
              pick: pick.trim(),
              takes: takes.trim() || "Sin comentarios, puro instinto.",
              agrees: 0,
              copies: 0,
              side: "contra",
            })
            pushToast("¡Pick publicado! 🎉", "chip")
          }}
          className={`w-full py-3 rounded-xl text-sm font-bold ${
            pick.trim() ? "bg-profe-green text-black" : "bg-white/5 text-white/30"
          }`}
        >
          Publicar mi pick
        </button>
      </div>
    </div>
  )
}
