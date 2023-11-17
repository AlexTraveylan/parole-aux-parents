import { getAuthSession } from "@/lib/auth"
import { historyService } from "@/lib/rest.service"
import { HistoryLine } from "./history-line"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export async function History() {
  const session = await getAuthSession()

  if (!session?.user.id) {
    return <></>
  }

  const conseils = await historyService.getConseilsFromHistory(session.user.id)

  if (conseils?.length == 0) {
    return <></>
  }

  return (
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <CardHeader>
        <CardTitle>Historique</CardTitle>
        <CardDescription>Permet de retrouver les pages visités facilement</CardDescription>
      </CardHeader>
      <CardContent>
        {conseils.map((conseil, index) => (
          <HistoryLine key={`${index}-${conseil.id}`} conseil={conseil} />
        ))}
      </CardContent>
    </Card>
  )
}
