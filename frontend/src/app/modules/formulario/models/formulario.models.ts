import { CatalogoItem } from '@common/catalog/catalogo-item.model';
import { Auditable } from '@common/models/auditable.ts';

export interface Formulario extends Auditable {
  id: string;
  nombreTecnico: string;
  movilidadAsociada: string;
  versionFormulario: string;
  estado: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface FormularioData extends Auditable {
  id?: string;
  nombreTecnico: string;
  descripcion: string;
  versionFormulario: string;

  movilidadAsociadaItem?: CatalogoItem;
  movilidadAsociada: string;
  movilidadAsociadaNombre?: string;

  estadoItem?: CatalogoItem;
  estado: string;
  estadoNombre?: string;
  esEditable?: boolean;
}
export interface VersionarFormularioData {
  id: string;
}