import RequestService from './request-service';

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

    public async getAccessToken(code: string): Promise<string> {
        var token = await this.requestWithResponse('/api/pocket/token', 'post', undefined);
        return token;
    }
}

const pocketService = new PocketService();

export default pocketService;
