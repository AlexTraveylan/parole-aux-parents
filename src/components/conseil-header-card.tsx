import { currentUser } from "@/lib/auth"
import { Conseil } from "@prisma/client"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export async function ConseilHeaderCard({ conseil }: { conseil: Conseil }) {
  const { user_id, user_name } = currentUser()
  const formated_limit_date = format(conseil.limit_time, "PPP", { locale: fr })

  return (
    <Card className="min-w-[350px] w-screen max-w-[700px] text-center">
      <CardHeader>
        <CardTitle>{conseil.password}</CardTitle>
        <CardDescription>Code à partager</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        {!user_id && <div>{"MODE OBSERVATEUR : Impossible de like ou commenter sans connexion."}</div>}
        <div>École : {conseil.school_name}</div>
        <div>Fin des questions : {formated_limit_date}</div>
      </CardContent>
      <CardFooter>Créateur : {conseil.creator}</CardFooter>
    </Card>
  )
}
