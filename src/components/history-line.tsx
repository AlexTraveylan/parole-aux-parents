"use client"
import { Conseil } from "@prisma/client"
import { Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "./ui/use-toast"

export function HistoryLine({ conseil }: { conseil: Conseil }) {
  const router = useRouter()
  async function handleDelete() {
    const reponse = await fetch(`/api/history/${conseil.id}`)

    if (!reponse.ok) {
      toast({
        description: "Echec de la suppression",
        variant: "destructive",
      })
    }

    router.refresh()
  }

  return (
    <div className="flex gap-5">
      <Trash onClick={handleDelete} className="text-red-800 cursor-pointer" />
      <Link href={`conseils/${conseil.password}`}>
        {conseil.school_name} : {conseil.password}
      </Link>
    </div>
  )
}
