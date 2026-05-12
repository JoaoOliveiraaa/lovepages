import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PublicLovePage } from "@/components/public/public-love-page"

// Mock data - in production this would come from database
const mockLovePages: Record<string, {
  senderName: string
  receiverName: string
  message: string
  story?: string
  photos: string[]
  theme: string
  createdAt: string
}> = {
  "maria-joao": {
    senderName: "João",
    receiverName: "Maria",
    message: "Maria, desde o primeiro momento que te vi, soube que você era especial. Cada dia ao seu lado é uma aventura maravilhosa, e não consigo mais imaginar minha vida sem você. Seu sorriso ilumina meus dias e seu abraço é meu lugar favorito no mundo. Você é a pessoa mais incrível que já conheci, e tenho muita sorte de ter você na minha vida.",
    story: "Nos conhecemos em uma festa de aniversário de um amigo em comum. Eu estava no canto da sala, meio tímido, quando você chegou com aquele sorriso contagiante. Conversamos a noite toda e, desde então, não nos separamos mais. Já se passaram 2 anos desde aquele dia, e cada momento tem sido especial.",
    photos: [],
    theme: "romantic",
    createdAt: "2024-02-14",
  },
  "ana-pedro": {
    senderName: "Pedro",
    receiverName: "Ana",
    message: "Ana, você é o amor da minha vida. Cada momento com você é precioso, e eu agradeço todos os dias por ter você ao meu lado. Você me faz querer ser uma pessoa melhor.",
    story: "",
    photos: [],
    theme: "elegant",
    createdAt: "2024-03-10",
  },
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = mockLovePages[slug]
  
  if (!page) {
    return {
      title: "Página não encontrada | LovePage",
    }
  }

  return {
    title: `Para ${page.receiverName} | LovePage`,
    description: `Uma mensagem especial de ${page.senderName} para ${page.receiverName}`,
    openGraph: {
      title: `Para ${page.receiverName} | LovePage`,
      description: `Uma mensagem especial de ${page.senderName}`,
      type: "website",
    },
  }
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params
  const page = mockLovePages[slug]

  if (!page) {
    notFound()
  }

  return <PublicLovePage {...page} />
}
