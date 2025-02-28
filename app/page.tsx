import { CarnetForm } from "@/components/carnet-form"

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Consulta de Paciente para Carnet</h1>
        <p className="mt-2 text-muted-foreground">
          Ingrese el DNI del paciente para consultar sus datos y generar el carnet
        </p>
      </div>
      <CarnetForm />
    </div>
  )
}

