import { commentService } from "@/lib/rest.service"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

export type GetReportType = {
  message: string
  isReported: boolean
}

export async function GET(request: NextRequest, { params }: { params: { comment_id: string } }) {
  const { userId } = auth()

  if (!userId || !params.comment_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const reports = await commentService.getCommentReports(params.comment_id)

  const user_report = reports?.reports.find((report) => report.author_id == userId && report.commentId == params.comment_id)

  return NextResponse.json({ message: "Récupération des reports ok", isReported: user_report ? true : false })
}
