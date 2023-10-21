import { questionService } from "@/lib/rest.service"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { question_id: string } }) {
  const { userId } = auth()

  if (!userId || !params.question_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const likes = await questionService.getQuestionLikes(params.question_id)

  const user_like = likes?.likes.find((like) => like.author_id == userId && like.questionId == params.question_id)

  return NextResponse.json({ message: "Récupération des likes ok", nb_likes: likes?.likes.length, isLiked: user_like ? true : false })
}
