import prisma from "@/lib/prisma-client"
import { Comment, Conseil, Question } from "@prisma/client"

interface RestApi<T> {
  create(data: T): Promise<T>
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  update(id: string, data: T): Promise<T | null>
  delete(id: string): Promise<boolean>
}

class ConseilService implements RestApi<Conseil> {
  async create(data: Conseil): Promise<Conseil> {
    return prisma.conseil.create({ data })
  }

  async findById(id: string): Promise<Conseil | null> {
    return prisma.conseil.findUnique({ where: { id } })
  }

  async findAll(): Promise<Conseil[]> {
    return prisma.conseil.findMany()
  }

  async update(id: string, data: Conseil): Promise<Conseil | null> {
    return prisma.conseil.update({ where: { id }, data })
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.conseil.delete({ where: { id } })
    return !!deleteResult
  }
}

class QuestionService implements RestApi<Question> {
  async create(data: Question): Promise<Question> {
    return prisma.question.create({ data })
  }

  async findById(id: string): Promise<Question | null> {
    return prisma.question.findUnique({ where: { id } })
  }

  async findAll(): Promise<Question[]> {
    return prisma.question.findMany()
  }

  async update(id: string, data: Question): Promise<Question | null> {
    return prisma.question.update({ where: { id }, data })
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.question.delete({ where: { id } })
    return !!deleteResult
  }
}

class CommentService implements RestApi<Comment> {
  async create(data: Comment): Promise<Comment> {
    return prisma.comment.create({ data })
  }

  async findById(id: string): Promise<Comment | null> {
    return prisma.comment.findUnique({ where: { id } })
  }

  async findAll(): Promise<Comment[]> {
    return prisma.comment.findMany()
  }

  async update(id: string, data: Comment): Promise<Comment | null> {
    return prisma.comment.update({ where: { id }, data })
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.question.delete({ where: { id } })
    return !!deleteResult
  }
}

const conseilService = new ConseilService()
const questionService = new QuestionService()
const commentService = new CommentService()

export { commentService, conseilService, questionService }
