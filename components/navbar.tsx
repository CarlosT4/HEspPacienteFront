"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const routes = [
        { href: "/", label: "Carnet" },
        { href: "/vacunacion", label: "Vacunación" },
        { href: "/creditos", label: "Créditos" },
    ]

    const isActive = (path: string) => {
        return pathname === path
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold">Sistema de Salud</span>
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" aria-label="Menu" className="text-primary-foreground">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Abrir menú</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[250px]">
                        <nav className="flex flex-col gap-4 pt-10">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={`text-lg font-medium transition-colors hover:text-primary ${isActive(route.href) ? "text-primary font-bold" : ""
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:gap-6">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={`text-sm font-medium transition-colors hover:text-primary-foreground/80 ${isActive(route.href) ? "underline underline-offset-4" : ""
                                }`}
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}

