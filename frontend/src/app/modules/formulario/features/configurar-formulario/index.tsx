import { useState } from 'react';
import MainCard from '@common/ui-component/cards/main-card.tsx';
import FormBuilder from './FormBuilder';
import FormRender from './formRender';
import { FormType } from './FormType';
import { GridContainer } from '@components/ui-layout/grid-container';
import { Col } from '@components/ui-layout/col';
import { useConfirmDialog } from '@components/dialog/confirm-dialog.tsx';
import { FormField } from './formField';
import { useParams } from 'react-router-dom';
import { useObtenerFormularioById } from '../../hooks/useObtenerFormulario';
import { useNavigate } from 'react-router-dom';
import {
  History as HistoryIcon,
} from '@mui/icons-material';
import { BoxContainer, Button, CustomModal } from '@proyectos-enee/enee_componentes';
import traducciones from '../../common/translations';
import TablaLogsFormulario from '../../components/LogsEventos';
interface ConfigurarFormularioProps {
  disabled?: boolean;
}

const ConfigurarFormulario = ({ disabled }: ConfigurarFormularioProps) => {
  const { id } = useParams();
  const [{ data: formulario }] = useObtenerFormularioById(id ?? '');
  console.log(formulario);
  const confirm = useConfirmDialog();

  const [openLogsModal, setOpenLogsModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    formFields: FormField[];
    estado: string;
    movilidadAsociada: string;
    nombreTecnico: string;
    descripcion: string;
  }>({
    formFields: (formulario as FormType)?.formFields ?? [],
    estado: formulario?.estado ?? '',
    movilidadAsociada: formulario?.movilidadAsociadaItem?.nombre ?? '',
    nombreTecnico: formulario?.nombreTecnico ?? '',
    descripcion: formulario?.descripcion ?? '',
  });
  const handleOpenLogsModal = () => {
  setOpenLogsModal(true);
};

const handleCloseLogsModal = () => {
  setOpenLogsModal(false);
};
  const handleBackCancel = async () => {
    const result = await confirm({
      title: '¿Estás seguro de querer salir?',
      description: 'Se perderán los cambios realizados',
      confirmationText: 'Salir',
      cancellationText: 'Cancelar',
    });
    if (result) {
      navigate('/formularios', { replace: true });
    }
  };
  return (
     <MainCard
    title={
      <BoxContainer display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <span>{`Configurar ${formulario?.nombreTecnico ?? ''}`}</span>
        <Button
            variant="contained"
            color="inherit"
          startIcon={<HistoryIcon />}
          onClick={handleOpenLogsModal}
        >
          {traducciones.Logs}
        </Button>
      </BoxContainer>
    }
    backButton={handleBackCancel}
    sx={{ minHeight: 'calc(100vh - 210px)' }}
    >
      {formulario && (
        <GridContainer>
          <Col xs={12} md={8}>
            <FormBuilder
              onFormChange={setFormData}
              formData={formulario as FormType}
              disabled={disabled}
            />
          </Col>
          <Col xs={12} md={4}>
            <div className="form-render-container">
              <FormRender formData={formData} />
            </div>
          </Col>
        </GridContainer>
      )}
        <CustomModal
        open={openLogsModal}
        handleClose={handleCloseLogsModal}
        modalTitle={traducciones.HISTORICODEEVENTOS}
          >
        <TablaLogsFormulario  onCancel={handleCloseLogsModal} />
        </CustomModal>
    </MainCard>
    
  );
};

export default ConfigurarFormulario;
