import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ParkWise - Find Your Perfect Static Caravan",
  description: "Compare holiday parks across the UK and find your dream static caravan. Independent advice, best deals, and expert guidance.",
  keywords: ["static caravan", "holiday park", "caravan sales", "UK holiday homes", "caravan finance"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-gray-50")}>
        {children}
      </body>
    </html>
  )
}
