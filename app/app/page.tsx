"use client"

import Link from "next/link"
import { Plus, ExternalLink, Copy, Eye, Clock, CheckCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LovePage, LovePageStatus } from "@/lib/types"
import { statusConfig, LOVEPAGE_PRICE } from "@/lib/types"

// Mock data - in production this comes from backend
const mockPages: LovePage[] = [
  {
    id: "1",
    slug: "maria-joao",
    userId: "user1",
    senderName: "João",
    receiverName: "Maria",
    occasion: "namoro",
    message: "Você aceita namorar comigo?",
    photos: [],
    theme: "romantic",
    status: "active",
    views: 47,
    createdAt: "2024-02-14",
    paidAt: "2024-02-14",
    expiresAt: "2025-02-14",
  },
  {
    id: "2",
    slug: "ana-pedro",
    userId: "user1",
    senderName: "Pedro",
    receiverName: "Ana",
    occasion: "aniversario-namoro",
    message: "Feliz 1 ano de namoro, meu amor!",
    photos: [],
    theme: "elegant",
    status: "pending_payment",
    views: 0,
    createdAt: "2024-03-10",
  },
]

function PageCard({ page }: { page: LovePage }) {
  const status = statusConfig[page.status]
  const pageUrl = `https://lovepage.com.br/p/${page.slug}`

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl)
  }

  return (
    <div className="group relative bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all">
      {/* Status badge */}
      <div className={cn(
        "absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium",
        status.bgColor, status.color
      )}>
        {page.status === "active" && <CheckCircle className="inline-block w-3 h-3 mr-1" />}
        {page.status === "pending_payment" && <Clock className="inline-block w-3 h-3 mr-1" />}
        {status.label}
      </div>

      {/* Content */}
      <div className="pr-24">
        <p className="text-sm text-muted-foreground mb-1">Para</p>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
          {page.receiverName}
        </h3>
        
        {page.status === "active" && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {page.views} visualizações
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2">
        {page.status === "active" && (
          <>
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href={`/p/${page.slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver página
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={copyLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {page.status === "pending_payment" && (
          <Button size="sm" className="flex-1">
            Pagar R$ {LOVEPAGE_PRICE.toFixed(2).replace(".", ",")}
          </Button>
        )}
      </div>
    </div>
  )
}

export default function AppDashboard() {
  const hasPages = mockPages.length > 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
            Suas páginas
          </h1>
          <p className="text-muted-foreground mt-1">
            {hasPages 
              ? `${mockPages.length} ${mockPages.length === 1 ? "página criada" : "páginas criadas"}`
              : "Crie sua primeira página de amor"
            }
          </p>
        </div>
        <Button asChild>
          <Link href="/app/create">
            <Plus className="mr-2 h-4 w-4" />
            Nova página
          </Link>
        </Button>
      </div>

      {/* Pages */}
      {hasPages ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {mockPages.map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
            Nenhuma página ainda
          </h2>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Crie uma página especial para surpreender quem você ama
          </p>
          <Button size="lg" asChild>
            <Link href="/app/create">
              <Plus className="mr-2 h-5 w-5" />
              Criar minha primeira página
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
