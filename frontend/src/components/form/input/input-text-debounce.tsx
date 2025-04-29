import TextField from '@mui/material/TextField';
import { ControlForm } from '../control-form.ts';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, Skeleton } from '@mui/material';
import { useExtractedStatus } from '@components/form/use-extracted-status.tsx';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { useRef } from 'react';

interface Props extends ControlForm {}
type DebounceProps = {
  handleDebounce?: (value: string) => Promise<void>;
  debounceTimeout?: number;
};

const InputTextDebounce = ({
  label,
  name,
  readOnly,
  hidden,
  variant = 'outlined',
  handleDebounce,
  debounceTimeout = 500,
  ...props
}: Props & TextFieldProps & DebounceProps) => {
  const { control, getValues, watch } = useFormContext();
  const status = useExtractedStatus(name);
  const isLoading = watch('$isloading');

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (handleDebounce) {
        const value = getValues(name);
        handleDebounce(value);
      }
    }, debounceTimeout);
  };

  if (hidden) {
    return null;
  }

  return (
    <FormControl component="fieldset" fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {isLoading ? (
              <Skeleton variant="rounded" height={51} />
            ) : (
              <TextField
                {...field}
                {...props}
                type="text"
                id={name}
                label={label}
                variant={variant}
                value={field.value ?? ''}
                onChange={e => {
                  field.onChange(e.target.value);
                  handleChange();
                }}
                disabled={readOnly}
                aria-readonly={readOnly}
                fullWidth
                helperText={status?.hasError ? status.errorMsg : undefined}
                error={status?.hasError}
                color={status?.status}
              />
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default InputTextDebounce;
