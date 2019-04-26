import {User} from '../models/user';
import RequestService from './request-service';
import AuthResult from './auth-result';

class AuthService extends RequestService {
    constructor() {
        super();
    }

    public async register(user: User): Promise<{}> {
        return await this.request('/api/account', 'post', user);
    }
    
    public async authenticate(): Promise<any> {
        return await this.requestWithResponse('/api/account', 'get', undefined);
    }

    public async login(userName: string, password: string, returnUrl: string): Promise<{}> {
        const loginUser = {
            password,
            userName,
            returnUrl
        };
        return await this.request('/api/auth/login', 'post', loginUser);
    }
}

const authService = new AuthService();

export default authService;
