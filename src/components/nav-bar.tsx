import AuthBtn from "@/components/auth-btn"
import { SwitchTheme } from "@/components/switch-theme"
import Image from "next/image"
import Link from "next/link"

export async function NavBar() {
  return (
    <nav className="flex items-center justify-around sticky top-0 left-0 z-20 w-full h-[90px] border-b border-gray-200">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo-parole-aux-parents" width={70} height={70} />
      </Link>
      <div className="flex gap-5 items-center">
        <SwitchTheme />
        <AuthBtn />
      </div>
    </nav>
  )
}
