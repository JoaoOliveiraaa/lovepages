"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ana Carolina",
    text: "Meu namorado chorou quando viu a página. Foi o presente mais especial que já dei!",
  },
  {
    name: "Pedro Henrique",
    text: "Usei para pedir minha namorada em namoro. Ela disse sim antes de terminar de ler!",
  },
  {
    name: "Mariana Silva",
    text: "Super fácil de criar e o resultado ficou lindo. Vale muito mais do que os R$8,90!",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-3">
            Milhares de histórias de amor
          </h2>
          <p className="text-muted-foreground">
            Veja o que nossos usuários estão dizendo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-5 border border-border"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Text */}
              <p className="text-foreground text-sm mb-3 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              
              {/* Author */}
              <p className="text-muted-foreground text-xs font-medium">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
