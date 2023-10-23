import jwt, { JwtPayload } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the envronement.")
}

if (!JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is not defined in the envronement.")
}

interface AccessTokenPayload extends JwtPayload {
  userId: string
  type: "access" | "refresh"
  userName: string
}

export const generateAccessToken = (userId: string, userName: string) => {
  const payload: AccessTokenPayload = {
    userId: userId,
    type: "access",
    userName: userName,
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "10h" })
}

export const generateRefreshToken = (userId: string, userName: string): string => {
  const payload: AccessTokenPayload = {
    userId: userId,
    type: "refresh",
    userName: userName,
  }

  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "10h" })
}

export const verifyAccessToken = (token: string): AccessTokenPayload | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AccessTokenPayload
    return payload
  } catch (err) {
    return null
  }
}

export const verifyRefreshToken = (token: string): AccessTokenPayload | null => {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET) as AccessTokenPayload
    return payload
  } catch (err) {
    return null
  }
}
