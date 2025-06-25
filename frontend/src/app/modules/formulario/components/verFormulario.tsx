import {
  FormularioDataEmpty} from '../common/types.ts';
import { Divider } from '@mui/material';
import { BoxContainer } from '@components/ui-layout/box-container';
import { useCatalogos } from '@common/catalog/hooks';
import { useEffect, useState } from 'react';
import { useObtenerFormularioById } from '../hooks/useObtenerFormulario';

// forms
import { FormularioData } from '../models/formulario.models';
import VisualizarFormulario from '../features/visualizar-formulario';

interface VerFormularioProps {
  mode: string;
  id: string;
}

const VerFormulario = ({
  id,
  mode,
}: VerFormularioProps) => {
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

  return (
    <BoxContainer
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 0,
      }}
      maxWidth="500px"
    >
      <BoxContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
        {mode === 'view' && (
          <VisualizarFormulario
            nameForm={nameForm}
            catalogs={catalogs}
            initialValues={initialValues}
            isLoading={isLoading}
            ocultarAcciones = {false} 
          />
        )}
      </BoxContainer>

      <Divider
        sx={{ position: 'relative', width: 'calc(100% + 32px)', mx: -2, mt: 3 }}
      />
    </BoxContainer>
  );
};

export default VerFormulario;
