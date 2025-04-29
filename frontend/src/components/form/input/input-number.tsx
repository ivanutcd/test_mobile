import TextField from '@mui/material/TextField';
import { ControlForm } from '../control-form.ts';
import { FormControl, InputAdornment, Skeleton } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useExtractedStatus } from '@components/form/use-extracted-status.tsx';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface Props extends ControlForm {
  thousandSeparator?: boolean;
  suffix?: string;
  decimals?: number;
}
// Custom Numeric Format Component
const NumericFormatCustom = React.forwardRef<NumericFormatProps, any>(
  function NumericFormatCustom(props, ref) {
    const { onChange, decimals, thousandSeparator, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value, // Este es el valor sin formato (sin comas)
            },
          });
        }}
        thousandSeparator={thousandSeparator || false} // Aplica el separador de miles si se proporciona
        decimalScale={decimals}
        allowNegative={false}
      />
    );
  },
);
const InputNumber = ({
  label,
  name,
  readOnly,
  hidden,
  prefix,
  suffix,
  thousandSeparator = false,
  decimals = 2,
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
                  id={name}
                  type="text"
                  label={label}
                  variant="outlined"
                  disabled={readOnly}
                  value={field.value ?? ''}
                  aria-readonly={readOnly}
                  fullWidth
                  helperText={status?.hasError ? status.errorMsg : undefined}
                  error={status?.hasError}
                  color={status?.status}
                  prefix={prefix}
                  InputProps={{
                    startAdornment: prefix ? (
                      <InputAdornment position="start">{prefix}</InputAdornment>
                    ) : null,
                    endAdornment: suffix ? (
                      <InputAdornment position="end">{suffix}</InputAdornment>
                    ) : null,
                    inputComponent: NumericFormatCustom as any,
                  }}
                  inputProps={{
                    decimals: decimals,
                    thousandSeparator: thousandSeparator,
                  }}
                  onChange={e => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            </>
          )}
        />
      </FormControl>
    </>
  );
};

export default InputNumber;
