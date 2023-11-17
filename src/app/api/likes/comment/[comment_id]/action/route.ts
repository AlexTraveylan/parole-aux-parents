import { commentService, likeService } from "@/lib/rest.service"
import { getRequiredAuthSession } from "@/lib/auth"
import { Like } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { comment_id: string } }) {
  const session = await getRequiredAuthSession()

  if (!session.user.id || !params.comment_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const likes = await commentService.getCommentLikes(params.comment_id)

  const user_likes = likes?.likes.find((like) => like.author_id == session.user.id)

  if (!user_likes) {
    const data_like: Omit<Like, "id"> = {
      author_id: session.user.id,
      questionId: null,
      commentId: params.comment_id,
    }
    const new_like = await likeService.create(data_like)

    return NextResponse.json({ message: "Like ajouté", like: new_like }, { status: 201 })
  }

  const isDeletedLike = await likeService.delete(user_likes.id)
  if (!isDeletedLike) {
    return NextResponse.json({ message: "Echec de la suppression." }, { status: 400 })
  }

  return NextResponse.json({ message: "Like supprimé" }, { status: 200 })
}
