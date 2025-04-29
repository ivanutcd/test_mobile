import * as yup from 'yup';

export function allowNull(this: yup.DateSchema) {
  return this.nullable('Campo requerido ss').transform((v: any) =>
    v instanceof Date && !isNaN(v as any) ? v : null,
  );
}
