import {
  FormularioDataEmpty,
  FormularioProps,
  ModeFormulario,
} from '../../common/types';
import { Button, Divider } from '@mui/material';
import { BoxContainer } from '@components/ui-layout/box-container';
import { useCatalogos } from '@common/catalog/hooks';
import { useEffect, useState } from 'react';
import { useObtenerFormularioById } from '../../hooks/useObtenerFormulario';

// forms
import { FormularioData } from '../../models/formulario.models';
import CrearFormulario from '../crear-formulario';
import VisualizarFormulario from '../visualizar-formulario';
import { EstadosFormulariosEnum } from '../../utils/estado-formularios';

interface GestionarFormularioProps extends FormularioProps {
  mode: ModeFormulario;
}

const Pagina = ({
  onCancel,
  onSuccess,
  id,
  mode,
}: GestionarFormularioProps) => {
  const [initialValues, setInitialValues] = useState(FormularioDataEmpty);
  const [isLoading, setIsLoading] = useState(false);
  const { data: catalogs } = useCatalogos(
    'tipo_movilidad',
    'estado_formulario',
  );
  const nameForm = `${mode ?? 'skeleton'}Formulario`;
  const [{ data: response, loading }] = useObtenerFormularioById(id ?? '');

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

  let publicarFormularioFn: (id: string) => void;
  const setPublicarFormularioFunction = (fn: (id: string) => void) => {
    publicarFormularioFn = fn;
  };
  const ejecutarPublicar = () => {
    if (publicarFormularioFn) {
      publicarFormularioFn(id ?? '');
    }
  };

  return (
    <BoxContainer
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      maxWidth="500px"
    >
      <BoxContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
        {mode === 'create' && (
          <CrearFormulario
            onSuccess={onSuccess}
            nameForm={nameForm}
            catalogs={catalogs}
          />
        )}
        {mode === 'view' && (
          <VisualizarFormulario
            onSuccess={onSuccess}
            onCancel={onCancel}
            nameForm={nameForm}
            catalogs={catalogs}
            initialValues={initialValues}
            isLoading={isLoading}
            onPublicarFormulario={setPublicarFormularioFunction}
          />
        )}
      </BoxContainer>

      <Divider
        sx={{ position: 'relative', width: 'calc(100% + 32px)', mx: -2, mt: 3 }}
      />

      <BoxContainer
        sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
      >
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        {mode !== 'view' && (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            form={nameForm}
          >
            Guardar
          </Button>
        )}
        {mode === 'view' &&
          initialValues.estado !== EstadosFormulariosEnum.Publicado && (
            <Button
              variant="contained"
              color="primary"
              onClick={ejecutarPublicar}
            >
              Publicar formulario
            </Button>
          )}
      </BoxContainer>
    </BoxContainer>
  );
};

export default Pagina;
