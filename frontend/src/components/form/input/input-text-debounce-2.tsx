import TextField from '@mui/material/TextField';
import { ControlForm } from '../control-form.ts';

import { FormControl } from '@mui/material';

import { TextFieldProps } from '@mui/material/TextField/TextField';
import { useRef } from 'react';
import * as React from 'react';

interface Props extends ControlForm {}
type DebounceProps = {
  handleDebounce?: (value: string) => Promise<void>;
  debounceTimeout?: number;
};

export const InputTextDebounce2 = ({
  label,
  name,
  readOnly,
  hidden,
  variant = 'outlined',
  handleDebounce,
  debounceTimeout = 500,
}: Props & TextFieldProps & DebounceProps) => {
  const [debouncedValue, setDebouncedValue] = React.useState<string>();

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (handleDebounce) {
        await handleDebounce(debouncedValue as any);
      }
    }, debounceTimeout);
  };

  if (hidden) {
    return null;
  }

  return (
    <FormControl component="fieldset" fullWidth>
      <TextField
        type="text"
        id={name}
        label={label}
        variant={variant}
        value={debouncedValue}
        onChange={e => {
          setDebouncedValue(e.target.value);
          handleChange();
        }}
        disabled={readOnly}
        aria-readonly={readOnly}
        fullWidth
      />
    </FormControl>
  );
};
