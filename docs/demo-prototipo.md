# Prototipo interactivo `/demo` — qué demuestra y de dónde sale

Prototipo clicable del producto El Profe rediseñado para **máxima retención**, construido sobre los aprendizajes de `docs/bytedance-research.md`. Es una maqueta con datos ficticios (`app/demo/data.ts`) y estado compartido (`app/demo/DemoContext.tsx`); todas las fichas son virtuales y sin valor.

Cómo verlo en local: `npm run dev` → http://localhost:3000/demo

## El bucle de enganche (Trigger → Acción → Recompensa variable → Inversión)

El prototipo materializa el bucle completo, no funciones sueltas:

| Tab | Qué hace | Mecánica de ByteDance que aplica |
|---|---|---|
| **🏠 Hoy** (`/demo`) | **Onboarding de arranque en frío** (3 toques: selección → ligas → estilo, +500 de bienvenida). **Línea de tiempo del día de partido** (briefing → alineaciones → en vivo → partido → resumen). Feed inmersivo de pick-cards, apuesta de un toque (con/contra El Profe), liquidación con animación de fichas y momento "¡Le ganaste al Profe!". Marco de 5 factores. **Tarjeta de resultado compartible** (loop viral "predice y presume"). | Encuesta de interés en el 1er arranque (Toutiao); pool de tráfico + completion (Douyin); recompensa variable (TikTok); aha de día 1 = primera ficha; reto "预言帝" del Mundial 2022 de Douyin. |
| **🔴 En Vivo** (`/demo/vivo`) | Salón "ver y comentar": comentario en vivo de El Profe, **apuestas-relámpago con cuenta regresiva** (la de "próximo gol" se **liquida con el gol real**), **mini-ranking en vivo**, **momento gol** (marcador + banner "¡GOOOL!" + el salón estalla), chat en tiempo real + reacciones. | "边看边聊" del Mundial 2022 de Douyin (10.6 B vistas, 1.3 B interacciones); convierte el tiempo muerto en el pico de engagement. |
| **🎓 El Profe** (`/demo/profe`) | Chat con **persona y memoria** ("la última vez le entraste contra mí…"), **ping proactivo** si te quedas inactivo, respuestas con pick estructurado + confianza. | Persona-first / lore (柳夜熙); AI 选车 de Dongchedi (tool + persona); proactivo = trigger; memoria = inversión. |
| **👥 Comunidad** (`/demo/comunidad`) | Feed de picks UGC, seguir, **copiar pick**, aplausos, "arma tu propio pick" (composer), tabla de **Profetas** por % de acierto. | Stack OGC+PGC+UGC (Dongchedi); validación social y reputación; convierte el single-player en red de predictores. |
| **🏆 Perfil** (`/demo/perfil`) | **Panel de Activación** (North Star + números mágicos, en vivo). Calendario de racha con hitos 7/14/30. **Invitación de doble vía** (código + progreso a hito). Logros. **Clasificaciones múltiples** (aciertos/racha/semana con reset). **"Mi selección"**. **Historial público del Profe con sus fallos**. | Check-in escalonado (抖音极速版); fisión de doble vía (Luckin/番茄); rankings paralelos + reset (anti-desmotivación); "我的主队" (Douyin); honestidad/track record = confianza = retención. |

## Triggers de retorno (a nivel app)

- **Push de día de partido**: banner que desliza desde arriba en cualquier tab ("México juega en 2h, mi pick está listo"). Trigger externo del bucle.
- **El Profe proactivo**: te busca solo en el chat tras la inactividad. El chat como trigger, no solo herramienta.

## Capa de analítica (`app/demo/analytics.ts`)

Hace tangible la recomendación #1 de retención de la investigación: **definir UNA acción aha e instrumentar los números mágicos**.

- Taxonomía de eventos tipada; `track()` que en producción llamaría a `posthog.capture(event, props)` (aquí `console.debug` + feed del demo).
- Eventos clave: `onboarding_completed`, `aha_first_bet` ⭐, `bet_placed` / `bet_settled`, `live_microbet_placed`, `result_shared`, `invite_shared`, `streak_claimed`, `pick_copied`.
- El panel "Tu activación" en Perfil se llena en vivo (primera ficha = aha, 5 apuestas semana 1, 2+ ligas, 3 días, compartió/invitó) y muestra el feed de eventos que se mandarían a analítica.

## La confianza como producto (lo que NO se quitó)

Aunque el brief pedía ignorar restricciones, se mantuvo el track record honesto del Profe (con fallos visibles) y los avisos +18 / juego responsable en cada superficie de apuesta. Razón de producto, no moral: la credibilidad ES la retención (lección del colapso de credibilidad del test ADAS de Dongchedi), y los dark patterns engañosos (near-miss, presión de pérdida) suben métricas a una semana pero hunden la satisfacción y el paso por Google Play.

## Estructura de archivos

```
app/demo/
  data.ts            # datos mock + tipos
  analytics.ts       # taxonomía de eventos + track() (→ PostHog en prod)
  DemoContext.tsx    # estado compartido (fichas, racha, apuestas, eventos, activación…)
  layout.tsx         # marco de móvil + header + push banner + nav inferior
  page.tsx           # Hoy (onboarding, timeline, feed, tarjeta compartible)
  vivo/page.tsx      # En Vivo (gol, micro-bets, mini-ranking, chat)
  profe/page.tsx     # El Profe (persona, memoria, proactivo)
  comunidad/page.tsx # Comunidad (UGC, copiar pick, Profetas)
  perfil/page.tsx    # Perfil (activación, racha, invitación, rankings, historial)
```

## Lo que sigue (fuera del alcance de este repo de landing)

Conectar lo real: datos de partidos en vivo, El Profe sobre un LLM real, push/backend de verdad, y enviar los eventos de `analytics.ts` a PostHog. Requiere backend.
