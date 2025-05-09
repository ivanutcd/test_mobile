import { EstadoFormularios } from './formulario-form-props';

export interface FormularioInterface {
  id: string;
  nombreTecnico: string;
  descripcion: string;
  movilidadAsociada: string;
  estado: EstadoFormularios;
  versionFormulario: string;
}
