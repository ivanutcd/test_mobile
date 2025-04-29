import { Button } from '@components/button/button.tsx';
import { Stack } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { SearchButtonsProps } from './props';

const SearchButtons = ({
  reset,
  nameForm,
  principalButtonLabel = 'Buscar',
  ResetButtonLabel = 'Reestablecer',
}: SearchButtonsProps) => {
  const buttonStyle = {
    width: '130px',
    height: '33px',
  };
  return (
    <Grid
      xs={12}
      display="flex"
      justifyContent={'flex-end'}
      sx={{
        height: '39px',
        alignItems: 'center',
        gap: '8px',
        flexshrink: 0,
        alignSelf: 'stretch',
        marginTop: '32px',
      }}
    >
      <Stack direction={'row'}>
        <Stack direction={'column'} sx={buttonStyle}>
          <Button
            onClick={() => {
              reset();
            }}
            variant={'outlined'}
            sx={buttonStyle}
          >
            {ResetButtonLabel}
          </Button>
        </Stack>
        <Stack direction={'column'}>
          <Button
            form={nameForm}
            type="submit"
            sx={{
              color: 'primary.light',
              marginLeft: '8px',
              ...buttonStyle,
            }}
          >
            {principalButtonLabel}
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default SearchButtons;
