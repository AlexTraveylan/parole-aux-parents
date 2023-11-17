import { commentService } from "@/lib/rest.service"
import { AddingComment, addingComment } from "@/lib/schema-zod"
import { getRequiredAuthSession } from "@/lib/auth"
import { Comment } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { question_id: string } }) {
  const { content } = await request.json()

  let conseil_from_data: AddingComment
  try {
    conseil_from_data = addingComment.parse({ content: content })
  } catch {
    return NextResponse.json({ message: "Données non valides" }, { status: 400 })
  }

  const session = await getRequiredAuthSession()

  if (!content || !session.user.id || !session.user.name || !params.question_id) {
    return NextResponse.json({ message: "Informations manquantes" }, { status: 400 })
  }

  const new_comment: Omit<Comment, "id" | "createdAt" | "updatedAt" | "is_reviewed"> = {
    content: conseil_from_data.content,
    author: session.user.name,
    questionId: params.question_id,
  }

  const created_question = await commentService.create(new_comment)

  if (!created_question) {
    return NextResponse.json({ message: "Echec de l'ajout du commentaire" }, { status: 400 })
  }

  return NextResponse.json({ message: "Commentaire ajouté", question: created_question }, { status: 201 })
}
