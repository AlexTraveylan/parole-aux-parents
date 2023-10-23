import { currentUser } from "@/lib/auth"

export async function AuthBtn() {
  const { user_id, user_name } = currentUser()
  if (!user_id) {
    return <div>Non connecté</div>
  }
  return <div>{user_name}</div>
}
