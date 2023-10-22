import prisma from "@/lib/prisma-client"
import { Comment, Conseil, History, Like, Question, Report } from "@prisma/client"

interface RestApi<T> {
  create(data: Omit<T, "id">): Promise<T>
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  update(id: string, data: Omit<T, "id">): Promise<T | null>
  delete(id: string): Promise<boolean>
}

class ConseilService implements RestApi<Conseil> {
  async create(data: Omit<Conseil, "id" | "createdAt">): Promise<Conseil> {
    return prisma.conseil.create({ data })
  }

  async findById(id: string): Promise<Conseil | null> {
    return prisma.conseil.findUnique({ where: { id } })
  }

  async findAll(): Promise<Conseil[]> {
    return prisma.conseil.findMany()
  }

  async update(id: string, data: Omit<Conseil, "id">): Promise<Conseil | null> {
    return prisma.conseil.update({ where: { id }, data })
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.conseil.delete({ where: { id } })
    return !!deleteResult
  }

  async findByPassword(password: string): Promise<Conseil | null> {
    return prisma.conseil.findUnique({ where: { password } })
  }
}

class QuestionService implements RestApi<Question> {
  async create(data: Omit<Question, "id" | "createdAt" | "updatedAt">): Promise<Question> {
    return prisma.question.create({ data })
  }

  async findById(id: string): Promise<Question | null> {
    return prisma.question.findUnique({ where: { id } })
  }

  async findAll(): Promise<Question[]> {
    return prisma.question.findMany()
  }

  async update(id: string, data: Omit<Question, "id">): Promise<Question | null> {
    return prisma.question.update({ where: { id }, data })
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.question.delete({ where: { id } })
    return !!deleteResult
  }

  async getQuestionLikes(question_id: string): Promise<(Question & { likes: Like[] }) | null> {
    const questionWithLikes = await prisma.question.findUnique({
      where: {
        id: question_id,
      },
      include: {
        likes: true,
      },
    })

    return questionWithLikes
  }

  async getQuestionReports(question_id: string): Promise<(Question & { reports: Report[] }) | null> {
    const questionWithReports = await prisma.question.findUnique({
      where: {
        id: question_id,
      },
      include: {
        reports: true,
      },
    })
    return questionWithReports
  }
}

class CommentService implements RestApi<Comment> {
  async create(data: Omit<Comment, "id" | "createdAt" | "updatedAt" | "is_reviewed">): Promise<Comment> {
    return prisma.comment.create({ data })
  }

  async findById(id: string): Promise<Comment | null> {
    return prisma.comment.findUnique({ where: { id } })
  }

  async findAll(): Promise<Comment[]> {
    return prisma.comment.findMany()
  }

  async findAllByQuestionId(question_id: string): Promise<Comment[]> {
    return prisma.comment.findMany({
      where: {
        questionId: question_id,
      },
    })
  }

  async update(id: string, data: Omit<Comment, "id">): Promise<Comment | null> {
    return prisma.comment.update({ where: { id }, data })
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.question.delete({ where: { id } })
    return !!deleteResult
  }

  async getCommentLikes(comment_id: string): Promise<(Comment & { likes: Like[] }) | null> {
    const commentWithLikes = await prisma.comment.findUnique({
      where: {
        id: comment_id,
      },
      include: {
        likes: true,
      },
    })

    return commentWithLikes
  }

  async getCommentReports(comment_id: string): Promise<(Comment & { reports: Report[] }) | null> {
    const commentWithReports = await prisma.comment.findUnique({
      where: {
        id: comment_id,
      },
      include: {
        reports: true,
      },
    })
    return commentWithReports
  }
}

class LikeService implements RestApi<Like> {
  async create(data: Omit<Like, "id">): Promise<Like> {
    return prisma.like.create({ data })
  }

  async findById(id: string): Promise<Like | null> {
    return prisma.like.findUnique({ where: { id } })
  }

  async findAll(): Promise<Like[]> {
    return prisma.like.findMany()
  }

  async update(id: string, data: Omit<Like, "id">): Promise<Like | null> {
    return prisma.like.update({ where: { id }, data })
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.like.delete({ where: { id } })
    return !!deleteResult
  }
}

class ReportService implements RestApi<Report> {
  async create(data: Omit<Report, "id">): Promise<Report> {
    return prisma.report.create({ data })
  }

  async findById(id: string): Promise<Report | null> {
    return prisma.report.findUnique({ where: { id } })
  }

  async findAll(): Promise<Report[]> {
    return prisma.report.findMany()
  }

  async update(id: string, data: Omit<Report, "id">): Promise<Report | null> {
    return prisma.report.update({ where: { id }, data })
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await prisma.report.delete({ where: { id } })
    return !!deleteResult
  }
}

class HistoryService {
  async create(history: Omit<History, "id">): Promise<History> {
    const newHistory = await prisma.history.create({
      data: {
        user_id: history.user_id,
      },
    })
    return newHistory
  }

  async addConseilToHistory(historyId: string, conseilId: string): Promise<History | null> {
    const updatedHistory = await prisma.history.update({
      where: { id: historyId },
      data: {
        conseil: {
          connect: [{ id: conseilId }],
        },
      },
    })
    return updatedHistory
  }

  async removeConseilFromHistory(historyId: string, conseilId: string): Promise<History | null> {
    const updatedHistory = await prisma.history.update({
      where: { id: historyId },
      data: {
        conseil: {
          disconnect: [{ id: conseilId }],
        },
      },
    })
    return updatedHistory
  }
}

const conseilService = new ConseilService()
const questionService = new QuestionService()
const commentService = new CommentService()
const likeService = new LikeService()
const reportService = new ReportService()
const historyService = new HistoryService()

export { commentService, conseilService, historyService, likeService, questionService, reportService }
