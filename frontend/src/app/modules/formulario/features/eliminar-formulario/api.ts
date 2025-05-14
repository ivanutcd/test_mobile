import { httpApi } from 'app/http/http-api';
export const eliminarFormulario = async (id: string) => {
  return httpApi.delete(`/formulario/${id}`);
};
