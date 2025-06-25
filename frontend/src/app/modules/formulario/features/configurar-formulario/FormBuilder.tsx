import './scss/FormBuilder.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Box, Menu, MenuItem, Drawer } from '@mui/material';
import { BoxContainer } from '@components/ui-layout/box-container';
import FieldSetting from './FieldSetting';
import { useState, useEffect, useMemo } from 'react';
import { FormField } from './formField';
import { FormType } from './FormType';
import { CustomChip, Button } from '@proyectos-enee/enee_componentes';
import { useNotification } from '@components/snackbar/use-notification';
import { useNavigate } from 'react-router-dom';
import {
  guardarComposDinamicosFormulario,
  obtenerEstructuraFormulario,
} from './api';
import Pagina from '../consultar-versiones-formulario/pagina';
import traducciones from '../../common/translations';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from '@common/ui-component/cards/main-card';
import { reservedWords } from 'Utils/validacionesFormulario';
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
  disabled,
}: {
  onFormChange?: (form: FormData) => void;
  formData: FormType;
  disabled?: boolean;
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
  const { error, success } = useNotification();
  const navigate = useNavigate();
  const [touchedFields, setTouchedFields] = useState<Record<string, Partial<Record<keyof FormField, boolean>>>>({});
  // Obtener estructura del formulario desde la API
  useEffect(() => {
    const obtenerEstructura = async () => {
      const response = (await obtenerEstructuraFormulario(formData.id)) as {
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
      label: `campo_${dataForm.formFields.length + 1}`,
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
      imputLabel:`campo_${dataForm.formFields.length + 1}`
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

    if (dataForm.formFields.some(field => field.label === '')) {
      error('No se pueden tener campos con etiquetas vacías');
      return;
    }

    const labelCounts = dataForm.formFields.reduce(
      (counts, field) => {
        counts[field.label] = (counts[field.label] || 0) + 1;
        return counts;
      },
      {} as Record<string, number>,
    );

    for (const label in labelCounts) {
      if (labelCounts[label] > 1) {
        error(`La etiqueta "${label}" se repite en varios campos`);
        return;
      }
    }
    if (dataForm.formFields.some(field => field.label.length > 50)) {
      error('El campo no puede contener más de 50 caracteres');
      return;
    }
    if (
      dataForm.formFields.some(field =>
        /[!@#$%^&*(),.?":{}|<>]/g.test(field.label),
      )
    ) {
      error('El campo no puede contener caracteres especiales');
      return;
    }

    const payload = {
      id: formData.id,
      estructuraFormulario,
    };

    await guardarComposDinamicosFormulario(payload as any).then(() => {
        const hayErrores = dataForm.formFields.some(field => {
    return (
      field.label === '' ||
      dataForm.formFields.filter(f => f.label === field.label).length > 1 ||
      field.label.length > 50 ||
      /[!@#$%^&*(),.?":{}|<>]/g.test(field.label) ||
      !/^[a-z][a-z0-9_]*$/.test(field.label.trim()) ||
      reservedWords.includes(field.label.trim().toLowerCase()) ||
      field.min === undefined || field.min === null || field.min < 0 ||
      field.max === undefined || field.max === null || field.max > 200 ||
      field.min > field.max ||
      field.position === undefined || !Number.isInteger(field.position) || field.position < 1 ||
      field.imputLabel === '' || field.imputLabel.length > 200
    );
  });

  if (hayErrores) {
    error('Corrige los errores del formulario antes de guardar.');
    return;
  }
      success('Formulario guardado correctamente');
      navigate('/formularios');
    });
  };

  // Memoizar campos para renderizar
  const renderedFields = useMemo(() => {
    return dataForm.formFields.map((field, index) => (
      <Box
        className={`card-container ${
          dataForm.formFields.filter(f => f.label === field.label).length > 1 ||
          field.label.length > 50 ||
          /[!@#$%^&*(),.?":{}|<>]/g.test(field.label)
            ? 'error-wrapper'
            : ''
        }`}
        key={index}
      >
        <Box className="card">
          <FieldSetting
            field={field}
            onFieldChange={updatedField => {
              const updatedFields = dataForm.formFields.map(f =>
                f.id === updatedField.id ? updatedField : f,
              );
              const updatedForm = { ...dataForm, formFields: updatedFields };
              setDataForm(updatedForm);
              onFormChange?.(updatedForm);
              const originalField = dataForm.formFields.find(f => f.id === updatedField.id);

              const labelChanged = originalField?.label !== updatedField.label;

               setTouchedFields(prev => ({
                 ...prev,
                [updatedField.id]: {
                ...prev[updatedField.id],
                label: labelChanged ? true : prev[updatedField.id]?.label,
              },
            }));
            }}
          />
          {dataForm.formFields.filter(f => f.label === field.label).length >
            1 &&
            field.label !== '' && (
              <span className="error-message">
                Campo : {field.label} ya existe
              </span>
            )}
          {field.label.length > 30 && (
            <span className="error-message">
              El campo no puede contener más de 30 caracteres
            </span>
          )}

         {touchedFields[field.id]?.label && field.label.trim() !== '' && !(/^[a-z][a-z0-9_]*$/.test(field.label))  && (
            <span className="error-message">
              Debe iniciar con letra. Solo minúsculas, números y _ sin espacios ni tildes.
            </span>
          )}
          {reservedWords.includes(field.label.trim().toLowerCase()) && (
          <span className="error-message">
          No se permiten palabras reservadas (id, type, class, etc.).
          </span>
          )}
          {touchedFields[field.id] && (field.min === undefined || field.min === null) && (
          <span className="error-message">La longitud mínima es obligatoria.</span>
          )}

          { field.min !== undefined && field.min < 0 && (
           <span className="error-message">La longitud mínima no puede ser negativa.</span>
          )}

          { (field.max === undefined || field.max === null) && (
          <span className="error-message">La longitud máxima es obligatoria.</span>
          )}

          {field.max !== undefined && field.max > 200 && (
            <span className="error-message">La longitud máxima no puede superar 200 caracteres.</span>
        )}

        {field.min !== undefined && field.max !== undefined && field.min > field.max && (
  <span className="error-message">La longitud mínima no puede ser mayor que la máxima.</span>
        )}

        { (field.position === undefined || field.position === null) && (
         <span className="error-message">El campo orden es obligatorio.</span>
        )}

        {!Number.isInteger(field.position) && (
          <span className="error-message">El campo orden debe ser un número entero.</span>
        )}

        {field.position !== undefined && field.position < 1 && (
          <span className="error-message">El campo orden debe ser mayor o igual a 1.</span>
        )}
        {field.imputLabel === '' && (
          <span className="error-message">
          El nombre visible del campo es obligatorio.
         </span>
        )}

        {field.imputLabel.length > 200 && (
          <span className="error-message">
           El nombre visible del campo no puede exceder los 200 caracteres.
         </span>
        )}
        </Box>
        <Box className="options">
          {dataForm.formFields.length > 1 && (
            <Tooltip title="Eliminar campo" placement="right">
              <IconButton
                edge="end"
                aria-label="delete"
                size="small"
                color="primary"
                disabled={disabled}
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
              disabled={disabled}
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
  const [versiones] = useState<string[]>(['1.0', '1.1', '1.2']); //sustituir con la feature de obtener versiones
  const [openModalVersiones, setOpenModalVersiones] = useState(false);

  const handleClosePopover = () => {
    setAnchorChip(null);
  };

  const handleSeleccionVersion = (version: string) => {
    console.log('Seleccionaste versión:', version);
    setAnchorChip(null);
  };
  const [formularioSeleccionadoId, setFormularioSeleccionadoId] = useState<
    string | null
  >(null);
  const abrirModalVersiones = (id: string) => {
    setFormularioSeleccionadoId(id);
    setOpenModalVersiones(true);
  };
  const cerrarModalVersiones = () => {
    setOpenModalVersiones(false);
  };
  const open = Boolean(anchorChip);

  return (
    <BoxContainer className="form-builder-container">
      <Box className="form-builder">
        <h1>{dataForm.nombreTecnico}</h1>
        <CustomChip label={dataForm.movilidadAsociada} variant="filled" />

        <Menu
          anchorEl={anchorChip}
          open={open}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'version-chip',
          }}
        >
          {versiones.map((version, index) => (
            <MenuItem
              key={index}
              onClick={() => handleSeleccionVersion(version)}
            >
              Versión {version}
            </MenuItem>
          ))}
        </Menu>

        <div
          style={{
            position: 'absolute',
            bottom: 50,
            right: 10,
            display: 'flex',
            gap: '10px',
          }}
        >
          <Button
            onClick={() => abrirModalVersiones(formData.id)}
            variant="contained"
            color="inherit"
          >
            Ver Versiones
          </Button>
          <Button
            onClick={guardarComposDinamicos}
            variant="contained"
            color="primary"
            disabled={disabled}
          >
            Guardar formulario
          </Button>
        </div>
      </Box>
      {renderedFields}
      <Drawer
        anchor="right"
        open={openModalVersiones}
        onClose={cerrarModalVersiones}
        PaperProps={{ sx: { width: 550 } }}
        slotProps={{
          backdrop: {
            sx: {
              background: 'rgba(2, 106, 191, 0.037)',
              backdropFilter: 'blur(3px)',
            },
          },
        }}
      >
        <Box p={0}>
          <MainCard
            title={traducciones.REGISTROVERSIONES}
            secondary={
              <IconButton onClick={cerrarModalVersiones}>
                <CloseIcon />
              </IconButton>
            }
          >
            {formularioSeleccionadoId && (
              <Pagina id={formularioSeleccionadoId} />
            )}
          </MainCard>
        </Box>
      </Drawer>
    </BoxContainer>
  );
}
