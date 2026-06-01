// Mock data para el prototipo /demo de El Profe.
// Todo es ficticio e ilustrativo. Las fichas son virtuales, sin valor monetario.

export type Match = {
  id: string
  league: string
  stage: string
  home: { name: string; flag: string }
  away: { name: string; flag: string }
  kickoff: string // texto relativo
  status: "upcoming" | "live" | "finished"
  minute?: number
  score?: [number, number]
  profePick: string
  profeConfidence: number
  // El "marco de 5 factores" — metodología nombrada para generar confianza
  factors: { label: string; home: number; away: number }[]
  reasoning: string
  trending?: boolean
  playersBetting: number
}

export const MATCHES: Match[] = [
  {
    id: "mex-arg",
    league: "Mundial 2026",
    stage: "Grupo C · Jornada 2",
    home: { name: "México", flag: "🇲🇽" },
    away: { name: "Argentina", flag: "🇦🇷" },
    kickoff: "En 2h 14m",
    status: "upcoming",
    profePick: "Empate o gana México (doble oportunidad)",
    profeConfidence: 72,
    factors: [
      { label: "Forma reciente", home: 7, away: 8 },
      { label: "Bajas / lesiones", home: 6, away: 5 },
      { label: "Historial directo", home: 4, away: 8 },
      { label: "Local / visitante", home: 9, away: 5 },
      { label: "Motivación", home: 9, away: 6 },
    ],
    reasoning:
      "Argentina llega como favorita, pero México juega en casa con un estadio a reventar y necesita el punto para clasificar. El Profe ve más valor del que pagan las casas en el doble: empate o México.",
    trending: true,
    playersBetting: 3412,
  },
  {
    id: "bra-esp",
    league: "Mundial 2026",
    stage: "Grupo A · Jornada 2",
    home: { name: "Brasil", flag: "🇧🇷" },
    away: { name: "España", flag: "🇪🇸" },
    kickoff: "En vivo · 63'",
    status: "live",
    minute: 63,
    score: [1, 1],
    profePick: "Más de 2.5 goles",
    profeConfidence: 81,
    factors: [
      { label: "Forma reciente", home: 8, away: 9 },
      { label: "Bajas / lesiones", home: 7, away: 8 },
      { label: "Historial directo", home: 7, away: 7 },
      { label: "Local / visitante", home: 6, away: 6 },
      { label: "Ritmo de gol", home: 9, away: 9 },
    ],
    reasoning:
      "Dos selecciones que viven del ataque y no saben defenderse. Con 1-1 al 63', El Profe sigue firme: esto acaba con goles de sobra.",
    trending: true,
    playersBetting: 5890,
  },
  {
    id: "fra-ned",
    league: "Mundial 2026",
    stage: "Grupo D · Jornada 2",
    home: { name: "Francia", flag: "🇫🇷" },
    away: { name: "Países Bajos", flag: "🇳🇱" },
    kickoff: "Mañana 14:00",
    status: "upcoming",
    profePick: "Gana Francia",
    profeConfidence: 64,
    factors: [
      { label: "Forma reciente", home: 9, away: 7 },
      { label: "Bajas / lesiones", home: 8, away: 6 },
      { label: "Historial directo", home: 7, away: 6 },
      { label: "Local / visitante", home: 6, away: 6 },
      { label: "Profundidad de banca", home: 9, away: 7 },
    ],
    reasoning:
      "Francia tiene más banca y más gol. No es una ventaja enorme, por eso la confianza es media. El Profe solo recomienda cuando ve valor real.",
    playersBetting: 1204,
  },
  {
    id: "por-eng",
    league: "Mundial 2026",
    stage: "Grupo B · Jornada 2",
    home: { name: "Portugal", flag: "🇵🇹" },
    away: { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    kickoff: "Mañana 17:00",
    status: "upcoming",
    profePick: "Menos de 2.5 goles",
    profeConfidence: 58,
    factors: [
      { label: "Forma reciente", home: 7, away: 8 },
      { label: "Bajas / lesiones", home: 6, away: 7 },
      { label: "Historial directo", home: 6, away: 6 },
      { label: "Local / visitante", home: 7, away: 6 },
      { label: "Estilo (cerrado)", home: 8, away: 8 },
    ],
    reasoning:
      "Dos equipos que se respetan demasiado. El Profe huele un partido trabado y de pocas ocasiones.",
    playersBetting: 980,
  },
]

// Comentario en vivo de El Profe (se va revelando en /demo/vivo)
export const LIVE_COMMENTARY: { min: number; text: string; tone: "info" | "hype" | "pick" }[] = [
  { min: 58, text: "Brasil empuja, pero España aguanta. Ojo que cuando se estiran, llegan los goles.", tone: "info" },
  { min: 61, text: "Tiro al palo de España. Les dije: esto acaba con goles. Mantengan la calma.", tone: "hype" },
  { min: 63, text: "Próxima jugada de peligro: yo voy con Brasil. ¿Quién se anima?", tone: "pick" },
  { min: 66, text: "¡Casi! Córner para Brasil. Aquí puede caer algo.", tone: "hype" },
]

// Apuestas-relámpago en vivo (micro-bets)
export const MICRO_BETS = [
  { id: "mb1", q: "¿Quién marca el próximo gol?", options: ["Brasil", "España", "Nadie en 10'"], window: 28 },
  { id: "mb2", q: "¿Habrá córner en los próximos 5'?", options: ["Sí", "No"], window: 18 },
  { id: "mb3", q: "¿Tarjeta amarilla antes del 70'?", options: ["Sí", "No"], window: 35 },
]

// Chat del salón "Ver y comentar"
export const LIVE_CHAT_SEED = [
  { user: "Regio_23", text: "¡Vamos Brasil! 🟡", color: "text-profe-gold" },
  { user: "LaDoña", text: "El Profe la va a pegar otra vez 👀", color: "text-profe-green" },
  { user: "Chiva4Ever", text: "Yo le entro a más de 2.5, va clarito", color: "text-profe-blue" },
  { user: "Beto_77", text: "España está dormida eh", color: "text-white/70" },
]

export const LIVE_CHAT_BOTS = [
  { user: "Paty99", text: "uy uy uy ese tiro 😱", color: "text-profe-copper" },
  { user: "ElTío_Beto", text: "se los dije, puro gol hoy", color: "text-profe-gold" },
  { user: "Memo_GDL", text: "metí 200 fichas al próximo gol de Brasil", color: "text-profe-green" },
  { user: "Sofi", text: "Profe nunca falla jajaja", color: "text-profe-blue" },
  { user: "Nacho", text: "córner córner córner", color: "text-white/70" },
]

// Chat con El Profe (persona con memoria)
export const PROFE_CHAT_SEED: { from: "profe" | "user"; text: string }[] = [
  {
    from: "profe",
    text: "¡Quihúbole! 👋 Oye, salió la alineación de México y cambié mi pick. ¿Te cuento?",
  },
  { from: "user", text: "Va, ¿qué viste?" },
  {
    from: "profe",
    text: "Entra el Chucky de titular. Eso me sube la confianza en el doble (empate o México) del 68% al 72%. La última vez le entraste contra mí en el Brasil-España y te fue... regular 😏. Hoy yo iría conmigo.",
  },
]

export const PROFE_QUICK_REPLIES = [
  "¿Por qué subió tu confianza?",
  "Dame tu pick más seguro de hoy",
  "¿Cómo vas esta semana?",
]

// Comunidad: picks de usuarios (UGC) — entran a un pool y se ordenan por engagement
export type CommunityPick = {
  id: string
  user: string
  avatar: string
  accuracy: number
  match: string
  pick: string
  takes: string
  agrees: number
  copies: number
  side: "profe" | "contra"
  hot?: boolean
}

export const COMMUNITY_PICKS: CommunityPick[] = [
  {
    id: "cp1",
    user: "LaDoña",
    avatar: "👑",
    accuracy: 81,
    match: "México vs Argentina",
    pick: "Gana México",
    takes: "Le voy en contra al Profe. Argentina viene cansada de la altura y el Azteca pesa. México gana derecho.",
    agrees: 342,
    copies: 128,
    side: "contra",
    hot: true,
  },
  {
    id: "cp2",
    user: "ElTío_Beto",
    avatar: "🎩",
    accuracy: 76,
    match: "Brasil vs España",
    pick: "Más de 2.5 goles",
    takes: "Mismo pick que el Profe y no me arrepiento. Estos dos no saben jugar a 0.",
    agrees: 489,
    copies: 210,
    side: "profe",
    hot: true,
  },
  {
    id: "cp3",
    user: "Memo_GDL",
    avatar: "⚽",
    accuracy: 69,
    match: "Francia vs Países Bajos",
    pick: "Ambos marcan",
    takes: "El Profe dice gana Francia, pero yo veo que Países Bajos también anota. Voy por el 'ambos marcan'.",
    agrees: 156,
    copies: 47,
    side: "contra",
  },
]

// Clasificaciones (múltiples, no solo fichas)
export const LEADERBOARDS = {
  aciertos: [
    { rank: 1, user: "Carlos_MX", value: "84%" },
    { rank: 2, user: "LaDoña", value: "81%" },
    { rank: 3, user: "ElTío_Beto", value: "76%" },
    { rank: 47, user: "Tú", value: "71%", you: true },
  ],
  racha: [
    { rank: 1, user: "ElTío_Beto", value: "23 🔥" },
    { rank: 2, user: "Paty99", value: "19 🔥" },
    { rank: 3, user: "Regio_23", value: "15 🔥" },
    { rank: 12, user: "Tú", value: "5 🔥", you: true },
  ],
  semana: [
    { rank: 1, user: "Regio_23", value: "+12,400" },
    { rank: 2, user: "Chiva4Ever", value: "+9,850" },
    { rank: 3, user: "Sofi", value: "+8,200" },
    { rank: 6, user: "Tú", value: "+4,100", you: true },
  ],
}

// Historial público del Profe (honestidad como producto — incluye fallos)
export const PROFE_RECORD = [
  { match: "Alemania vs Japón", pick: "Gana Alemania", result: "won" as const, detail: "2-1" },
  { match: "Italia vs Croacia", pick: "Menos de 2.5", result: "lost" as const, detail: "3-1" },
  { match: "Colombia vs Uruguay", pick: "Empate", result: "won" as const, detail: "1-1" },
  { match: "Bélgica vs Marruecos", pick: "Gana Bélgica", result: "lost" as const, detail: "0-2" },
  { match: "USA vs Gales", pick: "Más de 1.5", result: "won" as const, detail: "2-2" },
]

// Calendario de racha (días 7/14/30 con premios escalonados)
export const STREAK_DAYS = [
  { day: 1, done: true, reward: 50 },
  { day: 2, done: true, reward: 50 },
  { day: 3, done: true, reward: 100 },
  { day: 4, done: true, reward: 100 },
  { day: 5, done: true, reward: 150 },
  { day: 6, done: false, reward: 150 },
  { day: 7, done: false, reward: 1000, milestone: true },
]
