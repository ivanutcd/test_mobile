import MainCard from '@common/ui-component/cards/main-card.tsx';
import { usePaginadoFormulariosRelacionados } from '../../hooks/usePaginadoFormulariosRelacionados.ts';
import { RestorePage as RestorePageIcon,
    Visibility as VisibilityIcon,
 } from '@mui/icons-material';
import { useState } from 'react';
import { traducciones } from '../../common/translations';

import {
  CustomModal,
} from '@proyectos-enee/enee_componentes';
import { ModeFormulario, TitleFormulario } from '../../common/types.ts';
import FormularioEditar from '../Editar-formulario/index.tsx';

import {
  ActionColumn,
} from '@components/grid/components/action-column.tsx';

import GestionarFormulario from '../gestionar-formulario/index.ts';
import { SearchProps } from './propos.ts';
import {Stack, Typography, Box, Divider,IconButton, Tooltip } from '@mui/material';
import Chip from '@components/chip/chip.tsx';
const Pagina = ({ id }: SearchProps) => {
  const { data, loading, recargar } = usePaginadoFormulariosRelacionados(id ?? undefined);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [formularioId, setFormularioId] = useState('');
  const [mode, setMode] = useState<ModeFormulario>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModalEditar = () => {
    setOpenModalEditar(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModalEditar = (newMode: ModeFormulario) => {
    setMode(newMode);
    setOpenModalEditar(true);
  };
  
  const handleOpenModal = (newMode: ModeFormulario) => {
    setMode(newMode);
    setOpenModal(true);
  };
  const handleSuccess = () => {
    setOpenModalEditar(false);
    setOpenModal(false);
    recargar();
  };

  const actions: Array<ActionColumn> = [
    {
      icon: <RestorePageIcon />,
      label: traducciones.EDITAR,
      onClick: params => {
        setFormularioId(params.id);
        handleOpenModalEditar('edit');
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
  ];
  interface DetalleChipsProps {
    createdBy: string;
    createdDate: string;
    estado: string;
  }
  
  const DetalleChips = ({ createdBy, createdDate, estado }: DetalleChipsProps) => {
    const chipData = [
      { label: `Autor: ${createdBy}` },
      { label: `Fecha: ${createdDate}` },
      { label: `Estado: ${estado}` }
    ];
  
    return (
      <Stack direction="row" spacing={1}>
        {chipData.map((chip, index) => (
          <Chip key={index} label={chip.label} variant="filled" sx={{ bgcolor: "#f0f0f0" }} />
        ))}
      </Stack>
    );
  };
  
  const RenderActions = ({ formulario }: { formulario: any }) => (
    <Stack direction="row" spacing={1} mt={0}>
      {actions.map((action, index) => (
        <Tooltip key={index} title={action.label}>
          <IconButton color="primary" onClick={() => action.onClick(formulario)}>
            {action.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );

  return (
    <>
      <MainCard>
        {!loading && data && (
          <Box>
            <Stack spacing={1}>
              {data.map((formulario: any) => (
                <Box
                  key={formulario.id}
                  py={0}>
                   <Typography variant="subtitle1">
                   Versión: {formulario.versionFormulario}
                  </Typography>
                  <DetalleChips
                    createdBy={formulario.createdBy}
                    createdDate={formulario.createdDate}
                    estado={formulario.estado}
                  />
                  <Stack direction="row" spacing={0} mt={0}>
                  <RenderActions formulario={formulario} />
                  </Stack>
                  <Divider sx={{ mt: 0 }} />
                </Box>
              ))}
            </Stack>
          </Box>
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
            ocultarAcciones={true}
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