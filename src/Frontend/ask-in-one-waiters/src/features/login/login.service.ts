import { AxiosResponse } from 'axios';
import { HttpClient } from '../../components/infrastructure/httpclient.component';

interface DoLoginRequest {
    companyId: number,
    username: string,
    password: string,
}

export class LoginService {
    private readonly request: HttpClient;

    constructor(){
        this.request = new HttpClient();
    }

    public async doLogin(data: DoLoginRequest): Promise<AxiosResponse<any, any>> {
        return this.request.post(`login`, data);
    }
}


export default LoginService;