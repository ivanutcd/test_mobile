import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import FormRender from '../features/configurar-formulario/formRender';
import { useObtenerFormularioById } from '../hooks/useObtenerFormulario';
import traducciones from '../common/translations';
import { obtenerEstructuraFormulario } from '../features/configurar-formulario/api';
import { Button } from '@proyectos-enee/enee_componentes';
import { usePublicarFormularioHandler } from '../features/publicar-formulario/publicar-formulario-handler';

interface DetalleFormularioProps {
  id: string;
  mode: string;
  handleClose: () => void;
  hidePublishButton?: boolean;
}
type FieldType =
  | 'text'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'file'
  | 'image'
  | 'textarea'
  | 'range'
  | 'rangeDate';
interface FormField {
  id: string;
  type: FieldType;
  label: string;
  inputLabel: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  options?: string[];
  rows?: number;
}

const DetalleFormulario = ({
  id,
  handleClose,
  hidePublishButton,
}: DetalleFormularioProps) => {
  const [{ data: formulario }] = useObtenerFormularioById(id ?? '');
  const { publicar } = usePublicarFormularioHandler();
  const [formData, setFormData] = useState<{
    formFields: FormField[];
    estado: string;
    movilidadAsociada: string;
    nombreTecnico: string;
    descripcion: string;
    version?: string;
  }>();

  useEffect(() => {
    if (!id) return;
    const obtenerEstructura = async () => {
      const response = (await obtenerEstructuraFormulario(id)) as {
        objeto: {
          formFields: FormField[];
        };
      };

      setFormData({
        formFields: response.objeto.formFields ?? [],
        estado: formulario?.estado ?? '',
        movilidadAsociada: formulario?.movilidadAsociada ?? '',
        nombreTecnico: formulario?.nombreTecnico ?? '',
        descripcion: formulario?.descripcion ?? '',
        version: formulario?.versionFormulario ?? '',
      });
    };

    obtenerEstructura();
  }, [id, formulario]);

  if (!formulario || !formData) return <CircularProgress />;

  return (
    <Box
      sx={{
        width: '950px',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        border={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          borderColor: 'grey.300',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', mb: 2, color: 'GrayText' }}
        >
          Detalle de formulario
        </Typography>

        {[
          { label: traducciones.NOMBRE_TECNICO, value: formData.nombreTecnico },
          { label: traducciones.DESCRIPCION, value: formData.descripcion },
          {
            label: traducciones.MOVILIDAD_ASOCIADA,
            value: formData.movilidadAsociada,
          },
          { label: traducciones.ESTADO, value: formData.estado },
          { label: traducciones.VERSION, value: formData.version },
        ].map(({ label, value }) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 1,
              borderBottom: '1px solid #eee',
            }}
          >
            <Typography variant="body1" color="GrayText">
              {label}
            </Typography>
            <Typography variant="body1" color="GrayText">
              {value || '-'}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography
        variant="body1"
        color={'GrayText'}
        fontWeight={'bold'}
        gutterBottom
      >
        Configuración del formulario móvil
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          mx: 'auto',
          p: 2,
          backgroundColor: '#fff',
        }}
      >
        <FormRender formData={formData} />
      </Box>
      {formulario && formData && id && !hidePublishButton && (
        <Box
          display="flex"
          justifyContent="flex-end"
          gap={2}
          sx={{
            py: 3,
            px: 2,
            borderTop: '2px solid #eee',
            backgroundColor: 'white',
            position: 'sticky',
            bottom: -8,
            zIndex: 2,
          }}
        >
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              publicar(id, {
                onComplete: handleClose,
                onCancel: handleClose,
              });
            }}
          >
            {traducciones.PUBLICAR}
          </Button>
        </Box>
      )}
      {formulario && formData && id && hidePublishButton && (
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{
            py: 3,
            px: 2,
            borderTop: '2px solid #eee',
            backgroundColor: 'white',
            position: 'sticky',
            bottom: -8,
            zIndex: 2,
          }}
        >
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DetalleFormulario;
