import TextField from '@mui/material/TextField';
import { ControlForm } from '@components/form/control-form';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, Skeleton } from '@mui/material';
import { useExtractedStatus } from '@components/form/use-extracted-status';
import { TextFieldProps } from '@mui/material/TextField/TextField';
interface Props extends ControlForm {}

const Textarea = ({
  label,
  name,
  readOnly,
  hidden,
  variant = 'outlined',
  ...props
}: Props & TextFieldProps) => {
  const { control, watch } = useFormContext();
  const status = useExtractedStatus(name);
  const isLoading = watch('$isloading');

  if (hidden) {
    return <></>;
  }

  return (
    <>
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
                  rows={4}
                  multiline
                  label={label}
                  variant={variant}
                  value={field.value ?? ''}
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
    </>
  );
};

export default Textarea;
