"use client"

import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"

export const LoginButton = () => {
  return <Button onClick={() => signIn()}>Se connecter</Button>
}

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Déconnexion</Button>
}
