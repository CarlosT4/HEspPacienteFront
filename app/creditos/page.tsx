import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Globe } from "lucide-react"
import Link from "next/link"

export default function CreditosPage() {
    return (
        <div className="container mx-auto max-w-md py-6">
            <Card className="border-2">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Créditos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-center">
                        <div className="h-32 w-32 overflow-hidden rounded-full bg-primary/10">
                            <img
                                src="/placeholder.svg?height=128&width=128"
                                alt="Foto del desarrollador"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-center">
                        <h2 className="text-xl font-bold">CarlosT4</h2>
                        <p className="text-muted-foreground">Desarrollador Full Stack</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium">Sobre mí</h3>
                        <p className="text-sm text-muted-foreground">
                            Desarrollador con experiencia en aplicaciones web y móviles. Especializado en React y Next.js.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium">Tecnologías utilizadas</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs">Next.js</span>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs">React</span>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs">TypeScript</span>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs">Tailwind CSS</span>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <Link href="https://github.com/CarlosT4" className="text-muted-foreground hover:text-primary">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="https://linkedin.com/" className="text-muted-foreground hover:text-primary">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="mailto:ctc3486@gmail.com" className="text-muted-foreground hover:text-primary">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

