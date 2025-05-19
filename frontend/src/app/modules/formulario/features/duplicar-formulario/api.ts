import { httpApi } from 'app/http/http-api';

export const duplicarFormulario = async (payload: any) => {
  return httpApi.post('/formulario/DuplicarFormulario', payload);
};
