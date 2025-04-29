import { httpSSO } from 'app/http/http-sso';
import { EntityIdResponse } from 'app/modules/common/model/entity-id';
import { ResetPasswordRequestProps } from './types';

export const reiniciarContrasena = async (
  values: ResetPasswordRequestProps,
  url: string,
): Promise<EntityIdResponse> => {
  return httpSSO.put(`users/${url}`, values);
};
