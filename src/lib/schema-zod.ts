import { z } from "zod"

const regex_password = /^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:\D*\d){2})[a-zA-Z0-9]{8}$/

export const accesConseil = z.object({
  password: z.string().regex(regex_password, { message: "Le format du code est incorrect" }),
})

export const createConseil = z.object({
  password: z
    .string()
    .regex(regex_password, { message: "Le code doit contenir que des chiffres ou des lettres, au moins 2 lettres majuscules et 1 chiffre" }),
  limit_time: z.date(),
})
