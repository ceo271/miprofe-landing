"use client"

import { useEffect, useRef, useState } from "react"
import { LIVE_COMMENTARY, MICRO_BETS, LIVE_CHAT_SEED, LIVE_CHAT_BOTS } from "../data"
import { useDemo } from "../DemoContext"

export default function VivoPage() {
  return (
    <div className="flex flex-col h-full">
      <LiveHeader />
      <MicroBetTicker />
      <CommentaryAndChat />
    </div>
  )
}

function LiveHeader() {
  const [minute, setMinute] = useState(63)
  useEffect(() => {
    const t = setInterval(() => setMinute((m) => (m < 90 ? m + 1 : m)), 8000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="bg-gradient-to-b from-profe-blue/15 to-transparent px-4 py-3 border-b border-white/10">
      <div className="flex items-center justify-between text-[10px] mb-2">
        <span className="text-white/40">Mundial 2026 · Grupo A</span>
        <span className="flex items-center gap-1 text-profe-red font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-profe-red anim-live" /> EN VIVO {minute}&apos;
        </span>
      </div>
      <div className="flex items-center justify-around">
        <div className="text-center">
          <div className="text-3xl">🇧🇷</div>
          <div className="text-xs font-semibold">Brasil</div>
        </div>
        <div className="text-2xl font-black tabular-nums">1 - 1</div>
        <div className="text-center">
          <div className="text-3xl">🇪🇸</div>
          <div className="text-xs font-semibold">España</div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-profe-copper">
        <img src="/profe-icon.png" alt="" className="w-3.5 h-3.5 rounded-full" />
        Pick del Profe: <b>Más de 2.5 goles</b> · 81%
      </div>
    </div>
  )
}

function MicroBetTicker() {
  const { placeBet, addChips } = useDemo()
  const [idx, setIdx] = useState(0)
  const [count, setCount] = useState(MICRO_BETS[0].window)
  const [chosen, setChosen] = useState<string | null>(null)

  useEffect(() => {
    if (chosen) return
    if (count <= 0) {
      // siguiente ronda
      const next = (idx + 1) % MICRO_BETS.length
      setIdx(next)
      setCount(MICRO_BETS[next].window)
      setChosen(null)
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count, chosen, idx])

  const bet = MICRO_BETS[idx]

  function choose(opt: string) {
    setChosen(opt)
    placeBet({ matchId: "bra-esp-live", label: `${bet.q} → ${opt}`, stake: 100, side: "profe" })
    setTimeout(() => {
      const won = Math.random() < 0.5
      if (won) addChips(180, "¡Apuesta-relámpago ganada!")
      else addChips(0, "Esta no entró. ¡Va la próxima!")
      // nueva ronda
      const next = (idx + 1) % MICRO_BETS.length
      setIdx(next)
      setCount(MICRO_BETS[next].window)
      setChosen(null)
    }, 2200)
  }

  return (
    <div className="bg-profe-copper/10 border-b border-profe-copper/25 px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-profe-copper">⚡ Apuesta-relámpago</span>
        {!chosen && (
          <span className="text-xs font-bold tabular-nums text-white/60">{count}s</span>
        )}
      </div>
      <p className="text-sm font-semibold mb-2">{bet.q}</p>
      {chosen ? (
        <p className="text-xs text-profe-green font-semibold py-2">Pusiste 100 fichas a &quot;{chosen}&quot;. ¡Suerte! 🤞</p>
      ) : (
        <div className="flex gap-2">
          {bet.options.map((o) => (
            <button
              key={o}
              onClick={() => choose(o)}
              className="flex-1 py-2 rounded-lg bg-white/5 border border-white/15 text-xs font-bold hover:bg-profe-copper/20 hover:border-profe-copper/40 transition"
            >
              {o}
            </button>
          ))}
        </div>
      )}
      <p className="text-[9px] text-white/30 mt-2">100 fichas por jugada · virtuales, sin valor monetario · +18</p>
    </div>
  )
}

type ChatMsg = { user: string; text: string; color: string; me?: boolean }

function CommentaryAndChat() {
  const [msgs, setMsgs] = useState<ChatMsg[]>(LIVE_CHAT_SEED)
  const [commentary, setCommentary] = useState([LIVE_COMMENTARY[0]])
  const [input, setInput] = useState("")
  const [reactions, setReactions] = useState<{ id: number; emoji: string }[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const botIdx = useRef(0)
  const comIdx = useRef(1)

  // Mensajes de bots entrando en vivo
  useEffect(() => {
    const t = setInterval(() => {
      const bot = LIVE_CHAT_BOTS[botIdx.current % LIVE_CHAT_BOTS.length]
      botIdx.current++
      setMsgs((m) => [...m.slice(-30), bot])
    }, 3500)
    return () => clearInterval(t)
  }, [])

  // Comentario de El Profe revelándose
  useEffect(() => {
    const t = setInterval(() => {
      if (comIdx.current < LIVE_COMMENTARY.length) {
        setCommentary((c) => [...c, LIVE_COMMENTARY[comIdx.current]])
        comIdx.current++
      }
    }, 6000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [msgs])

  function send() {
    if (!input.trim()) return
    setMsgs((m) => [...m, { user: "Tú", text: input, color: "text-profe-green", me: true }])
    setInput("")
  }

  function react(emoji: string) {
    const id = Date.now() + Math.random()
    setReactions((r) => [...r, { id, emoji }])
    setTimeout(() => setReactions((r) => r.filter((x) => x.id !== id)), 1100)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Comentario del Profe (fijo arriba del chat) */}
      <div className="px-4 py-2 space-y-1.5 border-b border-white/5 max-h-28 overflow-y-auto no-scrollbar">
        {commentary.map((c, i) => (
          <div key={i} className="anim-msg flex gap-2 items-start">
            <img src="/profe-icon.png" alt="" className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" />
            <p
              className={`text-xs leading-snug ${
                c.tone === "pick" ? "text-profe-copper font-semibold" : c.tone === "hype" ? "text-profe-gold" : "text-white/75"
              }`}
            >
              {c.text}
            </p>
          </div>
        ))}
      </div>

      {/* Chat del salón */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-2 min-h-0">
        {msgs.map((m, i) => (
          <div key={i} className={`anim-msg text-xs ${m.me ? "text-right" : ""}`}>
            <span className={`font-semibold ${m.color}`}>{m.user}</span>{" "}
            <span className="text-white/80">{m.text}</span>
          </div>
        ))}
      </div>

      {/* Reacciones flotantes */}
      <div className="relative">
        <div className="absolute right-4 bottom-2 pointer-events-none">
          {reactions.map((r) => (
            <span key={r.id} className="anim-float absolute right-0 text-2xl">
              {r.emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Input + reacciones */}
      <div className="border-t border-white/10 p-3 flex items-center gap-2">
        <div className="flex gap-1">
          {["🔥", "😱", "⚽"].map((e) => (
            <button key={e} onClick={() => react(e)} className="text-lg active:scale-125 transition">
              {e}
            </button>
          ))}
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Échale porras al partido…"
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs outline-none focus:border-profe-green/40"
        />
        <button onClick={send} className="text-profe-green font-bold text-sm px-2">
          ➤
        </button>
      </div>
    </div>
  )
}
