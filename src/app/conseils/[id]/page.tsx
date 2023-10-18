import { ConseilHeaderCard } from "@/components/conseil-header-card"
import { CreateQuestionForm } from "@/components/create-question-form"
import { Questions } from "@/components/questions"
import { conseilService } from "@/lib/rest.service"
import { auth } from "@clerk/nextjs"

export default async function ConseilPage({ params }: { params: { id: string } }) {
  const { userId } = auth()
  const curent_conseil = await conseilService.findById(params.id)
  if (!curent_conseil || !userId) {
    throw new Error("Pas d'acces ou pas de conseil")
  }

  return (
    <>
      <ConseilHeaderCard conseil={curent_conseil} />
      <CreateQuestionForm conseil_id={curent_conseil.id} />
      <Questions conseil_id={curent_conseil.id} />
    </>
  )
}
