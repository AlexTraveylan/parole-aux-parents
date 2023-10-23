import { generateAccessToken, generateRefreshToken } from "@/lib/auth.service"
import { userService } from "@/lib/rest.service"
import { CreateUser, createUser } from "@/lib/schema-zod"
import CryptoJS from "crypto-js"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { username, hashedPassword } = await request.json()
  const supersalt = process.env.NEXT_PUBLIC_SUPERMASTERSALT

  if (!username || !hashedPassword || !supersalt) {
    return NextResponse.json({ message: "Il manque des informations" })
  }

  let user_from_data: CreateUser
  try {
    user_from_data = createUser.parse({ username: username, password: "jepeuxpascheckca" })
  } catch {
    return NextResponse.json({ message: "Données non valides" }, { status: 400 })
  }

  console.log(username, hashedPassword)

  const doubleHashedMaster = CryptoJS.SHA256(hashedPassword + supersalt).toString(CryptoJS.enc.Hex)

  const new_user = await userService.create({ username: user_from_data.username, password: doubleHashedMaster })
  if (!new_user) {
    return NextResponse.json({ message: "Echec de la création" }, { status: 400 })
  }

  const accessToken = generateAccessToken(new_user.id, new_user.username)
  const refreshToken = generateRefreshToken(new_user.id, new_user.username)

  const cookieHeaders = cookies()
  cookieHeaders.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 600,
    path: "/",
  })

  cookieHeaders.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 600,
    path: "/",
  })

  return NextResponse.json({ message: "Création de l'utilisateur reussi" }, { status: 201 })
}
