import './scss/FormBuilder.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Box, Popover } from '@mui/material';
import { BoxContainer } from '@components/ui-layout/box-container';
import FieldSetting from './FieldSetting';
import { useState, useEffect, useMemo } from 'react';
import { FormField } from './formField';
import { FormType } from './FormType';
import { CustomChip, Button } from '@proyectos-enee/enee_componentes';
import {
  guardarComposDinamicosFormulario,
  obtenerEstructuraFormulario,
} from './api';
import { IconArrowBadgeDown } from '@tabler/icons-react';

interface FormData {
  nombreTecnico: string;
  unidad: string;
  descripcion: string;
  formFields: FormField[];
  estado: string;
  movilidadAsociada: string;
  versionFormulario: string;
}

export default function FormBuilder({
  onFormChange,
  formData,
}: {
  onFormChange?: (form: FormData) => void;
  formData: FormType;
}) {
  const [dataForm, setDataForm] = useState<FormData>({
    nombreTecnico: formData.nombreTecnico,
    descripcion: formData.descripcion,
    formFields: formData.formFields || [],
    estado: formData.estado,
    versionFormulario: formData.versionFormulario,
    movilidadAsociada: formData.movilidadAsociada,
    unidad: formData.unidad,
  });

  // Obtener estructura del formulario desde la API
  useEffect(() => {
    const obtenerEstructura = async () => {
      const response = await obtenerEstructuraFormulario(formData.id) as {
        objeto: FormData;
      };

      const updatedForm = {
        ...formData,
        formFields: response.objeto.formFields,
      } as FormData;

      setDataForm(updatedForm);
      onFormChange?.(updatedForm);
    };

    obtenerEstructura();
  }, [formData.id, onFormChange]);

  // Agregar un nuevo campo
  const addField = (position: number) => {
    const newField: FormField = {
      id: String(dataForm.formFields.length + 1),
      label: `Campo ${dataForm.formFields.length + 1}`,
      type: 'text',
      required: true,
      options: [],
      placeholder: `Ingrese el campo ${dataForm.formFields.length + 1}`,
      defaultValue: '',
      position: position + 1,
      min: 0,
      max: 100,
      step: 0,
      minDate: '',
      maxDate: '',
    };

    const updatedFields = [...dataForm.formFields];
    updatedFields.splice(position, 0, newField);
    const resequencedFields = updatedFields.map((field, index) => ({
      ...field,
      id: String(index + 1),
      position: index + 1,
    }));

    const updatedForm = { ...dataForm, formFields: resequencedFields };
    setDataForm(updatedForm);
    onFormChange?.(updatedForm);
  };

  // Eliminar un campo
  const deleteField = (id: string) => {
    const updatedFields = dataForm.formFields.filter(field => field.id !== id);
    const resequencedFields = updatedFields.map((field, index) => ({
      ...field,
      id: String(index + 1),
      position: index + 1,
    }));

    const updatedForm = { ...dataForm, formFields: resequencedFields };
    setDataForm(updatedForm);
    onFormChange?.(updatedForm);
  };

  // Guardar formulario
  const guardarComposDinamicos = async () => {
    const estructuraFormulario = JSON.stringify({
      formFields: dataForm.formFields,
      nombreTecnico: dataForm.nombreTecnico,
      descripcion: dataForm.descripcion,
      movilidadAsociada: dataForm.movilidadAsociada,
      unidad: dataForm.unidad,
    });

    const payload = {
      id: formData.id,
      estructuraFormulario,
    };

    await guardarComposDinamicosFormulario(payload as any);
  };

  // Memoizar campos para renderizar
  const renderedFields = useMemo(() => {
    return dataForm.formFields.map((field, index) => (
      <Box className="card-container" key={index}>
        <Box className="card">
          <FieldSetting
            field={field}
            onFieldChange={updatedField => {
              const updatedFields = dataForm.formFields.map(f =>
                f.id === updatedField.id ? updatedField : f
              );
              const updatedForm = { ...dataForm, formFields: updatedFields };
              setDataForm(updatedForm);
              onFormChange?.(updatedForm);
            }}
          />
        </Box>
        <Box className="options">
          {dataForm.formFields.length > 1 && (
            <Tooltip title="Eliminar campo" placement="right">
              <IconButton
                edge="end"
                aria-label="delete"
                size="small"
                color="primary"
                onClick={() => deleteField(field.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Agregar campo" placement="right">
            <IconButton
              className="icon-animated"
              edge="end"
              aria-label="add"
              size="small"
              color="primary"
              onClick={() => addField(field.position)}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    ));
  }, [dataForm.formFields, onFormChange]);

  // Agrega un campo inicial si no hay ninguno (solo una vez)
  useEffect(() => {
    if (dataForm.formFields.length === 0) {
      addField(0);
    }
    // Solo al montar y si está vacío
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [anchorChip, setAnchorChip] = useState<null | HTMLElement>(null);
  // eslint-disable-next-line
  const [versiones, setVersiones] = useState<string[]>(['1.0', '1.1', '1.2']); //sustituir con la feature de obtener versiones

  const handleChipClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorChip(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorChip(null);
  };

  const handleSeleccionVersion = (version: string) => {
    console.log('Seleccionaste versión:', version);
    setAnchorChip(null);
  };

  const open = Boolean(anchorChip);

  return (
    <BoxContainer className="form-builder-container">
      <Box className="form-builder">
        <h1>{dataForm.nombreTecnico}</h1>
        // eslint-disable-next-line
        <CustomChip label={dataForm.movilidadAsociada} variant="filled" />
        <CustomChip
          label={`${dataForm.estado}  Versión:  ${dataForm.versionFormulario} `}
          style={{ position: 'absolute', top: 10, right: 10 }}
          variant="outlined"
          color={dataForm.estado === 'Activo' ? 'success' : 'default'}
          onClick={handleChipClick}
          icon={<IconArrowBadgeDown />}
          clickable
        />

        <Popover
          open={open}
          anchorEl={anchorChip}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: { padding: '0.5rem', minWidth: 150 }}
          }}
        >
          <Box>
            {versiones.map((v, i) => (
              <Box
                key={i}
                onClick={() => handleSeleccionVersion(v)}
                sx={{
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                Versión {v}
              </Box>
            ))}
          </Box>
        </Popover>
        <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
          <Button
            onClick={guardarComposDinamicos}
            variant="contained"
            color="primary"
          >
            Guardar formulario
          </Button>
        </div>
      </Box>
      {renderedFields}
    </BoxContainer>
  );
}
