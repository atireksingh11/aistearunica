import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat, Lexend } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import Script from "next/script"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
})

export const metadata: Metadata = {
  title: "Aistear Unica - Premium Beauty Services in India",
  description:
    "Professional makeup artistry at your doorstep. Experience algorithmic artist-client pairing with real-time booking and personalized beauty solutions by Sarika Dahiya.",
  keywords:
    "makeup artist, beauty services, bridal makeup, party makeup, skincare, India, professional makeup, Aistear Unica, Sarika Dahiya",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${montserrat.variable} ${lexend.variable} antialiased`}>
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.clouds.min.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
