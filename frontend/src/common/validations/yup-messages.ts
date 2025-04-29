import * as yup from 'yup';

export const yupMessages: yup.LocaleObject = {
  mixed: {
    required: ({ label }) => `${label ?? 'Campo'} es requerido`,
    notType: ({ label }) => ` ${label ?? 'Campo'} es requerido`,
  },
  string: {
    email: () => 'Correo inválido',
    min: ({ min, label }) =>
      `${label ?? 'Campo'} debe ser mínimo ${min} caracteres`,
    max: ({ max, label }) =>
      `${label ?? 'Campo'} debe ser máximo ${max} caracteres`,
  },
  number: {
    lessThan: ({ less, label }) =>
      `Valor del ${label ?? 'Campo'} debe ser menor a ${less}`,
    moreThan: ({ more, label }) =>
      `Valor del ${label ?? 'Campo'} debe ser mayor a ${more}`,
    min: ({ min, label }) =>
      `Valor del ${label ?? 'Campo'} debe ser mínimo ${min}`,
    max: ({ max, label }) =>
      `Valor del ${label ?? 'Campo'} debe ser máximo ${max}`,
  },
  array: {
    min: ({ min, label }) =>
      `Debe seleccionar al menos ${min} elemento(s) del campo ${label ?? ''}`,
  },
};
