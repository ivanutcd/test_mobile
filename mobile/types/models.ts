export interface Formulario {
  id: string;
  nombreTecnico: string;
  descripcion: string;
  formFields: any;
  estado: string;
  versionFormulario: string;
  movilidadAsociada: string;
  unidad: string;
}

export interface Respuesta {
  id: string;
  formularioId: string;
  contenido: string;
  fecha: string;
  enviada: number;
}
