import type { Metadata } from 'next'
import { Space_Grotesk, DM_Mono, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Muhammad Umar — Full-Stack Software Engineer',
  description:
    'Full-stack Software Engineer with 2+ years of experience building enterprise-grade React and .NET applications. Based in Karachi, Pakistan.',
  keywords: [
    'Muhammad Umar',
    'Full-Stack Developer',
    'React Developer',
    '.NET Developer',
    'Next.js',
    'Karachi Pakistan',
    'Software Engineer',
  ],
  authors: [{ name: 'Muhammad Umar' }],
  openGraph: {
    title: 'Muhammad Umar — Full-Stack Software Engineer',
    description: 'Building enterprise-grade React and .NET applications.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-space text-white antialiased selection:bg-cyan/20 selection:text-cyan">
        {children}
      </body>
    </html>
  )
}
