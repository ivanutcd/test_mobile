import { FormularioInterface } from '../../interfaces/formulario';
import { useObtenerFormularioById } from '../../hooks/useObtenerFormulario';
import { editarFormulario } from './api';
import { Button } from '@proyectos-enee/enee_componentes';
import { Box } from '@mui/material';
import { useNotification } from '@components/snackbar/use-notification';
import { traducciones } from '../../common/translations';
import FormularioBase from '../../components/FormularioBase';
import { useCatalogos } from '@common/catalog/hooks';
import { useState, useEffect } from 'react';
import {
  FormularioDataEmpty,
  FormularioProps,
  ModeFormulario,
} from '../../common/types';
import { FormularioData } from '../../models/formulario.models';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

interface Props extends FormularioProps {
  mode: ModeFormulario;
}
const EditarFormulario = ({ onCancel, onSuccess, id, mode }: Props) => {
  const [{ data: formulario }] = useObtenerFormularioById(id ?? '');
  const { success } = useNotification();
  const [initialValues, setInitialValues] = useState(FormularioDataEmpty);
  const [isLoading, setIsLoading] = useState(false);
  const { data: catalogs } = useCatalogos(
    'tipo_movilidad',
    'estado_formulario',
  );
  const nameForm = `${mode ?? 'skeleton'}Formulario`;
  const [{ data: response, loading }] = useObtenerFormularioById(id ?? '');
  const navigate = useNavigate();

  useEffect(() => {
    if (id && response) {
      const estado = catalogs?.estado_formulario.find(
        x => x.id === response.estado,
      );
      const movilidadAsociada = catalogs?.tipo_movilidad.find(
        x => x.id === response.movilidadAsociada,
      );
      const mergedInitialValues: FormularioData = {
        ...response,
        estadoItem: estado,
        estadoNombre: estado?.nombre ?? response?.estado,
        movilidadAsociadaItem: movilidadAsociada,
        movilidadAsociadaNombre:
          movilidadAsociada?.nombre ?? response?.movilidadAsociada,
      };

      setInitialValues(mergedInitialValues);
    }

    setIsLoading(loading);
  }, [
    id,
    response,
    loading,
    catalogs?.estado_formulario,
    catalogs?.tipo_movilidad,
  ]);

  if (loading || !formulario) return <></>;
  const guardar = async (formValues: FormularioInterface) => {
    const values: FormularioInterface = {
      ...formValues,
      id: id!,
    };

    editarFormulario(values.id, values).then(() => {
      success('Formulario editado correctamente');
      onSuccess();
      onCancel();
        navigate(`/formularios/${values.id}/configurar`);
    });
  };
  // Validaciones
  const schema = yup.object({
    nombreTecnico: yup
      .string()
      .required('Este campo es requerido')
      .max(200, 'Máximo 200 caracteres')
      .matches(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras y números, sin espacios'),
    descripcion: yup
      .string()
      .required('Este campo es requerido')
      .max(2000, 'Máximo 2000 caracteres'),
    estadoItem: yup
      .object()
      .test('estado-valido', 'Este campo es requerido', function () {
        return this.parent.estado ? true : false;
      }),
    movilidadAsociadaItem: yup
      .object()
      .test('movilidad-valido', 'Este campo es requerido', function () {
        return this.parent.movilidadAsociada ? true : false;
      }),
  });

  return (
    <>
      <Box sx={{ width: '500px' }}>
        <FormularioBase
          defaultValues={initialValues}
          onSubmit={guardar}
          loading={isLoading}
          nameForm={nameForm}
          catalogs={catalogs}
          validations={schema}
          mode={'edit'}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => {
            onCancel();
          }}
        >
          Cerrar
        </Button>
        <Button
          form={nameForm}
          type="submit"
          variant="contained"
          color="primary"
        >
          {traducciones.EDITAR}
        </Button>
      </Box>
    </>
  );
};
export default EditarFormulario;
