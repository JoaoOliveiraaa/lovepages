"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LOVEPAGE_PRICE } from "@/lib/types"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-secondary/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center">
          {/* Main headline - emotional focus */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight text-balance"
          >
            Surpreenda quem você ama com uma página{" "}
            <span className="text-primary">única</span>
          </motion.h1>

          {/* Subtitle - simple and clear */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto text-pretty"
          >
            Crie uma página romântica personalizada em minutos. 
            Perfeita para pedidos de namoro, aniversários e declarações.
          </motion.p>

          {/* CTA - dominant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <Button size="lg" className="h-14 px-8 text-base shadow-lg" asChild>
              <Link href="/app/create">
                Criar Minha Página
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Apenas <span className="font-semibold text-foreground">R$ {LOVEPAGE_PRICE.toFixed(2).replace(".", ",")}</span> via PIX
            </p>
          </motion.div>
        </div>

        {/* Preview mockup - cleaner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-20"
        >
          <div className="relative mx-auto max-w-2xl">
            {/* Browser frame */}
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-background/80 rounded px-3 py-0.5 text-xs text-muted-foreground">
                    lovepage.com.br/p/maria
                  </div>
                </div>
              </div>
              
              {/* Preview content */}
              <div className="aspect-[16/9] bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-sm text-rose-500 uppercase tracking-wider mb-2">Para Maria</p>
                  <h2 className="font-serif text-2xl sm:text-3xl text-rose-900 mb-4">
                    Você aceita namorar comigo?
                  </h2>
                  <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-14 h-14 rounded-lg bg-white/60 shadow-sm" />
                    ))}
                  </div>
                  <p className="text-sm text-rose-600">Com amor, João</p>
                </div>
              </div>
            </div>

            {/* Decorative shadow */}
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
