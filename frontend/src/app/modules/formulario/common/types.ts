import { FormularioData } from '../models/formulario.models';
import traducciones from './translations';

export interface FormularioProps {
  id?: string;
  onSubmit: () => void;
  onSuccess: () => void;
  onCancel: () => void;
  isLoading: boolean;
  initialValues?: FormularioData;
}

export type ModeFormulario = 'create' | 'edit' | 'view' | null;

export const TitleFormulario = (mode: ModeFormulario) => {
  return mode === 'create'
    ? traducciones.CREACION
    : mode === 'edit'
      ? traducciones.EDICION
      : mode === 'view'
        ? traducciones.DETALLE
        : traducciones.GESTIONAR;
};

export const FormularioDataEmpty: FormularioData = {
  id: '',
  nombreTecnico: '',
  descripcion: '',
  movilidadAsociada: '',
  estado: '',
  createdBy: '',
  createdDate: new Date(),
  versionFormulario: '',
};
