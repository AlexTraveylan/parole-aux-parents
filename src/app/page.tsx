import { History } from "@/components/history"
import { SwitchAccesCreateConseil } from "@/components/switch-acces-create"
import { SwitchLoginSignin } from "@/components/switch-login-signin"
import { currentUser } from "@/lib/auth"

export default async function Home() {
  const { user_id, user_name } = currentUser()

  return (
    <>
      {!user_id && <SwitchLoginSignin />}
      <SwitchAccesCreateConseil />
      <History />
    </>
  )
}
