import { AxiosRequestConfig } from 'axios';

export interface ConfigParams {
  onLoad?: boolean;
  overrideConfig?: AxiosRequestConfig;
}
