import { CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { getAuthSession } from "@/lib/auth"
import { Comment } from "@prisma/client"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Markdown from "react-markdown"
import { AddLike } from "./add-like"
import { AddReport } from "./add-report"
import { Card, CardTitle } from "./ui/card"

export async function CommentCard({ comment }: { comment: Comment }) {
  const session = await getAuthSession()
  const isNotModified = comment.createdAt.getTime() === comment.updatedAt.getTime()
  const createAtText = `Crée le ${format(comment.createdAt, "PP à h:mm", { locale: fr })}`
  const updatedAtText = `Modifiée le ${format(comment.updatedAt, "PP à h:mm", { locale: fr })}`
  return (
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <CardHeader>
        <CardTitle>{comment.author}</CardTitle>
        <CardDescription>
          <div>{isNotModified ? createAtText : updatedAtText}</div>
          {!session && <div>{"MODE OBSERVATEUR : Impossible de like ou commenter sans connexion."}</div>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Markdown>{comment.content}</Markdown>
      </CardContent>
      <CardFooter className="flex justify-around">
        <AddLike question_id={comment.id} target="comment" />
        <AddReport question_id={comment.id} target="comment" />
      </CardFooter>
    </Card>
  )
}
