import auth from '@common/security/auth';

import { AxiosInstance } from 'axios';

export const addAuthorization = async (config: any) => {
  const token = await auth.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const tokenInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    config => {
      return addAuthorization(config);
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );
};
