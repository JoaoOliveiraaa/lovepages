"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StepContent } from "@/components/create/step-content"
import { StepPhotos } from "@/components/create/step-photos"
import { StepFinish } from "@/components/create/step-finish"
import type { CreateLovePageData, LovePageOccasion, LovePageTheme } from "@/lib/types"

const initialData: CreateLovePageData = {
  senderName: "",
  receiverName: "",
  occasion: "namoro",
  message: "",
  story: "",
  photos: [],
  theme: "romantic",
  musicUrl: "",
}

const steps = [
  { id: 1, label: "Conteúdo" },
  { id: 2, label: "Fotos" },
  { id: 3, label: "Finalizar" },
]

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<CreateLovePageData>(initialData)

  const updateData = (updates: Partial<CreateLovePageData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Voltar</span>
            </Link>
            
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span className="font-serif text-sm font-medium text-foreground">LovePage</span>
            </div>

            <div className="w-16" /> {/* Spacer */}
          </div>
        </div>
      </header>

      {/* Progress indicator - minimal */}
      <div className="border-b border-border/30">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    currentStep >= step.id 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id}
                </div>
                <span className={`text-sm hidden sm:inline ${
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-12 h-px ml-2 ${
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {currentStep === 1 && (
          <StepContent 
            data={data} 
            updateData={updateData} 
            onNext={nextStep} 
          />
        )}
        {currentStep === 2 && (
          <StepPhotos 
            data={data} 
            updateData={updateData} 
            onNext={nextStep} 
            onPrev={prevStep} 
          />
        )}
        {currentStep === 3 && (
          <StepFinish 
            data={data} 
            onPrev={prevStep} 
          />
        )}
      </main>
    </div>
  )
}
