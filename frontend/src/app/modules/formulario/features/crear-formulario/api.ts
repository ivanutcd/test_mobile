import { httpApi } from 'app/http/http-api';
import { FormularioData } from '../../models/formulario.models';

export const crearFormulario = async (payload: FormularioData) => {
  return httpApi.post('/formulario', payload);
};
