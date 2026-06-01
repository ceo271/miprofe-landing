"use client"

import { useEffect, useRef, useState } from "react"
import { LIVE_COMMENTARY, MICRO_BETS, LIVE_CHAT_SEED, LIVE_CHAT_BOTS } from "../data"
import { useDemo } from "../DemoContext"

type GoalInfo = { team: string; flag: string; scorer: string; scoreStr: string; minute: number }

// Goles guionizados para dar vida al salón (y al bucle "quédate a ver qué pasa").
const GOAL_SCRIPT: { at: number; score: [number, number]; info: GoalInfo }[] = [
  { at: 9000, score: [2, 1], info: { team: "Brasil", flag: "🇧🇷", scorer: "Rodrygo", scoreStr: "2-1", minute: 67 } },
  { at: 24000, score: [2, 2], info: { team: "España", flag: "🇪🇸", scorer: "Yamal", scoreStr: "2-2", minute: 74 } },
]

export default function VivoPage() {
  const [score, setScore] = useState<[number, number]>([1, 1])
  const [goalSignal, setGoalSignal] = useState(0)
  const [banner, setBanner] = useState<GoalInfo | null>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    GOAL_SCRIPT.forEach((g) => {
      timers.push(
        setTimeout(() => {
          setScore(g.score)
          setBanner(g.info)
          setGoalSignal((s) => s + 1)
          timers.push(setTimeout(() => setBanner(null), 3400))
        }, g.at)
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="flex flex-col h-full relative">
      <LiveHeader score={score} />
      <LiveMiniBoard />
      <MicroBetTicker goalSignal={goalSignal} banner={banner} />
      <CommentaryAndChat goalSignal={goalSignal} banner={banner} />
      {banner && <GoalBanner info={banner} />}
    </div>
  )
}

function GoalBanner({ info }: { info: GoalInfo }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/50" />
      {/* lluvia de emojis */}
      {["⚽", "🎉", "🔥", "⚽", "🎊", "🟢", "⚽", "🎉"].map((e, i) => (
        <span
          key={i}
          className="anim-float absolute text-3xl"
          style={{ left: `${8 + i * 11}%`, top: "62%", animationDelay: `${i * 0.07}s` }}
        >
          {e}
        </span>
      ))}
      <div className="anim-chip relative text-center bg-gradient-to-br from-profe-green to-profe-green/70 text-black rounded-3xl px-10 py-6 shadow-2xl">
        <div className="text-5xl font-black tracking-tight">¡GOOOL!</div>
        <div className="text-2xl mt-1">{info.flag} {info.team}</div>
        <div className="text-sm font-semibold mt-1 opacity-80">
          {info.scorer} · {info.minute}&apos; · {info.scoreStr}
        </div>
      </div>
    </div>
  )
}

function LiveHeader({ score }: { score: [number, number] }) {
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
        <div key={score.join("-")} className="anim-chip text-2xl font-black tabular-nums">
          {score[0]} - {score[1]}
        </div>
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

function LiveMiniBoard() {
  const [board, setBoard] = useState([
    { user: "Regio_23", pts: 1240, avatar: "🦅" },
    { user: "Tú", pts: 980, avatar: "😎", you: true },
    { user: "LaDoña", pts: 760, avatar: "👑" },
    { user: "Memo_GDL", pts: 540, avatar: "⚽" },
  ])
  // Las posiciones se mueven en vivo según las apuestas-relámpago.
  useEffect(() => {
    const t = setInterval(() => {
      setBoard((b) =>
        [...b]
          .map((x) => ({ ...x, pts: x.pts + Math.floor(Math.random() * 120) }))
          .sort((a, z) => z.pts - a.pts)
      )
    }, 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar bg-white/[0.02]">
      <span className="text-[9px] text-white/40 font-semibold flex-shrink-0 uppercase">En vivo</span>
      {board.map((r, i) => (
        <div
          key={r.user}
          className={`flex items-center gap-1.5 flex-shrink-0 rounded-full px-2.5 py-1 transition-all ${
            r.you ? "bg-profe-green/15 border border-profe-green/30" : "bg-white/5"
          }`}
        >
          <span className={`text-[10px] font-black ${i === 0 ? "text-profe-gold" : "text-white/40"}`}>{i + 1}</span>
          <span className="text-sm leading-none">{r.avatar}</span>
          <span className={`text-[11px] ${r.you ? "font-bold text-profe-green" : "text-white/70"}`}>{r.user}</span>
          <span className="text-[10px] font-bold tabular-nums text-white/50">{r.pts.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

function MicroBetTicker({ goalSignal, banner }: { goalSignal: number; banner: GoalInfo | null }) {
  const { placeBet, addChips } = useDemo()
  const [idx, setIdx] = useState(0)
  const [count, setCount] = useState(MICRO_BETS[0].window)
  const [chosen, setChosen] = useState<string | null>(null)
  const [pendingGoal, setPendingGoal] = useState(false)
  const [result, setResult] = useState<{ won: boolean; text: string } | null>(null)

  const bet = MICRO_BETS[idx]
  const isGoalQ = bet.id === "mb1" // "¿Quién marca el próximo gol?"

  function advance() {
    const next = (idx + 1) % MICRO_BETS.length
    setIdx(next)
    setCount(MICRO_BETS[next].window)
    setChosen(null)
    setPendingGoal(false)
    setResult(null)
  }

  function resolve(won: boolean, text: string) {
    addChips(won ? 180 : 0, won ? "¡Apuesta-relámpago ganada!" : "Esta no entró. ¡Va la próxima!")
    setResult({ won, text })
    setPendingGoal(false)
    setTimeout(advance, 2800)
  }

  // Cuenta regresiva de la ronda
  useEffect(() => {
    if (chosen || result) return
    if (count <= 0) {
      advance()
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, chosen, result, idx])

  // El "próximo gol" se resuelve con el gol REAL del partido
  useEffect(() => {
    if (!pendingGoal || !banner || !chosen) return
    const won = chosen === banner.team
    resolve(won, won ? `¡${banner.team} marcó! Ganaste +180 fichas 🎉` : `Marcó ${banner.team}. Esta no era.`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goalSignal])

  function choose(opt: string) {
    setChosen(opt)
    placeBet({ matchId: "bra-esp-live", label: `${bet.q} → ${opt}`, stake: 100, side: "profe" })
    if (isGoalQ) {
      setPendingGoal(true) // espera el próximo gol real del partido
    } else {
      setTimeout(() => resolve(Math.random() < 0.5, Math.random() < 0.5 ? "¡Entró! +180 fichas" : "No entró esta vez"), 2200)
    }
  }

  return (
    <div className="bg-profe-copper/10 border-b border-profe-copper/25 px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-profe-copper">⚡ Apuesta-relámpago</span>
        {!chosen && <span className="text-xs font-bold tabular-nums text-white/60">{count}s</span>}
      </div>
      <p className="text-sm font-semibold mb-2">{bet.q}</p>
      {result ? (
        <p className={`text-xs font-bold py-2 ${result.won ? "text-profe-green" : "text-white/60"}`}>{result.text}</p>
      ) : chosen && pendingGoal ? (
        <p className="text-xs text-profe-gold font-semibold py-2 anim-live">
          Apostaste a &quot;{chosen}&quot;. Esperando el próximo gol… ⏳
        </p>
      ) : chosen ? (
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

function CommentaryAndChat({ goalSignal, banner }: { goalSignal: number; banner: GoalInfo | null }) {
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

  // El salón estalla cuando hay gol
  useEffect(() => {
    if (goalSignal === 0 || !banner) return
    setCommentary((c) => [
      ...c,
      { min: banner.minute, text: `¡GOOOL de ${banner.team}! ${banner.scorer} la clavó. Se los dije: ¡puro gol hoy! 🔥`, tone: "hype" },
    ])
    const burst: ChatMsg[] = [
      { user: "Regio_23", text: "AAAAAH GOOOL 🤩🤩", color: "text-profe-gold" },
      { user: "Memo_GDL", text: "se los dije!! el Profe nunca falla", color: "text-profe-green" },
      { user: "Paty99", text: `${banner.flag}${banner.flag}${banner.flag}`, color: "text-profe-copper" },
    ]
    burst.forEach((b, i) => setTimeout(() => setMsgs((m) => [...m.slice(-30), b]), i * 350))
    // lluvia de reacciones automática
    Array.from({ length: 6 }).forEach((_, i) =>
      setTimeout(() => react(i % 2 ? "⚽" : "🔥"), i * 150)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goalSignal])

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
