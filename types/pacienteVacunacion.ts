export interface Paciente {
  nroHistoriaClinica: string
  apellidoPaterno: string
  apellidoMaterno: string
  primerNombre: string
  segundoNombre?: string
  fechaNacimiento: string
  edad: string
  vacunasRecomendadas: string[]
  fechaInicio: string
  fechaFin: string
}