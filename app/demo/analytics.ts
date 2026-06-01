// Capa de analítica del prototipo.
// En producción, track() llamaría a PostHog: window.posthog?.capture(event, props).
// Aquí registra en consola y alimenta el panel de Activación del demo.

export type AnalyticsEvent =
  | "onboarding_completed"
  | "aha_first_bet" // ⭐ North Star de activación (poner la primera ficha)
  | "bet_placed"
  | "bet_settled"
  | "live_microbet_placed"
  | "result_shared"
  | "invite_shared"
  | "streak_claimed"
  | "pick_copied"

export const EVENT_LABEL: Record<AnalyticsEvent, string> = {
  onboarding_completed: "Onboarding completado",
  aha_first_bet: "⭐ Primera ficha (aha)",
  bet_placed: "Apuesta puesta",
  bet_settled: "Apuesta liquidada",
  live_microbet_placed: "Apuesta-relámpago en vivo",
  result_shared: "Resultado compartido",
  invite_shared: "Invitación enviada",
  streak_claimed: "Recompensa de racha",
  pick_copied: "Pick copiado",
}

export function track(event: AnalyticsEvent, props: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") {
    // Producción: window.posthog?.capture(event, props)
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, props)
  }
  return { event, props, t: Date.now() }
}
