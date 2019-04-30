import RequestService from './request-service';
import { PocketAccount } from '../models/pocket-account';
import { ReadItem } from '../models/read-item';
import { List } from 'immutable';

class ReadService extends RequestService {
    constructor() {
        super();
    }

    public async getReadList(): Promise<List<ReadItem>> {
        var list = await this.requestWithResponse('/api/read/list', 'get', undefined);
        return list;
    }
}

const readService = new ReadService();

export default readService;
