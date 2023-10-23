import { Footer } from "@/components/footer"
import { NavBar } from "@/components/nav-bar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Parole aux parents",
  description: "Web app pour préparer les conseils d'école",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* 90px */}
          <NavBar />
          <main className="min-h-[calc(100vh-180px)] flex flex-col items-center">{children}</main>
          <Toaster />
          {/* 90xp */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
