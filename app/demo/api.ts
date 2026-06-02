// Cliente de datos tipado para el prototipo. Hoy consume los route
// handlers de /api (que sirven los datos mock); para conectar un backend
// real, basta cambiar la URL base o la implementación de estas funciones.
import type { Match, CommunityPick } from "./data"

const base = ""

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${base}${path}`)
  if (!res.ok) throw new Error(`Error ${res.status} en ${path}`)
  return res.json() as Promise<T>
}

export const getMatches = () => getJSON<{ matches: Match[] }>("/api/matches").then((d) => d.matches)
export const getCommunityPicks = () => getJSON<{ picks: CommunityPick[] }>("/api/community").then((d) => d.picks)
export const getLeaderboards = () => getJSON<{ leaderboards: unknown }>("/api/leaderboards").then((d) => d.leaderboards)
