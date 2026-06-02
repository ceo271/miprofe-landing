"use client"

import { useEffect, useRef, useState } from "react"
import { PROFE_CHAT_SEED, PROFE_QUICK_REPLIES } from "../data"

type Msg = { from: "profe" | "user"; text: string; pick?: { pick: string; conf: number } }

// Respuestas con "memoria" y persona consistente (veterano, directo, con cariño).
const REPLIES: Record<string, Msg> = {
  "¿Por qué subió tu confianza?": {
    from: "profe",
    text: "Con el Chucky de titular, México mete más gente al ataque y Argentina tiene que retroceder. Eso le quita peligro al rival y me sube el doble (empate o México) al 72%. Pura lectura de cancha, no corazonada.",
  },
  "Dame tu pick más seguro de hoy": {
    from: "profe",
    text: "Mi más seguro es el Brasil-España. Estos dos no saben jugar a cero.",
    pick: { pick: "Más de 2.5 goles", conf: 81 },
  },
  "¿Cómo vas esta semana?": {
    from: "profe",
    text: "Esta semana voy 68% de aciertos. Pegué 3 de los últimos 5. El Italia-Croacia me lo comí con papas, lo reconozco 🤷. Mi historial está abierto en tu Perfil, sin maquillar.",
  },
}

const FALLBACK: Msg = {
  from: "profe",
  text: "Buena pregunta. Déjame verlo con calma y te tiro mi lectura antes del silbatazo. Mientras, ¿quieres mi pick más seguro de hoy?",
}

export default function ProfePage() {
  const [msgs, setMsgs] = useState<Msg[]>(PROFE_CHAT_SEED)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const userActed = useRef(false)
  const pinged = useRef(false)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [msgs, typing])

  // El Profe es proactivo: si te quedas inactivo, él te busca (trigger de retorno).
  useEffect(() => {
    const t = setTimeout(() => {
      if (userActed.current || pinged.current) return
      pinged.current = true
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMsgs((m) => [
          ...m,
          {
            from: "profe",
            text: "¿Sigues por ahí? 👀 No te duermas, que México-Argentina arranca en 2h y el doble (empate o México) sigue pagando bien. ¿Te aparto 200 fichas para esa?",
          },
        ])
      }, 1100)
    }, 8000)
    return () => clearTimeout(t)
  }, [])

  function ask(text: string) {
    if (!text.trim()) return
    userActed.current = true
    setMsgs((m) => [...m, { from: "user", text }])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, REPLIES[text] ?? FALLBACK])
    }, 1100)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Cabecera de persona */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-b from-profe-copper/10 to-transparent">
        <img src="/profe-icon.png" alt="El Profe" className="w-11 h-11 rounded-full" />
        <div>
          <div className="font-bold text-sm flex items-center gap-1.5">
            El Profe <span className="w-2 h-2 rounded-full bg-profe-green" />
          </div>
          <div className="text-[11px] text-white/50">Veterano del deporte · te conoce · 68% esta semana</div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">
        {msgs.map((m, i) => (
          <Bubble key={i} msg={m} />
        ))}
        {typing && (
          <div className="flex items-center gap-2 anim-msg">
            <img src="/profe-icon.png" alt="" className="w-6 h-6 rounded-full" />
            <div className="bg-white/8 rounded-2xl px-3 py-2 flex gap-1">
              <Dot /> <Dot d="0.15s" /> <Dot d="0.3s" />
            </div>
          </div>
        )}
      </div>

      {/* Sugerencias rápidas */}
      <div className="px-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
        {PROFE_QUICK_REPLIES.map((q) => (
          <button
            key={q}
            onClick={() => ask(q)}
            className="flex-shrink-0 text-[11px] bg-white/5 border border-white/15 rounded-full px-3 py-1.5 text-white/70 hover:bg-white/10"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="border-t border-white/10 p-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(input)}
          aria-label="Escribe un mensaje a El Profe"
          placeholder="Pregúntale lo que quieras al Profe…"
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs outline-none focus:border-profe-copper/40"
        />
        <button onClick={() => ask(input)} aria-label="Enviar mensaje" className="text-profe-copper font-bold text-sm px-2">
          ➤
        </button>
      </div>
    </div>
  )
}

function Bubble({ msg }: { msg: Msg }) {
  const isProfe = msg.from === "profe"
  return (
    <div className={`anim-msg flex gap-2 ${isProfe ? "" : "flex-row-reverse"}`}>
      {isProfe && <img src="/profe-icon.png" alt="" className="w-6 h-6 rounded-full flex-shrink-0 mt-1" />}
      <div className="max-w-[78%]">
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
            isProfe ? "bg-white/8 text-white/90" : "bg-profe-green text-black font-medium"
          }`}
        >
          {msg.text}
        </div>
        {msg.pick && (
          <div className="mt-2 rounded-xl bg-profe-copper/10 border border-profe-copper/30 p-2.5">
            <div className="text-[10px] text-profe-copper font-semibold mb-1">PICK SUGERIDO</div>
            <div className="text-sm font-bold">{msg.pick.pick}</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-profe-green" style={{ width: `${msg.pick.conf}%` }} />
              </div>
              <span className="text-[10px] font-bold">{msg.pick.conf}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Dot({ d = "0s" }: { d?: string }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-white/50"
      style={{ animation: "livePulse 1s ease-in-out infinite", animationDelay: d }}
    />
  )
}
