"use client"

import { ReactNode, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { DemoProvider, useDemo } from "./DemoContext"

const TABS = [
  { href: "/demo", label: "Hoy", icon: "🏠" },
  { href: "/demo/vivo", label: "En Vivo", icon: "🔴" },
  { href: "/demo/profe", label: "El Profe", icon: "🎓" },
  { href: "/demo/comunidad", label: "Comunidad", icon: "👥" },
  { href: "/demo/perfil", label: "Perfil", icon: "🏆" },
]

function Header() {
  const { chips, streak, toasts } = useDemo()
  return (
    <header className="sticky top-0 z-30 bg-profe-black/95 backdrop-blur border-b border-white/10 px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/demo" className="flex items-center gap-2">
          <img src="/profe-icon.png" alt="El Profe" className="w-7 h-7 rounded-full" />
          <span className="font-bold text-sm">El Profe</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs bg-profe-gold/15 border border-profe-gold/30 text-profe-gold rounded-full px-2.5 py-1 font-semibold">
            {streak} 🔥
          </span>
          <span className="flex items-center gap-1 text-xs bg-profe-green/15 border border-profe-green/30 text-profe-green rounded-full px-2.5 py-1 font-bold tabular-nums">
            🪙 {chips.toLocaleString()}
          </span>
        </div>
      </div>
      {/* Toasts (recompensas / acciones) */}
      <div className="pointer-events-none fixed left-1/2 -translate-x-1/2 top-16 z-50 flex flex-col items-center gap-2 w-full max-w-[420px] px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`anim-chip px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
              t.kind === "chip"
                ? "bg-profe-green text-black"
                : "bg-white/10 text-white border border-white/20"
            }`}
          >
            {t.kind === "chip" ? "🪙 " : ""}
            {t.text}
          </div>
        ))}
      </div>
    </header>
  )
}

function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="sticky bottom-0 z-30 bg-profe-black/95 backdrop-blur border-t border-white/10 grid grid-cols-5">
      {TABS.map((tab) => {
        const active = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] transition ${
              active ? "text-profe-green" : "text-white/45 hover:text-white/70"
            }`}
          >
            <span className={`text-lg leading-none ${active && tab.label === "En Vivo" ? "anim-live" : ""}`}>
              {tab.icon}
            </span>
            <span className="font-medium">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function PushBanner() {
  const router = useRouter()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 5000) // simula un push de día de partido
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setShow(false), 9000) // se va solo
    return () => clearTimeout(t)
  }, [show])
  if (!show) return null
  return (
    <div className="absolute top-2 inset-x-2 z-50 anim-down">
      <button
        onClick={() => {
          setShow(false)
          router.push("/demo")
        }}
        className="w-full text-left bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-2xl flex items-start gap-3"
      >
        <img src="/profe-icon.png" alt="" className="w-9 h-9 rounded-xl flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold">El Profe</span>
            <span className="text-[10px] text-white/40">ahora</span>
          </div>
          <p className="text-xs text-white/80 leading-snug mt-0.5">
            🇲🇽 México juega en 2h. Mi pick ya está listo: <b>empate o México (72%)</b>. ¿Le entras?
          </p>
        </div>
      </button>
    </div>
  )
}

export default function DemoShell({ children }: { children: ReactNode }) {
  return (
    <DemoProvider>
      <div className="min-h-screen flex justify-center bg-gradient-to-b from-profe-green/[0.03] to-transparent">
        <div className="w-full max-w-[420px] min-h-screen flex flex-col bg-profe-black border-x border-white/5 relative">
          <Header />
          <PushBanner />
          <main className="flex-1 overflow-y-auto no-scrollbar">{children}</main>
          <BottomNav />
        </div>
      </div>
    </DemoProvider>
  )
}
