import { FormField } from "./formField";


export interface FormType {
  id: string;
  nombreTecnico: string;
  descripcion: string;
  movilidadAsociada: string;
  estado: string;
  versionFormulario: string;
  createdBy: string | null;
  createdDate: string | null;
  updatedBy: string | null;
  updatedDate: string | null;
  deletedBy: string | null;
  deletedDate: string | null;
  formFields: FormField[];
}
