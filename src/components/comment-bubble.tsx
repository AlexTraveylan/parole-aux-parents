import { commentService } from "@/lib/rest.service"
import { MessageCircle } from "../../node_modules/lucide-react"

export async function CommentBubble({ question_id }: { question_id: string }) {
  const comments = await commentService.findAllByQuestionId(question_id)

  return (
    <div className="flex gap-2 items-center">
      <MessageCircle />
      <div>{comments.length}</div>
    </div>
  )
}
