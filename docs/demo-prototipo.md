# Prototipo interactivo `/demo` — qué demuestra y de dónde sale

Prototipo clicable del producto El Profe rediseñado para **máxima retención**, construido sobre los aprendizajes de `docs/bytedance-research.md`. Es una maqueta con datos ficticios (`app/demo/data.ts`) y estado compartido (`app/demo/DemoContext.tsx`); todas las fichas son virtuales y sin valor.

Cómo verlo en local: `npm run dev` → http://localhost:3000/demo

## El bucle de enganche (Trigger → Acción → Recompensa variable → Inversión)

El prototipo materializa el bucle completo, no funciones sueltas:

| Tab | Qué hace | Mecánica de ByteDance que aplica |
|---|---|---|
| **🏠 Hoy** (`/demo`) | Feed inmersivo de pick-cards, apuesta de un toque (con/contra El Profe), liquidación con animación de fichas y momento "¡Le ganaste al Profe!". Cold-start ("lo que todos apuestan hoy" + bono de bienvenida). Marco de 5 factores expandible. | Pool de tráfico escalonado + completion como señal (Douyin/Toutiao); recompensa variable (TikTok); aha de día 1 = poner la primera ficha; cold-start con contenido caliente. |
| **🔴 En Vivo** (`/demo/vivo`) | Salón de "ver y comentar": comentario en vivo de El Profe, **apuestas-relámpago con cuenta regresiva** (próximo gol / córner / tarjeta), chat en tiempo real con bots + reacciones flotantes, marcador en vivo. | "边看边聊" del Mundial 2022 de Douyin (10.6 B vistas, 1.3 B interacciones); convierte el tiempo muerto entre jugadas en el pico de engagement. |
| **🎓 El Profe** (`/demo/profe`) | Chat con **persona y memoria** ("la última vez le entraste contra mí…"), ping proactivo ("salió la alineación, cambié mi pick"), respuestas con pick estructurado + confianza. | Persona-first / lore (柳夜熙); el AI 选车 de Dongchedi (tool + persona); proactivo = nuevo trigger; memoria = inversión/relación. |
| **👥 Comunidad** (`/demo/comunidad`) | Feed de picks UGC, seguir, **copiar pick**, aplausos, "arma tu propio pick" (composer), tabla de **Profetas** por % de acierto. | Stack OGC+PGC+UGC (Dongchedi); validación social y reputación; convierte el single-player en una red de predictores. |
| **🏆 Perfil** (`/demo/perfil`) | Calendario de racha con hitos día 7/14/30, recompensa diaria, logros, **clasificaciones múltiples** (aciertos/racha/semana con reset), **"Mi selección"** (identidad), e **historial público del Profe con sus fallos**. | Check-in escalonado (抖音极速版); rankings paralelos + reset semanal (anti-desmotivación); "我的主队" (Douyin); honestidad/track record = confianza = retención. |

## La confianza como producto (lo que NO se quitó)

Aunque el brief pedía ignorar restricciones, se mantuvo el track record honesto del Profe (con fallos visibles) y los avisos +18 / juego responsable en cada superficie de apuesta. Razón de producto, no moral: la credibilidad ES la retención (lección del colapso de credibilidad del test ADAS de Dongchedi), y los dark patterns engañosos (near-miss, presión de pérdida) suben métricas a una semana pero hunden la satisfacción y el paso por Google Play.

## Estructura de archivos

```
app/demo/
  data.ts            # datos mock + tipos
  DemoContext.tsx    # estado compartido (fichas, racha, apuestas, copiados, toasts)
  layout.tsx         # marco de móvil + header (fichas/racha) + nav inferior de 5 tabs
  page.tsx           # Hoy
  vivo/page.tsx      # En Vivo
  profe/page.tsx     # El Profe
  comunidad/page.tsx # Comunidad
  perfil/page.tsx    # Perfil
```
