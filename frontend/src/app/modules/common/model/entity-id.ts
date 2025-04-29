export type EntityIdResponse = { id: string };
export type EntityBulkIdResponse = {
  id: string;
  metaData: string;
  isOk: boolean;
  errores: any[];
  registroExiste: boolean;
};
