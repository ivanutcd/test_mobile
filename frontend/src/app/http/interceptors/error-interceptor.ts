import { AxiosInstance, AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';

interface ErrorResponse {
  message: string;
  metadata?: any;
}

const handleErrorSSO = (responseData: any) => {
  if (responseData.errors && responseData.errors.length > 0) {
    responseData.errors.forEach((errorMessage: string) => {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    });
    return true;
  }
  return false;
};
const handleErrors = (error: AxiosError) => {
  const responseData = error.response?.data as any;
  if (handleErrorSSO(responseData)) {
    return Promise.reject(error);
  }

  if (Array.isArray(responseData)) {
    responseData.forEach((errorItem: ErrorResponse) => {
      enqueueSnackbar(errorItem.message, { variant: 'error' });
    });
    return Promise.reject(error);
  }

  if (error.response) {
    const status = error.response.status;
    const message =
      status === 404
        ? 'Servicio no encontrado'
        : status === 401
          ? 'Servicio no autenticado'
          : status === 403
            ? 'Servicio no autorizado'
            : 'Ocurrio un error';
    enqueueSnackbar(message, { variant: 'error' });
  } else {
    console.log('Error', error.message);
  }

  return Promise.reject(error);
};

export const errorInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(undefined, handleErrors);
};
