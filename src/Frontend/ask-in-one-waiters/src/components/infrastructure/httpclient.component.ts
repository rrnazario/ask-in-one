import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppDispatch, selectToken, unauthenticate } from '../../redux-ts';
import { useAppDispatch, useAppSelector } from '../../redux-ts/hooks';
import { API_URL } from '../configuration/env';

// export function HttpClientFunc(){
//     const token = useAppSelector(selectToken);
//     const dispatch = useAppDispatch();

//     useEffect(() => init(), []);  
    
//     const init = () => {
//         axios.interceptors.response.use(
//             (response: any) => response,
//             (errorObj: any) => {
//                 if (errorObj && errorObj.response && errorObj.response.status === 401) {
//                     dispatch(unauthenticate())
                    
//                     localStorage.removeItem('token');
//                     window.location.reload();
//                 }

//                 return errorObj
//             });
//     }

//     const getDefaultOptions = (): any => {
//         return {
//             headers: {
//                 Authorization: token ? `Bearer ${token}` : '',
//                 'Content-Type': 'application/json',
//             },
//             baseURL: API_URL,
//             timeout: 30000
//         }
//     }

//     return {
//         async get(url: string, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
//             return await axios.get(url, { ...getDefaultOptions(), ...options })
//         },
    
//         async post(url: string, data: any, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
//             return await axios.post(url, data, { ...getDefaultOptions(), ...options });
//         },
    
//         async patch(url: string, data: any, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
//             return await axios.patch(url, data, { ...getDefaultOptions(), ...options });
//         },
    
//         async put(url: string, data: any, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
//             return await axios.put(url, data, { ...getDefaultOptions(), ...options });
//         },
    
//         async delete(url: string, options: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
//             return axios.delete(url, { ...getDefaultOptions(), ...options });
//         }
//     }
// }

export class HttpClient {
    private token: string = useAppSelector(selectToken);
    private dispatch: AppDispatch = useAppDispatch();

    constructor() {
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