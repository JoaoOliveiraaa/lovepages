import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Criar LovePage | LovePage",
  description: "Crie uma página romântica personalizada em poucos minutos",
}

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
