import { getRequiredAuthSession } from "@/lib/auth"
import { questionService } from "@/lib/rest.service"
import { CreateQuestion, createQuestion } from "@/lib/schema-zod"
import { Question } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { conseil_id: string } }) {
  const { title, content } = await request.json()

  let conseil_from_data: CreateQuestion
  try {
    conseil_from_data = createQuestion.parse({ title: title, content: content })
  } catch {
    return NextResponse.json({ message: "Données non valides" }, { status: 400 })
  }

  const session = await getRequiredAuthSession()

  if (!title || !content || !session.user.id || !session.user.name || !params.conseil_id) {
    return NextResponse.json({ message: "Informations manquantes" }, { status: 400 })
  }

  const new_question: Omit<Question, "id" | "createdAt" | "updatedAt"> = {
    title: conseil_from_data.title,
    content: conseil_from_data.content,
    author: session.user.name,
    conseilId: params.conseil_id,
  }

  const created_question = await questionService.create(new_question)

  if (!created_question) {
    return NextResponse.json({ message: "Echec de la création de la question" }, { status: 400 })
  }

  return NextResponse.json({ message: "Question crée", question: created_question }, { status: 201 })
}
