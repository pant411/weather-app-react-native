import { AxiosRequestConfig } from 'axios'

export interface AxiosInterface {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  patch<T = any>(
    url: string, 
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
}
