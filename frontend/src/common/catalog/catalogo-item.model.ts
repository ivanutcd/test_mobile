export interface CatalogoItem {
  id: string;
  nombre: string;
  fechaCreacion?: Date;
  catalogosPrincipales?: string[];
  catalogosDependientes?: string[];
}
