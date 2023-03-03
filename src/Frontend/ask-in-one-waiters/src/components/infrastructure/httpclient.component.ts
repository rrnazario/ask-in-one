import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppDispatch, selectToken, unauthenticate } from '../../redux-ts';
import { useAppDispatch, useAppSelector } from '../../redux-ts/hooks';
import { API_URL } from '../configuration/env';

export class HttpClient {
    private token: string | null;
    private dispatch: AppDispatch;

    constructor() {
        this.dispatch = useAppDispatch();
        this.token = useAppSelector(selectToken);

        axios.interceptors.response.use(
            (response: any) => response,
            (errorObj: any) => {
                if (errorObj && errorObj.response && errorObj.response.status === 401) {
                    this.dispatch(unauthenticate())
                    
                    localStorage.removeItem('token');
                    window.location.reload();
                }

                return errorObj
            });
    }

    public async get(url: string, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
        return axios.get(url, { ...this.getDefaultOptions(), ...options });
    }

    public async post(url: string, data: any, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
        return axios.post(url, data, { ...this.getDefaultOptions(), ...options });
    }

    public async patch(url: string, data: any, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
        return axios.patch(url, data, { ...this.getDefaultOptions(), ...options });
    }

    public async put(url: string, data: any, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
        return axios.put(url, data, { ...this.getDefaultOptions(), ...options });
    }

    public async delete(url: string, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
        return axios.delete(url, { ...this.getDefaultOptions(), ...options });
    }

    private getDefaultOptions(): any {
        return {
            headers: {
                Authorization: this.token ? `Bearer ${this.token}` : '',
                'Content-Type': 'application/json',
            },
            baseURL: API_URL,
            timeout: 30000
        }
    }
}