"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { SignInForm } from "./sign-in-form"

export function SwitchLoginSignin() {
  const [isLogin, setIsLogin] = useState(true)

  if (isLogin) {
    return <LoginForm setIsLogin={setIsLogin} />
  }

  return <SignInForm setIsLogin={setIsLogin} />
}
