import { AxiosInstance, AxiosResponse } from 'axios';
import { useOverlayState } from '@components/overlay/store-overlay.ts';

const methods = ['POST', 'PUT', 'DELETE'];

export const loadingOverlayInterceptor = (axiosInstance: AxiosInstance) => {
  const state = useOverlayState.getState();
  axiosInstance.interceptors.request.use(
    config => {
      if (config?.headers?.ignoreSpinner) {
        return config;
      }
      if (
        methods.some(x => x === config.method?.toUpperCase()) ||
        config.responseType === 'blob'
      ) {
        state.openOverlay();
      }
      return config;
    },
    (error: any) => {
      state.closeOverlay();
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (axiosResponse: AxiosResponse) => {
      if (axiosResponse?.config?.headers?.ignoreSpinner) {
        return axiosResponse;
      }
      if (
        methods.some(x => x === axiosResponse.config.method?.toUpperCase()) ||
        axiosResponse?.config.responseType === 'blob'
      ) {
        state.closeOverlay();
      }

      return axiosResponse;
    },
    (error: any) => {
      state.closeOverlay();
      return Promise.reject(error);
    },
  );
};
