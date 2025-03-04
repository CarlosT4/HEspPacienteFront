"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, FileText, Loader2, PrinterIcon, SearchIcon, User } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { Paciente } from "@/types/pacienteCarnet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ImpresionCarnet from "@/components/ui/ImpresionCarnet"

const obtenerDatosPaciente = async (dni: string): Promise<Paciente> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/patients/${dni}`,
    )
    if (!response.ok) {
        throw new Error("No se encontró el paciente")
    }

    const data = await response.json()

    return {
        nroHistoriaClinica: data.NroHistoriaClinica,
        apellidoPaterno: data.ApellidoPaterno,
        apellidoMaterno: data.ApellidoMaterno,
        primerNombre: data.PrimerNombre,
        segundoNombre: data.SegundoNombre,
        edad: data.Edad,
    }
}

export function CarnetForm() {
    const [dni, setDni] = useState("")
    const [paciente, setPaciente] = useState<Paciente | null>(null)
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState("")
    const [cargandoPDF, setCargandoPDF] = useState(false)

    const consultarPaciente = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!dni.trim()) {
            setError("Por favor ingrese un DNI válido")
            return
        }

        setCargando(true)
        setError("")
        try {
            const datos = await obtenerDatosPaciente(dni)
            setPaciente(datos)
        } catch (error) {
            console.log("error encontrado", error)
            setError("No se encontró el paciente con el DNI proporcionado")
            setPaciente(null)
        } finally {
            setCargando(false)
        }
    }

    const imprimirDatos = async () => {
        if (!paciente) return
        setCargandoPDF(true)

        const htmlContent = ImpresionCarnet({ paciente }) // Genera el HTML

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/patients/generate-pdf`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ htmlContent }),
                },
            )

            if (!response.ok) {
                throw new Error("Error al generar el PDF")
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "carnet.pdf"
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Error al descargar el PDF:", error)
            setError("Error al generar el PDF del carnet")
        } finally {
            setCargandoPDF(false)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-4xl mx-auto shadow-lg print:shadow-none">
                <CardHeader className="bg-primary/5 border-b">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                            <CardTitle className="text-2xl text-primary">Consulta de Paciente para Carnet</CardTitle>
                            <CardDescription className="mt-1">
                                Ingrese el DNI del paciente para consultar sus datos y generar el carnet
                            </CardDescription>
                        </div>
                        <form onSubmit={consultarPaciente} className="flex flex-col sm:flex-row gap-2">
                            <div className="relative">
                                <Input
                                    id="dni-paciente"
                                    type="number"
                                    placeholder="Ingrese DNI"
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                    className="w-full sm:w-[200px] pr-10"
                                    required
                                />
                                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            </div>
                            <Button type="submit" disabled={cargando} className="min-w-[120px]">
                                {cargando ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" /> Buscando...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <SearchIcon className="h-4 w-4" /> Consultar
                                    </span>
                                )}
                            </Button>
                        </form>
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    {error && (
                        <Alert variant="destructive" className="mb-6 animate-in fade-in duration-300">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {paciente && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-center gap-2 border-b pb-2">
                                <FileText className="h-5 w-5 text-primary" />
                                <h2 className="text-xl font-semibold text-primary">Datos del Paciente</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Historia Clínica</p>
                                            <p className="font-medium">{paciente.nroHistoriaClinica}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Edad</p>
                                            <p className="font-medium">{paciente.edad}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Nombres</p>
                                        <p className="font-medium">
                                            {paciente.primerNombre} {paciente.segundoNombre}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Apellido Paterno</p>
                                        <p className="font-medium">{paciente.apellidoPaterno}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Apellido Materno</p>
                                        <p className="font-medium">{paciente.apellidoMaterno}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <Button onClick={imprimirDatos} disabled={cargandoPDF} className="w-full md:w-auto">
                                    {cargandoPDF ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" /> Generando PDF...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <PrinterIcon className="h-4 w-4" /> Imprimir Carnet
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>

                {paciente && (
                    <CardFooter className="bg-muted/20 border-t flex justify-between print:hidden">
                        <p className="text-sm text-muted-foreground">
                            Consulta realizada el {format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: es })}
                        </p>
                    </CardFooter>
                )}
            </Card>

            {/* Estilos para impresión */}
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .container, .container * {
                        visibility: visible;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                    .container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    )
}

