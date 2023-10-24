import { AddCommentForm } from "@/components/add-comment-form"
import { CommentCard } from "@/components/comment-card"
import { QuestionCard } from "@/components/question-card"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { currentUser } from "@/lib/auth"
import { commentService, questionService } from "@/lib/rest.service"

export default async function QuestionsPage({ params }: { params: { id: string } }) {
  const { user_id, user_name } = currentUser()
  const curent_question = await questionService.findById(params.id)
  if (!curent_question) {
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
      {user_id ? (
        <AddCommentForm question_id={params.id} />
      ) : (
        <Card className="min-w-[350px] w-screen max-w-[700px] text-center p-5">{"Impossible d'ajouter des commentaires sans connexion"}</Card>
      )}
    </>
  )
}
