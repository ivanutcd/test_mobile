import { Controller, useFormContext } from 'react-hook-form';
import { ControlForm } from '../control-form.ts';
import { DatePicker, DatePickerProps, DateView } from '@mui/x-date-pickers';
import { FormControl, Skeleton } from '@mui/material';
import { DateTime } from 'luxon';
import { useExtractedStatus } from '@components/form/use-extracted-status.tsx';
interface Props
  extends ControlForm,
    Omit<DatePickerProps<DateTime>, 'name' | 'label'> {
  views?: DateView[];
}

const DatePickerComponent = ({
  label,
  name,
  readOnly,
  views = ['year', 'month', 'day'],
  ...otherProps
}: Props) => {
  const { control, watch } = useFormContext();
  const status = useExtractedStatus(name);
  const isLoading = watch('$isloading');
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
                <DatePicker
                  // view='month'
                  // onError={() => {
                  //   setHasError(true); // Activa el estado de error
                  // }}
                  {...field}
                  {...otherProps}
                  slotProps={{
                    textField: {
                      id: name,
                      name: name,
                      helperText: (status?.hasError
                        ? status.errorMsg
                        : '') as string,
                      error: status?.hasError, //|| hasError,
                    },
                  }}
                  disableFuture={false}
                  label={label}
                  value={field.value ? DateTime.fromJSDate(field.value) : null}
                  onChange={value => {
                    value
                      ? field.onChange((value as DateTime).toJSDate())
                      : field.onChange(null);
                  }}
                  disabled={readOnly}
                  views={views}
                />
              )}
            </>
          )}
        />
      </FormControl>
    </>
  );
};

export default DatePickerComponent;
