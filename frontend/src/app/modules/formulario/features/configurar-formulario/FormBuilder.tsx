import './scss/FormBuilder.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { BoxContainer } from '@components/ui-layout/box-container';
import FieldSetting from './FieldSetting';
import { useState, useMemo, useEffect } from 'react';
import { FormField, } from './formField';
import { FormType } from './FormType';
import { CustomChip } from '@proyectos-enee/enee_componentes';

interface FormData {
  formName: string;
  formDescription: string;
  formFields: FormField[];
  estado: string;
  movilidadAsociada: string;
  versionFormulario: string;
}

export default function FormBuilder({
  onFormChange,
  formData
}: {
  onFormChange?: (form: FormData) => void;
  formData: FormType;
}) {

  if (formData.formFields === undefined) {

    formData.formFields = [
      {
        id: '1',
        label: 'Campo 1',
        type: 'text',
        required: true,
        options: [],
        placeholder: 'Ingrese el campo 1',
        defaultValue: '',
        position: 1,
      },
    ];
  }
  console.warn(formData);

  const [dataForm, setDataForm] = useState<FormData>({
    formName: formData.nombreTecnico,
    formDescription: formData.descripcion,
    formFields: formData.formFields || [],
    estado: formData.estado,
    versionFormulario: formData.versionFormulario,
    movilidadAsociada: formData.movilidadAsociada,
  });

  useEffect(() => {
    if (typeof onFormChange === 'function') {
      onFormChange(dataForm);
    }
  }, [dataForm, onFormChange]);

  const addField = useMemo(
    () => (position: number) => {
      const newDataForm = { ...dataForm };
      const newField: FormField = {
        id: String(dataForm.formFields.length + 1),
        label: 'Campo ' + (dataForm.formFields.length + 1),
        type: 'text',
        required: true,
        options: [],
        placeholder: 'Ingrese el campo ' + (dataForm.formFields.length + 1),
        defaultValue: '',
        position: dataForm.formFields.length + 1,
      };
      newDataForm.formFields.splice(position, 0, newField);
      newDataForm.formFields = newDataForm.formFields.map((field, index) => ({
        ...field,
        id: String(index + 1),
        position: index + 1,
      }));
      setDataForm(newDataForm);
    },
    [dataForm, setDataForm],
  );

  const deleteField = useMemo(
    () => (id: string) => {
      const newDataForm = { ...dataForm };
      newDataForm.formFields = newDataForm.formFields.filter(
        field => field.id !== id,
      );
      setDataForm(newDataForm);
    },
    [dataForm, setDataForm],
  );

  return (

    <BoxContainer className="form-builder-container">
      <div className="form-builder">
        <h1>{dataForm.formName}</h1>
        <p>{dataForm.formDescription}</p>
        <CustomChip label={dataForm.movilidadAsociada}  variant="filled"  />
        <CustomChip label={`${dataForm.estado}  Versión:  ${dataForm.versionFormulario}`} style={{ position: 'absolute', top: 10, right: 10 }} variant="outlined" color={dataForm.estado === 'Activo' ? 'success' : 'error'} />

      </div>
      {dataForm.formFields.map(field => (
        <div className="card-container">
          <div className="card">
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
          </div>
          <div className="options">
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
                aria-label="delete"
                size="small"
                color="primary"
                onClick={() => addField(field.position)}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ))}
    </BoxContainer>
  );
}
