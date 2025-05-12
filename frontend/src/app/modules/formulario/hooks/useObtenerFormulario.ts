import { useGetWith } from '@common/hooks/use-get-with';
import { FormularioInterface } from '../interfaces/formulario';
import { httpApi } from 'app/http/http-api';
import { FormularioData } from '../models/formulario.models';

export const Formularios_baseUrl = '/formulario';
export const useObtenerFormularioById = (id: string) => {
  return useGetWith<FormularioData>(httpApi, {
    url: `${Formularios_baseUrl}/${id}`,
  });
};
