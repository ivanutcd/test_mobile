import { useGetWith } from '@common/hooks/use-get-with';
import { FormularioInterface } from '../interfaces/formulario';
import { httpApi } from 'app/http/http-api';

export const Formularios_baseUrl = '/formulario';
export const useObtenerFormularioById = (id: string) => {
  return useGetWith<FormularioInterface>(httpApi, {
    url: `${Formularios_baseUrl}/${id}`,
  });
};
