import './scss/FormBuilder.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Box } from '@mui/material';
import { BoxContainer } from '@components/ui-layout/box-container';
import FieldSetting from './FieldSetting';
import { useState, useEffect } from 'react';
import { FormField } from './formField';
import { FormType } from './FormType';
import { CustomChip, Button } from '@proyectos-enee/enee_componentes';
import {
  guardarComposDinamicosFormulario,
  obtenerEstructuraFormulario,
} from './api';

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

  useEffect(() => {
    const obtenerEstructura = async () => {
      const response = (await obtenerEstructuraFormulario(formData.id)) as {
        objeto: FormData;
      };

      formData.formFields = response.objeto.formFields;
      setDataForm(formData as FormData);
      if (onFormChange) {
        onFormChange(formData as FormData);
      }
    };
    obtenerEstructura();
  }, [onFormChange, formData.id]);

  const guardarComposDinamicos = async () => {
    const formulario = {
      formFields: dataForm.formFields,
      nombreTecnico: dataForm.nombreTecnico,
      descripcion: dataForm.descripcion,
      movilidadAsociada: dataForm.movilidadAsociada,
      unidad: dataForm.unidad,
    };

    const payload = {
      id: formData.id,
      estructuraFormulario: JSON.stringify(formulario),
    };
    await guardarComposDinamicosFormulario(payload as any);
  };

  const addField = (position: number) => {
    const newDataForm = { ...dataForm };
    const newField: FormField = {
      id: String(dataForm.formFields.length + 1),
      label: `Campo ${dataForm.formFields.length + 1}`,
      type: 'text',
      required: true,
      options: [],
      placeholder: `Ingrese el campo ${dataForm.formFields.length + 1}`,
      defaultValue: '',
      position: dataForm.formFields.length + 1,
      min: 0,
      max: 100,
      step: 0,
      minDate: '',
      maxDate: '',
    };
    newDataForm.formFields.splice(position, 0, newField);
    newDataForm.formFields = newDataForm.formFields.map((field, index) => ({
      ...field,
      id: String(index + 1),
      position: index + 1,
    }));
    setDataForm(newDataForm);
    if (onFormChange) {
      onFormChange(newDataForm as FormData);
    }
  };

  const deleteField = (id: string) => {
    const newDataForm = { ...dataForm };
    newDataForm.formFields = newDataForm.formFields.filter(
      field => field.id !== id,
    );
    setDataForm(newDataForm);
    if (onFormChange) {
      onFormChange(newDataForm as FormData);
    }
  };

  return (
    <BoxContainer className="form-builder-container">
      <Box className="form-builder">
        <h1>{dataForm.nombreTecnico}</h1>
        <p>{dataForm.descripcion}</p>
        <CustomChip label={dataForm.movilidadAsociada} variant="filled" />
        <CustomChip
          label={`${dataForm.estado}  Versión:  ${dataForm.versionFormulario}`}
          style={{ position: 'absolute', top: 10, right: 10 }}
          variant="outlined"
          color={dataForm.estado === 'Activo' ? 'success' : 'default'}
        />
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
      {dataForm.formFields.map((field, index) => (
        <Box className="card-container" key={index}>
          <Box className="card">
            <FieldSetting
              field={field}
              onFieldChange={field => {
                const newDataForm = { ...dataForm };
                newDataForm.formFields = newDataForm.formFields.map(f =>
                  f.id === field.id ? field : f,
                );
                setDataForm(newDataForm);
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
      ))}
    </BoxContainer>
  );
}
