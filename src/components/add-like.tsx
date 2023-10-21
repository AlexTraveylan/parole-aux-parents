"use client"

import { GetAllLikeType } from "@/app/api/likes/comment/[comment_id]/getAll/route"
import style from "@/components/style.module.css"
import { useEffect, useState } from "react"
import { ThumbsUp } from "../../node_modules/lucide-react"
import { toast } from "./ui/use-toast"

export function AddLike({ question_id }: { question_id: string }) {
  const [isLiked, setIsLiked] = useState(false)
  const [nbLikes, setNbLikes] = useState(0)

  async function getlikes() {
    const reponse = await fetch(`/api/likes/question/${question_id}/getAll`)

    if (!reponse.ok) {
      toast({
        description: "Echec de récupération des likes",
        variant: "destructive",
      })
    }

    const likes: GetAllLikeType = await reponse.json()
    setNbLikes(likes.nb_likes)
    setIsLiked(likes.isLiked)
  }

  async function handleToogleLike() {
    const reponse = await fetch(`/api/likes/question/${question_id}/action`)

    if (!reponse.ok) {
      toast({
        description: "Echec de l'action like",
        variant: "destructive",
      })
    }

    getlikes()
  }

  useEffect(() => {
    getlikes()
  }, [])

  return (
    <div className="flex gap-2 items-center">
      <ThumbsUp className={isLiked ? style.like__active : ""} onClick={handleToogleLike} />
      <div>{nbLikes}</div>
    </div>
  )
}
