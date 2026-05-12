"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ChevronLeft, ChevronRight, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PublicLovePageProps = {
  senderName: string
  receiverName: string
  message: string
  story?: string
  photos: string[]
  theme: string
  createdAt: string
}

const themeStyles: Record<string, { bg: string; accent: string; text: string }> = {
  romantic: {
    bg: "bg-gradient-to-br from-rose-50 via-pink-50 to-red-50",
    accent: "text-rose-600",
    text: "text-rose-900",
  },
  elegant: {
    bg: "bg-gradient-to-br from-stone-50 via-neutral-50 to-stone-100",
    accent: "text-amber-600",
    text: "text-stone-900",
  },
  nature: {
    bg: "bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50",
    accent: "text-green-600",
    text: "text-green-900",
  },
  sunset: {
    bg: "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50",
    accent: "text-orange-600",
    text: "text-orange-900",
  },
  ocean: {
    bg: "bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50",
    accent: "text-blue-600",
    text: "text-blue-900",
  },
  vintage: {
    bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
    accent: "text-amber-700",
    text: "text-amber-900",
  },
}

export function PublicLovePage({ 
  senderName, 
  receiverName, 
  message, 
  story, 
  photos,
  theme,
}: PublicLovePageProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [showShareToast, setShowShareToast] = useState(false)
  
  const styles = themeStyles[theme] || themeStyles.romantic

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Para ${receiverName}`,
          text: `Uma mensagem especial de ${senderName}`,
          url: window.location.href,
        })
      } catch {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      setShowShareToast(true)
      setTimeout(() => setShowShareToast(false), 2000)
    }
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div className={cn("min-h-screen", styles.bg)}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className={cn("h-5 w-5 fill-current", styles.accent)} />
            <span className={cn("font-serif text-lg font-semibold", styles.text)}>LovePage</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className={cn("text-sm uppercase tracking-wider mb-2", styles.accent)}>
              Uma mensagem especial
            </p>
            <h1 className={cn("font-serif text-4xl sm:text-5xl font-semibold mb-2", styles.text)}>
              Para {receiverName}
            </h1>
            <p className={cn("text-sm", styles.accent)}>
              De {senderName}, com amor
            </p>
          </motion.div>

          {/* Decorative heart */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mb-12"
          >
            <div className={cn("w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center")}>
              <Heart className={cn("h-8 w-8 fill-current", styles.accent)} />
            </div>
          </motion.div>

          {/* Main message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 mb-8"
          >
            <p className={cn("font-serif text-xl sm:text-2xl leading-relaxed", styles.text)}>
              {message}
            </p>
          </motion.div>

          {/* Story (if exists) */}
          {story && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/50 rounded-2xl p-8 sm:p-10 mb-8"
            >
              <h2 className={cn("font-serif text-xl font-semibold mb-4", styles.text)}>
                Nossa História
              </h2>
              <p className={cn("leading-relaxed", styles.text, "opacity-80")}>
                {story}
              </p>
            </motion.div>
          )}

          {/* Photos grid */}
          {photos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className={cn("font-serif text-xl font-semibold mb-4 text-center", styles.text)}>
                Nossos Momentos
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPhotoIndex(index)
                      setShowGallery(true)
                    }}
                    className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={photo}
                      alt={`Momento ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center"
          >
            <p className={cn("font-serif text-2xl italic", styles.accent)}>
              Com todo meu amor,
            </p>
            <p className={cn("font-serif text-3xl font-semibold mt-2", styles.text)}>
              {senderName}
            </p>
            <Heart className={cn("h-6 w-6 mx-auto mt-4 fill-current", styles.accent)} />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className={cn("text-sm", styles.accent, "opacity-60")}>
          Feito com amor no LovePage
        </p>
      </footer>

      {/* Photo gallery modal */}
      <AnimatePresence>
        {showGallery && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={prevPhoto}
              className="absolute left-4 text-white/80 hover:text-white"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <img
              src={photos[currentPhotoIndex]}
              alt={`Foto ${currentPhotoIndex + 1}`}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
            />

            <button
              onClick={nextPhoto}
              className="absolute right-4 text-white/80 hover:text-white"
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-lg shadow-lg text-sm"
          >
            Link copiado!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
