import MainCard from '@common/ui-component/cards/main-card.tsx';
import { Button } from '@components/button/button.tsx';
import { PaginableGrid } from '@components/grid/paginable-grid.tsx';
import { usePaginadoFormularios } from '../../hooks/usePaginadoFormularios.ts';
import { ColumnDef } from '@components/grid/models/column-def.tsx';
import {
  ActionColumn,
  generateActionColumn,
} from '@components/grid/components/action-column.tsx';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  AddCircleOutline as AddIcon,
  FileCopy as DuplicateIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { traducciones } from '../../common/translations';
import SearchComponent from '@components/searchComponent/index.tsx';
import SearchForm from '../../components/searchForm';
import { SearchProps } from './props.ts';
import { PaginateResult } from '@common/hooks/models/paginate-result.ts';
import { BoxContainer } from '@components/ui-layout/box-container.tsx';
import { useNavigate } from 'react-router';


// Luego se reemplaza por el componente de enee_componentes
import CustomModal from '@components/modal/dialog';

// Luego se reemplazar por este componente
// import { CustomModal } from '@proyectos-enee/enee_componentes';

import  Formulario  from '../../components/formulario';


const Pagina = () => {
  const { data, loading, buscar, recargar } = usePaginadoFormularios();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const actions: Array<ActionColumn> = [
    {
      icon: <EditIcon />,
      onClick: () => {},
    },
    {
      icon: <DeleteIcon />,
      onClick: () => {},
    },
    {
      label: traducciones.VISUALIZAR,
      icon: <VisibilityIcon />,
      onClick: params => {
        navigate(`/formularios/${params.id}/ver`);
      },
    },
    {
      label: traducciones.CONFIGURAR,
      icon: <SettingsIcon />,
      onClick: params => {
        navigate(`/formularios/${params.id}/configurar`);
      },
    },
    {
      label: traducciones.DUPLICAR,
      icon: <DuplicateIcon />,
      onClick: () => {},
    },
  ];

  const hasAnyActionAccess = actions.some(
    accion => !accion.hide || !accion.hide(null),
  );


  const columns: ColumnDef[] = [
    ...(hasAnyActionAccess
      ? [
          {
            headerName: traducciones.ACCIONES,
            field: 'actions',
            renderCell: generateActionColumn(actions),
            type: 'actions',
            minWidth: 160,
          },
        ]
      : []),
    {
      colId: 'nombreTecnico',
      headerName: traducciones.NOMBRE_TECNICO,
      field: 'nombreTecnico',
    },
    {
      colId: 'movilidadAsociada',
      headerName: traducciones.MOVILIDAD_ASOCIADA,
      field: 'movilidadAsociada',
    },
    {
      colId: 'versionFormulario',
      headerName: traducciones.VERSION,
      field: 'versionFormulario',
    },
    {
      colId: 'estado',
      headerName: traducciones.ESTADO,
      field: 'estado',
    },
    {
      colId: 'createdDate',
      headerName: traducciones.FECHA_CREACION,
      field: 'createdDate',
      minWidth: 300,
    },
    {
      colId: 'updatedDate',
      headerName: traducciones.FECHA_MODIFICACION,
      field: 'updatedDate',
      minWidth: 300,
    },
  ];

  return (
    <>
      <MainCard title={traducciones.LISTADO}>
        <BoxContainer display="flex" flexDirection="row" gap={2}>
          <SearchComponent<SearchProps>
            includeToolbar={false}
            ChildComponent={SearchForm}
            save={buscar}
            extraProps={{ handleRecargar: recargar }}
          />
          <Button size="large" onClick={() => setOpen(true)}>
            <AddIcon />
            {traducciones.BOTON_CREAR}
          </Button>
        </BoxContainer>
        {!loading && data && (
          <PaginableGrid
            paginable={data as PaginateResult<any>}
            columnDefs={columns}
          />
        )}
  

          <CustomModal
            open={open}
            handleClose={() => setOpen(false)}
            modalTitle="Configurar Formulario"
      >
      
            <Formulario onSubmit={() => {}} nameForm="formulario" loading={false} />
          </CustomModal>
   

      </MainCard>
    </>
  );
};
export default Pagina;
