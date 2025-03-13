import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function CreditosPage() {
    return (
        <div className="container mx-auto max-w-md py-6">
            <Card className="border-2">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Créditos</CardTitle>
                    <CardDescription>Información del desarrollador</CardDescription>
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

                    <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-2">
                            <Github className="h-5 w-5 text-muted-foreground" />
                            <Link href="https://github.com/CarlosT4" className="text-sm hover:underline">
                                github.com/CarlosT4
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <Linkedin className="h-5 w-5 text-muted-foreground" />
                            <Link href="https://linkedin.com/" className="text-sm hover:underline">
                                linkedin.com/
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <Link href="mailto:ctc3486@gmail.com" className="text-sm hover:underline">
                                ctc3486@gmail.com
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

