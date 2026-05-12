"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <span className="font-serif text-lg font-semibold text-foreground">LovePage</span>
          </Link>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/app/create">Criar Página</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden py-4 border-t border-border/30">
            <div className="flex flex-col gap-3">
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/app/create" onClick={() => setIsMenuOpen(false)}>Criar Página</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
