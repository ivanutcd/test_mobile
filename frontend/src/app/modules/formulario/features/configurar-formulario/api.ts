import { httpApi } from 'app/http/http-api';
import { FormularioData } from '../../models/formulario.models';

export const guardarComposDinamicosFormulario = async (payload: FormularioData) => {
  return httpApi.put('/formulario/GuardarComposDinamicosFormulario', payload);
};

export const obtenerEstructuraFormulario = async (id: string) => {
  return httpApi.post(`/formulario/EstructuraFormulario`, { id });
};
