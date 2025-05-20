import { httpApi } from 'app/http/http-api';
import { VersionarFormularioData } from '../../models/formulario.models';

export const versionarFormulario = async (payload: VersionarFormularioData) => {
  return httpApi.post(`/formulario/versionamiento-formulario`,payload);
};
