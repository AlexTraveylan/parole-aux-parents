import { AddCommentForm } from "@/components/add-comment-form"
import { CommentCard } from "@/components/comment-card"
import { QuestionCard } from "@/components/question-card"
import { Separator } from "@/components/ui/separator"
import { commentService, questionService } from "@/lib/rest.service"
import { auth } from "@clerk/nextjs"

export default async function QuestionsPage({ params }: { params: { id: string } }) {
  const { userId } = auth()
  const curent_question = await questionService.findById(params.id)
  if (!curent_question || !userId) {
    throw new Error("Pas d'acces ou pas de question")
  }
  const comments = await commentService.findAllByQuestionId(params.id)

  return (
    <>
      <QuestionCard question={curent_question} />
      <Separator texte="Commentaires" />
      {comments.length > 0 &&
        comments.map((comment, index) => (
          <div key={index}>
            <CommentCard comment={comment} />
          </div>
        ))}
      <AddCommentForm question_id={params.id} />
    </>
  )
}
