import { getAuthSession } from "@/lib/auth"
import { LoginButton, LogoutButton } from "./login-button"

export async function AuthBtn() {
  const session = await getAuthSession()

  if (session) {
    return <LogoutButton />
  }
  return <LoginButton />
}
