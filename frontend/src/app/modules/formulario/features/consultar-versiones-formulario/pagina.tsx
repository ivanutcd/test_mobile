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
import {
  ActionColumn,
} from '@components/grid/components/action-column.tsx';

import GestionarFormulario from '../gestionar-formulario/index.ts';
import { SearchProps } from './propos.ts';
import {Stack, Typography, Box, Divider,IconButton, Tooltip } from '@mui/material';
import Chip from '@components/chip/chip.tsx';
import { useRestaurarVersionFormularioHandler } from '../restaurar-version-formulario/restaurar-version-formulario-handler.ts';
import { EstadosFormulariosEnum } from '../../utils/estado-formularios.ts';
const Pagina = ({ id }: SearchProps) => {
  const { data, loading, recargar } = usePaginadoFormulariosRelacionados(id ?? undefined);
  const [formularioId, setFormularioId] = useState('');
  const [mode, setMode] = useState<ModeFormulario>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  const handleOpenModal = (newMode: ModeFormulario) => {
    setMode(newMode);
    setOpenModal(true);
  };
  const handleSuccess = () => {
    setOpenModal(false);
    recargar();
  };
  const { publicar } = useRestaurarVersionFormularioHandler();

  
  const actions: Array<ActionColumn> = [
    
    {
       label: traducciones.VISUALIZAR,
       icon: <VisibilityIcon color="primary" />,
       onClick: params => {
          setFormularioId(params.id);
          handleOpenModal('view');
        },
        
    },
    {
      icon: <RestorePageIcon />,
      label: traducciones.RESTAURAR,
      onClick: async params => {
        await publicar(params.id, {
          onComplete: () => handleSuccess()
        });
      }
      
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
      {actions
        .filter(action => {
          if (action.label === traducciones.RESTAURAR) {
            return formulario.estado === EstadosFormulariosEnum.Obsoleto;
          }
          return true;
        })
        .map((action, index) => (
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

     
      </MainCard>
    </>
  );
};

export default Pagina;