import { Stack, Typography } from '@mui/material';
import { DatePicker } from '@components/form';

const DateRangeFields = () => {
  const datePickerStyle = {
    marginTop: '32px',
    width: '160px',
    height: '38px',
  };
  const searchText = { marginTop: '50px', width: '100%' };
  const typographyColumnStyle = {
    width: '158px',
    display: 'flex',
    flexShrink: 0,
  };
  return (
    <>
      <Stack direction={'row'} sx={{ width: '100%' }}>
        <Stack
          direction={'column'}
          sx={{
            ...searchText,
            ...typographyColumnStyle,
          }}
        >
          <Typography variant="subtitle2">Rango de fecha</Typography>
        </Stack>
        <Stack direction={'column'} sx={{ width: '320px' }}>
          <Stack direction={'row'}>
            <Stack
              direction={'column'}
              sx={{
                height: '38px',
                flex: '1 0 0',
              }}
            >
              <DatePicker
                label={'Fecha desde'}
                name={'fechaDesde'}
                sx={datePickerStyle}
              />
            </Stack>
            <Stack
              direction={'column'}
              sx={{
                height: '38px',
                flex: '1 0 0',
                marginLeft: '8px',
              }}
            >
              <DatePicker
                label={'Fecha hasta'}
                name={'fechaHasta'}
                sx={datePickerStyle}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default DateRangeFields;
