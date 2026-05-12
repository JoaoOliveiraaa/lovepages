import type { Metadata } from "next"
import Link from "next/link"
import { Heart } from "lucide-react"
import { UserNav } from "@/components/app/user-nav"

export const metadata: Metadata = {
  title: "Minhas Páginas | LovePage",
  description: "Gerencie suas páginas românticas",
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mock user - in production this comes from auth/backend
  const user = {
    name: "João Silva",
    email: "joao@email.com",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link href="/app" className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span className="font-serif text-sm font-medium text-foreground">LovePage</span>
            </Link>

            <UserNav user={user} />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {children}
      </main>
    </div>
  )
}
