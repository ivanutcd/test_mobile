import { EntityIdResponse } from 'app/modules/common/model/entity-id';
import { httpApi } from 'app/http/http-api';

export const publicarFormulario = async (
  id: string,
): Promise<EntityIdResponse> => {
  return httpApi.put(`/formulario`, { id });
};
