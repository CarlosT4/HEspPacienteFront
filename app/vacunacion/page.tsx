import { VacunacionForm } from "@/components/vacunacion-form"

export default function VacunacionPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Registro de Vacunación</h1>
                <p className="mt-2 text-muted-foreground">Complete el formulario para registrar una nueva vacunación</p>
            </div>
            <VacunacionForm />
        </div>
    )
}

