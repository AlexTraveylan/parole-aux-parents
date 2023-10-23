import { currentUser } from "@/lib/auth"
import { commentService } from "@/lib/rest.service"

import { NextRequest, NextResponse } from "next/server"

export type GetAllLikeType = {
  message: string
  nb_likes: number
  isLiked: boolean
}

export async function GET(request: NextRequest, { params }: { params: { comment_id: string } }) {
  const { user_id, user_name } = currentUser()

  if (!user_id || !params.comment_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const likes = await commentService.getCommentLikes(params.comment_id)

  const user_like = likes?.likes.find((like) => like.author_id == user_id && like.commentId == params.comment_id)

  return NextResponse.json({ message: "Récupération des likes ok", nb_likes: likes?.likes.length, isLiked: user_like ? true : false })
}
