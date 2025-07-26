import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Quick Bites - Authentic Nigerian Cuisine Delivered in Jos",
  description:
    "Savor the authentic taste of Nigeria! Order delicious Nigerian foods, fast food, and snacks delivered fresh to your doorstep across Jos, Plateau State.",
  keywords:
    "Nigerian food delivery Jos, jollof rice Jos, suya Jos, amala Jos, Jos food delivery, African cuisine Jos, fast food Jos",
  openGraph: {
    title: "Quick Bites - Authentic Nigerian Cuisine Delivered in Jos",
    description:
      "Savor the authentic taste of Nigeria! Order delicious Nigerian foods, fast food, and snacks delivered fresh to your doorstep in Jos.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${inter.variable}`}>
      <body className="font-poppins antialiased">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
