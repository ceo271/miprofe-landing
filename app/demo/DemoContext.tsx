"use client"

import { createContext, useContext, useState, ReactNode, useCallback, useRef } from "react"
import { track as emit, type AnalyticsEvent } from "./analytics"

export type Bet = {
  matchId: string
  label: string
  stake: number
  side: "profe" | "contra"
  status: "open" | "won" | "lost"
}

type Toast = { id: number; text: string; kind: "chip" | "info" }
type LoggedEvent = { name: AnalyticsEvent; t: number }

type DemoState = {
  chips: number
  streak: number
  bets: Bet[]
  copied: string[]
  followed: string[]
  toasts: Toast[]
  onboarded: boolean
  team: string
  leagues: number
  shared: boolean
  events: LoggedEvent[]
  placeBet: (bet: Omit<Bet, "status">) => void
  addChips: (n: number, label?: string) => void
  toggleCopy: (id: string) => void
  toggleFollow: (id: string) => void
  pushToast: (text: string, kind?: "chip" | "info") => void
  completeOnboarding: (team: string, leagues: number) => void
  track: (name: AnalyticsEvent, props?: Record<string, unknown>) => void
  markShared: () => void
}

const Ctx = createContext<DemoState | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [chips, setChips] = useState(1450)
  const [streak] = useState(5)
  const [bets, setBets] = useState<Bet[]>([])
  const [copied, setCopied] = useState<string[]>([])
  const [followed, setFollowed] = useState<string[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [onboarded, setOnboarded] = useState(false)
  const [team, setTeam] = useState("🇲🇽 México")
  const [leagues, setLeagues] = useState(0)
  const [shared, setShared] = useState(false)
  const [events, setEvents] = useState<LoggedEvent[]>([])
  const betCount = useRef(0)

  const track = useCallback((name: AnalyticsEvent, props: Record<string, unknown> = {}) => {
    emit(name, props)
    setEvents((e) => [...e.slice(-24), { name, t: Date.now() }])
  }, [])

  const pushToast = useCallback((text: string, kind: "chip" | "info" = "info") => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, text, kind }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])

  const addChips = useCallback(
    (n: number, label?: string) => {
      setChips((c) => Math.max(0, c + n))
      pushToast(label ?? (n >= 0 ? `+${n} fichas` : `${n} fichas`), "chip")
    },
    [pushToast]
  )

  const placeBet = useCallback(
    (bet: Omit<Bet, "status">) => {
      setChips((c) => Math.max(0, c - bet.stake))
      setBets((b) => [...b, { ...bet, status: "open" }])
      pushToast(`Apuesta puesta · ${bet.stake} fichas`, "chip")
      betCount.current += 1
      if (betCount.current === 1) track("aha_first_bet", { matchId: bet.matchId }) // ⭐ activación
      track(bet.matchId.includes("live") ? "live_microbet_placed" : "bet_placed", { stake: bet.stake, side: bet.side })
    },
    [pushToast, track]
  )

  const toggleCopy = useCallback(
    (id: string) => {
      setCopied((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))
      if (!copied.includes(id)) track("pick_copied", { id })
    },
    [copied, track]
  )

  const toggleFollow = useCallback((id: string) => {
    setFollowed((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  }, [])

  const markShared = useCallback(() => setShared(true), [])

  const completeOnboarding = useCallback(
    (t: string, l: number) => {
      setTeam(t)
      setLeagues(l)
      setOnboarded(true)
      addChips(500, "¡+500 fichas de bienvenida!")
      track("onboarding_completed", { team: t, leagues: l })
    },
    [addChips, track]
  )

  return (
    <Ctx.Provider
      value={{
        chips,
        streak,
        bets,
        copied,
        followed,
        toasts,
        onboarded,
        team,
        leagues,
        shared,
        events,
        placeBet,
        addChips,
        toggleCopy,
        toggleFollow,
        pushToast,
        completeOnboarding,
        track,
        markShared,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useDemo() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useDemo debe usarse dentro de DemoProvider")
  return ctx
}
