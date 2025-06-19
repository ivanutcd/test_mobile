import { useState, useEffect } from 'react';
import { Box, Divider, Typography, CircularProgress } from '@mui/material';
import FormRender from '../features/configurar-formulario/formRender';
import { useObtenerFormularioById } from '../hooks/useObtenerFormulario';
import { FormType } from '../features/configurar-formulario/FormType';
import VerFormulario from './verFormulario';

interface DetalleFormularioProps {
  id: string;
  mode: string;
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
  imputLabel: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  options?: string[];
  rows?: number;
}

const DetalleFormulario = ({id,mode}: DetalleFormularioProps) => {
  const [{ data: formulario, loading }] = useObtenerFormularioById(id);
  const [formData, setFormData] = useState<{
    formFields: FormField[];
    estado: string;
    movilidadAsociada: string;
    nombreTecnico: string;
    descripcion: string;
  }>();

  useEffect(() => {
    console.log('Formulario data:', formulario);
    
    if (formulario) {
      setFormData({
        formFields: (formulario as FormType)?.formFields ?? [],
        estado: formulario.estado ?? '',
        movilidadAsociada: formulario?.movilidadAsociada ?? '',
        nombreTecnico: formulario.nombreTecnico ?? '',
        descripcion: formulario.descripcion ?? '',
      });
    }
  }, [formulario]);

  if (loading || !formulario || !formData) return <CircularProgress />;

  return (
    <Box sx={{width: '100%',mx: 'auto'}}>
      <VerFormulario
            mode={mode}
            id={id}
          />
      <Divider sx={{ my: 3 }} />

      <Typography variant="h2" gutterBottom>
        Configuración del formulario movil
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
    </Box>
  );
};

export default DetalleFormulario;
