import { ControlForm } from '../control-form';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  InputAdornment,
  IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear'; // Asegúrate de importar el ícono de Clear
import { useExtractedStatus } from '@components/form/use-extracted-status.tsx';

interface Props extends ControlForm {
  labelField?: string;
  valueField?: string;
  items: any[];
  disabled?: boolean;
  hidden?: boolean;
  whenChange?: (event: any) => void;
  disableVariant?: boolean;
  child?: string;
}

const ComboBox = ({
  label,
  whenChange,
  name,
  placeholder,
  readOnly,
  items,
  valueField,
  labelField,
  disabled = false,
  hidden = false,
  disableVariant,
  child,
}: Props) => {
  const { control, watch, setValue } = useFormContext();
  const status = useExtractedStatus(name);
  const isLoading = watch('$isloading');
  const newLabel = labelField ?? 'name';
  const newDataField = valueField ?? 'id';
  const variant = disableVariant ? undefined : 'filled';

  return (
    <>
      <FormControl
        component="fieldset"
        fullWidth
        variant={variant}
        disabled={disabled}
      >
        <InputLabel id={name}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              {isLoading ? (
                <Skeleton variant="rounded" height={51} />
              ) : (
                <>
                  <Select
                    hidden={hidden}
                    {...field}
                    label={label}
                    name={name}
                    id={name}
                    aria-disabled={disabled}
                    value={field?.value ? field.value[newDataField] : ''}
                    onChange={value => {
                      const item = items.find(
                        x => x[newDataField] === value.target.value,
                      );
                      const event = item ? item : undefined;
                      field.onChange(event); // Pasar el valor del campo de datos al hook form
                      if (child) {
                        setValue(child, null); // Limpiar el campo hijo
                      }
                      whenChange ? whenChange(event) : undefined;
                    }}
                    placeholder={placeholder}
                    disabled={readOnly}
                    error={status?.hasError}
                    renderValue={() =>
                      field.value ? field.value[newLabel] : ''
                    }
                    endAdornment={
                      field.value &&
                      field.value[newDataField] && (
                        <InputAdornment
                          position="end"
                          sx={{ marginRight: '10px' }}
                        >
                          <IconButton
                            onClick={() => {
                              field.onChange(null);
                              if (child) {
                                setValue(child, null);
                              }
                            }}
                            edge="end"
                            size="small"
                          >
                            <ClearIcon sx={{ fontSize: '12px' }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  >
                    {items.length === 0 && (
                      <MenuItem value="">Ninguno</MenuItem>
                    )}
                    {items.map(data => {
                      return (
                        <MenuItem
                          key={data[newDataField]}
                          value={data[newDataField]}
                        >
                          {data[newLabel]}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText error={status?.hasError}>
                    {status?.errorMsg}
                  </FormHelperText>
                </>
              )}
            </>
          )}
        />
      </FormControl>
    </>
  );
};

export default ComboBox;
