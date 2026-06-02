import { NextResponse } from "next/server"
import { MATCHES } from "../../demo/data"

// Contrato de datos listo para backend. Hoy sirve los datos mock del
// prototipo; en producción, reemplazar por la consulta real de partidos.
export const dynamic = "force-static"

export function GET() {
  return NextResponse.json({ matches: MATCHES })
}
