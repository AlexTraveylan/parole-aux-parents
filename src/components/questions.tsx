import { questionService } from "@/lib/rest.service"
import { QuestionCard } from "./question-card"

export async function Questions({ conseil_id }: { conseil_id: string }) {
  const questions = await questionService.findAll()

  return (
    <div>
      {questions.map((question, index) => (
        <QuestionCard key={index} question={question} index={index} />
      ))}
    </div>
  )
}
