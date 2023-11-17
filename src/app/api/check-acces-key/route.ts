import { getRequiredAuthSession } from "@/lib/auth"
import { conseilService, historyService } from "@/lib/rest.service"
import { NextRequest, NextResponse } from "next/server"
export async function POST(request: NextRequest) {
  const session = await getRequiredAuthSession()
  const { password } = await request.json()

  if (!password) {
    return NextResponse.json({ message: "Pas de code reçu" }, { status: 400 })
  }

  const conseil_requested = await conseilService.findByPassword(password)

  if (!conseil_requested) {
    return NextResponse.json({ message: "Ressource inaccessible" }, { status: 400 })
  }

  if (session.user.id) {
    let user_history = await historyService.findByUserId(session.user.id)
    if (!user_history) {
      user_history = await historyService.create({ user_id: session.user.id })
    }
    await historyService.addConseilToHistory(user_history.id, conseil_requested.id)
  }

  return NextResponse.json({ message: "Conseil récupéré", conseil_id: conseil_requested.id }, { status: 200 })
}
