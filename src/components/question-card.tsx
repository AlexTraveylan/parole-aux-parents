import { AddLike } from "@/components/add-like"
import { AddReport } from "@/components/add-report"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser } from "@/lib/auth"
import { Question } from "@prisma/client"
import format from "date-fns/format"
import { fr } from "date-fns/locale"
import Link from "next/link"
import Markdown from "react-markdown"
import { ArrowLeft } from "../../node_modules/lucide-react"
import { CommentBubble } from "./comment-bubble"

export async function QuestionCard({ question, index }: { question: Question; index?: number }) {
  const { user_id, user_name } = currentUser()
  const isNotModified = question.createdAt.getTime() === question.updatedAt.getTime()
  const createAtText = `Crée le ${format(question.createdAt, "PP à h:mm", { locale: fr })}`
  const updatedAtText = `Modifiée le ${format(question.updatedAt, "PPP à h:mm", { locale: fr })}`
  return (
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <CardHeader>
        {index != undefined && <CardTitle>Question n°{index + 1}</CardTitle>}
        {index == undefined && (
          <CardTitle>
            <Link href={`/conseils/${question.conseilId}`} className="flex gap-3">
              <ArrowLeft />
              Retour
            </Link>
          </CardTitle>
        )}
        <CardDescription className="flex flex-col gap-2">
          <div className="text-center">{question.title}</div>
          {!user_id && <div className="text-center">{"MODE OBSERVATEUR : Impossible de like ou commenter sans connexion."}</div>}
          <div className="flex justify-around">
            <div>{question.author}</div>
            <div>{isNotModified ? createAtText : updatedAtText}</div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Markdown>{question.content}</Markdown>
      </CardContent>
      <CardFooter className="flex justify-around">
        <Link href={`/questions/${question.id}`}>
          <CommentBubble question_id={question.id} />
        </Link>
        <AddLike question_id={question.id} target="question" />
        <AddReport question_id={question.id} target="question" />
      </CardFooter>
    </Card>
  )
}
