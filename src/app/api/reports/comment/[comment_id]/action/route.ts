import { getRequiredAuthSession } from "@/lib/auth"
import { commentService, reportService } from "@/lib/rest.service"
import { Report } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { comment_id: string } }) {
  const session = await getRequiredAuthSession()

  if (!session.user.id || !params.comment_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const reports = await commentService.getCommentReports(params.comment_id)

  const user_reports = reports?.reports.find((report) => report.author_id == session.user.id)

  if (!user_reports) {
    const data_report: Omit<Report, "id"> = {
      author_id: session.user.id,
      questionId: null,
      commentId: params.comment_id,
    }
    const new_report = await reportService.create(data_report)

    return NextResponse.json({ message: "Report ajouté", report: new_report }, { status: 201 })
  }

  const isDeletedReport = await reportService.delete(user_reports.id)
  if (!isDeletedReport) {
    return NextResponse.json({ message: "Echec de la suppression." }, { status: 400 })
  }

  return NextResponse.json({ message: "Report supprimé" }, { status: 200 })
}
