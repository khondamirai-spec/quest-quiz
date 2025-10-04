import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quiz Quest - O\'rganish. Jang qilish. G\'alaba qilish.',
  description: 'Epik janglar bilan o\'rganing! Matematika, Biologiya va Dasturlash kurslarida bosslarni mag\'lub eting.',
  keywords: ['quiz', 'game', 'education', 'math', 'biology', 'coding', 'uzbek'],
  authors: [{ name: 'Quiz Quest Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
