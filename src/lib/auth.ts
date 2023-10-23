import { verifyAccessToken } from "@/lib/auth.service"
import { cookies } from "next/headers"

export const currentUser: () => { user_id: string | null; user_name?: string | null } = () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")

  let user_id = null
  let user_name = null

  if (!accessToken) {
    return { user_id, user_name }
  }

  const payload = verifyAccessToken(accessToken.value)
  if (!payload) {
    return { user_id, user_name }
  }

  const { userId, userName } = payload
  user_id = userId
  user_name = userName

  return { user_id, user_name }
}
