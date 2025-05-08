import './scss/FormBuilder.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material'; 

import FieldSetting from './FieldSetting';
import { useState, useMemo, useEffect } from 'react';
import { FormField, FormFieldType } from './formField';

interface FormData {
  formName: string;
  formDescription: string;
  formFields: FormField[];
}

export default function FormBuilder({onFormChange }: { onFormChange?: (form: FormData) => void }) {
  const [dataForm, setDataForm] = useState<FormData>({
    formName: 'Formulario de prueba',
    formDescription: 'Este es un formulario de prueba',
    formFields: [
      {
        id: '1',
        label: '',
        type: 'text' as FormFieldType,
        required: true,
        options: [],
        placeholder: 'Ingrese el campo 1',
        defaultValue: '',
        position: 1,
      },
    ],
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
    <div className="form-builder-container">
      <div className="form-builder">
        <h1>{dataForm.formName}</h1>
        <p>{dataForm.formDescription}</p>
   
      </div>
      {dataForm.formFields.map(field => (
        <div className="card-container">
          <div className="card">
            <FieldSetting field={field} onFieldChange={(field) => {
              const newDataForm = { ...dataForm };
              newDataForm.formFields = newDataForm.formFields.map(f => f.id === field.id ? field : f);
              setDataForm(newDataForm);
            }} />
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
    </div>
  );
}
