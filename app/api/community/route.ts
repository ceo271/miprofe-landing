import { NextResponse } from "next/server"
import { COMMUNITY_PICKS } from "../../demo/data"

// Contrato de datos listo para backend (picks de la comunidad / UGC).
export const dynamic = "force-static"

export function GET() {
  return NextResponse.json({ picks: COMMUNITY_PICKS })
}
