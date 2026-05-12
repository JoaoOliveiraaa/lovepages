"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, ArrowRight, ImagePlus, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { CreateLovePageData, LovePageTheme } from "@/lib/types"
import { themeConfig } from "@/lib/types"

type StepPhotosProps = {
  data: CreateLovePageData
  updateData: (updates: Partial<CreateLovePageData>) => void
  onNext: () => void
  onPrev: () => void
}

export function StepPhotos({ data, updateData, onNext, onPrev }: StepPhotosProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'))
    const availableSlots = 10 - data.photos.length
    const filesToProcess = imageFiles.slice(0, availableSlots)
    
    filesToProcess.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          updateData({ photos: [...data.photos, e.target.result as string] })
        }
      }
      reader.readAsDataURL(file)
    })
  }, [data.photos, updateData])

  const removePhoto = (index: number) => {
    updateData({ photos: data.photos.filter((_, i) => i !== index) })
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const themes = Object.entries(themeConfig) as [LovePageTheme, typeof themeConfig[LovePageTheme]][]

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground text-balance">
          Adicione fotos especiais
        </h1>
        <p className="text-muted-foreground mt-2">
          Momentos que marcaram a história de vocês
        </p>
      </div>

      {/* Photo upload area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-muted-foreground">Suas fotos</Label>
          <span className="text-xs text-muted-foreground">{data.photos.length}/10</span>
        </div>

        {/* Photos grid + upload */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {/* Existing photos */}
          {data.photos.map((photo, index) => (
            <div key={index} className="relative aspect-square group">
              <img
                src={photo}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {/* Upload area */}
          {data.photos.length < 10 && (
            <label
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={cn(
                "aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors",
                isDragging 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              <ImagePlus className="h-6 w-6 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Adicionar</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
            </label>
          )}
        </div>

        {data.photos.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Adicione pelo menos 1 foto para continuar
          </p>
        )}
      </div>

      {/* Theme selection - more compact */}
      <div className="space-y-4">
        <Label className="text-sm text-muted-foreground">Escolha o visual</Label>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(([id, theme]) => (
            <button
              key={id}
              onClick={() => updateData({ theme: id })}
              className={cn(
                "relative p-3 rounded-xl border-2 transition-all text-left",
                data.theme === id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              )}
            >
              {data.theme === id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
              <div className="flex gap-1 mb-2">
                {theme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={onPrev}
          size="lg"
          className="h-14"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar
        </Button>
        <Button 
          onClick={onNext}
          disabled={data.photos.length === 0}
          size="lg"
          className="flex-1 h-14 text-base"
        >
          Ver Preview
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
