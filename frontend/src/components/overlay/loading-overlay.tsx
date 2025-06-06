import { Backdrop, CircularProgress } from '@mui/material';
import { useOverlayState } from './store-overlay.ts';

interface Props {
  message?: string;
}
export const LoadingOverlay = ({ message }: Props) => {
  const open = useOverlayState(state => state.open);

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          backgroundColor: 'rgba(2, 106, 191, 0.11)',
          backdropFilter: 'blur(3px)',
          zIndex: theme => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column', // Esto asegura que los elementos hijos se apilen verticalmente
          alignItems: 'center', // Esto centra los elementos en el eje transversal
        }}
        open={open}
      >
        <CircularProgress color="inherit" />

        <h3>{message ?? 'Espere por favor...'}</h3>
      </Backdrop>
    </>
  );
};
