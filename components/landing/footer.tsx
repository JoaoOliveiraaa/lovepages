import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-10 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary fill-primary" />
            <span className="font-serif text-sm font-medium text-foreground">LovePage</span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/termos" className="hover:text-foreground transition-colors">
              Termos
            </Link>
            <Link href="/privacidade" className="hover:text-foreground transition-colors">
              Privacidade
            </Link>
            <span>&copy; {new Date().getFullYear()}</span>
          </nav>
        </div>
      </div>
    </footer>
  )
}
