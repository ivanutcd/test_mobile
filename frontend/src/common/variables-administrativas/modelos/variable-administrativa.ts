export interface VariableAdministrativa {
  id: string;
  variable: string;
  descripcion?: string;
  valor: any;
  fechaVigencia: Date;
  fechaRegistro: Date;
  usuarioRegistro: string;
  tipoValor: string;
}
