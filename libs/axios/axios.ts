import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { AxiosInterface } from './interfaces/axios.interface';

class AxiosService implements AxiosInterface {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      // timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        // Add other headers here
      },
    });

    // Add request/response interceptors if needed
    this.axiosInstance.interceptors.response.use(
      this.responseSuccessInterceptor,
      this.responseErrorInterceptor,
    );
  }

  private responseSuccessInterceptor(response: AxiosResponse): AxiosResponse {
    // Handle successful responses here
    return response;
  }

  private responseErrorInterceptor(error: any): Promise<any> {
    // Handle errors here
    return Promise.reject(error);
  }

  // Example GET request
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  // Example POST request
  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

export default AxiosService;
