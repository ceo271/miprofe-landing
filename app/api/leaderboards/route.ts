import { NextResponse } from "next/server"
import { LEADERBOARDS } from "../../demo/data"

// Contrato de datos listo para backend (clasificaciones múltiples).
export const dynamic = "force-static"

export function GET() {
  return NextResponse.json({ leaderboards: LEADERBOARDS })
}
