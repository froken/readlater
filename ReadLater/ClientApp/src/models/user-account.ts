export class UserAccount {
    public userName: string | undefined;
    public isPocketAuthorized: boolean;

    constructor() {
        this.isPocketAuthorized = false;
    }
}