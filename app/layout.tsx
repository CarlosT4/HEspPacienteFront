import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Consulta Paciente App',
  description: 'Carnet de identificacion para pacientes del hospital Espinar',
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
