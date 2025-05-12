import { httpApi } from 'app/http/http-api';
import { FormularioInterface } from '../../interfaces/formulario';
import { EntityIdResponse } from 'app/modules/common/model/entity-id';
import { Formularios_baseUrl } from '../../hooks/useObtenerFormulario';

export const editarFormulario = async (
  id: string,
  data: FormularioInterface,
): Promise<EntityIdResponse> => {
  const { nombreTecnico, descripcion, movilidadAsociada, estado } = data;
  const transformedData = {
    nombreTecnico,
    descripcion,
    movilidadAsociada,
    estado: estado,
  };
  return httpApi.put(`${Formularios_baseUrl}/${id}`, transformedData);
};
