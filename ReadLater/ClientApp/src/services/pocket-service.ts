import {User} from '../models/user';
import RequestService from './request-service';
import AuthResult from './auth-result';

class PocketService extends RequestService {
    constructor() {
        super();
    }

    public async getRequestToken() {
        const body = {
            consumer_key: '84468-64a87fb1c2e843d4d28f1981',
            redirect_uri: 'http://localhost:5001/'
        };

        return await this.request('https://getpocket.com/v3/oauth/request', 'post', body);
    }

   
}

const pocketService = new PocketService();

export default pocketService;
