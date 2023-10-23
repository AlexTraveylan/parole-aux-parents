import { currentUser } from "@/lib/auth"
import { likeService, questionService } from "@/lib/rest.service"

import { Like } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { question_id: string } }) {
  const { user_id, user_name } = currentUser()

  if (!user_id || !params.question_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const likes = await questionService.getQuestionLikes(params.question_id)

  const user_like = likes?.likes.find((like) => like.author_id == user_id)

  if (!user_like) {
    const data_like: Omit<Like, "id"> = {
      author_id: user_id,
      questionId: params.question_id,
      commentId: null,
    }
    const new_like = await likeService.create(data_like)

    return NextResponse.json({ message: "Like ajouté", like: new_like }, { status: 201 })
  }

  const isDeletedLike = await likeService.delete(user_like.id)
  if (!isDeletedLike) {
    return NextResponse.json({ message: "Echec de la suppression." }, { status: 400 })
  }

  return NextResponse.json({ message: "Like supprimé" }, { status: 200 })
}
