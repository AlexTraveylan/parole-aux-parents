import { questionService } from "@/lib/rest.service"
import { currentUser } from "@clerk/nextjs"
import { Question } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { conseil_id: string } }) {
  const { title, content } = await request.json()
  const user = await currentUser()

  if (!title || !content || !user || !params.conseil_id) {
    return NextResponse.json({ message: "Informations manquantes" }, { status: 400 })
  }

  const author_name = `${user.firstName} ${user.lastName}`

  const new_question: Omit<Question, "id" | "createdAt" | "updatedAt"> = {
    title: String(title),
    content: String(content),
    author: author_name,
    nb_likes: 0,
    nb_reported: 0,
    conseilId: params.conseil_id,
  }

  const created_question = await questionService.create(new_question)

  if (!created_question) {
    return NextResponse.json({ message: "Echec de la création de la question" }, { status: 400 })
  }

  return NextResponse.json({ message: "Question crée", question: created_question }, { status: 201 })
}
