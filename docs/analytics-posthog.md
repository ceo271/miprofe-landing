# Analítica: alinear el prototipo con el PostHog real (profe-bet-prod)

Revisión (solo lectura) del esquema de eventos real del producto y cómo encaja con la
capa `app/demo/analytics.ts`. **No se creó ni modificó nada en PostHog** — esto es un
mapa para implementar/alinear.

## Hallazgo: el producto ya tiene una taxonomía madura

Ya trackeas, entre otros: `bet_placed`, `match_settled`, `anon_virtual_bet_placed`,
`onboarding_bet_confirmed`, `onboarding_step_completed`, `pick_card_impression/clicked/quote_read/dwell`,
`chat_message_sent` (+ verificación: `chat_claim_extracted`, `chat_chip_dropped_by_verifier`,
`profe_fallback_despite_data_ready`), `raffle_viewed/…`, `push_permission_*`, `pwa_*`,
`acquire_landing_3s_retained`, `landing_cta_primary/secondary`, `suerteo_clickout`, y los
eventos LLM (`$ai_generation`, `$ai_trace`). Es decir: gran parte del bucle ya está instrumentado.

> Nota: `chat_chip_dropped_by_verifier` / `chat_claim_unsupported` / `profe_fallback_despite_data_ready`
> son exactamente la "barrera humana/editorial sobre los picks del AI" que recomienda la
> investigación. Ya existe. 👏

## Mapa: evento del demo → evento real

| Demo (`analytics.ts`) | Equivalente en producción | Estado |
|---|---|---|
| `bet_placed` | `bet_placed` | ✅ coincide exacto |
| `match_settled` | `match_settled` | ✅ coincide (renombré el demo para alinear) |
| `aha_first_bet` ⭐ | `onboarding_bet_confirmed` / primer `bet_placed` | ✅ existe (derivar "primera vez") |
| `onboarding_completed` | `onboarding_step_completed` (paso final) | ✅ existe |
| `live_microbet_placed` | `anon_virtual_bet_placed` (lo más cercano) | 🟡 parcial — sin evento de sala en vivo |
| `pick_copied` | — | ❌ gap |
| `result_shared` (tarjeta) | — | ❌ gap |
| `invite_shared` (doble vía) | ¿`padrino_advisory_logged`? (incierto) | ❌ gap probable |
| `streak_claimed` | — | ❌ gap |
| (clasificación vista) | — | ❌ gap |
| (sala en vivo / momento gol) | — | ❌ gap |

## Funnel de activación — se puede construir HOY con eventos existentes

Solo con lo que ya trackeas (no requiere código nuevo):

```
acquire_landing_3s_retained
  → onboarding_step_completed
  → onboarding_bet_confirmed        ← ⭐ aha (poner la primera ficha)
  → match_settled
  → (retorno D1/D7)
```

`query-funnel` sobre esos pasos + `query-retention` con `onboarding_bet_confirmed` como
evento de activación te da la curva de activación→retención directamente.

## Gaps a añadir cuando se construyan esas features

Estos conceptos del prototipo aún no tienen evento en producción. Sugerencia de nombres
(en el estilo snake_case que ya usas):

- `streak_claimed` (props: `day`, `reward`) — para medir el bucle de racha/hitos 7/14/30.
- `leaderboard_viewed` (props: `board`: aciertos|racha|semana) — engagement de rankings.
- `result_shared` (props: `match_id`, `won`) — loop viral "predice y presume" (tarjeta).
- `invite_sent` + `invite_accepted` (props: `inviter_id`) — fisión de doble vía (≠ `padrino_*`).
- `live_room_joined`, `live_microbet_placed`, `goal_moment_shown` — co-viewing en vivo.

## Cómo conectar el prototipo a PostHog real

`app/demo/analytics.ts::track()` hoy hace `console.debug`. Para producción, una línea:

```ts
// posthog ya inicializado en la app real
export function track(event: AnalyticsEvent, props = {}) {
  window.posthog?.capture(event, props)
  return { event, props, t: Date.now() }
}
```

Como los nombres del demo ya están alineados (`bet_placed`, `match_settled`), los eventos
del prototipo caerían en los mismos insights/funnels que el producto real.
