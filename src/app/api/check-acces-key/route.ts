import { conseilService, historyService } from "@/lib/rest.service"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { userId } = auth()
  const { password } = await request.json()

  if (!userId) {
    return NextResponse.json({ message: "Connexion requise" }, { status: 403 })
  }

  if (!password) {
    return NextResponse.json({ message: "Pas de code reçu" }, { status: 400 })
  }

  const conseil_requested = await conseilService.findByPassword(password)

  if (!conseil_requested) {
    return NextResponse.json({ message: "Ressource inaccessible" }, { status: 400 })
  }

  let user_history = await historyService.findByUserId(userId)
  if (!user_history) {
    user_history = await historyService.create({ user_id: userId })
  }
  await historyService.addConseilToHistory(user_history.id, conseil_requested.id)

  return NextResponse.json({ message: "Conseil récupéré", conseil_id: conseil_requested.id }, { status: 200 })
}
