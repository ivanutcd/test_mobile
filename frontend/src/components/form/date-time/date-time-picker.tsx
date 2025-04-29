import { Controller, useFormContext } from 'react-hook-form';
import { ControlForm } from '../control-form.ts';
import {
  DateOrTimeView,
  DatePickerProps,
  DateTimePicker,
} from '@mui/x-date-pickers';
import { FormControl, Skeleton } from '@mui/material';
import { DateTime } from 'luxon';
import { useExtractedStatus } from '@components/form/use-extracted-status.tsx';
interface Props
  extends ControlForm,
    Omit<DatePickerProps<DateTime>, 'name' | 'label'> {
  viewMode?: 'hours' | 'hh-mm-ss';
}

const DateTimePickerComponent = ({
  label,
  name,
  readOnly,
  viewMode,
}: Props) => {
  const { control, watch } = useFormContext();
  const status = useExtractedStatus(name);
  const isLoading = watch('$isloading');
  const dayHhMmSs: DateOrTimeView[] = [
    'year',
    'month',
    'day',
    'hours',
    'minutes',
    'seconds',
  ];
  const dayHour: DateOrTimeView[] = ['day', 'hours'];
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
                <DateTimePicker
                  {...field}
                  ampm
                  label={label}
                  disabled={readOnly}
                  disableFuture={false}
                  slotProps={{
                    textField: {
                      id: name,
                      name: name,
                      helperText: (status?.hasError
                        ? status.errorMsg
                        : '') as string,
                      error: status?.hasError,
                    },
                  }}
                  onChange={value => {
                    value
                      ? field.onChange((value as DateTime).toJSDate())
                      : field.onChange(null);
                  }}
                  value={field.value ? DateTime.fromJSDate(field.value) : null}
                  views={viewMode === 'hours' ? dayHour : dayHhMmSs}
                />
              )}
            </>
          )}
        />
      </FormControl>
    </>
  );
};

export default DateTimePickerComponent;
