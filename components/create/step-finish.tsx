"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Lock, QrCode, Copy, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { CreateLovePageData } from "@/lib/types"
import { themeConfig, LOVEPAGE_PRICE } from "@/lib/types"

type StepFinishProps = {
  data: CreateLovePageData
  onPrev: () => void
}

export function StepFinish({ data, onPrev }: StepFinishProps) {
  const [showPayment, setShowPayment] = useState(false)
  const [copied, setCopied] = useState(false)

  const theme = themeConfig[data.theme]
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540589.905802BR5925LOVEPAGE TECNOLOGIA LTDA6009SAO PAULO62070503***6304ABCD"

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Quase lá!
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground text-balance">
          Sua página está pronta
        </h1>
        <p className="text-muted-foreground mt-2">
          Veja o preview e libere com o pagamento
        </p>
      </div>

      {/* Preview with elegant paywall */}
      <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
        {/* Mini preview of the page */}
        <div className={cn("p-8 sm:p-12", theme.bg)}>
          <div className="text-center space-y-4">
            <p className={cn("text-sm uppercase tracking-wider opacity-70", theme.accent)}>
              Para {data.receiverName}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground/90 line-clamp-2">
              {data.message.slice(0, 80)}{data.message.length > 80 ? "..." : ""}
            </h2>
            
            {/* Photo thumbnails */}
            {data.photos.length > 0 && (
              <div className="flex justify-center gap-2 pt-4">
                {data.photos.slice(0, 4).map((photo, i) => (
                  <div key={i} className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shadow-md">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                {data.photos.length > 4 && (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-black/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-foreground/60">+{data.photos.length - 4}</span>
                  </div>
                )}
              </div>
            )}
            
            <p className={cn("text-sm pt-2", theme.accent)}>
              Com amor, {data.senderName}
            </p>
          </div>
        </div>

        {/* Elegant blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            Preview bloqueado
          </h3>
          <p className="text-muted-foreground text-sm text-center mb-6 max-w-xs">
            Pague para liberar sua página e receber o link exclusivo para enviar
          </p>
          <Button onClick={() => setShowPayment(true)} size="lg" className="h-14 px-8 text-base shadow-lg">
            <Heart className="mr-2 h-5 w-5 fill-current" />
            Liberar por R$ {LOVEPAGE_PRICE.toFixed(2).replace(".", ",")}
          </Button>
        </div>
      </div>

      {/* Summary - minimal */}
      <div className="flex items-center justify-between py-4 border-t border-b border-border/50">
        <div className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">{data.photos.length} fotos</span> · Tema {theme.name}
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Pagamento único</p>
          <p className="text-lg font-semibold text-foreground">R$ {LOVEPAGE_PRICE.toFixed(2).replace(".", ",")}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={onPrev}
          size="lg"
          className="h-14"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Editar
        </Button>
        <Button 
          onClick={() => setShowPayment(true)}
          size="lg"
          className="flex-1 h-14 text-base"
        >
          <Heart className="mr-2 h-5 w-5 fill-current" />
          Pagar via PIX
        </Button>
      </div>

      {/* Payment Modal - clean and focused */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-sm p-0 overflow-hidden">
          <div className="bg-primary/5 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Valor a pagar</p>
            <p className="text-4xl font-semibold text-foreground">
              R$ {LOVEPAGE_PRICE.toFixed(2).replace(".", ",")}
            </p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-white rounded-xl border border-border flex items-center justify-center p-4">
                <QrCode className="h-full w-full text-foreground" />
              </div>
            </div>

            {/* Copy PIX */}
            <Button
              variant="outline"
              onClick={handleCopyPix}
              className="w-full h-12"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  Código copiado!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar código PIX
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Após o pagamento, sua página será liberada automaticamente em até 1 minuto.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
