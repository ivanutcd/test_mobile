import MainCard from '@common/ui-component/cards/main-card.tsx';
import { Button } from '@components/button/button.tsx';
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
  Rocket as RocketIcon,
  ControlPointDuplicate as ControlPointDuplicateOutlinedIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { traducciones } from '../../common/translations';
import SearchComponent from '@components/searchComponent/index.tsx';
import SearchForm from '../../components/searchForm';
import { SearchProps } from './props.ts';
import { PaginateResult } from '@common/hooks/models/paginate-result.ts';
import { useNavigate } from 'react-router';
import {
  CustomModal,
  PaginableGrid,
  BoxContainer,
} from '@proyectos-enee/enee_componentes';
import { useConfirmDialog } from '@components/dialog/confirm-dialog.tsx';
import GestionarFormulario from '../gestionar-formulario/index.ts';
import { ModeFormulario, TitleFormulario } from '../../common/types.ts';
import FormularioEditar from '../Editar-formulario/index.tsx';
import { Formulario } from '../../models/formulario.models.ts';
import { eliminarFormulario } from '../eliminar-formulario/api.ts';
import { EstadosFormulariosEnum } from '../../utils/estado-formularios.ts';
import { usePublicarFormularioHandler } from '../publicar-formulario/publicar-formulario-handler.ts';
import { useVersionarFormulario } from '../Versionar/versionar-formulario.ts';
import { duplicarFormulario } from '../duplicar-formulario/api.ts';


const Pagina = () => {
  const { data, loading, buscar, recargar } = usePaginadoFormularios();


  
  

  const navigate = useNavigate();
  const confirm = useConfirmDialog();
  const { publicar } = usePublicarFormularioHandler();
  const { versionar } = useVersionarFormulario();
  const [openModal, setOpenModal] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [formularioId, setFormularioId] = useState('');
  const [mode, setMode] = useState<ModeFormulario>(null);

  const handleSuccess = () => {
    setOpenModal(false);
    recargar();
  };

  const handleOpenConfirmationDuplicate = async (params: Formulario) => {
    const result = await confirm({
      title: `Duplicar ${params.nombreTecnico}`,
      description: '¿Estás seguro de querer duplicar este formulario?',
      confirmationText: 'Duplicar',
      cancellationText: 'Cancelar',
    });
    if (result) {
      const payload = {id: params.id};
      await duplicarFormulario(payload);
      recargar();
    }
  }

  const handleOpenConfirmationDelete = async (params: Formulario) => {
    const result = await confirm({
      title: `Eliminar ${params.nombreTecnico}`,
      description: '¿Estás seguro de querer eliminar este formulario?',
      confirmationText: 'Eliminar',
      cancellationText: 'Cancelar',
    });
    if (result) {
      await eliminarFormulario(params.id);
      recargar();
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModalEditar = () => {
    setOpenModalEditar(false);
  };
  const handleOpenModal = (newMode: ModeFormulario) => {
    setMode(newMode);
    setOpenModal(true);
  };

  const handleOpenModalEditar = (newMode: ModeFormulario) => {
    setMode(newMode);
    setOpenModalEditar(true);
  };

  const actions: Array<ActionColumn> = [
    {
      icon: <EditIcon />,
      label: traducciones.EDITAR,
      onClick: params => {
        setFormularioId(params.id);
        handleOpenModalEditar('edit');
      },
      disabled: params => params.estado === EstadosFormulariosEnum.Publicado,
    },
    {
      icon: <DeleteIcon />,
      onClick: params => {
        handleOpenConfirmationDelete(params);
      },
    },
    {
      label: traducciones.VISUALIZAR,
      icon: <VisibilityIcon color="primary" />,
      onClick: params => {
        setFormularioId(params.id);
        handleOpenModal('view');
      },
    },
    {
      label: traducciones.CONFIGURAR,
      icon: <SettingsIcon color="primary" />,
      onClick: params => {
        navigate(`/formularios/${params.id}/configurar`);
      },
    },
    {
      label: traducciones.DUPLICAR,
      icon: <DuplicateIcon color="primary" />,
      onClick: (params) => { handleOpenConfirmationDuplicate(params); },
    },
    {
      label: traducciones.PUBLICAR,
      icon: <RocketIcon color="primary" />,
      onClick: rowData => {
        publicar(rowData.id, {
          onComplete: () => {
            setTimeout(() => handleSuccess(), 500);
          },
          onCancel: () => {},
        });
      },
      hide: params => params.estado === EstadosFormulariosEnum.Publicado,
    },
    {
      label: traducciones.VERSIONAR,
      icon: <ControlPointDuplicateOutlinedIcon  color="primary" />,
      onClick: rowData => {
        versionar(rowData.id, {
          onComplete: () => {
            setTimeout(() => handleSuccess(), 500);
          },
          onCancel: () => {},
        });
      },
      hide: params => params.estado !== EstadosFormulariosEnum.Publicado,
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
      sortable: true,
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
          <Button size="large" onClick={() => handleOpenModal('create')}>
            <AddIcon style={{ marginRight: 10 }} />
            {traducciones.BOTON_CREAR}
          </Button>
        </BoxContainer>

        {!loading && data && (
          <PaginableGrid
            paginable={data as PaginateResult<any>}
            columnDefs={columns}
            sortModel={[{ field: 'createdDate', sort: 'desc' }]}

          />
        )}

        <CustomModal
          open={openModal}
          handleClose={handleCloseModal}
          modalTitle={TitleFormulario(mode)}
        >
          <GestionarFormulario
            mode={mode}
            id={formularioId}
            onCancel={handleCloseModal}
            onSuccess={handleSuccess}
          />
        </CustomModal>

        <CustomModal
          open={openModalEditar}
          handleClose={handleCloseModalEditar}
          modalTitle={TitleFormulario(mode)}
        >
          <FormularioEditar
            mode={mode}
            id={formularioId}
            onCancel={handleCloseModalEditar}
            onSuccess={handleSuccess}
          />
        </CustomModal>
      </MainCard>
    </>
  );
};
export default Pagina;
