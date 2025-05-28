import { EntityIdResponse } from 'app/modules/common/model/entity-id';
import { httpApi } from 'app/http/http-api';

export const restaurarVersionFormulario = async (
  id: string,
): Promise<EntityIdResponse> => {
  return httpApi.post(`formulario/restaurar-version-formulario`, { id });
};
