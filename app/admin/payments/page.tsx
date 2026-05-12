import { Search, MoreHorizontal, Eye, CheckCircle, Clock, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
const payments = [
  { id: "1", user: "João Silva", email: "joao@email.com", page: "maria-joao", amount: 890, status: "completed", date: "2024-03-15 14:32" },
  { id: "2", user: "Maria Santos", email: "maria@email.com", page: "carlos-maria", amount: 890, status: "completed", date: "2024-03-15 14:25" },
  { id: "3", user: "Pedro Costa", email: "pedro@email.com", page: "ana-pedro", amount: 890, status: "pending", date: "2024-03-15 14:18" },
  { id: "4", user: "Ana Oliveira", email: "ana@email.com", page: "lucas-ana", amount: 890, status: "completed", date: "2024-03-15 13:45" },
  { id: "5", user: "Lucas Lima", email: "lucas@email.com", page: "carol-lucas", amount: 890, status: "failed", date: "2024-03-15 13:30" },
  { id: "6", user: "Carla Mendes", email: "carla@email.com", page: "rafael-carla", amount: 890, status: "completed", date: "2024-03-15 12:58" },
  { id: "7", user: "Rafael Santos", email: "rafael@email.com", page: "julia-rafael", amount: 890, status: "completed", date: "2024-03-15 12:15" },
  { id: "8", user: "Julia Ferreira", email: "julia@email.com", page: "marcos-julia", amount: 890, status: "completed", date: "2024-03-15 11:42" },
]

const statusConfig = {
  completed: {
    label: "Confirmado",
    icon: CheckCircle,
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  pending: {
    label: "Pendente",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
  failed: {
    label: "Falhou",
    icon: XCircle,
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
}

export default function AdminPaymentsPage() {
  const totalRevenue = payments
    .filter(p => p.status === "completed")
    .reduce((acc, p) => acc + p.amount, 0)

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
            Pagamentos
          </h1>
          <p className="text-muted-foreground mt-1">
            Histórico de transações via PIX
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-foreground">
              R$ {(totalRevenue / 100).toFixed(2).replace('.', ',')}
            </p>
            <p className="text-sm text-muted-foreground">Receita Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-foreground">
              {payments.filter(p => p.status === "completed").length}
            </p>
            <p className="text-sm text-muted-foreground">Confirmados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-foreground">
              {payments.filter(p => p.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-semibold text-foreground">
              {payments.filter(p => p.status === "failed").length}
            </p>
            <p className="text-sm text-muted-foreground">Falhas</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar por usuário, email ou página..." 
          className="pl-10"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Página</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => {
                const status = statusConfig[payment.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                
                return (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{payment.user}</p>
                        <p className="text-sm text-muted-foreground">{payment.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      /p/{payment.page}
                    </TableCell>
                    <TableCell className="font-medium">
                      R$ {(payment.amount / 100).toFixed(2).replace('.', ',')}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", status.className)}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.date}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
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
