import { useGetWith } from '@common/hooks/use-get-with';
import { httpCatalogo } from 'app/http/http-catalogo';
import { UseAxiosResult } from 'axios-hooks';
import { VariableAdministrativa } from '../modelos/variable-administrativa';

export const useGetVariableAdministrativaTipo: (
  fechaVigencia: string,
  tipo: string,
) => UseAxiosResult<VariableAdministrativa[]> = (
  fechaVigencia: string,
  tipo: string,
) => {
  return useGetWith<VariableAdministrativa[]>(httpCatalogo, {
    url: `/variables/tipo/${tipo}?fechaVigencia=${fechaVigencia}`,
  });
};
