import { Controller, useFormContext } from 'react-hook-form';
import {
  Autocomplete,
  FormControl,
  TextField,
  TextFieldProps,
} from '@mui/material';

import { ControlForm } from '../control-form';
import { useExtractedStatus } from '../use-extracted-status';

interface Props extends ControlForm, Omit<TextFieldProps, 'name' | 'label'> {
  options: any[];
  label: string;
  getOptionLabel: (option: any) => string;
  renderOption?: (option: any) => React.ReactNode;
  defaultValue?: any;
  name: string;
  readOnly?: boolean;
}

const AutoComplete = ({
  options = [],
  label,
  getOptionLabel,
  defaultValue,
  name,
  renderOption,
  readOnly = false,
  ...otherProps
}: Props) => {
  const { control } = useFormContext();

  const status = useExtractedStatus(name);

  return (
    <FormControl component="fieldset" fullWidth>
      <Controller
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            renderInput={params => (
              <TextField
                {...otherProps}
                {...params}
                label={label}
                variant="outlined"
                helperText={status?.hasError ? status.errorMsg : undefined}
                error={status?.hasError}
              />
            )}
            onChange={(_, data) => field.onChange(data)}
            readOnly={readOnly}
          />
        )}
        defaultValue={defaultValue}
        name={name}
        control={control}
      />
    </FormControl>
  );
};

export default AutoComplete;
