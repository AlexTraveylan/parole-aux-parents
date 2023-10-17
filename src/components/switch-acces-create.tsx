"use client"

import { useState } from "react"
import { AccesConseilFrom } from "./acces-conseil-form"
import { CreateConseilFrom } from "./create-conseil-form"

export function SwitchAccesCreateConseil() {
  const [isCreate, setIsCreate] = useState(false)

  return <>{isCreate ? <CreateConseilFrom setIsCreate={setIsCreate} /> : <AccesConseilFrom setIsCreate={setIsCreate} />}</>
}
