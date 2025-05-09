import { FormularioInterface } from './formulario';

export interface FormularioFormProps {
  valorInicial?: FormularioInterface;
  loading?: boolean;
  onSubmit: (form: FormularioInterface) => any;
  nameForm: string;
  viewMode?: boolean;
  catalogs?: any;
}

export interface EstadoFormularios {
  id: string;
  nombre: string;
}
