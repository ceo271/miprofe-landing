import type { Metadata } from "next"
import type { ReactNode } from "react"
import DemoShell from "./DemoShell"

// El demo es un prototipo interno: que no lo indexen los buscadores.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function DemoLayout({ children }: { children: ReactNode }) {
  return <DemoShell>{children}</DemoShell>
}
