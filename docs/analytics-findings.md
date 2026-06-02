# Hallazgos de analítica (PostHog real, solo lectura) — sesión Claude

Análisis sobre el proyecto real `profe-bet-prod`. Dashboard con estas insights (seguro de borrar):
**[Claude] El Profe — Salud del chat & Activación** → https://eu.posthog.com/project/171305/dashboard/718293

## 1. Incidente de fiabilidad de El Profe (chat) 🔴

Trends de `chat_v6_supervisor_fail` (últimos 30 días, sin cuentas de test):

| Semana | Mensajes | Supervisor fail | Rate limited |
|---|---|---|---|
| 05-03 | 433 | 0 | 0 |
| 05-10 | 578 | 0 | 0 |
| 05-17 | 288 | 96 | 0 |
| 05-24 | 327 | **192** | **519** |
| 05-31* | 68 | 36 | 0 |

\* semana parcial.

**Desglose por `reason`** — domina con mucho:

| reason | 5/17 | 5/24 |
|---|---|---|
| **specific odds number without get_match_odds** | 62 | **170** |
| recommendation present without place_bet chip | 18 | 0 |
| banned `/block/` | 7 | 10 |
| banned `/garantizado/` (sin garantías) | 0 | 10 |
| banned `/必胜/`, sharp signal sin evidence, etc. | ~9 | ~2 |

**Lectura:**
- `chat_v6_supervisor_fail` NO es un crash: es la **barrera de contenido** atajando salidas del LLM (cuotas sin tool, lenguaje de "garantía"/"必胜", señales sin evidencia). La parte de juego responsable **funciona**.
- Todos los `reason` saltan de 0 el ~5/17 → el **supervisor v6 se desplegó/endureció esa fecha**.
- Fallo dominante: **El Profe cita cuotas específicas sin llamar `get_match_odds`** (62→170).
- `recovered_via` = solo `"none"` → **no hay recuperación elegante**; cada fallo probablemente regenera → correlaciona con el pico de **519 `chat_rate_limited` el 5/24** (tormenta de regeneración).

**Recomendaciones (orden de impacto):**
1. **Forzar tool-calling**: El Profe debe llamar `get_match_odds` antes de citar cuotas; si no hay dato, no dar número. Elimina la mayoría de los fallos.
2. **Arreglar la recuperación** (`recovered_via=none`): reescritura/limpieza en vez de regenerar entero, para no degradar la respuesta ni saturar el rate limit.
3. **Investigar el pico de rate-limit del 5/24**: casi seguro derivado de #1/#2.
4. Es crítico para la confianza en El Profe = retención.

## 2. Funnel de activación del onboarding 🟠

`onboarding_step_viewed → sport_picked → bet_confirmed (aha) → signup_accepted` (30d, sin test):

| Paso | Personas | Conversión | Dropoff |
|---|---|---|---|
| Entró al onboarding | 116 | 100% | — |
| Eligió deporte/selección | 96 | 82.8% | 17.2% |
| **Primera ficha (aha)** | 84 | 72.4% | 27.6% |
| Aceptó registro | 64 | 55.2% | **44.8%** |

**Lectura:**
- Llegan al aha (primera ficha virtual) el **72%** — sano; ya dejan jugar antes de pedir registro (bien).
- **Mayor fuga: aha → registro (84→64, ~24% abandona en el muro de signup).**

**Recomendaciones:**
1. Suavizar/retrasar más el muro de registro tras el aha (dejar seguir jugando y pedir registro más tarde / con un disparador de valor).
2. Reforzar el recordatorio de valor en el momento del signup (fichas acumuladas, posición en ranking).
3. El 17% que se va en el primer paso: revisar la primera pantalla del onboarding.

## Notas
- Volumen bajo (≈116 onboardings, ≈1.7k mensajes/30d) — producto temprano; tratar cifras como direccionales.
- Solo lectura salvo el dashboard/insights creados (claramente prefijados `[Claude]`, borrables).
