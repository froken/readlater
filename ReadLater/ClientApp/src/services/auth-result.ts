export default class AuthResult {
    public userName: string | undefined;
    public success: boolean | undefined;

    constructor(success: boolean, userName: string | undefined) {
        this.userName = userName;
        this.success = success;
    }
}