import { questionService, reportService } from "@/lib/rest.service"
import { currentUser } from "@clerk/nextjs"
import { Report } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { comment_id: string } }) {
  const user = await currentUser()

  if (!user || !params.comment_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const reports = await questionService.getQuestionReports(params.comment_id)

  const user_report = reports?.reports.find((report) => report.author_id == user.id)

  if (!user_report) {
    const data_report: Omit<Report, "id"> = {
      author_id: user.id,
      questionId: null,
      commentId: params.comment_id,
    }
    const new_report = await reportService.create(data_report)

    return NextResponse.json({ message: "Report ajouté", report: new_report }, { status: 201 })
  }

  const isDeletedReport = await reportService.delete(user_report.id)
  if (!isDeletedReport) {
    return NextResponse.json({ message: "Echec de la suppression." }, { status: 400 })
  }

  return NextResponse.json({ message: "Report supprimé" }, { status: 200 })
}
