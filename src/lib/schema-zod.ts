import { z } from "zod"

const regex_password = /^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:\D*\d){2})[a-zA-Z0-9]{8}$/

export const accesConseil = z.object({
  password: z.string().regex(regex_password, { message: "Le format du code est incorrect" }),
})

export const createConseil = z.object({
  password: z.string().regex(regex_password, {
    message: "Le code doit contenir 8 caractèresavec des chiffres ou des lettres, au moins 2 lettres majuscules et 1 chiffre",
  }),
  limit_time: z.date(),
  school_name: z.string().min(5).max(128),
})

export type CreateConseil = {
  password: string
  limit_time: Date
  school_name: string
}

export const createQuestion = z.object({
  title: z.string().min(4).max(256),
  content: z.string().min(10).max(4048),
})

export type CreateQuestion = {
  title: string
  content: string
}

export const addingComment = z.object({
  content: z.string().min(10).max(4048),
})

export type AddingComment = {
  content: string
}

export const createUser = z.object({
  username: z.string().min(4).max(64),
  password: z.string().min(6).max(20),
})

export type CreateUser = {
  username: string
  password: string
}
