import { questionService } from "@/lib/rest.service"

export async function Questions({ conseil_id }: { conseil_id: string }) {
  const questions = await questionService.findAll()

  return (
    <ul>
      {questions.map((question, index) => (
        <li key={index}>
          {question.title} : {question.content} by {question.author}{" "}
        </li>
      ))}
    </ul>
  )
}
