import { getRequiredAuthSession } from "@/lib/auth"
import { commentService } from "@/lib/rest.service"
import { NextRequest, NextResponse } from "next/server"

export type GetReportType = {
  message: string
  isReported: boolean
}

export async function GET(request: NextRequest, { params }: { params: { comment_id: string } }) {
  const session = await getRequiredAuthSession()

  if (!session.user.id || !params.comment_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const reports = await commentService.getCommentReports(params.comment_id)

  const user_report = reports?.reports.find((report) => report.author_id == session.user.id && report.commentId == params.comment_id)

  return NextResponse.json({ message: "Récupération des reports ok", isReported: user_report ? true : false })
}
