export default class RequestService {
    private defaultHeaders: HeadersInit;

    constructor() {
        this.defaultHeaders = {
            'Accept': 'application/json',
            'X-Accept': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'localhost',
            'Content-Type': 'application/json; charset=UTF-8',
            'Origin': 'localhost:5001'
        };
    }

    protected async request(
        url: string,
        method: string,
        body: object | undefined
    ): Promise<Response> {
        let requestInit: RequestInit = {
            headers: this.defaultHeaders,
            method: method,
        };

        if (body) {
            requestInit.body = JSON.stringify(body);
        }

        const response: Response = await fetch(url, requestInit);

        if (response.status !== 200) {
            throw new Error(
                "Couldn't request " + url + '. Response ' + response.status
            );
        }

        return response;
    }

    protected async requestWithResponse(
        url: string,
        method: string,
        body: object | undefined
    ): Promise<any> {
        var response = await this.request(url, method, body);
        return await response.json();
    }
}
