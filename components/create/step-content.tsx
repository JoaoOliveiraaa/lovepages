"use client"

import { Heart, Gift, Calendar, MessageCircleHeart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { CreateLovePageData, LovePageOccasion } from "@/lib/types"

const occasions: { id: LovePageOccasion; label: string; icon: typeof Heart }[] = [
  { id: "namoro", label: "Pedido de Namoro", icon: Heart },
  { id: "aniversario-namoro", label: "Aniversário", icon: Calendar },
  { id: "carta-amor", label: "Declaração", icon: MessageCircleHeart },
  { id: "outro", label: "Outro", icon: Gift },
]

type StepContentProps = {
  data: CreateLovePageData
  updateData: (updates: Partial<CreateLovePageData>) => void
  onNext: () => void
}

export function StepContent({ data, updateData, onNext }: StepContentProps) {
  const isValid = data.senderName.trim() && data.receiverName.trim() && data.message.trim()

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground text-balance">
          Crie sua página de amor
        </h1>
        <p className="text-muted-foreground mt-2">
          Comece contando quem você quer surpreender
        </p>
      </div>

      {/* Names - side by side, clean */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="senderName" className="text-sm text-muted-foreground">De</Label>
            <Input
              id="senderName"
              placeholder="Seu nome"
              value={data.senderName}
              onChange={(e) => updateData({ senderName: e.target.value })}
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="receiverName" className="text-sm text-muted-foreground">Para</Label>
            <Input
              id="receiverName"
              placeholder="Nome dela(e)"
              value={data.receiverName}
              onChange={(e) => updateData({ receiverName: e.target.value })}
              className="h-12 text-base"
            />
          </div>
        </div>
      </div>

      {/* Occasion - compact pills */}
      <div className="space-y-3">
        <Label className="text-sm text-muted-foreground">Ocasião</Label>
        <div className="flex flex-wrap gap-2">
          {occasions.map((occasion) => (
            <button
              key={occasion.id}
              onClick={() => updateData({ occasion: occasion.id })}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all",
                data.occasion === occasion.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              <occasion.icon className="h-4 w-4" />
              {occasion.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message - the main focus */}
      <div className="space-y-3">
        <Label htmlFor="message" className="text-sm text-muted-foreground">
          Sua mensagem principal
        </Label>
        <Textarea
          id="message"
          placeholder="Escreva aqui sua declaração, pedido ou mensagem especial..."
          value={data.message}
          onChange={(e) => updateData({ message: e.target.value })}
          className="min-h-[160px] text-base leading-relaxed resize-none"
        />
        <p className="text-xs text-muted-foreground text-right">
          {data.message.length}/1000
        </p>
      </div>

      {/* Story - optional, collapsed by default */}
      <div className="space-y-3">
        <Label htmlFor="story" className="text-sm text-muted-foreground">
          Nossa história <span className="opacity-60">(opcional)</span>
        </Label>
        <Textarea
          id="story"
          placeholder="Conte como vocês se conheceram, o primeiro encontro, momentos especiais..."
          value={data.story}
          onChange={(e) => updateData({ story: e.target.value })}
          className="min-h-[100px] text-base leading-relaxed resize-none"
        />
      </div>

      {/* Continue button */}
      <div className="pt-4">
        <Button 
          onClick={onNext} 
          disabled={!isValid}
          size="lg"
          className="w-full h-14 text-base"
        >
          Adicionar Fotos
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        {!isValid && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            Preencha os nomes e a mensagem para continuar
          </p>
        )}
      </div>
    </div>
  )
}
