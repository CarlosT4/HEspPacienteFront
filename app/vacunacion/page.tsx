import { VacunacionForm } from "@/components/vacunation-form"

export default function VacunacionPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Registro de Vacunación</h1>
                <p className="mt-2 text-muted-foreground">Complete el formulario para consulta su esquema de vacunación</p>
            </div>
            <VacunacionForm />
        </div>
    )
}

