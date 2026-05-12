import { Users, FileHeart, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data
const stats = [
  {
    name: "Total de Usuários",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "Páginas Criadas",
    value: "3,456",
    change: "+23%",
    changeType: "positive" as const,
    icon: FileHeart,
  },
  {
    name: "Receita Total",
    value: "R$ 30.750",
    change: "+18%",
    changeType: "positive" as const,
    icon: CreditCard,
  },
  {
    name: "Taxa de Conversão",
    value: "68%",
    change: "-2%",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
]

const recentPayments = [
  { id: "1", user: "João Silva", email: "joao@email.com", amount: "R$ 8,90", status: "completed", date: "Há 5 min" },
  { id: "2", user: "Maria Santos", email: "maria@email.com", amount: "R$ 8,90", status: "completed", date: "Há 12 min" },
  { id: "3", user: "Pedro Costa", email: "pedro@email.com", amount: "R$ 8,90", status: "pending", date: "Há 23 min" },
  { id: "4", user: "Ana Oliveira", email: "ana@email.com", amount: "R$ 8,90", status: "completed", date: "Há 45 min" },
  { id: "5", user: "Lucas Lima", email: "lucas@email.com", amount: "R$ 8,90", status: "completed", date: "Há 1 hora" },
]

const recentPages = [
  { id: "1", receiver: "Maria", sender: "João", status: "active", views: 47 },
  { id: "2", receiver: "Ana", sender: "Pedro", status: "pending", views: 0 },
  { id: "3", receiver: "Carol", sender: "Lucas", status: "active", views: 123 },
  { id: "4", receiver: "Julia", sender: "Marcos", status: "active", views: 89 },
  { id: "5", receiver: "Beatriz", sender: "Rafael", status: "pending", views: 0 },
]

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Visão geral da plataforma LovePage
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={cn(
                  "flex items-center text-sm font-medium",
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                )}>
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tables grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent payments */}
        <Card>
          <CardHeader>
            <CardTitle>Pagamentos Recentes</CardTitle>
            <CardDescription>Últimas transações via PIX</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {payment.user}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {payment.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {payment.amount}
                    </p>
                    <p className={cn(
                      "text-xs",
                      payment.status === "completed" ? "text-green-600" : "text-yellow-600"
                    )}>
                      {payment.status === "completed" ? "Confirmado" : "Pendente"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent pages */}
        <Card>
          <CardHeader>
            <CardTitle>Páginas Recentes</CardTitle>
            <CardDescription>Últimas páginas criadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPages.map((page) => (
                <div key={page.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      Para {page.receiver}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      De {page.sender}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      page.status === "active" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    )}>
                      {page.status === "active" ? "Ativa" : "Pendente"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {page.views} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
