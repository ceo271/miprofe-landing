"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"

export type Bet = {
  matchId: string
  label: string
  stake: number
  side: "profe" | "contra"
  status: "open" | "won" | "lost"
}

type Toast = { id: number; text: string; kind: "chip" | "info" }

type DemoState = {
  chips: number
  streak: number
  bets: Bet[]
  copied: string[]
  followed: string[]
  toasts: Toast[]
  onboarded: boolean
  team: string
  placeBet: (bet: Omit<Bet, "status">) => void
  addChips: (n: number, label?: string) => void
  toggleCopy: (id: string) => void
  toggleFollow: (id: string) => void
  pushToast: (text: string, kind?: "chip" | "info") => void
  completeOnboarding: (team: string) => void
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
    },
    [pushToast]
  )

  const toggleCopy = useCallback(
    (id: string) => {
      setCopied((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))
    },
    []
  )

  const toggleFollow = useCallback((id: string) => {
    setFollowed((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  }, [])

  const completeOnboarding = useCallback(
    (t: string) => {
      setTeam(t)
      setOnboarded(true)
      addChips(500, "¡+500 fichas de bienvenida!")
    },
    [addChips]
  )

  return (
    <Ctx.Provider
      value={{ chips, streak, bets, copied, followed, toasts, onboarded, team, placeBet, addChips, toggleCopy, toggleFollow, pushToast, completeOnboarding }}
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
