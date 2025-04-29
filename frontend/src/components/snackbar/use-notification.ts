import { SnackbarMessage, useSnackbar } from 'notistack';

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  return {
    success: (message: SnackbarMessage) =>
      enqueueSnackbar(message, { variant: 'success' }),
    error: (message: SnackbarMessage) =>
      enqueueSnackbar(message, { variant: 'error' }),
    info: (message: SnackbarMessage) =>
      enqueueSnackbar(message, { variant: 'info' }),
    warning: (message: SnackbarMessage) =>
      enqueueSnackbar(message, { variant: 'warning' }),
  };
};
