import { conseilService, historyService } from "@/lib/rest.service"
import { CreateConseil, createConseil } from "@/lib/schema-zod"
import { currentUser } from "@clerk/nextjs"
import { Conseil } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { password, limit_time, school_name } = await request.json()
  let conseil_from_data: CreateConseil
  try {
    conseil_from_data = createConseil.parse({ password: password, limit_time: new Date(limit_time), school_name: school_name })
  } catch {
    return NextResponse.json({ message: "Données non valides" }, { status: 400 })
  }
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ message: "Vous devez être connecté" }, { status: 403 })
  }

  const author_name = `${user.firstName} ${user.lastName}`

  const conseil_data: Omit<Conseil, "id"> = {
    password: conseil_from_data.password,
    creator: author_name,
    limit_time: conseil_from_data.limit_time,
    createdAt: new Date(),
    school_name: conseil_from_data.school_name,
  }

  try {
    const new_conseil = await conseilService.create(conseil_data)

    if (!new_conseil) {
      return NextResponse.json({ message: "échec de la création" }, { status: 400 })
    }

    let user_history = await historyService.findByUserId(user.id)
    if (!user_history) {
      user_history = await historyService.create({ user_id: user.id })
    }
    await historyService.addConseilToHistory(user_history.id, new_conseil.id)

    return NextResponse.json({ message: "Création réussie", conseil_id: new_conseil.id }, { status: 201 })
  } catch {
    return NextResponse.json({ message: "mot de passe non disponible" }, { status: 400 })
  }
}
