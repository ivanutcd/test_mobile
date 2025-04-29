import {
  // Box,
  //   InputAdornment,
  //   IconButton,
  //   TextField,
  Box,
  Paper,
  //   ClickAwayListener,
  Button,
  Stack,
  // FormControl,
  // InputLabel,
  // OutlinedInput,
} from '@mui/material';
import { DatePicker, HookForm, InputText } from '@components/form';
import Grid from '@mui/system/Unstable_Grid';
// import { Button, Stack } from '@mui/material';
import AnimateButton from '@common/ui-component/extended/animate-button.tsx';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
// import { useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert'; // Este es un icono común para menús.

function CustomMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  // const navigate = useNavigate();
  if (!open) {
    return null;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Aquí manejarías la lógica del envío del formulario
    onClose(); // Cierra el formulario después del envío
  };

  // const Crear = () => {
  //   navigate('crear');
  // };

  const nameForm = 'customForm';

  return (
    <Paper
      style={{
        position: 'absolute',
        right: 0,
        top: '100%',
        zIndex: 2,
        padding: '16px',
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      {/* <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="option-one">Opción 1</InputLabel>
          <OutlinedInput id="option-one" label="Opción 1" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="option-two">Opción 2</InputLabel>
          <OutlinedInput id="option-two" label="Opción 2" />
        </FormControl> */}
      {/* Agrega más campos de formulario según sea necesario */}
      {/* <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form> */}

      <HookForm
        nameForm={nameForm}
        // initialValues={query}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <>
              <Grid container spacing={2}>
                <Stack
                  direction={'row'}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '1.5%',
                  }}
                >
                  <Box position="relative">
                    {' '}
                    {/* Contenedor relativo para el posicionamiento absoluto del botón */}
                    {/* Otros componentes y contenido aquí */}
                    <IconButton
                      onClick={onClose}
                      sx={{
                        position: 'absolute', // Posicionamiento absoluto para el botón
                        top: 0, // Arriba del contenedor
                        right: 0, // Derecha del contenedor
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Stack>
                {/* <Grid xs={6}> */}
                <Stack direction={'row'} sx={{ width: '100%' }}>
                  <Stack
                    direction={'column'}
                    sx={{ margin: '1%', width: '100%' }}
                  >
                    <InputText
                      name="generalSearch"
                      placeholder="Consulta por contrato, numero factura"
                    />
                  </Stack>
                </Stack>
                <Stack direction={'row'} sx={{ width: '100%' }}>
                  <Stack direction={'column'} sx={{ margin: '1%' }}>
                    <DatePicker label={'Fecha desde'} name={'fechaDesde'} />
                  </Stack>
                </Stack>
                <Stack direction={'row'} sx={{ width: '100%' }}>
                  <Stack direction={'column'} sx={{ margin: '1%' }}>
                    <DatePicker label={'Fecha hasta'} name={'fechaHasta'} />
                  </Stack>
                </Stack>

                <Grid xs={12} display="flex" justifyContent={'flex-end'}>
                  <Stack direction={'row'}>
                    <Stack direction={'column'} sx={{ margin: '1%' }}>
                      <AnimateButton>
                        <Button
                          variant="text"
                          onClick={handleSubmit}
                          color={'inherit'}
                          sx={{ color: 'blue' }}
                        >
                          {' '}
                          Reestablecer
                        </Button>
                      </AnimateButton>
                    </Stack>
                    <Stack direction={'column'} sx={{ margin: '1%' }}>
                      <AnimateButton>
                        <Button
                          form={nameForm}
                          type="submit"
                          variant={'contained'}
                          color={'info'}
                          sx={{ color: 'white' }}
                        >
                          {' '}
                          Buscar
                        </Button>
                      </AnimateButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </>
          );
        }}
      </HookForm>
    </Paper>
  );
}

// function SearchComponent() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleSearchChange = (event: any) => {
//     setSearchTerm(event.target.value);
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <ClickAwayListener onClickAway={closeMenu}>
//       <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//         <TextField
//           fullWidth
//           value={searchTerm}
//           onChange={handleSearchChange}
//           placeholder="Buscar en Drive"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={toggleMenu}>
//                   <MoreVertIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <CustomMenu open={menuOpen} onClose={closeMenu} />
//       </Box>
//     </ClickAwayListener>
//   );
// }

export default CustomMenu;
