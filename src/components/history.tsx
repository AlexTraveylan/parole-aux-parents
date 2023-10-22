import { historyService } from "@/lib/rest.service"
import { auth } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { HistoryLine } from "./history-line"

export async function History() {
  const { userId } = auth()

  if (!userId) {
    return <></>
  }

  const conseils = await historyService.getConseilsFromHistory(userId)

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
