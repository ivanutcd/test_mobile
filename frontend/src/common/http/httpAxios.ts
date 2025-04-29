import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export abstract class HttpAxios {
  service: AxiosInstance;
  protected constructor(config: AxiosRequestConfig) {
    const service = axios.create(config);
    service.defaults.withCredentials = true;
    this.service = service;
    this.configureInterceptors();
  }

  abstract configureInterceptors(): void;
  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.service.get<T>(path, config);
    return response.data;
  }

  async patch<T>(
    path: string,
    payload: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.service.patch<T>(path, payload, config);
    return response.data;
  }

  async post<T>(
    path: string,
    payload: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.service.post<T>(path, payload, config);
    return response.data;
  }

  async put<T>(
    path: string,
    payload: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.service.put<T>(path, payload, config);
    return response.data;
  }

  async delete<T>(
    path: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.service.delete<T>(path, {
      ...config,
      data: body,
    });
    return response.data;
  }

  public async getObjectUrl(path: string) {
    return await this.get(path, { responseType: 'blob', headers: {} }).then(
      (response: any) => {
        return URL.createObjectURL(response);
      },
    );
  }
}
