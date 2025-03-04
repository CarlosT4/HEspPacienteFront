"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CalendarIcon, FileText, Loader2, PrinterIcon, SearchIcon, Syringe, User } from "lucide-react"
import { format, parse } from "date-fns"
import { es } from "date-fns/locale"
import type { Paciente } from "@/types/pacienteVacunacion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const obtenerEsquemaVacunacionPaciente = async (dni: string): Promise<Paciente> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/vaccination/${dni}`,
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
        fechaNacimiento: data.FechaNacimiento,
        edad: data.Edad,
        vacunasRecomendadas: data.VacunasRecomendadas || [],
        fechaInicio: data.FechaInicio,
        fechaFin: data.FechaFin,
    }
}

// Función para formatear fechas
const formatearFecha = (fechaStr: string) => {
    try {
        // Intentar diferentes formatos de fecha
        const formatos = ["d/M/yyyy", "M/d/yyyy", "yyyy-MM-dd"]

        for (const formato of formatos) {
            try {
                const fecha = parse(fechaStr, formato, new Date())
                if (!isNaN(fecha.getTime())) {
                    return format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es })
                }
            } catch (e) {
                // Intentar con el siguiente formato
            }
        }

        // Si no se pudo parsear, devolver la fecha original
        return fechaStr
    } catch (e) {
        return fechaStr
    }
}

export function VacunacionForm() {
    const [dni, setDni] = useState("")
    const [paciente, setPaciente] = useState<Paciente | null>(null)
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState("")

    const consultarPaciente = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!dni.trim()) {
            setError("Por favor ingrese un DNI válido")
            return
        }

        setCargando(true)
        setError("")
        try {
            const datos = await obtenerEsquemaVacunacionPaciente(dni)
            setPaciente(datos)
        } catch (error) {
            console.log("error encontrado", error)
            setError("No se encontró el paciente con el DNI proporcionado")
            setPaciente(null)
        } finally {
            setCargando(false)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-4xl mx-auto shadow-lg print:shadow-none">
                <CardHeader className="bg-primary/5 border-b">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                            <CardTitle className="text-2xl text-primary">Consulta de Esquema de Vacunación</CardTitle>
                            <CardDescription className="mt-1">
                                Ingrese el DNI del paciente para consultar su esquema de vacunación
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
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Columna de información personal */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 border-b pb-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        <h2 className="text-xl font-semibold text-primary">Información del Paciente</h2>
                                    </div>

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
                                        <p className="text-sm text-muted-foreground">Nombre Completo</p>
                                        <p className="font-medium">
                                            {paciente.primerNombre} {paciente.segundoNombre} {paciente.apellidoPaterno}{" "}
                                            {paciente.apellidoMaterno}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                                        <p className="font-medium flex items-center gap-2">
                                            <CalendarIcon size={16} className="text-muted-foreground" />
                                            {formatearFecha(paciente.fechaNacimiento)}
                                        </p>
                                    </div>
                                </div>

                                {/* Columna de esquema de vacunación */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 border-b pb-2">
                                        <Syringe className="h-5 w-5 text-primary" />
                                        <h2 className="text-xl font-semibold text-primary">Esquema de Vacunación</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-2">Vacunas Recomendadas</p>
                                            {paciente.vacunasRecomendadas.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {paciente.vacunasRecomendadas.map((vacuna, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 px-3 py-1"
                                                        >
                                                            <Syringe size={14} />
                                                            {vacuna}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted-foreground italic">No hay vacunas recomendadas</p>
                                            )}
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <p className="text-sm text-muted-foreground">Periodo de Vacunación</p>
                                            <div className="grid grid-cols-2 gap-4 mt-1">
                                                <div className="space-y-1">
                                                    <p className="text-xs text-muted-foreground">Desde</p>
                                                    <p className="font-medium">{formatearFecha(paciente.fechaInicio)}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs text-muted-foreground">Hasta</p>
                                                    <p className="font-medium">{formatearFecha(paciente.fechaFin)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}