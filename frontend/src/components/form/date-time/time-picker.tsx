import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FormControl } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { ControlForm } from '../control-form';
import { useExtractedStatus } from '@components/form/use-extracted-status.tsx';
import { DateTime } from 'luxon';

interface TimePickerProps extends ControlForm {}

const TimePickerComponent = ({ label, name, readOnly }: TimePickerProps) => {
  const { control } = useFormContext();
  const status = useExtractedStatus(name);

  return (
    <FormControl component="fieldset" fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TimePicker
            readOnly={readOnly}
            label={label}
            {...field}
            slotProps={{
              textField: {
                id: name,
                helperText: status?.hasError ? status.errorMsg : '',
                error: status?.hasError,
                style: { color: 'white' },
              },
            }}
            value={
              field.value ? DateTime.fromFormat(field.value, 'HH:mm') : null
            }
            onChange={value => {
              console.log(value, 'TIME PICKER');
              if (value instanceof DateTime) {
                field.onChange(value.toFormat('HH:mm'));
              } else {
                field.onChange(null);
              }
            }}
          />
        )}
      />
    </FormControl>
  );
};
export default TimePickerComponent;
