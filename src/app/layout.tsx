import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import "./globals.css"
import { NavBar } from "@/components/nav-bar"

export const metadata: Metadata = {
  title: "Parole aux parents",
  description: "Web app pour préparer les conseils d'école",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NavBar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
