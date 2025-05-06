import { Auditable } from '@common/models/auditable.ts';

export interface Formulario extends Auditable {
  id: string;
  nombreTecnico: string;
  descripcion: string;
  movilidadAsociada: string;
  versionFormulario: string;
  estado: string;
}