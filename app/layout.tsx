import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: 'LovePage | Crie Páginas Românticas Personalizadas',
  description: 'Surpreenda quem você ama com uma página única e emocionante. Pedidos de namoro, aniversários, cartas de amor e muito mais. Crie em minutos, emocione para sempre.',
  keywords: ['página romântica', 'pedido de namoro', 'presente digital', 'carta de amor', 'aniversário de namoro', 'surpresa romântica'],
  authors: [{ name: 'LovePage' }],
  creator: 'LovePage',
  openGraph: {
    title: 'LovePage | Crie Páginas Românticas Personalizadas',
    description: 'Surpreenda quem você ama com uma página única e emocionante.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LovePage | Crie Páginas Românticas Personalizadas',
    description: 'Surpreenda quem você ama com uma página única e emocionante.',
  },
}

export const viewport: Viewport = {
  themeColor: '#c45d5d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
