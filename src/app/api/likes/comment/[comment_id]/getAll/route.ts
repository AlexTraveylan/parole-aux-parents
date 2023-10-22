import { commentService } from "@/lib/rest.service"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

export type GetAllLikeType = {
  message: string
  nb_likes: number
  isLiked: boolean
}

export async function GET(request: NextRequest, { params }: { params: { comment_id: string } }) {
  const { userId } = auth()

  if (!userId || !params.comment_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const likes = await commentService.getCommentLikes(params.comment_id)

  const user_like = likes?.likes.find((like) => like.author_id == userId && like.commentId == params.comment_id)

  return NextResponse.json({ message: "Récupération des likes ok", nb_likes: likes?.likes.length, isLiked: user_like ? true : false })
}
