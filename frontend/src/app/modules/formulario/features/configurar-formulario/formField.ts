export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'image'
  | 'range'
  | 'rangeDate'
  | 'file';

export interface FormField {
  position: number;
  id: string; // identificador único del campo
  nombreTecnico: string; // etiqueta que se registrara en la bd
  inputLabel: string; // etiqueta que se muestra en el formulario
  type: FormFieldType; // tipo de campo
  required?: boolean; // si es obligatorio o no
  options?: string[]; // opciones para select, radio, checkbox
  placeholder?: string; // texto de ayuda
  description?: string; // texto explicativo
  defaultValue?: any; // valor por defecto
  min?: number; // valor mínimo para number, range
  max?: number; // valor máximo para number, range
  step?: number; // paso para range
  minDate?: string; // fecha mínima para date
  maxDate?: string; // fecha máxima para date
  minTime?: string; // hora mínima para date
  maxTime?: string; // hora máxima para date
  catalogoKey?: string; // clave del catálogo para select
}
