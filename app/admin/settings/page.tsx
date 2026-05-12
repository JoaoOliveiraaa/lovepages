import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
          Configurações
        </h1>
        <p className="text-muted-foreground mt-1">
          Configurações gerais da plataforma
        </p>
      </div>

      <div className="space-y-6">
        {/* General */}
        <Card>
          <CardHeader>
            <CardTitle>Geral</CardTitle>
            <CardDescription>
              Configurações básicas do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Nome do Site</Label>
              <Input id="site-name" defaultValue="LovePage" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Descrição</Label>
              <Textarea 
                id="site-description" 
                defaultValue="Crie páginas românticas personalizadas para surpreender quem você ama"
              />
            </div>
            <Button>Salvar</Button>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Preços</CardTitle>
            <CardDescription>
              Configurações de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço por Página (em centavos)</Label>
              <Input id="price" type="number" defaultValue="890" />
              <p className="text-xs text-muted-foreground">
                Ex: 890 = R$ 8,90
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="page-duration">Duração da Página (dias)</Label>
              <Input id="page-duration" type="number" defaultValue="365" />
            </div>
            <Button>Salvar</Button>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades</CardTitle>
            <CardDescription>
              Ativar ou desativar recursos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Cadastro de novos usuários</p>
                <p className="text-sm text-muted-foreground">
                  Permitir que novos usuários se cadastrem
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Modo de manutenção</p>
                <p className="text-sm text-muted-foreground">
                  Exibir página de manutenção para usuários
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Notificações por email</p>
                <p className="text-sm text-muted-foreground">
                  Enviar emails de confirmação e notificações
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Payment Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Integração de Pagamento</CardTitle>
            <CardDescription>
              Configurações do Abacate Pay
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" defaultValue="••••••••••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-secret">Webhook Secret</Label>
              <Input id="webhook-secret" type="password" defaultValue="••••••••••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" disabled defaultValue="https://lovepage.com.br/api/webhooks/payment" />
              <p className="text-xs text-muted-foreground">
                Configure esta URL no painel do Abacate Pay
              </p>
            </div>
            <Button>Salvar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
