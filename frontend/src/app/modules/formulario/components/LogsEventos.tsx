import MainCard from '@common/ui-component/cards/main-card';
import { ColumnDef } from '@components/grid/models/column-def';
import { Button, PaginableGrid } from '@proyectos-enee/enee_componentes';
import { PaginateResult } from '@common/hooks/models/paginate-result';
import useObtenerLogsFormulario from '../hooks/useObtenerLogsFormulario';

import traducciones from '../common/translations';
import { useEffect } from 'react';
import { Stack } from '@mui/system';
interface TablaLogsFormularioProps {
  relatedId?: string;
  onCancel?: () => void;
}
const TablaLogsFormulario = ({ relatedId ,onCancel }: TablaLogsFormularioProps) => {
  const { data, loading ,buscar } =
    useObtenerLogsFormulario<any>({ RelatedId: relatedId }); 
 useEffect(() => {
    if (relatedId) {
      buscar({ RelatedId: relatedId });
    }
  }, [relatedId, buscar]);
  const columns: ColumnDef[] = [
    {
     colId: 'created',
     headerName: traducciones.FECHAEVENTO,
     field: 'created',
     minWidth: 200,
    },
     {
      colId: 'evento',
      headerName: traducciones.EVENTO,
      field: 'evento',
      minWidth: 200,
    },
    {
      colId: 'usuario',
      headerName: traducciones.NOMBRE_TECNICO,
      field: 'usuario',
    },
    {
      colId: 'estado',
      headerName: traducciones.ESTADO,
      field: 'estado',
    },
    {
      colId: 'versionFormulario',
      headerName: traducciones.VERSION,
      field: 'versionFormulario',
    }
  
  ];

  return (
    <MainCard>
      {!loading && data && (
        <PaginableGrid
          paginable={data as PaginateResult<any>}
          columnDefs={columns}
          sortModel={[{ field: 'created', sort: 'desc' }]}

        />
      )}
      {onCancel && (
      <Stack direction="row" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="inherit" onClick={onCancel}>
          Cancelar
        </Button>
      </Stack>
    )}
    </MainCard>
    
  );
};

export default TablaLogsFormulario;