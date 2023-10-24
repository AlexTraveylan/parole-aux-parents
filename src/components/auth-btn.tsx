import { currentUser } from "@/lib/auth"
import Link from "next/link"
import { Button } from "./ui/button"

export async function AuthBtn() {
  const { user_id, user_name } = currentUser()
  if (!user_id) {
    return (
      <Link href={"/"}>
        <Button>Se connecter</Button>
      </Link>
    )
  }
  return <div>{user_name}</div>
}
