import { historyService } from "@/lib/rest.service"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { conseil_id: string } }) {
  const { userId } = auth()

  if (!userId || !params.conseil_id) {
    return NextResponse.json({ message: "Informations manquantes" }, { status: 403 })
  }

  const user_history = await historyService.findByUserId(userId)

  if (user_history?.user_id != userId) {
    return NextResponse.json({ message: "Pas le bon user" }, { status: 403 })
  }

  const updatedHistory = await historyService.removeConseilFromHistory(user_history.id, params.conseil_id)

  if (!updatedHistory) {
    return NextResponse.json({ message: "Echec de la suppression" }, { status: 400 })
  }

  return NextResponse.json({ message: "supression réussi" }, { status: 200 })
}
