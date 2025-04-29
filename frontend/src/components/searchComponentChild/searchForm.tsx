import { /*Paper,*/ Stack, Typography } from '@mui/material';
import { HookForm, InputText } from '@components/form';
import Grid from '@mui/system/Unstable_Grid';
import { searchformProps } from '@components/searchComponentChild/props.ts';
import { HookFormMethods } from '@components/form/hook-form.tsx';
import DateRangeFields from '../dateRange/dateRangeFields';
import SearchButtons from '@components/searchButtons';

const SearchForm = <T,>({ open, save, close }: searchformProps<T>) => {
  if (!open) {
    return null;
  }

  const handleSubmit = (event: any) => {
    if (save && event) {
      let search = {};

      if (event.generalSearch) {
        search = { ...search, generalSearch: event.generalSearch };
      }

      search = {
        ...search,
        fechaDesde: event.fechaDesde,
        fechaHasta: event.fechaHasta,
      };

      save(search as T);
    }

    if (close) {
      close();
    }
  };

  const nameForm = 'customForm';

  const searchText = { marginTop: '32px', width: '100%' };
  const typographyColumnStyle = {
    width: '158px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
  };

  return (
    <>
      {/* <Grid container style={{ minHeight: '100vh' }}>
        <Grid
        // item
        // xs={12}
        // sm={8}
        // md={5}
        // lg={4}
        // xl={3}
        // style={{ margin: 'auto' }}
        >
          <Paper elevation={3} style={{ padding: '20px' }}>
            <h2>Elemento centrado verticalmente</h2>
            <p>
              Este es un ejemplo de cómo centrar verticalmente un elemento
              usando MUI y React Hooks.
            </p>
          </Paper>
        </Grid>
      </Grid> */}
      <HookForm nameForm={nameForm} onSubmit={handleSubmit}>
        {({ reset }: HookFormMethods) => {
          return (
            <>
              <Grid
                container
                sx={{
                  width: '486px',
                  height: '249px',
                }}
              >
                <Stack
                  direction={'row'}
                  sx={{
                    display: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Stack
                    direction={'column'}
                    sx={{ ...searchText, ...typographyColumnStyle }}
                  >
                    <Typography variant="subtitle2">
                      Número de contrato
                    </Typography>
                  </Stack>
                  <Stack direction={'column'} sx={searchText}>
                    <InputText
                      name="generalSearch"
                      placeholder="Consulta por número contrato"
                      style={{ width: '328px', fontSize: '38px' }}
                    />
                  </Stack>
                </Stack>

                <DateRangeFields />

                <SearchButtons reset={reset} nameForm={nameForm} />
              </Grid>
            </>
          );
        }}
      </HookForm>
    </>
  );
};

export default SearchForm;
