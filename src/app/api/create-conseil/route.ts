import { conseilService } from "@/lib/rest.service"
import { currentUser } from "@clerk/nextjs"
import { Conseil } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { password, limit_time } = await request.json()
  const user = await currentUser()

  if (!user || !password || !limit_time) {
    return NextResponse.json({ message: "Vous devez être connecté" }, { status: 403 })
  }

  const author_name = `${user.firstName} ${user.lastName}`

  const conseil_data: Omit<Conseil, "id"> = {
    password: password,
    creator: author_name,
    limit_time: new Date(limit_time),
    createdAt: new Date(),
  }

  try {
    const new_conseil = await conseilService.create(conseil_data)

    if (!new_conseil) {
      return NextResponse.json({ message: "échec de la création" }, { status: 400 })
    }

    return NextResponse.json({ message: "Création réussie", conseil_id: new_conseil.id }, { status: 201 })
  } catch {
    return NextResponse.json({ message: "mot de passe non disponible" }, { status: 400 })
  }
}
