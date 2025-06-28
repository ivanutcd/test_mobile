import { FormField, FormFieldType } from './formField';
import TextField from '@mui/material/TextField';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import NumbersIcon from '@mui/icons-material/Numbers';
import WrapTextIcon from '@mui/icons-material/WrapText';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Col } from '@components/ui-layout/col.tsx';
import { GridContainer } from '@components/ui-layout/grid-container.tsx';
import './scss/FieldSetting.scss';
import { useCatalogosTodos } from '../../hooks/useCatalogosTodos';
import { useMemo, useState } from 'react';
import {
  SelectChangeEvent,
  InputLabel,
  Select,
  FormControl,
} from '@mui/material';

export default function FieldSetting({
  field,
  onFieldChange,
}: {
  field: FormField;
  onFieldChange: (field: FormField) => void;
}) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [fieldType, setFieldType] = useState<FormFieldType>(field.type);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleSelect = (value: string) => {
    setFieldType(value as FormFieldType);
    onFieldChange({ ...field, type: value as FormFieldType });

    setAnchorEl(null);
    setOpen(false);
  };

  const icon = useMemo(() => {
    const iconMap = {
      text: (
        <div className="icon-container">
          <FormatColorTextIcon /> <span>Texto</span>
        </div>
      ),
      number: (
        <div className="icon-container">
          <NumbersIcon /> <span>Número</span>
        </div>
      ),
      textarea: (
        <div className="icon-container">
          <WrapTextIcon /> <span>Texto</span>
        </div>
      ),
      select: (
        <div className="icon-container">
          <ArrowDropDownCircleOutlinedIcon /> <span>Seleccionar</span>
        </div>
      ),
      checkbox: (
        <div className="icon-container">
          <CheckBoxOutlinedIcon /> <span>Checkbox</span>
        </div>
      ),
      radio: (
        <div className="icon-container">
          <RadioButtonCheckedOutlinedIcon /> <span>Radio</span>
        </div>
      ),
      date: (
        <div className="icon-container">
          <CalendarMonthOutlinedIcon /> <span>Fecha</span>
        </div>
      ),
      file: (
        <div className="icon-container">
          <FileUploadOutlinedIcon /> <span>Archivo</span>
        </div>
      ),
      image: (
        <div className="icon-container">
          <InsertPhotoOutlinedIcon /> <span>Imagen</span>
        </div>
      ),
    };
    return iconMap[fieldType as keyof typeof iconMap];
  }, [fieldType]);

  const handleRemoveOption = (index: number) => {
    onFieldChange({
      ...field,
      options: field.options?.filter((_, i) => i !== index),
    });
  };
  const { data: catalogosDisponibles } = useCatalogosTodos();

  const handleCatalogoSeleccionado = (event: SelectChangeEvent<string>) => {
    const nuevoCatalogo = event.target.value;
    onFieldChange({
      ...field,
      catalogoKey: nuevoCatalogo,
      options: undefined, // Limpiamos options para evitar conflicto
    });
  };
  return (
    <div className="field-setting">
      <GridContainer>
        <Col xs={4} md={4}>
          <Tooltip
            title={`Nombre técnico: ${field.nombreTecnico}`}
            placement="top"
          >
            <TextField
              placeholder={field.inputLabel}
              fullWidth
              label={field.inputLabel || 'Nombre del campo en formulario'}
              onChange={e =>
                onFieldChange({
                  ...field,
                  inputLabel: e.target.value,
                  nombreTecnico: e.target.value
                    .toLowerCase()
                    .replace(/\s/g, '_'),
                })
              }
            />
          </Tooltip>
        </Col>

        <Col xs={2} md={2}>
          <Tooltip title="Aquí puedes cambiar el tipo de campo" placement="top">
            <Button
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              variant="outlined"
              style={{
                height: '50px',
                width: '100%',
              }}
            >
              {fieldType != null ? icon : 'Seleccionar tipo de campo'}
            </Button>
          </Tooltip>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => handleSelect('text')} value="text">
              <FormatColorTextIcon />
              Texto
            </MenuItem>
            <MenuItem onClick={() => handleSelect('number')} value="number">
              <NumbersIcon />
              Number
            </MenuItem>
            <MenuItem onClick={() => handleSelect('textarea')} value="textarea">
              <WrapTextIcon />
              Textarea
            </MenuItem>
            <MenuItem onClick={() => handleSelect('select')} value="select">
              <ArrowDropDownCircleOutlinedIcon />
              Select
            </MenuItem>
            <MenuItem onClick={() => handleSelect('checkbox')} value="checkbox">
              <CheckBoxOutlinedIcon />
              Checkbox
            </MenuItem>
            <MenuItem onClick={() => handleSelect('radio')} value="radio">
              <RadioButtonCheckedOutlinedIcon />
              Radio
            </MenuItem>
            <MenuItem onClick={() => handleSelect('date')} value="date">
              <CalendarMonthOutlinedIcon />
              Date
            </MenuItem>
            <MenuItem onClick={() => handleSelect('image')} value="image">
              <InsertPhotoOutlinedIcon />
              Imagen
            </MenuItem>

            <MenuItem onClick={() => handleSelect('file')} value="file">
              <FileUploadOutlinedIcon />
              Archivo
            </MenuItem>
          </Menu>
        </Col>
        <Col xs={2} md={2}>
          <Tooltip title="Marca si este campo es obligatorio" placement="top">
            <div className="switch-container">
              <Switch
                checked={field.required}
                onChange={e =>
                  onFieldChange({ ...field, required: e.target.checked })
                }
              />
              Obligatorio
            </div>
          </Tooltip>
        </Col>
        <Col xs={3} md={1.5}>
          <Tooltip title="Longitud mínima (caracteres)" placement="top">
            <TextField
              placeholder="Longitud mínima"
              type="number"
              value={field.min ?? ''}
              required
              inputProps={{ min: 0, step: 1 }}
              onChange={e =>
                onFieldChange({ ...field, min: Number(e.target.value) || 0 })
              }
              variant="outlined"
              fullWidth
            />
          </Tooltip>
        </Col>

        <Col xs={3} md={1.5}>
          <Tooltip title="Longitud máxima (caracteres)" placement="top">
            <TextField
              placeholder="Longitud máxima"
              type="number"
              value={field.max ?? ''}
              required
              inputProps={{ min: 1, step: 1 }}
              onChange={e =>
                onFieldChange({ ...field, max: Number(e.target.value) || 1 })
              }
              variant="outlined"
              fullWidth
            />
          </Tooltip>
        </Col>

        <Col xs={4} md={4}>
          {(field.type === 'select' ||
            field.type === 'checkbox' ||
            field.type === 'radio') && (
            <div className="">
              {(field.options || []).length > 0
                ? (field.options || []).map((option, index) => (
                    <div key={index} className="option-container">
                      <TextField
                        fullWidth
                        size="small"
                        value={option}
                        onChange={e => {
                          const newOptions = [...(field.options || [])];
                          newOptions[index] = e.target.value;
                          onFieldChange({ ...field, options: newOptions });
                        }}
                      />

                      <Tooltip title="Eliminar campo" placement="right">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          size="small"
                          color="primary"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ))
                : ''}
              <FormControl fullWidth style={{ width: '100%' }}>
                <InputLabel>Catálogo</InputLabel>
                <Select
                  value={field.catalogoKey || ''}
                  label="Catálogo"
                  placeholder="Catálogo"
                  onChange={handleCatalogoSeleccionado}
                >
                  {Object.keys(catalogosDisponibles).map(catalogoId => (
                    <MenuItem key={catalogoId} value={catalogoId}>
                      {catalogosDisponibles[catalogoId][0]?.nombre ||
                        catalogoId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
        </Col>
      </GridContainer>
    </div>
  );
}
