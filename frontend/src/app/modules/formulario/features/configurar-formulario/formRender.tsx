import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './scss/form-render.scss';
import { Button } from '@proyectos-enee/enee_componentes';
import {
  HookForm,
  InputText,
  InputNumber,
  Textarea,
} from '@proyectos-enee/enee_componentes';

import { FileUpload } from '@proyectos-enee/enee_componentes';
import { useCatalogoItems } from '../../hooks/useCatalogoItems';
type FieldType =
  | 'text'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'file'
  | 'image';

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
  min?: number;
  max?: number;
  position?: number;
}
const nameForm = 'FormularioRender';
const formValues = {};
const validations = {};
const guardar = (values: any) => {
  console.log(values);
};

export default function FormRender({ formData }: { formData: any }) {
  interface FormFieldConCatalogo extends FormField {
    catalogoKey?: string;
  }
  const catalogoKeys = formData.formFields
    .filter((f: FormFieldConCatalogo) => f.catalogoKey)
    .map((f: FormFieldConCatalogo) => f.catalogoKey!);

  const { data: catalogoItems } = useCatalogoItems(...catalogoKeys || formData.formFields);
  console.log('Catalogo Items:', catalogoItems);

  return (
    <div className="form-render">
      <div className="form-header">
        <h2 className="form-name">{formData.nombreTecnico}</h2>
        <p className="form-description" style={{ color: 'black' }}>
          {formData.descripcion}
        </p>
      </div>

      <HookForm
        initialValues={formValues}
        nameForm={nameForm}
        onSubmit={guardar}
        validations={validations}
      >
        {() => {
          return (
            <div className="form-render-container">
              {formData.formFields.sort((a: FormField, b: FormField) => (a.position ?? 0) - (b.position ?? 0))

                .map((field: FormField | any) => {
                  const renderField = {
                    text: (
                      <InputText
                        key={field.id}
                        name={field.id}
                        label={field.imputLabel}
                        required={field.required}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                        inputProps={{
                          maxLength: field.max,
                          minLength: field.min
                        }}
                      />
                    ),
                    textarea: (
                      <Textarea
                        key={field.id}
                        id={field.id}
                        name={field.id}
                        label={field.imputLabel}
                        required={field.required}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                        style={{ borderRadius: '10px' }}
                        rows={field.rows}
                        inputProps={{
                          maxLength: field.max,
                          minLength: field.min
                        }}
                      />
                    ),
                    number: (
                      <InputNumber
                        key={field.id}
                        name={field.id}
                        label={field.imputLabel}
                        type="number"
                        required={field.required}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          let raw = target.value.replace(/\D/g, "");
                          if (raw.length > field.max) {
                            raw = raw.slice(0, field.max);
                          }
                          target.value = raw;
                        }}
                        inputProps={{
                          min: field.min,
                          max: field.max
                        }}
                      />

                    ),
                    select: (

                      <FormControl fullWidth key={field.id}>
                        <InputLabel>{field.imputLabel}</InputLabel>
                        <Select
                          value={field.value || ''}
                          label={field.imputLabel}
                          onChange={(event) => {
                            field.value = event.target.value; 
                          }
                          }
                        >
                          {field.catalogoKey && catalogoItems[field.catalogoKey]
                            ? catalogoItems[field.catalogoKey].map(option => (
                              <MenuItem key={option.id} value={option.id}>
                                {option?.nombre}
                              </MenuItem>
                            ))
                            : (field.options || []).map((option: string, optionIndex: number) => (
                              <MenuItem key={option + optionIndex} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    ),
                    checkbox: (
                      <FormControl key={field.id}>
                        <FormLabel component="legend">{field.imputLabel}</FormLabel>
                        <FormGroup>
                          {field.options?.map(
                            (option: string, optionIndex: number) => (
                              <FormControlLabel
                                key={option + optionIndex}
                                control={
                                  <Checkbox
                                    onChange={() => {
                                      console.log(option);
                                    }}
                                    name={option}
                                  />
                                }
                                label={option}
                              />
                            ),
                          )}
                        </FormGroup>
                      </FormControl>
                    ),
                    radio: (
                      <FormControl key={field.id}>
                        <FormLabel id="demo-radio-buttons-group-label">
                          {field.imputLabel}
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          {field.options?.map(
                            (option: string, optionIndex: number) => (
                              <FormControlLabel
                                key={option + optionIndex}
                                value={option}
                                control={<Radio />}
                                label={option}
                              />
                            ),
                          )}
                        </RadioGroup>
                      </FormControl>
                    ),
                    date: (
                      <DatePicker
                        key={field.id}
                        label={field.imputLabel}
                        value={field.value}
                        onChange={() => {
                          console.log(field.value);
                        }}
                      />
                    ),
                    file: (
                      <FileUpload
                        key={field.id}
                        label={field.imputLabel}
                        multiple={true}
                        onChange={() => {
                          console.log(field.value);
                        }}
                      />
                    ),
                    image: (
                      <FileUpload
                        key={field.id}
                        type="image"
                        multiple={true}
                        label={field.imputLabel}
                        onChange={() => {
                          console.log(field.value);
                        }}
                      />
                    ),
                  };

                  return (
                    renderField[field.type as keyof typeof renderField] || null
                  );
                })}

              <div className="form-render-footer">
                <Button
                  form={nameForm}
                  type="reset"
                  variant="contained"
                  color="inherit"
                >
                  Cancelar
                </Button>
                <Button form={nameForm} fullWidth type="submit">
                  Guardar
                </Button>
              </div>
            </div>
          );
        }}
      </HookForm>
    </div>
  );
}
