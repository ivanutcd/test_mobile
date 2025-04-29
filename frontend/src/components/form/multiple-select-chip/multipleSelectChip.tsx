import { ControlForm } from '../control-form';
import { Controller, useFormContext } from 'react-hook-form';
import { useExtractedStatus } from '../use-extracted-status';
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
} from '@mui/material';

interface Props extends ControlForm {
  labelField?: string;
  valueField?: string;
  data: any[];
  initialValues?: any[];
  disabled?: boolean;
  hidden?: boolean;
  whenChange?: (event: any) => void;
  disableVariant?: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelectChip = ({
  label,
  name,
  readOnly,
  data,
  valueField,
  labelField,
  disabled = false,
  hidden = false,
  disableVariant,
}: Props) => {
  const { control, watch } = useFormContext();
  const status = useExtractedStatus(name);
  const isLoading = watch('$isloading');
  const newLabel = labelField ?? 'name';
  const newDataField = valueField ?? 'id';
  const variant = disableVariant ? undefined : 'filled';

  return (
    <div>
      <FormControl
        component="fieldset"
        fullWidth
        variant={variant}
        disabled={disabled}
      >
        <InputLabel id={`multiple-chip-label-${label}`}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <>
                {isLoading ? (
                  <Skeleton variant="rounded" height={51} />
                ) : (
                  <Select
                    hidden={hidden}
                    {...field}
                    onChange={(event: any) => {
                      const newData = data.filter(x =>
                        event.target.value.some(
                          (y: any) => y === x[newDataField],
                        ),
                      );
                      field.onChange(newData);
                    }}
                    labelId={`multiple-chip-label-${name}`}
                    id={`multiple-chip-${name}`}
                    multiple
                    name={name}
                    value={
                      field.value?.map(
                        (item: { [key: string]: any }) => item[newDataField],
                      ) || []
                    }
                    disabled={readOnly}
                    input={
                      <OutlinedInput
                        id={`select-multiple-chip-${name}`}
                        label={label}
                      />
                    }
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected?.map((itemId: any) => (
                          <Chip
                            key={itemId}
                            label={
                              data.find(
                                item => item[newDataField] === itemId,
                              )?.[newLabel]
                            }
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {data.length === 0 && (
                      <MenuItem disabled>No se encontraron datos</MenuItem>
                    )}
                    {data?.map(element => (
                      <MenuItem
                        key={element[newDataField]}
                        value={element[newDataField]}
                      >
                        <Checkbox
                          checked={
                            field.value !== undefined &&
                            field.value.some(
                              (x: { [key: string]: any }) =>
                                x[newDataField] === element[newDataField],
                            )
                          }
                        />
                        <ListItemText primary={element[newLabel]} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
                <FormHelperText error={status?.hasError}>
                  {status?.errorMsg}
                </FormHelperText>
              </>
            );
          }}
        />
      </FormControl>
    </div>
  );
};

export default MultipleSelectChip;
