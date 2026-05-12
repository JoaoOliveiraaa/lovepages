// LovePage Status - estados do backend
export type LovePageStatus = "draft" | "pending_payment" | "active" | "expired"

// LovePage - entidade principal
export type LovePage = {
  id: string
  slug: string
  userId: string
  senderName: string
  receiverName: string
  occasion: LovePageOccasion
  message: string
  story?: string
  photos: string[]
  theme: LovePageTheme
  musicUrl?: string
  status: LovePageStatus
  views: number
  createdAt: string
  paidAt?: string
  expiresAt?: string
}

// Ocasiões disponíveis
export type LovePageOccasion = 
  | "namoro" 
  | "aniversario-namoro" 
  | "carta-amor" 
  | "aniversario" 
  | "presente" 
  | "outro"

// Temas visuais disponíveis
export type LovePageTheme = 
  | "romantic" 
  | "elegant" 
  | "nature" 
  | "sunset" 
  | "ocean" 
  | "vintage"

// Dados do formulário de criação
export type CreateLovePageData = {
  senderName: string
  receiverName: string
  occasion: LovePageOccasion
  message: string
  story: string
  photos: string[]
  theme: LovePageTheme
  musicUrl: string
}

// User
export type User = {
  id: string
  email: string
  name: string
  createdAt: string
}

// Payment
export type Payment = {
  id: string
  lovePageId: string
  userId: string
  amount: number
  status: "pending" | "paid" | "failed" | "refunded"
  pixCode?: string
  paidAt?: string
  createdAt: string
}

// Status configs para UI
export const statusConfig: Record<LovePageStatus, {
  label: string
  color: string
  bgColor: string
}> = {
  draft: {
    label: "Rascunho",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
  pending_payment: {
    label: "Aguardando pagamento",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
  },
  active: {
    label: "Ativa",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
  },
  expired: {
    label: "Expirada",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
}

// Occasion configs
export const occasionConfig: Record<LovePageOccasion, { label: string }> = {
  "namoro": { label: "Pedido de Namoro" },
  "aniversario-namoro": { label: "Aniversário de Namoro" },
  "carta-amor": { label: "Carta de Amor" },
  "aniversario": { label: "Aniversário" },
  "presente": { label: "Presente Surpresa" },
  "outro": { label: "Outra Ocasião" },
}

// Theme configs
export const themeConfig: Record<LovePageTheme, {
  name: string
  colors: string[]
  bg: string
  accent: string
}> = {
  romantic: {
    name: "Romântico",
    colors: ["#fecdd3", "#fb7185", "#e11d48"],
    bg: "bg-gradient-to-br from-rose-50 via-pink-50 to-red-50",
    accent: "text-rose-600",
  },
  elegant: {
    name: "Elegante",
    colors: ["#fafaf9", "#d4af37", "#1c1917"],
    bg: "bg-gradient-to-br from-stone-50 via-neutral-50 to-stone-100",
    accent: "text-amber-600",
  },
  nature: {
    name: "Natureza",
    colors: ["#d9f99d", "#65a30d", "#3f6212"],
    bg: "bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50",
    accent: "text-green-600",
  },
  sunset: {
    name: "Pôr do Sol",
    colors: ["#fed7aa", "#f97316", "#c2410c"],
    bg: "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50",
    accent: "text-orange-600",
  },
  ocean: {
    name: "Oceano",
    colors: ["#bae6fd", "#0ea5e9", "#0369a1"],
    bg: "bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50",
    accent: "text-blue-600",
  },
  vintage: {
    name: "Vintage",
    colors: ["#fef3c7", "#d97706", "#78716c"],
    bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
    accent: "text-amber-700",
  },
}

// Preço
export const LOVEPAGE_PRICE = 8.90
