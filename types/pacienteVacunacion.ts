export type Vacuna = {
  nombre: string
  descripcion: string
}

export type Paciente = {
  nroHistoriaClinica: number
  apellidoPaterno: string
  apellidoMaterno: string
  primerNombre: string
  segundoNombre: string
  edad: string
  vacunasRecomendadas: Vacuna[]
  fechaInicio: string
  fechaFin: string
}
