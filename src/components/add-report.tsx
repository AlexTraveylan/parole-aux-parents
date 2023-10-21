"use client"

import { GetReportType } from "@/app/api/reports/comment/[comment_id]/getAll/route"
import { useEffect, useState } from "react"
import { Flag } from "../../node_modules/lucide-react"
import { toast } from "./ui/use-toast"

export function AddReport({ question_id }: { question_id: string }) {
  const [isReported, setIsReported] = useState(false)

  async function getReports() {
    const reponse = await fetch(`/api/reports/question/${question_id}/getAll`)

    if (!reponse.ok) {
      toast({
        description: "Echec de récupération des reports",
        variant: "destructive",
      })
    }

    const likes: GetReportType = await reponse.json()
    setIsReported(likes.isReported)
  }

  async function handleToogleLike() {
    const reponse = await fetch(`/api/reports/question/${question_id}/action`)

    if (!reponse.ok) {
      toast({
        description: "Echec de l'action report",
        variant: "destructive",
      })
    }

    getReports()
  }

  useEffect(() => {
    getReports()
  }, [])

  if (isReported) {
    return <Flag className="text-red-800" onClick={handleToogleLike} />
  }

  return <Flag onClick={handleToogleLike} />
}
