import { conseilService } from "@/lib/rest.service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (!password) {
    return NextResponse.json({ message: "Pas de code reçu" }, { status: 400 })
  }

  const conseil_requested = await conseilService.findByPassword(password)

  if (!conseil_requested) {
    return NextResponse.json({ message: "Ressource inaccessible" }, { status: 400 })
  }
  return NextResponse.json({ message: "Conseil récupéré", conseil_id: conseil_requested.id }, { status: 200 })
}
