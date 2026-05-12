import { Search, MoreHorizontal, Eye, ExternalLink, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Mock data
const pages = [
  { id: "1", slug: "maria-joao", receiver: "Maria", sender: "João", status: "active", views: 47, created: "2024-02-14" },
  { id: "2", slug: "ana-pedro", receiver: "Ana", sender: "Pedro", status: "pending_payment", views: 0, created: "2024-03-10" },
  { id: "3", slug: "carol-lucas", receiver: "Carol", sender: "Lucas", status: "expired", views: 123, created: "2023-06-15" },
  { id: "4", slug: "julia-marcos", receiver: "Julia", sender: "Marcos", status: "active", views: 89, created: "2024-03-01" },
  { id: "5", slug: "beatriz-rafael", receiver: "Beatriz", sender: "Rafael", status: "active", views: 234, created: "2024-01-20" },
  { id: "6", slug: "fernanda-gabriel", receiver: "Fernanda", sender: "Gabriel", status: "pending_payment", views: 0, created: "2024-03-12" },
  { id: "7", slug: "amanda-thiago", receiver: "Amanda", sender: "Thiago", status: "active", views: 56, created: "2024-02-28" },
  { id: "8", slug: "camila-diego", receiver: "Camila", sender: "Diego", status: "active", views: 178, created: "2024-02-10" },
]

const statusConfig = {
  active: {
    label: "Ativa",
    icon: CheckCircle,
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  pending_payment: {
    label: "Pendente",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
  expired: {
    label: "Expirada",
    icon: AlertCircle,
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
}

export default function AdminPagesPage() {
  const totalViews = pages.reduce((acc, p) => acc + p.views, 0)

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
            Páginas
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todas as LovePages criadas
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-foreground">{pages.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-foreground">
              {pages.filter(p => p.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-foreground">
              {pages.filter(p => p.status === "pending_payment").length}
            </p>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-foreground">{totalViews}</p>
            <p className="text-sm text-muted-foreground">Views Totais</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar por slug, remetente ou destinatário..." 
          className="pl-10"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Página</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Criada em</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => {
                const status = statusConfig[page.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                
                return (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">
                          Para {page.receiver}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          De {page.sender} • /p/{page.slug}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", status.className)}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        {page.views}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(page.created).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {page.status === "active" && (
                            <DropdownMenuItem>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Ver Página
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
