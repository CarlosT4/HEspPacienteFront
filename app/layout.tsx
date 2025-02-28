import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
