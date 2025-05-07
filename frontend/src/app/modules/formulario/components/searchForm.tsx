import { Stack, Typography } from '@mui/material';
import { ComboBox, HookForm, InputText } from '@components/form';
import Grid from '@mui/system/Unstable_Grid';
import { searchformProps } from '@components/searchComponentChild/props.ts';
import { HookFormMethods } from '@components/form/hook-form.tsx';
import SearchButtons from '@components/searchButtons';
import traducciones from '../common/translations';
import { useCatalogos } from '@common/catalog/hooks';
import { Catalogos } from '../../common/model/catalogos';
import { useEffect, useState } from 'react';

const SearchForm = <T,>({ open, save, close, handleRecargar }: searchformProps<T>) => {
  const NOMBRE_FORMULARIO = 'search-form-formularios';

  const searchText = { marginTop: '32px', width: '250px' };

  const [estadoItems, setEstadoItems] = useState<{ name: string; id: string }[]>([]);
  const [tipoMovilidadItems, setTipoMovilidadItems] = useState<{ name: string; id: string }[]>([]);
  
  const {
    data: dataCatalogoEstadoFormulario,
  } = useCatalogos(Catalogos.EstadoFormulario);

  useEffect(() => {
    const estadoFormulario = dataCatalogoEstadoFormulario?.estado_formulario;
    if (Array.isArray(estadoFormulario)) {
      const items = estadoFormulario.map(({ nombre, id }) => ({ name: nombre, id }));
      setEstadoItems(items);
    }
  }, [dataCatalogoEstadoFormulario]);

  const {
    data: dataCatalogoTipoMovilidad,
  } = useCatalogos(Catalogos.TipoMovilidad);

  useEffect(() => {
    const tipoMovilidad = dataCatalogoTipoMovilidad?.tipo_movilidad;
    if (Array.isArray(tipoMovilidad)) {
      const items = tipoMovilidad.map(({ nombre, id }) => ({ name: nombre, id }));
      setTipoMovilidadItems(items);
    }
  }, [dataCatalogoTipoMovilidad]);

  const textStyle = {
    fontSize: '14px',
    color: '#61616',
  };

  const typographyColumnStyle = {
    width: '158px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
  };

  const handleSubmit = (event: any) => {
    if (save && event) {
      let search = {};
      if (event.generalSearch) {
        search = {
          ...search,
          nombreTecnico: event.generalSearch,
        };
      }

      search = {
        ...search,
        nombreTecnico: event?.nombreTecnico,
        movilidadAsociada: event?.movilidadAsociada?.id,
        estado: event?.estado?.id,
      };
      save(search as T);
    }
    if (close) {
      close();
    }
  };

  const onRecargar = () => {
    if(handleRecargar) {
      handleRecargar();
    }
  };

  if (!open) {
    return null;
  }

  const anchoTotal = { width: '100%' };
  const claseFila = { ...anchoTotal };
  const claseColumnaCampo = { m: 0.5, marginTop: '5%', ...anchoTotal };

  return (
    <HookForm nameForm={NOMBRE_FORMULARIO} onSubmit={handleSubmit}>
      {({ reset }: HookFormMethods) => {

        const handleReset = () => {          
          reset();          
          onRecargar();
        }

        return (
          <Grid container
          sx={{
            width: '100%',
            height: 'auto',
            marginTop: '40px',
            maxHeight: '250px',
            overflowY: 'auto',
          }}>

            <Stack direction="row" sx={claseFila}>
                <Stack
                  direction="column"
                  sx={{ ...searchText, ...typographyColumnStyle }}
                >
                  <Typography variant="subtitle2" sx={[textStyle]}>
                    {traducciones.NOMBRE_TECNICO}
                  </Typography>
                </Stack>
                <Stack sx={claseColumnaCampo} direction="column">
                  <InputText
                    label={traducciones.NOMBRE_TECNICO}
                    name="nombreTecnico"
                  />
                </Stack>
            </Stack>

            <Stack direction="row" sx={claseFila}>
              <Stack
                direction="column"
                sx={{ ...searchText, ...typographyColumnStyle }}
              >
                <Typography variant="subtitle2" sx={[textStyle]}>
                  {traducciones.MOVILIDAD_ASOCIADA}
                </Typography>
              </Stack>
                <Stack direction="column" sx={{ ...claseColumnaCampo }}>
                <ComboBox
                  disableVariant
                  name="movilidadAsociada"
                  label="Tipo movilidad"
                  valueField="id"
                  placeholder="Tipo movilidad"
                  items={tipoMovilidadItems}
                />
                </Stack>
            </Stack>
            

            <Stack direction="row" sx={claseFila}>
              <Stack
                direction="column"
                sx={{ ...searchText, ...typographyColumnStyle }}
              >
                <Typography variant="subtitle2" sx={[textStyle]}>
                  {traducciones.ESTADO}
                </Typography>
              </Stack>
                <Stack direction="column" sx={{ ...claseColumnaCampo }}>
                <ComboBox
                  disableVariant
                  name="estado"
                  label="Estado"
                  valueField="id"
                  placeholder="Estado"
                  items={estadoItems}
                />
                </Stack>
            </Stack>
            
            <SearchButtons reset={handleReset} nameForm={NOMBRE_FORMULARIO} />
          </Grid>
        );
      }}
    </HookForm>
  );
};

export default SearchForm;


