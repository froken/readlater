import RequestService from './request-service';
import { PocketAccount } from '../models/pocketAccount';

class PocketService extends RequestService {
    constructor() {
        super();
    }

    public async getRequestToken(): Promise<string> {
        var token = await this.requestWithResponse('/api/pocket/token/request', 'post', undefined);
        return token;
    }

    public async getAuthorizeUrl(token: string): Promise<string> {
        var redirectUri = window.location.href;
        return `https://getpocket.com/auth/authorize?request_token=${token}&redirect_uri=${redirectUri}`;
    }

    public async getAccessToken(): Promise<string> {
        var token = await this.requestWithResponse('/api/pocket/token/access', 'post', undefined);
        return token;
    }

    public async getPocketAccount(): Promise<PocketAccount> {
        var account = await this.requestWithResponse('/api/pocket/account', 'get', undefined);
        return account;
    }
}

const pocketService = new PocketService();

export default pocketService;
