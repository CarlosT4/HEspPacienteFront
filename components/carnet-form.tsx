"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import type { Paciente } from "@/types/paciente"
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
        setCargando(true)
        setError("")
        try {
            const datos = await obtenerDatosPaciente(dni)
            setPaciente(datos)
        } catch (error) {
            console.log("error encontrado", error)
            setError("No se encontró el paciente")
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
        } finally {
            setCargandoPDF(false)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Consulta de Paciente para Carnet</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={consultarPaciente} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="dni-paciente">DNI del Paciente</Label>
                            <Input
                                id="dni-paciente"
                                type="number"
                                placeholder="Ingrese el DNI del paciente"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" disabled={cargando}>
                            {cargando ? "Consultando..." : "Consultar"}
                        </Button>
                    </form>

                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    {paciente && (
                        <div className="mt-6 space-y-4">
                            <h2 className="text-xl font-semibold">Datos del Paciente</h2>
                            <p>
                                <strong>Nro Historia Clínica:</strong> {paciente.nroHistoriaClinica}
                            </p>
                            <p>
                                <strong>Nombre:</strong> {paciente.primerNombre} {paciente.segundoNombre || ""}
                            </p>
                            <p>
                                <strong>Apellido Paterno:</strong> {paciente.apellidoPaterno}
                            </p>
                            <p>
                                <strong>Apellido Materno:</strong> {paciente.apellidoMaterno}
                            </p>
                            <p>
                                <strong>Edad:</strong> {paciente.edad}
                            </p>
                            <Button onClick={imprimirDatos} disabled={cargandoPDF}>
                                {cargandoPDF ? "Generando PDF..." : "Imprimir Carnet"}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

