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
  FileCopy as DuplicateIcon
} from '@mui/icons-material';
import { traducciones } from '../../common/translations';
import SearchComponent from '@components/searchComponent/index.tsx';
import SearchForm from '../../components/searchForm';
import { SearchProps } from './props.ts';
import { PaginateResult } from '@common/hooks/models/paginate-result.ts';
import { BoxContainer } from '@components/ui-layout/box-container.tsx';

const Pagina = () => {
    const { data, loading, buscar, recargar } = usePaginadoFormularios();

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
        onClick: () => {},
      },
      {
        label: traducciones.DUPLICAR,
        icon: <DuplicateIcon />,
        onClick: () => {},
      }
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
            field: 'movilidadAsociada'
        },
        {
            colId: 'versionFormulario',
            headerName: traducciones.VERSION,
            field: 'versionFormulario'
        },
        {
            colId: 'estado',
            headerName: traducciones.ESTADO,
            field: 'estado'
        },
        {
            colId: 'createdDate',
            headerName: traducciones.FECHA_CREACION,
            field: 'createdDate',
            minWidth: 300
        },
        {
            colId: 'updatedDate',
            headerName: traducciones.FECHA_MODIFICACION,
            field: 'updatedDate',
            minWidth: 300
        }
    ];

    return (
        <>
          <MainCard>
            <h1>{traducciones.LISTADO}</h1>
            <BoxContainer display="flex" flexDirection="row" gap={2}>
              <SearchComponent<SearchProps>
                includeToolbar={false}
                ChildComponent={SearchForm}
                save={buscar}
                extraProps={{handleRecargar:recargar}}
              />
              <Button size="large"><AddIcon />
                {traducciones.BOTON_CREAR}
              </Button>
            </BoxContainer>
            {!loading && data && (
              <PaginableGrid
                paginable={data as PaginateResult<any>}
                columnDefs={columns}
              />
            )}
          </MainCard>
        </>
      );
};
export default Pagina;