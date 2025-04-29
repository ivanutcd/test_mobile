import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Switch,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel';

interface SwitchProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  label: string;
  readOnly?: boolean;
}

const SwitchComponent = ({
  name,
  label,
  readOnly,
  ...otherProps
}: SwitchProps) => {
  const { control, watch } = useFormContext();
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
                <FormGroup>
                  <FormControlLabel
                    {...otherProps}
                    control={
                      <Switch
                        {...field}
                        readOnly={readOnly}
                        id={name}
                        checked={field.value}
                      />
                    }
                    label={label}
                  />
                </FormGroup>
              )}
            </>
          )}
        />
      </FormControl>
    </>
  );
};
export default SwitchComponent;
