import { Paciente } from "@/types/pacienteCarnet"

interface ImpresionCarnetProps {
  paciente: Paciente
}

const ImpresionCarnet = ({ paciente }: ImpresionCarnetProps) => {
  return `
    <html>
      <head>
        <title>Carnet de Identificación ${paciente.nroHistoriaClinica}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: Arial, sans-serif; 
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
          }
          .card {
            background: #cceeff; /* Celeste */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            text-align: center;
          }
          .header img { width: 50px; height: auto; }
          .header h1 { font-size: 18px; margin: 5px 0; }
          .hospital-name { 
            font-size: 25px; 
            font-weight: bold; 
            margin: 15px 0; 
            border-top: 1px solid #000; 
            border-bottom: 1px solid #000; 
            padding: 5px 0; 
          }
          .form-field { 
            margin: 15px 0; 
            border-bottom: 1px solid #999; 
            padding-bottom: 5px;
            text-align: left;
          }
          .form-field label { display: block; font-size: 14px; color: #666; }
          .form-field span { display: block; font-size: 16px; padding: 3px 0; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <img src="https://i.imgur.com/zoSCXKZ.png" alt="Logo Ministerio de Salud" />
            <h1>MINISTERIO DE SALUD</h1>
            <h2 class="hospital-name">U.E. 408 HOSPITAL DE ESPINAR</h2>
          </div>

          <div class="form-field">
            <label>H.C.Nº:</label>
            <span>${paciente.nroHistoriaClinica}</span>
          </div>

          <h3 style="text-decoration: underline; margin: 15px 0;">CARNET DE IDENTIFICACIÓN</h3>

          <div class="form-field">
            <label>A. Paterno:</label>
            <span>${paciente.apellidoPaterno}</span>
          </div>

          <div class="form-field">
            <label>A. Materno:</label>
            <span>${paciente.apellidoMaterno}</span>
          </div>

          <div class="form-field">
            <label>Nombre:</label>
            <span>${paciente.primerNombre} ${paciente.segundoNombre || ""}</span>
          </div>
        </div>
      </body>
    </html>
  `
}

export default ImpresionCarnet
