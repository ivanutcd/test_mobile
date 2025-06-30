import { FormField } from './formField';

export const generateErrorMessages = (
  dataForm: any,
  field: FormField,
  touchedFields: Record<string, Partial<Record<keyof FormField, boolean>>>,
  reservedWords: string[],
) => {
  const errorMessages = [
    {
      condition:
        dataForm.formFields.filter(
          (f: FormField) => f.nombreTecnico === field.nombreTecnico,
        ).length > 1 && field.nombreTecnico !== '',
      message: `Campo : ${field.nombreTecnico} ya existe`,
    },
    {
      condition: field.nombreTecnico.length > 30,
      message: 'El campo no puede contener más de 30 caracteres',
    },
    {
      condition:
        touchedFields[field.id]?.nombreTecnico &&
        field.nombreTecnico.trim() !== '' &&
        !/^[a-z][a-z0-9_]*$/.test(field.nombreTecnico),
      message:
        'Debe iniciar con letra. Solo minúsculas, números y _ sin espacios ni tildes.',
    },
    {
      condition: reservedWords.includes(
        field.nombreTecnico.trim().toLowerCase(),
      ),
      message: 'No se permiten palabras reservadas (id, type, class, etc.).',
    },
    {
      condition:
        touchedFields[field.id] &&
        (field.min === undefined || field.min === null),
      message: 'La longitud mínima es obligatoria.',
    },
    {
      condition: field.min !== undefined && field.min < 0,
      message: 'La longitud mínima no puede ser negativa.',
    },
    {
      condition: field.max === undefined || field.max === null,
      message: 'La longitud máxima es obligatoria.',
    },
    {
      condition: field.max !== undefined && field.max > 200,
      message: 'La longitud máxima no puede superar 200 caracteres.',
    },
    {
      condition:
        field.min !== undefined &&
        field.max !== undefined &&
        field.min > field.max,
      message: 'La longitud mínima no puede ser mayor que la máxima.',
    },
    {
      condition: field.position === undefined || field.position === null,
      message: 'El campo orden es obligatorio.',
    },
    {
      condition: !Number.isInteger(field.position),
      message: 'El campo orden debe ser un número entero.',
    },
    {
      condition: field.position !== undefined && field.position < 1,
      message: 'El campo orden debe ser mayor o igual a 1.',
    },
    {
      condition: field.inputLabel === '',
      message: 'El nombre visible del campo es obligatorio.',
    },
    {
      condition: field.inputLabel.length > 200,
      message:
        'El nombre visible del campo no puede exceder los 200 caracteres.',
    },
  ];

  return errorMessages.map(
    (error, index) =>
      error.condition && (
        <span key={index} className="error-message">
          {error.message}
        </span>
      ),
  );
};
