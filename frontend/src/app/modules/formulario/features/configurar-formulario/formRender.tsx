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
import './scss/form-render.scss';
import { Button } from '@proyectos-enee/enee_componentes';
// import  {Button}  from '@components/button/button';
import {
  HookForm,
  InputText,
  InputNumber,
  DatePicker,
  Textarea,
} from '@components/form';
// import { FileUpload } from '@mui/icons-material';

// import { FileUpload } from '@proyectos-enee/enee_componentes';
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
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  options?: string[];
  rows?: number;
}
const nameForm = 'FormularioRender';
const formValues = {};
const validations = {};
const guardar = (values: any) => {
  console.log(values);
};

export default function FormRender({ formData }: { formData: any }) {
  return (
    <div className="form-render">
      <div className="form-header">
        <h2 className="form-name">{formData.formName}</h2>
        <p className="form-description" style={{ color: 'black' }}>
          {formData.formDescription}
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
              {formData.formFields.map((field: FormField) => {
                const renderField = {
                  text: (
                    // <TextField
                    //   key={field.id}
                    //   label={field.label}
                    //   required={field.required}
                    //   placeholder={field.placeholder}
                    //   defaultValue={field.defaultValue}
                    // />
                    <InputText
                      name={field.id}
                      label={field.label}
                      required={field.required}
                      placeholder={field.placeholder}
                      defaultValue={field.defaultValue}
                    />
                  ),
                  textarea: (
                    <Textarea
                      id={field.id}
                      name={field.id}
                      label={field.label}
                      required={field.required}
                      placeholder={field.placeholder}
                      defaultValue={field.defaultValue}
                      style={{ borderRadius: '10px' }}
                      rows={field.rows}
                    />
                  ),
                  number: (
                    <InputNumber
                      name={field.id}
                      label={field.label}
                      type="number"
                      required={field.required}
                      placeholder={field.placeholder}
                      defaultValue={field.defaultValue}
                    />
                  ),
                  select: (
                    <FormControl fullWidth>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        value={field.value}
                        label={field.label}
                        onChange={event => {
                          field.value = event.target.value;
                          console.log(field.value);
                        }}
                      >
                        {field.options?.map((option: string, index: number) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ),
                  checkbox: (
                    <FormControl>
                      <FormLabel component="legend">{field.label}</FormLabel>
                      <FormGroup>
                        {field.options?.map((option: string) => (
                          <FormControlLabel
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
                        ))}
                      </FormGroup>
                    </FormControl>
                  ),
                  radio: (
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        {field.label}
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        {field.options?.map((option: string, index: number) => (
                          <FormControlLabel
                            key={index}
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  ),
                  date: (
                    <DatePicker
                      key={field.id}
                      label={field.label}
                      name={field.id}
                    />
                  ),
                  file: (
                    // <FileUpload
                    //   key={field.id}
                    //   label={field.label}
                    //   multiple={true}
                    //   onChange={() => {
                    //     console.log(field.value);
                    //   }}
                    // />
           
                      <Button variant="contained" color="primary">
                      
                        {field.label}
                      </Button>
        
                  ),
                  image: (
                    // <FileUpload
                    //   key={field.id}
                    //   type="image"
                    //   multiple={true}
                    //   label={field.label}
                    //   onChange={() => {
                    //     console.log(field.value);
                    //   }}
                    // />
                    <Button variant="contained" color="primary">
                      {field.label}
                    </Button>
                  ),
                };

                return renderField[field.type] || null;
              })}

              <div className="form-render-footer">
                <Button form={nameForm} type="reset" variant="text">
                  Cancelar
                </Button>
                <Button form={nameForm} size="large" fullWidth type="submit">
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
