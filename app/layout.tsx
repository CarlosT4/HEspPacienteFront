import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Sistema de Carnet y Vacunación",
  description: "Aplicación para gestionar carnets y registros de vacunación, del hospital Espinar",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
