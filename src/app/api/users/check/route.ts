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
    return NextResponse.json({ message: "Echec de la connexion" }, { status: 400 })
  }

  let user_from_data: CreateUser
  try {
    user_from_data = createUser.parse({ username: username, password: hashedPassword })
  } catch {
    return NextResponse.json({ message: "Echec de la connexion" }, { status: 400 })
  }

  const doubleHashedMaster = CryptoJS.SHA256(hashedPassword + supersalt).toString(CryptoJS.enc.Hex)

  const new_user = await userService.findByUserName(user_from_data.username)
  if (!new_user || doubleHashedMaster != new_user.password) {
    return NextResponse.json({ message: "Echec de la connexion" }, { status: 400 })
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

  return NextResponse.json({ message: "Connexion réussie" }, { status: 200 })
}
