import { Card } from "./card"

export async function Separator({ texte }: { texte: string }) {
  return <Card className="min-w-[350px] w-screen max-w-[700px] text-center py-5">{texte}</Card>
}
