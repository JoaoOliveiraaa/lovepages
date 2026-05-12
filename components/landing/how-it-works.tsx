"use client"

import { motion } from "framer-motion"
import { PenLine, CreditCard, Send } from "lucide-react"

const steps = [
  {
    icon: PenLine,
    title: "Crie",
    description: "Escreva sua mensagem, adicione fotos e escolha um tema",
  },
  {
    icon: CreditCard,
    title: "Pague",
    description: "Pagamento rápido via PIX por apenas R$ 8,90",
  },
  {
    icon: Send,
    title: "Envie",
    description: "Compartilhe o link e surpreenda quem você ama",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-3">
            Como funciona
          </h2>
          <p className="text-muted-foreground">
            Em 3 passos simples você cria uma página inesquecível
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Step number + icon */}
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              
              <h3 className="font-semibold text-foreground text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
