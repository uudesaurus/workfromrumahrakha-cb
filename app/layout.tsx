import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif } from "next/font/google"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Work From Rumah Rakha",
  description: "A collective of builders creating impactful solutions for the world. Rakha, Umar, Uud, and Narin share their projects, thoughts, and innovations.",
  generator: "v0.app",
  openGraph: {
    title: "Work From Rumah Rakha",
    description: "Home for builders, next Silicon Valley. A collective of builders creating impactful solutions for the world.",
    type: "website",
    locale: "en_US",
    siteName: "Work From Rumah Rakha",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 1200,
        height: 630,
        alt: "Work From Rumah Rakha - Home for Builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work From Rumah Rakha",
    description: "Home for builders, next Silicon Valley. A collective of builders creating impactful solutions for the world.",
    images: ["/placeholder-logo.png"],
  },
  keywords: ["builders", "innovation", "technology", "startup", "Silicon Valley", "impact", "solutions"],
  authors: [{ name: "Work From Rumah Rakha" }],
  creator: "Work From Rumah Rakha",
  publisher: "Work From Rumah Rakha",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.variable};
  --font-mono: ${GeistMono.variable};
  --font-instrument-serif: ${instrumentSerif.variable};
}
        `}</style>
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable}`}>{children}</body>
    </html>
  )
}
