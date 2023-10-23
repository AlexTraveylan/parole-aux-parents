import { currentUser } from "@/lib/auth"
import { questionService } from "@/lib/rest.service"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { question_id: string } }) {
  const { user_id, user_name } = currentUser()

  if (!user_id || !params.question_id) {
    return NextResponse.json({ message: "Connexion requise." }, { status: 403 })
  }

  const reports = await questionService.getQuestionReports(params.question_id)

  const user_report = reports?.reports.find((report) => report.author_id == user_id && report.questionId == params.question_id)

  return NextResponse.json({ message: "Récupération des reports ok", isReported: user_report ? true : false })
}
