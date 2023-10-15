"use client"

import { useTheme } from "next-themes"
import { useState } from "react"
import { Moon, Sun } from "../../node_modules/lucide-react"

export function SwitchTheme() {
  const { systemTheme, setTheme } = useTheme()
  const [actualTheme, setActualTheme] = useState<"dark" | "light">(systemTheme ? systemTheme : "light")

  function toogleActualTheme() {
    if (actualTheme == "dark") {
      setActualTheme("light")
      setTheme("light")
    } else {
      setActualTheme("dark")
      setTheme("dark")
    }
  }
  return (
    <header>
      <div onClick={toogleActualTheme} className="cursor-pointer inline-flex">
        <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-slate-400" />
        <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-slate-400" />
      </div>
    </header>
  )
}
