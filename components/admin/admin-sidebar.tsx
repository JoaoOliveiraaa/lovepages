"use client"

import Link from "next/link"
import { Heart, Users, FileHeart, CreditCard, BarChart3, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Usuários", href: "/admin/users", icon: Users },
  { name: "Páginas", href: "/admin/pages", icon: FileHeart },
  { name: "Pagamentos", href: "/admin/payments", icon: CreditCard },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
]

function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Logo */}
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span className="font-serif text-xl font-semibold text-foreground">LovePage</span>
          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full ml-1">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}

export function AdminMobileHeader() {
  return (
    <header className="lg:hidden flex items-center justify-between p-4 bg-background border-b border-border">
      <Link href="/admin" className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-primary fill-primary" />
        <span className="font-serif text-lg font-semibold text-foreground">LovePage</span>
      </Link>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </header>
  )
}

export function AdminDesktopSidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-background border-r border-border">
      <Sidebar />
    </aside>
  )
}
