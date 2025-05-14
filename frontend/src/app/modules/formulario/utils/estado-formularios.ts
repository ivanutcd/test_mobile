export enum EstadosFormulariosEnum {
  Borrador = 'borrador',
  Publicado = 'publicado',
}

export const EstadosFormularios = Object.entries(EstadosFormulariosEnum).map(
  ([nombre, id]) => ({
    id,
    nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
  }),
);
